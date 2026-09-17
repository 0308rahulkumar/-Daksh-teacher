"use client";

import { useState } from "react";
import Link from "next/link";
import { SIMULATIONS, InteractiveSimLab, type SimId } from "@/components/InteractiveSimLab";

export default function LabsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Physics" | "Chemistry" | "Biology" | "Mathematics">("All");
  const [activeSimId, setActiveSimId] = useState<SimId>("circuits");

  const filteredSims = activeFilter === "All"
    ? SIMULATIONS
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
              <span>✨ 3D & Vector STEM Simulation Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Interactive STEM Laboratories
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the Class 10 CBSE Science and Mathematics concepts visually through real-time interactive physics engines, circuit builders, chemical pH probes, and biological process models.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/subjects"
              className="text-xs px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 transition"
            >
              ← Back to Syllabus
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 items-center justify-between border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {(["All", "Physics", "Chemistry", "Biology", "Mathematics"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-4 py-2 rounded-xl font-medium transition border ${
                activeFilter === filter
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {filter === "All" && "🌐 "}
              {filter === "Physics" && "⚡ "}
              {filter === "Chemistry" && "🧪 "}
              {filter === "Biology" && "🫀 "}
              {filter === "Mathematics" && "📐 "}
              {filter}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredSims.length} Active Laboratories
        </span>
      </div>

      {/* Lab Selector Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSims.map((sim) => {
          const isSelected = sim.id === activeSimId;
          return (
            <div
              key={sim.id}
              onClick={() => setActiveSimId(sim.id)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900/90 border-amber-400 shadow-xl shadow-amber-500/10 scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
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
          );
        })}
      </div>

      {/* Active Simulation Stage */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-400">✨</span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Active Laboratory Canvas: {activeSim.title}
          </h2>
        </div>
        <InteractiveSimLab key={activeSimId} simId={activeSimId} showCatalogLink={false} />
      </div>
    </div>
  );
}
