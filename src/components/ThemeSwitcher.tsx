"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("daksh-app-theme") as ThemeOption) || "obsidian";
    setCurrentTheme(saved);
    applyTheme(saved);

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const applyTheme = (theme: ThemeOption) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("daksh-app-theme", theme);
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("daksh-theme-changed", { detail: theme }));
    }
  };

  // Ambient Lo-Fi Binaural / Rain Focus Synthesizer (Zero external files needed)
  const toggleAmbientAudio = async () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        await audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.045, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Gentle 432Hz alpha focus drone oscillator
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.015, ctx.currentTime);

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // Sub-harmonic anchor
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(112, ctx.currentTime); // 4Hz binaural theta beat

        osc1.connect(oscGain);
        osc2.connect(oscGain);
        oscGain.connect(masterGain);

        // Soft pink noise (rain/ambience generator)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter for warm rain tone
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();
        whiteNoise.start();
      } else {
        await audioCtxRef.current.resume();
      }
      setIsAudioPlaying(true);
    } catch (err) {
      console.warn("Audio Context init failed:", err);
    }
  };

  return (
    <div className="rounded-xl border border-border/80 bg-surface/80 backdrop-blur-xl p-3 space-y-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
          Vibe Theme
        </span>
        <span className="text-xs">✨</span>
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
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center select-none cursor-pointer ${
                isActive
                  ? "border-accent bg-accent-light/50 text-accent font-semibold shadow-2xs scale-[1.02]"
                  : "border-border/60 bg-paper/50 text-muted hover:border-border hover:text-ink"
              }`}
            >
              <span className="text-sm">{t.icon}</span>
              <span className="text-[10px] mt-1 leading-tight line-clamp-1">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ambient Lo-Fi Study Frequency Generator */}
      <div className="pt-1 border-t border-border/40 flex items-center justify-between">
        <span className="text-[10px] text-muted flex items-center gap-1.5">
          <span>🎧</span>
          <span>Focus Ambience</span>
        </span>
        <button
          type="button"
          onClick={toggleAmbientAudio}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
            isAudioPlaying
              ? "border-accent bg-accent text-white font-medium shadow-xs"
              : "border-border text-muted hover:text-ink hover:border-accent/40"
          }`}
        >
          {isAudioPlaying ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Playing
            </>
          ) : (
            "Start"
          )}
        </button>
      </div>
    </div>
  );
}
