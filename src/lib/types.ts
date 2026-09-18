// Shared domain types for the Class 10 AI teaching agent.

export type SubjectId =
  | "science"
  | "maths"
  | "social-science"
  | "english"
  | "bseb-english"
  | "english-grammar"
  | "hindi-grammar";

export interface Topic {
  id: string;
  name: string;
  focus?: string; // one-line description of the core idea
}

export interface Chapter {
  id: string;
  name: string;
  branch?: string; // e.g. "History", "First Flight" — groups chapters within a subject
  topics: Topic[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  tagline: string;
  accent: string; // hex accent used to theme the subject
  chapters: Chapter[];
}

/* ---------------------------------- Learning ---------------------------------- */

export type MasteryLevel =
  | "NOT_STARTED"
  | "LEARNING"
  | "PRACTICING"
  | "REVIEW_NEEDED"
  | "MASTERED";

export interface TopicProgress {
  mastery: MasteryLevel;
  attempts: number; // questions answered on this topic
  correct: number;
  lastResult?: "correct" | "wrong";
  lastPracticed?: string; // ISO date
  intervalDays: number; // spaced-repetition gap in days
  nextReview?: string; // ISO date when the topic is next due for review
  history: { date: string; correct: boolean }[];
}

/** progress keyed by subjectId -> chapterId -> topicId */
export type ProgressMap = Record<string, Record<string, Record<string, TopicProgress>>>;

/* ---------------------------------- Student ---------------------------------- */

export interface StudentProfile {
  name: string;
  klass: string;
  board: string;
  medium: string;
  subjects: SubjectId[];
  dailyMinutes: number;
  examDate?: string;
  createdAt: string;
}

/* ---------------------------------- Mistakes & history ---------------------------------- */

export interface QuizAnswerRecord {
  topicId?: string;
  type: string;
  prompt: string;
  studentAnswer: string;
  correct: boolean;
  correctAnswer: string;
  explanation?: string;
}

export interface Mistake {
  id: string;
  date: string; // ISO
  subjectId: string;
  chapterId: string;
  topic?: string;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
  category?: string;
}

export interface QuizResult {
  id: string;
  date: string; // ISO
  subjectId: string;
  chapterId: string;
  topicId?: string;
  total: number;
  correct: number;
  answers: QuizAnswerRecord[];
}

export interface StudySession {
  date: string; // YYYY-MM-DD
  minutes: number;
  label?: string;
}

export interface AppState {
  profile: StudentProfile;
  progress: ProgressMap;
  mistakes: Mistake[];
  quizHistory: QuizResult[];
  studySessions: StudySession[];
  updatedAt: string; // ISO
}

/* ---------------------------------- Generated content ---------------------------------- */

export interface NoteDoc {
  topic: string;
  subject: string;
  chapter: string;
  definition?: string;
  keyPoints: string[];
  formulas?: string[];
  differences?: { label: string; a: string; b: string }[];
  examples: string[];
  commonMistakes: string[];
  examKeywords: string[];
  quickRevision: string[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface MindmapNode {
  label: string;
  detail?: string;
  children?: MindmapNode[];
}

export interface MindmapDoc {
  root: string;
  nodes: MindmapNode[];
}

export interface MCQ {
  question: string;
  options: string[]; // exactly 4
  correctIndex: number; // 0..3
  explanation: string;
  whyWrong?: string[]; // why each distractor is wrong
  difficulty: string;
}

export interface GeneratedQuizQuestion {
  id: string;
  topicId?: string;
  prompt: string;
  type: "mcq" | "numerical" | "short";
  options?: string[];
  answer: string;
  explanation: string;
  difficulty: string;
}

export type GeneratorKind =
  | "notes"
  | "flashcards"
  | "mcq"
  | "mindmap"
  | "quiz";