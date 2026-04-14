// app/projects/page.tsx — Project selection (/projects)
// Full viewport, no scroll. Background is blurred (handled by BackgroundController).
// Layout: top-left title + count, center card grid, bottom-right back button.
// Mobile title: 36px. Desktop: 56px.

import type { Metadata } from "next";
import ProjectBrowser from "@/components/projects/ProjectBrowser";

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
      style={{ padding: "28px clamp(16px, 4vw, 48px) 20px" }}
    >
      <ProjectBrowser />
    </div>
  );
}
