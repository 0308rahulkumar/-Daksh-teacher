"use client";

import { useCallback, useEffect, useState } from "react";
import type { GeneratorKind } from "@/lib/types";

interface Context {
  subjectId: string;
  chapterId: string;
  topicId: string;
}

/**
 * Fetch-on-demand generator with a 24h localStorage cache per (kind, topic),
 * so regenerating — and recharge of token budget — only happens when wanted.
 */
export function useGenerator<T>(kind: GeneratorKind, context: Context) {
  const cacheKey = `daksh:${kind}:${context.subjectId}:${context.chapterId}:${context.topicId}`;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from cache (guarded: private windows / blocked storage throw).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return;
      const cached = JSON.parse(raw) as { at?: number; data: T };
      if (cached.data && cached.at && Date.now() - cached.at < 86_400_000) {
        setData(cached.data);
      }
    } catch {
      /* ignore storage failures */
    }
  }, [cacheKey]);

  const generate = useCallback(
    async (extra?: { count?: number; difficulty?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ kind, ...context, count: extra?.count, difficulty: extra?.difficulty }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Generation failed.");
        setData(json.data as T);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data: json.data }));
        } catch {
          /* storage full or blocked — ignore */
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Generation failed.");
      } finally {
        setLoading(false);
      }
    },
    [cacheKey, kind, context.subjectId, context.chapterId, context.topicId]
  );

  const clear = useCallback(() => {
    setData(null);
    setError(null);
    try {
      localStorage.removeItem(cacheKey);
    } catch {
      /* ignore */
    }
  }, [cacheKey]);

  return { data, loading, error, generate, clear };
}