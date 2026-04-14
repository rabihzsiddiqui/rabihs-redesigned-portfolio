"use client";

// app/about/AboutContent.tsx
// Client component for the full About page.
// Receives `initialTab` from the server page component (which read searchParams).
// Tab changes update the URL via router.replace so tabs are linkable.
//
// Responsive:
//   Toolkit: desktop=3col, tablet=2col, mobile=1col
//   Experience: desktop=side-by-side period+role, mobile=period stacks above role
//   Page title: desktop=56px, mobile=36px

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  identity,
  about,
  experiences,
  toolkit,
  certificates,
  education,
  projects,
} from "@/lib/data";
import BackButton from "@/components/layout/BackButton";
import { tabVariants, listVariants, listItemVariants } from "@/lib/animations";
import { useIsMobile, useIsTablet } from "@/lib/useMediaQuery";

type Tab = "OVERVIEW" | "EXPERIENCE" | "TOOLKIT";
const TABS: Tab[] = ["OVERVIEW", "EXPERIENCE", "TOOLKIT"];

interface AboutContentProps {
  initialTab: Tab;
}

export default function AboutContent({ initialTab }: AboutContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    router.replace(`/about?tab=${tab}`, { scroll: false });
  }

  return (
    <div className="flex flex-col h-full" style={{ padding: isMobile ? "20px 20px 16px" : "28px 48px 20px" }}>
      {/* Page title */}
      <div style={{ marginBottom: 0 }}>
        <h1
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            fontSize: isMobile ? 36 : 56,
            fontStyle: "italic",
            color: "#e8eaed",
            letterSpacing: "0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          ABOUT
        </h1>
      </div>

      {/* Scrollable content area */}
      <div
        className="flex flex-1 justify-center"
        style={{ overflowY: "auto", paddingTop: isMobile ? 20 : 32, minHeight: 0 }}
      >
        <div style={{ width: "100%", maxWidth: 860, paddingBottom: 40 }}>
          {/* Profile header */}
          <div
            className="flex items-center"
            style={{ gap: 18, marginBottom: 24 }}
          >
            {/* Monogram badge */}
            <div
              style={{
                width: isMobile ? 52 : 68,
                height: isMobile ? 52 : 68,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))",
                border: "1px solid rgba(0,212,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                fontSize: isMobile ? 20 : 26,
                color: "#00d4ff",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              R
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  fontSize: isMobile ? 18 : 26,
                  color: "#e8eaed",
                  letterSpacing: "0.04em",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {identity.name.toUpperCase()}
              </h2>

              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  color: "#7a7f8a",
                  marginTop: 2,
                }}
              >
                {identity.title}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap" style={{ gap: 10, marginTop: 8 }}>
                {[
                  { value: education.year.replace("Class of ", ""), label: "Graduation" },
                  { value: `${projects.length}`, label: "Projects" },
                  { value: identity.timezone, label: "Timezone" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline"
                    style={{ gap: 4 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#00d4ff",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 10,
                        color: "#4a4f5a",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="About sections"
            className="flex"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              marginBottom: 24,
            }}
          >
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`tab-panel-${tab}`}
                  id={`tab-${tab}`}
                  onClick={() => switchTab(tab)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: isMobile ? "8px 14px" : "10px 20px",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: active ? 700 : 500,
                    fontSize: isMobile ? 11 : 13,
                    letterSpacing: "0.12em",
                    color: active ? "#e8eaed" : "#5a5f6a",
                    position: "relative",
                    transition: "color 0.2s ease",
                  }}
                >
                  {tab}
                  {active && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: -1,
                        left: isMobile ? 14 : 20,
                        right: isMobile ? 14 : 20,
                        height: 2,
                        background: "#00d4ff",
                        borderRadius: 1,
                        boxShadow: "0 0 8px rgba(0,212,255,0.3)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
            >
              {activeTab === "OVERVIEW" && <OverviewTab />}
              {activeTab === "EXPERIENCE" && <ExperienceTab isMobile={isMobile} />}
              {activeTab === "TOOLKIT" && <ToolkitTab isMobile={isMobile} isTablet={isTablet} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Back button */}
      <div className="flex justify-end" style={{ paddingTop: 12 }}>
        <BackButton href="/" />
      </div>
    </div>
  );
}

// ── Overview tab ──────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      {/* Bio */}
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
        {about.background.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              color: "#b0b4be",
              lineHeight: 1.75,
              margin: i === 0 ? 0 : "14px 0 0 0",
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Currently */}
      <div
        style={{
          background: "rgba(12,14,22,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          padding: "18px 26px",
        }}
      >
        <div
          className="flex items-center"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "#5a5f6a",
            marginBottom: 10,
            gap: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00d4ff",
              boxShadow: "0 0 6px rgba(0,212,255,0.3)",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          CURRENTLY
        </div>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13,
            color: "#9ca0ab",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {about.currently}
        </p>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div
          style={{
            background: "rgba(12,14,22,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "18px 26px",
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
            IN PROGRESS
          </div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {certificates.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between">
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      color: "#c8cad0",
                    }}
                  >
                    {cert.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 11,
                      color: "#4a4f5a",
                      marginLeft: 8,
                    }}
                  >
                    {cert.provider}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    color: "#00d4ff",
                    letterSpacing: "0.06em",
                  }}
                >
                  {cert.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Experience tab ─────────────────────────────────────────────

function ExperienceTab({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: 2 }}
      variants={listVariants}
      initial="initial"
      animate="animate"
    >
      {experiences.map((exp, i) => (
        <motion.div
          key={`${exp.company}-${i}`}
          variants={listItemVariants}
          // Mobile: flex-col (period above role), Desktop: flex-row
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 4 : 20,
            padding: "16px 22px",
            borderRadius: 8,
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
          }}
        >
          {/* Period */}
          <div
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#4a4f5a",
              minWidth: isMobile ? undefined : 110,
              paddingTop: isMobile ? 0 : 2,
              flexShrink: 0,
            }}
          >
            {exp.period}
          </div>

          {/* Role details */}
          <div>
            <div className="flex items-center flex-wrap" style={{ gap: 8 }}>
              <div
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#e8eaed",
                  letterSpacing: "0.03em",
                }}
              >
                {exp.role}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  color: "#3a3f4a",
                  letterSpacing: "0.06em",
                }}
              >
                {exp.type.toUpperCase()}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#00d4ff",
                marginTop: 2,
              }}
            >
              {exp.company}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#5a5f6a",
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              {exp.description}
            </div>
            {exp.tags.length > 0 && (
              <div className="flex flex-wrap" style={{ gap: 6, marginTop: 8 }}>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 10,
                      color: "#4a4f5a",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 4,
                      padding: "2px 8px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Education entry */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <motion.div
          variants={listItemVariants}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 4 : 20,
            padding: "16px 22px",
            borderRadius: 8,
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#4a4f5a",
              minWidth: isMobile ? undefined : 110,
              paddingTop: isMobile ? 0 : 2,
              flexShrink: 0,
            }}
          >
            {education.year}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8eaed",
                letterSpacing: "0.03em",
              }}
            >
              {education.degree}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#00d4ff",
                marginTop: 2,
              }}
            >
              {education.school}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "#5a5f6a",
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              {education.description}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Toolkit tab ────────────────────────────────────────────────

function ToolkitTab({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  // Desktop: 3-col, Tablet: 2-col, Mobile: 1-col
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 14,
      }}
      variants={listVariants}
      initial="initial"
      animate="animate"
    >
      {toolkit.map((category) => (
        <motion.div
          key={category.name}
          variants={listItemVariants}
          style={{
            background: "rgba(12,14,22,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "18px 20px",
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
            {category.name}
          </div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {category.tools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    color: "#c8cad0",
                  }}
                >
                  {tool.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    color: "#4a4f5a",
                  }}
                >
                  {tool.level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
