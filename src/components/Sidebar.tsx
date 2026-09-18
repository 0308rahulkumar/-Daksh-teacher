"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AuthModal } from "./AuthModal";
import { getCurrentUser, type StudentAccount } from "@/lib/auth";

function Icon({ d, extra }: { d: string; extra?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[18px] w-[18px] ${extra ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const NAV = [
  {
    href: "/",
    label: "Dashboard",
    icon: <Icon d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" />,
  },
  {
    href: "/subjects",
    label: "Subjects",
    badge: "7",
    icon: <Icon d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 3h8M8 12h8M8 16h5" />,
  },
  {
    href: "/labs",
    label: "Interactive Labs",
    badge: "3D",
    icon: <Icon d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  },
  {
    href: "/grammar-lab",
    label: "Grammar Studio",
    badge: "AI",
    icon: <Icon d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  },
  {
    href: "/teacher",
    label: "AI Teacher",
    icon: <Icon d="M21 12a8 8 0 0 1-8 8H4a8 8 0 0 1 8-8 8 8 0 0 1 8-8v8ZM7 19l-2 2M12 15v2" />,
  },
  {
    href: "/mistakes",
    label: "Mistakes & revision",
    icon: <Icon d="M12 3l1.6 3.2 3.6.5-2.6 2.5.6 3.5L12 11l-3.2 1.7.6-3.5L6.8 6.7l3.6-.5L12 3ZM5 19l2-3M19 19l-2-3" />,
  },
  {
    href: "/profile",
    label: "My profile",
    icon: <Icon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<StudentAccount | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"signup" | "signin" | "switch">("signup");

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    const handleAuthChange = (e: Event) => {
      setCurrentUser((e as CustomEvent).detail);
    };
    window.addEventListener("daksh-auth-changed", handleAuthChange);
    return () => window.removeEventListener("daksh-auth-changed", handleAuthChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authInitialTab}
      />

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/70 bg-surface/75 backdrop-blur-2xl px-4 py-6">
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white text-lg select-none">📚</span>
          <span>
            <span className="block font-semibold leading-tight">Daksh</span>
            <span className="block text-xs text-muted">Class 10 AI Teacher</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-accent-light font-medium text-accent"
                  : "text-muted hover:bg-accent-light/60 hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>
              {"badge" in item && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          {/* Active Student Profile & Auth Status */}
          {currentUser ? (
            <div className="rounded-xl border border-border/80 bg-surface/85 backdrop-blur-xl p-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl select-none">{currentUser.avatar || "🎓"}</span>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-ink truncate">{currentUser.name}</span>
                    <span className="block text-[10px] text-muted">@{currentUser.username} • {currentUser.targetScore}% Goal</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthInitialTab("switch"); setIsAuthOpen(true); }}
                  title="Switch / Log Out"
                  className="text-xs p-1 rounded hover:bg-paper text-muted hover:text-ink cursor-pointer"
                >
                  ⇄
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-accent/40 bg-accent-light/30 backdrop-blur-xl p-2.5 text-center">
              <span className="block text-xs font-bold text-ink mb-0.5">Student Account</span>
              <p className="text-[10px] text-muted mb-2">Sign in to isolate streaks & score goals</p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => { setAuthInitialTab("signup"); setIsAuthOpen(true); }}
                  className="flex-1 py-1 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-all cursor-pointer shadow-2xs"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthInitialTab("signin"); setIsAuthOpen(true); }}
                  className="flex-1 py-1 rounded-lg border border-border bg-paper text-ink text-xs font-semibold hover:border-accent transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          <ThemeSwitcher />

          <div className="rounded-lg border border-border/60 p-2.5 text-[11px] text-muted">
            <p className="font-semibold text-ink mb-0.5">Tip of the day</p>
            <p>Explain today's topic aloud, then quiz yourself. Retrieval beats re-reading.</p>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 md:hidden w-full bg-surface/85 backdrop-blur-xl border-b border-border/70 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link href="/" className="flex items-center gap-1.5 font-semibold mr-2 shrink-0">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-white text-sm select-none">📚</span>
              Daksh
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  isActive(item.href) ? "bg-accent-light text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Button */}
          <button
            type="button"
            onClick={() => { setAuthInitialTab(currentUser ? "switch" : "signin"); setIsAuthOpen(true); }}
            className="ml-2 shrink-0 text-xs px-2 py-1 rounded-lg border border-accent/40 bg-accent-light/40 text-accent font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{currentUser ? currentUser.avatar : "👤"}</span>
            <span className="hidden sm:inline">{currentUser ? currentUser.name.split(" ")[0] : "Sign In"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
