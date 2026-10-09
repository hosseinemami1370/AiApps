export type Locale = "en" | "fa";
export const locales: Locale[] = ["en", "fa"];
export const cats = {
  chat: { en: "Chatbots", fa: "چت‌بات‌ها" }, image: { en: "Image", fa: "تصویر" },
  writing: { en: "Writing", fa: "نوشتن" }, audio: { en: "Audio", fa: "صدا" },
  translate: { en: "Translation", fa: "ترجمه" },
} as const;
export type Cat = keyof typeof cats;
export type Pricing = "free" | "freemium" | "paid";
export interface Version { id: string; version: string; releasedAt: string; sizeMb: number; sha256: string; minAndroid: string; downloads: number; isLatest: boolean; changelog: Record<Locale, string> }
export interface App { slug: string; name: string; category: Cat; pricing: Pricing; hue: number; rating: number; developer: string; tagline: Record<Locale, string>; description: Record<Locale, string>; features: Record<Locale, string[]>; pros: Record<Locale, string[]>; cons: Record<Locale, string[]>; faq: Record<Locale, { q: string; a: string }[]>; versions: Version[] }

const raw: [string, string, Cat, Pricing, string, string][] = [
  ["chatnova", "ChatNova", "chat", "freemium", "Your everyday AI assistant", "دستیار هوشمند روزمره شما"],
  ["mindly", "Mindly AI", "chat", "free", "Chat, plan and brainstorm", "گفتگو، برنامه‌ریزی و ایده‌پردازی"],
  ["pixelmuse", "PixelMuse", "image", "freemium", "Turn words into stunning art", "تبدیل متن به تصویرهای خیره‌کننده"],
  ["glowup", "GlowUp", "image", "paid", "AI photo enhancer", "بهبود عکس با هوش مصنوعی"],
  ["draftly", "Draftly", "writing", "freemium", "Write better, faster", "بهتر و سریع‌تر بنویسید"],
  ["proseai", "ProseAI", "writing", "paid", "Long-form writing copilot", "همیار نگارش متن‌های بلند"],
  ["tunegen", "TuneGen", "audio", "freemium", "Create songs from a prompt", "ساخت آهنگ از روی یک توضیح"],
  ["voxa", "Voxa", "audio", "freemium", "Lifelike AI voices", "صداهای طبیعی هوش مصنوعی"],
  ["lingua", "Lingua", "translate", "free", "Instant, accurate translation", "ترجمه سریع و دقیق"],
  ["speakeasy", "SpeakEasy", "translate", "freemium", "Live conversation translator", "مترجم گفتگوی زنده"],
  ["artisan", "Artisan", "image", "free", "Sketch to illustration", "از طرح تا تصویرسازی"],
  ["scribe", "Scribe", "audio", "paid", "Meeting notes, automatically", "یادداشت جلسات به‌صورت خودکار"],
];
const hex = (s: string) => Array.from({ length: 8 }, (_, i) => ((s.charCodeAt(i % s.length) * (i + 7)) % 256).toString(16).padStart(2, "0")).join("").repeat(4);
export const apps: App[] = raw.map(([slug, name, category, pricing, en, fa], i) => ({
  slug, name, category, pricing, hue: (i * 37) % 360, rating: +(4 + ((i * 7) % 10) / 10).toFixed(1), developer: `${name} Labs`,
  tagline: { en, fa },
  description: { en: `${name} is an AI app that helps you: ${en.toLowerCase()}. Fast, private and easy to use.`, fa: `${name} یک اپلیکیشن هوش مصنوعی است: ${fa}. سریع، امن و ساده.` },
  features: { en: ["Fast responses", "Works offline for basics", "Regular updates"], fa: ["پاسخ‌های سریع", "قابلیت‌های پایه آفلاین", "به‌روزرسانی منظم"] },
  pros: { en: ["Fast responses", "Clean, simple interface", "Frequent updates"], fa: ["پاسخ‌های سریع", "رابط کاربری ساده و تمیز", "به‌روزرسانی‌های مکرر"] },
  cons: { en: ["Some features need a subscription", "Requires an internet connection"], fa: ["بعضی قابلیت‌ها اشتراک می‌خواهند", "نیاز به اینترنت دارد"] },
  faq: {
    en: [{ q: `Is ${name} free?`, a: pricing === "free" ? `Yes, ${name} is free to use.` : pricing === "freemium" ? `${name} has a free tier; advanced features need a subscription.` : `${name} is a paid app.` }, { q: "Which Android version is required?", a: "Android 8.0 or newer for the latest version." }, { q: "How can I verify the download?", a: "Compare the file's SHA-256 checksum with the value shown on the version page." }],
    fa: [{ q: `آیا ${name} رایگان است؟`, a: pricing === "free" ? `بله، ${name} رایگان است.` : pricing === "freemium" ? `${name} نسخه رایگان دارد و قابلیت‌های پیشرفته اشتراک می‌خواهند.` : `${name} پولی است.` }, { q: "چه نسخه‌ای از اندروید لازم است؟", a: "برای آخرین نسخه، اندروید ۸٫۰ یا بالاتر." }, { q: "چطور دانلود را راستی‌آزمایی کنم؟", a: "مقدار SHA-256 فایل را با مقدار نمایش‌داده‌شده در صفحه نسخه مقایسه کنید." }],
  },
  versions: [0, 1, 2].map((j) => ({
    id: `${slug}-${3 - j}.${i % 5}.0`, version: `${3 - j}.${i % 5}.0`, releasedAt: new Date(Date.UTC(2026, 8 - j * 2, 25 - i)).toISOString(),
    sizeMb: 40 + i * 6 + (2 - j) * 3, sha256: hex(slug + j), minAndroid: j === 0 ? "8.0" : "7.0", downloads: 120000 - i * 7000 - j * 30000, isLatest: j === 0,
    changelog: { en: j === 0 ? "New model, faster startup, bug fixes." : "Stability improvements.", fa: j === 0 ? "مدل جدید، اجرای سریع‌تر و رفع باگ‌ها." : "بهبود پایداری." },
  })),
}));

const wait = () => new Promise((r) => setTimeout(r, 30));
export async function listApps(o: { q?: string; category?: string; pricing?: string; sort?: string } = {}) {
  await wait();
  let r = apps.filter((a) => (!o.category || a.category === o.category) && (!o.pricing || a.pricing === o.pricing) &&
    (!o.q || (a.name + a.tagline.en + a.tagline.fa).toLowerCase().includes(o.q.toLowerCase())));
  r = [...r].sort((a, b) => o.sort === "popular" ? b.versions[0].downloads - a.versions[0].downloads : +new Date(b.versions[0].releasedAt) - +new Date(a.versions[0].releasedAt));
  return r;
}
export async function getApp(slug: string) { await wait(); return apps.find((a) => a.slug === slug); }
export async function getVersion(slug: string, v: string) { const a = await getApp(slug); return a && { app: a, version: a.versions.find((x) => x.version === v) }; }
export async function getSimilar(a: App) { return apps.filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 3); }
export async function getDownload(id: string) {
  for (const a of apps) { const v = a.versions.find((x) => x.id === id); if (v) return { app: a, version: v }; }
}
