"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useStateBundle, postResult } from "@/hooks/useAppState";
import { getTopic } from "@/lib/syllabus";
import { Chat } from "@/components/Chat";
import { QuizRunner } from "@/components/QuizRunner";
import { NotesView } from "@/components/NotesView";
import { FlashcardsView } from "@/components/FlashcardsView";
import { MindmapView } from "@/components/MindmapView";
import { InteractiveSimLab, getSimForTopic } from "@/components/InteractiveSimLab";
import { getExperimentsForChapter } from "@/lib/scienceExperiments";
import { Button, Card, EmptyState, MasteryBadge, SectionTitle } from "@/components/ui";
import type { Mistake, MasteryLevel } from "@/lib/types";
import { notFound } from "next/navigation";

interface TopicHubPageProps {
  params: Promise<{ subjectId: string; chapterId: string; topicId: string }>;
}

export default function TopicHubPage({ params }: TopicHubPageProps) {
  const { subjectId, chapterId, topicId } = use(params);
  const found = getTopic(subjectId, chapterId, topicId);
  if (!found) notFound();

  const { subject, chapter, topic } = found;

  return (
    <TopicHubClient
      subjectId={subjectId}
      chapterId={chapterId}
      topicId={topicId}
      subjectName={subject.name}
      chapterName={chapter.name}
      topicName={topic.name}
      topicFocus={topic.focus}
      subjectAccent={subject.accent}
    />
  );
}

interface TopicHubClientProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  subjectName: string;
  chapterName: string;
  topicName: string;
  topicFocus?: string;
  subjectAccent: string;
}

function TopicHubClient({
  subjectId,
  chapterId,
  topicId,
  subjectName,
  chapterName,
  topicName,
  topicFocus,
  subjectAccent,
}: TopicHubClientProps) {
  const { state, dueNow, recordResult } = useStateBundle();
  const mastery = state?.progress[subjectId]?.[chapterId]?.[topicId]?.mastery ?? "NOT_STARTED";
  const [activeTab, setActiveTab] = useState<
    "learn" | "notes" | "flashcards" | "quiz" | "mindmap" | "simlab" | "mistakes"
  >("learn");
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  const matchedSim = getSimForTopic(chapterId, topicId);

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "learn", label: "Learn", icon: <span className="text-lg">💬</span> },
    { id: "notes", label: "Notes", icon: <span className="text-lg">📝</span> },
    { id: "flashcards", label: "Flashcards", icon: <span className="text-lg">🃏</span> },
    { id: "quiz", label: "Quiz", icon: <span className="text-lg">🎯</span> },
    { id: "mindmap", label: "Mind map", icon: <span className="text-lg">🗺️</span> },
    {
      id: "simlab",
      label: "Sim Lab",
      icon: <span className="text-lg">🔬</span>,
      badge: matchedSim ? "3D" : undefined,
    },
    { id: "mistakes", label: "Mistakes", icon: <span className="text-lg">⚠️</span> },
  ];

  const topicMistakes = state?.mistakes.filter(
    (m) => m.subjectId === subjectId && m.chapterId === chapterId && m.topic === topicId
  ) ?? [];

  async function handleRecord(input: { total: number; correct: number; answers: import("@/lib/types").QuizAnswerRecord[] }) {
    const result = await recordResult({ subjectId, chapterId, topicId, ...input });
    if (result.newMistakes.length) setMistakes(result.newMistakes);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <nav className="mb-3 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link href={`/subjects/${subjectId}`} className="hover:text-ink">{subjectName}</Link>
          <span>/</span>
          <Link href={`/subjects/${subjectId}/${chapterId}`} className="hover:text-ink">{chapterName}</Link>
          <span>/</span>
          <span className="font-medium text-ink">{topicName}</span>
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-ink">{topicName}</h1>
            {topicFocus && <p className="text-sm text-muted">{topicFocus}</p>}
          </div>
          <div className="flex items-center gap-2">
            {matchedSim && (
              <button
                type="button"
                onClick={() => setActiveTab("simlab")}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40 flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>⚡ Launch 3D Sim</span>
              </button>
            )}
            <MasteryBadge level={mastery} />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === t.id
                ? "bg-accent-light text-accent"
                : "text-muted hover:bg-accent-light/60 hover:text-ink"
            }`}
          >
            {t.icon}
            {t.label}
            {t.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="min-h-[50vh]">
        {/* Chat preserved in DOM so tab switches do not erase the conversation */}
        <div className={activeTab === "learn" ? "block" : "hidden"}>
          <Chat
            key={`${subjectId}-${chapterId}-${topicId}`}
            subjectId={subjectId}
            chapterId={chapterId}
            topicId={topicId}
            topicName={topicName}
          />
        </div>

        {activeTab === "notes" && (
          <NotesView subjectId={subjectId} chapterId={chapterId} topicId={topicId} topicName={topicName} />
        )}

        {activeTab === "flashcards" && (
          <FlashcardsView subjectId={subjectId} chapterId={chapterId} topicId={topicId} topicName={topicName} />
        )}

        {activeTab === "quiz" && (
          <QuizRunner
            subjectId={subjectId}
            chapterId={chapterId}
            topicId={topicId}
            topicName={topicName}
            onRecorded={setMistakes}
            onRecord={recordResult}
          />
        )}

        {activeTab === "mindmap" && (
          <MindmapView subjectId={subjectId} chapterId={chapterId} topicId={topicId} topicName={topicName} />
        )}

        {activeTab === "simlab" && (
          <div className="space-y-6">
            <InteractiveSimLab simId={matchedSim ? matchedSim.id : "circuits"} />

            {(() => {
              const chapterExperiments = subjectId === "science" ? getExperimentsForChapter(chapterId) : [];
              const topicExperiments = chapterExperiments.filter(
                (e) => e.simId === matchedSim?.id || e.title.toLowerCase().includes(topicId.toLowerCase())
              );
              const experimentsToShow = topicExperiments.length > 0 ? topicExperiments : chapterExperiments;

              if (!experimentsToShow.length) return null;

              return (
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                        <span>📖</span>
                        <span>Prescribed NCERT Practical Reference for this Topic</span>
                      </h3>
                      <p className="text-xs text-muted mt-0.5">
                        Aligned with CBSE Class 10 Laboratory Manual guidelines and marking scheme.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-auto">
                      Official Board Practicals
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {experimentsToShow.map((exp) => (
                      <div key={exp.id} className="p-4 rounded-2xl border border-border/80 bg-surface space-y-3 shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded-md bg-accent-light">
                            {exp.ncertExpNo}
                          </span>
                          <span className="text-xs font-semibold text-muted">{exp.badge}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-sm flex items-center gap-2">
                            <span>{exp.icon}</span>
                            <span>{exp.title}</span>
                          </h4>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            <span className="font-semibold text-ink">Aim: </span>{exp.aim}
                          </p>
                        </div>

                        {exp.equationOrFormula && (
                          <div className="p-2.5 rounded-xl bg-paper border border-border text-xs font-mono text-ink">
                            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Governing Reaction / Law:</span>
                            <span className="text-accent font-semibold">{exp.equationOrFormula}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-paper border border-border">
                            <span className="font-bold text-ink block mb-1">Observation:</span>
                            <p className="text-muted leading-relaxed">{exp.observations}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-paper border border-border">
                            <span className="font-bold text-ink block mb-1">Inference:</span>
                            <p className="text-muted leading-relaxed">{exp.inference}</p>
                          </div>
                        </div>

                        {exp.vivaQuestions.length > 0 && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                            <span className="font-bold text-amber-500 dark:text-amber-300 block">💡 CBSE Viva Question:</span>
                            <p className="font-medium text-ink">Q: {exp.vivaQuestions[0].q}</p>
                            <p className="text-muted">A: {exp.vivaQuestions[0].a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab === "mistakes" && (
          <MistakesPanel mistakes={topicMistakes} subjectAccent={subjectAccent} />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- Mistakes panel ---------------------------------- */

interface MistakesPanelProps {
  mistakes: Mistake[];
  subjectAccent: string;
}

function MistakesPanel({ mistakes, subjectAccent }: MistakesPanelProps) {
  if (!mistakes.length) {
    return (
      <EmptyState title="No mistakes yet">
        <p>You haven&apos;t logged any mistakes on this topic. Take a quiz — any wrong answers will appear here automatically.</p>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">{mistakes.length} mistake{mistakes.length !== 1 ? "s" : ""} on this topic</p>
      <ul className="space-y-3">
        {mistakes.map((m, i) => (
          <li key={i}>
            <Card accent={subjectAccent} className="overflow-hidden">
              <div className="flex items-start justify-between gap-4 border-b border-border p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink">{m.question}</p>
                  <p className="mt-1 text-sm text-danger">Your answer: {m.studentAnswer}</p>
                  <p className="mt-1 text-sm text-success">Correct: {m.correctAnswer}</p>
                  {m.explanation && <p className="mt-2 text-sm text-muted">{m.explanation}</p>}
                </div>
                <span className="shrink-0 text-xs text-muted">{new Date(m.date).toLocaleDateString()}</span>
              </div>
              {m.category && <div className="px-4 py-2 bg-accent-light/50 text-xs text-muted">Category: {m.category}</div>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}