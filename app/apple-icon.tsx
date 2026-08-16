// app/apple-icon.tsx
// Reserved Next.js file convention: auto-injects <link rel="apple-touch-icon">.
// iOS ignores the web manifest's icons, so this is what shows on the home screen.
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 82, fontWeight: 700, color: "#fafafa", lineHeight: 1 }}>R</span>
          <div style={{ width: 12, height: 12, marginLeft: 4, background: "#6366f1" }} />
        </div>
      </div>
    ),
    size
  );
}
