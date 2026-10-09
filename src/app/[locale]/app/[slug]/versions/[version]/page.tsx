import { alts } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "@/lib/data";
import { getVersion } from "@/lib/repo";
import { t, fmtDate, fmtNum } from "@/lib/i18n";
import { Icon, catName } from "@/components/ui";
import Breadcrumb from "@/components/breadcrumb";
type P = { params: Promise<{ locale: string; slug: string; version: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, slug, version } = await params, r = await getVersion(slug, version, locale as Locale); return r?.version ? { title: `${r.app.name} v${version} APK`, alternates: alts(locale, `/app/${slug}/versions/${version}`) } : {}; }
export default async function VersionPage({ params }: { params: Promise<{ locale: string; slug: string; version: string }> }) {
  const { locale, slug, version } = await params, l = locale as Locale, s = t(l);
  const r = await getVersion(slug, version, l); if (!r?.version) notFound();
  const { app: a, version: v } = r;
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: s.home, path: `/${l}` }, { label: catName(a.category, l), path: `/${l}/category/${a.category}` }, { label: a.name, path: `/${l}/app/${a.slug}` }, { label: s.versions, path: `/${l}/app/${a.slug}/versions` }, { label: `v${v.version}` }]} />
      <div className="flex items-center gap-4"><Icon app={a} /><h1 className="text-2xl font-bold">{a.name} v{v.version}</h1></div>
      {!v.isLatest && <div className="rounded-xl bg-amber-100 p-4 text-amber-900">{s.old} <Link className="font-semibold underline" href={`/${l}/app/${a.slug}`}>{s.latest_}</Link></div>}
      <a href={`/api/download/${v.id}`} className="inline-block rounded-full bg-violet-600 px-8 py-3 font-semibold text-white">{s.download} ({v.sizeMb} MB)</a>
      <dl className="space-y-2 rounded-2xl border border-black/10 bg-white p-5 text-sm dark:border-white/10 dark:bg-white/5">
        {[[s.updated, fmtDate(v.releasedAt, l)], [s.android, `${v.minAndroid}+`], [s.downloads, fmtNum(v.downloads, l)], ["SHA-256", v.sha256]].map(([k, val]) => <div key={k} className="flex justify-between gap-3"><dt className="text-neutral-500">{k}</dt><dd className="break-all font-mono text-xs font-medium">{val}</dd></div>)}
      </dl>
      <h2 className="text-lg font-bold">{s.changelog}</h2><p>{v.changelog[l]}</p>
    </div>
  );
}
