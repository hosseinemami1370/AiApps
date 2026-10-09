"use server";
import { z } from "zod";
import { DATA_SOURCE, apiPost } from "./api";
export type FormState = { status: "idle" | "ok" | "error"; fields?: string[] };
const submitSchema = z.object({ appName: z.string().min(2).max(80), version: z.string().regex(/^\d+(\.\d+){0,3}$/), downloadUrl: z.url(), email: z.email(), description: z.string().min(20).max(1000) });
const reportSchema = z.object({ url: z.url(), name: z.string().min(2).max(80), email: z.email(), details: z.string().min(20).max(2000) });
async function run(schema: z.ZodType, fd: FormData, path: string): Promise<FormState> {
  const r = schema.safeParse(Object.fromEntries(fd));
  if (!r.success) return { status: "error", fields: r.error.issues.map((i) => String(i.path[0])) };
  if (DATA_SOURCE === "api") { try { await apiPost(path, r.data); } catch { return { status: "error", fields: [] }; } }
  return { status: "ok" };
}
export async function submitApp(_: FormState, fd: FormData) { return run(submitSchema, fd, "/submissions"); }
export async function reportAbuse(_: FormState, fd: FormData) { return run(reportSchema, fd, "/reports"); }
