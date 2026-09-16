"use client";

import { useState } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { Button } from "@/components/ui";
import { getCuratedFlashcards } from "@/lib/curatedContent";
import type { Flashcard } from "@/lib/types";

interface FlashcardsViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

export function FlashcardsView({ subjectId, chapterId, topicId, topicName }: FlashcardsViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<Flashcard[]>("flashcards", {
    subjectId,
    chapterId,
    topicId,
  });
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stuck, setStuck] = useState<number[]>([]);

  // Always supply curated flashcards if AI flashcards haven't been generated yet
  const cards = data && data.length > 0 ? data : getCuratedFlashcards(subjectId, chapterId, topicId);
  const isAiGenerated = Boolean(data && data.length > 0);
  const current = cards[idx];
  const done = idx >= cards.length;

  function next(markStuck: boolean) {
    if (markStuck) setStuck((s) => [...s, idx]);
    setIdx((i) => i + 1);
    setRevealed(false);
  }

  function restart() {
    setIdx(0);
    setStuck([]);
    setRevealed(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink">Active-Recall Flashcards</h3>
            <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              {isAiGenerated ? "✨ AI Generated" : "📚 CBSE Syllabus"}
            </span>
          </div>
          <p className="text-xs text-muted">
            {topicName ?? "Topic"} • Test your memory before looking at the answer
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="plasma"
            onClick={() => generate()}
            disabled={loading}
            className="text-xs"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
                Generating…
              </>
            ) : (
              "✨ Generate with AI"
            )}
          </Button>

          {isAiGenerated && (
            <Button
              variant="ghost"
              onClick={() => clear()}
              className="text-xs text-muted hover:text-ink"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent-light px-4 py-2.5 text-xs text-accent">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          Daksh AI is synthesizing active-recall flashcards…
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 px-4 py-2 text-xs text-danger">
          <span>{error} — showing CBSE standard flashcards below.</span>
          <button type="button" onClick={() => generate()} className="font-semibold underline ml-2">
            Retry
          </button>
        </div>
      )}

      {done ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-xs">
          <span className="text-4xl">🎉</span>
          <h4 className="mt-3 text-xl font-bold text-ink">Deck Completed!</h4>
          <p className="mt-1 text-sm text-muted">
            You reviewed {cards.length} cards ({cards.length - stuck.length} mastered, {stuck.length} flagged for review).
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={restart}>
              🔄 Review Deck Again
            </Button>
            <Button variant="plasma" onClick={() => generate()} disabled={loading}>
              ✨ Generate More Cards
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Card {idx + 1} of {cards.length}</span>
            <span>{stuck.length > 0 ? `${stuck.length} flagged` : "All correct so far"}</span>
          </div>

          {/* Flashcard Card */}
          <div
            onClick={() => setRevealed(!revealed)}
            className="group min-h-[220px] cursor-pointer rounded-2xl border-2 border-border bg-surface p-8 shadow-xs transition-all hover:border-accent/60 flex flex-col justify-between select-none"
          >
            <div>
              <span className="inline-block rounded-full bg-paper px-3 py-1 text-xs font-semibold text-muted border border-border">
                {revealed ? "Answer" : "Question • Click card to flip"}
              </span>
              <p className="mt-4 text-lg font-bold text-ink leading-snug">
                {revealed ? current.back : current.front}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-muted">
              <span className="group-hover:text-accent font-medium transition-colors">
                {revealed ? "🔄 Click to hide answer" : "👁️ Click anywhere to reveal answer"}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted/80">Space / Click</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => next(true)}
              className="flex-1 text-xs sm:text-sm text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/10"
            >
              🤔 Need Review (Again)
            </Button>
            <Button
              variant="primary"
              onClick={() => next(false)}
              className="flex-1 text-xs sm:text-sm bg-success text-white hover:bg-success/90"
            >
              ✅ Mastered (Got It)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
