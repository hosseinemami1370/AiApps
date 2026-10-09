"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Lang({ locale }: { locale: string }) {
  const p = usePathname().split("/"); p[1] = locale === "en" ? "fa" : "en";
  return <Link href={p.join("/") || "/"} className="rounded-full border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10">{locale === "en" ? "فارسی" : "EN"}</Link>;
}
