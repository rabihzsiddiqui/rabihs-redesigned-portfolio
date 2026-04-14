"use client";

// components/projects/CompactCard.tsx
// Compact card variants for EXPERIMENTS and RESEARCH sections.
//
// "experimental" — 115px tall, 180px → 248px hover. Badge (WIP/PROTOTYPE) top-right.
//   On hover: icon glows, name brightens, category lights up in accent, 1-line description appears.
// "academic"     — 55px tall, 220px fixed. Horizontal icon + text pill.
//   On hover: border glows in accent, text/icon shift to accent color. No expand.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";
import { PROJECT_ICONS } from "./ProjectCard";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function scaleIcon(icon: React.ReactNode, size: number): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(
    icon as React.ReactElement<{ width?: number; height?: number }>,
    { width: size, height: size }
  );
}

export const compactCardVariant: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

interface CompactCardProps {
  project: Project;
  variant: "experimental" | "academic";
  badge?: string;
}

export default function CompactCard({ project, variant, badge }: CompactCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const rgb = hexToRgb(project.color);

  const isExperimental = variant === "experimental";
  const showExpanded = hovered && !isMobile;

  const restWidth = isExperimental ? 180 : 220;
  const hoverWidth = isExperimental ? 248 : 220;
  const currentWidth = showExpanded && isExperimental ? hoverWidth : restWidth;
  const cardHeight = isExperimental ? 115 : 55;

  return (
    <motion.article
      variants={compactCardVariant}
      aria-label={`${project.name} — ${project.category}`}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: currentWidth,
        height: cardHeight,
        borderRadius: isExperimental ? 10 : 8,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            showExpanded && isExperimental
              ? `linear-gradient(180deg, rgba(${rgb},0.14) 0%, rgba(${rgb},0.04) 50%, rgba(10,12,20,0.95) 100%)`
              : isExperimental
                ? "rgba(12,16,28,0.65)"
                : "rgba(12,16,28,0.38)",
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
          borderRadius: isExperimental ? 10 : 8,
          border: showExpanded
            ? `1.5px solid rgba(${rgb},0.35)`
            : hovered && !isExperimental
              ? `1px solid rgba(${rgb},0.28)`
              : isExperimental
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(255,255,255,0.07)",
          transition: "border-color 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Experimental: bottom glow bar on hover */}
      {isExperimental && showExpanded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -1,
            left: "12%",
            right: "12%",
            height: 2,
            borderRadius: 2,
            background: project.color,
            boxShadow: `0 0 8px ${project.color}60, 0 0 20px ${project.color}20`,
          }}
        />
      )}

      {/* Badge (experimental only) */}
      {badge && isExperimental && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 10,
            fontFamily: "var(--font-dm-sans)",
            fontSize: 7,
            letterSpacing: "0.12em",
            color: project.color,
            background: `rgba(${rgb},0.1)`,
            border: `1px solid rgba(${rgb},0.22)`,
            borderRadius: 3,
            padding: "1px 4px",
          }}
        >
          {badge}
        </div>
      )}

      {/* Content */}
      {isExperimental ? (
        <ExperimentalContent project={project} showExpanded={showExpanded} rgb={rgb} />
      ) : (
        <AcademicContent project={project} showExpanded={hovered && !isMobile} rgb={rgb} />
      )}
    </motion.article>
  );
}

// ── Experimental content (115px tall) ───────────────────────

function ExperimentalContent({
  project,
  showExpanded,
  rgb,
}: {
  project: Project;
  showExpanded: boolean;
  rgb: string;
}) {
  const icon = PROJECT_ICONS[project.slug] ?? null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "9px 14px 9px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Spacer: pushes content toward center when not hovered */}
      <div
        style={{
          flex: showExpanded ? "0 0 0" : "1 1 0",
          transition: "flex 0.35s ease",
          minHeight: 0,
        }}
      />

      {/* Icon */}
      <div
        style={{
          color: showExpanded ? project.color : "#4a4f5a",
          transition: "color 0.35s ease, transform 0.35s ease, filter 0.35s ease",
          transform: showExpanded ? "scale(1.05)" : "scale(1)",
          filter: showExpanded ? `drop-shadow(0 0 5px ${project.color}40)` : "none",
          marginBottom: showExpanded ? 3 : 0,
          flexShrink: 0,
        }}
      >
        {scaleIcon(icon, 26)}
      </div>

      {/* Divider */}
      <div
        aria-hidden="true"
        style={{
          width: showExpanded ? "52%" : "30%",
          height: 1,
          background: showExpanded
            ? `linear-gradient(90deg, transparent, ${project.color}30, transparent)`
            : "rgba(255,255,255,0.05)",
          margin: showExpanded ? "4px 0" : "5px 0",
          transition: "width 0.35s ease, background 0.35s ease",
          flexShrink: 0,
        }}
      />

      {/* Name */}
      <h2
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          fontSize: showExpanded ? 14 : 12,
          letterSpacing: "0.08em",
          color: showExpanded ? "#ffffff" : "#8a8f9a",
          margin: 0,
          lineHeight: 1.2,
          transition: "font-size 0.3s ease, color 0.3s ease",
          flexShrink: 0,
        }}
      >
        {project.nameUpper}
      </h2>

      {/* Category */}
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 8.5,
          letterSpacing: "0.08em",
          color: showExpanded ? project.color : "#4a4f5a",
          marginTop: 2,
          transition: "color 0.3s ease",
          flexShrink: 0,
        }}
      >
        {project.category}
      </div>

      {/* 1-line description — appears on hover */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 9.5,
          color: "#8a8f9a",
          lineHeight: 1.4,
          margin: showExpanded ? "5px 0 0 0" : "0",
          opacity: showExpanded ? 1 : 0,
          maxHeight: showExpanded ? 14 : 0,
          overflow: "hidden",
          transition: "opacity 0.3s ease 0.05s, max-height 0.3s ease 0.05s, margin 0.3s ease",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "100%",
          flexShrink: 0,
        }}
      >
        {project.description}
      </p>

      {/* Bottom spacer */}
      <div style={{ flex: "1 1 0", minHeight: 0 }} />
    </div>
  );
}

// ── Academic content (55px tall) ────────────────────────────

function AcademicContent({
  project,
  showExpanded,
  rgb,
}: {
  project: Project;
  showExpanded: boolean;
  rgb: string;
}) {
  const icon = PROJECT_ICONS[project.slug] ?? null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          color: showExpanded ? project.color : "#3a3f4a",
          transition: "color 0.3s ease, filter 0.3s ease",
          filter: showExpanded ? `drop-shadow(0 0 4px ${project.color}30)` : "none",
          flexShrink: 0,
        }}
      >
        {scaleIcon(icon, 18)}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.07em",
            color: showExpanded ? "#d4d8e0" : "#6a6f7a",
            margin: 0,
            lineHeight: 1.2,
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.nameUpper}
        </h2>
        <div
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 8,
            letterSpacing: "0.06em",
            color: showExpanded ? project.color : "#3a3f4a",
            marginTop: 2,
            transition: "color 0.3s ease",
          }}
        >
          {project.category}
        </div>
      </div>
    </div>
  );
}
