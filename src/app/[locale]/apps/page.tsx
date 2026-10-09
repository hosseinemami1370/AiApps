import { alts } from "@/lib/seo";
import type { Metadata } from "next";
import { Locale, cats } from "@/lib/data";
import { listApps } from "@/lib/repo";
import { t } from "@/lib/i18n";
import Pagination from "@/components/pagination";
import { AppCard, catName } from "@/components/ui";
type SP = { q?: string; category?: string; pricing?: string; sort?: string; page?: string };
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const l = (await params).locale as Locale; return { title: t(l).all, alternates: alts(l, "/apps") }; }
export default async function Apps({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }) {
  const l = (await params).locale as Locale, s = t(l), sp = await searchParams;
  const per = 6, req = Math.max(1, Number(sp.page) || 1), { items: list, total } = await listApps({ ...sp, locale: l, page: req, size: per }), pages = Math.max(1, Math.ceil(total / per)), page = Math.min(pages, req);
  const sel = "rounded-lg border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-neutral-900";
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{s.all}</h1>
      <form className="flex flex-wrap gap-2 text-sm">
        <input name="q" aria-label={s.search} defaultValue={sp.q} placeholder={s.search} className={`${sel} min-w-56 flex-1`} />
        <select name="category" aria-label={s.category} defaultValue={sp.category ?? ""} className={sel}><option value="">{s.category}: {s.any}</option>{(Object.keys(cats) as (keyof typeof cats)[]).map((c) => <option key={c} value={c}>{catName(c, l)}</option>)}</select>
        <select name="pricing" aria-label={s.price} defaultValue={sp.pricing ?? ""} className={sel}><option value="">{s.price}: {s.any}</option>{(["free", "freemium", "paid"] as const).map((p) => <option key={p} value={p}>{s[p]}</option>)}</select>
        <select name="sort" aria-label={s.sort} defaultValue={sp.sort ?? ""} className={sel}><option value="">{s.newest}</option><option value="popular">{s.popular}</option></select>
        <button className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white">{s.apply}</button>
      </form>
      {list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <AppCard key={a.slug} app={a} locale={l} />)}</div> : <p className="py-16 text-center text-neutral-500">{s.none}</p>}
      <Pagination l={l} base={`/${l}/apps`} params={{ q: sp.q, category: sp.category, pricing: sp.pricing, sort: sp.sort }} page={page} pages={pages} />
    </div>
  );
}
