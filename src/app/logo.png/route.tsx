import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/**
 * A stable, unhashed URL for the brand mark — used by the Organization
 * JSON-LD `logo` field, which needs a predictable URL (Next's file-based
 * icon/apple-icon conventions serve at content-hashed paths, which aren't
 * safe to hardcode into structured data).
 */
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
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
          color: "white",
          fontSize: 280,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        ∑
      </div>
    ),
    { width: 512, height: 512 },
  );
}
