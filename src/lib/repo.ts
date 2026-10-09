import * as mock from "./data";
import type { App, Cat, Locale, Pricing, Version } from "./data";
import { DATA_SOURCE, apiGet, apiPost } from "./api";
import { posts } from "./blog";

type VDto = Omit<Version, "changelog"> & { changelog: string };
type AppDto = Omit<App, "tagline" | "description" | "features" | "versions" | "hue" | "pros" | "cons" | "faq"> & { hue?: number; pros?: string[]; cons?: string[]; faq?: { q: string; a: string }[]; tagline: string; description: string; features: string[]; versions: VDto[] };
const dual = <T,>(x: T): Record<Locale, T> => ({ en: x, fa: x });
const hueOf = (s: string) => Array.from(s).reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
const mapV = (v: VDto): Version => ({ ...v, changelog: dual(v.changelog) });
// The API returns text in the requested locale only; the UI reads text[locale], so the same text is placed under both keys.
const mapApp = (a: AppDto): App => ({ ...a, hue: a.hue ?? hueOf(a.slug), tagline: dual(a.tagline), description: dual(a.description), features: dual(a.features), pros: dual(a.pros ?? []), cons: dual(a.cons ?? []), faq: dual(a.faq ?? []), versions: a.versions.map(mapV) });

export interface ListOpts { q?: string; category?: string; pricing?: string; sort?: string; page?: number; size?: number; locale?: Locale }
export async function listApps(o: ListOpts = {}): Promise<{ items: App[]; total: number }> {
  const page = o.page ?? 1, size = o.size ?? 100;
  if (DATA_SOURCE === "mock") { const all = await mock.listApps(o); return { items: all.slice((page - 1) * size, page * size), total: all.length }; }
  const r = await apiGet<{ items: AppDto[]; total: number }>("/apps", { q: o.q, category: o.category, pricing: o.pricing, sort: o.sort, page, size, locale: o.locale ?? "en" });
  return { items: (r?.items ?? []).map(mapApp), total: r?.total ?? 0 };
}
export async function getApp(slug: string, locale: Locale = "en") {
  if (DATA_SOURCE === "mock") return mock.getApp(slug);
  const r = await apiGet<AppDto>(`/apps/${encodeURIComponent(slug)}`, { locale }, 60);
  return r && mapApp(r);
}
export async function getVersion(slug: string, version: string, locale: Locale = "en") {
  if (DATA_SOURCE === "mock") return mock.getVersion(slug, version);
  const [app, v] = await Promise.all([getApp(slug, locale), apiGet<VDto>(`/apps/${encodeURIComponent(slug)}/versions/${encodeURIComponent(version)}`, { locale }, 60)]);
  return app && { app, version: v && mapV(v) };
}
export async function getSimilar(a: App, locale: Locale = "en") {
  if (DATA_SOURCE === "mock") return mock.getSimilar(a);
  return ((await apiGet<AppDto[]>(`/apps/${encodeURIComponent(a.slug)}/similar`, { locale }, 60)) ?? []).map(mapApp);
}
export type DownloadResult = { redirect: string } | { mock: { filename: string; text: string } } | null;
export async function resolveDownload(versionId: string): Promise<DownloadResult> {
  if (DATA_SOURCE === "mock") { const r = await mock.getDownload(versionId); return r ? { mock: { filename: `${r.app.slug}-${r.version.version}.apk`, text: `Mock file for ${r.app.name} v${r.version.version}\n` } } : null; }
  const r = await apiPost<{ url: string }>(`/downloads/${encodeURIComponent(versionId)}`, {});
  return r ? { redirect: r.url } : null;
}
export async function getSitemapData(): Promise<{ apps: { slug: string; versions: { version: string; releasedAt: string }[] }[]; posts: { slug: string; date: string }[] }> {
  const blog = posts.map((p) => ({ slug: p.slug, date: p.date })); // blog is still mock data
  if (DATA_SOURCE === "mock") return { apps: mock.apps.map((a) => ({ slug: a.slug, versions: a.versions.map((v) => ({ version: v.version, releasedAt: v.releasedAt })) })), posts: blog };
  const r = await apiGet<{ apps: { slug: string; versions: { version: string; releasedAt: string }[] }[] }>("/sitemap-data", {}, 3600);
  return { apps: r?.apps ?? [], posts: blog };
}
export type { Cat, Pricing };
