"use client";

// components/background/BackgroundController.tsx
// Reads the current pathname and passes the `blurred` prop to AnimatedBackground.
// Lives in the root layout so blur transitions happen on every route change
// without duplicating the background element.
// Blurred routes: /projects and /projects/[slug].

import { usePathname } from "next/navigation";
import AnimatedBackground from "./AnimatedBackground";

export default function BackgroundController() {
  const pathname = usePathname();
  const blurred = pathname.startsWith("/projects") || pathname.startsWith("/about");
  return <AnimatedBackground blurred={blurred} />;
}
