// lib/animations.ts
// Shared Framer Motion variants and transition presets

import { type Variants, type Transition } from "framer-motion";

// ── Transition presets ─────────────────────────────────────

export const transitions = {
  hover: { duration: 0.25, ease: "easeInOut" } satisfies Transition,
  panel: {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,
  page: { duration: 0.3, ease: "easeInOut" } satisfies Transition,
  stagger: { staggerChildren: 0.065, delayChildren: 0.05 } satisfies Transition,
} as const;

// ── Page transition variants ───────────────────────────────

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitions.page },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2, ease: "easeIn" } },
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.page },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ── Stagger list variants (generic) ───────────────────────

export const listVariants: Variants = {
  initial: {},
  animate: { transition: transitions.stagger },
  exit: {},
};

export const listItemVariants: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.panel,
  },
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

// ── Main menu slide-in (matches prototype slideRight keyframe) ─
// Used by MainNav and SecondaryNav with different container timing.
// Container variants are defined inline in each component so the
// delayChildren value can differ (0.1s for primary, 0.3s for secondary).

export const slideInItem: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ── Card expand variants ───────────────────────────────────

export const cardVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.01, transition: transitions.hover },
};

// ── Tab content variants ───────────────────────────────────

export const tabVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};
