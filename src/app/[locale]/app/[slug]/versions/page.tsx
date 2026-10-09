import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/lib/data";
import { getApp } from "@/lib/repo";
import { t, fmtDate, fmtNum } from "@/lib/i18n";
import { Icon, catName } from "@/components/ui";
import Breadcrumb from "@/components/breadcrumb";
import { alts } from "@/lib/seo";
type P = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params, a = await getApp(slug, locale as Locale);
  return a ? { title: `${a.name} — ${t(locale as Locale).versions}`, alternates: alts(locale, `/app/${slug}/versions`) } : {};
}
export default async function Versions({ params }: P) {
  const { locale, slug } = await params, l = locale as Locale, s = t(l);
  const a = await getApp(slug, l); if (!a) notFound();
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: s.home, path: `/${l}` }, { label: catName(a.category, l), path: `/${l}/category/${a.category}` }, { label: a.name, path: `/${l}/app/${a.slug}` }, { label: s.versions }]} />
      <div className="flex items-center gap-4"><Icon app={a} /><h1 className="text-2xl font-bold">{a.name} — {s.versions}</h1></div>
      <ul className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
        {a.versions.map((x) => (
          <li key={x.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
            <Link className="font-semibold hover:text-violet-600" href={`/${l}/app/${a.slug}/versions/${x.version}`}>v{x.version}{x.isLatest && " ✓"}</Link>
            <span className="text-neutral-500">{fmtDate(x.releasedAt, l)} · {x.sizeMb} MB · {s.android} {x.minAndroid}+ · {fmtNum(x.downloads, l)}</span>
            <a href={`/api/download/${x.id}`} className="rounded-full border px-4 py-1 hover:bg-violet-600 hover:text-white">{s.download}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
