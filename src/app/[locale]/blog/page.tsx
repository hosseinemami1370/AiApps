import Link from "next/link";
import type { Metadata } from "next";
import { Locale } from "@/lib/data";
import { listPosts } from "@/lib/blog";
import { dt } from "@/lib/d";
import { fmtDate } from "@/lib/i18n";
import { alts } from "@/lib/seo";
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = (await params).locale as Locale; return { title: dt(l).blog, alternates: alts(l, "/blog") }; }
export default async function Blog({ params }: P) {
  const l = (await params).locale as Locale, posts = await listPosts();
  return (
    <div className="space-y-6"><h1 className="text-2xl font-bold">{dt(l).blog}</h1>
      <div className="grid gap-4 sm:grid-cols-2">{posts.map((p) => (
        <Link key={p.slug} href={`/${l}/blog/${p.slug}`} className="overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:shadow-lg dark:border-white/10 dark:bg-white/5">
          <div style={{ background: `linear-gradient(135deg,hsl(${p.hue} 80% 55%),hsl(${(p.hue + 60) % 360} 70% 35%))` }} className="h-28" />
          <div className="space-y-1 p-4"><time className="text-xs text-neutral-500">{fmtDate(p.date, l)}</time><h2 className="font-semibold">{p[l].title}</h2><p className="text-sm text-neutral-500">{p[l].excerpt}</p></div>
        </Link>))}</div></div>
  );
}
