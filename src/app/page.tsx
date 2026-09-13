"use client";

import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { SUBJECTS, subjectOptions } from "@/lib/syllabus";
import { Button, Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import type { MasteryLevel } from "@/lib/types";

export default function DashboardPage() {
  const { state, dueNow, loading, error, refresh } = useStateBundle();

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
    let total = 0, mastered = 0;
    for (const ch of full.chapters) {
      total += ch.topics.length;
      for (const t of ch.topics) {
        if (progress[s.id]?.[ch.id]?.[t.id]?.mastery === "MASTERED") mastered++;
      }
    }
    const pct = total ? Math.round((mastered / total) * 100) : 0;
    return { ...s, ...full, total, mastered, pct };
  });

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

  /* Next action: the most recent topic the student was on */
  const lastQuiz = state.quizHistory.at(-1);
  const lastTopicLink = lastQuiz
    ? `/subjects/${lastQuiz.subjectId}/${lastQuiz.chapterId}${lastQuiz.topicId ? `/${lastQuiz.topicId}` : ""}`
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Welcome back, {profile.name === "Student" ? "there" : profile.name}! 👋
          </h1>
          <p className="text-sm text-muted">
            {profile.board} · {profile.medium} · {profile.dailyMinutes} min/day goal
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={refresh} disabled={loading}>Refresh</Button>
        </div>
      </div>

      {/* Streak + quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card accent="#16A34A">
          <CardHeader title="Current streak" />
          <p className="text-3xl font-bold text-success">{streak}</p>
          <p className="text-xs text-muted">consecutive days</p>
        </Card>
        <Card accent="#4338CA">
          <CardHeader title="Sessions this week" />
          <p className="text-3xl font-bold text-accent">
            {studySessions.filter((s) => {
              const d = new Date(s.date);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return d >= weekAgo;
            }).length}
          </p>
          <p className="text-xs text-muted">study sessions logged</p>
        </Card>
        <Card accent="#D97706">
          <CardHeader title="Mistakes logged" />
          <p className="text-3xl font-bold text-warning">{state.mistakes.length}</p>
          <p className="text-xs text-muted">to review in your notebook</p>
        </Card>
      </div>

      {/* Due for revision today */}
      {dueNow.length > 0 && (
        <>
          <SectionTitle title="Due for revision today" action={<span className="text-sm text-muted">{dueNow.length} topic{dueNow.length !== 1 ? "s" : ""}</span>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dueNow.slice(0, 9).map((d) => (
              <Link key={`${d.subjectId}-${d.chapterId}-${d.topicId}`} href={`/subjects/${d.subjectId}/${d.chapterId}/${d.topicId}`}>
                <Card accent={SUBJECTS.find((s) => s.id === d.subjectId)?.accent}>
                  <p className="font-medium text-ink">{d.topicName}</p>
                  <p className="text-xs text-muted">{d.subjectName} → {d.chapterName}</p>
                  <MasteryBadge level={d.mastery} className="mt-2 inline-block" />
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Subject progress bars */}
      <SectionTitle title="Your subjects" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjStats.map((s) => (
          <Link key={s.id} href={`/subjects/${s.id}`}>
            <Card accent={s.accent}>
              <CardHeader title={s.name} action={<span className="text-xs text-muted">{s.mastered}/{s.total} mastered</span>} />
              <ProgressBar value={s.mastered} max={s.total} color={s.accent} height={8} />
              <p className="mt-2 text-sm font-medium text-ink">{s.pct}% mastered</p>
              <p className="text-xs text-muted">{s.tagline}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <SectionTitle title="Quick actions" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {lastTopicLink && (
          <Link href={lastTopicLink}>
            <Card accent="#4338CA">
              <CardHeader title="Continue where you left off" />
              <p className="text-sm text-muted">{lastQuiz!.topicId ? `Topic: ${lastQuiz!.topicId}` : `Chapter: ${lastQuiz!.chapterId}`}</p>
              <p className="mt-2 text-xs text-muted">Your last practice session</p>
            </Card>
          </Link>
        )}
        <Link href="/teacher">
          <Card accent="#BE185D">
            <CardHeader title="Ask the AI teacher" />
            <p className="text-sm text-muted">Free-form chat — doubts, explanations, anything</p>
          </Card>
        </Link>
        <Link href="/mistakes">
          <Card accent="#DC2626">
            <CardHeader title="Review mistakes" />
            <p className="text-sm text-muted">{state.mistakes.length} logged mistake{state.mistakes.length !== 1 ? "s" : ""}</p>
          </Card>
        </Link>
        <Link href="/profile">
          <Card accent="#0D9488">
            <CardHeader title="My profile" />
            <p className="text-sm text-muted">Edit name, board, goals, study time</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}