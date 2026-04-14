// app/page.tsx — Main menu (/)
// Full-viewport, no scroll. Content vertically centered, left-aligned at 64px.
// The layout wrapper in app/layout.tsx already handles header/status-bar padding,
// so `h-full` here fills the remaining content area.

import type { Metadata } from "next";
import MainNav from "@/components/main-menu/MainNav";
import SecondaryNav from "@/components/main-menu/SecondaryNav";

export const metadata: Metadata = {
  title: "Rabih Siddiqui",
  description:
    "Cognitive Scientist and product-focused developer. Designing and building thoughtful interfaces.",
  alternates: {
    canonical: "https://rabih.app",
  },
};

export default function HomePage() {
  return (
    <main className="flex h-full items-center" style={{ paddingLeft: "clamp(32px, 6vw, 64px)" }}>
      {/* Screen-reader heading — visually hidden, gives the page an h1 for a11y */}
      <h1 className="sr-only">Rabih Siddiqui — Portfolio</h1>

      <div>
        {/* Primary nav: PROJECTS + ABOUT */}
        <MainNav />

        {/* Secondary nav: GITHUB, LINKEDIN, RESUME */}
        <div style={{ marginTop: 32 }}>
          <SecondaryNav />
        </div>
      </div>
    </main>
  );
}
