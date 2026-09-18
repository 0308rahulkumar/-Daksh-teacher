"use client";

import React, { useRef, useEffect, useState } from "react";

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: string;
  badge?: string;
}

interface AnimatedTabsProps<T extends string> {
  tabs: readonly TabItem<T>[] | TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

/**
 * Motion-Primitives animated sliding pill tabs
 * Provides a floating active pill that glides smoothly behind selected tab.
 */
export function AnimatedTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: AnimatedTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(`[data-tab-id="${activeTab}"]`);
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-center gap-1 rounded-2xl border border-border/70 bg-surface/70 p-1.5 backdrop-blur-xl ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <div
        className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-xl bg-accent text-white shadow-md shadow-accent/25 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: `${pillStyle.left}px`,
          width: `${pillStyle.width}px`,
        }}
      />

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            data-tab-id={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              isActive ? "text-white font-bold" : "text-muted hover:text-ink"
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-accent-light text-accent"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
