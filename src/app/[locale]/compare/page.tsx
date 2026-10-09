import type { Metadata } from "next";
import { App, Locale } from "@/lib/data";
import { getApp, listApps } from "@/lib/repo";
import { dt } from "@/lib/d";
import { t, fmtNum } from "@/lib/i18n";
import { catName } from "@/components/ui";
import { alts } from "@/lib/seo";
type P = { params: Promise<{ locale: string }>; searchParams: Promise<{ a?: string; b?: string; c?: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = (await params).locale as Locale; return { title: dt(l).compare, alternates: alts(l, "/compare") }; }
export default async function Compare({ params, searchParams }: P) {
  const l = (await params).locale as Locale, s = t(l), d = dt(l), sp = await searchParams;
  const all = (await listApps({ locale: l, size: 100 })).items;
  const picked = (await Promise.all([sp.a, sp.b, sp.c].map((x) => (x ? getApp(x, l) : undefined)))).filter(Boolean) as App[];
  const rows: [string, (a: App) => string][] = [[s.category, (a) => catName(a.category, l)], [s.price, (a) => s[a.pricing]], [d.rating, (a) => `★ ${a.rating}`], [s.version, (a) => a.versions[0].version], [s.size, (a) => `${a.versions[0].sizeMb} MB`], [s.android, (a) => `${a.versions[0].minAndroid}+`], [s.downloads, (a) => fmtNum(a.versions[0].downloads, l)], [s.dev, (a) => a.developer]];
  const sel = "rounded-lg border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-neutral-900";
  return (
    <div className="space-y-6"><h1 className="text-2xl font-bold">{d.compare}</h1><p className="text-neutral-500">{d.intro}</p>
      <form className="flex flex-wrap gap-2 text-sm">{(["a", "b", "c"] as const).map((k) => <select key={k} name={k} aria-label={d.pick} defaultValue={sp[k] ?? ""} className={sel}><option value="">{d.pick}</option>{all.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}</select>)}<button className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white">{d.go}</button></form>
      {picked.length >= 2 ? <div className="overflow-x-auto"><table className="w-full min-w-[32rem] border-collapse text-sm"><thead><tr><td />{picked.map((a) => <th key={a.slug} scope="col" className="p-3 text-start">{a.name}</th>)}</tr></thead><tbody>{rows.map(([k, f]) => <tr key={k} className="border-t border-black/10 dark:border-white/10"><th scope="row" className="p-3 text-start font-medium text-neutral-500">{k}</th>{picked.map((a) => <td key={a.slug} className="p-3">{f(a)}</td>)}</tr>)}</tbody></table></div> : sp.a || sp.b || sp.c ? <p className="text-neutral-500">{d.needTwo}</p> : null}
    </div>
  );
}
