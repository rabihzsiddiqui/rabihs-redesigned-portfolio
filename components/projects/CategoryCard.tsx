"use client";

// components/projects/CategoryCard.tsx
// Level-1 category selection card for the /projects two-level browser.
//
// Desktop: 300×400px card with centered icon, name, subtitle, count.
// Mobile:  ~90px horizontal pill — icon left, text right.
//
// Hover: scale(1.025), border shifts to accent color, bottom glow bar.
// All SVG icons are 64×64, monoline, stroke-only, currentColor.

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

// ── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Category icons ───────────────────────────────────────────────────────────

function ToolsIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Hex nut — regular hexagon r=22 */}
      <polygon
        points="54,32 43,51 21,51 10,32 21,13 43,13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Inner bolt circle */}
      <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ExperimentsIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Flask body */}
      <path
        d="M26 14 L26 30 L14 52 C12.5 55 14.5 58 18 58 L46 58 C49.5 58 51.5 55 50 52 L38 30 L38 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Neck cap */}
      <line x1="23" y1="14" x2="41" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="28" cy="46" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="36" cy="40" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="33" cy="50" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Left page */}
      <path
        d="M32 16 C26 14 16 15 12 18 L12 48 C16 46 26 45 32 47 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M32 16 C38 14 48 15 52 18 L52 48 C48 46 38 45 32 47 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Spine */}
      <line x1="32" y1="16" x2="32" y2="47" stroke="currentColor" strokeWidth="1.5" />
      {/* Left text lines */}
      <line x1="17" y1="24" x2="27" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="29" x2="27" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="34" x2="27" y2="33" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Right text lines */}
      <line x1="37" y1="23" x2="47" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="37" y1="28" x2="47" y2="29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="37" y1="33" x2="47" y2="34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// ── Category data ─────────────────────────────────────────────────────────────

export type CategoryId = "tools" | "experiments" | "research";

export interface CategoryDef {
  id: CategoryId;
  name: string;
  subtitle: string;
  count: number;
  color: string;
}

export const CATEGORY_DEFS: CategoryDef[] = [
  { id: "tools",       name: "TOOLS",       subtitle: "Browser-based utilities", count: 5, color: "#00d4ff" },
  { id: "experiments", name: "EXPERIMENTS", subtitle: "Work in progress",        count: 2, color: "#a78bfa" },
  { id: "research",    name: "RESEARCH",    subtitle: "Academic & concept",       count: 2, color: "#fbbf24" },
];

const ICONS: Record<CategoryId, React.ReactNode> = {
  tools:       <ToolsIcon />,
  experiments: <ExperimentsIcon />,
  research:    <ResearchIcon />,
};

// ── Variant used by parent stagger ───────────────────────────────────────────

export const categoryCardVariant: Variants = {
  initial: { opacity: 0, y: 28, scale: 0.94 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.96,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: CategoryDef;
  onClick: () => void;
  isMobile?: boolean;
}

export default function CategoryCard({ category, onClick, isMobile = false }: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);
  const rgb = hexToRgb(category.color);

  return (
    <motion.button
      variants={categoryCardVariant}
      aria-label={`${category.name} — ${category.count} projects`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: isMobile ? 1 : 1.025 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      style={{
        width: isMobile ? "100%" : 300,
        height: isMobile ? 92 : 400,
        borderRadius: isMobile ? 10 : 14,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        background: "none",
        border: "none",
        padding: 0,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `linear-gradient(${isMobile ? "135deg" : "180deg"}, rgba(${rgb},0.18) 0%, rgba(${rgb},0.06) 50%, rgba(10,12,20,0.95) 100%)`
            : "rgba(12,16,28,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Border + outer glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: isMobile ? 10 : 14,
          border: hovered
            ? `1.5px solid rgba(${rgb},0.55)`
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? `0 0 48px rgba(${rgb},0.14), inset 0 0 24px rgba(${rgb},0.04)`
            : "none",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Bottom accent glow bar */}
      {hovered && !isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -2,
            left: "15%",
            right: "15%",
            height: 3,
            borderRadius: 2,
            background: category.color,
            boxShadow: `0 0 24px ${category.color}80, 0 0 60px ${category.color}28`,
          }}
        />
      )}

      {/* Card content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "center",
          padding: isMobile ? "0 20px" : "0 28px",
          gap: isMobile ? 18 : 0,
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            color: hovered ? category.color : "#3a3f4a",
            transition: "color 0.35s ease, filter 0.35s ease",
            filter: hovered ? `drop-shadow(0 0 14px ${category.color}55)` : "none",
            marginBottom: isMobile ? 0 : 28,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ICONS[category.id]}
        </div>

        {/* Text group */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          {/* Count — desktop only, above name */}
          {!isMobile && (
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: hovered ? `rgba(${rgb},0.85)` : "#2a2f3a",
                marginBottom: 14,
                transition: "color 0.35s ease",
              }}
            >
              {category.count} PROJECTS
            </div>
          )}

          {/* Divider — desktop only */}
          {!isMobile && (
            <div
              aria-hidden="true"
              style={{
                width: hovered ? "80%" : "48%",
                height: 1,
                background: hovered
                  ? `linear-gradient(90deg, transparent, ${category.color}55, transparent)`
                  : "rgba(255,255,255,0.06)",
                marginBottom: 16,
                alignSelf: "center",
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
          )}

          {/* Category name */}
          <h2
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: isMobile ? 15 : 24,
              letterSpacing: "0.1em",
              color: hovered ? "#ffffff" : "#7a7f8a",
              margin: 0,
              lineHeight: 1.2,
              transition: "color 0.35s ease",
            }}
          >
            {category.name}
          </h2>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: isMobile ? 10 : 12,
              letterSpacing: "0.04em",
              color: hovered ? "#9ca0ab" : "#4a4f5a",
              marginTop: isMobile ? 2 : 8,
              transition: "color 0.35s ease",
            }}
          >
            {category.subtitle}
          </div>

          {/* Count — mobile only, under subtitle */}
          {isMobile && (
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 9,
                letterSpacing: "0.1em",
                color: hovered ? `rgba(${rgb},0.8)` : "#2a2f3a",
                marginTop: 3,
                transition: "color 0.35s ease",
              }}
            >
              {category.count} PROJECTS
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
