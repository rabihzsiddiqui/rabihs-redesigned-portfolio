"use client";

// lib/useMediaQuery.ts
// SSR-safe media query hook using useSyncExternalStore (React 18).
// Defaults to false on the server, subscribes on the client.

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    // Subscribe: called by React when it needs to add/remove the listener
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    // Client snapshot: current match state
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    // Server snapshot: always false (no window on server)
    () => false
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}
