// Reusable UI primitives — intentionally minimal; no design-system library.

import type { ReactNode } from "react";
import type { MasteryLevel } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Card                                                                       */
/* -------------------------------------------------------------------------- */

export function Card({
  children,
  className = "",
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: string; // hex border-left color
}) {
  return (
    <div
      className={`rounded-xl border border-border/80 bg-surface backdrop-blur-xl px-5 py-4 shadow-sm transition-all ${className}`}
      style={accent ? { borderLeftWidth: "3px", borderLeftColor: accent } : undefined}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Badge — mastery                                                            */
/* -------------------------------------------------------------------------- */

const MASTERY_STYLES: Record<MasteryLevel, string> = {
  NOT_STARTED: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
  LEARNING: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  PRACTICING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  REVIEW_NEEDED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  MASTERED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export function MasteryBadge({
  level,
  className = "",
  count,
}: {
  level: MasteryLevel;
  className?: string;
  count?: number; // optional number shown before label
}) {
  const label = level === "REVIEW_NEEDED" ? "Needs review" : level.replace("_", " ").toLowerCase();
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${MASTERY_STYLES[level]} ${className}`}>
      {count !== undefined && <span>{count}</span>}
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress bar                                                               */
/* -------------------------------------------------------------------------- */

export function ProgressBar({
  value,
  max = 100,
  color = "var(--accent)",
  height = 6,
  label,
}: {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      {label && <div className="mb-1 text-xs text-muted">{label}</div>}
      <div
        className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
        style={{ height }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${Math.min(pct, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-xl font-serif font-bold tracking-tight text-ink">{title}</h2>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Button                                                                     */
/* -------------------------------------------------------------------------- */

export function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  onClick,
  type = "button",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "plasma";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  if (variant === "plasma") {
    return (
      <button
        type={type}
        className={`btn-plasma ${className}`}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        <span className="btn-plasma-glow" aria-hidden="true" />
        <span className="btn-plasma-inner">{children}</span>
      </button>
    );
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90",
    secondary: "bg-accent-light text-accent hover:bg-accent/10",
    ghost: "text-muted hover:bg-accent-light/60 hover:text-ink",
  };
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                                */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/80 bg-surface backdrop-blur-xl px-6 py-10 text-center shadow-xs">
      <h3 className="mb-2 text-xl font-bold text-ink">{title}</h3>
      <div className="text-sm text-muted max-w-md mx-auto leading-relaxed">{children}</div>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}