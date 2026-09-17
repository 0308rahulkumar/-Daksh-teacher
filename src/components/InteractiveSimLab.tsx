"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export type SimId = "circuits" | "optics" | "ph-scale" | "parabola" | "heart-circulation" | "punnett-square";

export interface SimMeta {
  id: SimId;
  title: string;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics";
  subjectColor: string;
  badge: string;
  icon: string;
  ncertChapter: string;
  tagline: string;
  description: string;
  experimentSteps: string[];
  cbseExamQuestion: string;
  embedUrl?: string;
}

export const SIMULATIONS: SimMeta[] = [
  {
    id: "circuits",
    title: "DC Circuit & Ohm's Law Lab",
    subject: "Physics",
    subjectColor: "#3b82f6",
    badge: "PhET Interactive",
    icon: "⚡",
    ncertChapter: "Electricity (Ch-12)",
    tagline: "Build live circuits with batteries, light bulbs, resistors, ammeters & voltmeters.",
    description: "Explore electric current flow, measure potential difference, verify Ohm's Law (V = IR), and test series vs parallel resistor combinations.",
    experimentSteps: [
      "1. Drag a Battery and a Light Bulb into the blue workspace.",
      "2. Connect them with wire segments to form a closed continuous loop.",
      "3. Drag the Voltmeter across the bulb to measure Voltage (V).",
      "4. Insert an Ammeter in series to measure Current (I). Notice how I changes as you change battery voltage!",
    ],
    cbseExamQuestion: "CBSE Board: State Ohm's Law. Draw a circuit diagram to verify it with voltmeter and ammeter.",
    embedUrl: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html",
  },
  {
    id: "optics",
    title: "Light: Reflection & Refraction Lab",
    subject: "Physics",
    subjectColor: "#06b6d4",
    badge: "PhET Interactive",
    icon: "🔍",
    ncertChapter: "Light — Reflection & Refraction (Ch-10)",
    tagline: "Laser beam ray tracing across air, water, glass & prisms with Snell's Law.",
    description: "Observe bending of light rays at media boundaries, measure angles of incidence and refraction with the protractor, and observe Total Internal Reflection.",
    experimentSteps: [
      "1. Turn ON the laser light source (red button).",
      "2. Drag the Protractor to align with the normal line (dashed line).",
      "3. Measure angle of incidence (i) and angle of refraction (r).",
      "4. Calculate Snell's Law ratio: sin(i) / sin(r) = constant refractive index n.",
    ],
    cbseExamQuestion: "CBSE Board: State Snell's law of refraction. What is the absolute refractive index of a medium?",
    embedUrl: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
  },
  {
    id: "ph-scale",
    title: "Acids, Bases & pH Scale Lab",
    subject: "Chemistry",
    subjectColor: "#10b981",
    badge: "PhET Interactive",
    icon: "🧪",
    ncertChapter: "Acids, Bases and Salts (Ch-2)",
    tagline: "Test pH of stomach acid, lemon juice, blood, water & soap with interactive sensor.",
    description: "Dip the digital pH probe and see H3O+ / OH- ion concentrations. Add water to observe dilution and pH neutralization live.",
    experimentSteps: [
      "1. Choose a liquid from the dropdown (e.g. Stomach Acid pH 1.0, Blood pH 7.4, Drain Cleaner pH 13.0).",
      "2. Dip the green probe into the beaker to read exact pH value.",
      "3. Turn the water faucet valve to dilute the solution and watch the pH shift towards neutral 7.",
    ],
    cbseExamQuestion: "CBSE Board: Explain the importance of pH in everyday life (tooth decay, digestive system, soil).",
    embedUrl: "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_all.html",
  },
  {
    id: "parabola",
    title: "Quadratic Parabola & Roots Visualizer",
    subject: "Mathematics",
    subjectColor: "#f59e0b",
    badge: "Interactive Canvas",
    icon: "📐",
    ncertChapter: "Quadratic Equations & Polynomials (Ch-4)",
    tagline: "Live graph of y = ax² + bx + c. Watch roots, vertex & discriminant D react.",
    description: "Dynamically adjust coefficients a, b, and c with sliders. Discover why D > 0 yields 2 roots, D = 0 gives 1 coincident root, and D < 0 gives no real roots.",
    experimentSteps: [
      "1. Move slider 'a' to observe parabola width and opening direction (upwards if a > 0, downwards if a < 0).",
      "2. Notice how Discriminant D = b² - 4ac instantly updates.",
      "3. When D < 0, the curve never touches the x-axis (no real roots).",
    ],
    cbseExamQuestion: "CBSE Board: Find the discriminant of 2x² - 4x + 3 = 0 and discuss the nature of its roots.",
  },
  {
    id: "heart-circulation",
    title: "Double Circulation & Heart Flow",
    subject: "Biology",
    subjectColor: "#ef4444",
    badge: "Animated Process",
    icon: "🫀",
    ncertChapter: "Life Processes (Ch-6)",
    tagline: "Trace oxygenated vs deoxygenated blood through 4 chambers, valves & pulmonary loop.",
    description: "Interactive 4-chamber human heart diagram. Step through the pulmonary and systemic circulation cycles with valves and oxygenation indicators.",
    experimentSteps: [
      "1. Click 'Step Flow' or 'Auto Pulse' to trigger systolic pumping.",
      "2. Track Blue arrows (Deoxygenated blood via Vena Cava -> RA -> RV -> Pulmonary Artery).",
      "3. Track Red arrows (Oxygenated blood from Lungs -> Pulmonary Veins -> LA -> LV -> Aorta).",
    ],
    cbseExamQuestion: "CBSE Board: Why is blood circulation in humans called double circulation? State its advantage.",
  },
  {
    id: "punnett-square",
    title: "Mendel Punnett Cross Simulator",
    subject: "Biology",
    subjectColor: "#8b5cf6",
    badge: "Interactive Genetics",
    icon: "🧬",
    ncertChapter: "Heredity (Ch-9)",
    tagline: "Simulate Monohybrid F1 & F2 crosses with real-time 3:1 phenotypic ratios.",
    description: "Select alleles for parent plants (Tall T vs Dwarf t) and watch the Punnett square generate genotypes, phenotypes, and probability distributions.",
    experimentSteps: [
      "1. Choose Parent 1 genotype (e.g. Heterozygous Tt) and Parent 2 (Tt).",
      "2. Observe the 4-box Punnett square calculation.",
      "3. Verify Mendel's F2 phenotypic ratio: 3 Tall : 1 Dwarf and genotypic ratio: 1 TT : 2 Tt : 1 tt.",
    ],
    cbseExamQuestion: "CBSE Board: A pure tall pea plant (TT) is crossed with dwarf (tt). What is the phenotype of F1 and F2 progeny?",
  },
];

export function getSimForTopic(chapterId?: string, topicId?: string): SimMeta | undefined {
  if (!chapterId) return undefined;
  if (chapterId.includes("phy1") || topicId?.includes("mirror") || topicId?.includes("refraction") || topicId?.includes("lens")) {
    return SIMULATIONS.find((s) => s.id === "optics");
  }
  if (chapterId.includes("phy2") || topicId?.includes("ohm") || topicId?.includes("circuit") || topicId?.includes("resistance")) {
    return SIMULATIONS.find((s) => s.id === "circuits");
  }
  if (chapterId.includes("chem2") || topicId?.includes("acid") || topicId?.includes("ph") || topicId?.includes("salt")) {
    return SIMULATIONS.find((s) => s.id === "ph-scale");
  }
  if (chapterId.includes("alg2") || topicId?.includes("quadratic") || topicId?.includes("polynomial") || topicId?.includes("roots")) {
    return SIMULATIONS.find((s) => s.id === "parabola");
  }
  if (chapterId.includes("bio1") || topicId?.includes("transport") || topicId?.includes("heart") || topicId?.includes("excretion") || topicId?.includes("respiration")) {
    return SIMULATIONS.find((s) => s.id === "heart-circulation");
  }
  if (chapterId.includes("bio4") || topicId?.includes("mendel") || topicId?.includes("cross") || topicId?.includes("heredity") || topicId?.includes("gene")) {
    return SIMULATIONS.find((s) => s.id === "punnett-square");
  }
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*  Parabola Interactive Canvas Component                                     */
/* -------------------------------------------------------------------------- */
function ParabolaVisualizer() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const D = b * b - 4 * a * c;
  const root1 = a !== 0 && D >= 0 ? (-b + Math.sqrt(D)) / (2 * a) : null;
  const root2 = a !== 0 && D >= 0 ? (-b - Math.sqrt(D)) / (2 * a) : null;
  const vertexX = a !== 0 ? -b / (2 * a) : 0;
  const vertexY = a !== 0 ? -D / (4 * a) : c;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 25; // 25 px per unit

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
    ctx.lineWidth = 1;
    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Plot Parabola
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;

    for (let px = 0; px < width; px += 2) {
      const x = (px - originX) / scale;
      const y = a * x * x + b * x + c;
      const py = originY - y * scale;

      if (py >= -100 && py <= height + 100) {
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
    }
    ctx.stroke();

    // Plot Vertex
    const vx = originX + vertexX * scale;
    const vy = originY - vertexY * scale;
    if (vx >= 0 && vx <= width && vy >= 0 && vy <= height) {
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(vx, vy, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Plot Roots if real
    if (root1 !== null) {
      const rx1 = originX + root1 * scale;
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(rx1, originY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (root2 !== null && root2 !== root1) {
      const rx2 = originX + root2 * scale;
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(rx2, originY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [a, b, c, vertexX, vertexY, root1, root2]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl">
          <canvas ref={canvasRef} width={500} height={360} className="w-full max-w-[500px] h-[360px]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-amber-400 border border-amber-400/20">
            y = {a}x² {b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`} {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">● Roots</span>
            <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded">● Vertex</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <span>⚙️ Parameter Controls</span>
          </h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Leading coefficient (a):</span>
                <span className="font-mono font-bold text-amber-400">{a}</span>
              </div>
              <input
                type="range" min={-3} max={3} step={0.5} value={a}
                onChange={(e) => setA(parseFloat(e.target.value) || 0.1)}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Linear coefficient (b):</span>
                <span className="font-mono font-bold text-amber-400">{b}</span>
              </div>
              <input
                type="range" min={-6} max={6} step={0.5} value={b}
                onChange={(e) => setB(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Constant term (c):</span>
                <span className="font-mono font-bold text-amber-400">{c}</span>
              </div>
              <input
                type="range" min={-6} max={6} step={0.5} value={c}
                onChange={(e) => setC(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center bg-black/30 p-2 rounded-lg">
              <span className="text-slate-400">Discriminant D (b² - 4ac):</span>
              <span className={`font-mono font-bold ${D > 0 ? "text-emerald-400" : D === 0 ? "text-yellow-400" : "text-rose-400"}`}>
                {D.toFixed(1)} {D > 0 ? "(2 Distinct Roots)" : D === 0 ? "(Equal Roots)" : "(No Real Roots)"}
              </span>
            </div>
            <div className="flex justify-between items-center bg-black/30 p-2 rounded-lg">
              <span className="text-slate-400">Vertex Coordinates:</span>
              <span className="font-mono text-sky-300">({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</span>
            </div>
            {D >= 0 && (
              <div className="flex justify-between items-center bg-black/30 p-2 rounded-lg">
                <span className="text-slate-400">Real Roots (x-intercepts):</span>
                <span className="font-mono text-emerald-300">
                  x₁ = {root1?.toFixed(2)}, x₂ = {root2?.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Heart Circulation Interactive Component                                    */
/* -------------------------------------------------------------------------- */
function HeartCirculationVisualizer() {
  const [step, setStep] = useState(0);
  const [isAuto, setIsAuto] = useState(false);

  const steps = [
    {
      title: "1. Deoxygenated Blood Enters Right Atrium",
      chamber: "Right Atrium (RA)",
      color: "#3b82f6",
      desc: "Body tissues produce CO2 as waste. Deoxygenated blood is carried via Superior and Inferior Vena Cava into the thin-walled Right Atrium as it relaxes.",
    },
    {
      title: "2. Blood Passes to Right Ventricle",
      chamber: "Right Ventricle (RV)",
      color: "#2563eb",
      desc: "Right Atrium contracts, and Tricuspid Valve opens. Blood flows into the muscular Right Ventricle. Tricuspid valve shuts to prevent backward flow.",
    },
    {
      title: "3. Pulmonary Artery Pumps Blood to Lungs",
      chamber: "Pulmonary Artery & Lungs",
      color: "#0284c7",
      desc: "Right Ventricle contracts and forces blood through the Pulmonary Artery to the Lungs. In alveolar capillaries, blood releases CO2 and absorbs fresh O2!",
    },
    {
      title: "4. Oxygenated Blood Returns to Left Atrium",
      chamber: "Left Atrium (LA)",
      color: "#f43f5e",
      desc: "Oxygen-rich bright red blood returns from the lungs via Pulmonary Veins into the Left Atrium as it relaxes.",
    },
    {
      title: "5. Left Ventricle Pumps to Aorta & Entire Body",
      chamber: "Left Ventricle (LV) & Aorta",
      color: "#e11d48",
      desc: "Left Atrium contracts; Bicuspid (mitral) valve opens. The thickest muscular wall of Left Ventricle contracts forcefully, pumping blood through the massive Aorta to all body cells!",
    },
  ];

  useEffect(() => {
    if (!isAuto) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAuto, steps.length]);

  const current = steps[step];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Heart Chamber Diagram */}
        <div className="relative w-full max-w-[460px] aspect-square rounded-2xl border border-white/10 bg-slate-950 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
          {/* Top Lungs Indicator */}
          <div className="text-center pb-2 border-b border-white/10 flex justify-center items-center gap-2">
            <span className="text-xl">🫁</span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lungs (Alveoli Gas Exchange: O₂ In, CO₂ Out)</span>
          </div>

          {/* 4 Chambers Visual Grid */}
          <div className="grid grid-cols-2 gap-3 my-auto">
            {/* Right Atrium */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 text-center ${
                step === 0 ? "bg-blue-600/40 border-blue-400 scale-105 shadow-lg shadow-blue-500/30" : "bg-blue-950/20 border-blue-900/30 opacity-70"
              }`}
            >
              <div className="text-xs font-semibold text-blue-300">Right Atrium</div>
              <div className="text-[11px] text-blue-400/80">Deoxygenated (CO₂)</div>
              <div className="mt-2 text-xl">{step === 0 ? "💧 ⬇️" : "💙"}</div>
            </div>

            {/* Left Atrium */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 text-center ${
                step === 3 ? "bg-rose-600/40 border-rose-400 scale-105 shadow-lg shadow-rose-500/30" : "bg-rose-950/20 border-rose-900/30 opacity-70"
              }`}
            >
              <div className="text-xs font-semibold text-rose-300">Left Atrium</div>
              <div className="text-[11px] text-rose-400/80">Oxygenated (O₂)</div>
              <div className="mt-2 text-xl">{step === 3 ? "🔥 ⬇️" : "❤️"}</div>
            </div>

            {/* Right Ventricle */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 text-center ${
                step === 1 || step === 2 ? "bg-blue-600/40 border-blue-400 scale-105 shadow-lg shadow-blue-500/30" : "bg-blue-950/20 border-blue-900/30 opacity-70"
              }`}
            >
              <div className="text-xs font-semibold text-blue-300">Right Ventricle</div>
              <div className="text-[11px] text-blue-400/80">To Pulmonary Artery</div>
              <div className="mt-2 text-xl">{step === 1 || step === 2 ? "⚡ ⬆️" : "🌊"}</div>
            </div>

            {/* Left Ventricle */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 text-center ${
                step === 4 ? "bg-rose-600/40 border-rose-400 scale-105 shadow-lg shadow-rose-500/30" : "bg-rose-950/20 border-rose-900/30 opacity-70"
              }`}
            >
              <div className="text-xs font-semibold text-rose-300">Left Ventricle (Thick Wall)</div>
              <div className="text-[11px] text-rose-400/80">To Aorta & Body</div>
              <div className="mt-2 text-xl">{step === 4 ? "🚀 ⬆️" : "🩸"}</div>
            </div>
          </div>

          {/* Bottom Body Tissues */}
          <div className="text-center pt-2 border-t border-white/10 flex justify-center items-center gap-2">
            <span className="text-xl">🏃</span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Rest of the Human Body (Brain, Organs, Muscles)</span>
          </div>
        </div>

        {/* Step Breakdown & Controls */}
        <div className="flex-1 w-full space-y-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              Circulation Phase {step + 1} of 5
            </span>
            <button
              onClick={() => setIsAuto(!isAuto)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                isAuto ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-white/10 border-white/20 text-slate-300 hover:bg-white/20"
              }`}
            >
              {isAuto ? "⏸️ Pause Auto" : "▶️ Auto Cycle"}
            </button>
          </div>

          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{current.title}</span>
          </h4>

          <p className="text-sm text-slate-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
            {current.desc}
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep((prev) => (prev - 1 + steps.length) % steps.length)}
              className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition"
            >
              ◀ Previous Step
            </button>
            <button
              onClick={() => setStep((prev) => (prev + 1) % steps.length)}
              className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition"
            >
              Next Step ▶
            </button>
          </div>

          <div className="p-3 bg-red-950/20 border border-red-800/30 rounded-xl text-xs text-red-200">
            💡 <strong>Why Double Circulation?</strong> Separation of oxygenated & deoxygenated blood ensures high oxygen delivery to sustain constant warm-blooded body temperature (37°C).
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mendel Punnett Cross Simulator Component                                  */
/* -------------------------------------------------------------------------- */
function PunnettVisualizer() {
  const [parent1, setParent1] = useState<"TT" | "Tt" | "tt">("Tt");
  const [parent2, setParent2] = useState<"TT" | "Tt" | "tt">("Tt");

  const g1 = [parent1[0], parent1[1]];
  const g2 = [parent2[0], parent2[1]];

  const cell11 = g1[0] + g2[0];
  const cell12 = g1[0] + g2[1];
  const cell21 = g1[1] + g2[0];
  const cell22 = g1[1] + g2[1];

  const formatGenotype = (str: string) => {
    if (str === "tT") return "Tt";
    return str;
  };

  const c11 = formatGenotype(cell11);
  const c12 = formatGenotype(cell12);
  const c21 = formatGenotype(cell21);
  const c22 = formatGenotype(cell22);

  const grid = [c11, c12, c21, c22];
  const countTT = grid.filter((g) => g === "TT").length;
  const countTt = grid.filter((g) => g === "Tt").length;
  const counttt = grid.filter((g) => g === "tt").length;

  const countTall = countTT + countTt;
  const countDwarf = counttt;

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Punnett 2x2 Grid */}
        <div className="w-full max-w-[420px] aspect-square rounded-2xl border border-white/10 bg-slate-950 p-6 flex flex-col justify-center shadow-2xl">
          <div className="grid grid-cols-3 gap-2 text-center text-sm font-mono">
            <div className="p-2 text-xs text-slate-500 font-sans">Female \ Male</div>
            <div className="p-3 bg-purple-900/30 text-purple-300 rounded-lg font-bold border border-purple-500/20">{g2[0]}</div>
            <div className="p-3 bg-purple-900/30 text-purple-300 rounded-lg font-bold border border-purple-500/20">{g2[1]}</div>

            <div className="p-3 bg-purple-900/30 text-purple-300 rounded-lg font-bold border border-purple-500/20 flex items-center justify-center">{g1[0]}</div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${c11.includes("T") ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-amber-950/40 border-amber-500/40 text-amber-300"}`}>
              <span className="text-lg font-bold">{c11}</span>
              <span className="text-[10px] uppercase tracking-wider">{c11.includes("T") ? "🌱 Tall" : "🌾 Dwarf"}</span>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${c12.includes("T") ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-amber-950/40 border-amber-500/40 text-amber-300"}`}>
              <span className="text-lg font-bold">{c12}</span>
              <span className="text-[10px] uppercase tracking-wider">{c12.includes("T") ? "🌱 Tall" : "🌾 Dwarf"}</span>
            </div>

            <div className="p-3 bg-purple-900/30 text-purple-300 rounded-lg font-bold border border-purple-500/20 flex items-center justify-center">{g1[1]}</div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${c21.includes("T") ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-amber-950/40 border-amber-500/40 text-amber-300"}`}>
              <span className="text-lg font-bold">{c21}</span>
              <span className="text-[10px] uppercase tracking-wider">{c21.includes("T") ? "🌱 Tall" : "🌾 Dwarf"}</span>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${c22.includes("T") ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-amber-950/40 border-amber-500/40 text-amber-300"}`}>
              <span className="text-lg font-bold">{c22}</span>
              <span className="text-[10px] uppercase tracking-wider">{c22.includes("T") ? "🌱 Tall" : "🌾 Dwarf"}</span>
            </div>
          </div>
        </div>

        {/* Controls & Statistics */}
        <div className="flex-1 w-full space-y-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <span>🧬 Select Parental Genotypes</span>
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Parent 1 (Egg):</label>
              <select
                value={parent1}
                onChange={(e) => setParent1(e.target.value as any)}
                className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-xl border border-white/20 focus:outline-none focus:border-purple-400"
              >
                <option value="TT">Homozygous Tall (TT)</option>
                <option value="Tt">Heterozygous Tall (Tt)</option>
                <option value="tt">Homozygous Dwarf (tt)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Parent 2 (Pollen):</label>
              <select
                value={parent2}
                onChange={(e) => setParent2(e.target.value as any)}
                className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-xl border border-white/20 focus:outline-none focus:border-purple-400"
              >
                <option value="TT">Homozygous Tall (TT)</option>
                <option value="Tt">Heterozygous Tall (Tt)</option>
                <option value="tt">Homozygous Dwarf (tt)</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Phenotypic Ratio (Appearance):</span>
              <span className="font-bold text-emerald-300">
                {countTall} Tall : {countDwarf} Dwarf ({((countTall / 4) * 100).toFixed(0)}% vs {((countDwarf / 4) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Genotypic Ratio (Alleles):</span>
              <span className="font-mono text-purple-300">
                {countTT} TT : {countTt} Tt : {counttt} tt
              </span>
            </div>
          </div>

          <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-xl text-xs text-purple-200">
            ⭐ <strong>Mendel Rule</strong>: In heterozygous condition (Tt), allele for tallness (T) is dominant and completely masks shortness (t), demonstrating the <strong>Law of Dominance</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main InteractiveSimLab Component                                          */
/* -------------------------------------------------------------------------- */
export function InteractiveSimLab({
  simId,
  showCatalogLink = true,
}: {
  simId?: SimId;
  showCatalogLink?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<SimId>(simId ?? "circuits");
  const sim = SIMULATIONS.find((s) => s.id === selectedId) ?? SIMULATIONS[0];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 rounded-2xl bg-white/10 border border-white/10 shadow-inner">
            {sim.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{sim.title}</h3>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${sim.subjectColor}20`,
                  borderColor: `${sim.subjectColor}40`,
                  color: sim.subjectColor,
                }}
              >
                {sim.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400">{sim.ncertChapter} — {sim.tagline}</p>
          </div>
        </div>

        {showCatalogLink && (
          <Link
            href="/labs"
            className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-300 font-semibold transition"
          >
            <span>🔬 Browse All 6 Labs</span>
            <span>→</span>
          </Link>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-2xl">
        {sim.embedUrl ? (
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <iframe
                src={sim.embedUrl}
                title={sim.title}
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Interactive PhET Simulation by University of Colorado Boulder (Open Source HTML5)</span>
              <a
                href={sim.embedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open Fullscreen</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ) : sim.id === "parabola" ? (
          <ParabolaVisualizer />
        ) : sim.id === "heart-circulation" ? (
          <HeartCirculationVisualizer />
        ) : sim.id === "punnett-square" ? (
          <PunnettVisualizer />
        ) : null}
      </div>

      {/* Guided Experiments & CBSE Questions Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
            <span>📋 Guided Board Experiment Steps</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {sim.experimentSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-1.5">
            <span>🎯 High-Yield CBSE Question</span>
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5 mb-2 font-medium">
            "{sim.cbseExamQuestion}"
          </p>
          <span className="text-[11px] text-slate-400">
            Use the simulation above to experiment, observe the underlying physical or mathematical principles, and write your verified answer.
          </span>
        </div>
      </div>
    </div>
  );
}
