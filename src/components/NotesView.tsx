"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGenerator } from "@/hooks/useGenerator";
import { Button, EmptyState } from "@/components/ui";
import type { NoteDoc } from "@/lib/types";

interface NotesViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

function toMarkdown(n: NoteDoc): string {
  const lines: string[] = [`# ${n.topic}\n`];
  if (n.definition) lines.push(`> ${n.definition}\n`);
  if (n.keyPoints.length) {
    lines.push("## Key points\n");
    n.keyPoints.forEach((p) => lines.push(`- ${p}`));
  }
  if (n.formulas?.length) {
    lines.push("\n## Formulas\n");
    n.formulas.forEach((f) => lines.push(`- \`${f}\``));
  }
  if (n.differences?.length) {
    lines.push("\n## Differences\n");
    lines.push("| | A | B |");
    lines.push("|---|---|---|");
    n.differences.forEach((d) => lines.push(`| **${d.label}** | ${d.a} | ${d.b} |`));
  }
  if (n.examples.length) {
    lines.push("\n## Examples\n");
    n.examples.forEach((e) => lines.push(`1. ${e}`));
  }
  if (n.commonMistakes.length) {
    lines.push("\n## Common mistakes\n");
    n.commonMistakes.forEach((m) => lines.push(`- ⚠️ ${m}`));
  }
  if (n.examKeywords.length) {
    lines.push("\n## Exam keywords\n");
    lines.push(n.examKeywords.join(" · "));
  }
  if (n.quickRevision.length) {
    lines.push("\n## Quick revision\n");
    n.quickRevision.forEach((r) => lines.push(`- ✅ ${r}`));
  }
  return lines.join("\n");
}

function copyAsMarkdown(n: NoteDoc) {
  navigator.clipboard?.writeText(toMarkdown(n)).catch(() => {});
}

export function NotesView({ subjectId, chapterId, topicId, topicName }: NotesViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<NoteDoc>("notes", { subjectId, chapterId, topicId });

  if (!data && !loading && !error) {
    return (
      <EmptyState title={`Revision notes`}>
        Generate concise, exam-oriented notes for <strong>{topicName ?? "this topic"}</strong>.
        Notes cover key points, formulas, common mistakes and quick-revision bullet lists.
      </EmptyState>
    );
  }

  return (
    <div>
      {/* Generate / regenerate controls */}
      {!data && (
        <div className="mb-4 text-center">
          <Button onClick={() => generate()} disabled={loading}>
            {loading ? "Generating…" : "Generate notes"}
          </Button>
          {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        </div>
      )}

      {loading && !data && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          The teacher is writing your notes…
        </div>
      )}

      {data && (
        <div className="prose-teacher space-y-4 text-[15px] leading-relaxed">
          {data.definition && (
            <div className="highlight-stripe rounded-r-lg py-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{`**${data.topic}** is ${data.definition}`}</ReactMarkdown>
            </div>
          )}

          {data.keyPoints.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">Key points</h4>
              <ul className="space-y-1">
                {data.keyPoints.map((p, i) => (
                  <li key={i} className="flex gap-2 text-ink">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{p}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.formulas && data.formulas.length > 0 && (
            <section className="rounded-lg bg-paper border border-border p-3">
              <h4 className="mb-2 text-sm font-semibold text-muted">Formulas</h4>
              <div className="flex flex-wrap gap-2">
                {data.formulas.map((f, i) => (
                  <code key={i} className="rounded-md bg-accent-light/70 px-2.5 py-1 text-sm text-ink">
                    {f}
                  </code>
                ))}
              </div>
            </section>
          )}

          {data.differences && data.differences.length > 0 && (
            <section className="overflow-x-auto">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">Differences</h4>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 text-left font-medium text-muted">Aspect</th>
                    <th className="px-3 py-2 text-left font-medium text-muted">A</th>
                    <th className="px-3 py-2 text-left font-medium text-muted">B</th>
                  </tr>
                </thead>
                <tbody>
                  {data.differences.map((d, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 font-medium text-ink">{d.label}</td>
                      <td className="px-3 py-2 text-ink">{d.a}</td>
                      <td className="px-3 py-2 text-ink">{d.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {data.examples.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">Examples</h4>
              <ol className="list-decimal space-y-1 pl-5">
                {data.examples.map((e, i) => (
                  <li key={i} className="text-ink"><ReactMarkdown remarkPlugins={[remarkGfm]}>{e}</ReactMarkdown></li>
                ))}
              </ol>
            </section>
          )}

          {data.commonMistakes.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-semibold text-danger">Common mistakes</h4>
              <ul className="space-y-1 text-danger/90">
                {data.commonMistakes.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span>⚠️</span>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.examKeywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {data.examKeywords.map((k, i) => (
                <span key={i} className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">{k}</span>
              ))}
            </div>
          )}

          {data.quickRevision.length > 0 && (
            <section className="rounded-lg bg-success/5 border border-success/30 p-3">
              <h4 className="mb-2 text-sm font-semibold text-success">Quick revision</h4>
              <ul className="space-y-1 text-sm text-ink">
                {data.quickRevision.map((r, i) => (
                  <li key={i} className="flex gap-2"><span className="text-success">✓</span><span>{r}</span></li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="ghost" onClick={() => clear()} className="!px-2">Clear</Button>
            <Button variant="ghost" onClick={() => copyAsMarkdown(data)} className="!px-2">Copy as Markdown</Button>
          </div>
        </div>
      )}
    </div>
  );
}