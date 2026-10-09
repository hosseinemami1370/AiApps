import type { MetadataRoute } from "next";
import { cats, locales } from "@/lib/data";
import { getSitemapData } from "@/lib/repo";
import { site } from "@/lib/seo";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { apps, posts } = await getSitemapData();
  const paths: [string, string?][] = ["", "/apps", "/blog", "/compare", ...Object.keys(cats).map((c) => `/category/${c}`), "/submit", "/report", "/about", "/contact", "/privacy", "/disclaimer"].map((p) => [p]);
  for (const p of posts) paths.push([`/blog/${p.slug}`, p.date]);
  for (const a of apps) { paths.push([`/app/${a.slug}`, a.versions[0]?.releasedAt], [`/app/${a.slug}/versions`, a.versions[0]?.releasedAt]); for (const v of a.versions) paths.push([`/app/${a.slug}/versions/${v.version}`, v.releasedAt]); }
  return paths.flatMap(([p, d]) => locales.map((l) => ({ url: `${site}/${l}${p}`, ...(d && { lastModified: d }), alternates: { languages: { en: `${site}/en${p}`, fa: `${site}/fa${p}`, "x-default": `${site}/en${p}` } } })));
}
