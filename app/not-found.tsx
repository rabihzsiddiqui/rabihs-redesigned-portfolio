// app/not-found.tsx
// 404 page — matches site design: dark background, Rajdhani display text,
// large "404" number, short message, link back to home.
// Server component — no client hooks needed.

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex h-full flex-col items-center justify-center"
      style={{ paddingBottom: 40 }}
    >
      {/* Large 404 */}
      <div
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          fontSize: "clamp(80px, 18vw, 180px)",
          fontStyle: "italic",
          letterSpacing: "0.02em",
          lineHeight: 1,
          color: "rgba(255,255,255,0.06)",
          userSelect: "none",
          marginBottom: 0,
        }}
        aria-hidden="true"
      >
        404
      </div>

      {/* Message */}
      <h1
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          fontSize: 28,
          color: "#e8eaed",
          letterSpacing: "0.04em",
          margin: "0 0 10px",
          textAlign: "center",
        }}
      >
        PAGE NOT FOUND
      </h1>

      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          color: "#5a5f6a",
          lineHeight: 1.6,
          margin: "0 0 32px",
          textAlign: "center",
          maxWidth: 320,
        }}
      >
        nothing here. the page you are looking for does not exist or was moved.
      </p>

      {/* Back to home */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.1em",
          color: "#00d4ff",
          textDecoration: "none",
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: 6,
          padding: "10px 24px",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transition: "background 0.2s ease",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M8 1L3 6l5 5" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        BACK TO HOME
      </Link>
    </div>
  );
}
