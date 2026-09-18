"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SIMULATIONS, InteractiveSimLab, type SimId } from "@/components/InteractiveSimLab";
import { Interactive3DCard } from "@/components/Interactive3DCard";
import { ThreeLabStage } from "@/components/ThreeLabStage";
import { SCIENCE_EXPERIMENTS } from "@/lib/scienceExperiments";

function LabsContent() {
  const searchParams = useSearchParams();
  const simParam = searchParams.get("sim") as SimId | null;

  const [activeFilter, setActiveFilter] = useState<"All" | "NCERT Activities" | "Physics" | "Chemistry" | "Biology" | "Mathematics" | "NCERT Practicals">("All");
  const [activeSimId, setActiveSimId] = useState<SimId>("circuits");
  const [show3DStage, setShow3DStage] = useState(true);

  useEffect(() => {
    if (simParam && SIMULATIONS.some((s) => s.id === simParam)) {
      setActiveSimId(simParam);
      if (simParam.startsWith("act-")) {
        setActiveFilter("NCERT Activities");
      } else {
        const found = SIMULATIONS.find((s) => s.id === simParam);
        if (found) setActiveFilter(found.subject);
      }
    }
  }, [simParam]);

  const filteredSims = activeFilter === "All" || activeFilter === "NCERT Practicals"
    ? SIMULATIONS
    : activeFilter === "NCERT Activities"
    ? SIMULATIONS.filter((s) => s.id.startsWith("act-") || s.badge.includes("NCERT Activity"))
    : SIMULATIONS.filter((s) => s.subject === activeFilter);

  const activeSim = SIMULATIONS.find((s) => s.id === activeSimId) ?? SIMULATIONS[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-2 sm:px-4 py-6">
      {/* Top Header */}
      <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950/60 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>✨ 3D WebGL & Vector STEM Simulation Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Interactive STEM Laboratories
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the Class 10 CBSE Science and Mathematics concepts visually through real-time interactive physics engines, circuit builders, chemical pH probes, and biological process models.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            <button
              type="button"
              onClick={() => setShow3DStage(!show3DStage)}
              className="text-xs px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold border border-cyan-500/40 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>⚛️</span>
              <span>{show3DStage ? "Hide 3D Apparatus" : "Show 3D Apparatus"}</span>
            </button>
            <Link
              href="/subjects"
              className="text-xs px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition"
            >
              ← Back to Syllabus
            </Link>
          </div>
        </div>
      </div>

      {/* 3D WebGL Interactive Science Stage */}
      {show3DStage && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs">
            <span className="font-mono text-slate-400 flex items-center gap-1.5">
              <span className="text-cyan-400">⚡</span>
              <span>Interactive WebGL 3D Model: Orbit, rotate, and inspect atom shells & light dispersion</span>
            </span>
            <span className="text-cyan-400 font-bold text-[11px]">Real-Time Three.js Engine</span>
          </div>
          <ThreeLabStage />
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 items-center justify-between border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {(["All", "NCERT Activities", "Physics", "Chemistry", "Biology", "Mathematics", "NCERT Practicals"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-4 py-2 rounded-xl font-medium transition border cursor-pointer ${
                activeFilter === filter
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10 font-bold"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {filter === "All" && "🌐 "}
              {filter === "NCERT Activities" && "🎬 "}
              {filter === "Physics" && "⚡ "}
              {filter === "Chemistry" && "🧪 "}
              {filter === "Biology" && "🫀 "}
              {filter === "Mathematics" && "📐 "}
              {filter === "NCERT Practicals" && "🔬 "}
              {filter}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredSims.length} Active Laboratories
        </span>
      </div>

      {/* Prescribed NCERT Practicals Strip (Visible when NCERT filter selected) */}
      {activeFilter === "NCERT Practicals" && (
        <div className="space-y-4 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <span>📚</span>
                <span>Official NCERT Class 10 Prescribed Practicals</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Every official CBSE board science experiment paired with its matching interactive laboratory simulator.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {SCIENCE_EXPERIMENTS.length} Prescribed Experiments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCIENCE_EXPERIMENTS.map((exp) => (
              <div
                key={exp.id}
                onClick={() => {
                  if (exp.simId) setActiveSimId(exp.simId);
                }}
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 hover:border-amber-500/50 hover:bg-white/10 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-amber-400">{exp.ncertExpNo}</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {exp.badge}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white text-xs leading-snug group-hover:text-amber-300 transition">
                    {exp.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{exp.aim}</p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">NCERT Practical</span>
                  <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition">
                    Simulate Lab →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lab Selector Cards Strip with 3D Tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSims.map((sim) => {
          const isSelected = sim.id === activeSimId;
          return (
            <Interactive3DCard key={sim.id} maxRotation={6}>
              <div
                onClick={() => setActiveSimId(sim.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full ${
                  isSelected
                    ? "bg-slate-900/90 border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.01]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xl p-2 rounded-xl bg-white/10">{sim.icon}</span>
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${sim.subjectColor}20`,
                        borderColor: `${sim.subjectColor}40`,
                        color: sim.subjectColor,
                      }}
                    >
                      {sim.subject}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug">{sim.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{sim.tagline}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{sim.ncertChapter}</span>
                  <span className={`font-semibold ${isSelected ? "text-amber-400" : "text-slate-400"}`}>
                    {isSelected ? "● Active Lab" : "Launch →"}
                  </span>
                </div>
              </div>
            </Interactive3DCard>
          );
        })}
      </div>

      {/* Active Simulation Stage with Holographic Laser HUD */}
      <div className="pt-2">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">✨</span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Active Laboratory Canvas: {activeSim.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">Live Engine</span>
          </div>
        </div>

        <InteractiveSimLab key={activeSimId} simId={activeSimId} showCatalogLink={false} />
      </div>
    </div>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-sm">Loading Interactive Laboratories…</div>}>
      <LabsContent />
    </Suspense>
  );
}
