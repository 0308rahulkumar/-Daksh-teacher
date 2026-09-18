"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

/**
 * Motion-Primitives inspired Spotlight Card
 * Casts a smooth mouse-following radial spotlight over borders and surface.
 */
export function SpotlightCard({
  children,
  spotlightColor = "rgba(67, 59, 255, 0.22)",
  className = "",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-surface backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:shadow-xl ${className}`}
      {...props}
    >
      {/* Motion Spotlight Beam */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
