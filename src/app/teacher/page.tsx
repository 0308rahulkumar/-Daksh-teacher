"use client";

import { Chat } from "@/components/Chat";
import { useStateBundle } from "@/hooks/useAppState";
import { SectionTitle } from "@/components/ui";

export default function TeacherPage() {
  const { state } = useStateBundle();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-rose-600 text-white text-lg">🧑‍🏫</span>
            AI Teacher
          </h1>
          <p className="text-sm text-muted">Free-form chat — ask anything, get explanations, clear doubts, or practice.</p>
        </div>
      </div>

      <SectionTitle title="Suggested ways to start" action={<span className="text-sm text-muted">Pick one or type your own</span>} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Teach me photosynthesis", "Explain photosynthesis step by step, with an analogy."],
          ["I'm confused about Ohm's law", "I don't understand why V = IR works. Can you explain it simply?"],
          ["Quiz me on Chemical Reactions", "Quiz me on the types of chemical reactions. One question at a time."],
          ["Board-level Trigonometry", "Give me 3 board-level trigonometry questions with full solutions."],
          ["Quick revision: Life Processes", "Rapid-fire revision questions on nutrition and respiration."],
          ["Notes for Metals and Non-metals", "Make concise revision notes for metals and non-metals."],
        ].map(([title, prompt], i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-4 hover:border-accent/50 transition-colors">
            <p className="font-medium text-ink">{title}</p>
            <p className="mt-1 text-sm text-muted">{prompt}</p>
          </div>
        ))}
      </div>

      <SectionTitle title="Chat with the teacher" />
      <Chat placeholder="Ask me anything — a doubt, a topic, a quiz, or 'make notes for…'" />
    </div>
  );
}