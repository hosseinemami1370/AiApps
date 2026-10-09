export const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const alts = (l: string, path = "") => ({ canonical: `/${l}${path}`, languages: { en: `/en${path}`, fa: `/fa${path}`, "x-default": `/en${path}` } });
