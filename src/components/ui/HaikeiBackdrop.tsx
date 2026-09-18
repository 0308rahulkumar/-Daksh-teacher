"use client";

import React from "react";

/**
 * Generative SVG layered wave & mesh background in Realtime Colors palette:
 * Background: #050315 | Primary: #2F27CE | Accent: #433BFF | Soft: #DEDCFF
 */
export function HaikeiWaves({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`} aria-hidden="true">
      <svg
        className="absolute -top-24 -left-20 w-[140%] h-[160%] opacity-40 blur-2xl"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="haikei-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#433BFF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#2F27CE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#050315" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="haikei-grad-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DEDCFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#433BFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2F27CE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,149.3C672,139,768,181,816,202.7L864,224L864,0L816,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="url(#haikei-grad-primary)"
        />
        <path
          d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,261.3C672,267,768,245,816,234.7L864,224L864,0L816,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="url(#haikei-grad-secondary)"
        />
      </svg>
    </div>
  );
}

/**
 * Floating organic glow blob generator (Haikei Blob style)
 */
export function HaikeiBlob({
  color = "#433BFF",
  size = 320,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      aria-hidden="true"
    />
  );
}
