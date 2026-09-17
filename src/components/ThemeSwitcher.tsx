"use client";

import React, { useEffect, useState } from "react";

export type ThemeOption = "obsidian" | "kage" | "field-manuals";

const THEMES: { id: ThemeOption; label: string; icon: string; desc: string; accentColor: string }[] = [
  {
    id: "obsidian",
    label: "Obsidian Amber",
    icon: "🔥",
    desc: "Warm neutral obsidian charcoal & amber gold",
    accentColor: "#F59E0B",
  },
  {
    id: "kage",
    label: "ThreeUI Kage",
    icon: "⛩️",
    desc: "Japanese shrine sanctuary, charcoal & vermilion",
    accentColor: "#e0231c",
  },
  {
    id: "field-manuals",
    label: "Field Manuals",
    icon: "📚",
    desc: "Earth-toned antique library & gold foil",
    accentColor: "#c3a47b",
  },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("obsidian");

  useEffect(() => {
    const saved = (localStorage.getItem("daksh-app-theme") as ThemeOption) || "obsidian";
    setCurrentTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (theme: ThemeOption) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("daksh-app-theme", theme);
    setCurrentTheme(theme);
  };

  return (
    <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-xs p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
          App Visual Theme
        </span>
        <span className="text-xs">🎨</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {THEMES.map((t) => {
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTheme(t.id)}
              title={t.desc}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center select-none ${
                isActive
                  ? "border-accent bg-accent-light/50 text-accent font-semibold shadow-2xs"
                  : "border-border/60 bg-paper/50 text-muted hover:border-border hover:text-ink"
              }`}
            >
              <span className="text-sm">{t.icon}</span>
              <span className="text-[10px] mt-1 leading-tight line-clamp-1">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
