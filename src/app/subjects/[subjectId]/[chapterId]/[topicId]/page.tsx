"use client";

import { useState } from "react";
import Link from "next/link";
import { useStateBundle, postResult } from "@/hooks/useAppState";
import { getTopic } from "@/lib/syllabus";
import { Chat } from "@/components/Chat";
import { QuizRunner } from "@/components/QuizRunner";
import { NotesView } from "@/components/NotesView";
import { FlashcardsView } from "@/components/FlashcardsView";
import { MindmapView } from "@/components/MindmapView";
import { Button, Card, EmptyState, MasteryBadge, SectionTitle } from "@/components/ui";
import type { Mistake, MasteryLevel } from "@/lib/types";
import { notFound } from "next/navigation";

interface TopicHubPageProps {
  params: Promise<{ subjectId: string; chapterId: string; topicId: string }>;
}

export default async function TopicHubPage({ params }: TopicHubPageProps) {
  const { subjectId, chapterId, topicId } = await params;
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
    "learn" | "notes" | "flashcards" | "quiz" | "mindmap" | "mistakes"
  >("learn");
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { id: "learn", label: "Learn", icon: <span className="text-lg">💬</span> },
    { id: "notes", label: "Notes", icon: <span className="text-lg">📝</span> },
    { id: "flashcards", label: "Flashcards", icon: <span className="text-lg">🃏</span> },
    { id: "quiz", label: "Quiz", icon: <span className="text-lg">🎯</span> },
    { id: "mindmap", label: "Mind map", icon: <span className="text-lg">🗺️</span> },
    { id: "mistakes", label: "Mistakes", icon: <span className="text-lg">⚠️</span> },
  ];

  const topicMistakes = state?.mistakes.filter(
    (m) => m.subjectId === subjectId && m.chapterId === chapterId && m.topic === topicId
  ) ?? [];

  async function handleRecord(input: { total: number; correct: number; answers: import("@/lib/types").QuizAnswerRecord[] }) {
    const result = await postResult({ subjectId, chapterId, topicId, ...input });
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
          <MasteryBadge level={mastery} />
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === t.id
                ? "bg-accent-light text-accent"
                : "text-muted hover:bg-accent-light/60 hover:text-ink"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="min-h-[50vh]">
        {activeTab === "learn" && (
          <Chat
            key={`${subjectId}-${chapterId}-${topicId}`}
            subjectId={subjectId}
            chapterId={chapterId}
            topicId={topicId}
            topicName={topicName}
          />
        )}

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
          />
        )}

        {activeTab === "mindmap" && (
          <MindmapView subjectId={subjectId} chapterId={chapterId} topicId={topicId} topicName={topicName} />
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