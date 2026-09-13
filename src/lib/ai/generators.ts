// Structured content generation: notes, flashcards, MCQs, mind maps and quiz
// questions. Uses `generateText` with typed `Output` schemas so the app receives
// validated objects (never raw text to parse).

import { generateText, Output } from "ai";
import { z } from "zod";
import { model, type ModelRole } from "./provider";
import type {
  Flashcard,
  GeneratedQuizQuestion,
  GeneratorKind,
  MCQ,
  MindmapDoc,
  NoteDoc,
} from "../types";
import { getTopic } from "../syllabus";

export interface GenInput {
  subjectId: string;
  chapterId: string;
  topicId: string;
  count?: number;
  difficulty?: string;
  instruction?: string; // extra user instruction appended to the prompt
}

export type GenResult<T> = { ok: true; data: T } | { ok: false; error: string };

function topicRef(input: Pick<GenInput, "subjectId" | "chapterId" | "topicId">): string {
  const found = getTopic(input.subjectId, input.chapterId, input.topicId);
  if (!found) return input.topicId;
  const chapter = found.chapter.branch
    ? `${found.chapter.name} (${found.chapter.branch})`
    : found.chapter.name;
  return `${found.topic.name} — ${chapter} · ${found.subject.name}`;
}

const difficultyList = ["Easy", "Medium", "Hard", "Board Level", "Application Level", "Challenge"] as const;

/* -------------------------------------------------------------------------- */
/*  Schemas                                                                    */
/* -------------------------------------------------------------------------- */

const noteSchema = z.object({
  topic: z.string(),
  subject: z.string(),
  chapter: z.string(),
  definition: z.string().optional(),
  keyPoints: z.array(z.string()).min(3).describe("4-6 crisp key points a Class 10 student must know"),
  formulas: z.array(z.string()).optional().describe("as text; only where formulas apply"),
  differences: z.array(z.object({ label: z.string(), a: z.string(), b: z.string() })).optional(),
  examples: z.array(z.string()).min(1).describe("1-2 worked, simple examples"),
  commonMistakes: z.array(z.string()).min(1),
  examKeywords: z.array(z.string()).min(2).describe("words/terms examiners reward"),
  quickRevision: z.array(z.string()).min(3).describe("rapid-fire one-liners for last-minute revision"),
});

const flashcardSchema = z.object({
  front: z.string().describe("a short question"),
  back: z.string().describe("a concise answer, 1-3 sentences"),
});

const mcqSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  whyWrong: z.array(z.string()).length(3).describe("why each wrong option is wrong"),
  explanation: z.string(),
  difficulty: z.enum(difficultyList),
});

const mindmapNodeSchema = z.object({
  label: z.string(),
  detail: z.string().optional(),
  children: z.array(z.object({ label: z.string(), detail: z.string().optional() })).optional(),
});

const mindmapSchema = z.object({
  root: z.string(),
  nodes: z.array(mindmapNodeSchema).min(2),
});

// Raw quiz item from the model (without id/topicId)
const quizItemSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("mcq"),
    prompt: z.string(),
    options: z.array(z.string()).length(4),
    answer: z.string().describe("the correct option text, not the index"),
    explanation: z.string(),
    difficulty: z.enum(difficultyList),
  }),
  z.object({
    type: z.literal("numerical"),
    prompt: z.string(),
    answer: z.string().describe("final answer with unit"),
    explanation: z.string().describe("working/excerpt of solution"),
    difficulty: z.enum(difficultyList),
  }),
  z.object({
    type: z.literal("short"),
    prompt: z.string(),
    answer: z.string().describe("model answer, 2-4 sentences with keywords"),
    explanation: z.string(),
    difficulty: z.enum(difficultyList),
  }),
]);

/* -------------------------------------------------------------------------- */
/*  Low-level helpers                                                          */
/* -------------------------------------------------------------------------- */

async function runObject<T>(schema: z.ZodType<T>, role: ModelRole, prompt: string): Promise<GenResult<T>> {
  try {
    const result = await generateText({
      model: model(role),
      output: Output.object({ schema: schema as z.ZodType }),
      prompt,
    });
    return { ok: true, data: result.output as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Generation failed" };
  }
}

async function runArray<T>(schema: z.ZodType<T>, role: ModelRole, prompt: string): Promise<GenResult<T[]>> {
  try {
    const result = await generateText({
      model: model(role),
      output: Output.array({ element: schema as z.ZodType }),
      prompt,
    });
    return { ok: true, data: result.output as T[] };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Generation failed" };
  }
}

const CLASS10_LINE = "All content must be accurate for the Class 10 syllabus. Define any term you use. No university-level detail.";

/* -------------------------------------------------------------------------- */
/*  Generators                                                                 */
/* -------------------------------------------------------------------------- */

export type NotesGen = GenResult<NoteDoc>;
export async function generateNotes(input: GenInput): Promise<NotesGen> {
  const ref = topicRef(input);
  const found = getTopic(input.subjectId, input.chapterId, input.topicId);
  const result = await runObject(
    noteSchema,
    "teacher",
    `Write Class 10 revision notes on "${ref}". ${CLASS10_LINE}
${input.instruction ? `Extra instruction: ${input.instruction}` : ""}
Return fields per the schema. Keep every list concise and exam-oriented.`
  );
  if (!result.ok) return result;
  // Ensure subject/chapter are present (schema requires them)
  return {
    ok: true,
    data: {
      ...result.data,
      subject: found?.subject.name ?? input.subjectId,
      chapter: found?.chapter.name ?? input.chapterId,
    },
  };
}

export async function generateFlashcards(input: GenInput): Promise<GenResult<Flashcard[]>> {
  const ref = topicRef(input);
  const count = Math.min(Math.max(input.count ?? 8, 4), 20);
  return runArray(
    flashcardSchema,
    "teacher",
    `Create ${count} active-recall flashcards on "${ref}". ${CLASS10_LINE}
FRONT is a short question ("What is…?", "Why does…?", "Differentiate…"). BACK is a concise answer (1-3 sentences). No entire paragraphs.`
  );
}

export async function generateMCQs(input: GenInput): Promise<GenResult<MCQ[]>> {
  const ref = topicRef(input);
  const count = Math.min(Math.max(input.count ?? 5, 1), 10);
  const diff = input.difficulty ?? "Medium";
  return runArray(
    mcqSchema,
    "teacher",
    `Create ${count} good MCQs for Class 10 on "${ref}". Difficulties: mix around "${diff}". ${CLASS10_LINE}
Each MCQ: one unambiguous correct answer, 4 plausible options with exactly one correct, an explanation AND a short reason why each wrong option is wrong. Avoid trick questions.`
  );
}

export async function generateMindmap(input: GenInput): Promise<GenResult<MindmapDoc>> {
  const ref = topicRef(input);
  return runObject(
    mindmapSchema,
    "teacher",
    `Build a hierarchical mind map for a Class 10 student on "${ref}". ${CLASS10_LINE}
root = the topic. nodes = main branches (2-4), each with short children (2-4). Keep labels short (≤ 6 words).`
  );
}

// Raw quiz item type (matches quizItemSchema)
type RawQuizItem = z.infer<typeof quizItemSchema>;

export async function generateQuiz(input: GenInput): Promise<GenResult<RawQuizItem[]>> {
  const ref = topicRef(input);
  const count = Math.min(Math.max(input.count ?? 5, 3), 12);
  const diff = input.difficulty ?? "Medium";
  return runArray(
    quizItemSchema,
    "teacher",
    `Create a ${count}-question Class 10 quiz on "${ref}". Mix short-answer, numerical and MCQ questions (about half MCQ). Aim difficulty around "${diff}" with a couple harder questions. ${CLASS10_LINE}
For MCQ, the answer field must be the exact text of the correct option. Provide model answers and explanations.`
  );
}

/* -------------------------------------------------------------------------- */
/*  Dispatcher                                                                 */
/* -------------------------------------------------------------------------- */

export async function generate(kind: GeneratorKind, input: GenInput): Promise<GenResult<unknown>> {
  switch (kind) {
    case "notes": return generateNotes(input);
    case "flashcards": return generateFlashcards(input);
    case "mcq": return generateMCQs(input);
    case "mindmap": return generateMindmap(input);
    case "quiz": {
      const result = await generateQuiz(input);
      if (!result.ok) return result;
      const data: GeneratedQuizQuestion[] = result.data.map((q, i) => ({
        ...q,
        id: `${q.type}-${i}`,
        topicId: input.topicId,
      }));
      return { ok: true, data };
    }
    default: {
      const _exhaustive: never = kind;
      return { ok: false, error: `Unknown generator kind: ${_exhaustive}` };
    }
  }
}