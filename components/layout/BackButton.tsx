"use client";

// components/layout/BackButton.tsx
// "ESC BACK" bordered button — bottom-right of sub-route pages.
// Navigates to `href` if provided, otherwise browser history back.
// Keyboard: Enter/Space trigger navigation (native button behavior).

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back to previous page"
      style={{
        background: "none",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: "8px 20px",
        cursor: "pointer",
        fontFamily: "var(--font-rajdhani)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.1em",
        color: "#5a5f6a",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.color = "#9ca0ab";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "#5a5f6a";
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.5 }}>ESC</span>
      BACK
    </button>
  );
}
