"use client";

import { use } from "react";
import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { getChapter, getSubject } from "@/lib/syllabus";
import { Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { notFound } from "next/navigation";

interface ChapterPageProps {
  params: Promise<{ subjectId: string; chapterId: string }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const { subjectId, chapterId } = use(params);
  const subject = getSubject(subjectId);
  const chapter = getChapter(subjectId, chapterId);
  if (!subject || !chapter) notFound();

  const { state, loading, error } = useStateBundle();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading {chapter.name}…
      </div>
    );
  }

  if (error || !state) {
    return <EmptyState title="Couldn't load chapter">{error ?? "No state."}</EmptyState>;
  }

  const { progress } = state;
  const topics = chapter.topics;

  const topicRows = topics.map((t) => {
    const p = progress[subjectId]?.[chapterId]?.[t.id];
    const mastery = p?.mastery ?? "NOT_STARTED";
    const attempts = p?.attempts ?? 0;
    const correct = p?.correct ?? 0;
    const acc = attempts ? Math.round((correct / attempts) * 100) : 0;
    return { topic: t, mastery, attempts, correct, acc };
  });

  return (
    <div className="space-y-8">
      {/* Breadcrumb / header */}
      <nav className="flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <Link href={`/subjects/${subjectId}`} className="hover:text-ink">{subject.name}</Link>
        <span>/</span>
        <span className="font-medium text-ink">{chapter.name}</span>
        {chapter.branch && <span className="text-muted">({chapter.branch})</span>}
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{chapter.name}</h1>
          <p className="text-sm text-muted">{topics.length} topics</p>
        </div>
      </div>

      <SectionTitle title="Topics" action={<span className="text-sm text-muted">{topics.length} topics</span>} />

      <ul className="space-y-2" role="list">
        {topicRows.map(({ topic, mastery, attempts, correct, acc }) => (
          <li key={topic.id}>
            <Link href={`/subjects/${subjectId}/${chapterId}/${topic.id}`}>
              <Card accent={subject.accent} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-ink truncate">{topic.name}</span>
                    <MasteryBadge level={mastery} />
                  </div>
                  {topic.focus && <p className="mt-0.5 text-sm text-muted">{topic.focus}</p>}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="w-full sm:w-48">
                    <ProgressBar value={correct} max={Math.max(attempts, 1)} color={subject.accent} height={4} />
                  </div>
                  <span className="text-xs text-muted whitespace-nowrap">
                    {attempts === 0 ? "Not practised" : `${acc}% · ${correct}/${attempts}`}
                  </span>
                  <span className="text-xs text-muted hidden sm:inline">→</span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}