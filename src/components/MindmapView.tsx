"use client";

import { useState } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { EmptyState, Button } from "@/components/ui";
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
    <div className={`pl-4 border-l border-muted/30 ml-4 ${depth > 3 ? "text-sm" : ""}`}>
      <div className="flex items-start gap-2 py-0.5">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <span className="font-medium text-ink">{node.label}</span>
          {node.detail && <span className="ml-2 text-sm text-muted">{node.detail}</span>}
        </div>
      </div>
      {hasChildren && (
        <div className="mt-1 space-y-1">
          {node.children!.map((child, i) => (
            <MindmapBranchOutline key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MindmapView({ subjectId, chapterId, topicId, topicName }: MindmapViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<MindmapDoc>("mindmap", { subjectId, chapterId, topicId });
  const [viewMode, setViewMode] = useState<"visual" | "outline">("visual");

  if (!data && !loading && !error) {
    return (
      <EmptyState title="Concept Map">
        Build an editorial visual concept map for <strong>{topicName ?? "this topic"}</strong>.
        The teacher will break down the main ideas and connections following clean visualization standards.
      </EmptyState>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        Mapping out the concept structure…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="mb-2 text-sm text-danger">{error}</p>
        <Button onClick={() => generate()}>Try again</Button>
      </div>
    );
  }

  if (data) {
    return (
      <div className="space-y-6">
        {/* Controls header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">Visual Knowledge Map</h3>
            <p className="text-xs text-muted">Hierarchical concept breakdown</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-border bg-surface p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("visual")}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  viewMode === "visual"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                Diagram
              </button>
              <button
                type="button"
                onClick={() => setViewMode("outline")}
                className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                  viewMode === "outline"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                Outline
              </button>
            </div>
            <Button variant="ghost" onClick={() => clear()}>Regenerate</Button>
          </div>
        </div>

        {viewMode === "visual" ? (
          /* Editorial Diagram View following diagram-design principles */
          <div className="space-y-6">
            {/* Focal Root Node */}
            <div className="mx-auto max-w-lg text-center">
              <div className="inline-flex flex-col items-center rounded-xl border-2 border-accent bg-accent/5 px-6 py-3 shadow-xs">
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Core Concept</span>
                <span className="mt-0.5 text-base font-semibold text-ink">{data.root}</span>
              </div>
              <div className="mx-auto h-6 w-0.5 bg-accent/40" />
            </div>

            {/* Main Branches Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.nodes.map((node, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-border bg-surface p-4 transition-shadow hover:border-accent/50 hover:shadow-xs"
                >
                  <div className="mb-2 flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                    <span className="text-sm font-semibold text-ink">{node.label}</span>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-light text-[10px] font-bold text-accent">
                      {i + 1}
                    </span>
                  </div>
                  {node.detail && (
                    <p className="mb-3 text-xs leading-relaxed text-muted">{node.detail}</p>
                  )}
                  {node.children && node.children.length > 0 && (
                    <div className="mt-auto space-y-1.5 pt-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Sub-points:</span>
                      <ul className="space-y-1 text-xs">
                        {node.children.map((c, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-1.5 rounded-md bg-paper px-2 py-1 text-ink"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span className="flex-1">
                              <strong>{c.label}</strong>
                              {c.detail && <span className="ml-1 text-muted">— {c.detail}</span>}
                            </span>
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
          <div className="rounded-xl border border-border bg-surface p-5">
            <h4 className="mb-4 text-base font-semibold text-accent">{data.root}</h4>
            <div className="space-y-3">
              {data.nodes.map((node, i) => (
                <MindmapBranchOutline key={i} node={node} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}