# Daksh — Class 10 AI Teacher

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Gemini](https://img.shields.io/badge/Gemini-Free-4285F4)
![Claude](https://img.shields.io/badge/Claude-Optional-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A personal AI teacher for Class 10 board exam preparation in India (CBSE / ICSE / State Board). Built with Next.js 15, Vercel AI SDK 7, and multi-provider AI support (Google Gemini free tier + Anthropic Claude).

> **🆓 Runs for FREE** — uses Google Gemini's free API tier. No billing or credit card needed.

## Features

- **Subjects**: Science (Physics, Chemistry, Biology), Mathematics, Social Science (History, Geography, Civics, Economics), English (First Flight, Footprints Without Feet)
- **Syllabus-aware**: Full NCERT-based topic map; the AI never wanders outside Class 10 scope
- **Active learning cycle**: Teach → Check → Recall → Practice → Feedback → Spaced revision
- **Tabs per topic**: Learn (chat), Notes, Flashcards, Quiz, Mind map, Mistakes
- **AI Teacher**: Streaming chat with context (board, topic, mastery, due revisions)
- **Structured generators**: Notes, MCQs, flashcards, mind maps, quizzes — all typed, validated output
- **Learning engine**: Mastery scoring, mistake notebook, spaced-repetition scheduler
- **Local-first persistence**: JSON file store (`data/state.json`) — zero setup, swappable for Postgres
- **Exam-oriented**: Board-level questions, marking-scheme guidance, keyword coaching
- **Multi-provider AI**: Works with Google Gemini (free) or Anthropic Claude (paid) — your choice

## Quick Start

```bash
cd teaching-agent
cp .env.example .env.local   # add your API key (see below)
npm install
npm run dev                  # http://localhost:3000
```

### Getting a Free API Key (2 minutes)

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Paste it in `.env.local`:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...your-key-here
   ```
5. Run `npm run dev` — done! 🎉

## AI Configuration

The app supports **multiple AI providers** with automatic fallback:

```
Priority (first match wins):
  1. AI_GATEWAY_API_KEY    →  Vercel AI Gateway
  2. ANTHROPIC_API_KEY     →  Claude (Sonnet/Opus/Haiku)
  3. GOOGLE_GENERATIVE_AI_API_KEY  →  Gemini (Flash/Flash-Lite)  ← FREE
  4. None set              →  friendly setup banner
```

### Model Mapping

| Role | Google Gemini (Free) | Anthropic Claude (Paid) | Use case |
|------|---------------------|------------------------|----------|
| teacher | `gemini-2.0-flash` | `claude-sonnet-5` | Interactive teaching, explanations, chat |
| deep | `gemini-2.5-flash-preview-05-20` | `claude-opus-5` | Hard math, deep analysis, answer evaluation |
| fast | `gemini-2.0-flash-lite` | `claude-haiku-4.5` | Quick lookups, simple MCQs, flashcards |

## Project Structure

```
teaching-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        # streaming chat (useChat + DefaultChatTransport)
│   │   │   ├── generate/route.ts    # typed generators (notes, flashcards, mcq, mindmap, quiz)
│   │   │   ├── state/route.ts       # student profile + progress
│   │   │   └── result/route.ts      # quiz results → mastery + mistakes
│   │   ├── subjects/[subjectId]/[chapterId]/[topicId]/page.tsx  # topic hub
│   │   ├── teacher/page.tsx         # free-form AI teacher chat
│   │   ├── mistakes/page.tsx        # global mistake notebook
│   │   ├── profile/page.tsx         # student profile + stats
│   │   ├── layout.tsx               # root layout + sidebar
│   │   ├── page.tsx                 # dashboard
│   │   └── globals.css              # design tokens (paper + indigo + highlight)
│   ├── components/
│   │   ├── Chat.tsx                 # streaming chat UI (useChat v7)
│   │   ├── QuizRunner.tsx           # interactive question-by-question quiz
│   │   ├── NotesView.tsx            # revision notes viewer
│   │   ├── FlashcardsView.tsx       # flip-card deck
│   │   ├── MindmapView.tsx          # hierarchical concept map
│   │   ├── Sidebar.tsx              # responsive navigation
│   │   └── ui.tsx                   # Card, Badge, ProgressBar, Button…
│   ├── hooks/
│   │   ├── useAppState.ts           # client-state bundle (SWR-like)
│   │   └── useGenerator.ts          # cached AI generation hook
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── provider.ts          # model router (Gemini / Claude / Gateway)
│   │   │   ├── prompts.ts           # master teacher system prompt + mode tags
│   │   │   └── generators.ts        # typed AI generators (Output.object / array)
│   │   ├── learning.ts              # mastery scoring, spaced repetition, due topics
│   │   ├── store.ts                 # JSON file persistence with mutex
│   │   ├── syllabus/index.ts        # CBSE Class 10 knowledge map
│   │   └── types.ts                 # shared domain types
│   └── types.ts                     # (re-export)
├── data/                            # state.json created at runtime
├── .env.example                     # copy to .env.local
├── next.config.ts
├── package.json
├── LICENSE
└── tsconfig.json
```

## Design System (globals.css)

- **Palette**: `--paper` (warm off-white), `--ink` (near-black), `--accent` (indigo `#4338CA`), `--highlight` (transparent yellow)
- **Typography**: Rubik variable font (Google Fonts)
- **Components**: Cards with accent left border, mastery badges, progress bars, high-contrast focus rings
- **Dark mode**: Full support via `prefers-color-scheme`

## Data Persistence

`src/lib/store.ts` writes `data/state.json` with a simple in-process mutex so concurrent API calls (chat + quiz result) don't lose updates. For production, swap `getState`/`updateState` to a Postgres implementation — the rest of the app is store-agnostic.

## Spaced Repetition (lightweight SM-2)

- Correct → interval ×2 (cap 30 days)
- Wrong → interval = 1 day
- Topics with `nextReview ≤ today` appear in "Due for revision" on the dashboard and in the chat context

## Deployment

Deploy to **Vercel** for the best experience (zero-config deploy):

```bash
npm i -g vercel
vercel
```

On Vercel, add `GOOGLE_GENERATIVE_AI_API_KEY` (Project Settings → Environment Variables) for free AI access. Optionally add `ANTHROPIC_API_KEY` or `AI_GATEWAY_API_KEY` for Claude.

## Extending the Syllabus

Edit `src/lib/syllabus/index.ts`:
- Add/remove chapters or topics
- Keep `id` strings stable — they key the progress store
- The UI auto-discovers the structure

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

## License

MIT — use freely for learning and teaching.