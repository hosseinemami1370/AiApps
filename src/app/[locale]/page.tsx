import { alts } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, cats, locales } from "@/lib/data";
import { listApps } from "@/lib/repo";
import { t } from "@/lib/i18n";
import { AppCard, catName } from "@/components/ui";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const l = (await params).locale; return { title: { absolute: "AIFolder — AI apps" }, alternates: alts(l) }; }
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  if (!locales.includes(l)) notFound();
  const s = t(l);
  const [latest, popular] = await Promise.all([listApps({ locale: l, size: 6 }), listApps({ sort: "popular", locale: l, size: 6 })]);
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-br from-violet-700 to-fuchsia-700 p-8 text-white md:p-14">
        <h1 className="text-3xl font-bold md:text-5xl">{s.hero}</h1>
        <p className="mt-3 opacity-90">{s.sub}</p>
        <form action={`/${l}/apps`} className="mt-6 flex max-w-xl gap-2">
          <input name="q" aria-label={s.search} placeholder={s.search} className="w-full rounded-full px-5 py-3 text-neutral-900 outline-none" />
          <button className="rounded-full bg-neutral-900 px-6 font-semibold">{s.apply}</button>
        </form>
      </section>
      <section className="flex flex-wrap gap-2">
        {(Object.keys(cats) as (keyof typeof cats)[]).map((c) => <Link key={c} href={`/${l}/category/${c}`} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm hover:border-violet-500 dark:border-white/10 dark:bg-white/5">{catName(c, l)}</Link>)}
      </section>
      <section><h2 className="mb-4 text-xl font-bold">{s.latest}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{latest.items.map((a) => <AppCard key={a.slug} app={a} locale={l} />)}</div></section>
      <section><h2 className="mb-4 text-xl font-bold">{s.popular}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{popular.items.map((a) => <AppCard key={a.slug} app={a} locale={l} />)}</div></section>
    </div>
  );
}
