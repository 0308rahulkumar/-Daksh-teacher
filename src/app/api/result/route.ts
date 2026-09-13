import { NextRequest } from "next/server";
import { applyQuizResult, dueTopics, type DueTopicRef } from "@/lib/learning";
import { updateState } from "@/lib/store";
import type { Mistake, QuizAnswerRecord } from "@/lib/types";

export const runtime = "nodejs";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

interface ResultBody {
  subjectId: string;
  chapterId: string;
  topicId?: string;
  total: number;
  correct: number;
  answers: QuizAnswerRecord[];
  minutes?: number; // optional study minutes to log alongside the session
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<ResultBody>;

  if (!body.subjectId || !body.chapterId || !Array.isArray(body.answers)) {
    return json({ error: "Missing subjectId / chapterId / answers." }, 400);
  }
  const total = Number(body.total) || body.answers.length;
  const correct = Number(body.correct) || 0;

  let newMistakes: Mistake[] = [];
  const state = await updateState((s) => {
    if (body.minutes) {
      const key = new Date().toISOString().slice(0, 10);
      const existing = s.studySessions.find((x) => x.date === key);
      if (existing && body.subjectId === s.profile.subjects[0]) {
        existing.minutes += body.minutes;
      } else {
        s.studySessions.push({ date: key, minutes: body.minutes, label: "Quiz session" });
      }
    }
    const r = applyQuizResult(s, {
      subjectId: body.subjectId!,
      chapterId: body.chapterId!,
      topicId: body.topicId,
      total,
      correct,
      answers: body.answers!,
    });
    newMistakes = r.newMistakes;
    return r.state;
  });

  return json({ state, newMistakes, dueNow: dueTopics(state) });
}