"use client";

// components/contact/ContactButton.tsx
// 38×38 envelope icon button. Click toggles a dropdown with copy + mailto.
// Click-outside closes the dropdown.
// Mobile: dropdown is full-width (positioned relative to viewport via CSS class).

import { useEffect, useRef, useState } from "react";
import { identity } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";

export default function ContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact — open email options"
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: open ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.04)",
          border: open
            ? "1px solid rgba(0,212,255,0.3)"
            : "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          transition: "background 0.25s ease, border-color 0.25s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = "rgba(0,212,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="14" height="10" rx="2" stroke="#00d4ff" strokeWidth="1.3" />
          <path d="M2 6l7 4.5L16 6" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        role="dialog"
        aria-label="Contact options"
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          // Mobile: stretch toward left edge; desktop: fixed min-width from right
          ...(isMobile
            ? { right: 0, left: "calc(-1 * (100vw - 80px - 32px))", minWidth: "unset" }
            : { right: 0, minWidth: 240 }),
          background: "rgba(10,12,20,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "14px 16px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: open ? "auto" : "none",
          zIndex: 200,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "#4a4f5a",
            marginBottom: 10,
          }}
        >
          GET IN TOUCH
        </div>

        {/* Email display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6,
            padding: "10px 12px",
            marginBottom: 10,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: isMobile ? 11 : 13,
              color: "#c8cad0",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {identity.email}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleCopy}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: copied ? "#10b981" : "#9ca0ab",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!copied)
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                COPIED
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M8 4V2.5A1.5 1.5 0 006.5 1h-4A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" stroke="currentColor" strokeWidth="1.1" />
                </svg>
                COPY
              </>
            )}
          </button>

          <a
            href={`mailto:${identity.email}`}
            aria-label="Send email"
            style={{
              flex: 1,
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 6,
              padding: "8px 12px",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#00d4ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,212,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,212,255,0.1)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#00d4ff" strokeWidth="1.1" />
              <path d="M1 3l5 3.5L11 3" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            EMAIL
          </a>
        </div>
      </div>
    </div>
  );
}
