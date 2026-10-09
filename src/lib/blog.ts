import type { Locale } from "./data";
import { dt } from "./d";
type T = { title: string; excerpt: string };
export interface Post { slug: string; date: string; hue: number; en: T; fa: T }
export const posts: Post[] = [
  { slug: "best-ai-chatbots-2026", date: "2026-09-28", hue: 260, en: { title: "Best AI chatbot apps in 2026", excerpt: "A quick tour of the chat assistants worth installing this year." }, fa: { title: "بهترین اپ‌های چت‌بات هوش مصنوعی در ۲۰۲۶", excerpt: "مروری سریع بر دستیارهای گفتگویی که امسال ارزش نصب دارند." } },
  { slug: "ai-image-apps-guide", date: "2026-09-18", hue: 320, en: { title: "A beginner's guide to AI image apps", excerpt: "How text-to-image apps work and how to write better prompts." }, fa: { title: "راهنمای مبتدی اپ‌های تصویرسازی هوش مصنوعی", excerpt: "اپ‌های متن‌به‌تصویر چگونه کار می‌کنند و چطور پرامپت بهتری بنویسیم." } },
  { slug: "check-apk-checksum", date: "2026-09-05", hue: 170, en: { title: "How to verify an APK with its SHA-256", excerpt: "A two-minute habit that keeps your device safer." }, fa: { title: "چطور APK را با SHA-256 راستی‌آزمایی کنیم", excerpt: "عادتی دو‌دقیقه‌ای که دستگاه شما را امن‌تر نگه می‌دارد." } },
  { slug: "ai-translation-apps", date: "2026-08-21", hue: 40, en: { title: "AI translation apps compared", excerpt: "Accuracy, speed and offline support across popular translators." }, fa: { title: "مقایسه اپ‌های ترجمه با هوش مصنوعی", excerpt: "دقت، سرعت و پشتیبانی آفلاین در مترجم‌های محبوب." } },
];
export const listPosts = async () => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
export const getPost = async (slug: string) => posts.find((p) => p.slug === slug);
export const body = (p: Post, l: Locale) => [p[l].excerpt, dt(l).more];
