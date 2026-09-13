// Model router: picks the right Claude model for the job, and the right
// provider plumbing. On Vercel you can use the AI Gateway (set
// AI_GATEWAY_API_KEY); without it, falling back to direct Anthropic via
// @ai-sdk/anthropic (set ANTHROPIC_API_KEY) keeps the app runnable locally.

import { anthropic } from "@ai-sdk/anthropic";
import { gateway } from "ai";

export type ModelRole = "teacher" | "deep" | "fast";

const GATEWAY_IDS: Record<ModelRole, string> = {
  teacher: "anthropic/claude-sonnet-5",
  deep: "anthropic/claude-opus-5",
  fast: "anthropic/claude-haiku-4.5",
};

const ANTHROPIC_IDS: Record<ModelRole, string> = {
  teacher: "claude-sonnet-5",
  deep: "claude-opus-5",
  fast: "claude-haiku-4-5-20251001",
};

export function isAiConfigured(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY);
}

export function configuredViaGateway(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY);
}

/** Returns an AI SDK language model for the given role. */
export function model(role: ModelRole = "teacher") {
  if (configuredViaGateway()) return gateway(GATEWAY_IDS[role]);
  return anthropic(ANTHROPIC_IDS[role]);
}