"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGenerator } from "@/hooks/useGenerator";
import { Button } from "@/components/ui";
import { getCuratedNotes } from "@/lib/curatedContent";
import type { NoteDoc } from "@/lib/types";

interface NotesViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

function toMarkdown(n: NoteDoc): string {
  const lines: string[] = [];
  lines.push("# " + n.topic);
  lines.push("*" + n.subject + " · " + n.chapter + "*\n");
  if (n.definition) lines.push("> " + n.definition + "\n");
  if (n.keyPoints && n.keyPoints.length) {
    lines.push("## Key points\n");
    n.keyPoints.forEach((p) => lines.push("- " + p));
  }
  if (n.formulas && n.formulas.length) {
    lines.push("\n## Formulas\n");
    n.formulas.forEach((f) => lines.push("- `" + f + "`"));
  }
  if (n.differences && n.differences.length) {
    lines.push("\n## Differences\n");
    lines.push("| Aspect | A | B |");
    lines.push("|---|---|---|");
    n.differences.forEach((d) => lines.push("| **" + d.label + "** | " + d.a + " | " + d.b + " |"));
  }
  if (n.examples && n.examples.length) {
    lines.push("\n## Examples\n");
    n.examples.forEach((e) => lines.push("1. " + e));
  }
  if (n.commonMistakes && n.commonMistakes.length) {
    lines.push("\n## Common mistakes\n");
    n.commonMistakes.forEach((m) => lines.push("- ⚠️ " + m));
  }
  if (n.examKeywords && n.examKeywords.length) {
    lines.push("\n## Exam keywords\n");
    lines.push(n.examKeywords.join(" · "));
  }
  if (n.quickRevision && n.quickRevision.length) {
    lines.push("\n## Quick revision\n");
    n.quickRevision.forEach((r) => lines.push("- ✅ " + r));
  }
  return lines.join("\n");
}

function copyAsMarkdown(n: NoteDoc) {
  navigator.clipboard?.writeText(toMarkdown(n)).catch(() => {});
}

export function NotesView({ subjectId, chapterId, topicId, topicName }: NotesViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<NoteDoc>("notes", { subjectId, chapterId, topicId });
  const effectiveData = data ?? getCuratedNotes(subjectId, chapterId, topicId);
  const isAiGenerated = Boolean(data);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink">Revision Notes</h3>
            <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              {isAiGenerated ? "✨ AI Generated" : "📚 CBSE Syllabus"}
            </span>
          </div>
          <p className="text-xs text-muted">
            {topicName ?? effectiveData.topic} • Core principles & exam takeaways
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="plasma"
            onClick={() => generate()}
            disabled={loading}
            className="text-xs"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
                Writing Notes…
              </>
            ) : (
              "✨ Generate with AI"
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => copyAsMarkdown(effectiveData)}
            className="text-xs text-muted hover:text-ink"
          >
            📋 Copy
          </Button>

          {isAiGenerated && (
            <Button
              variant="ghost"
              onClick={() => clear()}
              className="text-xs text-muted hover:text-ink"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent-light px-4 py-2.5 text-xs text-accent">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          The teacher is synthesizing detailed revision notes…
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 px-4 py-2 text-xs text-danger">
          <span>{error} — showing NCERT CBSE standard notes below.</span>
          <button type="button" onClick={() => generate()} className="font-semibold underline ml-2">
            Retry
          </button>
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface p-6 shadow-xs prose-teacher space-y-5 text-[15px] leading-relaxed">
        {effectiveData.definition && (
          <div className="rounded-lg border-l-4 border-accent bg-accent-light/40 p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {"**" + effectiveData.topic + "** is " + effectiveData.definition}
            </ReactMarkdown>
          </div>
        )}

        {effectiveData.keyPoints.length > 0 && (
          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Key Points</h4>
            <ul className="space-y-1.5">
              {effectiveData.keyPoints.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div className="flex-1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{p}</ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {effectiveData.formulas && effectiveData.formulas.length > 0 && (
          <section className="rounded-lg bg-paper border border-border p-4">
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Formulas & Equations</h4>
            <div className="flex flex-wrap gap-2">
              {effectiveData.formulas.map((f, i) => (
                <code key={i} className="rounded-md bg-accent-light/70 px-3 py-1.5 text-sm font-semibold text-ink border border-accent/20">
                  {f}
                </code>
              ))}
            </div>
          </section>
        )}

        {effectiveData.differences && effectiveData.differences.length > 0 && (
          <section className="overflow-x-auto">
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Key Differences</h4>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-paper/60">
                  <th className="px-3 py-2 text-left font-semibold text-muted">Aspect</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted">A</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted">B</th>
                </tr>
              </thead>
              <tbody>
                {effectiveData.differences.map((d, i) => (
                  <tr key={i} className="border-b border-border/60">
                    <td className="px-3 py-2 font-medium text-ink">{d.label}</td>
                    <td className="px-3 py-2 text-muted">{d.a}</td>
                    <td className="px-3 py-2 text-muted">{d.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {effectiveData.examples.length > 0 && (
          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Worked Examples</h4>
            <ol className="list-decimal pl-5 space-y-1 text-ink">
              {effectiveData.examples.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ol>
          </section>
        )}

        {effectiveData.commonMistakes.length > 0 && (
          <section className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4">
            <h4 className="mb-2 text-sm font-bold text-amber-600 dark:text-amber-400">⚠️ Common CBSE Board Exam Mistakes</h4>
            <ul className="space-y-1 text-sm text-ink">
              {effectiveData.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {effectiveData.examKeywords.length > 0 && (
          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Exam Keywords for Step Marks</h4>
            <div className="flex flex-wrap gap-1.5">
              {effectiveData.examKeywords.map((k, i) => (
                <span key={i} className="rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
                  {k}
                </span>
              ))}
            </div>
          </section>
        )}

        {effectiveData.quickRevision.length > 0 && (
          <section className="rounded-lg bg-success/10 border border-success/30 p-4">
            <h4 className="mb-2 text-sm font-bold text-success">✅ Quick Revision Checklist</h4>
            <ul className="space-y-1.5 text-sm text-ink">
              {effectiveData.quickRevision.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
