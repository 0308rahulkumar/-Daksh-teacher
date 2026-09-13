"use client";

import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, ProgressBar, SectionTitle } from "@/components/ui";

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
    return { ...s, ...subject, total, mastered, practicing, pct };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Subjects</h1>
          <p className="text-sm text-muted">{state.profile.board} · {state.profile.medium} · {state.profile.klass}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={refresh} disabled={loading}>Refresh</Button>
        </div>
      </div>

      <SectionTitle title="Choose a subject" action={<span className="text-sm text-muted">{cards.length} subjects</span>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.id} href={`/subjects/${c.id}`}>
            <Card accent={c.accent}>
              <CardHeader title={c.name} action={<span className="text-xs text-muted">{c.chapters.length} chapters</span>} />
              <p className="text-sm text-muted mb-2">{c.tagline}</p>
              <ProgressBar value={c.mastered} max={c.total} color={c.accent} height={8} />
              <p className="mt-2 text-sm text-ink font-medium">{c.pct}% mastered</p>
              <p className="text-xs text-muted">{c.mastered} mastered · {c.practicing} learning · {c.total - c.mastered - c.practicing} not started</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}