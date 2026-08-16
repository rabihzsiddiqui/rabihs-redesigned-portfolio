// Generates the maskable 512x512 PWA icon. Background fills the full canvas edge-to-edge
// and the wordmark is kept inside the ~safe-zone circle so OS icon masks don't clip it.
import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function GET() {
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
          <span style={{ fontSize: 150, fontWeight: 700, color: "#fafafa", lineHeight: 1 }}>R</span>
          <div style={{ width: 22, height: 22, marginLeft: 6, background: "#6366f1" }} />
        </div>
      </div>
    ),
    size
  );
}
