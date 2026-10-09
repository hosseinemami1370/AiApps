import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale } from "@/lib/data";
import { body, getPost } from "@/lib/blog";
import { fmtDate } from "@/lib/i18n";
import { alts } from "@/lib/seo";
type P = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params, p = await getPost(slug);
  return p ? { title: p[locale as Locale].title, description: p[locale as Locale].excerpt, alternates: alts(locale, `/blog/${slug}`) } : {};
}
export default async function Post({ params }: P) {
  const { locale, slug } = await params, l = locale as Locale, p = await getPost(slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p[l].title, datePublished: p.date, inLanguage: l };
  return (
    <article className="max-w-2xl space-y-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <time className="text-sm text-neutral-500">{fmtDate(p.date, l)}</time><h1 className="text-3xl font-bold">{p[l].title}</h1>
      {body(p, l).map((x) => <p key={x}>{x}</p>)}
    </article>
  );
}
