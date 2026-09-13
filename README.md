# Daksh — Class 10 AI Teacher

A personal AI teacher for Class 10 board exam preparation in India (CBSE / ICSE / State Board). Built with Next.js 15, Vercel AI SDK 7, and the Anthropic Claude models.

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

## Quick Start

```bash
cd teaching-agent
cp .env.example .env.local   # add your ANTHROPIC_API_KEY (or AI_GATEWAY_API_KEY)
npm run dev                  # http://localhost:3000
```

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
│   │   │   ├── provider.ts          # model router (Sonnet 5 / Opus 5 / Haiku 4.5)
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
└── tsconfig.json
```

## AI Configuration

The app uses **Vercel AI SDK 7** streaming with `useChat` and `DefaultChatTransport`.

| Role | Model (Gateway) | Model (Direct) | Use case |
|------|-----------------|----------------|----------|
| teacher | `anthropic/claude-sonnet-5` | `claude-sonnet-5` | Interactive teaching, explanations, chat |
| deep | `anthropic/claude-opus-5` | `claude-opus-5` | Hard math, deep analysis, answer evaluation |
| fast | `anthropic/claude-haiku-4.5` | `claude-haiku-4-5-20251001` | Quick lookups, simple MCQs, flashcards |

**Provider selection**:
- If `AI_GATEWAY_API_KEY` is set → uses Vercel AI Gateway (`gateway('anthropic/…')`).
- Else if `ANTHROPIC_API_KEY` is set → uses direct Anthropic (`anthropic('claude-…')`).
- Neither set → chat shows a friendly setup banner; generators return a clear error.

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

Deploy to **Vercel** for the best experience (AI Gateway, Fluid Compute, zero-config deploy):

```bash
npm i -g vercel
vercel
```

On Vercel, add `AI_GATEWAY_API_KEY` (Project Settings → Environment Variables) for production AI access.

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