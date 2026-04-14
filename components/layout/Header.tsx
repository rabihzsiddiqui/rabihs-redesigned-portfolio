"use client";

// components/layout/Header.tsx
// Persistent top bar across all routes.
//
// Desktop: left = wordmark, right = ProfileCorner + ContactButton
// Mobile:  left = R monogram, right = ProfileCorner + ContactButton

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ContactButton from "@/components/contact/ContactButton";
import { identity } from "@/lib/data";

// ── ProfileCorner ─────────────────────────────────────────────────────────────

function ProfileCorner() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { label: "GitHub", href: identity.github },
    { label: "LinkedIn", href: identity.linkedin },
    { label: "Resume", href: "/Rabih_Siddiqui_Resume.pdf" },
  ];

  // Track mobile breakpoint (<768px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop: close when clicking outside (mobile uses backdrop instead)
  useEffect(() => {
    if (!open || isMobile) return;
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
  }, [open, isMobile]);

  function handleMouseEnter() {
    if (isMobile) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }

  const dropdownStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        top: 72,
        right: 16,
        left: "auto",
        minWidth: 200,
        maxWidth: "calc(100vw - 32px)",
        background: "rgba(10,12,20,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "14px 18px",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        pointerEvents: open ? "auto" : "none",
        zIndex: 201,
      }
    : {
        position: "absolute",
        top: "calc(100% + 10px)",
        left: 0,
        right: 0,
        background: "rgba(10,12,20,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "14px 18px",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        pointerEvents: open ? "auto" : "none",
        zIndex: 200,
      };

  return (
    <>
      {/* Mobile backdrop — closes dropdown on tap */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 199,
            background: "rgba(0,0,0,0.35)",
          }}
        />
      )}

      <div
        ref={containerRef}
        style={{ position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Name card: avatar + Geisel background + name */}
        <button
          aria-label="Profile menu"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "stretch",
            height: 38,
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 8,
            overflow: "hidden",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            boxShadow: open ? "0 0 16px rgba(0,212,255,0.12)" : "none",
          }}
        >
          {/* Avatar — object-position top keeps the face visible */}
          <div style={{ width: 38, flexShrink: 0, position: "relative" }}>
            <Image
              src="/RabihVector.png"
              alt="Rabih Siddiqui"
              fill
              sizes="38px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Divider — only shown alongside the name panel */}
          <div className="hidden md:block" style={{ width: 1, background: "rgba(0,212,255,0.15)", flexShrink: 0 }} />

          {/* Name section with Geisel background — hidden below md (768px) */}
          <div
            className="hidden md:block"
            style={{ position: "relative", padding: "0 14px", minWidth: 210 }}
          >
            {/* Geisel background */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <Image
                src="/Geisel.png"
                alt=""
                fill
                sizes="(max-width: 768px) 0px, 210px"
                style={{ objectFit: "cover", objectPosition: "65% center", transform: "scale(1.25)", transformOrigin: "center center" }}
              />
            </div>
            {/* Dark gradient: opaque on left for text, fades right to show Geisel */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(6,8,16,0.96) 0%, rgba(6,8,16,0.96) 50%, rgba(6,8,16,0.1) 100%)",
              }}
            />
            {/* Text */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#e8eaed",
                  letterSpacing: "0.06em",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {identity.name.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  color: "#7a7f8a",
                  letterSpacing: "0.03em",
                  fontStyle: "italic",
                }}
              >
                UCSD Bachelor
              </div>
            </div>
          </div>
        </button>

        {/* Dropdown */}
        <div
          role="menu"
          aria-label="Profile links"
          style={dropdownStyle}
        >
          {links.map((link) => (
            <ProfileLink key={link.label} href={link.href} label={link.label} />
          ))}

          <div
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px rgba(16,185,129,0.4)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 10,
                color: "#5a5f6a",
              }}
            >
              {identity.status}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      role="menuitem"
      style={{
        display: "block",
        padding: "6px 0",
        fontFamily: "var(--font-dm-sans)",
        fontSize: 11,
        color: "#7a7f8a",
        textDecoration: "none",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#00d4ff"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#7a7f8a"; }}
    >
      {label}
    </a>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{ height: 72, padding: "0 20px" }}
    >
      {/* Brand */}
      <Link
        href="/"
        aria-label="rabih.app — home"
        style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        {isHome ? (
          // Main route: wordmark at all screen sizes
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: 28,
              color: "#e8eaed",
              letterSpacing: "0.06em",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(0,212,255,0.08)",
            }}
          >
            RABIH.APP
          </span>
        ) : (
          // Sub-routes: muted wordmark only
          <span
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 600,
              fontSize: 14,
              color: "#4a4f5a",
              letterSpacing: "0.08em",
            }}
          >
            RABIH.APP
          </span>
        )}
      </Link>

      {/* Right: profile card + email button */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ProfileCorner />
        <ContactButton />
      </div>
    </header>
  );
}
