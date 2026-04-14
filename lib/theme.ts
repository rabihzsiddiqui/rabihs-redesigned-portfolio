// lib/theme.ts
// Color tokens, spacing, and typography config as typed constants.
// These mirror the CSS custom properties in globals.css and serve
// as the TypeScript-friendly reference when building components.

export const colors = {
  bgBase: "#060810",
  bgPanel: "rgba(12, 16, 28, 0.7)",
  bgPanelHover: "rgba(255, 255, 255, 0.02)",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderHover: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#e8eaed",
  textBody: "#b0b4be",
  textSecondary: "#9ca0ab",
  textMuted: "#7a7f8a",
  textDim: "#4a4f5a",
  textGhost: "#2a2f3a",
  accent: "#00d4ff",
  accentGlow: "rgba(0, 212, 255, 0.2)",
  accentBg: "rgba(0, 212, 255, 0.08)",
  success: "#10b981",
} as const;

export const projectColors: Record<string, string> = {
  audora: "#00d4ff",
  compresso: "#a78bfa",
  screen: "#10b981",
  pomodoro: "#f472b6",
  scribe: "#ff6b35",
  spectra: "#fbbf24",
  nyra: "#818cf8",
  "restaurant-rating-analysis": "#34d399",
  visa: "#f87171",
};

export const spacing = {
  panelPadding: "24px",
  panelRadius: "12px",
  cardRadius: "12px",
  buttonRadius: "6px",
  headerHeight: "72px",
  statusHeight: "36px",
} as const;

// Typography class helpers (for use with Tailwind utility strings)
export const typography = {
  display: "font-display font-bold italic",
  heading: "font-display font-bold",
  label: "font-body font-medium text-[10px] uppercase tracking-[0.12em]",
  body: "font-body font-normal text-[14px] leading-[1.7]",
  small: "font-body font-normal text-[12px]",
} as const;
