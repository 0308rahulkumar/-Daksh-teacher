// Learning engine: mastery scoring, mistake logging and a simple
// spaced-repetition scheduler (lightweight SM-2).

import type {
  AppState,
  MasteryLevel,
  Mistake,
  QuizAnswerRecord,
  TopicProgress,
} from "./types";
import { getChapter, getSubject, getTopic } from "./syllabus";

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(key: string, days: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/* ---------------------------------- Mastery ---------------------------------- */

export function deriveMastery(p: TopicProgress | undefined): MasteryLevel {
  if (!p || p.attempts === 0) return "NOT_STARTED";
  const acc = p.correct / p.attempts;
  if (acc >= 0.86 && p.attempts >= 4 && p.lastResult !== "wrong") return "MASTERED";
  if (p.lastResult === "wrong") return "REVIEW_NEEDED";
  if (acc >= 0.6) return p.attempts >= 2 ? "PRACTICING" : "LEARNING";
  return "REVIEW_NEEDED";
}

function nextInterval(currentDays: number, correct: boolean): number {
  if (!correct) return 1;
  return Math.min(Math.max(currentDays, 1) * 2, 30);
}

/* ---------------------------------- Applying results ---------------------------------- */

export interface ApplyInput {
  subjectId: string;
  chapterId: string;
  topicId?: string;
  total: number;
  correct: number;
  answers: QuizAnswerRecord[];
}

function categoryFor(record: QuizAnswerRecord): string {
  if (record.type === "numerical") return "Numerical / calculation error";
  if (record.type === "mcq") return "Conceptual recall";
  return "Short-answer recall";
}

/**
 * Records a quiz/answer attempt into state: bumps topic progress, recomputes
 * mastery, schedules the next review, and logs wrong answers to the mistake
 * notebook. Returns the mutated state plus the newly created mistakes.
 */
export function applyQuizResult(
  state: AppState,
  input: ApplyInput
): { state: AppState; newMistakes: Mistake[] } {
  const s = structuredClone(state);
  const nowIso = new Date().toISOString();
  const newMistakes: Mistake[] = [];

  for (const a of input.answers) {
    if (!a.topicId) continue;
    const subjectMap = (s.progress[input.subjectId] ??= {});
    const chapterMap = (subjectMap[input.chapterId] ??= {});
    const p = (chapterMap[a.topicId] ??= {
      mastery: "NOT_STARTED",
      attempts: 0,
      correct: 0,
      intervalDays: 1,
      history: [],
    });
    p.attempts += 1;
    if (a.correct) p.correct += 1;
    p.lastResult = a.correct ? "correct" : "wrong";
    p.lastPracticed = nowIso;
    p.history.push({ date: todayKey(), correct: a.correct });
    p.intervalDays = nextInterval(p.intervalDays, a.correct);
    p.nextReview = addDays(todayKey(), p.intervalDays);
    p.mastery = deriveMastery(p);

    if (!a.correct) {
      newMistakes.push({
        id: uid(),
        date: nowIso,
        subjectId: input.subjectId,
        chapterId: input.chapterId,
        topic: a.topicId,
        question: a.prompt,
        studentAnswer: a.studentAnswer || "(no answer given)",
        correctAnswer: a.correctAnswer,
        explanation: a.explanation ?? "",
        category: categoryFor(a),
      });
    }
  }

  s.quizHistory.push({
    id: uid(),
    date: nowIso,
    subjectId: input.subjectId,
    chapterId: input.chapterId,
    topicId: input.topicId,
    total: input.total,
    correct: input.correct,
    answers: input.answers,
  });

  return { state: s, newMistakes };
}

/* ---------------------------------- Revision queue ---------------------------------- */

export interface DueTopicRef {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  topicId: string;
  topicName: string;
  focus?: string;
  nextReview: string;
  mastery: MasteryLevel;
  intervalDays: number;
}

/** Topics whose nextReview date has arrived, oldest first. */
export function dueTopics(state: AppState, at: string = todayKey()): DueTopicRef[] {
  const out: DueTopicRef[] = [];
  for (const [sid, chapters] of Object.entries(state.progress)) {
    const subject = getSubject(sid);
    for (const [cid, topics] of Object.entries(chapters)) {
      const chapter = getChapter(sid, cid);
      for (const [tid, p] of Object.entries(topics)) {
        if (!p.nextReview || p.nextReview > at) continue;
        const topic = getTopic(sid, cid, tid);
        out.push({
          subjectId: sid,
          subjectName: subject?.name ?? sid,
          chapterId: cid,
          chapterName: chapter?.name ?? cid,
          topicId: tid,
          topicName: topic?.topic.name ?? tid,
          focus: topic?.topic.focus,
          nextReview: p.nextReview,
          mastery: p.mastery,
          intervalDays: p.intervalDays,
        });
      }
    }
  }
  out.sort((a, b) => a.nextReview.localeCompare(b.nextReview));
  return out;
}

export interface ChapterEl { chapterId: string; counts: Record<MasteryLevel, number>; practiced: number; }

/** Per-chapter topic mastery counts for a subject's progress overview. */
export function chapterStats(state: AppState, subjectId: string): Map<string, ChapterEl> {
  const out = new Map<string, ChapterEl>();
  const subjectMap = state.progress[subjectId] ?? {};
  for (const [cid, topics] of Object.entries(subjectMap)) {
    const counts: Record<MasteryLevel, number> = {
      NOT_STARTED: 0,
      LEARNING: 0,
      PRACTICING: 0,
      REVIEW_NEEDED: 0,
      MASTERED: 0,
    };
    let practiced = 0;
    for (const p of Object.values(topics)) {
      counts[p.mastery] += 1;
      practiced += 1;
    }
    out.set(cid, { chapterId: cid, counts, practiced });
  }
  return out;
}