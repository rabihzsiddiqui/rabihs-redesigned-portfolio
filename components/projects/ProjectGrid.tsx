"use client";

// components/projects/ProjectGrid.tsx
// Horizontal row of project cards.
//
// Desktop/tablet: flex row, gap 14px, horizontal scroll, cards expand on hover.
// Mobile: scroll-snap container, one card per view (80vw wide cards snap to center).

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { useIsMobile } from "@/lib/useMediaQuery";

const gridContainerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export default function ProjectGrid() {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={gridContainerVariants}
      role="list"
      aria-label="Projects"
      style={{
        display: "flex",
        gap: isMobile ? 12 : 14,
        alignItems: "center",
        justifyContent: isMobile ? undefined : "center",
        overflowX: "auto",
        // Mobile: scroll-snap
        scrollSnapType: isMobile ? "x mandatory" : undefined,
        WebkitOverflowScrolling: "touch",
        // Padding so card glow and the accent glow bar aren't clipped
        padding: isMobile ? "8px 10vw 12px" : "8px 48px 12px",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.06) transparent",
        width: "100%",
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}
