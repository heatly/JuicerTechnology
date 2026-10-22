import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Juicer Technology: Community-powered. Invention-driven.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#090B11", color: "#F4F6FA", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 34, color: "#C6FF3D", letterSpacing: 6, textTransform: "uppercase" }}>Juicer Technology</div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.02, marginTop: 24, display: "flex", flexDirection: "column" }}>
          <span>Community-powered.</span>
          <span style={{ color: "#FF7A1A" }}>Invention-driven.</span>
        </div>
        <div style={{ fontSize: 30, color: "#A0A8BA", marginTop: 32 }}>AI software · Robotics · Physical AI · 11 Indian cities</div>
      </div>
    ),
    size
  );
}
