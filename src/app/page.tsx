"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { Interactive3DCard } from "@/components/Interactive3DCard";
import { SubjectBookShowcase } from "@/components/SubjectBookShowcase";

const QUICK_DOUBTS = [
  { label: "⚡ Ohm's Law Analogy", prompt: "Explain Ohm's Law (V = IR) using a simple real-life analogy from zero." },
  { label: "🧬 Heart Circulation Flow", prompt: "Explain the double circulation of blood in the human heart with a simple visual flow." },
  { label: "🧪 Balancing Equations", prompt: "How do I easily balance chemical equations in Class 10 Chemistry? Teach me step by step." },
  { label: "📐 Quadratic Roots", prompt: "Explain why quadratic equations have at most 2 roots, and how to find them using the quadratic formula." },
  { label: "🌍 Nationalism in India", prompt: "Give me the key events and dates of the Non-Cooperation Movement for CBSE board exams." },
];

const FORMULA_VAULT = [
  {
    category: "Physics — Electricity & Light",
    items: [
      { name: "Ohm's Law", formula: "V = I × R (Potential = Current × Resistance)" },
      { name: "Electric Power", formula: "P = V × I = I²R = V² / R" },
      { name: "Joule's Heating Law", formula: "H = I² × R × t" },
      { name: "Mirror Formula", formula: "1/f = 1/v + 1/u  (m = -v/u = h'/h)" },
      { name: "Lens Formula", formula: "1/f = 1/v - 1/u  (m = +v/u = h'/h)" },
      { name: "Power of Lens", formula: "P = 1/f (in meters), Unit: Dioptre (D)" },
    ],
  },
  {
    category: "Chemistry — Important Reactions & Colors",
    items: [
      { name: "Lead Nitrate Heating", formula: "2Pb(NO₃)₂ → 2PbO (yellow) + 4NO₂ (brown fumes) + O₂" },
      { name: "Ferrous Sulphate Heating", formula: "2FeSO₄ (green) → Fe₂O₃ (red-brown) + SO₂ + SO₃" },
      { name: "Precipitation (Double Disp.)", formula: "Pb(NO₃)₂ + 2KI → PbI₂ ↓ (Yellow ppt) + 2KNO₃" },
      { name: "Quick Lime Slaking", formula: "CaO (quicklime) + H₂O → Ca(OH)₂ (slaked lime) + Heat" },
      { name: "Chlor-Alkali Process", formula: "2NaCl + 2H₂O → 2NaOH + Cl₂ (anode) + H₂ (cathode)" },
    ],
  },
  {
    category: "Mathematics — Core Board Formulas",
    items: [
      { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / (2a)  [D = b² - 4ac]" },
      { name: "Arithmetic Progression (AP)", formula: "aₙ = a + (n-1)d  |  Sₙ = n/2 [2a + (n-1)d]" },
      { name: "Trig Fundamental Identity", formula: "sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ" },
      { name: "Distance & Section Formula", formula: "d = √((x₂-x₁)² + (y₂-y₁)²), P = ((m₁x₂+m₂x₁)/(m₁+m₂), ...)" },
      { name: "Surface Area & Volume", formula: "Cone: πrl, Sphere: 4πr², Cylinder: 2πrh" },
    ],
  },
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
    color: "#D97706",
    bg: "from-amber-500/10 to-orange-500/5",
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
  const { state, dueNow, loading, error, refresh, saveProfile } = useStateBundle();
  const [quickInput, setQuickInput] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showFormulaVault, setShowFormulaVault] = useState(false);

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

  const { profile, progress, studySessions, quizHistory } = state;

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

  /* Detailed Student Statistics */
  const totalQuizzes = quizHistory.length;
  const totalQuestionsAnswered = quizHistory.reduce((acc, q) => acc + q.total, 0);
  const totalQuestionsCorrect = quizHistory.reduce((acc, q) => acc + q.correct, 0);
  const quizAccuracy = totalQuestionsAnswered > 0 ? Math.round((totalQuestionsCorrect / totalQuestionsAnswered) * 100) : 0;

  const todaySessions = studySessions.filter((s) => s.date === today);
  const minutesToday = todaySessions.reduce((acc, s) => acc + s.minutes, 0);

  // Dynamic CBSE Board Exam Countdown (Upcoming February 15th)
  const now = new Date();
  const currentYear = now.getFullYear();
  const examYear = (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() >= 15)) ? currentYear + 1 : currentYear;
  const targetExamDate = new Date(`${examYear}-02-15T09:00:00Z`);
  const diffTime = targetExamDate.getTime() - now.getTime();
  const daysRemaining = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const studentLevel = Math.floor(totalMasteredAll / 5) + 1;
  const studentRank = totalMasteredAll < 5 ? "Board Explorer 🚀" : totalMasteredAll < 15 ? "Concept Builder ⚡" : "Board Ranker 🏆";

  const handleQuickAsk = (textToAsk?: string) => {
    const query = (textToAsk || quickInput).trim();
    if (!query) return;
    router.push(`/teacher?q=${encodeURIComponent(query)}`);
  };

  const handleStartEditName = () => {
    setNameInput(profile.name === "Student" ? "" : profile.name);
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      await saveProfile({ name: trimmed });
    }
    setIsEditingName(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* ==================================================================== */}
      {/*  STUDENT COMMAND CENTER: NAME, STATS & EXAM GOAL                     */}
      {/* ==================================================================== */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-2xl p-6 shadow-sm">
        {/* Header Strip: Name, Avatar & Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/50">
          <div className="flex items-start gap-4">
            {/* Student Avatar with Level Badge */}
            <div className="relative shrink-0">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-accent to-amber-300 grid place-items-center text-3xl shadow-md select-none">
                🎓
              </div>
              <span className="absolute -bottom-1 -right-1 text-[11px] bg-surface border border-border rounded-full px-1.5 py-0.5 font-bold shadow-xs">
                Lvl {studentLevel}
              </span>
            </div>

            <div className="space-y-1">
              {/* Student Name with Inline Quick Edit */}
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Enter student name"
                      className="rounded-lg border border-accent bg-paper px-3 py-1 text-base font-bold text-ink focus:outline-none focus:ring-1 focus:ring-accent"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") setIsEditingName(false);
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleSaveName}
                      className="rounded-md bg-accent text-white px-2.5 py-1 text-xs font-semibold hover:bg-accent/90 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingName(false)}
                      className="rounded-md border border-border px-2 py-1 text-xs text-muted hover:text-ink cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      {profile.name === "Student" ? "Board Scholar" : profile.name}
                    </h1>
                    <button
                      type="button"
                      onClick={handleStartEditName}
                      title="Click to edit your name"
                      className="text-muted hover:text-accent p-1 rounded-md transition-colors text-sm cursor-pointer"
                    >
                      ✏️
                    </button>
                  </div>
                )}
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold">
                  ● Class 10 Scholar
                </span>
              </div>

              {/* Badges & Meta */}
              <p className="text-sm text-muted flex flex-wrap items-center gap-2">
                <span>CBSE Class 10 ({profile.medium} Medium)</span>
                <span>•</span>
                <span className="text-accent font-medium">Target: 95%+ Board Exam</span>
                <span>•</span>
                <span className="font-mono text-xs bg-accent-light/60 text-accent px-2 py-0.5 rounded-md font-semibold">
                  {studentRank}
                </span>
              </p>
            </div>
          </div>

          {/* Live CBSE 2026 Countdown & Tools */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2.5 shrink-0">
            <div className="rounded-xl border border-border/80 bg-paper/60 px-4 py-2 text-right">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
                CBSE {examYear} Board Exam
              </span>
              <span className="text-lg font-extrabold text-ink font-mono">
                ⏳ {daysRemaining} Days Remaining
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/labs"
                className="text-xs px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-300 font-bold hover:from-amber-500/30 hover:to-orange-500/30 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>🔬</span>
                <span>3D Sim Labs</span>
                <span className="text-[10px] px-1 rounded bg-amber-500/20">NEW</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowFormulaVault(!showFormulaVault)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-accent/40 bg-accent-light/30 text-accent font-medium hover:bg-accent-light/60 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>📐</span>
                <span>{showFormulaVault ? "Close Formulas" : "Formulas Vault"}</span>
              </button>
              <Button variant="secondary" onClick={refresh} disabled={loading} className="text-xs py-1.5 px-2.5">
                🔄 Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Student KPI Performance Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="rounded-xl border border-border/70 bg-paper/50 backdrop-blur-md p-3 text-center">
            <span className="block text-xs text-muted mb-1 font-medium">Syllabus Mastered</span>
            <span className="text-xl font-black text-ink font-mono">{totalMasteredAll} / {totalTopicsAll}</span>
            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-semibold">
              {overallPercentage}% Complete
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-paper/50 backdrop-blur-md p-3 text-center">
            <span className="block text-xs text-muted mb-1 font-medium">Questions Solved</span>
            <span className="text-xl font-black text-ink font-mono">{totalQuestionsAnswered}</span>
            <span className="block text-[10px] text-muted mt-0.5 font-medium">
              across {totalQuizzes} quizzes
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-paper/50 backdrop-blur-md p-3 text-center">
            <span className="block text-xs text-muted mb-1 font-medium">Quiz Accuracy</span>
            <span className="text-xl font-black text-ink font-mono">{quizAccuracy}%</span>
            <span className="block text-[10px] text-accent mt-0.5 font-semibold">
              {totalQuestionsCorrect} correct answers
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-paper/50 backdrop-blur-md p-3 text-center">
            <span className="block text-xs text-muted mb-1 font-medium">Daily Study Goal</span>
            <span className="text-xl font-black text-ink font-mono">{minutesToday}m / {profile.dailyMinutes}m</span>
            <span className="block text-[10px] text-muted mt-0.5 font-medium">
              {profile.dailyMinutes - minutesToday > 0
                ? `${profile.dailyMinutes - minutesToday}m to reach goal`
                : "Daily Goal Achieved! 🎯"}
            </span>
          </div>
        </div>

        {/* Interactive 3D STEM Labs Feature Banner */}
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-cyan-500/10 p-3.5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">🔬</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink">Interactive STEM Visual Laboratories</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">3D Simulation</span>
              </div>
              <p className="text-[11px] text-muted">Build DC Circuits, trace Snell's light refraction, watch heart double circulation, and explore quadratic parabolas.</p>
            </div>
          </div>
          <Link
            href="/labs"
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shrink-0 flex items-center gap-1 shadow-sm"
          >
            <span>Launch Labs</span>
            <span>→</span>
          </Link>
        </div>

        {/* Instant Doubt AI Launcher */}
        <div className="mt-6 rounded-xl border border-border/80 bg-paper/70 p-3 sm:p-4">
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
              className="btn-plasma shrink-0 cursor-pointer"
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
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink transition-all hover:border-accent hover:bg-accent-light hover:text-accent active:scale-95 cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/*  FORMULA & REACTION VAULT (1-CLICK DRAWER)                           */}
      {/* ==================================================================== */}
      {showFormulaVault && (
        <div className="rounded-2xl border border-accent/40 bg-surface/95 backdrop-blur-2xl p-6 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📐</span>
              <div>
                <h3 className="text-lg font-bold text-ink">Class 10 CBSE Formula & Key Reaction Vault</h3>
                <p className="text-xs text-muted">High-frequency formulas and equations tested in Board Exams</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowFormulaVault(false)}
              className="rounded-lg border border-border px-3 py-1 text-xs text-muted hover:text-ink hover:border-accent cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FORMULA_VAULT.map((sec, idx) => (
              <div key={idx} className="rounded-xl border border-border/70 bg-paper/60 p-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                  {sec.category}
                </h4>
                <div className="space-y-2">
                  {sec.items.map((it, i) => (
                    <div key={i} className="text-xs border-b border-border/30 pb-1.5 last:border-0 last:pb-0">
                      <span className="font-semibold text-ink block">{it.name}:</span>
                      <span className="font-mono text-muted text-[11px] block mt-0.5">{it.formula}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gamified Stat Meters */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Streak */}
        <div className="rounded-xl border border-emerald-500/30 bg-surface backdrop-blur-xl p-5 shadow-xs transition-all hover:border-emerald-500/60">
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
        <div className="rounded-xl border border-indigo-500/30 bg-surface backdrop-blur-xl p-5 shadow-xs transition-all hover:border-indigo-500/60">
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
          <div className="rounded-xl border border-amber-500/30 bg-surface backdrop-blur-xl p-5 shadow-xs transition-all hover:border-amber-500/60 hover:-translate-y-0.5">
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

      {/* Interactive 3D Subject Book Showcase */}
      <div>
        <SectionTitle
          title="CBSE Class 10 Volumes & Curriculum"
          action={<span className="text-xs text-muted">Click any book to open and flip through chapters</span>}
        />
        <SubjectBookShowcase subjects={subjStats} />
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
            <div className="h-full rounded-xl border border-border bg-surface p-4 transition-all hover:border-amber-500/60 hover:shadow-xs">
              <span className="text-2xl">⚙️</span>
              <h4 className="mt-2 font-semibold text-ink group-hover:text-amber-500 transition-colors">
                My Target & Goals
              </h4>
              <p className="mt-1 text-xs text-muted">
                Customize board, language medium, and daily target study minutes.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}