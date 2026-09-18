"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type Subject } from "@/lib/types";

interface SubjectBookShowcaseProps {
  subjects: Array<
    Subject & {
      total: number;
      mastered: number;
      practicing: number;
      pct: number;
      theme: {
        icon: string;
        badge: string;
        color: string;
        bg: string;
      };
    }
  >;
}

export function SubjectBookShowcase({ subjects }: SubjectBookShowcaseProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward" | null>(null);

  const activeSubjectData = selectedSubject
    ? subjects.find((s) => s.id === selectedSubject.id)
    : null;

  const changeChapter = (nextIndex: number, dir: "forward" | "backward") => {
    setFlipDirection(dir);
    setActiveChapterIndex(nextIndex);
    setTimeout(() => setFlipDirection(null), 400);
  };

  const getSubjectBoardMeta = (id: string) => {
    if (id === "bseb-english") {
      return {
        board: "Bihar Board (BSEB)",
        edition: "Panorama Part 2 Edition",
        spine: "BSEB · CLASS X",
        readerDesc: "Flip through official Bihar Board Panorama Part 2 prose, poetry & supplementary stories.",
      };
    }
    if (id === "english-grammar") {
      return {
        board: "English Grammar",
        edition: "Core Class 10 Syllabus",
        spine: "GRAMMAR · X",
        readerDesc: "Master Class 10 English Grammar rules, tenses, modals, concord & reported speech.",
      };
    }
    if (id === "hindi-grammar") {
      return {
        board: "हिंदी व्याकरण एवं रचना",
        edition: "बोर्ड परीक्षा पाठ्यक्रम",
        spine: "व्याकरण · X",
        readerDesc: "बोर्ड परीक्षा के लिए पदबंध, वाक्य भेद, समास, वाच्य, अलंकार व मुहावरे सीखें।",
      };
    }
    return {
      board: "Central Board (CBSE)",
      edition: "NCERT Official Curriculum",
      spine: "NCERT · CLASS X",
      readerDesc: "Flip through official NCERT chapters, inspect syllabus topics, and jump into AI explanations.",
    };
  };

  return (
    <div className="w-full space-y-6">
      {/* 3D Physical Book Shelf */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4 pb-2">
        {subjects.map((s, idx) => {
          const isSelected = selectedSubject?.id === s.id;
          const meta = getSubjectBoardMeta(s.id);
          return (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSubject(s);
                setActiveChapterIndex(0);
              }}
              className="group cursor-pointer perspective-[1200px]"
            >
              {/* 3D Hardcover Book Container */}
              <div
                className={`relative h-[320px] w-full rounded-r-xl transition-all duration-500 ease-out transform-gpu preserve-3d shadow-xl group-hover:-translate-y-2 group-hover:rotate-y-[-14deg] group-hover:shadow-2xl ${
                  isSelected ? "ring-2 ring-accent scale-[1.02] rotate-y-[-8deg]" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${s.theme.color}22 0%, #171614 60%, #0d0c0a 100%)`,
                }}
              >
                {/* Book Spine (3D depth simulation) */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-5 rounded-l-md border-r border-black/40 shadow-inner"
                  style={{
                    background: `linear-gradient(90deg, ${s.theme.color}dd 0%, ${s.theme.color}88 60%, rgba(0,0,0,0.5) 100%)`,
                  }}
                >
                  <div className="h-full w-full flex items-center justify-center opacity-70">
                    <span className="text-[9px] font-mono tracking-widest text-white rotate-90 uppercase whitespace-nowrap">
                      {meta.spine}
                    </span>
                  </div>
                </div>

                {/* Hardcover Front Texture & Content */}
                <div className="ml-5 h-full p-5 flex flex-col justify-between border-t border-r border-b border-[#c3a47b]/20 rounded-r-xl relative overflow-hidden bg-radial from-white/[0.04] to-transparent">
                  {/* Subtle Foil Emboss Effect */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl drop-shadow-md">{s.theme.icon}</span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-[#eee2ca]/80"
                        style={{ background: `${s.theme.color}20` }}
                      >
                        VOL. 0${idx + 1}
                      </span>
                    </div>

                    <div className="pt-3">
                      <p className="text-[11px] font-serif uppercase tracking-widest text-[#c3a47b]">
                        {meta.board}
                      </p>
                      <h3 className="font-serif text-2xl font-bold tracking-tight text-[#eee2ca] group-hover:text-white transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-xs text-[#c5b79e]/70 mt-1 line-clamp-2">
                        {s.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Volume Metadata & Chapter Count */}
                  <div className="space-y-3 pt-4 border-t border-[#c3a47b]/15">
                    <div className="flex items-center justify-between text-xs text-[#eee2ca]">
                      <span className="font-mono text-[11px] text-[#c5b79e]">
                        {s.chapters.length} Chapters
                      </span>
                      <span
                        className="font-bold text-xs"
                        style={{ color: s.theme.color }}
                      >
                        {s.pct}% Mastered
                      </span>
                    </div>

                    {/* Miniature Page Edge Effect */}
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(s.pct, 4)}%`,
                          backgroundColor: s.theme.color,
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full text-center text-xs font-serif italic py-1.5 rounded-lg border border-[#c3a47b]/30 text-[#eee2ca] hover:bg-[#c3a47b]/15 transition-all"
                    >
                      {isSelected ? "📖 Book Opened" : "Open Volume ➔"}
                    </button>
                  </div>

                  {/* Right Edge Page Thickness (Book Pages Illusion) */}
                  <div
                    className="absolute right-0 top-1 bottom-1 w-2 rounded-r-xs opacity-40 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(to right, #e8dfc8 0px, #e8dfc8 1px, #b0a58e 2px)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Opened Book Chapter Viewer */}
      {selectedSubject && activeSubjectData && (
        <div className="mt-8 rounded-2xl border border-[#c3a47b]/30 bg-[#161412] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          {/* Subtle Vintage Watermark */}
          <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] text-9xl font-serif pointer-events-none select-none text-[#eee2ca]">
            {activeSubjectData.theme.icon}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#c3a47b]/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeSubjectData.theme.icon}</span>
                <span className="text-xs uppercase tracking-widest font-mono text-[#c3a47b]">
                  {getSubjectBoardMeta(activeSubjectData.id).board} · {activeSubjectData.name}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#eee2ca] mt-1">
                Browse Table of Contents & Chapters
              </h2>
              <p className="text-sm text-[#c5b79e] mt-1">
                {getSubjectBoardMeta(activeSubjectData.id).readerDesc}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/subjects/${selectedSubject.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#c3a47b] text-[#1d1a15] hover:bg-[#dbc39c] transition-all shadow-md"
              >
                Study Entire Subject Full-Screen ➔
              </Link>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="text-xs px-3 py-2 rounded-xl border border-white/10 text-muted hover:text-white transition-colors"
              >
                Close Book ✕
              </button>
            </div>
          </div>

          {/* Chapter Table of Contents & Topics Split Viewer */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {/* Left: Chapter Index Strip */}
            <div className="lg:col-span-4 space-y-2 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#c3a47b] block mb-2 font-semibold">
                Chapters ({selectedSubject.chapters.length})
              </span>
              {selectedSubject.chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start justify-between gap-2 ${
                      isActive
                        ? "border-[#c3a47b] bg-[#c3a47b]/15 text-[#eee2ca] shadow-xs font-medium"
                        : "border-white/5 bg-white/[0.02] text-[#c5b79e] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#c3a47b] block">
                        Chapter {idx + 1} · {ch.branch || "General"}
                      </span>
                      <span className="text-sm font-serif line-clamp-1">
                        {ch.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono shrink-0 text-[#c5b79e]/60 pt-1">
                      {ch.topics.length} topics
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Chapter Pages Flip Preview */}
            <div
              className={`lg:col-span-8 rounded-xl border border-[#c3a47b]/20 bg-[#1e1a15]/90 p-6 flex flex-col justify-between shadow-inner transition-transform ${
                flipDirection === "forward"
                  ? "anim-page-turn-forward"
                  : flipDirection === "backward"
                  ? "anim-page-turn-backward"
                  : ""
              }`}
            >
              {(() => {
                const chapter = selectedSubject.chapters[activeChapterIndex] || selectedSubject.chapters[0];
                if (!chapter) return null;

                return (
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-[#c3a47b]/15 pb-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#c3a47b]">
                          {chapter.branch || selectedSubject.name} · CHAPTER {activeChapterIndex + 1}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#eee2ca] mt-0.5">
                          {chapter.name}
                        </h3>
                        <p className="text-xs text-[#c5b79e] mt-1">
                          CBSE NCERT Class 10 Syllabus topics covered in this unit
                        </p>
                      </div>

                      <Link
                        href={`/subjects/${selectedSubject.id}/${chapter.id}`}
                        className="shrink-0 px-3.5 py-1.5 rounded-lg border border-[#c3a47b]/40 text-xs font-serif text-[#eee2ca] hover:bg-[#c3a47b]/20 transition-colors"
                      >
                        Study Chapter ➔
                      </Link>
                    </div>

                    {/* Topics Grid */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {chapter.topics.map((t, tIdx) => (
                        <Link
                          key={t.id}
                          href={`/subjects/${selectedSubject.id}/${chapter.id}/${t.id}`}
                          className="group p-3.5 rounded-xl border border-white/10 bg-black/20 hover:border-[#c3a47b]/60 hover:bg-[#c3a47b]/10 transition-all block"
                        >
                          <div className="flex items-start gap-2">
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#c3a47b]/20 text-[10px] font-mono text-[#c3a47b] shrink-0 mt-0.5">
                              {tIdx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs font-semibold text-[#eee2ca] group-hover:text-white transition-colors">
                                {t.name}
                              </h4>
                              {t.focus && (
                                <p className="text-[11px] text-[#c5b79e]/70 mt-1 line-clamp-2">
                                  {t.focus}
                                </p>
                              )}
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#c3a47b] mt-2 group-hover:underline">
                                Instant Notes & Flashcards →
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Navigation between chapters */}
                    <div className="pt-4 border-t border-[#c3a47b]/15 flex items-center justify-between text-xs text-[#c5b79e]">
                      <button
                        type="button"
                        disabled={activeChapterIndex === 0}
                        onClick={() => changeChapter(Math.max(0, activeChapterIndex - 1), "backward")}
                        className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        ← Turn Page Backward
                      </button>

                      <span className="font-mono text-[11px]">
                        Chapter {activeChapterIndex + 1} of {selectedSubject.chapters.length}
                      </span>

                      <button
                        type="button"
                        disabled={activeChapterIndex === selectedSubject.chapters.length - 1}
                        onClick={() =>
                          changeChapter(
                            Math.min(selectedSubject.chapters.length - 1, activeChapterIndex + 1),
                            "forward"
                          )
                        }
                        className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        Turn Page Forward →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
