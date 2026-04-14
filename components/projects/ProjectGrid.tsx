"use client";

// components/projects/ProjectGrid.tsx
// Three labeled sections, centered on the page. Desktop only for tiered layout;
// mobile falls back to a single horizontal scroll-snap row.
//
// TOOLS       — 5 cards: 3 in top row, 2 centered below (190px tall, compact mode)
// EXPERIMENTS — 2 side-by-side cards (115px, WIP/PROTOTYPE badges)
// RESEARCH    — 2 compact horizontal cards (55px, no hover expand)
//
// All sections are independently centered. Each section label left-aligns with
// its card group and carries a horizontal rule extending to the section's right edge.

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import CompactCard from "./CompactCard";
import { useIsMobile } from "@/lib/useMediaQuery";

const TOOLS_SLUGS = ["audora", "compresso", "screen", "pomodoro", "scribe"];
const EXPERIMENTS_SLUGS = ["spectra", "nyra"];
const RESEARCH_SLUGS = ["restaurant-rating-analysis", "visa"];

const BADGES: Record<string, string> = {
  spectra: "WIP",
  nyra: "PROTOTYPE",
};

// ── Stagger helpers ───────────────────────────────────────────

const group = (delay: number) => ({
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: delay } },
});

// ── Section label: "TOOLS ────────────────" ──────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "#3a3f4a",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {text}
      </span>
      <div
        aria-hidden="true"
        style={{
          height: 1,
          flex: 1,
          minWidth: 16,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05), transparent)",
        }}
      />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────

export default function ProjectGrid() {
  const isMobile = useIsMobile();

  // Mobile: unchanged single horizontal scroll-snap row
  if (isMobile) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={group(0.1)}
        role="list"
        aria-label="Projects"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "8px 10vw 12px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.06) transparent",
          width: "100%",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} cardHeight={360} />
        ))}
      </motion.div>
    );
  }

  const toolsProjects = TOOLS_SLUGS.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const experimentProjects = EXPERIMENTS_SLUGS.map((s) =>
    projects.find((p) => p.slug === s)!
  ).filter(Boolean);
  const researchProjects = RESEARCH_SLUGS.map((s) =>
    projects.find((p) => p.slug === s)!
  ).filter(Boolean);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ initial: {}, animate: {} }}
      role="list"
      aria-label="Projects"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 0,
      }}
    >
      {/* ─── SECTION 1: TOOLS ──────────────────────────────── */}
      <section
        aria-label="Tools"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <SectionLabel text="TOOLS" />

        {/* Row 1: first 3 tools */}
        <motion.div
          variants={group(0.1)}
          style={{ display: "flex", gap: 10 }}
        >
          {toolsProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} cardHeight={190} />
          ))}
        </motion.div>

        {/* Row 2: remaining 2, centered under row 1 */}
        <motion.div
          variants={group(0.28)}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {toolsProjects.slice(3).map((project) => (
            <ProjectCard key={project.slug} project={project} cardHeight={190} />
          ))}
        </motion.div>
      </section>

      {/* ─── SECTION 2: EXPERIMENTS ────────────────────────── */}
      <section
        aria-label="Experiments"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 14,
        }}
      >
        <SectionLabel text="EXPERIMENTS" />

        <motion.div
          variants={group(0.44)}
          style={{ display: "flex", gap: 10, justifyContent: "center" }}
        >
          {experimentProjects.map((project) => (
            <CompactCard
              key={project.slug}
              project={project}
              variant="experimental"
              badge={BADGES[project.slug]}
            />
          ))}
        </motion.div>
      </section>

      {/* ─── SECTION 3: RESEARCH ───────────────────────────── */}
      <section
        aria-label="Research"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 14,
        }}
      >
        <SectionLabel text="RESEARCH" />

        <motion.div
          variants={group(0.56)}
          style={{ display: "flex", gap: 8, justifyContent: "center" }}
        >
          {researchProjects.map((project) => (
            <CompactCard key={project.slug} project={project} variant="academic" />
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
