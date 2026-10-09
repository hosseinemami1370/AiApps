import Link from "next/link";
import { site } from "@/lib/seo";
export type Crumb = { label: string; path?: string };
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const ld = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(c.path && { item: site + c.path }) })) };
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-2">{items.map((c, i) => <li key={i} className="flex items-center gap-2">{i > 0 && <span aria-hidden>/</span>}{c.path ? <Link href={c.path} className="hover:text-violet-600">{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}</ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}
