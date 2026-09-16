import { streamText } from "ai";
import { NextRequest } from "next/server";
import { isAiConfigured, model } from "@/lib/ai/provider";
import { buildSystemPrompt, type ChatContext } from "@/lib/ai/prompts";
import { dueTopics } from "@/lib/learning";
import { getState } from "@/lib/store";
import { getChapter, getSubject, getTopic } from "@/lib/syllabus";

export const runtime = "nodejs";
export const maxDuration = 60;

function missingKeyResponse(): Response {
  const message = `No AI API key found.

To enable the AI teacher, create a file named \`.env.local\` in the project root and add one of:

  # FREE (recommended) — get a key at https://aistudio.google.com/apikey
  GOOGLE_GENERATIVE_AI_API_KEY=AIza...

  # OR, paid — get a key at https://console.anthropic.com/
  # ANTHROPIC_API_KEY=sk-ant-...

  # OR, Vercel AI Gateway (for Vercel deployments):
  # AI_GATEWAY_API_KEY=vg_...

Then restart the dev server and refresh. Until then, this teaching app runs without AI.`;
  return new Response(message, { status: 503, headers: { "content-type": "text/plain" } });
}

interface WireMessage {
  role?: string;
  content?: unknown;
  parts?: { type: string; text?: string }[];
}

/** Flattens useChat UI messages into CoreMessages, stripping any [MODE:...] UI tag. */
function toCore(messages: WireMessage[]): { role: "user" | "assistant"; content: string }[] {
  const out: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of messages) {
    if (m.role !== "user" && m.role !== "assistant") continue;
    let content = typeof m.content === "string" ? m.content : "";
    if (!content && Array.isArray(m.parts)) {
      content = m.parts.filter((p) => p.type === "text").map((p) => p.text ?? "").join("");
    }
    // Strip the UI mode tag so the model never sees it as the student's words.
    content = content.replace(/^\[MODE:\w+\]\s*/i, "");
    if (content.trim()) out.push({ role: m.role, content });
  }
  return out;
}

export async function POST(req: NextRequest) {
  if (!isAiConfigured()) return missingKeyResponse();

  const url = new URL(req.url);
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const messages = Array.isArray(body.messages) ? (body.messages as WireMessage[]) : [];

  const subjectId = String(body.subjectId ?? url.searchParams.get("subjectId") ?? "");
  const chapterId = String(body.chapterId ?? url.searchParams.get("chapterId") ?? "");
  const topicId = String(body.topicId ?? url.searchParams.get("topicId") ?? "");
  const bodyMode = typeof body.mode === "string" ? body.mode : undefined;

  // Support a [MODE:xyz] tag on the latest user turn as a UI shortcut.
  const core = toCore(messages);
  const lastUser = [...core].reverse().find((m) => m.role === "user");
  const tagMatch = /^\[MODE:(\w+)\]\s*/i.exec(lastUser?.content ?? "");
  const mode = bodyMode ?? (tagMatch ? tagMatch[1].toLowerCase() : undefined);

  const state = await getState();
  const due = dueTopics(state);
  const foundTopic = topicId ? getTopic(subjectId, chapterId, topicId) : null;

  const ctx: ChatContext = {
    subjectName: subjectId ? getSubject(subjectId)?.name : undefined,
    chapterName: chapterId ? getChapter(subjectId, chapterId)?.name : undefined,
    topicName: foundTopic?.topic.name,
    topicFocus: foundTopic?.topic.focus,
    mode,
    board: state.profile.board,
    medium: state.profile.medium,
    studentName: state.profile.name !== "Student" ? state.profile.name : undefined,
    dueRevision: due.slice(0, 5).map((d) => d.topicName),
    mastery: foundTopic ? state.progress[subjectId]?.[chapterId]?.[topicId]?.mastery : undefined,
  };

  const result = streamText({
    model: model("teacher"),
    system: buildSystemPrompt(ctx),
    messages: core,
  });

  return result.toUIMessageStreamResponse();
}