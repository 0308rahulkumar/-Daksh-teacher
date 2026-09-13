"use client";

import { useGenerator } from "@/hooks/useGenerator";
import { EmptyState, Button } from "@/components/ui";
import type { MindmapDoc, MindmapNode } from "@/lib/types";

interface MindmapViewProps {
  subjectId: string;
  chapterId: string;
  topicId: string;
  topicName?: string;
}

function MindmapBranch({ node, depth = 1 }: { node: MindmapNode; depth?: number }) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className={`pl-4 border-l border-muted/30 ml-4 ${depth > 3 ? "text-sm" : ""}`}>
      <div className="flex items-start gap-2 py-0.5">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted/50" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <span className="font-medium text-ink">{node.label}</span>
          {node.detail && <span className="ml-2 text-muted">{node.detail}</span>}
        </div>
      </div>
      {hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <MindmapBranch key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MindmapView({ subjectId, chapterId, topicId, topicName }: MindmapViewProps) {
  const { data, loading, error, generate, clear } = useGenerator<MindmapDoc>("mindmap", { subjectId, chapterId, topicId });

  if (!data && !loading && !error) {
    return (
      <EmptyState title="Mind map">
        Build a visual concept map for <strong>{topicName ?? "this topic"}</strong>.
        The teacher will lay out the main ideas and their sub-concepts so you can see how everything connects.
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
      <div className="prose-teacher">
        <h3 className="mb-4 text-xl font-semibold text-ink">{data.root}</h3>
        <div className="space-y-2">
          {data.nodes.map((node, i) => (
            <MindmapBranch key={i} node={node} />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="ghost" onClick={() => clear()}>Regenerate</Button>
        </div>
      </div>
    );
  }

  return null;
}