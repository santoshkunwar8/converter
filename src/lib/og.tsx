import { ImageResponse } from "next/og";
import { SITE_NAME } from "./constants";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/** Shared visual template for every generated OG image (tools + defaults). */
export function renderOgImage(options: { eyebrow: string; title: string; description?: string }) {
  const { eyebrow, title, description } = options;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ∑
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
            {title}
          </div>
          {description && (
            <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 900 }}>{description}</div>
          )}
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
