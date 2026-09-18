"use client";

import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, ProgressBar, SectionTitle } from "@/components/ui";
import { SubjectBookShowcase } from "@/components/SubjectBookShowcase";

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

export default function SubjectsIndexPage() {
  const { state, loading, error, refresh } = useStateBundle();

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Class 10 Subject Volumes</h1>
          <p className="text-sm text-muted">{state.profile.board} · {state.profile.medium} · {state.profile.klass}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={refresh} disabled={loading}>Refresh</Button>
        </div>
      </div>

      <SectionTitle
        title="Physical Volumes & NCERT Guides"
        action={<span className="text-xs text-muted">Click any book to open and read chapters</span>}
      />
      <SubjectBookShowcase subjects={cards} />
    </div>
  );
}