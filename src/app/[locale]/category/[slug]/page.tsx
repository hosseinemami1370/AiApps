import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cat, Locale, cats } from "@/lib/data";
import { listApps } from "@/lib/repo";
import { dt } from "@/lib/d";
import { t } from "@/lib/i18n";
import { AppCard, catName } from "@/components/ui";
import Breadcrumb from "@/components/breadcrumb";
import Pagination from "@/components/pagination";
import { alts } from "@/lib/seo";
type P = { params: Promise<{ locale: string; slug: string }>; searchParams: Promise<{ page?: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params, l = locale as Locale;
  if (!(slug in cats)) return {};
  return { title: dt(l).catTitle.replace("{n}", catName(slug as Cat, l)), description: dt(l).catDesc[slug as Cat], alternates: alts(l, `/category/${slug}`) };
}
export default async function Category({ params, searchParams }: P) {
  const { locale, slug } = await params, l = locale as Locale;
  if (!(slug in cats)) notFound();
  const c = slug as Cat, per = 12, req = Math.max(1, Number((await searchParams).page) || 1);
  const { items, total } = await listApps({ category: c, locale: l, page: req, size: per });
  const pages = Math.max(1, Math.ceil(total / per)), page = Math.min(pages, req);
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: t(l).home, path: `/${l}` }, { label: catName(c, l) }]} />
      <h1 className="text-2xl font-bold">{catName(c, l)}</h1>
      <p className="max-w-2xl text-neutral-500">{dt(l).catDesc[c]}</p>
      {items.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((a) => <AppCard key={a.slug} app={a} locale={l} />)}</div> : <p className="py-16 text-center text-neutral-500">{t(l).none}</p>}
      <Pagination l={l} base={`/${l}/category/${c}`} params={{}} page={page} pages={pages} />
    </div>
  );
}
