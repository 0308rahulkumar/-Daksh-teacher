"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useStateBundle } from "@/hooks/useAppState";
import { getChapter, getSubject } from "@/lib/syllabus";
import { Card, CardHeader, EmptyState, MasteryBadge, ProgressBar, SectionTitle } from "@/components/ui";
import { getExperimentsForChapter, type ScienceExperiment } from "@/lib/scienceExperiments";
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
  const [expandedExpId, setExpandedExpId] = useState<string | null>(null);

  const chapterExperiments = subjectId === "science" ? getExperimentsForChapter(chapterId) : [];

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
          <p className="text-sm text-muted">{topics.length} topics {chapterExperiments.length > 0 && `· ${chapterExperiments.length} NCERT Practicals`}</p>
        </div>
      </div>

      {/* Topics Section */}
      <SectionTitle title="Topics" action={<span className="text-sm text-muted">{topics.length} topics</span>} />

      <ul className="space-y-2" role="list">
        {topicRows.map(({ topic, mastery, attempts, correct, acc }) => (
          <li key={topic.id}>
            <Link href={`/subjects/${subjectId}/${chapterId}/${topic.id}`}>
              <Card accent={subject.accent} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-accent/40 transition">
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

      {/* Prescribed CBSE Practical Experiments (Class 10 Science) */}
      {chapterExperiments.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔬</span>
                <h2 className="text-lg font-bold text-ink">Prescribed CBSE Practical Experiments</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  NCERT Lab Manual
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Official board experiments for {chapter.name} with step-by-step procedures, equations, and viva questions.
              </p>
            </div>
            <Link
              href="/labs"
              className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-500 dark:text-amber-300 font-semibold border border-amber-500/30 transition self-start sm:self-auto"
            >
              <span>⚡ Open in 3D Sim Labs</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {chapterExperiments.map((exp) => {
              const isExpanded = expandedExpId === exp.id;
              return (
                <div
                  key={exp.id}
                  className="rounded-2xl border border-border/80 bg-surface p-5 shadow-xs transition hover:border-cyan-500/40"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-accent-light text-accent">
                          {exp.ncertExpNo}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted">
                          {exp.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-ink flex items-center gap-2">
                        <span>{exp.icon}</span>
                        <span>{exp.title}</span>
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        <span className="font-semibold text-ink">Aim: </span>
                        {exp.aim}
                      </p>
                      {exp.equationOrFormula && (
                        <div className="mt-2 p-2.5 rounded-lg bg-paper border border-border text-xs font-mono text-ink">
                          <span className="text-[11px] uppercase tracking-wider text-muted block mb-1 font-sans font-bold">
                            Governing Reaction / Law:
                          </span>
                          <span className="text-accent font-semibold">{exp.equationOrFormula}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0">
                      <Link
                        href="/labs"
                        className="text-xs px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30 transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>🔬 3D Sim Lab</span>
                        <span>→</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                        className="text-xs px-3 py-1.5 rounded-xl border border-border hover:bg-paper text-muted hover:text-ink transition cursor-pointer"
                      >
                        {isExpanded ? "Hide Details ▲" : "View Procedure ▼"}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Step-by-Step Procedure & Board Viva Tips */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border/60 space-y-3.5 text-xs text-ink animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-bold text-muted uppercase tracking-wider text-[11px] mb-1.5">
                          Step-by-Step Laboratory Procedure
                        </h4>
                        <ol className="space-y-1 pl-4 list-decimal text-muted">
                          {exp.procedure.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-paper border border-border">
                          <h5 className="font-bold text-ink mb-1">Key Observation</h5>
                          <p className="text-muted leading-relaxed">{exp.observations}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-paper border border-border">
                          <h5 className="font-bold text-ink mb-1">Inference</h5>
                          <p className="text-muted leading-relaxed">{exp.inference}</p>
                        </div>
                      </div>

                      {exp.vivaQuestions.length > 0 && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                          <h5 className="font-bold text-amber-500 dark:text-amber-300 flex items-center gap-1.5">
                            <span>💡</span>
                            <span>CBSE Practical Viva-Voce Question</span>
                          </h5>
                          <p className="font-medium text-ink">Q: {exp.vivaQuestions[0].q}</p>
                          <p className="text-muted">A: {exp.vivaQuestions[0].a}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
