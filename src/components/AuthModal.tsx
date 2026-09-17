"use client";

import React, { useState, useEffect } from "react";
import { signUp, signIn, switchAccount, listAccounts, getCurrentUser, signOut, type StudentAccount } from "@/lib/auth";

const AVATARS = ["🎓", "⚡", "🚀", "🔬", "🏆", "📖", "🧠", "🔥"];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signup" | "signin" | "switch";
}

export function AuthModal({ isOpen, onClose, initialTab = "signup" }: AuthModalProps) {
  const [tab, setTab] = useState<"signup" | "signin" | "switch">(initialTab);
  const [accounts, setAccounts] = useState<StudentAccount[]>([]);
  const [currentUser, setCurrentUser] = useState<StudentAccount | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [targetScore, setTargetScore] = useState(95);
  const [medium, setMedium] = useState("English");
  const [avatar, setAvatar] = useState("🎓");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAccounts(listAccounts());
      setCurrentUser(getCurrentUser());
      setError(null);
      setSuccessMsg(null);
      setTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = signUp({
      name,
      username,
      pin,
      targetScore,
      medium,
      avatar,
      board: "CBSE",
    });

    if (!res.success) {
      setError(res.error || "Sign up failed");
      return;
    }

    setSuccessMsg(`Welcome to Daksh, ${res.account?.name}! 🚀`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = signIn(username, pin);

    if (!res.success) {
      setError(res.error || "Sign in failed");
      return;
    }

    setSuccessMsg(`Welcome back, ${res.account?.name}! 👋`);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleSwitch = (id: string) => {
    const res = switchAccount(id);
    if (res.success) {
      setSuccessMsg(`Switched to ${res.account?.name}!`);
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
    setSuccessMsg("Signed out. Switched to Guest mode.");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-2xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-ink text-sm p-1 rounded-md transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <span className="inline-block text-3xl mb-1">📚</span>
          <h2 className="text-xl font-bold text-ink">Student Profile & Sign In</h2>
          <p className="text-xs text-muted">CBSE Class 10 Board Exam Sanctuary</p>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-xl bg-paper p-1 mb-5 border border-border/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setTab("signup"); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              tab === "signup" ? "bg-accent text-white shadow-xs" : "text-muted hover:text-ink"
            }`}
          >
            New Student
          </button>
          <button
            type="button"
            onClick={() => { setTab("signin"); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              tab === "signin" ? "bg-accent text-white shadow-xs" : "text-muted hover:text-ink"
            }`}
          >
            Sign In
          </button>
          {accounts.length > 0 && (
            <button
              type="button"
              onClick={() => { setTab("switch"); setError(null); }}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                tab === "switch" ? "bg-accent text-white shadow-xs" : "text-muted hover:text-ink"
              }`}
            >
              Switch ({accounts.length})
            </button>
          )}
        </div>

        {/* Notification / Error feedback */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-600 dark:text-red-400">
            ⚠️ {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            ✅ {successMsg}
          </div>
        )}

        {/* TAB 1: SIGN UP */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Avatar & Vibe</label>
              <div className="flex gap-2 justify-between">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`h-9 w-9 rounded-xl border text-lg flex items-center justify-center transition-all cursor-pointer ${
                      avatar === av
                        ? "border-accent bg-accent-light/50 scale-110 shadow-xs"
                        : "border-border/60 bg-paper/50 hover:border-border"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Student Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Kumar"
                className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Username / ID</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                  placeholder="e.g. rahul2026"
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">4-Digit Secret PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 1234"
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink font-mono text-center tracking-widest focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Target Score</label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                >
                  <option value={90}>90%+ Distinction</option>
                  <option value={95}>95%+ Topper</option>
                  <option value={98}>98%+ Ranker</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Medium</label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent/90 transition-all cursor-pointer mt-2"
            >
              Create Account & Start Learning 🚀
            </button>
          </form>
        )}

        {/* TAB 2: SIGN IN */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Username / Student ID</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                placeholder="e.g. rahul2026"
                className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">4-Digit Secret PIN</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 1234"
                className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink font-mono text-center tracking-widest focus:border-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:bg-accent/90 transition-all cursor-pointer mt-2"
            >
              Sign In to My Dashboard ⚡
            </button>
          </form>
        )}

        {/* TAB 3: SWITCH STUDENT */}
        {tab === "switch" && (
          <div className="space-y-3">
            <p className="text-xs text-muted mb-2">Switch between student profiles on this computer:</p>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {accounts.map((acc) => {
                const isActive = currentUser?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => handleSwitch(acc.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "border-accent bg-accent-light/40 shadow-xs"
                        : "border-border/60 bg-paper/50 hover:border-border hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{acc.avatar}</span>
                      <div>
                        <div className="font-bold text-sm text-ink flex items-center gap-1.5">
                          {acc.name}
                          {isActive && (
                            <span className="text-[10px] bg-accent text-white px-1.5 py-0.2 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted">@{acc.username} • Target: {acc.targetScore}%</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-accent">Select →</span>
                  </div>
                );
              })}
            </div>

            {currentUser && (
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-colors mt-3 cursor-pointer"
              >
                Log Out of {currentUser.name}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
