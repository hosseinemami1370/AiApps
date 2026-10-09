import { alts } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { statics } from "@/lib/pages";
type P = { params: Promise<{ locale: string; page: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, page } = await params; return { title: statics[locale as "en" | "fa"]?.[page]?.title, alternates: alts(locale, `/${page}`) }; }
export default async function Static({ params }: P) {
  const { locale, page } = await params, c = statics[locale as "en" | "fa"]?.[page];
  if (!c) notFound();
  return <article className="max-w-2xl space-y-4"><h1 className="text-2xl font-bold">{c.title}</h1>{c.body.map((p) => <p key={p}>{p}</p>)}</article>;
}
