"use client";
 
import React, { useState } from "react";
import { BestsellersBookShowcase, KageLandingPage, ShaderButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

type SceneMode = "bestsellers" | "kage" | "plasma";

export function Scene() {
  const [mode, setMode] = useState<SceneMode>("bestsellers");

  return (
    <div className="my-6 space-y-3">
      {/* ThreeUI Scene Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#c3a47b]">
            ThreeUI Interactive Atmosphere
          </span>
          <span className="text-[11px] text-muted">• Switch live WebGL & 3D scenes</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("bestsellers")}
            className={`px-3 py-1 text-xs font-serif rounded-lg transition-all ${
              mode === "bestsellers"
                ? "bg-[#c3a47b] text-[#1d1a15] font-semibold shadow-xs"
                : "text-[#c5b79e] hover:text-white"
            }`}
          >
            📚 Field Manuals
          </button>
          <button
            type="button"
            onClick={() => setMode("kage")}
            className={`px-3 py-1 text-xs font-serif rounded-lg transition-all ${
              mode === "kage"
                ? "bg-[#c3a47b] text-[#1d1a15] font-semibold shadow-xs"
                : "text-[#c5b79e] hover:text-white"
            }`}
          >
            ⛩️ Kage Temple
          </button>
          <button
            type="button"
            onClick={() => setMode("plasma")}
            className={`px-3 py-1 text-xs font-serif rounded-lg transition-all ${
              mode === "plasma"
                ? "bg-[#c3a47b] text-[#1d1a15] font-semibold shadow-xs"
                : "text-[#c5b79e] hover:text-white"
            }`}
          >
            ⚡ Plasma Quantum
          </button>
        </div>
      </div>

      {/* Render Selected ThreeUI Scene */}
      <div className="shader-frame w-full h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-[#c3a47b]/25 relative bg-[#1d1a15]">
        {mode === "bestsellers" && (
          <BestsellersBookShowcase
            headingFont="iowan-old-style"
            bodyFont="iowan-old-style"
            headingWeight="500"
            bodyWeight="400"
            primaryColor="#c3a47b"
            headingSize={325}
            bodySize={17}
            headingLetterSpacing={-0.085}
          />
        )}

        {mode === "kage" && (
          <KageLandingPage
            headingFont="onest"
            bodyFont="onest"
            headingWeight="400"
            bodyWeight="300"
            primaryColor="#e0231c"
          />
        )}

        {mode === "plasma" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-xs">
            <p className="text-sm font-serif text-[#eee2ca] mb-6 text-center max-w-md">
              Luminous WebGL plasma quantum button. Hover, drag, and interact with the tactile energetic control.
            </p>
            <ShaderButtons
              variant="plasma-button"
              mode="dark"
              hue={145}
              saturation={1.15}
              brightness={1.05}
            />
          </div>
        )}
      </div>
    </div>
  );
}
