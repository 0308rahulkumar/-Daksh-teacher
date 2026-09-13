"use client";

import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { getSubject, chapterBranches } from "@/lib/syllabus";
import { Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { notFound } from "next/navigation";

interface SubjectPageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  const { state, loading, error } = useStateBundle();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading {subject.name}…
      </div>
    );
  }

  if (error || !state) {
    return <EmptyState title="Couldn't load subject">{error ?? "No state."}</EmptyState>;
  }

  const { progress } = state;
  const branches = chapterBranches(subjectId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg text-white text-lg" style={{ backgroundColor: subject.accent }}>
              {subject.icon}
            </span>
            {subject.name}
          </h1>
          <p className="text-sm text-muted">{subject.tagline} · {subject.chapters.length} chapters</p>
        </div>
      </div>

      {branches.map((branch) => (
        <div key={branch.branch} className="space-y-4">
          <SectionTitle title={branch.branch} action={<span className="text-sm text-muted">{branch.chapters.length} chapters</span>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branch.chapters.map((ch) => {
              let total = 0, mastered = 0, practicing = 0, needsReview = 0;
              for (const t of ch.topics) {
                total++;
                const m = progress[subjectId]?.[ch.id]?.[t.id]?.mastery;
                if (m === "MASTERED") mastered++;
                else if (m === "PRACTICING" || m === "LEARNING") practicing++;
                else if (m === "REVIEW_NEEDED") needsReview++;
              }
              const pct = total ? Math.round((mastered / total) * 100) : 0;

              return (
                <Link key={ch.id} href={`/subjects/${subjectId}/${ch.id}`}>
                  <Card accent={subject.accent}>
                    <CardHeader title={ch.name} action={<span className="text-xs text-muted">{ch.topics.length} topics</span>} />
                    <ProgressBar value={mastered} max={total} color={subject.accent} height={6} />
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <MasteryBadge level="MASTERED" count={mastered} />
                      <MasteryBadge level="PRACTICING" count={practicing} />
                      <MasteryBadge level="REVIEW_NEEDED" count={needsReview} />
                      <MasteryBadge level="NOT_STARTED" count={total - mastered - practicing - needsReview} />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}