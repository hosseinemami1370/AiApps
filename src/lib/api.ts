export const DATA_SOURCE = process.env.DATA_SOURCE === "api" ? "api" : "mock";
const base = () => process.env.API_BASE_URL ?? "http://localhost:8080/api/v1";
export class ApiError extends Error { constructor(public status: number, public problem?: unknown) { super(`API error ${status}`); } }
async function call(path: string, init: RequestInit & { next?: { revalidate: number } }) {
  const res = await fetch(base() + path, { ...init, headers: { "Content-Type": "application/json", Accept: "application/json", "X-Api-Key": process.env.API_KEY ?? "" }, signal: AbortSignal.timeout(8000) });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new ApiError(res.status, await res.json().catch(() => undefined));
  return res.status === 204 || res.status === 202 ? undefined : res.json();
}
/** GET (server-side only). revalidate: seconds to cache; omit for no-store. 404 → undefined. */
export function apiGet<T>(path: string, params: Record<string, string | number | undefined> = {}, revalidate?: number) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => [k, String(v)])).toString();
  return call(path + (q ? `?${q}` : ""), revalidate ? { next: { revalidate } } : { cache: "no-store" }) as Promise<T | undefined>;
}
export const apiPost = <T>(path: string, body: unknown) => call(path, { method: "POST", body: JSON.stringify(body), cache: "no-store" }) as Promise<T | undefined>;
