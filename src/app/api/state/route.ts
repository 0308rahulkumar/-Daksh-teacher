import { NextRequest } from "next/server";
import { dueTopics } from "@/lib/learning";
import { getState, updateState } from "@/lib/store";
import type { StudentProfile } from "@/lib/types";

export const runtime = "nodejs";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET() {
  const state = await getState();
  return json({ state, dueNow: dueTopics(state) });
}

/** Partial merge for editable, non-analytics fields (currently the profile). */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { profile?: Partial<StudentProfile> };
  const profilePatch = body.profile;

  if (!profilePatch || typeof profilePatch !== "object") {
    return json({ error: "Send { profile: {...} } — the only mergeable field." }, 400);
  }

  const state = await updateState((s) => {
    s.profile = { ...s.profile, ...profilePatch };
  });

  return json({ state, dueNow: dueTopics(state) });
}