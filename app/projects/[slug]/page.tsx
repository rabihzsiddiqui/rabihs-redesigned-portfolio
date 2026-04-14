// app/projects/[slug]/page.tsx — Project detail (/projects/[slug])
// Static paths generated from lib/data.ts projects array.
// Background is blurred (BackgroundController handles this via pathname match).

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import BackButton from "@/components/layout/BackButton";
import ActionLink from "@/components/projects/ActionLink";

// ── Static generation ─────────────────────────────────────────

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `https://rabih.app/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Rabih Siddiqui`,
      description: project.description,
      url: `https://rabih.app/projects/${project.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const actionLinks = [
    project.liveUrl && { label: "LIVE SITE", href: project.liveUrl },
    project.sourceUrl && { label: "SOURCE", href: project.sourceUrl },
    project.slidesUrl && { label: "SLIDES", href: project.slidesUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div
      className="flex flex-col h-full"
      style={{ padding: "clamp(16px, 3vw, 28px) clamp(20px, 4vw, 48px) 20px" }}
    >
      {/* Project name as page title */}
      <div style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: "clamp(30px, 5vw, 48px)",
            fontStyle: "italic",
            color: "#e8eaed",
            letterSpacing: "0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {project.nameUpper}
        </h1>
      </div>

      {/* Scrollable content area */}
      <div
        className="flex-1"
        style={{ overflowY: "auto", minHeight: 0 }}
      >
        <div style={{ maxWidth: 860, paddingBottom: 40 }}>
          {/* Metadata bar */}
          <div
            className="flex flex-wrap items-center"
            style={{ gap: 16, marginBottom: 28 }}
          >
            {/* Year */}
            <div className="flex items-center" style={{ gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  color: "#4a4f5a",
                  letterSpacing: "0.1em",
                }}
              >
                YEAR
              </span>
              <span
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#9ca0ab",
                  letterSpacing: "0.04em",
                }}
              >
                {project.year}
              </span>
            </div>

            <div
              aria-hidden="true"
              style={{ width: 1, height: 14, background: "rgba(255,255,255,0.06)" }}
            />

            {/* Category */}
            <div className="flex items-center" style={{ gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  color: "#4a4f5a",
                  letterSpacing: "0.1em",
                }}
              >
                TYPE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#9ca0ab",
                  letterSpacing: "0.04em",
                }}
              >
                {project.category}
              </span>
            </div>

            <div
              aria-hidden="true"
              style={{ width: 1, height: 14, background: "rgba(255,255,255,0.06)" }}
            />

            {/* Tags */}
            <div className="flex flex-wrap" style={{ gap: 6 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    color: "#5a5f6a",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    padding: "3px 10px",
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          {actionLinks.length > 0 && (
            <div className="flex flex-wrap" style={{ gap: 10, marginBottom: 32 }}>
              {actionLinks.map((link) => (
                <ActionLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  accent={project.color}
                />
              ))}
            </div>
          )}

          {/* Description panel */}
          <div
            style={{
              background: "rgba(12,14,22,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "22px 26px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: "#5a5f6a",
                marginBottom: 14,
              }}
            >
              ABOUT THIS PROJECT
            </div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                color: "#b0b4be",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Placeholder for Phase 5 case study content */}
          <div
            style={{
              marginTop: 24,
              padding: "18px 24px",
              border: "1px dashed rgba(255,255,255,0.05)",
              borderRadius: 10,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#2a2f3a",
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              Case study content coming in a future update.
            </p>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="flex justify-end" style={{ paddingTop: 12 }}>
        <BackButton href="/projects" />
      </div>
    </div>
  );
}
