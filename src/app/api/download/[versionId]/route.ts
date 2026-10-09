import { resolveDownload } from "@/lib/repo";
export async function GET(_: Request, { params }: { params: Promise<{ versionId: string }> }) {
  const r = await resolveDownload((await params).versionId);
  if (!r) return new Response("Not found", { status: 404 });
  if ("redirect" in r) return new Response(null, { status: 302, headers: { Location: r.redirect, "Cache-Control": "no-store" } });
  return new Response(r.mock.text, { headers: { "Content-Type": "application/octet-stream", "Content-Disposition": `attachment; filename="${r.mock.filename}"` } });
}
