"use client";

// components/projects/ProjectCard.tsx
// Expandable project card for the TOOLS section.
//
// cardHeight prop controls physical height (default 190px for the new 3-section layout).
// When cardHeight < 280 ("compact" mode): tighter padding, smaller icon (36px), shorter
// description, fewer visible tags. All other visual behavior is preserved.
//
// Mobile: fixed ~80vw width, no hover expand — tap to navigate.

import { useState, cloneElement, isValidElement } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// Resize a 48×48 SVG icon to any square size via React.cloneElement.
function scaleIcon(
  icon: React.ReactNode,
  size: number
): React.ReactNode {
  if (size === 48 || !isValidElement(icon)) return icon;
  return cloneElement(
    icon as React.ReactElement<{ width?: number; height?: number }>,
    { width: size, height: size }
  );
}

// ── Per-project SVG icons ────────────────────────────────────
// All icons: 48×48, viewBox 0 0 48 48, monoline, 1.5px stroke, currentColor.

export const PROJECT_ICONS: Record<string, React.ReactNode> = {
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
  /** Physical card height in px. Values below 280 activate compact mode. Default: 190. */
  cardHeight?: number;
  /** Desktop expanded height on hover. Defaults to cardHeight (no vertical grow). */
  hoverHeight?: number;
  /** Optional badge label shown top-right (e.g. "WIP", "PROTOTYPE"). */
  badge?: string;
  /** Desktop rest width in px. Default: 150. */
  restWidth?: number;
  /** Desktop hover (expanded) width in px. Default: 248. */
  hoverWidth?: number;
}

export default function ProjectCard({ project, cardHeight = 190, hoverHeight, badge, restWidth: deskRest = 150, hoverWidth: deskHover = 248 }: ProjectCardProps) {
  const compact = cardHeight < 280;

  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const rgb = hexToRgb(project.color);

  const restWidth = isMobile ? "80vw" : deskRest;
  const expandWidth = isMobile ? "80vw" : deskHover;
  const currentWidth = hovered && !isMobile ? expandWidth : restWidth;
  const currentHeight = hovered && !isMobile && hoverHeight ? hoverHeight : cardHeight;
  const showExpanded = hovered && !isMobile;

  const iconSize = compact ? 36 : 48;

  return (
    <motion.article
      variants={cardEnterVariant}
      aria-label={`${project.name} — ${project.category}`}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onMouseEnter={() => { if (!isMobile) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: currentWidth,
        height: currentHeight,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        scrollSnapAlign: isMobile ? "center" : undefined,
        transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
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

      {/* Badge */}
      {badge && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            fontFamily: "var(--font-dm-sans)",
            fontSize: 8,
            letterSpacing: "0.12em",
            color: project.color,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.22)`,
            borderRadius: 3,
            padding: "2px 5px",
          }}
        >
          {badge}
        </div>
      )}

      {/* Accent glow bar */}
      {showExpanded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -2,
            left: "10%",
            right: "10%",
            height: compact ? 2 : 3,
            borderRadius: 2,
            background: project.color,
            boxShadow: `0 0 ${compact ? 12 : 16}px ${project.color}60, 0 0 ${compact ? 28 : 40}px ${project.color}20`,
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
          padding: showExpanded
            ? compact ? "14px 16px 18px" : "28px 20px 20px"
            : compact ? "18px 14px 14px" : "28px 16px 20px",
          textAlign: "center",
          transition: "padding 0.4s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            color: showExpanded ? project.color : isMobile ? "#7a7f8a" : "#4a4f5a",
            transition: "color 0.35s ease, transform 0.35s ease, filter 0.35s ease",
            marginBottom: showExpanded ? (compact ? 6 : 16) : (compact ? 10 : 24),
            transform: showExpanded ? "scale(1.1)" : "scale(1)",
            filter: showExpanded ? `drop-shadow(0 0 ${compact ? 6 : 8}px ${project.color}40)` : "none",
            flex: showExpanded ? "0 0 auto" : "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {scaleIcon(PROJECT_ICONS[project.slug] ?? null, iconSize)}
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
            marginBottom: compact ? 8 : 16,
            transition: "width 0.35s ease, background 0.35s ease",
          }}
        />

        {/* Project name */}
        <h2
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: showExpanded
              ? compact ? 17 : 22
              : isMobile ? 16 : compact ? 13 : 15,
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

        {/* Description — mobile always shown, desktop only for non-compact cards */}
        {isMobile ? (
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#7a7f8a",
              lineHeight: 1.6,
              margin: "12px 0 0 0",
            }}
          >
            {project.shortDescription}
          </p>
        ) : !compact && (
          <AnimatePresence>
            {showExpanded && (
              <motion.p
                key="desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.22, delay: 0.38 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  color: "#9ca0ab",
                  lineHeight: 1.6,
                  margin: "14px 0 0 0",
                }}
              >
                {project.shortDescription}
              </motion.p>
            )}
          </AnimatePresence>
        )}

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: compact ? 4 : 6,
            justifyContent: "center",
            marginTop: "auto",
            paddingTop: compact ? 6 : 12,
            opacity: showExpanded || isMobile ? 1 : 0,
            transition: "opacity 0.2s ease 0.35s",
          }}
        >
          {(showExpanded || isMobile) &&
            project.tags.slice(0, isMobile ? 2 : compact ? 2 : 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: compact ? 9 : 10,
                  color: "#6a6f7a",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  padding: compact ? "1px 6px" : "2px 8px",
                }}
              >
                {tag}
              </span>
            ))}
        </div>

        {/* VIEW — desktop hover only, delayed to appear after card has expanded */}
        <AnimatePresence>
          {showExpanded && (
            <motion.div
              key="view"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              style={{
                marginTop: compact ? 6 : 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                fontSize: compact ? 10 : 11,
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
            </motion.div>
          )}
        </AnimatePresence>

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
