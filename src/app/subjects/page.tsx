"use client";

import { useState } from "react";
import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, ProgressBar, SectionTitle } from "@/components/ui";
import { SubjectBookShowcase } from "@/components/SubjectBookShowcase";
import { AnimatedTabs, type TabItem } from "@/components/motion/AnimatedTabs";

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
  "bseb-english": {
    icon: "📖",
    badge: "Panorama Part 2 · Bihar Board",
    color: "#2563EB",
    bg: "from-blue-500/10 to-indigo-500/5",
  },
  "english-grammar": {
    icon: "✍️",
    badge: "Tenses • Concord • Modals",
    color: "#6366F1",
    bg: "from-indigo-500/10 to-violet-500/5",
  },
  "hindi-grammar": {
    icon: "🕉️",
    badge: "पदबंध • वाक्य • समास • अलंकार",
    color: "#F97316",
    bg: "from-orange-500/10 to-amber-500/5",
  },
};

type SubjectCategory = "all" | "cbse" | "bseb" | "grammar";

const CATEGORY_TABS: TabItem<SubjectCategory>[] = [
  { id: "all", label: "All Volumes", icon: "📚", badge: "7" },
  { id: "cbse", label: "CBSE Core", icon: "🎓", badge: "4" },
  { id: "bseb", label: "Bihar Board (BSEB)", icon: "📖", badge: "1" },
  { id: "grammar", label: "Grammar & व्याकरण", icon: "✍️", badge: "2" },
];

export default function SubjectsIndexPage() {
  const { state, loading, error, refresh } = useStateBundle();
  const [activeCategory, setActiveCategory] = useState<SubjectCategory>("all");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading subjects…
      </div>
    );
  }

  if (error || !state) {
    return <EmptyState title="Couldn't load subjects">{error ?? "No state."}</EmptyState>;
  }

  const { progress } = state;
  const subs = subjectOptions();

  const cards = subs.map((s) => {
    const subject = SUBJECTS.find((x) => x.id === s.id)!;
    let total = 0, mastered = 0, practicing = 0;
    for (const ch of subject.chapters) {
      total += ch.topics.length;
      for (const t of ch.topics) {
        const m = progress[s.id]?.[ch.id]?.[t.id]?.mastery;
        if (m === "MASTERED") mastered++;
        else if (m === "PRACTICING" || m === "LEARNING") practicing++;
      }
    }
    const pct = total ? Math.round((mastered / total) * 100) : 0;
    const theme = SUBJECT_THEMES[s.id] ?? {
      icon: "📚",
      badge: "Class 10",
      color: "#4338CA",
      bg: "from-accent/10 to-transparent",
    };
    return { ...s, ...subject, total, mastered, practicing, pct, theme };
  });

  const filteredCards = cards.filter((s) => {
    if (activeCategory === "cbse") return ["science", "mathematics", "social-science", "english"].includes(s.id);
    if (activeCategory === "bseb") return s.id === "bseb-english";
    if (activeCategory === "grammar") return s.id === "english-grammar" || s.id === "hindi-grammar";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Class 10 Subject Volumes</h1>
          <p className="text-sm text-muted">
            {state.profile.board} · {state.profile.medium} · CBSE, Bihar Board (BSEB) & Grammar Curriculum
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={refresh} disabled={loading}>Refresh</Button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="pt-2">
        <AnimatedTabs
          tabs={CATEGORY_TABS}
          activeTab={activeCategory}
          onChange={(tab) => setActiveCategory(tab)}
        />
      </div>

      {/* Track Description Banner */}
      {activeCategory === "bseb" && (
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">📖</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink">Bihar School Examination Board (BSEB) Class 10th</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Panorama Part 2</span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Complete Prose (8 chapters), Poetry (8 poems) and Supplementary Reader (5 stories) with line summaries, character sketches & board questions.
              </p>
            </div>
          </div>
          <Link
            href="/subjects/bseb-english"
            className="text-xs px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shrink-0 flex items-center gap-1 shadow-md"
          >
            <span>Open BSEB English</span>
            <span>→</span>
          </Link>
        </div>
      )}

      {activeCategory === "grammar" && (
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-orange-500/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">✍️</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink">Bilingual Grammar Studio & Board Syllabus</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">English & Hindi</span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Master 9 English Grammar chapters (Tenses, Concord, Modals) & 9 Hindi Grammar chapters (पदबंध, वाक्य भेद, समास, वाच्य, अलंकार, मुहावरे).
              </p>
            </div>
          </div>
          <Link
            href="/grammar-lab"
            className="text-xs px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shrink-0 flex items-center gap-1 shadow-md"
          >
            <span>Launch AI Grammar Studio</span>
            <span>⚡</span>
          </Link>
        </div>
      )}

      <SectionTitle
        title={
          activeCategory === "all"
            ? "All 7 Physical Volumes & Guides"
            : activeCategory === "cbse"
            ? "CBSE Class 10 NCERT Volumes (4)"
            : activeCategory === "bseb"
            ? "Bihar Board (BSEB) Official Volume (1)"
            : "Class 10 Grammar & Vyakaran Volumes (2)"
        }
        action={<span className="text-xs text-muted">Click any book to open chapters and start studying</span>}
      />

      <SubjectBookShowcase subjects={filteredCards} />
    </div>
  );
}