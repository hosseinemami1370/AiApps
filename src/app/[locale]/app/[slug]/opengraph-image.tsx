import { ImageResponse } from "next/og";
import { getApp } from "@/lib/repo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = await getApp((await params).slug), h = a?.hue ?? 260;
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: `linear-gradient(135deg,hsl(${h} 80% 55%),hsl(${(h + 50) % 360} 80% 40%))`, color: "white" }}><div style={{ fontSize: 96, fontWeight: 700 }}>{a?.name}</div><div style={{ fontSize: 40, marginTop: 20 }}>{a?.tagline.en}</div><div style={{ fontSize: 32, marginTop: 60, opacity: 0.8 }}>AIFolder · v{a?.versions[0].version}</div></div>, size);
}
