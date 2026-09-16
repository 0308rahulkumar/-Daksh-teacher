"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { Interactive3DCard } from "@/components/Interactive3DCard";
import { Scene } from "@/components/Scene";

const QUICK_DOUBTS = [
  { label: "⚡ Ohm's Law Analogy", prompt: "Explain Ohm's Law (V = IR) using a simple real-life analogy from zero." },
  { label: "🧬 Heart Circulation Flow", prompt: "Explain the double circulation of blood in the human heart with a simple visual flow." },
  { label: "🧪 Balancing Equations", prompt: "How do I easily balance chemical equations in Class 10 Chemistry? Teach me step by step." },
  { label: "📐 Quadratic Roots", prompt: "Explain why quadratic equations have at most 2 roots, and how to find them using the quadratic formula." },
  { label: "🌍 Nationalism in India", prompt: "Give me the key events and dates of the Non-Cooperation Movement for CBSE board exams." },
];

const SUBJECT_THEMES: Record<string, { icon: string; badge: string; color: string; bg: string }> = {
  science: {
    icon: "🔬",
    badge: "Physics • Chemistry • Biology",
    color: "#059669",
    bg: "from-emerald-500/10 to-teal-500/5",
  },
  mathematics: {
    icon: "📐",
    badge: "Algebra • Geometry • Trig",
    color: "#4F46E5",
    bg: "from-indigo-500/10 to-blue-500/5",
  },
  "social-science": {
    icon: "🌍",
    badge: "History • Civics • Geo • Eco",
    color: "#D97706",
    bg: "from-amber-500/10 to-orange-500/5",
  },
  english: {
    icon: "📖",
    badge: "First Flight • Footprints",
    color: "#E11D48",
    bg: "from-rose-500/10 to-pink-500/5",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { state, dueNow, loading, error, refresh } = useStateBundle();
  const [quickInput, setQuickInput] = useState("");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading your dashboard…
      </div>
    );
  }

  if (error || !state) {
    return <EmptyState title="Couldn't load dashboard">{error ?? "No state found."}</EmptyState>;
  }

  const { profile, progress, studySessions } = state;

  /* Subject progress */
  const subjStats = subjectOptions().map((s) => {
    const full = SUBJECTS.find((x) => x.id === s.id)!;
    let total = 0, mastered = 0, practicing = 0;
    for (const ch of full.chapters) {
      total += ch.topics.length;
      for (const t of ch.topics) {
        const m = progress[s.id]?.[ch.id]?.[t.id]?.mastery;
        if (m === "MASTERED") mastered++;
        else if (m === "PRACTICING" || m === "LEARNING") practicing++;
      }
    }
    const pct = total ? Math.round((mastered / total) * 100) : 0;
    const theme = SUBJECT_THEMES[s.id] ?? { icon: "📚", badge: "Class 10", color: "#4338CA", bg: "from-accent/10 to-transparent" };
    return { ...s, ...full, total, mastered, practicing, pct, theme };
  });

  /* Calculate Total Mastery */
  const totalMasteredAll = subjStats.reduce((acc, curr) => acc + curr.mastered, 0);
  const totalTopicsAll = subjStats.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = totalTopicsAll ? Math.round((totalMasteredAll / totalTopicsAll) * 100) : 0;

  /* Study streak */
  const dates = new Set(studySessions.map((s) => s.date).sort());
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  let cursor = dates.has(today) ? today : dates.has(yesterday) ? yesterday : null;
  while (cursor && dates.has(cursor)) {
    streak++;
    const d = new Date(`${cursor}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 1);
    cursor = d.toISOString().slice(0, 10);
  }

  const handleQuickAsk = (textToAsk?: string) => {
    const query = (textToAsk || quickInput).trim();
    if (!query) return;
    router.push(`/teacher?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero: Welcome + Live Student Motivation Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-accent-light/30 p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
              <span>🎯 CBSE Class 10 Boards 2026</span>
              <span>•</span>
              <span>Level {Math.floor(totalMasteredAll / 5) + 1}: {totalMasteredAll < 5 ? "Board Explorer 🚀" : totalMasteredAll < 15 ? "Concept Builder ⚡" : "Board Ranker 🏆"}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Namaste, {profile.name === "Student" ? "Future Board Topper" : profile.name}! 👋
            </h1>
            <p className="text-sm text-muted">
              {profile.board} Board • {profile.medium} Medium • Daily Target: {profile.dailyMinutes} mins/day
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={refresh} disabled={loading} className="text-xs">
              🔄 Refresh Data
            </Button>
          </div>
        </div>

        {/* Interactive Instant Doubt Launcher */}
        <div className="mt-6 rounded-xl border border-border/80 bg-paper p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuickAsk();
            }}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                💬
              </span>
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Ask any doubt or topic... (e.g. 'Explain reflection ray rules' or 'What is an exothermic reaction?')"
                className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              disabled={!quickInput.trim()}
              className="btn-plasma shrink-0"
            >
              <span className="btn-plasma-glow" aria-hidden="true" />
              <span className="btn-plasma-inner text-sm py-2 px-4">
                Ask Daksh ⚡
              </span>
            </button>
          </form>

          {/* Interactive Suggestion Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted">Quick doubts:</span>
            {QUICK_DOUBTS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickAsk(q.prompt)}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink transition-all hover:border-accent hover:bg-accent-light hover:text-accent active:scale-95"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gamified Stat Meters */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Streak */}
        <div className="rounded-xl border border-emerald-500/30 bg-surface p-5 shadow-xs transition-all hover:border-emerald-500/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Daily Streak</span>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{streak}</span>
            <span className="text-xs text-muted">Days Active</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            {streak === 0 ? "⚡ Complete 1 quiz or chat today to start your streak!" : "🎯 Great consistency! Keep learning daily."}
          </p>
        </div>

        {/* Mastery Progress */}
        <div className="rounded-xl border border-indigo-500/30 bg-surface p-5 shadow-xs transition-all hover:border-indigo-500/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Overall Syllabus Mastery</span>
            <span className="text-2xl">📊</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{overallPercentage}%</span>
            <span className="text-xs text-muted">({totalMasteredAll}/{totalTopicsAll} topics)</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={totalMasteredAll} max={totalTopicsAll} color="#4F46E5" height={6} />
          </div>
        </div>

        {/* Mistakes to Polish */}
        <Link href="/mistakes" className="block group">
          <div className="rounded-xl border border-amber-500/30 bg-surface p-5 shadow-xs transition-all hover:border-amber-500/60 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Mistake Notebook</span>
              <span className="text-2xl group-hover:scale-110 transition-transform">⚠️</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{state.mistakes.length}</span>
              <span className="text-xs text-muted">Logged Doubts</span>
            </div>
            <p className="mt-2 text-xs text-amber-700 dark:text-amber-300 font-medium">
              Click to review & turn weaknesses into marks →
            </p>
          </div>
        </Link>
      </div>

      {/* Due for revision today banner */}
      {dueNow.length > 0 && (
        <div className="rounded-xl border border-accent/40 bg-accent-light/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏰</span>
              <h2 className="text-base font-semibold text-ink">Spaced Repetition: Due for Revision Today</h2>
            </div>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
              {dueNow.length} Due
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dueNow.slice(0, 6).map((d) => (
              <Link
                key={`${d.subjectId}-${d.chapterId}-${d.topicId}`}
                href={`/subjects/${d.subjectId}/${d.chapterId}/${d.topicId}`}
                className="group rounded-lg border border-border bg-surface p-3.5 transition-all hover:border-accent hover:shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-ink group-hover:text-accent transition-colors">{d.topicName}</p>
                  <MasteryBadge level={d.mastery} />
                </div>
                <p className="mt-1 text-xs text-muted">{d.subjectName} • {d.chapterName}</p>
                <span className="mt-2 inline-block text-xs font-medium text-accent">Quick 2-min recall →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Subject Cards */}
      <div>
        <SectionTitle
          title="Class 10 CBSE Subjects"
          action={<span className="text-xs text-muted">Select a subject to practice topics & quizzes</span>}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {subjStats.map((s) => (
            <Interactive3DCard key={s.id} maxRotation={6}>
              <Link href={`/subjects/${s.id}`} className="group block">
                <div
                  className="relative overflow-hidden rounded-xl border border-border bg-surface/90 backdrop-blur-xs p-5 transition-all duration-200 hover:border-opacity-100 hover:shadow-lg"
                  style={{ borderLeftWidth: "4px", borderLeftColor: s.theme.color }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                        {s.theme.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors">
                          {s.name}
                        </h3>
                        <p className="text-xs text-muted">{s.theme.badge}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold" style={{ color: s.theme.color }}>
                        {s.pct}%
                      </span>
                      <p className="text-[11px] text-muted">{s.mastered}/{s.total} mastered</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ProgressBar value={s.mastered} max={s.total} color={s.theme.color} height={6} />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted">{s.chapters.length} Chapters • NCERT Syllabus</span>
                    <span className="font-semibold transition-transform group-hover:translate-x-1.5" style={{ color: s.theme.color }}>
                      Open Subject →
                    </span>
                  </div>
                </div>
              </Link>
            </Interactive3DCard>
          ))}
        </div>
      </div>

      {/* Quick Launch Power Actions */}
      <div>
        <SectionTitle title="Student Power Tools" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/teacher" className="group">
            <div className="h-full rounded-xl border border-border bg-surface p-4 transition-all hover:border-purple-500/60 hover:shadow-xs">
              <span className="text-2xl">🤖</span>
              <h4 className="mt-2 font-semibold text-ink group-hover:text-purple-600 transition-colors">
                AI Personal Tutor
              </h4>
              <p className="mt-1 text-xs text-muted">
                Teach from zero, explain tricky doubts, and give real-life analogies.
              </p>
            </div>
          </Link>

          <Link href="/subjects/science/chemical-reactions/chemical-equations" className="group">
            <div className="h-full rounded-xl border border-border bg-surface p-4 transition-all hover:border-emerald-500/60 hover:shadow-xs">
              <span className="text-2xl">🎯</span>
              <h4 className="mt-2 font-semibold text-ink group-hover:text-emerald-600 transition-colors">
                Quick Practice Quiz
              </h4>
              <p className="mt-1 text-xs text-muted">
                Test yourself with 5 instant MCQs and short board questions.
              </p>
            </div>
          </Link>

          <Link href="/mistakes" className="group">
            <div className="h-full rounded-xl border border-border bg-surface p-4 transition-all hover:border-amber-500/60 hover:shadow-xs">
              <span className="text-2xl">📓</span>
              <h4 className="mt-2 font-semibold text-ink group-hover:text-amber-600 transition-colors">
                Mistake Notebook
              </h4>
              <p className="mt-1 text-xs text-muted">
                Review past quiz errors and see correct explanations with marking scheme.
              </p>
            </div>
          </Link>

          <Link href="/profile" className="group">
            <div className="h-full rounded-xl border border-border bg-surface p-4 transition-all hover:border-blue-500/60 hover:shadow-xs">
              <span className="text-2xl">⚙️</span>
              <h4 className="mt-2 font-semibold text-ink group-hover:text-blue-600 transition-colors">
                My Target & Goals
              </h4>
              <p className="mt-1 text-xs text-muted">
                Customize board, language medium, and daily target study minutes.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* ThreeUI Interactive Plasma Shader Laboratory */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">ThreeUI Interactive Laboratory</span>
            <h3 className="text-lg font-bold text-ink">Plasma Quantum Field</h3>
          </div>
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
            Raw WebGL + Canvas 2D
          </span>
        </div>
        <p className="mb-4 text-xs text-muted">
          A deep-blue laboratory field with a luminous plasma control button from ThreeUI. Hover and interact with the quantum field below:
        </p>
        <div className="h-[360px] w-full overflow-hidden rounded-xl border border-border/80 shadow-inner">
          <Scene />
        </div>
      </div>
    </div>
  );
}