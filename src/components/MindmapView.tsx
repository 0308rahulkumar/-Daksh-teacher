"use client";

import { useState } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { Button } from "@/components/ui";
import { getCuratedMindmap } from "@/lib/curatedContent";
import type { MindmapDoc, MindmapNode } from "@/lib/types";

interface MindmapViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

function MindmapBranchOutline({ node, depth = 1 }: { node: MindmapNode; depth?: number }) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className={`pl-4 border-l border-border/80 ml-3 ${depth > 3 ? "text-sm" : ""}`}>
      <div className="flex items-start gap-2 py-1">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-ink">{node.label}</span>
          {node.detail && <span className="ml-2 text-sm text-muted">{node.detail}</span>}
        </div>
      </div>
      {hasChildren && (
        <div className="mt-1.5 space-y-1">
          {node.children!.map((child, i) => (
            <MindmapBranchOutline key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MindmapView({ subjectId, chapterId, topicId, topicName }: MindmapViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<MindmapDoc>("mindmap", {
    subjectId,
    chapterId,
    topicId,
  });
  const [viewMode, setViewMode] = useState<"visual" | "outline">("visual");

  // Always supply high-yield curated CBSE concept map if AI data hasn't been generated yet
  const effectiveData = data ?? getCuratedMindmap(subjectId, chapterId, topicId);
  const isAiGenerated = Boolean(data);

  return (
    <div className="space-y-6">
      {/* Controls header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink">Visual Knowledge Map</h3>
            <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              {isAiGenerated ? "✨ AI Generated" : "📚 CBSE Syllabus"}
            </span>
          </div>
          <p className="text-xs text-muted">
            {topicName ?? effectiveData.root} • Hierarchical concept breakdown
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-paper p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("visual")}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                viewMode === "visual"
                  ? "bg-surface font-semibold text-accent shadow-2xs border border-border/80"
                  : "text-muted hover:text-ink"
              }`}
            >
              📊 Diagram
            </button>
            <button
              type="button"
              onClick={() => setViewMode("outline")}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                viewMode === "outline"
                  ? "bg-surface font-semibold text-accent shadow-2xs border border-border/80"
                  : "text-muted hover:text-ink"
              }`}
            >
              📋 Outline
            </button>
          </div>

          {/* AI Generator Button */}
          <Button
            variant="plasma"
            onClick={() => generate()}
            disabled={loading}
            className="text-xs"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
                Generating…
              </>
            ) : (
              "✨ Generate with AI"
            )}
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

      {/* Loading banner */}
      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent-light px-4 py-2.5 text-xs text-accent">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          Daksh AI is synthesizing an expanded, personalized concept map for {topicName ?? effectiveData.root}…
        </div>
      )}

      {/* Error alert banner */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 px-4 py-2 text-xs text-danger">
          <span>{error} — showing CBSE standard curriculum map below.</span>
          <button
            type="button"
            onClick={() => generate()}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {viewMode === "visual" ? (
        /* Editorial Diagram View */
        <div className="space-y-6">
          {/* Focal Root Node */}
          <div className="mx-auto max-w-md text-center">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 border-accent bg-surface px-8 py-4 shadow-sm">
              <span className="text-[10px] font-extrabold tracking-widest text-accent uppercase">
                Core CBSE Concept
              </span>
              <span className="mt-1 text-lg font-bold text-ink">{effectiveData.root}</span>
            </div>
            <div className="mx-auto h-8 w-0.5 bg-gradient-to-b from-accent to-accent/40" />
          </div>

          {/* Main Branches Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {effectiveData.nodes.map((node, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-accent/60 hover:shadow-xs"
              >
                <div className="mb-3 flex items-start justify-between gap-3 border-b border-border pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent text-white text-xs font-bold shadow-2xs">
                      {i + 1}
                    </span>
                    <h4 className="text-base font-bold text-ink">{node.label}</h4>
                  </div>
                </div>

                {node.detail && (
                  <p className="mb-4 text-xs leading-relaxed text-muted">
                    {node.detail}
                  </p>
                )}

                {node.children && node.children.length > 0 && (
                  <div className="mt-auto space-y-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Key Knowledge Points:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {node.children.map((c, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 rounded-lg border border-border/60 bg-paper p-2.5 text-ink transition-colors hover:border-accent/40"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <div className="flex-1">
                            <span className="font-semibold">{c.label}</span>
                            {c.detail && <p className="mt-0.5 text-muted">{c.detail}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Outline Tree View */
        <div className="rounded-xl border border-border bg-surface p-6 shadow-xs">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
            <span className="text-xl">🌳</span>
            <h4 className="text-lg font-bold text-accent">{effectiveData.root}</h4>
          </div>
          <div className="space-y-4">
            {effectiveData.nodes.map((node, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-paper/50 p-4">
                <div className="flex items-center gap-2 mb-2 font-bold text-ink">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-accent text-white text-[11px]">
                    {i + 1}
                  </span>
                  <span>{node.label}</span>
                </div>
                <MindmapBranchOutline node={node} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
