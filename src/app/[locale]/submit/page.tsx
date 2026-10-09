import { alts } from "@/lib/seo";
import type { Metadata } from "next";
import Form from "@/components/form";
import { submitApp } from "@/lib/actions";
import { forms } from "@/lib/pages";
type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = (await params).locale as "en" | "fa"; return { title: forms[l].submit.title, alternates: alts(l, "/submit") }; }
export default async function Page({ params }: P) {
  const l = (await params).locale as "en" | "fa", f = forms[l].submit;
  return <div className="space-y-4"><h1 className="text-2xl font-bold">{f.title}</h1><p className="text-neutral-500">{f.intro}</p><Form action={submitApp} fields={f.fields} submit={f.send} ok={f.ok} bad={f.bad} /></div>;
}
