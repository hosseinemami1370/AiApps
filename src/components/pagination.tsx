import Link from "next/link";
import { fmtNum } from "@/lib/i18n";
import { dt } from "@/lib/d";
import type { Locale } from "@/lib/data";
export default function Pagination({ l, base, params, page, pages }: { l: Locale; base: string; params: Record<string, string | undefined>; page: number; pages: number }) {
  if (pages <= 1) return null;
  const href = (p: number) => { const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]); if (p > 1) q.set("page", String(p)); const s = q.toString(); return s ? `${base}?${s}` : base; };
  const c = "rounded-lg border border-black/10 px-3 py-1.5 text-sm hover:border-violet-500 dark:border-white/10";
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 && <Link rel="prev" href={href(page - 1)} className={c}>{dt(l).prev}</Link>}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => <Link key={p} href={href(p)} aria-current={p === page ? "page" : undefined} className={`${c} ${p === page ? "bg-violet-600 text-white" : ""}`}>{fmtNum(p, l)}</Link>)}
      {page < pages && <Link rel="next" href={href(page + 1)} className={c}>{dt(l).next}</Link>}
    </nav>
  );
}
