"use client";

// components/layout/MotionProvider.tsx
// Wraps the entire app with MotionConfig so that reducedMotion="user"
// is applied globally — all Framer Motion animations automatically
// respect the OS prefers-reduced-motion setting without per-component checks.

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.3 }}>
      {children}
    </MotionConfig>
  );
}
