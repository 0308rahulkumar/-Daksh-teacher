"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ==========================================================================
   Shared helpers
   ========================================================================== */

function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
  deps: unknown[] = []
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * Math.min(window.devicePixelRatio, 2);
      canvas.height = rect.height * Math.min(window.devicePixelRatio, 2);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    };
    resize();
    window.addEventListener("resize", resize);
    startRef.current = performance.now();

    const loop = (now: number) => {
      const t = (now - startRef.current) / 1000;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);
        draw(ctx, w, h, t);
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return canvasRef;
}

function ObservationPanel({ label, text, equation }: { label: string; text: string; equation?: string }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-3 space-y-1.5">
      {equation && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-400 font-bold">⚗️ Equation:</span>
          <span className="font-mono text-amber-200">{equation}</span>
        </div>
      )}
      <div className="flex items-start gap-2 text-xs">
        <span className="text-cyan-400 font-bold shrink-0">📝 {label}:</span>
        <span className="text-slate-300 leading-relaxed">{text}</span>
      </div>
    </div>
  );
}

function LabWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
          🎬 Interactive NCERT Activity
        </span>
      </div>
      {children}
    </div>
  );
}

/* ==========================================================================
   1. Magnesium Combustion Lab  (Ch 1 — Activity 1.1)
   ========================================================================== */

export function MgCombustionLab() {
  const [phase, setPhase] = useState<"ready" | "burning" | "ash" | "litmus">("ready");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    const p = phaseRef.current;
    // Background — lab bench
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Bunsen burner
    const bx = w * 0.35, by = h * 0.85;
    ctx.fillStyle = "#555";
    ctx.fillRect(bx - 15, by - 60, 30, 60);
    ctx.fillStyle = "#333";
    ctx.fillRect(bx - 25, by, 50, 10);

    if (p !== "ready") {
      // Flame
      const flicker = Math.sin(t * 12) * 3;
      ctx.beginPath();
      ctx.moveTo(bx - 12, by - 60);
      ctx.quadraticCurveTo(bx + flicker, by - 120, bx + 12, by - 60);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bx - 6, by - 60);
      ctx.quadraticCurveTo(bx + flicker * 0.5, by - 100, bx + 6, by - 60);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
    }

    // Tongs holding Mg ribbon
    const tx = w * 0.55, ty = h * 0.3;
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx + 60, ty - 40);
    ctx.lineTo(tx, ty);
    ctx.lineTo(tx + 60, ty + 40);
    ctx.stroke();

    if (p === "ready" || p === "burning") {
      // Mg ribbon
      ctx.fillStyle = p === "burning" ? `rgba(255,255,255,${0.7 + Math.sin(t * 8) * 0.3})` : "#c0c0c0";
      ctx.fillRect(tx - 30, ty - 3, 60, 6);

      if (p === "burning") {
        // Dazzling white glow
        const glow = ctx.createRadialGradient(tx, ty, 0, tx, ty, 60 + Math.sin(t * 6) * 15);
        glow.addColorStop(0, "rgba(255,255,255,0.9)");
        glow.addColorStop(0.3, "rgba(255,255,200,0.5)");
        glow.addColorStop(1, "rgba(255,255,200,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(tx - 80, ty - 80, 160, 160);

        // Sparks
        for (let i = 0; i < 8; i++) {
          const angle = t * 3 + i * 0.8;
          const dist = 20 + Math.sin(t * 4 + i) * 15;
          ctx.beginPath();
          ctx.arc(tx + Math.cos(angle) * dist, ty + Math.sin(angle) * dist, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
        }
      }
    }

    if (p === "ash" || p === "litmus") {
      // Watch glass with white ash
      const gx = w * 0.6, gy = h * 0.65;
      ctx.beginPath();
      ctx.ellipse(gx, gy, 50, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#334155";
      ctx.fill();
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.stroke();
      // White ash powder
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.arc(gx - 25 + Math.random() * 50, gy - 5 + Math.random() * 10, 3 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("MgO (white ash)", gx, gy + 30);
    }

    if (p === "litmus") {
      // Litmus paper turning blue
      const lx = w * 0.78, ly = h * 0.5;
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(lx - 8, ly, 16, 40);
      ctx.fillStyle = "#3b82f6";
      const blueHeight = Math.min(40, (t % 5) * 15);
      ctx.fillRect(lx - 8, ly + 40 - blueHeight, 16, blueHeight);
      ctx.fillStyle = "#fff";
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Red litmus → Blue", lx, ly - 8);
      ctx.fillText("(Basic oxide!)", lx, ly + 56);
    }

    // Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Bunsen Burner", bx, by + 25);
    if (p === "ready") ctx.fillText("Mg Ribbon (clean with sandpaper)", tx, ty + 25);
  }, [phase]);

  const observations: Record<string, string> = {
    ready: "A shiny 3-4 cm magnesium ribbon is held with tongs. Clean with sandpaper to remove MgCO₃ coating before igniting.",
    burning: "Magnesium burns with a DAZZLING WHITE FLAME. Do not look directly! Intense heat and light are released (exothermic).",
    ash: "White powdery ash (MgO) collects in the watch glass. This is magnesium oxide — a basic metallic oxide.",
    litmus: "MgO dissolved in water → Mg(OH)₂. Red litmus turns BLUE confirming the product is a basic oxide.",
  };

  return (
    <LabWrapper title="Magnesium Combustion">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {(["ready", "burning", "ash", "litmus"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              phase === p
                ? "bg-amber-500/30 border-amber-500 text-amber-200"
                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
            }`}
          >
            {p === "ready" ? "🧪 Ready" : p === "burning" ? "🔥 Ignite!" : p === "ash" ? "⚪ Collect Ash" : "🔵 Litmus Test"}
          </button>
        ))}
      </div>
      <ObservationPanel
        label="Observation"
        text={observations[phase]}
        equation="2Mg(s) + O₂(g) → 2MgO(s) + Heat + Light"
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   2. FeSO₄ Thermal Decomposition  (Ch 1 — Activity 1.3)
   ========================================================================== */

export function FeSO4DecompositionLab() {
  const [temp, setTemp] = useState(25);
  const tempRef = useRef(temp);
  tempRef.current = temp;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    const T = tempRef.current;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Boiling tube
    const bx = w * 0.5, by = h * 0.3;
    ctx.strokeStyle = "rgba(148,163,184,0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 20, by - 50);
    ctx.lineTo(bx - 20, by + 40);
    ctx.quadraticCurveTo(bx - 20, by + 60, bx, by + 60);
    ctx.quadraticCurveTo(bx + 20, by + 60, bx + 20, by + 40);
    ctx.lineTo(bx + 20, by - 50);
    ctx.stroke();

    // Crystal color based on temperature
    let crystalColor: string;
    let label: string;
    if (T < 100) {
      crystalColor = "#22c55e"; // green
      label = "FeSO₄·7H₂O (Green)";
    } else if (T < 250) {
      const frac = (T - 100) / 150;
      const r = Math.round(34 + frac * (255 - 34));
      const g = Math.round(197 + frac * (255 - 197));
      const b = Math.round(94 + frac * (255 - 94));
      crystalColor = `rgb(${r},${g},${b})`;
      label = "Losing H₂O → White";
    } else {
      const frac = Math.min(1, (T - 250) / 250);
      const r = Math.round(255 - frac * 75);
      const g = Math.round(255 - frac * 190);
      const b = Math.round(255 - frac * 200);
      crystalColor = `rgb(${r},${g},${b})`;
      label = "Fe₂O₃ (Reddish-Brown)";
    }

    // Fill crystals
    ctx.fillStyle = crystalColor;
    ctx.beginPath();
    ctx.moveTo(bx - 18, by + 10);
    ctx.lineTo(bx - 18, by + 38);
    ctx.quadraticCurveTo(bx - 18, by + 58, bx, by + 58);
    ctx.quadraticCurveTo(bx + 18, by + 58, bx + 18, by + 38);
    ctx.lineTo(bx + 18, by + 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(label, bx, by + 78);

    // Gas bubbles when T > 200
    if (T > 200) {
      const intensity = Math.min(1, (T - 200) / 300);
      for (let i = 0; i < Math.floor(intensity * 8); i++) {
        const bub_y = by - 10 - ((t * 40 + i * 30) % 80);
        const bub_x = bx - 10 + Math.sin(t * 2 + i) * 8;
        ctx.beginPath();
        ctx.arc(bub_x, bub_y, 3 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234,179,8,${0.3 + intensity * 0.5})`;
        ctx.fill();
      }
      ctx.fillStyle = "#fbbf24";
      ctx.font = "9px system-ui";
      ctx.fillText("SO₂ + SO₃ gas ↑", bx, by - 60);
      ctx.fillText("(pungent smell)", bx, by - 48);
    }

    // Bunsen burner flame when T > 50
    if (T > 50) {
      const flicker = Math.sin(t * 10) * 4;
      const intensity = Math.min(1, (T - 50) / 450);
      ctx.beginPath();
      ctx.moveTo(bx - 12, h * 0.85);
      ctx.quadraticCurveTo(bx + flicker, h * 0.85 - 40 * intensity, bx + 12, h * 0.85);
      ctx.fillStyle = `rgba(59,130,246,${intensity})`;
      ctx.fill();
    }

    // Thermometer
    ctx.fillStyle = "#334155";
    ctx.fillRect(w * 0.82, h * 0.15, 12, h * 0.6);
    ctx.fillStyle = "#ef4444";
    const mercuryH = (T / 500) * h * 0.6;
    ctx.fillRect(w * 0.82, h * 0.15 + h * 0.6 - mercuryH, 12, mercuryH);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${T}°C`, w * 0.88 + 6, h * 0.15 - 5);
  }, [temp]);

  const getObservation = () => {
    if (temp < 100) return "Green ferrous sulphate crystals (FeSO₄·7H₂O) are visible. They contain 7 molecules of water of crystallisation.";
    if (temp < 250) return "Crystals are losing water of crystallisation and turning WHITE. Steam (H₂O) is being driven off.";
    return "Crystals have decomposed to REDDISH-BROWN Fe₂O₃. Pungent SO₂ and SO₃ gases evolved (smell of burning sulphur). This is a THERMAL DECOMPOSITION reaction.";
  };

  return (
    <LabWrapper title="FeSO₄ Decomposition">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex items-center gap-4 px-2">
        <span className="text-xs text-slate-400 shrink-0">🌡️ Temperature:</span>
        <input
          type="range" min={25} max={500} value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="flex-1 accent-orange-500"
        />
        <span className="text-sm font-mono text-orange-300 w-16 text-right">{temp}°C</span>
      </div>
      <ObservationPanel
        label="Observation"
        text={getObservation()}
        equation="2FeSO₄(s) —Δ→ Fe₂O₃(s) + SO₂(g) + SO₃(g)"
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   3. pH & Indicator Lab  (Ch 2 — Activities 2.1-2.3)
   ========================================================================== */

export function PhIndicatorLab() {
  const [solution, setSolution] = useState<"hcl" | "naoh" | "water" | "lemon" | "soap">("hcl");
  const [indicator, setIndicator] = useState<"litmus" | "phenolphthalein" | "methyl-orange">("litmus");

  const phMap = { hcl: 1, lemon: 2.5, water: 7, soap: 9, naoh: 14 };
  const solutionLabels = { hcl: "Hydrochloric Acid", lemon: "Lemon Juice", water: "Distilled Water", soap: "Soap Solution", naoh: "Sodium Hydroxide" };
  const ph = phMap[solution];

  const getColor = () => {
    if (indicator === "litmus") return ph < 7 ? "#ef4444" : ph > 7 ? "#3b82f6" : "#9333ea";
    if (indicator === "phenolphthalein") return ph >= 8 ? "#ec4899" : "rgba(255,255,255,0.1)";
    return ph < 4 ? "#ef4444" : ph > 4.4 ? "#f59e0b" : "#f97316"; // methyl orange
  };

  const getIndicatorObs = () => {
    if (indicator === "litmus") {
      if (ph < 7) return "Red litmus stays RED. Blue litmus turns RED. Solution is ACIDIC.";
      if (ph > 7) return "Red litmus turns BLUE. Blue litmus stays BLUE. Solution is BASIC.";
      return "No color change. Solution is NEUTRAL (pH 7).";
    }
    if (indicator === "phenolphthalein") {
      return ph >= 8 ? "Phenolphthalein turns PINK — confirms basic nature." : "Phenolphthalein remains COLORLESS — solution is acidic or neutral.";
    }
    return ph < 4 ? "Methyl orange turns RED — strongly acidic." : "Methyl orange turns YELLOW/ORANGE — weakly acidic, neutral, or basic.";
  };

  const solRef = useRef(solution);
  solRef.current = solution;
  const colorRef = useRef(getColor());
  colorRef.current = getColor();
  const phRef = useRef(ph);
  phRef.current = ph;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Test tube
    const tx = w * 0.5, ty = h * 0.25;
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx - 22, ty);
    ctx.lineTo(tx - 22, ty + 100);
    ctx.quadraticCurveTo(tx - 22, ty + 125, tx, ty + 125);
    ctx.quadraticCurveTo(tx + 22, ty + 125, tx + 22, ty + 100);
    ctx.lineTo(tx + 22, ty);
    ctx.stroke();

    // Solution fill
    ctx.fillStyle = colorRef.current;
    ctx.beginPath();
    ctx.moveTo(tx - 20, ty + 40);
    ctx.lineTo(tx - 20, ty + 98);
    ctx.quadraticCurveTo(tx - 20, ty + 123, tx, ty + 123);
    ctx.quadraticCurveTo(tx + 20, ty + 123, tx + 20, ty + 98);
    ctx.lineTo(tx + 20, ty + 40);
    // Meniscus
    ctx.quadraticCurveTo(tx, ty + 45, tx - 20, ty + 40);
    ctx.fill();

    // Bubbles in acidic solutions
    if (phRef.current < 4) {
      for (let i = 0; i < 5; i++) {
        const by = ty + 100 - ((t * 25 + i * 25) % 70);
        const bxo = tx + Math.sin(t + i * 2) * 8;
        ctx.beginPath();
        ctx.arc(bxo, by, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
      }
    }

    // pH scale bar
    const barX = w * 0.1, barY = h * 0.85, barW = w * 0.8;
    const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    grad.addColorStop(0, "#ef4444");
    grad.addColorStop(0.25, "#f97316");
    grad.addColorStop(0.5, "#22c55e");
    grad.addColorStop(0.75, "#3b82f6");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(barX, barY, barW, 12);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, 12);

    // pH marker
    const markerX = barX + (phRef.current / 14) * barW;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(markerX, barY - 5);
    ctx.lineTo(markerX - 6, barY - 14);
    ctx.lineTo(markerX + 6, barY - 14);
    ctx.closePath();
    ctx.fill();
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`pH = ${phRef.current}`, markerX, barY - 18);

    // Scale labels
    ctx.font = "9px system-ui";
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "left";
    ctx.fillText("0 (Acid)", barX, barY + 26);
    ctx.textAlign = "center";
    ctx.fillText("7 (Neutral)", barX + barW * 0.5, barY + 26);
    ctx.textAlign = "right";
    ctx.fillText("14 (Base)", barX + barW, barY + 26);

    // Solution label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(solutionLabels[solRef.current], tx, ty - 10);
  }, [solution, indicator]);

  return (
    <LabWrapper title="pH & Indicator Lab">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 font-semibold">🧪 Solution:</span>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(solutionLabels) as Array<keyof typeof solutionLabels>).map((s) => (
              <button key={s} onClick={() => setSolution(s)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition ${
                  solution === s ? "bg-cyan-500/30 border-cyan-500 text-cyan-200" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >{solutionLabels[s]}</button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 font-semibold">🎨 Indicator:</span>
          <div className="flex flex-wrap gap-1.5">
            {(["litmus", "phenolphthalein", "methyl-orange"] as const).map((ind) => (
              <button key={ind} onClick={() => setIndicator(ind)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition ${
                  indicator === ind ? "bg-purple-500/30 border-purple-500 text-purple-200" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >{ind === "litmus" ? "Litmus" : ind === "phenolphthalein" ? "Phenolphthalein" : "Methyl Orange"}</button>
            ))}
          </div>
        </div>
      </div>
      <ObservationPanel label="Observation" text={getIndicatorObs()} />
    </LabWrapper>
  );
}

/* ==========================================================================
   4. Reactivity Displacement Simulator  (Ch 3 — Activity 3.5)
   ========================================================================== */

export function DisplacementLab() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timeRef = useRef(time);
  timeRef.current = time;

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setTime((prev) => {
        if (prev >= 100) { setRunning(false); return 100; }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(iv);
  }, [running]);

  const canvasRef = useCanvas((ctx, w, h, t) => {
    const progress = timeRef.current / 100;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Beaker
    const bx = w * 0.5, by = h * 0.3;
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 60, by);
    ctx.lineTo(bx - 60, by + 120);
    ctx.lineTo(bx + 60, by + 120);
    ctx.lineTo(bx + 60, by);
    ctx.stroke();

    // CuSO4 solution — blue fading to green
    const r = Math.round(34 + progress * (34 - 34));
    const g = Math.round(130 + progress * (197 - 130));
    const b = Math.round(246 + progress * (94 - 246));
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(bx - 58, by + 30, 116, 88);

    // Iron nail
    ctx.fillStyle = "#78716c";
    ctx.fillRect(bx - 5, by - 20, 10, 130);
    // Nail head
    ctx.fillRect(bx - 15, by - 25, 30, 8);

    // Copper deposit on nail (grows with progress)
    if (progress > 0.1) {
      const copperH = progress * 80;
      ctx.fillStyle = "#b87333";
      ctx.fillRect(bx - 7, by + 100 - copperH, 14, copperH);
    }

    // Labels
    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Iron Nail (Fe)", bx, by - 32);

    const solLabel = progress < 0.3 ? "CuSO₄ (Blue)" : progress < 0.7 ? "Changing..." : "FeSO₄ (Green)";
    ctx.fillText(solLabel, bx, by + 140);

    // Progress indicator
    ctx.fillStyle = "#64748b";
    ctx.font = "10px system-ui";
    ctx.fillText(`Reaction: ${Math.round(progress * 100)}%`, bx, h * 0.92);
  }, [time]);

  return (
    <LabWrapper title="Displacement Reaction">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={() => { setRunning(true); if (time >= 100) setTime(0); }}
          disabled={running}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition disabled:opacity-50"
        >▶️ Immerse Iron Nail</button>
        <button onClick={() => { setRunning(false); setTime(0); }}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition"
        >↻ Reset</button>
      </div>
      <ObservationPanel
        label="Observation"
        text={time < 10 ? "Blue CuSO₄ solution ready. Iron nail about to be immersed."
          : time < 50 ? "Blue color is slowly FADING. Iron (more reactive) is displacing copper from CuSO₄."
          : time < 90 ? "Solution turning GREEN (FeSO₄ forming). Brown copper deposit visible on iron nail."
          : "Reaction complete! Solution is GREEN (FeSO₄). Reddish-brown COPPER deposited on nail. Fe displaced Cu because Fe is MORE REACTIVE than Cu."}
        equation="Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)"
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   5. Combustion & Micelle Visualizer  (Ch 4 — Activities 4.5, 4.9)
   ========================================================================== */

export function MicelleLab() {
  const [mode, setMode] = useState<"combustion" | "micelle">("combustion");
  const [fuelType, setFuelType] = useState<"saturated" | "unsaturated">("saturated");
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const fuelRef = useRef(fuelType);
  fuelRef.current = fuelType;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, h);

    if (modeRef.current === "combustion") {
      const isSooty = fuelRef.current === "unsaturated";
      const cx = w * 0.5, cy = h * 0.55;

      // Wick / burner
      ctx.fillStyle = "#555";
      ctx.fillRect(cx - 6, cy + 30, 12, 40);
      ctx.fillRect(cx - 20, cy + 70, 40, 8);

      // Flame
      const flicker = Math.sin(t * 8) * 4;
      for (let i = 3; i >= 0; i--) {
        const scale = 1 - i * 0.2;
        ctx.beginPath();
        ctx.moveTo(cx - 18 * scale, cy + 30);
        ctx.quadraticCurveTo(cx + flicker * scale, cy - 50 * scale, cx + 18 * scale, cy + 30);
        if (isSooty) {
          ctx.fillStyle = i === 0 ? "#f59e0b" : i === 1 ? "#f97316" : i === 2 ? "#dc2626" : "#1a1a1a";
        } else {
          ctx.fillStyle = i === 0 ? "#60a5fa" : i === 1 ? "#3b82f6" : i === 2 ? "#2563eb" : "#1d4ed8";
        }
        ctx.fill();
      }

      // Soot particles for unsaturated
      if (isSooty) {
        for (let i = 0; i < 15; i++) {
          const px = cx + Math.sin(t * 1.5 + i * 0.7) * (20 + i * 3);
          const py = cy - 20 - ((t * 20 + i * 15) % 100);
          ctx.beginPath();
          ctx.arc(px, py, 2 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(30,30,30,${0.6 - (i * 0.03)})`;
          ctx.fill();
        }
      }

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(isSooty ? "Unsaturated Hydrocarbon" : "Saturated Hydrocarbon (Methane)", cx, h * 0.18);
      ctx.font = "10px system-ui";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(isSooty ? "C₂H₄ → Yellow sooty flame (incomplete combustion)" : "CH₄ + 2O₂ → CO₂ + 2H₂O (clean blue flame)", cx, h * 0.25);
    } else {
      // Micelle animation
      const cx = w * 0.5, cy = h * 0.5;
      const radius = Math.min(w, h) * 0.2;

      // Oil droplet in center
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "9px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Oil/Grease", cx, cy + 3);

      // Soap molecules arranged radially
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * 0.3;
        const tailEnd_x = cx + Math.cos(angle) * radius * 0.5;
        const tailEnd_y = cy + Math.sin(angle) * radius * 0.5;
        const headEnd_x = cx + Math.cos(angle) * radius;
        const headEnd_y = cy + Math.sin(angle) * radius;

        // Hydrophobic tail (toward oil)
        ctx.beginPath();
        ctx.moveTo(tailEnd_x, tailEnd_y);
        ctx.lineTo(headEnd_x, headEnd_y);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Hydrophilic head (toward water)
        ctx.beginPath();
        ctx.arc(headEnd_x, headEnd_y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();
      }

      // Water molecules around
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + t * 0.2;
        const dist = radius * 1.4 + Math.sin(t + i) * 10;
        ctx.fillStyle = "rgba(59,130,246,0.3)";
        ctx.font = "12px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("💧", cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
      }

      // Labels
      ctx.fillStyle = "#3b82f6";
      ctx.font = "bold 10px system-ui";
      ctx.textAlign = "left";
      ctx.fillText("🔵 = Hydrophilic head (ionic, loves water)", w * 0.05, h * 0.08);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("── = Hydrophobic tail (non-polar, loves oil)", w * 0.05, h * 0.15);
      ctx.fillStyle = "#f59e0b";
      ctx.fillText("🟡 = Oil/grease droplet", w * 0.05, h * 0.22);
    }
  }, [mode, fuelType]);

  return (
    <LabWrapper title="Carbon Compounds">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => setMode("combustion")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${mode === "combustion" ? "bg-orange-500/30 border-orange-500 text-orange-200" : "bg-white/5 border-white/10 text-slate-400"}`}
        >🔥 Combustion</button>
        <button onClick={() => setMode("micelle")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${mode === "micelle" ? "bg-blue-500/30 border-blue-500 text-blue-200" : "bg-white/5 border-white/10 text-slate-400"}`}
        >🫧 Micelle</button>
        {mode === "combustion" && (
          <>
            <span className="text-slate-600 self-center">|</span>
            <button onClick={() => setFuelType("saturated")}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition ${fuelType === "saturated" ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-white/5 border-white/10 text-slate-400"}`}
            >Saturated (Blue)</button>
            <button onClick={() => setFuelType("unsaturated")}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition ${fuelType === "unsaturated" ? "bg-yellow-500/20 border-yellow-500 text-yellow-300" : "bg-white/5 border-white/10 text-slate-400"}`}
            >Unsaturated (Sooty)</button>
          </>
        )}
      </div>
      <ObservationPanel
        label="Observation"
        text={mode === "combustion"
          ? fuelType === "saturated"
            ? "Saturated hydrocarbons (e.g. CH₄) burn with a CLEAN BLUE FLAME due to complete combustion in excess oxygen."
            : "Unsaturated hydrocarbons (e.g. C₂H₄) burn with a YELLOW SOOTY FLAME due to incomplete combustion. Black soot (carbon) deposits on surfaces."
          : "Soap molecules form a MICELLE: hydrophobic tails point INWARD (dissolving oil/grease), hydrophilic heads point OUTWARD (dissolving in water). This is how soap cleans!"}
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   6. Ray Optics Bench  (Ch 9 — Activities 9.1-9.6)
   ========================================================================== */

export function RayOpticsLab() {
  const [objectDist, setObjectDist] = useState(30);
  const [focalLength, setFocalLength] = useState(15);
  const [optic, setOptic] = useState<"concave-mirror" | "convex-lens">("concave-mirror");
  const objRef = useRef(objectDist);
  objRef.current = objectDist;
  const fRef = useRef(focalLength);
  fRef.current = focalLength;
  const opticRef = useRef(optic);
  opticRef.current = optic;

  const canvasRef = useCanvas((ctx, w, h) => {
    const u = objRef.current;
    const f = fRef.current;
    const opt = opticRef.current;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);

    const midX = w * 0.55, midY = h * 0.5;
    const scale = w * 0.008;

    // Principal axis
    ctx.strokeStyle = "rgba(148,163,184,0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Optic element at midX
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;
    if (opt === "concave-mirror") {
      ctx.beginPath();
      ctx.arc(midX + f * scale * 1.5, midY, f * scale * 2, Math.PI * 0.7, Math.PI * 1.3);
      ctx.stroke();
    } else {
      // Convex lens
      ctx.beginPath();
      ctx.ellipse(midX, midY, 6, h * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Focus and 2F markers
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 9px system-ui";
    ctx.textAlign = "center";
    const fPos = midX - f * scale;
    const twofPos = midX - 2 * f * scale;
    ctx.beginPath(); ctx.arc(fPos, midY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("F", fPos, midY + 15);
    ctx.beginPath(); ctx.arc(twofPos, midY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("2F", twofPos, midY + 15);

    // Object arrow
    const objX = midX - u * scale;
    const objH = h * 0.18;
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(objX, midY);
    ctx.lineTo(objX, midY - objH);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(objX, midY - objH - 6);
    ctx.lineTo(objX - 5, midY - objH + 2);
    ctx.lineTo(objX + 5, midY - objH + 2);
    ctx.closePath();
    ctx.fillStyle = "#22c55e";
    ctx.fill();
    ctx.fillStyle = "#22c55e";
    ctx.font = "10px system-ui";
    ctx.fillText("Object", objX, midY + 12);

    // Mirror/lens formula: 1/v = 1/f - 1/u (for mirror, sign convention)
    let v: number;
    if (opt === "concave-mirror") {
      // 1/v + 1/u = 1/f; u is negative, f is negative
      v = (u * f) / (u - f);
    } else {
      v = (u * f) / (u - f);
    }

    const magnification = -v / u;
    const imgH = magnification * objH;
    const imgX = midX - (-v) * scale; // negative v means same side (for mirror)

    if (Math.abs(u - f) > 0.5 && isFinite(v)) {
      // Image arrow
      const realImgX = opt === "concave-mirror" ? midX + v * scale : midX + v * scale;
      ctx.strokeStyle = v > 0 ? "#ef4444" : "#f59e0b";
      ctx.lineWidth = 2;
      ctx.setLineDash(v < 0 ? [4, 3] : []);
      ctx.beginPath();
      ctx.moveTo(realImgX, midY);
      ctx.lineTo(realImgX, midY + imgH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = v > 0 ? "#ef4444" : "#f59e0b";
      ctx.font = "10px system-ui";
      ctx.fillText(v > 0 ? "Real Image" : "Virtual Image", realImgX, midY + (imgH > 0 ? imgH + 15 : imgH - 8));

      // Ray 1: Parallel to axis → through F
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(objX, midY - objH);
      ctx.lineTo(midX, midY - objH);
      ctx.lineTo(realImgX, midY + imgH);
      ctx.stroke();

      // Ray 2: Through center → reflects back
      ctx.strokeStyle = "#a78bfa";
      ctx.beginPath();
      ctx.moveTo(objX, midY - objH);
      ctx.lineTo(realImgX, midY + imgH);
      ctx.stroke();
    }

    // Info box
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(w * 0.02, h * 0.02, 180, 55);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "10px system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`u = ${u} cm | f = ${f} cm`, w * 0.04, h * 0.06);
    if (Math.abs(u - f) > 0.5 && isFinite(v)) {
      ctx.fillText(`v = ${v.toFixed(1)} cm | m = ${magnification.toFixed(2)}`, w * 0.04, h * 0.1);
      ctx.fillText(`Image: ${v > 0 ? "Real, Inverted" : "Virtual, Erect"}`, w * 0.04, h * 0.14);
    } else {
      ctx.fillText("Image at infinity (u = f)", w * 0.04, h * 0.1);
    }
  }, [objectDist, focalLength, optic]);

  return (
    <LabWrapper title="Ray Optics Bench">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-1">
        <div className="space-y-1">
          <span className="text-xs text-slate-400">Optic Element:</span>
          <div className="flex gap-1.5">
            <button onClick={() => setOptic("concave-mirror")}
              className={`px-2 py-1 rounded text-[11px] border ${optic === "concave-mirror" ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-white/5 border-white/10 text-slate-400"}`}
            >Concave Mirror</button>
            <button onClick={() => setOptic("convex-lens")}
              className={`px-2 py-1 rounded text-[11px] border ${optic === "convex-lens" ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-white/5 border-white/10 text-slate-400"}`}
            >Convex Lens</button>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400">Object Distance (u): {objectDist} cm</span>
          <input type="range" min={5} max={60} value={objectDist} onChange={(e) => setObjectDist(Number(e.target.value))} className="w-full accent-green-500" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400">Focal Length (f): {focalLength} cm</span>
          <input type="range" min={5} max={30} value={focalLength} onChange={(e) => setFocalLength(Number(e.target.value))} className="w-full accent-amber-500" />
        </div>
      </div>
      <ObservationPanel
        label="Formula"
        text={optic === "concave-mirror"
          ? "Mirror Formula: 1/v + 1/u = 1/f. Move object inside F to see virtual, erect, magnified image (used in shaving/dental mirrors)."
          : "Lens Formula: 1/v - 1/u = 1/f. Move object inside F to see virtual, erect, magnified image (used in magnifying glass)."}
        equation={optic === "concave-mirror" ? "1/v + 1/u = 1/f" : "1/v − 1/u = 1/f"}
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   7. Prism Dispersion & Recombination  (Ch 10 — Activities 10.1-10.3)
   ========================================================================== */

export function PrismDispersionLab() {
  const [angle, setAngle] = useState(50);
  const angleRef = useRef(angle);
  angleRef.current = angle;

  const VIBGYOR = [
    { name: "Violet", color: "#7c3aed" },
    { name: "Indigo", color: "#4338ca" },
    { name: "Blue", color: "#2563eb" },
    { name: "Green", color: "#16a34a" },
    { name: "Yellow", color: "#eab308" },
    { name: "Orange", color: "#ea580c" },
    { name: "Red", color: "#dc2626" },
  ];

  const canvasRef = useCanvas((ctx, w, h) => {
    const ang = angleRef.current;
    ctx.fillStyle = "#0f0f23";
    ctx.fillRect(0, 0, w, h);

    // Glass prism (equilateral triangle)
    const px = w * 0.5, py = h * 0.5;
    const size = Math.min(w, h) * 0.25;
    const topY = py - size * 0.6;
    const botY = py + size * 0.4;
    const leftX = px - size * 0.6;
    const rightX = px + size * 0.6;

    ctx.beginPath();
    ctx.moveTo(px, topY);
    ctx.lineTo(leftX, botY);
    ctx.lineTo(rightX, botY);
    ctx.closePath();
    ctx.fillStyle = "rgba(59,130,246,0.15)";
    ctx.fill();
    ctx.strokeStyle = "rgba(96,165,250,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Glass Prism", px, botY + 20);

    // White light beam entering from left
    const entryX = w * 0.05;
    const entryY = py;
    const hitX = leftX + (px - leftX) * 0.35;
    const hitY = topY + (botY - topY) * 0.65;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(entryX, entryY);
    ctx.lineTo(hitX, hitY);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("White Light →", entryX, entryY - 12);

    // Dispersed spectrum beams emerging from right face
    const exitX = rightX - (rightX - px) * 0.35;
    const exitY = topY + (botY - topY) * 0.65;
    const spread = (ang / 90) * 0.4;

    VIBGYOR.forEach((c, i) => {
      const fraction = i / (VIBGYOR.length - 1) - 0.5;
      const beamAngle = fraction * spread;
      const endX = w * 0.95;
      const endY = exitY + beamAngle * w * 0.5;

      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(exitX, exitY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Color label
      ctx.fillStyle = c.color;
      ctx.font = "bold 9px system-ui";
      ctx.textAlign = "left";
      ctx.fillText(c.name, endX - 40, endY - 4);
    });

    // Internal refracted path (white to spectrum)
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(hitX, hitY);
    ctx.lineTo(exitX, exitY);
    ctx.stroke();

    // Angle annotation
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`Angle of Prism = 60° | Angle of Incidence = ${ang}°`, w * 0.5, h * 0.92);
  }, [angle]);

  return (
    <LabWrapper title="Prism Dispersion">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex items-center gap-4 px-2">
        <span className="text-xs text-slate-400 shrink-0">📐 Angle of Incidence:</span>
        <input type="range" min={20} max={80} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="flex-1 accent-violet-500" />
        <span className="text-sm font-mono text-violet-300 w-12 text-right">{angle}°</span>
      </div>
      <ObservationPanel
        label="Observation"
        text="White light splits into 7 colors (VIBGYOR) when passing through a glass prism. Violet bends MOST (highest refractive index), Red bends LEAST. This is DISPERSION of light. Newton showed a second inverted prism can RECOMBINE the spectrum back to white light."
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   8. Live Circuit Builder  (Ch 11 — Activities 11.1-11.3)
   ========================================================================== */

export function CircuitBuilderLab() {
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(10);
  const [circuitClosed, setCircuitClosed] = useState(true);
  const vRef = useRef(voltage);
  vRef.current = voltage;
  const rRef = useRef(resistance);
  rRef.current = resistance;
  const closedRef = useRef(circuitClosed);
  closedRef.current = circuitClosed;

  const current = circuitClosed ? voltage / resistance : 0;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    const V = vRef.current;
    const R = rRef.current;
    const closed = closedRef.current;
    const I = closed ? V / R : 0;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);

    const mx = w * 0.5, my = h * 0.45;
    const rw = w * 0.3, rh = h * 0.25;

    // Circuit loop rectangle
    ctx.strokeStyle = closed ? "#60a5fa" : "#475569";
    ctx.lineWidth = 3;
    ctx.strokeRect(mx - rw, my - rh, rw * 2, rh * 2);

    // Battery (left side)
    const batX = mx - rw, batY = my;
    ctx.fillStyle = "#334155";
    ctx.fillRect(batX - 15, batY - 20, 30, 40);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(batX - 4, batY - 24, 8, 4);
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(batX - 3, batY + 20, 6, 4);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 9px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${V}V`, batX, batY + 3);
    ctx.fillText("Battery", batX, batY + 38);

    // Resistor (right side)
    const resX = mx + rw, resY = my;
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const y0 = resY - 18 + i * 6;
      ctx.moveTo(resX - 8, y0);
      ctx.lineTo(resX + 8, y0 + 3);
      ctx.moveTo(resX + 8, y0 + 3);
      ctx.lineTo(resX - 8, y0 + 6);
    }
    ctx.stroke();
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 9px system-ui";
    ctx.fillText(`${R}Ω`, resX, resY + 30);
    ctx.fillText("Resistor", resX, resY + 42);

    // Ammeter (top)
    const amX = mx, amY = my - rh;
    ctx.beginPath();
    ctx.arc(amX, amY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#1e293b";
    ctx.fill();
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 9px system-ui";
    ctx.fillText("A", amX, amY + 3);
    ctx.fillText(`${I.toFixed(2)}A`, amX, amY - 20);

    // Voltmeter (bottom, across resistor)
    const vmX = mx + rw * 0.5, vmY = my + rh + 20;
    ctx.beginPath();
    ctx.arc(vmX, vmY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#1e293b";
    ctx.fill();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 9px system-ui";
    ctx.fillText("V", vmX, vmY + 3);
    ctx.fillText(`${V.toFixed(1)}V`, vmX, vmY + 30);

    // Electron flow dots (animated)
    if (closed && I > 0) {
      const speed = I * 1.5;
      const dotCount = Math.max(4, Math.floor(I * 5));
      ctx.fillStyle = "#fbbf24";

      for (let i = 0; i < dotCount; i++) {
        const progress = ((t * speed * 0.15 + i / dotCount) % 1);
        let dx: number, dy: number;
        const perimeter = 2 * (rw * 2 + rh * 2);
        const dist = progress * perimeter;

        if (dist < rw * 2) {
          // Top edge
          dx = mx - rw + dist;
          dy = my - rh;
        } else if (dist < rw * 2 + rh * 2) {
          // Right edge
          dx = mx + rw;
          dy = my - rh + (dist - rw * 2);
        } else if (dist < rw * 4 + rh * 2) {
          // Bottom edge
          dx = mx + rw - (dist - rw * 2 - rh * 2);
          dy = my + rh;
        } else {
          // Left edge
          dx = mx - rw;
          dy = my + rh - (dist - rw * 4 - rh * 2);
        }

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Direction arrow
      ctx.fillStyle = "#fbbf24";
      ctx.font = "8px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("e⁻ flow →", mx, my - rh - 8);
    }

    // V-I Graph (mini)
    const gx = w * 0.05, gy = h * 0.65, gw = w * 0.25, gh = h * 0.28;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, gw, gh);

    // Axes
    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(gx + 15, gy + gh - 10);
    ctx.lineTo(gx + gw - 5, gy + gh - 10);
    ctx.moveTo(gx + 15, gy + gh - 10);
    ctx.lineTo(gx + 15, gy + 5);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "8px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("V →", gx + gw * 0.5, gy + gh - 1);
    ctx.save();
    ctx.translate(gx + 6, gy + gh * 0.5);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("I →", 0, 0);
    ctx.restore();

    // Ohm's law line
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx + 15, gy + gh - 10);
    const maxV = 12;
    const maxI = maxV / R;
    const lineEndX = gx + 15 + (gw - 20) * Math.min(1, V / maxV);
    const lineEndY = gy + gh - 10 - (gh - 15) * Math.min(1, I / Math.max(maxI, 1));
    ctx.lineTo(lineEndX, lineEndY);
    ctx.stroke();

    // Current point
    ctx.beginPath();
    ctx.arc(lineEndX, lineEndY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("V-I Graph (Ohm's Law)", gx + 2, gy - 3);

    // Switch indicator
    if (!closed) {
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 14px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("⚡ SWITCH OPEN — NO CURRENT", mx, my);
    }
  }, [voltage, resistance, circuitClosed]);

  return (
    <LabWrapper title="Circuit Builder">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-1">
        <div className="space-y-1">
          <span className="text-xs text-slate-400">🔋 Voltage: {voltage}V</span>
          <input type="range" min={1} max={12} step={0.5} value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-slate-400">🔧 Resistance: {resistance}Ω</span>
          <input type="range" min={1} max={50} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full accent-amber-500" />
        </div>
        <div className="flex items-end">
          <button onClick={() => setCircuitClosed(!circuitClosed)}
            className={`w-full py-2 rounded-lg text-xs font-semibold border transition ${
              circuitClosed ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-red-500/20 border-red-500 text-red-300"
            }`}
          >{circuitClosed ? "🔌 Switch: CLOSED" : "⚡ Switch: OPEN"}</button>
        </div>
      </div>
      <ObservationPanel
        label="Ohm's Law"
        text={`V = IR → ${voltage}V = I × ${resistance}Ω → I = ${current.toFixed(3)}A (${(current * 1000).toFixed(1)} mA). The V-I graph is a straight line through the origin, confirming Ohm's Law. Slope = 1/R = ${(1/resistance).toFixed(4)} Ω⁻¹.`}
        equation="V = I × R (Ohm's Law)"
      />
    </LabWrapper>
  );
}

/* ==========================================================================
   9. Magnetic Field & Compass Simulator  (Ch 12 — Activities 12.1-12.3)
   ========================================================================== */

export function MagneticFieldLab() {
  const [mode, setMode] = useState<"bar-magnet" | "solenoid">("bar-magnet");
  const [currentDir, setCurrentDir] = useState<"none" | "forward" | "reverse">("forward");
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const dirRef = useRef(currentDir);
  dirRef.current = currentDir;

  const canvasRef = useCanvas((ctx, w, h, t) => {
    const m = modeRef.current;
    const dir = dirRef.current;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);

    const cx = w * 0.5, cy = h * 0.5;

    if (m === "bar-magnet") {
      // Bar magnet
      const magW = w * 0.25, magH = h * 0.08;
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(cx - magW, cy - magH / 2, magW, magH);
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(cx, cy - magH / 2, magW, magH);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("N", cx - magW / 2, cy + 5);
      ctx.fillText("S", cx + magW / 2, cy + 5);

      // Field lines (N to S outside)
      ctx.lineWidth = 1.5;
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        const spread = (i - lineCount / 2 + 0.5) / (lineCount / 2) * 0.8;
        ctx.strokeStyle = `rgba(168,85,247,${0.4 + Math.abs(spread) * 0.3})`;
        ctx.beginPath();

        const startX = cx - magW;
        const endX = cx + magW;
        const curveH = spread * h * 0.4;

        ctx.moveTo(startX, cy);
        ctx.bezierCurveTo(
          startX - w * 0.15, cy + curveH,
          endX + w * 0.15, cy + curveH,
          endX, cy
        );
        ctx.stroke();

        // Animated arrow on field line
        const arrowT = (t * 0.3 + i * 0.12) % 1;
        const ax = startX + (endX - startX + w * 0.3) * arrowT - w * 0.15;
        const ay = cy + curveH * Math.sin(arrowT * Math.PI);
        ctx.fillStyle = "#a855f7";
        ctx.beginPath();
        ctx.arc(ax, ay, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Compass needles around
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = Math.min(w, h) * 0.38;
        const nx = cx + Math.cos(angle) * dist;
        const ny = cy + Math.sin(angle) * dist;

        // Compass circle
        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#1e293b";
        ctx.fill();
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Needle pointing toward N pole
        const toN = Math.atan2(cy - ny, (cx - magW / 2) - nx);
        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(toN + Math.sin(t * 2 + i) * 0.05);
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-2, -3);
        ctx.lineTo(-2, 3);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(2, -3);
        ctx.lineTo(2, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

    } else {
      // Solenoid
      const coilW = w * 0.4, coilH = h * 0.15;
      const coils = 8;

      // Wire coils
      for (let i = 0; i < coils; i++) {
        const x = cx - coilW / 2 + (i / (coils - 1)) * coilW;
        ctx.beginPath();
        ctx.ellipse(x, cy, 6, coilH, 0, 0, Math.PI * 2);
        ctx.strokeStyle = dir === "none" ? "#475569" : "#f59e0b";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Core line
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - coilW / 2 - 30, cy);
      ctx.lineTo(cx + coilW / 2 + 30, cy);
      ctx.stroke();

      if (dir !== "none") {
        // N and S labels
        const isForward = dir === "forward";
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 14px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("N", isForward ? cx + coilW / 2 + 30 : cx - coilW / 2 - 30, cy - 20);
        ctx.fillStyle = "#3b82f6";
        ctx.fillText("S", isForward ? cx - coilW / 2 - 30 : cx + coilW / 2 + 30, cy - 20);

        // Magnetic field lines (inside: straight, outside: curved)
        ctx.strokeStyle = "rgba(168,85,247,0.5)";
        ctx.lineWidth = 1.5;
        const nSide = isForward ? 1 : -1;

        // Inside field lines
        for (let i = -2; i <= 2; i++) {
          const oy = i * coilH * 0.3;
          ctx.beginPath();
          ctx.moveTo(cx - coilW / 2, cy + oy);
          ctx.lineTo(cx + coilW / 2, cy + oy);
          ctx.stroke();

          // Arrow
          const arrowX = cx + (((t * 40 * nSide + i * 20) % coilW) - coilW / 2);
          ctx.fillStyle = "#a855f7";
          ctx.beginPath();
          ctx.moveTo(arrowX + 4 * nSide, cy + oy);
          ctx.lineTo(arrowX - 3 * nSide, cy + oy - 3);
          ctx.lineTo(arrowX - 3 * nSide, cy + oy + 3);
          ctx.closePath();
          ctx.fill();
        }

        // Outside curved field lines
        for (let i = 0; i < 4; i++) {
          const spread = (i + 1) * 0.25;
          ctx.strokeStyle = `rgba(168,85,247,${0.3 - i * 0.05})`;
          ctx.beginPath();
          const leftX = cx - coilW / 2;
          const rightX = cx + coilW / 2;
          const curveH = spread * h * 0.5 * nSide;
          ctx.moveTo(rightX * nSide > 0 ? rightX : leftX, cy);
          ctx.bezierCurveTo(
            (nSide > 0 ? rightX : leftX) + w * 0.15 * nSide, cy + curveH,
            (nSide > 0 ? leftX : rightX) - w * 0.15 * nSide, cy + curveH,
            nSide > 0 ? leftX : rightX, cy
          );
          ctx.stroke();
        }
      }

      // Current direction label
      ctx.fillStyle = "#f59e0b";
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(
        dir === "none" ? "No current flowing" : `Current direction: ${dir === "forward" ? "→" : "←"} (Apply Right-Hand Thumb Rule)`,
        cx, h * 0.88
      );
    }
  }, [mode, currentDir]);

  return (
    <LabWrapper title="Magnetic Field Simulator">
      <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => setMode("bar-magnet")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${mode === "bar-magnet" ? "bg-purple-500/30 border-purple-500 text-purple-200" : "bg-white/5 border-white/10 text-slate-400"}`}
        >🧲 Bar Magnet</button>
        <button onClick={() => setMode("solenoid")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${mode === "solenoid" ? "bg-purple-500/30 border-purple-500 text-purple-200" : "bg-white/5 border-white/10 text-slate-400"}`}
        >🔌 Solenoid</button>
        {mode === "solenoid" && (
          <>
            <span className="text-slate-600 self-center">|</span>
            {(["none", "forward", "reverse"] as const).map((d) => (
              <button key={d} onClick={() => setCurrentDir(d)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition ${
                  currentDir === d ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >{d === "none" ? "OFF" : d === "forward" ? "Current →" : "Current ←"}</button>
            ))}
          </>
        )}
      </div>
      <ObservationPanel
        label="Observation"
        text={mode === "bar-magnet"
          ? "Magnetic field lines emerge from NORTH pole, curve around externally, and enter SOUTH pole. Lines are CLOSED continuous loops. Lines never cross. Compass needles align along field lines."
          : currentDir === "none"
            ? "No current = No magnetic field. The solenoid acts as a simple coil of wire."
            : "Current-carrying solenoid behaves like a BAR MAGNET. Use RIGHT-HAND THUMB RULE: curl fingers in direction of current, thumb points to NORTH pole. Reversing current reverses poles."}
      />
    </LabWrapper>
  );
}
