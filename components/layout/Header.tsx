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
  const containerRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: "GitHub", href: identity.github },
    { label: "LinkedIn", href: identity.linkedin },
    { label: "Resume", href: "#" },
  ];

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

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
        {/* Avatar */}
        <div style={{ width: 38, flexShrink: 0, position: "relative" }}>
          <Image
            src="/RabihVector.png"
            alt="Rabih Siddiqui"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: "rgba(0,212,255,0.15)", flexShrink: 0 }} />

        {/* Name section with Geisel background — hidden on mobile */}
        <div
          className="hidden sm:block"
          style={{ position: "relative", padding: "0 14px", minWidth: 210 }}
        >
          {/* Geisel background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/Geisel.png')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          />
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
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          background: "rgba(10,12,20,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "14px 18px",
          minWidth: 190,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: open ? "auto" : "none",
          zIndex: 200,
        }}
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
  );
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
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
        fontSize: 12,
        color: "#7a7f8a",
        textDecoration: "none",
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
