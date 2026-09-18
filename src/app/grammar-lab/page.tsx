"use client";

import { useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { HaikeiWaves } from "@/components/ui/HaikeiBackdrop";
import type { GrammarAnalysisResult } from "@/app/api/grammar/route";

interface ExampleChip {
  label: string;
  sentence: string;
  lang: "english" | "hindi";
}

const EXAMPLES: ExampleChip[] = [
  {
    label: "English: Concord & Preposition Error",
    sentence: "She have been living in Mumbai since five years.",
    lang: "english",
  },
  {
    label: "English: Proximity Agreement Error",
    sentence: "Neither the teacher nor the students was present in the meeting.",
    lang: "english",
  },
  {
    label: "English: Complex Passive Voice",
    sentence: "The new guidelines were approved by the board yesterday.",
    lang: "english",
  },
  {
    label: "हिंदी: सर्वनाम व संयुक्त वाक्य",
    sentence: "मेरे को आज बहुत जरूरी काम है इसलिए मैं दिल्ली जा रहा हूँ।",
    lang: "hindi",
  },
  {
    label: "हिंदी: मिश्र वाक्य पहचान",
    sentence: "जो विद्यार्थी कठिन परिश्रम करते हैं वे परीक्षा में अवश्य सफल होते हैं।",
    lang: "hindi",
  },
  {
    label: "हिंदी: भाववाच्य एवं अकर्मक क्रिया",
    sentence: "घायल पक्षी से इतनी तेज धूप में उड़ा नहीं जाता।",
    lang: "hindi",
  },
];

export default function GrammarLabPage() {
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GrammarAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Header with Haikei Waves */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-card to-background p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <HaikeiWaves className="opacity-25" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <span>✨ AI Grammar Studio & Syntax Lab</span>
            <span className="rounded-full bg-indigo-500 px-1.5 py-0.2 text-[10px] text-white">Class 10</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Master <span className="text-shimmer bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">English & Hindi</span> Grammar
          </h1>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Real-time sentence checking, syntactic decomposition (Tenses, Concord, Voice, पदबंध, वाक्य भेद, समास), and board exam scoring tips.
          </p>
        </div>
      </div>

      {/* Language Switcher & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-card border border-white/10">
          <button
            type="button"
            onClick={() => setLanguage("english")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              language === "english"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            🇬🇧 English Grammar
          </button>
          <button
            type="button"
            onClick={() => setLanguage("hindi")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              language === "hindi"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            🇮🇳 हिंदी व्याकरण
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted">
          <Link
            href="/subjects/english-grammar"
            className="flex items-center gap-1 hover:text-indigo-400 transition"
          >
            <span>📖 English Syllabus</span>
          </Link>
          <span>•</span>
          <Link
            href="/subjects/hindi-grammar"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <span>🕉️ हिंदी पाठ्यक्रम</span>
          </Link>
        </div>
      </div>

      {/* Quick Example Chips */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          ⚡ Quick Test Presets (Click to analyze):
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(ex)}
              className="text-xs rounded-full border border-white/10 bg-card/60 hover:bg-card px-3 py-1.5 text-muted hover:text-foreground transition-all hover:border-indigo-500/50"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="rounded-2xl border border-white/10 bg-card/50 p-4 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="grammar-input" className="text-sm font-semibold text-foreground">
            Enter any {language === "english" ? "English" : "Hindi (हिंदी)"} sentence:
          </label>
          {inputText && (
            <button
              type="button"
              onClick={() => {
                setInputText("");
                setAnalysis(null);
              }}
              className="text-xs text-muted hover:text-foreground transition"
            >
              Clear input
            </button>
          )}
        </div>

        <textarea
          id="grammar-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === "english"
              ? "e.g. He have been waiting here since two hours..."
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Analyzing Grammar…
              </>
            ) : (
              <>
                <span>✨ Analyze & Check Grammar</span>
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
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 active:scale-95 disabled:opacity-40 transition"
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
  );
}
