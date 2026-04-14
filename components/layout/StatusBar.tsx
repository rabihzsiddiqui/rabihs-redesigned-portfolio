"use client";

// components/layout/StatusBar.tsx
// Fixed bottom bar: portfolio version label on the left, live 24hr clock on the right.
// Hidden on mobile (<768px) via the .status-bar CSS class in globals.css.

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="status-bar fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between"
      aria-label="Portfolio status"
      style={{
        height: 36,
        padding: "0 32px",
        background: "rgba(6,8,13,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Left: labels */}
      <div className="flex items-center" style={{ gap: 16 }}>
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            color: "#2a2f3a",
            letterSpacing: "0.1em",
          }}
        >
          PORTFOLIO v4.0
        </span>
        <div
          aria-hidden="true"
          style={{
            width: 1,
            height: 12,
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            color: "#2a2f3a",
            letterSpacing: "0.06em",
          }}
        >
          DESIGN + DEVELOPMENT
        </span>
      </div>

      {/* Right: live clock */}
      <time
        aria-label={`Current time: ${time}`}
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: 12,
          fontWeight: 600,
          color: "#2a2f3a",
          letterSpacing: "0.08em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time}
      </time>
    </footer>
  );
}
