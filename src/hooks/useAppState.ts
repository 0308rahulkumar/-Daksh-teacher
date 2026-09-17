"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppState, StudentProfile, QuizAnswerRecord, Mistake } from "@/lib/types";
import { dueTopics, applyQuizResult, type DueTopicRef } from "@/lib/learning";
import { getCurrentUser } from "@/lib/auth";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface StateBundle {
  state: AppState | null;
  dueNow: DueTopicRef[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveProfile: (patch: Partial<StudentProfile>) => Promise<void>;
  recordResult: (input: {
    subjectId: string;
    chapterId: string;
    topicId?: string;
    total: number;
    correct: number;
    answers: QuizAnswerRecord[];
    minutes?: number;
  }) => Promise<{ newMistakes: Mistake[] }>;
}

function getInitialStateForUser(currentUser: ReturnType<typeof getCurrentUser>): AppState {
  const now = new Date().toISOString();
  return {
    profile: {
      name: currentUser ? currentUser.name : "Student",
      klass: "Class 10",
      board: currentUser ? currentUser.board : "CBSE",
      medium: currentUser ? currentUser.medium : "English",
      subjects: ["science", "maths", "social-science", "english"],
      dailyMinutes: 60,
      createdAt: now,
    },
    progress: {},
    mistakes: [],
    quizHistory: [],
    studySessions: [],
    updatedAt: now,
  };
}

function getStorageKey(user: ReturnType<typeof getCurrentUser>): string {
  return user ? `daksh_user_state_${user.id}` : "daksh_guest_state_v1";
}

/* -------------------------------------------------------------------------- */
/*  Hook with Multi-User Isolation                                             */
/* -------------------------------------------------------------------------- */

export function useStateBundle(): StateBundle {
  const [state, setState] = useState<AppState | null>(null);
  const [dueNow, setDueNow] = useState<DueTopicRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocalOrServerState = useCallback(async () => {
    try {
      setError(null);
      const currentUser = getCurrentUser();
      const storageKey = getStorageKey(currentUser);

      // Check user-scoped local storage first
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          try {
            const parsed = JSON.parse(cached) as AppState;
            if (currentUser && parsed.profile) {
              parsed.profile.name = currentUser.name;
              parsed.profile.board = currentUser.board;
              parsed.profile.medium = currentUser.medium;
            }
            setState(parsed);
            setDueNow(dueTopics(parsed));
            setLoading(false);
            return;
          } catch {
            // fall through
          }
        }
      }

      // If no local state, fetch default or server template
      let baseState: AppState;
      try {
        const res = await fetch("/api/state", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          baseState = data.state;
        } else {
          baseState = getInitialStateForUser(currentUser);
        }
      } catch {
        baseState = getInitialStateForUser(currentUser);
      }

      if (currentUser && baseState.profile) {
        baseState.profile.name = currentUser.name;
        baseState.profile.board = currentUser.board;
        baseState.profile.medium = currentUser.medium;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(baseState));
      }

      setState(baseState);
      setDueNow(dueTopics(baseState));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load state");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadLocalOrServerState();
  }, [loadLocalOrServerState]);

  useEffect(() => {
    refresh();

    const handleAuthChange = () => {
      refresh();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("daksh-auth-changed", handleAuthChange);
      return () => window.removeEventListener("daksh-auth-changed", handleAuthChange);
    }
  }, [refresh]);

  const saveProfile = useCallback(
    async (patch: Partial<StudentProfile>) => {
      const currentUser = getCurrentUser();
      const storageKey = getStorageKey(currentUser);

      setState((prev) => {
        const current = prev || getInitialStateForUser(currentUser);
        const next: AppState = {
          ...current,
          profile: { ...current.profile, ...patch },
          updatedAt: new Date().toISOString(),
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(next));
        }
        setDueNow(dueTopics(next));
        return next;
      });

      // Best-effort server sync
      try {
        await fetch("/api/state", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ profile: patch }),
        });
      } catch {
        // Local-first continues smoothly
      }
    },
    []
  );

  const recordResult = useCallback(
    async (input: {
      subjectId: string;
      chapterId: string;
      topicId?: string;
      total: number;
      correct: number;
      answers: QuizAnswerRecord[];
      minutes?: number;
    }) => {
      const currentUser = getCurrentUser();
      const storageKey = getStorageKey(currentUser);
      let newMistakes: Mistake[] = [];

      setState((prev) => {
        const current = structuredClone(prev || getInitialStateForUser(currentUser));

        if (input.minutes) {
          const key = new Date().toISOString().slice(0, 10);
          const existing = current.studySessions.find((x) => x.date === key);
          if (existing) {
            existing.minutes += input.minutes;
          } else {
            current.studySessions.push({ date: key, minutes: input.minutes, label: "Quiz session" });
          }
        }

        const r = applyQuizResult(current, input);
        newMistakes = r.newMistakes;
        const nextState = r.state;

        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(nextState));
        }
        setDueNow(dueTopics(nextState));
        return nextState;
      });

      // Best-effort server sync
      try {
        await fetch("/api/result", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(input),
        });
      } catch {
        // Local-first maintains full data integrity
      }

      return { newMistakes };
    },
    []
  );

  return { state, dueNow, loading, error, refresh, saveProfile, recordResult };
}

export async function postResult(input: {
  subjectId: string;
  chapterId: string;
  topicId?: string;
  total: number;
  correct: number;
  answers: QuizAnswerRecord[];
  minutes?: number;
}): Promise<{ state: AppState; newMistakes: Mistake[]; dueNow: DueTopicRef[] }> {
  const res = await fetch("/api/result", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
