// Tiny stand-in for the Java backend (contract: openapi.yaml). Usage: node scripts/fake-api.mjs  (PORT=8080, API_KEY=dev)
import http from "node:http";
const v = (s, n, latest) => ({ id: `${s}-${n}`, version: n, releasedAt: "2026-09-25T00:00:00Z", sizeMb: 40, sha256: "ab".repeat(32), minAndroid: "8.0", downloads: 1000, isLatest: latest, changelog: "Fake changelog" });
const app = (slug, name, category) => ({ slug, name, category, pricing: "free", rating: 4.5, developer: `${name} Labs`, tagline: `${name} tagline`, description: `${name} description`, features: ["Fast"], pros: ["Fast"], cons: ["Needs internet"], faq: [{ q: "Is it free?", a: "Yes." }], versions: [v(slug, "2.0.0", true), v(slug, "1.0.0", false)] });
const apps = [app("chatnova", "ChatNova", "chat"), app("tunegen", "TuneGen", "audio"), app("voxa", "Voxa", "audio")];
const send = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(body === undefined ? "" : JSON.stringify(body)); };
const nf = { title: "Not found", status: 404 };
http.createServer((req, res) => {
  if (req.headers["x-api-key"] !== (process.env.API_KEY ?? "dev")) return send(res, 401, { title: "Unauthorized", status: 401 });
  const u = new URL(req.url, "http://x"), p = u.pathname.replace("/api/v1", "").split("/").filter(Boolean);
  if (req.method === "POST") return p[0] === "downloads" ? !apps.some((a) => a.versions.some((x) => x.id === p[1])) ? send(res, 404, nf) : send(res, 200, { url: `https://example.com/files/${p[1]}.apk`, expiresAt: "2099-01-01T00:00:00Z" }) : send(res, 202);
  if (p[0] === "sitemap-data") return send(res, 200, { apps: apps.map((a) => ({ slug: a.slug, versions: a.versions.map((x) => ({ version: x.version, releasedAt: x.releasedAt })) })) });
  if (p[0] === "apps" && !p[1]) { const c = u.searchParams.get("category"), q = (u.searchParams.get("q") ?? "").toLowerCase(); const f = apps.filter((a) => (!c || a.category === c) && a.name.toLowerCase().includes(q)); return send(res, 200, { items: f.map((a) => ({ ...a, versions: [a.versions[0]] })), total: f.length, page: 1, size: 100 }); }
  const a = apps.find((x) => x.slug === p[1]); if (!a) return send(res, 404, nf);
  if (p[2] === "similar") return send(res, 200, apps.filter((x) => x !== a && x.category === a.category).map((x) => ({ ...x, versions: [x.versions[0]] })));
  if (p[2] === "versions" && p[3]) { const x = a.versions.find((y) => y.version === p[3]); return x ? send(res, 200, x) : send(res, 404, nf); }
  send(res, 200, a);
}).listen(Number(process.env.PORT ?? 8080), () => console.log("fake api up"));
