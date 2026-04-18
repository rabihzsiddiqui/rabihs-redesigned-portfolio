"use client";

interface ActionLinkProps {
  href: string;
  label: string;
  accent: string;
}

export default function ActionLink({ href, label, accent }: ActionLinkProps) {
  const isPrimary = label === "LAUNCH";

  if (isPrimary) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.12em",
          color: "#fff",
          background: `${accent}22`,
          border: `1px solid ${accent}60`,
          borderRadius: 6,
          padding: "9px 22px",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${accent}40`;
          e.currentTarget.style.borderColor = accent;
          e.currentTarget.style.boxShadow = `0 0 18px ${accent}30`;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `${accent}22`;
          e.currentTarget.style.borderColor = `${accent}60`;
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Arrow-right icon */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {label}
      </a>
    );
  }

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
        color: "#5a5f6a",
        background: "none",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        padding: "9px 18px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#9ca0ab";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#5a5f6a";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Code brackets icon */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M4 2L1 6l3 4M8 2l3 4-3 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </a>
  );
}
