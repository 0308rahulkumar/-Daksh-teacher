"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chat } from "@/components/Chat";
import { useStateBundle } from "@/hooks/useAppState";
import { SectionTitle } from "@/components/ui";

const SUGGESTED_CARDS = [
  {
    title: "⚡ Explain Ohm's law with an analogy",
    tag: "Physics",
    prompt: "Teach me Ohm's Law (V = IR) using a simple real-life analogy from zero.",
  },
  {
    title: "🧬 Journey of Food in Digestion",
    tag: "Biology",
    prompt: "Explain the journey of food through the human digestive system step by step.",
  },
  {
    title: "🧪 Balancing Chemical Equations",
    tag: "Chemistry",
    prompt: "How do I balance chemical equations in Class 10? Give me 2 worked examples and 1 for me to solve.",
  },
  {
    title: "📐 Quadratic Roots & Formula",
    tag: "Mathematics",
    prompt: "Explain the quadratic formula and how the discriminant determines the nature of roots.",
  },
  {
    title: "🎯 3-Mark CBSE Answer Structure",
    tag: "Exam Skills",
    prompt: "Teach me how to write a high-scoring 3-mark CBSE science answer with bullet points.",
  },
  {
    title: "📝 Notes on Metals & Non-Metals",
    tag: "Revision",
    prompt: "Give me concise revision notes with exceptions for Metals and Non-metals.",
  },
];

function TeacherContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [activePrompt, setActivePrompt] = useState(initialQuery);
  const { state } = useStateBundle();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading your AI teacher…
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl shadow-xs">
              🧑‍🏫
            </span>
            Daksh — Personal CBSE Teacher
          </h1>
          <p className="text-sm text-muted">
            Free-form Socratic teaching • Explains from zero • Follows CBSE syllabus
          </p>
        </div>
      </div>

      {/* Suggested interactive starters */}
      <div>
        <SectionTitle
          title="Click to start a lesson instantly"
          action={<span className="text-xs text-muted">Tap any card to ask</span>}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUGGESTED_CARDS.map((card, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActivePrompt(card.prompt)}
              className="group text-left rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:border-accent hover:bg-accent-light/30 hover:shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {card.tag}
                </span>
                <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  Ask →
                </span>
              </div>
              <p className="font-semibold text-sm text-ink group-hover:text-accent transition-colors">
                {card.title}
              </p>
              <p className="mt-1 text-xs text-muted line-clamp-2">{card.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chat Interface */}
      <div>
        <SectionTitle title="Live Conversation" />
        <Chat
          key={activePrompt}
          initialPrompt={activePrompt}
          placeholder="Ask me anything — 'teach me respiration', 'give me 2 MCQs', or 'clear my doubt'..."
        />
      </div>
    </div>
  );
}

export default function TeacherPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-muted">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
          Loading…
        </div>
      }
    >
      <TeacherContent />
    </Suspense>
  );
}