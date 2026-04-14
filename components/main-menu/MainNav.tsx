"use client";

// components/main-menu/MainNav.tsx
// Primary stacked navigation for the main menu: PROJECTS and ABOUT.
//
// Responsive font sizes (via useBreakpoint):
//   Desktop (1024+): PROJECTS=68px, ABOUT=52px
//   Tablet (768-1023): PROJECTS=52px, ABOUT=38px
//   Mobile (<768): PROJECTS=42px, ABOUT=30px
//
// Hover: CSS transitions — color, translateX, textShadow, accent bar.
// Mobile: hover transitions replaced by tap-to-highlight (but link navigates on tap).

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { slideInItem } from "@/lib/animations";
import { useIsMobile, useIsTablet } from "@/lib/useMediaQuery";

type HoveredItem = "PROJECTS" | "ABOUT" | null;

interface NavItemConfig {
  id: "PROJECTS" | "ABOUT";
  label: string;
  href: string;
  // Desktop font size
  fontSize: number;
  // Tablet font size
  fontSizeTablet: number;
  // Mobile font size
  fontSizeMobile: number;
  lineHeight: number;
  defaultColor: string;
  barHeight: number;
  shift: number;
  glowOpacity: number;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "PROJECTS",
    label: "PROJECTS",
    href: "/projects",
    fontSize: 68,
    fontSizeTablet: 52,
    fontSizeMobile: 42,
    lineHeight: 1.05,
    defaultColor: "#c8cad0",
    barHeight: 56,
    shift: 10,
    glowOpacity: 0.2,
  },
  {
    id: "ABOUT",
    label: "ABOUT",
    href: "/about",
    fontSize: 52,
    fontSizeTablet: 38,
    fontSizeMobile: 30,
    lineHeight: 1.1,
    defaultColor: "#8a8e98",
    barHeight: 36,
    shift: 8,
    glowOpacity: 0.15,
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export default function MainNav() {
  const [hovered, setHovered] = useState<HoveredItem>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  function getFontSize(item: NavItemConfig) {
    if (isMobile) return item.fontSizeMobile;
    if (isTablet) return item.fontSizeTablet;
    return item.fontSize;
  }

  return (
    <nav aria-label="Main navigation">
      <motion.ul
        initial="initial"
        animate="animate"
        variants={containerVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isHovered = hovered === item.id;
          return (
            <motion.li
              key={item.id}
              variants={slideInItem}
              style={{ position: "relative", padding: "4px 0" }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={item.href}
                prefetch
                style={{ display: "block", textDecoration: "none" }}
                aria-label={item.label}
              >
                <span
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                    fontSize: getFontSize(item),
                    letterSpacing: "0.03em",
                    lineHeight: item.lineHeight,
                    fontStyle: "italic",
                    display: "inline-block",
                    color: isHovered ? "#ffffff" : item.defaultColor,
                    transform: isHovered
                      ? `translateX(${item.shift}px)`
                      : "translateX(0)",
                    textShadow: isHovered
                      ? `0 0 40px rgba(0,212,255,${item.glowOpacity})`
                      : "none",
                    transition:
                      "color 0.25s ease, transform 0.25s ease, text-shadow 0.25s ease",
                  }}
                >
                  {item.label}
                </span>
              </Link>

              {/* Accent bar */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -24,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 4,
                  borderRadius: 2,
                  background: "#00d4ff",
                  boxShadow: "0 0 12px rgba(0,212,255,0.4)",
                  height: isHovered ? item.barHeight : 0,
                  transition: "height 0.25s ease",
                }}
              />
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
