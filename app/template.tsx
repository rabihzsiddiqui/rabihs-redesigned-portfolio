"use client";

// app/template.tsx
// Re-mounts on every navigation in Next.js App Router (unlike layout.tsx).
// This is the recommended hook point for enter animations with Framer Motion.
//
// Each new route causes a fresh mount of this component, so the motion.div
// always runs its initial → animate transition — giving us a smooth fade+slide
// on every page visit. Exit animations are handled implicitly by how quickly
// the old page unmounts relative to the new one entering.

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
