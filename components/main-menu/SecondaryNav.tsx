"use client";

// components/main-menu/SecondaryNav.tsx
// External links row below primary nav: GITHUB, LINKEDIN, RESUME.
// Rajdhani 600, 16px, very muted by default, brightens on hover.
//
// Entrance: stagger starting at 0.3s with 0.05s between items.
// This matches the prototype timing: first secondary link at 0.3s, last at 0.4s.

import { motion } from "framer-motion";
import { slideInItem } from "@/lib/animations";
import { identity } from "@/lib/data";

const LINKS = [
  { label: "GITHUB", href: identity.github },
  { label: "LINKEDIN", href: identity.linkedin },
  { label: "RESUME", href: "/Rabih_Siddiqui_Resume.pdf" },
];

// Stagger container — secondary links.
// delayChildren: 0.3 gives the visual pause after primary items enter.
const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

export default function SecondaryNav() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      style={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      {LINKS.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={slideInItem}
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "0.1em",
            color: "#4a4f5a",
            textDecoration: "none",
            padding: "3px 0",
            display: "block",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#e8eaed";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#4a4f5a";
          }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
