// Generates the 192x192 PWA manifest icon: dark square, "R" wordmark, indigo accent.
import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
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
          <span style={{ fontSize: 88, fontWeight: 700, color: "#fafafa", lineHeight: 1 }}>R</span>
          <div style={{ width: 13, height: 13, marginLeft: 4, background: "#6366f1" }} />
        </div>
      </div>
    ),
    size
  );
}
