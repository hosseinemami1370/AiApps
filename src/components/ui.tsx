import Link from "next/link";
import { App, Locale, cats } from "@/lib/data";
import { t, fmtDate, fmtNum } from "@/lib/i18n";
export function Icon({ app, size = 56 }: { app: App; size?: number }) {
  return <div aria-hidden style={{ width: size, height: size, background: `linear-gradient(135deg,hsl(${app.hue} 80% 55%),hsl(${(app.hue + 50) % 360} 80% 45%))` }} className="grid shrink-0 place-items-center rounded-2xl text-xl font-bold text-white">{app.name[0]}</div>;
}
export function AppCard({ app, locale }: { app: App; locale: Locale }) {
  const v = app.versions[0], s = t(locale);
  return (
    <Link href={`/${locale}/app/${app.slug}`} className="group flex gap-4 rounded-2xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
      <Icon app={app} />
      <div className="min-w-0">
        <h3 className="truncate font-semibold">{app.name}</h3>
        <p className="truncate text-sm text-neutral-500">{app.tagline[locale]}</p>
        <p className="mt-1 text-xs text-neutral-500">v{v.version} · {v.sizeMb} MB · {fmtDate(v.releasedAt, locale)} · {s[app.pricing]}</p>
      </div>
    </Link>
  );
}
export const catName = (c: keyof typeof cats, l: Locale) => cats[c][l];
export { fmtNum };
