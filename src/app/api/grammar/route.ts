import { NextRequest } from "next/server";
import { isAiConfigured, model } from "@/lib/ai/provider";
import { generateObject } from "ai";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const grammarResponseSchema = z.object({
  original: z.string(),
  corrected: z.string(),
  hasErrors: z.boolean(),
  errors: z.array(
    z.object({
      originalSegment: z.string(),
      replacement: z.string(),
      rule: z.string(),
      explanation: z.string(),
      errorType: z.string(),
    })
  ),
  syntacticBreakdown: z.object({
    tenseOrKriya: z.string().optional(),
    voiceOrVachya: z.string().optional(),
    sentenceType: z.string().optional(),
    subject: z.string().optional(),
    verb: z.string().optional(),
    object: z.string().optional(),
    keyElements: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
  boardExamTip: z.string(),
  practiceChallenge: z
    .object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.string(),
      explanation: z.string(),
    })
    .optional(),
});

export type GrammarAnalysisResult = z.infer<typeof grammarResponseSchema>;

/**
 * High-precision offline rule-based heuristic analyzer for Class 10 board grammar
 */
function heuristicAnalyze(text: string, language: "english" | "hindi"): GrammarAnalysisResult {
  const trimmed = text.trim();

  if (language === "hindi") {
    // Hindi Rule-based Analyzer
    let corrected = trimmed;
    const errors: GrammarAnalysisResult["errors"] = [];
    let sentenceType = "सरल वाक्य";
    let voiceOrVachya = "कर्तृवाच्य";

    // Detect sentence type
    if (/\b(और|तथा|एवं|किन्तु|परन्तु|लेकिन|इसलिए|अतः)\b/.test(trimmed)) {
      sentenceType = "संयुक्त वाक्य (समानाधिकरण योजक प्रयुक्त)";
    } else if (/\b(कि|जो|जब|जहाँ|जैसे ही|यदि|यद्यपि|क्योंकि)\b/.test(trimmed)) {
      sentenceType = "मिश्र वाक्य (व्यधिकरण योजक प्रयुक्त)";
    }

    // Detect vachya
    if (/\b(के द्वारा|द्वारा)\b/.test(trimmed)) {
      voiceOrVachya = "कर्मवाच्य (सकर्मक क्रिया के साथ 'के द्वारा' का प्रयोग)";
    } else if (/\bसे\b/.test(trimmed) && /\b(जाता|गया|सकता)\b/.test(trimmed) && !/\b(को|ने)\b/.test(trimmed)) {
      voiceOrVachya = "भाववाच्य (अकर्मक क्रिया एवं असमर्थता सूचक)";
    }

    // Common error: 'मेरे को' -> 'मुझे'
    if (trimmed.includes("मेरे को")) {
      corrected = corrected.replace(/मेरे को/g, "मुझे");
      errors.push({
        originalSegment: "मेरे को",
        replacement: "मुझे",
        rule: "सर्वनाम संबंधी अशुद्धि",
        explanation: "मानक हिंदी में 'मेरे को' अमानक है। इसके स्थान पर 'मुझे' सर्वनाम का प्रयोग होना चाहिए।",
        errorType: "सर्वनाम अशुद्धि",
      });
    }

    // Common error: 'तेरे को' -> 'तुम्हें / तुझे'
    if (trimmed.includes("तेरे को")) {
      corrected = corrected.replace(/तेरे को/g, "तुम्हें");
      errors.push({
        originalSegment: "तेरे को",
        replacement: "तुम्हें",
        rule: "सर्वनाम संबंधी अशुद्धि",
        explanation: "मानक हिंदी में 'तेरे को' के स्थान पर 'तुम्हें' या 'तुझे' का प्रयोग किया जाता है।",
        errorType: "सर्वनाम अशुद्धि",
      });
    }

    // Common error: 'अनेकों' -> 'अनेक'
    if (trimmed.includes("अनेकों")) {
      corrected = corrected.replace(/अनेकों/g, "अनेक");
      errors.push({
        originalSegment: "अनेकों",
        replacement: "अनेक",
        rule: "वचन संबंधी अशुद्धि",
        explanation: "'अनेक' शब्द स्वयं बहुवचन है। अतः 'अनेकों' लिखना अशुद्ध है।",
        errorType: "वचन दोष",
      });
    }

    // Common error: 'कृपया करके' -> 'कृपया'
    if (trimmed.includes("कृपया करके")) {
      corrected = corrected.replace(/कृपया करके/g, "कृपया");
      errors.push({
        originalSegment: "कृपया करके",
        replacement: "कृपया",
        rule: "पुनरुक्ति दोष",
        explanation: "'कृपया' के साथ 'करके' लगाना अनावश्यक पुनरुक्ति है।",
        errorType: "पुनरुक्ति अशुद्धि",
      });
    }

    const hasErrors = errors.length > 0;

    return {
      original: trimmed,
      corrected,
      hasErrors,
      errors,
      syntacticBreakdown: {
        sentenceType,
        voiceOrVachya,
        tenseOrKriya: /\b(था|थी|थे)\b/.test(trimmed) ? "भूतकाल" : /\b(होगा|होगी|गे)\b/.test(trimmed) ? "भविष्यत् काल" : "वर्तमान काल",
        keyElements: [
          { label: "वाक्य भेद", value: sentenceType },
          { label: "वाच्य रूप", value: voiceOrVachya },
          { label: "मुख्य क्रिया", value: trimmed.split(" ").slice(-2).join(" ") },
        ],
      },
      boardExamTip: "बोर्ड परीक्षा टिप: कक्षा 10 में 'रचना के आधार पर वाक्य रूपांतरण' और 'वाच्य' से 4-4 अंक के प्रश्न पूछे जाते हैं। योजक शब्दों की पहचान से वाक्य भेद 100% सही पहचाना जा सकता है।",
      practiceChallenge: {
        question: "निम्नलिखित में से संयुक्त वाक्य का सही उदाहरण कौन-सा है?",
        options: [
          "सूरज निकला और पक्षी चहचहाने लगे।",
          "सूरज निकलने पर पक्षी चहचहाने लगे।",
          "जैसे ही सूरज निकला, पक्षी चहचहाने लगे।",
          "सूरज निकलते ही पक्षी चहकते हैं।",
        ],
        answer: "A",
        explanation: "'और' समानाधिकरण योजक है जो दो स्वतंत्र उपवाक्यों को जोड़कर संयुक्त वाक्य बनाता है।",
      },
    };
  }

  // English Rule-based Analyzer
  let corrected = trimmed;
  const errors: GrammarAnalysisResult["errors"] = [];

  // Subject-Verb concord: "He have" -> "He has"
  if (/\b(he|she|it)\s+have\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(he|she|it)\s+have\b/gi, (m, p1) => `${p1} has`);
    errors.push({
      originalSegment: "have (with singular 3rd person)",
      replacement: "has",
      rule: "Subject-Verb Concord",
      explanation: "Third person singular pronouns (He/She/It) strictly take 'has', never 'have'.",
      errorType: "Subject-Verb Agreement",
    });
  }

  // Subject-Verb concord: "They has" -> "They have"
  if (/\b(they|we|you)\s+has\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(they|we|you)\s+has\b/gi, (m, p1) => `${p1} have`);
    errors.push({
      originalSegment: "has (with plural subject)",
      replacement: "have",
      rule: "Subject-Verb Concord",
      explanation: "Plural subjects (They/We/You) strictly take 'have', never 'has'.",
      errorType: "Subject-Verb Agreement",
    });
  }

  // "since" with duration of time (e.g. "since five years" -> "for five years")
  if (/\bsince\s+(\d+|two|three|four|five|six|seven|eight|nine|ten|many|several)\s+(years|days|months|hours|weeks)\b/i.test(corrected)) {
    corrected = corrected.replace(/\bsince\s+((\d+|two|three|four|five|six|seven|eight|nine|ten|many|several)\s+(years|days|months|hours|weeks))\b/gi, "for $1");
    errors.push({
      originalSegment: "since (with duration of time)",
      replacement: "for",
      rule: "Prepositions / Time Reference",
      explanation: "'Since' denotes a specific starting point in time (since 2018). 'For' must be used for a period or duration of time (for 5 years).",
      errorType: "Preposition of Time",
    });
  }

  // "do not knows" -> "does not know"
  if (/\b(he|she|it)\s+do\s+not\s+knows?\b/i.test(corrected)) {
    corrected = corrected.replace(/\b(he|she|it)\s+do\s+not\s+knows?\b/gi, (m, p1) => `${p1} does not know`);
    errors.push({
      originalSegment: "do not knows",
      replacement: "does not know",
      rule: "Auxiliary Verb & Base Form",
      explanation: "With 3rd person singular in negative present, use 'does not' followed by base verb V1 ('know'), not V5 ('knows').",
      errorType: "Tense & Verb Form",
    });
  }

  // "yesterday" with present perfect (e.g., "I have seen him yesterday" -> "I saw him yesterday")
  if (/\bhave\s+(\w+ed|seen|met|gone|come|written)\s+yesterday\b/i.test(corrected)) {
    errors.push({
      originalSegment: "have [V3] yesterday",
      replacement: "Simple Past (V2)",
      rule: "Tense Aspect",
      explanation: "Present Perfect tense cannot be combined with specific past time adverbs like 'yesterday'. Use Simple Past (V2).",
      errorType: "Tense Inconsistency",
    });
  }

  const hasErrors = errors.length > 0;
  const isPassive = /\b(is|am|are|was|were|been|being)\s+(\w+ed|written|done|made|eaten|spoken)\s+by\b/i.test(trimmed);

  return {
    original: trimmed,
    corrected,
    hasErrors,
    errors,
    syntacticBreakdown: {
      sentenceType: /\b(and|but|or|so|yet)\b/i.test(trimmed) ? "Compound Sentence" : /\b(because|although|since|while|which|that|who)\b/i.test(trimmed) ? "Complex Sentence" : "Simple Sentence",
      voiceOrVachya: isPassive ? "Passive Voice" : "Active Voice",
      tenseOrKriya: /\b(yesterday|ago|last|was|were|had)\b/i.test(trimmed) ? "Past Tense" : /\b(will|shall)\b/i.test(trimmed) ? "Future Tense" : "Present Tense",
      keyElements: [
        { label: "Voice", value: isPassive ? "Passive Voice (Object-focused)" : "Active Voice (Subject-focused)" },
        { label: "Clause Structure", value: /\b(because|although|if|when)\b/i.test(trimmed) ? "Main clause + Subordinate clause" : "Single independent clause" },
      ],
    },
    boardExamTip: "CBSE Board Exam Tip: In Section B (Grammar, 10 marks), error correction and gap-filling heavily penalize subject-verb mismatch and wrong auxiliary forms. Always locate the true grammatical subject first.",
    practiceChallenge: {
      question: "Choose the grammatically correct sentence:",
      options: [
        "Neither the captain nor the players were ready for the match.",
        "Neither the captain nor the players was ready for the match.",
        "Neither the captain nor the players is ready for the match.",
        "Neither the captain nor the players has ready for the match.",
      ],
      answer: "A",
      explanation: "Rule of Proximity: In 'Neither... nor', the verb agrees with the closer subject ('players' -> were).",
    },
  };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const { allowed } = checkRateLimit(ip + ":grammar", 30, 60000);
  if (!allowed) {
    return json({ error: "Rate limit reached. Please wait a moment before analyzing another sentence." }, 429);
  }

  const body = (await req.json().catch(() => ({}))) as {
    text?: string;
    language?: "english" | "hindi";
  };

  const text = (body.text || "").trim();
  const language = body.language === "hindi" ? "hindi" : "english";

  if (!text) {
    return json({ error: "Please provide a sentence to analyze." }, 400);
  }

  if (text.length > 1000) {
    return json({ error: "Sentence exceeds maximum length of 1000 characters." }, 400);
  }

  // If AI is not configured, return high-accuracy heuristic analysis
  if (!isAiConfigured()) {
    const analysis = heuristicAnalyze(text, language);
    return json({ ok: true, data: analysis, source: "rule-engine" });
  }

  try {
    const prompt = language === "hindi"
      ? `आप कक्षा 10 (CBSE/बिहार बोर्ड) के विशेषज्ञ हिंदी व्याकरण शिक्षक हैं। निम्नलिखित हिंदी वाक्य का गहन व्याकरणिक विश्लेषण एवं त्रुटि-शोधन (Grammar Check) करें:
वाक्य: "${text}"

आवश्यकताएँ:
1. मूल वाक्य में वर्तनी (spelling), पदक्रम, कारक, लिंग, वचन, सर्वनाम या क्रिया संबंधी अशुद्धियों को पहचानें।
2. शुद्ध वाक्य प्रदान करें।
3. वाक्य भेद पहचानें (सरल वाक्य, संयुक्त वाक्य, या मिश्र वाक्य)।
4. वाच्य पहचानें (कर्तृवाच्य, कर्मवाच्य, या भाववाच्य)।
5. मुख्य पदबंध या समास की पहचान करें।
6. बोर्ड परीक्षा की अंक योजना (Marking scheme) के अनुसार एक उपयोगी सुझाव दें।
7. इस नियम पर आधारित एक 4-विकल्पी अभ्यास प्रश्न (MCQ) तैयार करें।`
      : `You are an expert English Grammar instructor for Class 10 (CBSE and State Board) exams. Perform a comprehensive grammatical error detection and syntactic breakdown of this sentence:
Sentence: "${text}"

Requirements:
1. Identify any grammatical errors (Subject-Verb Concord, Tenses, Modals, Determiners, Prepositions, Voice, or Punctuation).
2. Provide the corrected sentence. If already flawless, note that it has no errors.
3. Identify the Tense, Voice (Active/Passive), and Sentence Type (Simple, Compound, Complex).
4. Provide a high-yield Class 10 Board exam tip relevant to this grammatical construction.
5. Generate an interactive 4-option practice MCQ testing the same grammatical rule.`;

    const res = await generateObject({
      model: model("fast"),
      schema: grammarResponseSchema,
      prompt,
    });

    return json({ ok: true, data: res.object, source: "ai" });
  } catch (err: unknown) {
    console.error("AI grammar analysis failed, falling back to heuristic engine:", err);
    const analysis = heuristicAnalyze(text, language);
    return json({ ok: true, data: analysis, source: "rule-engine-fallback" });
  }
}
