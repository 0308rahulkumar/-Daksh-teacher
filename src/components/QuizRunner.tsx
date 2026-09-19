"use client";

import { useEffect, useState } from "react";
import type { GeneratedQuizQuestion, Mistake, QuizAnswerRecord } from "@/lib/types";
import { Button, EmptyState, ProgressBar } from "@/components/ui";
import { useStateBundle, postResult } from "@/hooks/useAppState";

interface QuizRunnerProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
  onRecorded?: (mistakes: Mistake[]) => void;
  onRecord?: (input: {
    subjectId: string;
    chapterId: string;
    topicId?: string;
    total: number;
    correct: number;
    answers: QuizAnswerRecord[];
    minutes?: number;
  }) => Promise<{ newMistakes: Mistake[] }>;
}

type Phase = "loading" | "answering" | "reveal" | "summary";

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.！」!？?,]/g, "");
}

function isOptionMatch(opt: string, optIndex: number, answer: string): boolean {
  if (!answer) return false;
  const normOpt = normalize(opt);
  const normAns = normalize(answer);

  // Exact or normalized text match
  if (normOpt === normAns) return true;

  // Check letter matching ("A", "B", "C", "D" or "a", "b", "c", "d")
  const letters = ["a", "b", "c", "d"];
  if (optIndex >= 0 && optIndex < letters.length && normAns === letters[optIndex]) {
    return true;
  }

  // Check if answer is formatted like "A) Option text" or "A. Option text"
  if (optIndex >= 0 && optIndex < letters.length) {
    if (normAns.startsWith(letters[optIndex] + " ") || normAns.startsWith(letters[optIndex] + ")")) {
      return true;
    }
  }

  // Strip leading "A)", "B.", etc. and compare
  const cleanAns = normAns.replace(/^[a-d][\s).:-]+/, "").trim();
  const cleanOpt = normOpt.replace(/^[a-d][\s).:-]+/, "").trim();
  if (cleanAns && (cleanAns === cleanOpt || cleanAns === normOpt || normAns === cleanOpt)) {
    return true;
  }

  return false;
}

const LETTERS = ["A", "B", "C", "D"];

export function QuizRunner({ subjectId, chapterId, topicId, topicName, onRecorded, onRecord }: QuizRunnerProps) {
  const { recordResult } = useStateBundle();
  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [records, setRecords] = useState<QuizAnswerRecord[]>([]);
  const [saving, setSaving] = useState(false);

  const q = questions[idx];

  useEffect(() => {
    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "quiz", subjectId, chapterId, topicId, count: 5 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not generate the quiz.");
      setQuestions(data.data as GeneratedQuizQuestion[]);
      setIdx(0);
      setRecords([]);
      setSelected(null);
      setTyped("");
      setPhase("answering");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate the quiz.");
      setPhase("summary");
    }
  }

  function recordAnswer(studentAnswer: string, correct: boolean) {
    if (!q) return;
    const next = [
      ...records,
      {
        topicId: q.topicId ?? topicId,
        type: q.type,
        prompt: q.prompt,
        studentAnswer,
        correct,
        correctAnswer: q.answer ?? "",
        explanation: q.explanation ?? "",
      },
    ];
    setRecords(next);
    return next;
  }

  /** MCQ: grade, store, reveal. */
  function submitMCQ() {
    if (!q || selected === null) return;
    const selIndex = (q.options ?? []).indexOf(selected);
    const correct = isOptionMatch(selected, selIndex, q.answer ?? "");
    recordAnswer(selected, correct);
    setPhase("reveal");
  }

  /** Non-MCQ: reveal the model answer for self-mark. */
  function checkAnswer() {
    if (!q || typed.trim() === "") return;
    setPhase("reveal");
  }

  /** Non-MCQ: student self-marks against the model answer. */
  function selfMarkThenNext(correct: boolean) {
    const nextIdx = idx + 1;
    setSelected(null);
    setTyped("");
    if (nextIdx >= questions.length) {
      void finish(recordAnswer(typed, correct) ?? records);
    } else {
      recordAnswer(typed, correct);
      setIdx(nextIdx);
      setPhase("answering");
    }
  }

  /** MCQ: advance after reveal. */
  function next() {
    const nextIdx = idx + 1;
    setSelected(null);
    setTyped("");
    if (nextIdx >= questions.length) {
      void finish(records);
    } else {
      setIdx(nextIdx);
      setPhase("answering");
    }
  }

  async function finish(all: QuizAnswerRecord[]) {
    setSaving(true);
    const correct = all.filter((r) => r.correct).length;
    try {
      const recordFn = onRecord ?? recordResult ?? postResult;
      const result = await recordFn({
        subjectId,
        chapterId,
        topicId,
        total: all.length,
        correct,
        answers: all,
        minutes: Math.max(1, Math.round(all.length / 2)),
      });
      onRecorded?.(result.newMistakes);
    } catch {
      // Fallback
      try {
        const result = await postResult({
          subjectId,
          chapterId,
          topicId,
          total: all.length,
          correct,
          answers: all,
          minutes: Math.max(1, Math.round(all.length / 2)),
        });
        onRecorded?.(result.newMistakes);
      } catch {
        // Continue to summary
      }
    } finally {
      setSaving(false);
      setPhase("summary");
    }
  }

  /* ------------------------------------------------------------------ */

  if (phase === "loading") {
    return (
      <EmptyState title="Building your quiz…">
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent align-middle" />
        The teacher is writing {topicName ? `a quiz on “${topicName}”` : "your quiz"} — one moment.
      </EmptyState>
    );
  }

  if (error) {
    return (
      <EmptyState title="Couldn't start the quiz">
        {error} {/API key/i.test(error) && "Add a key to .env.local and refresh."}
      </EmptyState>
    );
  }

  if (phase === "summary" || !q) {
    const total = records.length;
    const correct = records.filter((r) => r.correct).length;
    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <div>
        <div className="mb-4 rounded-xl border border-border bg-surface px-5 py-5">
          <h4 className="mb-3 text-lg font-semibold text-ink">{saving ? "Saving your result…" : "Quiz complete"}</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-accent">{correct}/{total}</p>
              <p className="text-xs text-muted">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{acc}%</p>
              <p className="text-xs text-muted">Accuracy</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${acc >= 70 ? "text-success" : acc >= 40 ? "text-warning" : "text-danger"}`}>
                {acc >= 70 ? "Strong" : acc >= 40 ? "Practising" : "Needs review"}
              </p>
              <p className="text-xs text-muted">Mastery signal</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">
            {acc >= 75
              ? "Nice work. Wrong answers are logged to your mistake notebook; the teacher schedules the next review automatically."
              : "Your mistakes are in the Mistake notebook. Read the explanations, then take the quiz again."}
          </p>
        </div>

        <ul className="mb-4 space-y-2">
          {records.map((r, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${r.correct ? "bg-success" : "bg-danger"}`}>
                {r.correct ? "✓" : "✕"}
              </span>
              <div className="min-w-0">
                <p className="text-ink">{r.prompt}</p>
                {!r.correct && (
                  <p className="mt-1 text-xs text-muted">
                    Your answer: <span className="text-danger">{r.studentAnswer}</span>
                    {r.correctAnswer && <> · Correct: <span className="text-success">{r.correctAnswer}</span></>}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <Button onClick={() => start()}>Try again</Button>
      </div>
    );
  }

  /* ---------------- answering / reveal ---------------- */
  const answered = phase === "reveal";
  const selIndex = (q?.options ?? []).indexOf(selected ?? "");
  const mcqCorrect = answered && q ? isOptionMatch(selected ?? "", selIndex, q.answer ?? "") : false;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-muted">
          Question {idx + 1} of {questions.length}
        </span>
        <div className="w-32">
          <ProgressBar value={idx + 1} max={questions.length} height={4} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface px-5 py-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {q.type === "mcq" ? "MCQ" : q.type === "numerical" ? "Numerical" : "Short answer"}
        </p>
        <p className="mb-4 text-lg font-medium text-ink">{q.prompt}</p>

        {q.type === "mcq" ? (
          <div className="space-y-2">
            {(q.options ?? []).map((opt, i) => {
              const isSelected = selected === opt;
              const showCorrect = answered && isOptionMatch(opt, i, q.answer ?? "");
              const showWrong = answered && isSelected && !showCorrect;
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => setSelected(opt)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${
                    showCorrect
                      ? "border-success bg-success/10 text-success"
                      : showWrong
                        ? "border-danger bg-danger/10 text-danger"
                        : isSelected
                          ? "border-accent bg-accent-light text-accent"
                          : "border-border bg-paper text-ink hover:border-accent/50"
                  }`}
                >
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    showCorrect ? "bg-success text-white" : showWrong ? "bg-danger text-white" : isSelected ? "bg-accent text-white" : "border border-border bg-surface text-muted"
                  }`}>
                    {showCorrect ? "✓" : showWrong ? "✕" : LETTERS[i]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={answered}
            rows={2}
            placeholder={q.type === "numerical" ? "Type your answer (with unit)…" : "Write a short answer in your own words…"}
            className="w-full resize-none rounded-lg border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
        )}

        {/* Reveal feedback */}
        {answered && q.type === "mcq" && (
          <div className={`mt-4 rounded-lg border px-4 py-3 text-sm ${mcqCorrect ? "border-success bg-success/10" : "border-warning bg-warning/10"}`}>
            <p className={`font-medium ${mcqCorrect ? "text-success" : "text-warning"}`}>
              {mcqCorrect ? "Correct!" : "Not quite."}
            </p>
            {!mcqCorrect && (
              <p className="mt-1 text-ink">
                Correct answer: <strong>{q.answer}</strong>
              </p>
            )}
            {q.explanation && (
              <p className="mt-2 text-ink">
                <span className="font-medium">Why:</span> {q.explanation}
              </p>
            )}
          </div>
        )}

        {answered && q.type !== "mcq" && (
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent-light/60 px-4 py-3 text-sm">
            <p className="font-medium text-ink">Compare with the model answer</p>
            <p className="mt-1 rounded-md bg-surface px-3 py-2">
              <strong>{q.answer}</strong>
            </p>
            {q.explanation && <p className="mt-2 text-muted">{q.explanation}</p>}
            <div className="mt-3 flex gap-2">
              <Button variant="primary" className="!px-3 !py-1.5 text-xs" onClick={() => selfMarkThenNext(true)}>
                I got it right
              </Button>
              <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={() => selfMarkThenNext(false)}>
                I made a mistake
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        {q.type === "mcq" ? (
          answered ? (
            <Button onClick={next}>{idx + 1 >= questions.length ? "See results" : "Next question"}</Button>
          ) : (
            <Button onClick={submitMCQ} disabled={selected === null}>
              Submit answer
            </Button>
          )
        ) : answered ? null : (
          <Button onClick={checkAnswer} disabled={typed.trim() === ""}>
            Check my answer
          </Button>
        )}
      </div>
    </div>
  );
}