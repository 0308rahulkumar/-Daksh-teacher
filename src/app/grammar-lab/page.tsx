"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import type { GrammarAnalysisResult } from "@/app/api/grammar/route";

function HaikeiWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      viewBox="0 0 900 600"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 400C150 480 350 320 500 410C650 500 780 430 900 480L900 600L0 600Z"
        fill="url(#wave-grad)"
      />
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface ExampleChip {
  label: string;
  sentence: string;
  lang: "english" | "hindi";
  tag?: string;
}

const PRESET_EXAMPLES: ExampleChip[] = [
  {
    label: "All 8 Parts of Speech",
    sentence: "Alas! The quick brown fox jumps gracefully over the lazy dog and sleeps.",
    lang: "english",
    tag: "Complete POS",
  },
  {
    label: "Adjectives Royal Order (OSASCOMP)",
    sentence: "She bought a lovely little old round Italian wooden dining table.",
    lang: "english",
    tag: "Adjectives",
  },
  {
    label: "Subject-Verb Concord Trap",
    sentence: "Neither the teacher nor the students was present in the auditorium.",
    lang: "english",
    tag: "Concord",
  },
  {
    label: "Negative Adverb Inversion",
    sentence: "Hardly she had entered the station when the train departed.",
    lang: "english",
    tag: "Adverbs",
  },
  {
    label: "हिंदी: पदबंध पहचान (विशेषण पदबंध)",
    sentence: "हमेशा सच बोलने वाले हरिश्चंद्र आज भी इतिहास में अमर हैं।",
    lang: "hindi",
    tag: "पदबंध",
  },
  {
    label: "हिंदी: वाक्य रूपांतरण (सरल से मिश्र)",
    sentence: "सूर्योदय होने पर पक्षी चहचहाने लगे और फूल खिल उठे।",
    lang: "hindi",
    tag: "वाक्य भेद",
  },
  {
    label: "हिंदी: भाववाच्य एवं अकर्मक क्रिया",
    sentence: "घायल वृद्ध व्यक्ति से इतनी तेज धूप में अब चला नहीं जाता।",
    lang: "hindi",
    tag: "वाच्य",
  },
  {
    label: "हिंदी: समास विग्रह (द्विगु vs बहुव्रीहि)",
    sentence: "दशानन ने अपनी दस भुजाओं से त्रिलोक को भयभीत कर दिया।",
    lang: "hindi",
    tag: "समास",
  },
];

interface PosTag {
  word: string;
  pos: string;
  color: string;
  badgeColor: string;
  role: string;
}

function tagPartsOfSpeech(sentence: string): PosTag[] {
  const words = sentence.split(/\s+/).filter(Boolean);
  const cleanWord = (w: string) => w.replace(/[^a-zA-Z]/g, "").toLowerCase();

  const pronouns = new Set([
    "i", "me", "my", "mine", "myself",
    "we", "us", "our", "ours", "ourselves",
    "you", "your", "yours", "yourself", "yourselves",
    "he", "him", "his", "himself",
    "she", "her", "hers", "herself",
    "it", "its", "itself",
    "they", "them", "their", "theirs", "themselves",
    "who", "whom", "whose", "which", "that", "this", "these", "those",
    "everyone", "everybody", "someone", "somebody", "anyone", "anybody", "nobody",
    "each", "both", "neither", "either", "none", "one", "another"
  ]);

  const prepositions = new Set([
    "in", "on", "at", "to", "for", "with", "from", "by", "about",
    "into", "through", "during", "before", "after", "above", "below",
    "between", "under", "since", "across", "against", "among", "along",
    "behind", "upon", "off", "over", "within", "without", "towards"
  ]);

  const conjunctions = new Set([
    "and", "but", "or", "nor", "for", "yet", "so",
    "although", "because", "since", "unless", "while", "whereas",
    "if", "though", "until", "as", "than", "whether"
  ]);

  const interjections = new Set([
    "alas", "hurrah", "wow", "ouch", "bravo", "oh", "aha", "hush",
    "hey", "hello", "yippee", "oops", "ah", "gosh", "bingo"
  ]);

  const determiners = new Set([
    "the", "a", "an", "some", "any", "much", "many", "few", "little",
    "every", "all", "several", "no"
  ]);

  const commonVerbs = new Set([
    "is", "am", "are", "was", "were", "be", "being", "been",
    "have", "has", "had", "do", "does", "did",
    "can", "could", "will", "would", "shall", "should", "may", "might", "must",
    "jumps", "jump", "jumped", "runs", "ran", "run", "sleeps", "sleep", "slept",
    "bought", "buy", "buys", "reads", "read", "writes", "wrote", "see", "saw",
    "look", "sing", "sings", "fly", "flies", "go", "went", "gone", "walk", "walks"
  ]);

  const commonAdjectives = new Set([
    "quick", "brown", "lazy", "good", "bad", "great", "small", "big", "tall",
    "short", "heavy", "light", "beautiful", "brave", "honest", "wise", "happy",
    "sad", "young", "old", "new", "lovely", "little", "round", "italian", "wooden", "dining"
  ]);

  return words.map((raw) => {
    const w = cleanWord(raw);

    if (interjections.has(w)) {
      return {
        word: raw,
        pos: "Interjection",
        color: "border-rose-500/30 bg-rose-500/10 text-rose-300",
        badgeColor: "bg-rose-500 text-white",
        role: "Expresses sudden burst of emotion or feeling",
      };
    }
    if (determiners.has(w)) {
      return {
        word: raw,
        pos: "Determiner",
        color: "border-teal-500/30 bg-teal-500/10 text-teal-300",
        badgeColor: "bg-teal-500 text-white",
        role: "Specifies or quantifies the following noun",
      };
    }
    if (pronouns.has(w)) {
      return {
        word: raw,
        pos: "Pronoun",
        color: "border-purple-500/30 bg-purple-500/10 text-purple-300",
        badgeColor: "bg-purple-500 text-white",
        role: "Substitutes a noun to prevent repetitive phrasing",
      };
    }
    if (prepositions.has(w)) {
      return {
        word: raw,
        pos: "Preposition",
        color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
        badgeColor: "bg-cyan-500 text-white",
        role: "Shows relation of time, position, direction, or movement",
      };
    }
    if (conjunctions.has(w)) {
      return {
        word: raw,
        pos: "Conjunction",
        color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
        badgeColor: "bg-indigo-500 text-white",
        role: "Connects clauses, words, or grammatically parallel structures",
      };
    }
    if (commonVerbs.has(w) || w.endsWith("ed") || (w.endsWith("ing") && !w.startsWith("dur") && !w.startsWith("din"))) {
      return {
        word: raw,
        pos: "Verb",
        color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        badgeColor: "bg-emerald-500 text-white",
        role: "Expresses action, occurrence, or state of being",
      };
    }
    if (w.endsWith("ly") || w === "very" || w === "quite" || w === "too" || w === "seldom" || w === "hardly") {
      return {
        word: raw,
        pos: "Adverb",
        color: "border-pink-500/30 bg-pink-500/10 text-pink-300",
        badgeColor: "bg-pink-500 text-white",
        role: "Modifies a verb, adjective, or another adverb",
      };
    }
    if (commonAdjectives.has(w) || w.endsWith("ful") || w.endsWith("ous") || w.endsWith("ive") || w.endsWith("able") || w.endsWith("en")) {
      return {
        word: raw,
        pos: "Adjective",
        color: "border-amber-500/30 bg-amber-500/10 text-amber-300",
        badgeColor: "bg-amber-500 text-slate-950 font-bold",
        role: "Describes, qualifies, or limits a noun or pronoun",
      };
    }
    return {
      word: raw,
      pos: "Noun",
      color: "border-blue-500/30 bg-blue-500/10 text-blue-300",
      badgeColor: "bg-blue-500 text-white",
      role: "Names a person, animal, place, thing, or abstract quality",
    };
  });
}

const POS_LEGEND = [
  { name: "Noun", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: "📦" },
  { name: "Pronoun", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: "👤" },
  { name: "Verb", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: "⚡" },
  { name: "Adjective", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: "🎨" },
  { name: "Adverb", color: "bg-pink-500/20 text-pink-300 border-pink-500/30", icon: "🚀" },
  { name: "Preposition", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", icon: "📍" },
  { name: "Conjunction", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30", icon: "🔗" },
  { name: "Interjection", color: "bg-rose-500/20 text-rose-300 border-rose-500/30", icon: "💥" },
  { name: "Determiner", color: "bg-teal-500/20 text-teal-300 border-teal-500/30", icon: "🏷️" },
];

export default function GrammarLabPage() {
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GrammarAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hoveredPos, setHoveredPos] = useState<PosTag | null>(null);

  // Practice Quiz State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  async function handleAnalyze(textToAnalyze?: string) {
    const text = textToAnalyze !== undefined ? textToAnalyze : inputText;
    if (!text.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSelectedOption(null);
    setQuizSubmitted(false);

    try {
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to analyze grammar.");
      }

      setAnalysis(data.data);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to analyze grammar.");
    } finally {
      setLoading(false);
    }
  }

  function handleChipClick(example: ExampleChip) {
    setLanguage(example.lang);
    setInputText(example.sentence);
    handleAnalyze(example.sentence);
  }

  const posTaggedTokens = language === "english" && inputText.trim() ? tagPartsOfSpeech(inputText) : [];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header with Haikei Waves */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-card to-background p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <HaikeiWaves className="opacity-25" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <span>✍️</span>
            <span>Bilingual AI Grammar & हिंदी व्याकरण Studio</span>
            <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.2 text-[10px]">Class 10 Board</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-serif">
            AI Grammar Studio & Parts of Speech Master
          </h1>

          <p className="text-sm text-muted leading-relaxed">
            Real-time sentence diagnosis, Complete 8 Parts of Speech tagging, Concord error detection, Tense tracking, and Hindi पदबंध, वाच्य व समास रूपांतरण rules.
          </p>

          {/* Quick links to subject chapters */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              href="/subjects/english-grammar"
              className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium flex items-center gap-1.5"
            >
              <span>📖</span>
              <span>English Grammar Chapters (16)</span>
            </Link>
            <Link
              href="/subjects/hindi-grammar"
              className="text-xs px-3 py-1.5 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 transition-all font-medium flex items-center gap-1.5"
            >
              <span>🕉️</span>
              <span>हिंदी व्याकरण पाठ (9)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Language Toggle & Practice Presets */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Study Mode:</span>
            <div className="inline-flex rounded-xl border border-white/10 bg-background/60 p-1">
              <button
                type="button"
                onClick={() => setLanguage("english")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  language === "english"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                🇬🇧 English Grammar & POS
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hindi")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  language === "hindi"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                🇮🇳 हिंदी व्याकरण
              </button>
            </div>
          </div>

          <span className="text-xs text-muted">Click any preset challenge below to inspect instant rules</span>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2">
          {PRESET_EXAMPLES.filter((ex) => ex.lang === language).map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(ex)}
              className="rounded-full border border-white/10 bg-card/60 hover:bg-indigo-500/10 hover:border-indigo-500/30 px-3 py-1 text-xs text-foreground/80 hover:text-indigo-300 transition flex items-center gap-1.5"
            >
              {ex.tag && (
                <span className="text-[10px] font-mono px-1 rounded bg-white/10 text-muted">
                  {ex.tag}
                </span>
              )}
              <span>{ex.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="rounded-2xl border border-white/10 bg-card/40 p-4 sm:p-6 space-y-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <label htmlFor="grammar-input" className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-2">
            <span>📝 Enter Your Sentence to Parse:</span>
          </label>
          <span className="text-[11px] text-muted font-mono">Real-time Syntactic & POS Engine</span>
        </div>

        <textarea
          id="grammar-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === "english"
              ? "e.g. Alas! The quick brown fox jumps gracefully over the lazy dog and sleeps..."
              : "उदा. जो छात्र परिश्रम करते हैं वे अवश्य सफल होते हैं..."
          }
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition resize-none"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted">{inputText.length} / 1000 characters</span>
          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Analyzing Grammar & POS…
              </>
            ) : (
              <>
                <span>✨ Analyze Grammar & Parts of Speech</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* PARTS OF SPEECH TAGGER (English Mode) */}
      {language === "english" && posTaggedTokens.length > 0 && (
        <SpotlightCard className="p-6 border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-card to-background space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏷️</span>
                <h3 className="text-base font-bold text-foreground">
                  Complete Parts of Speech Tagging (POS Engine)
                </h3>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Every word classified into its grammatical category. Hover or click on any token to view its syntactic role.
              </p>
            </div>

            {/* Legend Pills */}
            <div className="flex flex-wrap gap-1.5">
              {POS_LEGEND.map((lg) => (
                <span key={lg.name} className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${lg.color}`}>
                  <span>{lg.icon}</span>
                  <span>{lg.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Token Strip */}
          <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-xl border border-white/10 bg-background/60">
            {posTaggedTokens.map((token, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPos(token)}
                onMouseLeave={() => setHoveredPos(null)}
                className={`group relative px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 flex flex-col items-center gap-1 ${token.color}`}
              >
                <span className="text-sm font-semibold tracking-wide">{token.word}</span>
                <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded-full ${token.badgeColor}`}>
                  {token.pos}
                </span>
              </div>
            ))}
          </div>

          {/* Hovered Token Deep-Dive */}
          {hoveredPos && (
            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-foreground flex items-center gap-2 animate-fade-in">
              <span className="font-bold text-indigo-300">Word: &quot;{hoveredPos.word}&quot;</span>
              <span>•</span>
              <span className="font-mono text-muted">Part of Speech: {hoveredPos.pos}</span>
              <span>•</span>
              <span className="text-muted">{hoveredPos.role}</span>
            </div>
          )}
        </SpotlightCard>
      )}

      {/* Analysis Output */}
      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Comparison Card */}
          <SpotlightCard className="p-6 sm:p-8 space-y-6 border border-white/10 bg-card/60">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>🔍 Diagnostic Result</span>
              </h2>
              {analysis.hasErrors ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
                  ⚠️ {analysis.errors.length} Error{analysis.errors.length > 1 ? "s" : ""} Detected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
                  ✅ Grammatically Flawless!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-background/50 space-y-1">
                <span className="text-xs uppercase font-semibold text-muted tracking-wider">Original Input</span>
                <p className="text-sm font-medium text-foreground">{analysis.original}</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">Corrected Standard Version</span>
                <p className="text-sm font-medium text-emerald-200">{analysis.corrected}</p>
              </div>
            </div>

            {/* Error breakdown pills */}
            {analysis.hasErrors && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Identified Issues & Rules:</h3>
                <div className="space-y-2">
                  {analysis.errors.map((err, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="line-through text-rose-400 font-semibold">{err.originalSegment}</span>
                          <span className="text-muted">→</span>
                          <span className="text-emerald-400 font-semibold">{err.replacement}</span>
                          <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-300">
                            {err.rule}
                          </span>
                        </div>
                        <p className="text-muted">{err.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SpotlightCard>

          {/* Syntactic Anatomy Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SpotlightCard className="p-4 border border-white/10 bg-card/50 space-y-1">
              <span className="text-xs uppercase font-semibold text-muted tracking-wider">
                {language === "english" ? "Tense / Aspect" : "काल / क्रिया"}
              </span>
              <p className="text-sm font-bold text-indigo-300">
                {analysis.syntacticBreakdown.tenseOrKriya || "Standard form"}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 border border-white/10 bg-card/50 space-y-1">
              <span className="text-xs uppercase font-semibold text-muted tracking-wider">
                {language === "english" ? "Voice" : "वाच्य रूप"}
              </span>
              <p className="text-sm font-bold text-purple-300">
                {analysis.syntacticBreakdown.voiceOrVachya || "Active / कर्तृवाच्य"}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-4 border border-white/10 bg-card/50 space-y-1">
              <span className="text-xs uppercase font-semibold text-muted tracking-wider">
                {language === "english" ? "Sentence Structure" : "वाक्य भेद"}
              </span>
              <p className="text-sm font-bold text-amber-300">
                {analysis.syntacticBreakdown.sentenceType || "Simple / सरल"}
              </p>
            </SpotlightCard>
          </div>

          {/* Board Exam Tip */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300">Class 10 Board Scoring Strategy</h4>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{analysis.boardExamTip}</p>
            </div>
          </div>

          {/* Interactive Practice Challenge */}
          {analysis.practiceChallenge && (
            <SpotlightCard className="p-6 border border-white/10 bg-card/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>🎯 Quick Rule Check: Practice Challenge</span>
                </h3>
                <span className="text-xs rounded-full bg-indigo-500/20 px-2 py-0.5 text-indigo-300">1 Mark</span>
              </div>

              <p className="text-sm font-medium text-foreground">{analysis.practiceChallenge.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {analysis.practiceChallenge.options.map((opt, oIdx) => {
                  const optLetter = String.fromCharCode(65 + oIdx);
                  const isSelected = selectedOption === optLetter;
                  const isCorrect = optLetter === analysis.practiceChallenge!.answer;

                  let btnStyle = "border-white/10 bg-background/50 text-foreground hover:bg-card";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
                    }
                  } else if (isSelected) {
                    btnStyle = "border-indigo-500 bg-indigo-500/20 text-indigo-200";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => setSelectedOption(optLetter)}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-center gap-2.5 ${btnStyle}`}
                    >
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-white/5 font-semibold text-xs shrink-0">
                        {optLetter}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={() => setQuizSubmitted(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 active:scale-95 disabled:opacity-40 transition cursor-pointer"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-muted space-y-1">
                  <p className="font-semibold text-foreground">
                    {selectedOption === analysis.practiceChallenge.answer ? "🎉 Correct!" : "❌ Incorrect"}
                  </p>
                  <p>{analysis.practiceChallenge.explanation}</p>
                </div>
              )}
            </SpotlightCard>
          )}
        </div>
      )}

      {/* Complete Parts of Speech Board Master Cards */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Complete 8 Parts of Speech Board Master Reference</h3>
            <p className="text-xs text-muted">High-yield rules, formulas, and common board exam traps</p>
          </div>
          <Link
            href="/subjects/english-grammar"
            className="text-xs text-indigo-400 hover:underline font-medium"
          >
            Study All 16 Chapters →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <SpotlightCard className="p-4 border border-blue-500/20 bg-card/40 space-y-2">
            <span className="text-xl">📦</span>
            <h4 className="text-sm font-bold text-blue-300">1. Nouns</h4>
            <p className="text-xs text-muted">
              Countables vs Uncountables (information, furniture never take &apos;s&apos;), Collective nouns agreement, and living possessives (&apos;s).
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-purple-500/20 bg-card/40 space-y-2">
            <span className="text-xl">👤</span>
            <h4 className="text-sm font-bold text-purple-300">2. Pronouns</h4>
            <p className="text-xs text-muted">
              2-3-1 Person Order (You, he and I), Who (Subject) vs Whom (Object), and &apos;That&apos; after superlatives and all/only.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-emerald-500/20 bg-card/40 space-y-2">
            <span className="text-xl">⚡</span>
            <h4 className="text-sm font-bold text-emerald-300">3. Verbs & Non-Finites</h4>
            <p className="text-xs text-muted">
              Transitive vs Intransitive verbs, Linking verbs, Infinitives (to & bare), Gerunds, and Dangling Participles.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-amber-500/20 bg-card/40 space-y-2">
            <span className="text-xl">🎨</span>
            <h4 className="text-sm font-bold text-amber-300">4. Adjectives</h4>
            <p className="text-xs text-muted">
              Royal Order OSASCOMP (Opinion, Size, Age, Shape, Color, Origin, Material, Purpose) & -ior adjectives taking &apos;to&apos;.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-pink-500/20 bg-card/40 space-y-2">
            <span className="text-xl">🚀</span>
            <h4 className="text-sm font-bold text-pink-300">5. Adverbs</h4>
            <p className="text-xs text-muted">
              MPT Rule (Manner + Place + Time), Hard vs Hardly, and Negative Inversion (Seldom have I seen...).
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-cyan-500/20 bg-card/40 space-y-2">
            <span className="text-xl">📍</span>
            <h4 className="text-sm font-bold text-cyan-300">6. Prepositions</h4>
            <p className="text-xs text-muted">
              Prepositions of time/place (in, on, at, by, since, for) & Fixed collocations (Abide by, Fond of, Prefer... to).
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-indigo-500/20 bg-card/40 space-y-2">
            <span className="text-xl">🔗</span>
            <h4 className="text-sm font-bold text-indigo-300">7. Conjunctions</h4>
            <p className="text-xs text-muted">
              Coordinating FANBOYS, Subordinating conjunctions, and Correlative pairs (No sooner...than, Scarcely...when).
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-4 border border-rose-500/20 bg-card/40 space-y-2">
            <span className="text-xl">💥</span>
            <h4 className="text-sm font-bold text-rose-300">8. Interjections</h4>
            <p className="text-xs text-muted">
              Emotional markers (Alas!, Hurrah!, Bravo!) & conversion to expressive reporting verbs in Indirect Speech.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
