"use client";
import { useActionState } from "react";
import type { FormState } from "@/lib/actions";
export type Field = [name: string, label: string, type?: string];
export default function Form({ action, fields, submit, ok, bad }: { action: (s: FormState, f: FormData) => Promise<FormState>; fields: Field[]; submit: string; ok: string; bad: string }) {
  const [s, act, pending] = useActionState(action, { status: "idle" } as FormState);
  if (s.status === "ok") return <p className="rounded-xl bg-green-100 p-4 text-green-900">{ok}</p>;
  const cls = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-neutral-900";
  return (
    <form action={act} className="max-w-xl space-y-4">
      {s.status === "error" && <p className="rounded-xl bg-red-100 p-3 text-red-900">{bad}</p>}
      {fields.map(([n, label, type]) => (
        <label key={n} className="block text-sm font-medium">{label}
          {type === "area" ? <textarea name={n} rows={5} required className={`${cls} mt-1`} aria-invalid={s.fields?.includes(n)} /> : <input name={n} type={type ?? "text"} required className={`${cls} mt-1 ${s.fields?.includes(n) ? "border-red-500" : ""}`} dir="auto" />}
        </label>
      ))}
      <button disabled={pending} className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white disabled:opacity-50">{submit}</button>
    </form>
  );
}
