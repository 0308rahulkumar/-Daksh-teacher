"use client";

import { useRef, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";

export interface ChatProps {
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
  topicName?: string;
  placeholder?: string;
  initialPrompt?: string;
}

const SUGGESTIONS: { mode: string; label: string; prompt: string }[] = [
  { mode: "teach", label: "Teach me", prompt: "Teach me this topic, step by step." },
  { mode: "doubt", label: "I have a doubt", prompt: "I have a doubt in this topic. Can you explain it clearly?" },
  { mode: "quiz", label: "Quiz me", prompt: "Quiz me on this topic. Ask one question at a time." },
  { mode: "revise", label: "Revision", prompt: "Let's do a quick revision of this topic." },
  { mode: "exam", label: "Board practice", prompt: "Give me board-level practice questions on this topic." },
];

function formatMathFormulas(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\pm/g, "±")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\theta/g, "θ")
    .replace(/\\pi/g, "π")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\lambda/g, "λ")
    .replace(/\\omega/g, "ω")
    .replace(/\\le(q)?/g, "≤")
    .replace(/\\ge(q)?/g, "≥")
    .replace(/\\ne(q)?/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\infty/g, "∞")
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\tan/g, "tan")
    .replace(/\^2\b/g, "²")
    .replace(/\^3\b/g, "³")
    .replace(/_1\b/g, "₁")
    .replace(/_2\b/g, "₂")
    .replace(/_3\b/g, "₃")
    .replace(/\$\$([\s\S]*?)\$\$/g, "$1")
    .replace(/\$(.*?)\$/g, "$1");
}

function getMessageText(message: { role?: string; content?: unknown; parts?: { type: string; text?: string }[] }): string {
  if (typeof message.content === "string") return message.content;
  if (Array.isArray(message.parts)) {
    return message.parts.filter((p) => p.type === "text").map((p) => p.text ?? "").join("");
  }
  return "";
}

export function Chat({ subjectId, chapterId, topicId, topicName, placeholder, initialPrompt }: ChatProps) {
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const initialSentRef = useRef(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const onAuth = () => setCurrentUser(getCurrentUser());
    if (typeof window !== "undefined") {
      window.addEventListener("daksh-auth-changed", onAuth);
      return () => window.removeEventListener("daksh-auth-changed", onAuth);
    }
  }, []);

  const transport = new DefaultChatTransport({
    api: "/api/chat",
    body: {
      subjectId,
      chapterId,
      topicId,
      studentName: currentUser?.name,
      board: currentUser?.board,
      medium: currentUser?.medium,
    },
  });
  const { messages, sendMessage, status, error, stop } = useChat({ transport });

  const bottomRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // Auto-send initial prompt if provided and not yet sent
  useEffect(() => {
    if (initialPrompt && !initialSentRef.current && messages.length === 0) {
      initialSentRef.current = true;
      sendMessage({ text: initialPrompt });
    }
  }, [initialPrompt, messages.length, sendMessage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollToBottom = useRef(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }).current;

  // Trigger scroll when messages change or streaming status changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const effect = useRef(() => {
    scrollToBottom();
  }).current;
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only run on messages.length and status
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // @ts-ignore - React 18 useEffect deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: see above
  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // @ts-ignore
  // biome-ignore lint/correctness/useExhaustiveDependencies
  // @ts-ignore

  return (
    <div className="flex h-[68vh] flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">AI Teacher</p>
          {topicName && <p className="text-xs text-muted">Now on: {topicName}</p>}
        </div>
        {busy && (
          <button onClick={() => stop()} className="text-xs text-muted underline hover:text-ink">
            Stop
          </button>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-3 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {/API key/i.test(error.message) ? (
            <span>
              <span className="font-semibold">The AI teacher isn&apos;t configured yet.</span> Add
              <code className="mx-1 rounded bg-surface px-1">GOOGLE_GENERATIVE_AI_API_KEY</code> (free) or
              <code className="mx-1 rounded bg-surface px-1">ANTHROPIC_API_KEY</code> to{" "}
              <code className="mx-1 rounded bg-surface px-1">.env.local</code>, restart the dev server, and refresh.
            </span>
          ) : (
            error.message
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="mx-auto max-w-md py-10 text-center">
            <div className="mb-3 text-3xl">👋</div>
            <h4 className="mb-1 font-semibold text-ink">
              {topicName ? `Ask about: ${topicName}` : "Chat with your AI teacher"}
            </h4>
            <p className="mb-6 text-sm text-muted">
              Ask it to teach, clear a doubt, run a quiz, or make notes. It adapts to your level and stays inside the Class 10 syllabus.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.mode}
                  onClick={() => {
                    setInput(`[MODE:${s.mode}] ${s.prompt}`);
                    setInput("");
                    sendMessage({ text: `[MODE:${s.mode}] ${s.prompt}` });
                  }}
                  className="rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const text = getMessageText(m);
          if (!text.trim()) return null;

          return isUser ? (
            <div key={m.id} className="mb-3 flex justify-end">
              <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-white">
                {text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="mb-4">
              <div className="prose-teacher max-w-full rounded-2xl rounded-bl-sm border border-border bg-paper px-4 py-3 text-[15px] leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const lang = match ? match[1] : "";
                      const raw = String(children).replace(/\n$/, "");
                      if (lang === "svg" || (raw.trim().startsWith("<svg") && raw.trim().endsWith("</svg>"))) {
                        return (
                          <div className="my-3 overflow-x-auto rounded-xl border border-border bg-white p-3 text-ink">
                            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-border/60 text-[11px] font-medium tracking-wider text-muted uppercase">
                              <span>📐 CBSE Visual Diagram</span>
                            </div>
                            <div
                              className="flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
                              dangerouslySetInnerHTML={{ __html: raw }}
                            />
                          </div>
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {formatMathFormulas(text)}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="mb-3 flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage({ text: input });
                setInput("");
              }
            }}
            rows={1}
            placeholder={placeholder ?? `Ask something… (Enter to send)`}
            className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent"
          />
          <Button type="submit" disabled={busy || !input.trim()} onClick={() => { sendMessage({ text: input }); setInput(""); }}>
            Send
          </Button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted">
          {status === "streaming" ? "Teaching…" : "The teacher stays inside the Class 10 syllabus."}
        </p>
      </div>
    </div>
  );
}