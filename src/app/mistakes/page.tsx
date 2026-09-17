"use client";

import { useState, useMemo } from "react";
import { useStateBundle, postResult } from "@/hooks/useAppState";
import { Button, Card, EmptyState, MasteryBadge, SectionTitle } from "@/components/ui";
import { SUBJECTS, getSubject, getChapter } from "@/lib/syllabus";
import type { Mistake } from "@/lib/types";
import Link from "next/link";

export default function MistakesPage() {
  const { state, resolveMistake } = useStateBundle();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-muted">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent mr-2" />
        Loading…
      </div>
    );
  }

  const { mistakes, progress } = state;
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterChapter, setFilterChapter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const subjects = SUBJECTS.filter((s) => state.profile.subjects.includes(s.id));

  const filtered = useMemo(() => {
    return mistakes
      .filter((m) => (filterSubject === "all" || m.subjectId === filterSubject))
      .filter((m) => (filterChapter === "all" || m.chapterId === filterChapter))
      .filter(
        (m) =>
          !search ||
          m.question.toLowerCase().includes(search.toLowerCase()) ||
          m.studentAnswer.toLowerCase().includes(search.toLowerCase()) ||
          m.correctAnswer.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [mistakes, filterSubject, filterChapter, search]);

  const chapterOptions = useMemo(() => {
    if (filterSubject === "all") return [];
    const subject = getSubject(filterSubject);
    return subject?.chapters ?? [];
  }, [filterSubject]);

  if (!mistakes.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600 text-white text-lg">⚠️</span>
            Mistake notebook
          </h1>
          <p className="text-sm text-muted">Wrong answers from quizzes are collected here automatically.</p>
        </div>
        <EmptyState title="Your mistake notebook is empty">
          <p>Take a quiz on any topic — wrong answers appear here with the correct solution and an explanation.</p>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600 text-white text-lg">⚠️</span>
            Mistake notebook
          </h1>
          <p className="text-sm text-muted">{mistakes.length} total mistake{mistakes.length !== 1 ? "s" : ""} · {filtered.length} shown</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterSubject}
          onChange={(e) => { setFilterSubject(e.target.value); setFilterChapter("all"); }}
          className="rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
          ))}
        </select>
        {filterSubject !== "all" && (
          <select
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
            className="rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent"
          >
            <option value="all">All chapters</option>
            {chapterOptions.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
            ))}
          </select>
        )}
        <div className="flex-1 min-w-[200px]">
          <input
            type="search"
            placeholder="Search questions, answers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        </div>
      </div>

      {/* List */}
      <ul className="space-y-3" role="list">
        {filtered.map((m, i) => {
          const subject = getSubject(m.subjectId);
          const chapter = getChapter(m.subjectId, m.chapterId);
          const mastery = m.topic ? progress[m.subjectId]?.[m.chapterId]?.[m.topic]?.mastery : undefined;
          return (
            <li key={i}>
              <Card accent={subject?.accent} className="overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-border p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      {subject && <span className="font-medium text-ink">{subject.icon} {subject.name}</span>}
                      {chapter && <span className="text-muted">→ {chapter.name}</span>}
                      {m.topic && <span className="text-muted">→ {m.topic}</span>}
                    </div>
                    <p className="font-medium text-ink">{m.question}</p>
                    <p className="mt-1 text-sm text-danger">Your answer: {m.studentAnswer}</p>
                    <p className="mt-1 text-sm text-success">Correct: {m.correctAnswer}</p>
                    {m.explanation && <p className="mt-2 text-sm text-muted">{m.explanation}</p>}

                    <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const originalIdx = mistakes.findIndex((x) => x === m || (x.date === m.date && x.question === m.question));
                            if (originalIdx !== -1) resolveMistake(originalIdx);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition cursor-pointer"
                        >
                          <span>✅</span>
                          <span>Mark as Understood</span>
                        </button>
                      </div>

                      {m.topic && (
                        <Link
                          href={`/subjects/${m.subjectId}/${m.chapterId}/${m.topic}`}
                          className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
                        >
                          <span>Retest in Topic Lab</span>
                          <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="text-xs text-muted">{new Date(m.date).toLocaleDateString()}</span>
                    {mastery && <MasteryBadge level={mastery} />}
                  </div>
                </div>
                {m.category && <div className="px-4 py-2 bg-accent-light/50 text-xs text-muted">Category: {m.category}</div>}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}