// Model router: picks the right model for the job using a multi-provider
// fallback. Priority: AI Gateway → Anthropic (direct) → Google Gemini (free).
//
// This means students can use the app for FREE with just a Gemini API key.
// Teachers or developers with an Anthropic key get Claude automatically.

import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { gateway } from "ai";

export type ModelRole = "teacher" | "deep" | "fast";

/* -------------------------------------------------------------------------- */
/*  Model ID maps for each provider                                            */
/* -------------------------------------------------------------------------- */

const GATEWAY_IDS: Record<ModelRole, string> = {
  teacher: "google/gemini-1.5-flash",
  deep: "google/gemini-1.5-pro",
  fast: "google/gemini-1.5-flash",
};

const ANTHROPIC_IDS: Record<ModelRole, string> = {
  teacher: "claude-3-5-sonnet-latest",
  deep: "claude-3-5-sonnet-latest",
  fast: "claude-3-5-haiku-latest",
};

const GOOGLE_IDS: Record<ModelRole, string> = {
  teacher: "gemini-1.5-flash",
  deep: "gemini-1.5-pro",
  fast: "gemini-1.5-flash",
};

/* -------------------------------------------------------------------------- */
/*  Provider detection                                                         */
/* -------------------------------------------------------------------------- */

export type ProviderName = "gateway" | "anthropic" | "google" | "none";

/** Returns which AI provider is configured (first match wins). */
export function activeProvider(): ProviderName {
  if (process.env.AI_GATEWAY_API_KEY) return "gateway";
  // Check Gemini BEFORE Anthropic because the @ai-sdk/anthropic package can
  // auto-inject ANTHROPIC_API_KEY pointing at a local proxy that may not be
  // running. We only trust an explicit Anthropic key (starts with "sk-ant-").
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "google";
  if (process.env.ANTHROPIC_API_KEY?.startsWith("sk-ant-")) return "anthropic";
  return "none";
}

export function isAiConfigured(): boolean {
  return activeProvider() !== "none";
}

export function configuredViaGateway(): boolean {
  return activeProvider() === "gateway";
}

/** Returns an AI SDK language model for the given role. */
export function model(role: ModelRole = "teacher") {
  const provider = activeProvider();
  switch (provider) {
    case "gateway":
      return gateway(GATEWAY_IDS[role]);
    case "anthropic":
      return anthropic(ANTHROPIC_IDS[role]);
    case "google":
      return google(GOOGLE_IDS[role]);
    default:
      // Fallback — will fail at runtime with a clear error
      return google(GOOGLE_IDS[role]);
  }
}