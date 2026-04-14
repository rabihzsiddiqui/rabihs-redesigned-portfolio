"use client";

// components/projects/ProjectBrowser.tsx
// Two-level Overwatch-style project browser.
//
// Level 1 (default): 3 large category cards — TOOLS / EXPERIMENTS / RESEARCH.
// Level 2 (after click): project cards for the selected category.
//
// Transitions: AnimatePresence mode="wait" — Level 1 fades+scales out,
// Level 2 fades+slides in with staggered card entrance.
//
// ESC from Level 2 → Level 1. ESC from Level 1 → router.push("/").
// Mobile: Level 1 is a stacked vertical list; Level 2 is a horizontal scroll.

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { projects } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";
import CategoryCard, { CATEGORY_DEFS, categoryCardVariant, type CategoryId } from "./CategoryCard";
import ProjectCard, { cardEnterVariant } from "./ProjectCard";
import BackButton from "@/components/layout/BackButton";

// ── Project slug groups ────────────────────────────────────────────────────────

const TOOLS_SLUGS       = ["audora", "compresso", "screen", "pomodoro", "scribe"];
const EXPERIMENTS_SLUGS = ["spectra", "nyra"];
const RESEARCH_SLUGS    = ["restaurant-rating-analysis", "visa"];

const BADGES: Record<string, string> = {
  spectra: "WIP",
  nyra:    "PROTOTYPE",
};

// ── Animation variants ─────────────────────────────────────────────────────────

// Wrapper for Level 1 (category grid)
const level1Variants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// Stagger container inside Level 1
const categoryRowVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

// Wrapper for Level 2 (project grid)
const level2Variants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// Stagger container for project cards
const projectRowVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

// Transparent stagger pass-through for the TOOLS stacked column.
// The column itself has no visual animation — it just re-staggers its children
// after the parent row counts it as index 3 (delay ≈ 0.29s).
const toolsStackColVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryGrid({
  onSelect,
  isMobile,
}: {
  onSelect: (id: CategoryId) => void;
  isMobile: boolean;
}) {
  return (
    <motion.div
      key="level1"
      variants={level1Variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <motion.div
        variants={categoryRowVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 10 : 16,
          width: isMobile ? "100%" : "auto",
          alignItems: isMobile ? "stretch" : "center",
        }}
      >
        {CATEGORY_DEFS.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => onSelect(cat.id)}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function ProjectGrid({
  category,
  isMobile,
}: {
  category: CategoryId;
  isMobile: boolean;
}) {
  const toolsProjects       = TOOLS_SLUGS.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const experimentProjects  = EXPERIMENTS_SLUGS.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const researchProjects    = RESEARCH_SLUGS.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);

  // Mobile: horizontal scroll for all categories
  if (isMobile) {
    const mobileProjects =
      category === "tools"       ? toolsProjects :
      category === "experiments" ? experimentProjects :
                                   researchProjects;

    return (
      <motion.div
        key={`level2-${category}`}
        variants={level2Variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "8px 0 12px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.06) transparent",
          width: "100%",
        }}
      >
        {mobileProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            cardHeight={360}
            badge={BADGES[project.slug]}
          />
        ))}
      </motion.div>
    );
  }

  // Desktop: structured grid per category
  if (category === "tools") {
    // Stacked column dimensions:
    //   rest  120px  hover  200px  height  164px
    // Main 3 cards: 340px tall (default 150/248 widths).
    // Stack column is pre-sized to the hover width so layout never shifts.
    const STACK_HOVER_W = 200;

    return (
      <motion.div
        key="level2-tools"
        variants={level2Variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* Single horizontal row: 3 full-height cards + right-side stack */}
        <motion.div
          variants={projectRowVariants}
          initial="initial"
          animate="animate"
          style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
        >
          {/* Main 3 — indices 0, 1, 2 in the stagger */}
          {toolsProjects.slice(0, 3).map((project) => (
            <motion.div key={project.slug} variants={cardEnterVariant}>
              <ProjectCard project={project} cardHeight={340} />
            </motion.div>
          ))}

          {/* Stacked column — index 3 in the stagger, re-staggers its two children */}
          <motion.div
            variants={toolsStackColVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: STACK_HOVER_W,
              flexShrink: 0,
            }}
          >
            {toolsProjects.slice(3).map((project) => (
              <motion.div key={project.slug} variants={cardEnterVariant}>
                <ProjectCard
                  project={project}
                  cardHeight={164}
                  restWidth={120}
                  hoverWidth={STACK_HOVER_W}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  if (category === "experiments") {
    return (
      <motion.div
        key="level2-experiments"
        variants={level2Variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <motion.div
          variants={projectRowVariants}
          initial="initial"
          animate="animate"
          style={{ display: "flex", gap: 10 }}
        >
          {experimentProjects.map((project) => (
            <motion.div key={project.slug} variants={cardEnterVariant}>
              <ProjectCard
                project={project}
                cardHeight={320}
                badge={BADGES[project.slug]}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // research
  return (
    <motion.div
      key="level2-research"
      variants={level2Variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <motion.div
        variants={projectRowVariants}
        initial="initial"
        animate="animate"
        style={{ display: "flex", gap: 10 }}
      >
        {researchProjects.map((project) => (
          <motion.div key={project.slug} variants={cardEnterVariant}>
            <ProjectCard project={project} cardHeight={320} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function ProjectBrowser() {
  const [selected, setSelected] = useState<CategoryId | null>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleBack = useCallback(() => setSelected(null), []);

  // ESC key: Level 2 → Level 1, Level 1 → home
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selected) {
        handleBack();
      } else {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, handleBack, router]);

  const selectedCat = CATEGORY_DEFS.find((c) => c.id === selected);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginBottom: isMobile ? 16 : 0 }}>
        <h1
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 56px)",
            fontStyle: "italic",
            color: "#e8eaed",
            letterSpacing: "0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          PROJECTS
        </h1>

        {/* Breadcrumb or count — animated transition */}
        <div
          style={{
            paddingBottom: "clamp(4px, 1vw, 10px)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {selected && selectedCat ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                <span style={{ color: "#3a3f4a" }}>›</span>
                <span style={{ color: selectedCat.color }}>{selectedCat.name}</span>
              </motion.div>
            ) : (
              <motion.div
                key="count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  color: "#3a3f4a",
                  letterSpacing: "0.06em",
                }}
              >
                {projects.length} PROJECTS
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Content area ────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          overflow: isMobile ? "hidden" : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          {!selected ? (
            <CategoryGrid key="categories" onSelect={setSelected} isMobile={isMobile} />
          ) : (
            <ProjectGrid key={`projects-${selected}`} category={selected} isMobile={isMobile} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {selected ? (
          <BackButton onClick={handleBack} />
        ) : (
          <BackButton href="/" />
        )}
      </div>
    </div>
  );
}
