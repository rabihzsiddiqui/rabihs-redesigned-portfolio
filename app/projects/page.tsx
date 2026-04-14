// app/projects/page.tsx — Project selection (/projects)
// Full viewport, no scroll. Background is blurred (handled by BackgroundController).
// Layout: top-left title + count, center card grid, bottom-right back button.
// Mobile title: 36px. Desktop: 56px.

import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectGrid from "@/components/projects/ProjectGrid";
import BackButton from "@/components/layout/BackButton";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of tools, prototypes, and experiments.",
  alternates: {
    canonical: "https://rabih.app/projects",
  },
  openGraph: {
    title: "Projects — Rabih Siddiqui",
    description: "A selection of tools, prototypes, and experiments.",
    url: "https://rabih.app/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div
      className="flex flex-col h-full"
      style={{ padding: "28px 48px 20px" }}
    >
      {/* Top: title + count */}
      <div className="flex items-end" style={{ gap: 20, marginBottom: 0 }}>
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
        <div
          aria-label={`${projects.length} projects total`}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 11,
            color: "#3a3f4a",
            letterSpacing: "0.06em",
            paddingBottom: "clamp(4px, 1vw, 10px)",
          }}
        >
          {projects.length} PROJECTS
        </div>
      </div>

      {/* Center: card grid */}
      <div className="flex flex-1 items-center" style={{ minHeight: 0 }}>
        <ProjectGrid />
      </div>

      {/* Bottom: back button */}
      <div className="flex justify-end">
        <BackButton href="/" />
      </div>
    </div>
  );
}
