import "../globals.css";
import localFont from "next/font/local";
const vazir = localFont({ src: "../fonts/Vazirmatn.woff2", weight: "100 900", display: "swap", variable: "--font-vazir" });
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, locales } from "@/lib/data";
import { t } from "@/lib/i18n";
import { alts } from "@/lib/seo";
import { site } from "@/lib/seo";
import ThemeToggle from "@/components/theme";
import { dt } from "@/lib/d";
import { nav } from "@/lib/pages";
import Lang from "@/components/lang";
export const metadata: Metadata = { metadataBase: new URL(site), openGraph: { siteName: "AIFolder", type: "website" }, title: { default: "AIFolder", template: "%s | AIFolder" }, description: "Discover and download AI apps." };
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale, s = t(l);
  return (
    <html lang={l} dir={l === "fa" ? "rtl" : "ltr"} className={vazir.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.theme;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}" }} /></head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <Link href={`/${l}`} className="text-lg font-bold">AI<span className="text-violet-600">Folder</span></Link>
            <nav className="ms-auto flex items-center gap-4 text-sm"><Link href={`/${l}/apps`}>{s.all}</Link><Link href={`/${l}/blog`}>{dt(l).blog}</Link><Link href={`/${l}/compare`}>{dt(l).compare}</Link><Lang locale={l} /><ThemeToggle label={dt(l).theme} /></nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-black/10 py-6 text-center text-sm text-neutral-500 dark:border-white/10"><nav className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2">{(["submit", "report", "about", "contact", "privacy", "disclaimer"] as const).map((k) => <Link key={k} href={`/${l}/${k}`} className="hover:text-violet-600">{nav[l][k]}</Link>)}</nav>© AIFolder · {s.footer}</footer>
      </body>
    </html>
  );
}
