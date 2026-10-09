import { alts } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale } from "@/lib/data";
import { getApp, getSimilar } from "@/lib/repo";
import { t, fmtDate, fmtNum } from "@/lib/i18n";
import Gallery from "@/components/gallery";
import { dt } from "@/lib/d";
import { AppCard, Icon, catName } from "@/components/ui";
import Breadcrumb from "@/components/breadcrumb";
type P = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params, a = await getApp(slug, locale as Locale);
  return a ? { title: `${a.name} APK`, description: a.tagline[locale as Locale], alternates: alts(locale, `/app/${slug}`) } : {};
}
export default async function AppPage({ params }: P) {
  const { locale, slug } = await params, l = locale as Locale, s = t(l);
  const a = await getApp(slug, l); if (!a) notFound();
  const v = a.versions[0], sim = await getSimilar(a, l);
  const ld = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: a.name, applicationCategory: "MobileApplication", operatingSystem: `Android ${v.minAndroid}+`, softwareVersion: v.version, fileSize: `${v.sizeMb}MB`, aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, ratingCount: v.downloads / 100 } };
  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumb items={[{ label: s.home, path: `/${l}` }, { label: catName(a.category, l), path: `/${l}/category/${a.category}` }, { label: a.name }]} />
      {a.faq[l].length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq[l].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />}
      <section className="flex flex-wrap items-center gap-5">
        <Icon app={a} size={96} />
        <div className="min-w-0 flex-1"><h1 className="text-3xl font-bold">{a.name}</h1><p className="text-neutral-500">{a.tagline[l]}</p><p className="mt-1 text-sm">★ {a.rating} · {catName(a.category, l)} · {s[a.pricing]}</p></div>
        <a href={`/api/download/${v.id}`} className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-700">{s.download} v{v.version} ({v.sizeMb} MB)</a>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2"><p>{a.description[l]}</p><h2 className="text-lg font-bold">{s.features}</h2><ul className="list-disc ps-6">{a.features[l].map((f) => <li key={f}>{f}</li>)}</ul></div>
        <dl className="space-y-2 rounded-2xl border border-black/10 bg-white p-5 text-sm dark:border-white/10 dark:bg-white/5">
          {[[s.version, v.version], [s.size, `${v.sizeMb} MB`], [s.updated, fmtDate(v.releasedAt, l)], [s.android, `${v.minAndroid}+`], [s.dev, a.developer], [s.downloads, fmtNum(v.downloads, l)]].map(([k, val]) => <div key={k} className="flex justify-between gap-3"><dt className="text-neutral-500">{k}</dt><dd className="font-medium">{val}</dd></div>)}
        </dl>
      </section>
      {(a.pros[l].length > 0 || a.cons[l].length > 0) && <section className="grid gap-6 sm:grid-cols-2"><div><h2 className="mb-2 text-lg font-bold">{dt(l).pros}</h2><ul className="space-y-1">{a.pros[l].map((x) => <li key={x}>✓ {x}</li>)}</ul></div><div><h2 className="mb-2 text-lg font-bold">{dt(l).cons}</h2><ul className="space-y-1">{a.cons[l].map((x) => <li key={x}>✕ {x}</li>)}</ul></div></section>}
      <Gallery hue={a.hue} labels={dt(l)} />
      <section><h2 className="mb-3 text-lg font-bold"><Link href={`/${l}/app/${a.slug}/versions`} className="hover:text-violet-600">{s.versions} <span className="inline-block rtl:rotate-180">→</span></Link></h2>
        <ul className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          {a.versions.map((x) => <li key={x.id} className="flex items-center justify-between gap-3 p-4 text-sm"><Link className="font-semibold hover:text-violet-600" href={`/${l}/app/${a.slug}/versions/${x.version}`}>v{x.version}{x.isLatest && " ✓"}</Link><span className="text-neutral-500">{fmtDate(x.releasedAt, l)} · {x.sizeMb} MB</span><a href={`/api/download/${x.id}`} className="rounded-full border px-4 py-1 hover:bg-violet-600 hover:text-white">{s.download}</a></li>)}
        </ul></section>
      {a.faq[l].length > 0 && <section><h2 className="mb-3 text-lg font-bold">{dt(l).faq}</h2><div className="space-y-2">{a.faq[l].map((f) => <details key={f.q} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-neutral-600 dark:text-neutral-300">{f.a}</p></details>)}</div></section>}
      <section><h2 className="mb-3 text-lg font-bold">{s.similar}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sim.map((x) => <AppCard key={x.slug} app={x} locale={l} />)}</div></section>
    </div>
  );
}
