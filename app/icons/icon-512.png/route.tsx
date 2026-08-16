// Generates the 512x512 PWA manifest icon: dark square, "R" wordmark, indigo accent.
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
          <span style={{ fontSize: 235, fontWeight: 700, color: "#fafafa", lineHeight: 1 }}>R</span>
          <div style={{ width: 34, height: 34, marginLeft: 10, background: "#6366f1" }} />
        </div>
      </div>
    ),
    size
  );
}
