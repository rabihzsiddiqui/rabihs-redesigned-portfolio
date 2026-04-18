"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  escKey?: boolean;
}

export default function BackButton({ href, onClick, escKey }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }

  useEffect(() => {
    if (!escKey) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (onClick) {
        onClick();
      } else if (href) {
        router.push(href);
      } else {
        router.back();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [escKey, href, onClick, router]);

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
      <span aria-hidden="true" className="hidden sm:inline" style={{ fontSize: 10, opacity: 0.5 }}>ESC</span>
      BACK
    </button>
  );
}
