"use client";

// components/projects/ActionLink.tsx
// External link button with accent-color hover — used on project detail pages.

interface ActionLinkProps {
  href: string;
  label: string;
  accent: string;
}

export default function ActionLink({ href, label, accent }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-rajdhani)",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.1em",
        color: "#7a7f8a",
        background: "none",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: "8px 18px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = accent;
        e.currentTarget.style.borderColor = `${accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#7a7f8a";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M8 1h3v3M11 1L6 6"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}
