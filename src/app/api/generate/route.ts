import { NextRequest } from "next/server";
import { isAiConfigured } from "@/lib/ai/provider";
import { generate, type GenInput } from "@/lib/ai/generators";
import type { GeneratorKind } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  if (!isAiConfigured()) {
    return json(
      { error: "AI is not configured. Add ANTHROPIC_API_KEY or AI_GATEWAY_API_KEY to .env.local and restart the dev server." },
      503
    );
  }

  const body = (await req.json().catch(() => ({}))) as Partial<GenInput> & { kind?: GeneratorKind };

  if (!body.kind) return json({ error: "Missing 'kind' (notes | flashcards | mcq | mindmap | quiz)." }, 400);
  if (!body.subjectId || !body.chapterId || !body.topicId) {
    return json({ error: "Missing subjectId / chapterId / topicId." }, 400);
  }

  const result = await generate(body.kind, {
    subjectId: body.subjectId,
    chapterId: body.chapterId,
    topicId: body.topicId,
    count: body.count,
    difficulty: body.difficulty,
    instruction: body.instruction,
  });

  if (!result.ok) return json({ error: result.error }, 502);
  return json({ ok: true, data: result.data });
}