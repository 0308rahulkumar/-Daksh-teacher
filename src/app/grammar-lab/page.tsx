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
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.28" />
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
  ruleTip: string;
  subType: string;
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
        subType: "Emotional Particle",
        color: "border-rose-500/40 bg-rose-500/10 text-rose-300",
        badgeColor: "bg-rose-500 text-white",
        role: "Expresses sudden emotional outburst (joy, sorrow, surprise)",
        ruleTip: "Always followed by exclamation mark (!). Converts to 'exclaimed with joy/sorrow' in Indirect Speech.",
      };
    }
    if (determiners.has(w)) {
      return {
        word: raw,
        pos: "Determiner",
        subType: w === "the" ? "Definite Article" : w === "a" || w === "an" ? "Indefinite Article" : "Quantifier",
        color: "border-teal-500/40 bg-teal-500/10 text-teal-300",
        badgeColor: "bg-teal-500 text-white",
        role: "Introduces and specifies the grammatical scope of a noun",
        ruleTip: "Articles: 'A' before consonant sound, 'An' before vowel sound (e.g. 'an honest boy').",
      };
    }
    if (pronouns.has(w)) {
      return {
        word: raw,
        pos: "Pronoun",
        subType: w === "who" || w === "whom" ? "Relative Pronoun" : w.endsWith("self") ? "Reflexive/Emphatic" : "Personal Pronoun",
        color: "border-purple-500/40 bg-purple-500/10 text-purple-300",
        badgeColor: "bg-purple-500 text-white",
        role: "Substitutes a noun to prevent repetitive phrasing",
        ruleTip: "Polite sequence is 2-3-1 (You, he and I). Prepositions always govern objective case (Between you and me).",
      };
    }
    if (prepositions.has(w)) {
      return {
        word: raw,
        pos: "Preposition",
        subType: "Relational Connector",
        color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
        badgeColor: "bg-cyan-500 text-white",
        role: "Shows spatial, temporal, or logical relationship to a following noun",
        ruleTip: "Latin comparatives (senior, junior, superior) take 'to', never 'than'.",
      };
    }
    if (conjunctions.has(w)) {
      return {
        word: raw,
        pos: "Conjunction",
        subType: ["and", "but", "or", "nor", "for", "yet", "so"].includes(w) ? "Coordinating (FANBOYS)" : "Subordinating Connector",
        color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
        badgeColor: "bg-indigo-500 text-white",
        role: "Connects clauses, phrases, or grammatically parallel words",
        ruleTip: "Correlative pairs must be parallel: 'Not only...but also', 'No sooner...than', 'Hardly...when'.",
      };
    }
    if (commonVerbs.has(w) || w.endsWith("ed") || (w.endsWith("ing") && !w.startsWith("dur") && !w.startsWith("din"))) {
      return {
        word: raw,
        pos: "Verb",
        subType: ["is", "am", "are", "was", "were"].includes(w) ? "Linking / Auxiliary" : "Action Verb",
        color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
        badgeColor: "bg-emerald-500 text-white",
        role: "Expresses action, state of being, or condition of the subject",
        ruleTip: "Transitive verbs require a direct object (can be made Passive); Intransitive verbs do not.",
      };
    }
    if (w.endsWith("ly") || w === "very" || w === "quite" || w === "too" || w === "seldom" || w === "hardly") {
      return {
        word: raw,
        pos: "Adverb",
        subType: w.endsWith("ly") ? "Adverb of Manner" : "Adverb of Degree/Frequency",
        color: "border-pink-500/40 bg-pink-500/10 text-pink-300",
        badgeColor: "bg-pink-500 text-white",
        role: "Modifies a verb, adjective, or another adverb",
        ruleTip: "Follows MPT rule (Manner + Place + Time). Negative adverbs trigger inversion (Seldom did he speak).",
      };
    }
    if (commonAdjectives.has(w) || w.endsWith("ful") || w.endsWith("ous") || w.endsWith("ive") || w.endsWith("able") || w.endsWith("en")) {
      return {
        word: raw,
        pos: "Adjective",
        subType: "Descriptive / Qualitative",
        color: "border-amber-500/40 bg-amber-500/10 text-amber-300",
        badgeColor: "bg-amber-500 text-slate-950 font-bold",
        role: "Qualifies, describes, or limits a noun or pronoun",
        ruleTip: "Order of Adjectives before noun: OSASCOMP (Opinion, Size, Age, Shape, Color, Origin, Material, Purpose).",
      };
    }
    return {
      word: raw,
      pos: "Noun",
      subType: raw[0] === raw[0].toUpperCase() ? "Proper Noun" : "Common Noun",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-300",
      badgeColor: "bg-blue-500 text-white",
      role: "Names a person, animal, place, thing, or abstract quality",
      ruleTip: "Uncountable nouns (information, furniture, scenery) never take plural 's' or 'a/an'.",
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

/* SPEED CHALLENGE ARENA DATA */
interface ArenaQuestion {
  id: number;
  sentence: string;
  targetWord: string;
  options: string[];
  answer: string;
  explanation: string;
  concept: string;
}

const ARENA_QUESTIONS: ArenaQuestion[] = [
  {
    id: 1,
    sentence: "He worked hard all night to top the CBSE board examinations.",
    targetWord: "hard",
    options: ["Adverb", "Adjective", "Noun", "Verb"],
    answer: "Adverb",
    explanation: "'Hard' here modifies the verb 'worked', answering 'how' he worked (manner). It is not an adjective here!",
    concept: "Adverb vs Adjective",
  },
  {
    id: 2,
    sentence: "This is a fast express train running between Patna and Delhi.",
    targetWord: "fast",
    options: ["Adjective", "Adverb", "Noun", "Conjunction"],
    answer: "Adjective",
    explanation: "'Fast' immediately precedes and qualifies the noun 'train'. When modifying a noun, it functions as an adjective.",
    concept: "Adjective Attributive Role",
  },
  {
    id: 3,
    sentence: "Swimming in the morning keeps your body active and energetic.",
    targetWord: "Swimming",
    options: ["Gerund (Verbal Noun)", "Present Participle", "Finite Verb", "Adverb"],
    answer: "Gerund (Verbal Noun)",
    explanation: "'Swimming' serves as the grammatical subject of the verb 'keeps'. An -ing verb acting as a noun is a Gerund.",
    concept: "Non-Finite Verbs",
  },
  {
    id: 4,
    sentence: "She is senior to all other officers in the administrative department.",
    targetWord: "senior",
    options: ["Adjective", "Noun", "Adverb", "Preposition"],
    answer: "Adjective",
    explanation: "'Senior' is a Latin comparative adjective. It always takes the preposition 'to', never 'than'.",
    concept: "Latin Comparatives",
  },
  {
    id: 5,
    sentence: "Alas! The noble king was mortally wounded on the battlefield.",
    targetWord: "Alas!",
    options: ["Interjection", "Conjunction", "Adverb", "Noun"],
    answer: "Interjection",
    explanation: "'Alas!' is an exclamatory word expressing sudden grief or sorrow. In reported speech, it converts to 'exclaimed with sorrow'.",
    concept: "Emotional Interjections",
  },
  {
    id: 6,
    sentence: "You will not clear the competitive test unless you revise regularly.",
    targetWord: "unless",
    options: ["Subordinating Conjunction", "Preposition", "Adverb", "Relative Pronoun"],
    answer: "Subordinating Conjunction",
    explanation: "'Unless' introduces an adverbial clause of condition ('unless you revise'). It already means 'if not'.",
    concept: "Conjunctions of Condition",
  },
  {
    id: 7,
    sentence: "The committee has submitted its unanimous decision to the board.",
    targetWord: "committee",
    options: ["Collective Noun", "Abstract Noun", "Proper Noun", "Material Noun"],
    answer: "Collective Noun",
    explanation: "'Committee' is a collective noun acting as a single cohesive unit, which is why it takes the singular verb 'has'.",
    concept: "Collective Noun Concord",
  },
  {
    id: 8,
    sentence: "Between you and me, the new syllabus format is much better.",
    targetWord: "me",
    options: ["Objective Pronoun", "Subjective Pronoun", "Possessive Pronoun", "Reflexive Pronoun"],
    answer: "Objective Pronoun",
    explanation: "'Between' is a preposition. Prepositions strictly govern the objective case ('me', not 'I').",
    concept: "Pronoun Case Rules",
  },
  {
    id: 9,
    sentence: "Hardly had the bell rung when the enthusiastic students rushed out.",
    targetWord: "Hardly",
    options: ["Negative Adverb", "Coordinating Conjunction", "Adjective", "Pronoun"],
    answer: "Negative Adverb",
    explanation: "'Hardly' is a restrictive adverb. When placed at the start, it triggers auxiliary inversion ('had the bell rung') and pairs with 'when'.",
    concept: "Negative Inversion",
  },
  {
    id: 10,
    sentence: "The tired traveler rested under the shade of an ancient oak tree.",
    targetWord: "under",
    options: ["Preposition", "Adverb", "Conjunction", "Determiner"],
    answer: "Preposition",
    explanation: "'Under' indicates the spatial position of the traveler relative to the noun phrase 'the shade'.",
    concept: "Prepositions of Place",
  },
];

export default function GrammarLabPage() {
  const [activeTab, setActiveTab] = useState<"analyzer" | "arena" | "library">("analyzer");
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GrammarAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedTokenModal, setSelectedTokenModal] = useState<PosTag | null>(null);

  // Practice Quiz State (in Analyzer)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Speed Challenge Arena State
  const [currentArenaIdx, setCurrentArenaIdx] = useState(0);
  const [arenaSelectedOpt, setArenaSelectedOpt] = useState<string | null>(null);
  const [arenaAnswered, setArenaAnswered] = useState(false);
  const [arenaScore, setArenaScore] = useState(0);
  const [arenaStreak, setArenaStreak] = useState(0);
  const [arenaFinished, setArenaFinished] = useState(false);

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

  function handleSpeak(textToSpeak: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === "hindi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  // Speed Arena Handlers
  function handleArenaSelect(opt: string) {
    if (arenaAnswered) return;
    setArenaSelectedOpt(opt);
    setArenaAnswered(true);

    const q = ARENA_QUESTIONS[currentArenaIdx];
    if (opt === q.answer) {
      setArenaScore((s) => s + 10);
      setArenaStreak((st) => st + 1);
    } else {
      setArenaStreak(0);
    }
  }

  function handleNextArenaQuestion() {
    if (currentArenaIdx + 1 < ARENA_QUESTIONS.length) {
      setCurrentArenaIdx((idx) => idx + 1);
      setArenaSelectedOpt(null);
      setArenaAnswered(false);
    } else {
      setArenaFinished(true);
    }
  }

  function handleRestartArena() {
    setCurrentArenaIdx(0);
    setArenaSelectedOpt(null);
    setArenaAnswered(false);
    setArenaScore(0);
    setArenaStreak(0);
    setArenaFinished(false);
  }

  const posTaggedTokens = language === "english" && inputText.trim() ? tagPartsOfSpeech(inputText) : [];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header with Haikei Waves */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/50 via-[#0d0c1d] to-background p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <HaikeiWaves className="opacity-30" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
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

      {/* Main Studio Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="inline-flex rounded-2xl border border-white/10 bg-surface/70 p-1.5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab("analyzer")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "analyzer"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>🔬</span>
            <span>Grammar & POS Analyzer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("arena")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "arena"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>⚡</span>
            <span>POS Speed Challenge Arena</span>
            <span className="text-[10px] px-1 rounded bg-white/20">GAME</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "library"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span>📚</span>
            <span>8 Parts of Speech Library</span>
          </button>
        </div>

        {activeTab === "analyzer" && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Language:</span>
            <div className="inline-flex rounded-xl border border-white/10 bg-background/60 p-1">
              <button
                type="button"
                onClick={() => setLanguage("english")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  language === "english"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hindi")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  language === "hindi"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                🇮🇳 हिंदी
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= TAB 1: LIVE ANALYZER & POS TAGGER ================= */}
      {activeTab === "analyzer" && (
        <div className="space-y-6">
          {/* Preset Chips */}
          <div className="space-y-2">
            <span className="text-xs text-muted font-medium">Quick Board Presets (Click to inspect):</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_EXAMPLES.filter((ex) => ex.lang === language).map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(ex)}
                  className="rounded-full border border-white/10 bg-card/60 hover:bg-indigo-500/10 hover:border-indigo-500/30 px-3 py-1 text-xs text-foreground/80 hover:text-indigo-300 transition flex items-center gap-1.5 cursor-pointer"
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
              <div className="flex items-center gap-2">
                {inputText.trim() && (
                  <button
                    type="button"
                    onClick={() => handleSpeak(inputText)}
                    title="Listen to pronunciation"
                    className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-muted hover:text-foreground transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>🔊</span>
                    <span>Listen</span>
                  </button>
                )}
                <span className="text-[11px] text-muted font-mono">Real-time Syntactic & POS Engine</span>
              </div>
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
                    Click any word token to open its detailed Class 10 Board grammatical profile.
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
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTokenModal(token)}
                    className={`group relative px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 active:scale-95 flex flex-col items-center gap-1 ${token.color}`}
                  >
                    <span className="text-sm font-semibold tracking-wide">{token.word}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded-full ${token.badgeColor}`}>
                      {token.pos}
                    </span>
                  </button>
                ))}
              </div>

              {/* Word Inspector Card (Modal / Banner) */}
              {selectedTokenModal && (
                <div className="p-4 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-card to-background shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold font-serif text-indigo-300">
                        &quot;{selectedTokenModal.word}&quot;
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedTokenModal.badgeColor}`}>
                        {selectedTokenModal.pos} ({selectedTokenModal.subType})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTokenModal(null)}
                      className="text-xs px-2 py-1 rounded-md border border-white/10 text-muted hover:text-white transition cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-background/50 border border-white/10 space-y-1">
                      <span className="font-bold text-muted uppercase text-[10px] tracking-wider block">Syntactic Role</span>
                      <p className="text-foreground">{selectedTokenModal.role}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                      <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Board Exam Rule / Pitfall</span>
                      <p className="text-amber-200/90">{selectedTokenModal.ruleTip}</p>
                    </div>
                  </div>
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
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-center gap-2.5 ${btnStyle} cursor-pointer`}
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
        </div>
      )}

      {/* ================= TAB 2: SPEED CHALLENGE ARENA ================= */}
      {activeTab === "arena" && (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
          {/* Header Strip with Score & Streak */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-background">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 font-mono tracking-wider">Parts of Speech Speed Arena</span>
                <p className="text-sm font-extrabold text-foreground">
                  Question {currentArenaIdx + 1} of {ARENA_QUESTIONS.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-muted uppercase font-bold block">Score</span>
                <span className="text-lg font-black text-amber-400 font-mono">{arenaScore} pts</span>
              </div>
              {arenaStreak > 1 && (
                <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold font-mono animate-bounce">
                  🔥 {arenaStreak}x Streak!
                </span>
              )}
            </div>
          </div>

          {!arenaFinished ? (
            <SpotlightCard className="p-6 sm:p-8 border border-white/10 bg-card/60 space-y-6">
              {/* Question Concept Tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  Concept: {ARENA_QUESTIONS[currentArenaIdx].concept}
                </span>
                <span className="text-xs text-muted">CBSE 1-Mark Model</span>
              </div>

              {/* Highlighted Sentence */}
              <div className="p-5 rounded-2xl border border-white/10 bg-background/60 text-center space-y-2">
                <span className="text-xs text-muted uppercase tracking-wider block">Identify the Part of Speech of the highlighted word:</span>
                <p className="text-lg sm:text-xl font-serif text-foreground leading-relaxed">
                  {ARENA_QUESTIONS[currentArenaIdx].sentence.split(
                    new RegExp(`(\\b${ARENA_QUESTIONS[currentArenaIdx].targetWord}\\b|\\b${ARENA_QUESTIONS[currentArenaIdx].targetWord}!)`, "i")
                  ).map((part, pIdx) => {
                    const isTarget = part.toLowerCase().includes(ARENA_QUESTIONS[currentArenaIdx].targetWord.toLowerCase().replace("!", ""));
                    return isTarget ? (
                      <span
                        key={pIdx}
                        className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-black shadow-md mx-1 animate-pulse"
                      >
                        {part}
                      </span>
                    ) : (
                      <span key={pIdx}>{part}</span>
                    );
                  })}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARENA_QUESTIONS[currentArenaIdx].options.map((opt, oIdx) => {
                  const isSelected = arenaSelectedOpt === opt;
                  const isCorrect = opt === ARENA_QUESTIONS[currentArenaIdx].answer;

                  let btnStyle = "border-white/10 bg-background/50 text-foreground hover:bg-card hover:border-white/20";
                  if (arenaAnswered) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold scale-[1.02]";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
                    } else {
                      btnStyle = "opacity-40 border-white/5 bg-background/20";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={arenaAnswered}
                      onClick={() => handleArenaSelect(opt)}
                      className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${btnStyle} cursor-pointer`}
                    >
                      <span>{opt}</span>
                      {arenaAnswered && isCorrect && <span className="text-emerald-400">✓ Correct</span>}
                      {arenaAnswered && isSelected && !isCorrect && <span className="text-rose-400">✕</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {arenaAnswered && (
                <div className="space-y-4 pt-2 border-t border-white/10 animate-in fade-in">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-foreground space-y-1">
                    <p className="font-bold text-amber-300">Board Exam Rationale:</p>
                    <p className="text-muted leading-relaxed">{ARENA_QUESTIONS[currentArenaIdx].explanation}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextArenaQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      {currentArenaIdx + 1 < ARENA_QUESTIONS.length ? "Next Challenge ➔" : "View Final Results 🏆"}
                    </button>
                  </div>
                </div>
              )}
            </SpotlightCard>
          ) : (
            /* Arena Finish Scorecard */
            <SpotlightCard className="p-8 border border-amber-500/30 bg-card/60 text-center space-y-5">
              <span className="text-5xl block animate-bounce">🎓</span>
              <h3 className="text-2xl font-bold font-serif text-foreground">Speed Challenge Completed!</h3>
              <p className="text-sm text-muted">You tackled 10 high-frequency Class 10 Board exam grammar traps.</p>

              <div className="inline-block p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10">
                <span className="text-xs uppercase font-mono tracking-wider text-muted block">Final Score</span>
                <span className="text-4xl font-black text-amber-400 font-mono">{arenaScore} / 100</span>
                <span className="block text-xs text-emerald-400 mt-1 font-semibold">
                  Accuracy: {Math.round((arenaScore / 100) * 100)}%
                </span>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestartArena}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  🔄 Play Again
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("analyzer")}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-foreground text-xs font-bold transition cursor-pointer"
                >
                  🔬 Return to Analyzer
                </button>
              </div>
            </SpotlightCard>
          )}
        </div>
      )}

      {/* ================= TAB 3: 8 PARTS OF SPEECH LIBRARY ================= */}
      {activeTab === "library" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground font-serif">Complete 8 Parts of Speech Board Master Reference</h3>
              <p className="text-xs text-muted">In-depth definitions, rules, formulas, and common board traps for Class 10.</p>
            </div>
            <Link
              href="/subjects/english-grammar"
              className="text-xs px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-sm"
            >
              Open Full Subject with 16 Chapters ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SpotlightCard className="p-5 border border-blue-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <h4 className="text-base font-bold text-blue-300">1. Nouns</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Proper (specific), Common (generic), Collective (unit), Abstract (qualities), and Material (substances).
              </p>
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200">
                <strong>Board Trap:</strong> Uncountables (*furniture, information, scenery*) never take plural &apos;s&apos; or &apos;a/an&apos;.
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-purple-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <h4 className="text-base font-bold text-purple-300">2. Pronouns</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Personal (I/me), Demonstrative (this/that), Relative (who/whom/whose/which/that), and Reflexive (-self).
              </p>
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                <strong>Board Trap:</strong> Sequence is 2-3-1 (*You, he and I*). Relative pronoun *That* is mandatory after superlatives and &apos;all&apos;.
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-emerald-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <h4 className="text-base font-bold text-emerald-300">3. Verbs & Non-Finites</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Transitive (takes direct object) vs Intransitive; Infinitives (to + V1), Gerunds (-ing as noun), and Participles (verbal adjectives).
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200">
                <strong>Board Trap:</strong> Beware of Dangling Participles (*Being a rainy day* ❌ → *It being a rainy day* ✔).
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-amber-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <h4 className="text-base font-bold text-amber-300">4. Adjectives</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Qualitative, Quantitative, Numeral, Demonstrative, and Degrees of Comparison (Positive, Comparative, Superlative).
              </p>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                <strong>Board Trap:</strong> Royal Order OSASCOMP (Opinion, Size, Age, Shape, Color, Origin, Material, Purpose).
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-pink-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <h4 className="text-base font-bold text-pink-300">5. Adverbs</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Adverbs of Manner, Place, Time, Frequency, Degree, and Reason. Modifies verbs, adjectives, and other adverbs.
              </p>
              <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-[11px] text-pink-200">
                <strong>Board Trap:</strong> Placement follows MPT order. Negative adverbs (*Seldom, Scarcely, Hardly*) require inversion.
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-cyan-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <h4 className="text-base font-bold text-cyan-300">6. Prepositions</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Prepositions of Time, Place, Direction, and Multi-word Complex Prepositions (*in spite of, according to*).
              </p>
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200">
                <strong>Board Trap:</strong> Fixed collocations (*abide by, accused of, senior to, fond of, prefer tea to coffee*).
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-indigo-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                <h4 className="text-base font-bold text-indigo-300">7. Conjunctions</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Coordinating (FANBOYS), Subordinating (*because, although, unless, while*), and Correlative Pairs.
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">
                <strong>Board Trap:</strong> *No sooner* ALWAYS pairs with *than* (never *when*). Maintain strictly parallel structure.
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5 border border-rose-500/30 bg-card/40 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💥</span>
                <h4 className="text-base font-bold text-rose-300">8. Interjections</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Words expressing spontaneous emotions: Joy (*Hurrah!*), Grief (*Alas!*), Wonder (*Wow!*), Approval (*Bravo!*).
              </p>
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-200">
                <strong>Board Trap:</strong> Always followed by (!). In indirect speech, replace with expressive reporting phrases.
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}
    </div>
  );
}
