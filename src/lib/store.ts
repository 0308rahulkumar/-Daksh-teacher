// Local-first JSON persistence for the teaching agent.
//
// The store stores one student's full state in data/state.json and serialises
// writes through a small in-process mutex. It is a deliberate MVP choice: it is
// zero-setup and works everywhere. Swapping in Postgres later only requires
// reimplementing getState/updateState behind the same signatures
// (see README "Storage").

import { promises as fs } from "node:fs";
import path from "node:path";
import type { AppState } from "./types";

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

const STATE_FILE = path.join(DATA_DIR, "state.json");

export function defaultState(): AppState {
  const now = new Date().toISOString();
  return {
    profile: {
      name: "Student",
      klass: "Class 10",
      board: "CBSE",
      medium: "English",
      subjects: ["science", "maths", "social-science", "english", "bseb-english", "english-grammar", "hindi-grammar"],
      dailyMinutes: 60,
      createdAt: now,
    },
    progress: {},
    mistakes: [],
    quizHistory: [],
    studySessions: [],
    updatedAt: now,
  };
}

// Serialise all reads/writes through one promise chain so concurrent API calls
// (chat + quiz submission) cannot lose each other's updates.
let queue: Promise<unknown> = Promise.resolve();
function mutex<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

async function ensureFile(): Promise<AppState> {
  try {
    await fs.access(STATE_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STATE_FILE, JSON.stringify(defaultState(), null, 2), "utf8");
  }
  const raw = await fs.readFile(STATE_FILE, "utf8");
  return JSON.parse(raw) as AppState;
}

export function getState(): Promise<AppState> {
  return mutex(async () => structuredClone(await ensureFile()));
}

/** Apply a transformation and persist. Always returns the new state. */
export function updateState(fn: (s: AppState) => AppState | void): Promise<AppState> {
  return mutex(async () => {
    const s = await ensureFile();
    const next = structuredClone(s);
    fn(next);
    next.updatedAt = new Date().toISOString();
    await fs.writeFile(STATE_FILE, JSON.stringify(next, null, 2), "utf8");
    return structuredClone(next);
  });
}