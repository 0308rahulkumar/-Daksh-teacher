import { NextRequest } from "next/server";
import { isAiConfigured } from "@/lib/ai/provider";
import { generate, type GenInput } from "@/lib/ai/generators";
import { getCuratedMindmap, getCuratedNotes, getCuratedFlashcards, getCuratedQuiz } from "@/lib/curatedContent";
import type { GeneratorKind } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function getFallback(kind: GeneratorKind, subjectId: string, chapterId: string, topicId: string) {
  if (kind === "mindmap") return getCuratedMindmap(subjectId, chapterId, topicId);
  if (kind === "notes") return getCuratedNotes(subjectId, chapterId, topicId);
  if (kind === "flashcards") return getCuratedFlashcards(subjectId, chapterId, topicId);
  if (kind === "quiz" || kind === "mcq") return getCuratedQuiz(subjectId, chapterId, topicId);
  return null;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<GenInput> & { kind?: GeneratorKind };

  if (!body.kind) return json({ error: "Missing 'kind' (notes | flashcards | mcq | mindmap | quiz)." }, 400);
  if (!body.subjectId || !body.chapterId || !body.topicId) {
    return json({ error: "Missing subjectId / chapterId / topicId." }, 400);
  }

  if (!isAiConfigured()) {
    const fallback = getFallback(body.kind, body.subjectId, body.chapterId, body.topicId);
    if (fallback) {
      return json({ ok: true, data: fallback, fallback: true });
    }
    return json(
      { error: "AI is not configured. Add GOOGLE_GENERATIVE_AI_API_KEY or ANTHROPIC_API_KEY to .env.local and restart the dev server." },
      503
    );
  }

  try {
    const result = await generate(body.kind, {
      subjectId: body.subjectId,
      chapterId: body.chapterId,
      topicId: body.topicId,
      count: body.count,
      difficulty: body.difficulty,
      instruction: body.instruction,
    });

    if (!result.ok) {
      const fallback = getFallback(body.kind, body.subjectId, body.chapterId, body.topicId);
      if (fallback) {
        return json({ ok: true, data: fallback, fallback: true });
      }
      return json({ error: result.error }, 502);
    }
    return json({ ok: true, data: result.data });
  } catch (err) {
    const fallback = getFallback(body.kind, body.subjectId, body.chapterId, body.topicId);
    if (fallback) {
      return json({ ok: true, data: fallback, fallback: true });
    }
    return json({ error: err instanceof Error ? err.message : "Generation failed" }, 500);
  }
}