"use client";

import { useState } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { Button, EmptyState } from "@/components/ui";
import type { Flashcard } from "@/lib/types";

interface FlashcardsViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

export function FlashcardsView({ subjectId, chapterId, topicId, topicName }: FlashcardsViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<Flashcard[]>("flashcards", { subjectId, chapterId, topicId });
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stuck, setStuck] = useState<number[]>([]);

  const cards = data ?? [];
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

  if (!cards.length && !loading && !error) {
    return (
      <EmptyState
        title="Active-Recall Flashcards"
        action={
          <Button variant="plasma" onClick={() => generate()}>
            🃏 Generate Flashcards
          </Button>
        }
      >
        <p>
          Generate active-recall flashcards for <strong>{topicName ?? "this topic"}</strong>.
          One concept per card — flip to test your memory and strengthen weak areas.
        </p>
      </EmptyState>
    );
  }

  return (
    <div>
      {loading && !cards.length && (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          Preparing your flashcards…
        </div>
      )}
      {error && (
        <div className="mb-4 text-center">
          <p className="mb-2 text-sm text-danger">{error}</p>
          <Button onClick={() => generate()}>Try again</Button>
        </div>
      )}

      {cards.length > 0 && !done && (
        <div className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center justify-between text-xs text-muted">
            <span>Card {idx + 1} of {cards.length}</span>
            <span>{stuck.length} marked as stuck</span>
          </div>

          {/* The card */}
          <button
            onClick={() => setRevealed((r) => !r)}
            className={`relative mx-auto mb-4 flex h-64 w-full items-center justify-center rounded-2xl border border-border p-8 text-center text-lg font-medium text-ink shadow-sm transition-colors ${revealed ? "bg-accent-light" : "bg-surface hover:shadow-md"}`}
            aria-label="Flip card"
          >
            <span className="absolute top-3 right-3 text-[11px] font-medium text-muted uppercase">{revealed ? "Back" : "Front"}</span>
            <span className="leading-relaxed">{revealed ? cards[idx].back : cards[idx].front}</span>
          </button>

          {!revealed ? (
            <div className="text-center">
              <Button onClick={() => setRevealed(true)}>Reveal answer</Button>
            </div>
          ) : (
            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={() => next(true)}>
                Stuck
              </Button>
              <Button onClick={() => next(false)}>
                I know this
              </Button>
            </div>
          )}
        </div>
      )}

      {cards.length > 0 && done && (
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-surface px-5 py-6 text-center">
          <h4 className="mb-2 text-lg font-semibold text-ink">Deck complete</h4>
          <p className="mb-4 text-sm text-muted">
            You knew {cards.length - stuck.length} out of {cards.length} cards.
          </p>
          {stuck.length > 0 && (
            <div className="mb-4 rounded-lg border border-warning/30 bg-warning/10 p-3 text-left text-sm">
              <p className="mb-1 font-medium text-warning">Cards to revisit</p>
              <ul className="space-y-1 text-ink">
                {stuck.map((i) => (
                  <li key={i}>• {cards[i].front}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-center gap-2">
            <Button onClick={restart}>Try again</Button>
            <Button variant="ghost" onClick={() => clear()}>Regenerate deck</Button>
          </div>
        </div>
      )}
    </div>
  );
}