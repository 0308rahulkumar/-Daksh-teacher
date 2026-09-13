"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppState, StudentProfile, QuizAnswerRecord, Mistake } from "@/lib/types";
import type { DueTopicRef } from "@/lib/learning";

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

/* -------------------------------------------------------------------------- */
/*  Fetch helpers                                                              */
/* -------------------------------------------------------------------------- */

async function fetchState(): Promise<{ state: AppState; dueNow: DueTopicRef[] }> {
  const res = await fetch("/api/state", { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* -------------------------------------------------------------------------- */
/*  Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useStateBundle(): StateBundle {
  const [state, setState] = useState<AppState | null>(null);
  const [dueNow, setDueNow] = useState<DueTopicRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const { state: s, dueNow: d } = await fetchState();
      setState(s);
      setDueNow(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load state");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveProfile = useCallback(
    async (patch: Partial<StudentProfile>) => {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ profile: patch }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { state: s, dueNow: d } = await res.json();
      setState(s);
      setDueNow(d);
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
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(await res.text());
      const { state: s, newMistakes } = await res.json();
      setState(s);
      return { newMistakes: newMistakes as Mistake[] };
    },
    []
  );

  return { state, dueNow, loading, error, refresh, saveProfile, recordResult };
}

/* -------------------------------------------------------------------------- */
/*  Thin context-free version for use in pages without the provider             */
/* -------------------------------------------------------------------------- */

/** Call from any client component to record a quiz result without hooking the full bundle. */
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