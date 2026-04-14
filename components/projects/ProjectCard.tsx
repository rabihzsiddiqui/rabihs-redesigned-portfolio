"use client";

// components/projects/ProjectCard.tsx
// Mode-selection card: 160px rest → 260px hover (desktop only).
//
// Mobile (<768px): fixed width (~80vw), no expand — card links directly on tap.
// Tablet: same expand behavior as desktop but starts narrower (140px → 240px).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Per-project SVG icons ────────────────────────────────────
// All icons: 48×48, viewBox 0 0 48 48, monoline, 1.5px stroke, currentColor.

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  audora: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="14" y="20" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="12" width="4" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="30" y="16" width="4" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  compresso: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="17" y="17" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 24h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 20l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 24h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M37 20l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  screen: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 30v3M9 33h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="32" y="16" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M37 33h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  pomodoro: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 26V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 26l-7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  scribe: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 8h18l8 8v28H12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M30 8v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 22h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 27h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 32h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  spectra: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 27c4.5-9 9-13 16-13s11.5 4 16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 27c4.5 6 9 9 16 9s11.5-3 16-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="27" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 19c2-5 5-8 9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M33 19c-2-5-5-8-9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  nyra: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 5" />
      <circle cx="24" cy="6" r="1.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="42" cy="24" r="1.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="42" r="1.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="6" cy="24" r="1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  "restaurant-rating-analysis": (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M12 36V24M20 36V14M28 36V28M36 36V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 36h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="7" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M20 10v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  visa: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="26" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M26 14v-3M26 37v-3M16 24h-3M39 24h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 19l4 5 4-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 13c-4 4-5 9-4 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9 9c-7 6-8 20-1 28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
};

export const cardEnterVariant: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const rgb = hexToRgb(project.color);

  // On mobile: fixed width card, no hover expansion
  const restWidth = isMobile ? "80vw" : 160;
  const hoverWidth = isMobile ? "80vw" : 260;
  const currentWidth = hovered && !isMobile ? hoverWidth : restWidth;
  const showExpanded = hovered && !isMobile;

  return (
    <motion.article
      variants={cardEnterVariant}
      aria-label={`${project.name} — ${project.category}`}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onMouseEnter={() => { if (!isMobile) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: currentWidth,
        height: 360,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        // scroll-snap on mobile
        scrollSnapAlign: isMobile ? "center" : undefined,
        transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {/* Background fill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: showExpanded
            ? `linear-gradient(180deg, rgba(${rgb},0.2) 0%, rgba(${rgb},0.05) 50%, rgba(10,12,20,0.95) 100%)`
            : "rgba(12,16,28,0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          border: showExpanded
            ? `1.5px solid rgba(${rgb},0.4)`
            : "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Accent glow bar */}
      {showExpanded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -2,
            left: "10%",
            right: "10%",
            height: 3,
            borderRadius: 2,
            background: project.color,
            boxShadow: `0 0 16px ${project.color}60, 0 0 40px ${project.color}20`,
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
          flexDirection: "column",
          alignItems: "center",
          padding: showExpanded ? "28px 20px 20px" : "28px 16px 20px",
          textAlign: "center",
          transition: "padding 0.4s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            color: showExpanded ? project.color : isMobile ? "#7a7f8a" : "#4a4f5a",
            transition: "color 0.35s ease, transform 0.35s ease, filter 0.35s ease",
            marginBottom: showExpanded ? 16 : 24,
            transform: showExpanded ? "scale(1.1)" : "scale(1)",
            filter: showExpanded ? `drop-shadow(0 0 8px ${project.color}40)` : "none",
            flex: showExpanded ? "0 0 auto" : "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {PROJECT_ICONS[project.slug] ?? null}
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            width: showExpanded ? "70%" : "40%",
            height: 1,
            background: showExpanded
              ? `linear-gradient(90deg, transparent, ${project.color}40, transparent)`
              : "rgba(255,255,255,0.06)",
            marginBottom: 16,
            transition: "width 0.35s ease, background 0.35s ease",
          }}
        />

        {/* Project name */}
        <h2
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: showExpanded ? 22 : isMobile ? 16 : 15,
            letterSpacing: "0.08em",
            color: showExpanded ? "#ffffff" : "#9ca0ab",
            margin: 0,
            lineHeight: 1.2,
            transition: "font-size 0.35s ease, color 0.35s ease",
          }}
        >
          {project.nameUpper}
        </h2>

        {/* Category */}
        <div
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: showExpanded ? project.color : "#4a4f5a",
            marginTop: 4,
            transition: "color 0.3s ease",
            opacity: showExpanded ? 1 : 0.7,
          }}
        >
          {project.category}
        </div>

        {/* Description — visible on desktop hover or always on mobile */}
        {isMobile ? (
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#7a7f8a",
              lineHeight: 1.6,
              margin: "12px 0 0 0",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.description}
          </p>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11.5,
              color: "#9ca0ab",
              lineHeight: 1.6,
              margin: "14px 0 0 0",
              opacity: showExpanded ? 1 : 0,
              maxHeight: showExpanded ? 120 : 0,
              overflow: "hidden",
              transition: "opacity 0.35s ease 0.05s, max-height 0.35s ease 0.05s",
            }}
          >
            {project.description}
          </p>
        )}

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "center",
            marginTop: "auto",
            paddingTop: 12,
            opacity: showExpanded || isMobile ? 1 : 0,
            transition: "opacity 0.3s ease 0.1s",
          }}
        >
          {(showExpanded || isMobile) &&
            project.tags.slice(0, isMobile ? 2 : 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  color: "#6a6f7a",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  padding: "2px 8px",
                }}
              >
                {tag}
              </span>
            ))}
        </div>

        {/* VIEW > — desktop hover only */}
        {showExpanded && (
          <div
            aria-hidden="true"
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: project.color,
            }}
          >
            VIEW
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke={project.color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Mobile: tap hint */}
        {isMobile && (
          <div
            style={{
              marginTop: 8,
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: "0.1em",
              color: project.color,
              opacity: 0.7,
            }}
          >
            TAP TO VIEW
          </div>
        )}
      </div>
    </motion.article>
  );
}
