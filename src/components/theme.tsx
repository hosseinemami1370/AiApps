"use client";
export default function ThemeToggle({ label }: { label: string }) {
  return <button aria-label={label} title={label} onClick={() => { const d = document.documentElement.classList.toggle("dark"); try { localStorage.theme = d ? "dark" : "light"; } catch {} }} className="rounded-full border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10">◐</button>;
}
