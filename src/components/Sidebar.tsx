"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    icon: <Icon d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 3h8M8 12h8M8 16h5" />,
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface/60 px-4 py-6">
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white text-lg">📚</span>
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-accent-light font-medium text-accent"
                  : "text-muted hover:bg-accent-light/60 hover:text-ink"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <ThemeSwitcher />

          <div className="rounded-lg border border-border p-3 text-xs text-muted">
            <p className="font-medium text-ink mb-1">Tip of the day</p>
            <p>Explain today's topic aloud, then quiz yourself. Retrieval beats re-reading.</p>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 md:hidden w-full bg-surface border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link href="/" className="flex items-center gap-1.5 font-semibold mr-2 shrink-0">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-white text-sm">📚</span>
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
      </div>
    </>
  );
}