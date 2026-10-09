import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "linear-gradient(135deg,#7c3aed,#d946ef)", color: "white" }}><div style={{ fontSize: 110, fontWeight: 700 }}>AIFolder</div><div style={{ fontSize: 44, marginTop: 20 }}>Discover & download AI apps</div></div>, size);
}
