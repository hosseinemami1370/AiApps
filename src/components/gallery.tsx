"use client";
import { useRef, useState } from "react";
type Labels = { shots: string; close: string; prev: string; next: string };
export default function Gallery({ hue, labels }: { hue: number; labels: Labels }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0), n = 4;
  const shot = (k: number, big = false) => <div style={{ background: `linear-gradient(160deg,hsl(${(hue + k * 25) % 360} 80% 55%),hsl(${(hue + k * 25 + 60) % 360} 70% 35%))` }} className={`grid aspect-[9/19] place-items-center rounded-2xl text-4xl font-bold text-white ${big ? "h-[65vh]" : "w-36 shrink-0"}`}>{k + 1}</div>;
  const btn = "rounded-full bg-white/15 px-4 py-2 text-xl hover:bg-white/30";
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">{labels.shots}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">{Array.from({ length: n }, (_, k) => <button key={k} aria-label={`${labels.shots} ${k + 1}`} onClick={() => { setI(k); ref.current?.showModal(); }}>{shot(k)}</button>)}</div>
      <dialog ref={ref} aria-label={labels.shots} onClick={(e) => e.target === ref.current && ref.current?.close()} className="m-auto rounded-2xl bg-neutral-900 p-5 text-white backdrop:bg-black/70">
        <div className="flex items-center gap-4">
          <button className={btn} aria-label={labels.prev} onClick={() => setI((i + n - 1) % n)}><span className="inline-block rtl:rotate-180">‹</span></button>
          {shot(i, true)}
          <button className={btn} aria-label={labels.next} onClick={() => setI((i + 1) % n)}><span className="inline-block rtl:rotate-180">›</span></button>
        </div>
        <button className="mx-auto mt-4 block rounded-full border px-5 py-1" onClick={() => ref.current?.close()}>{labels.close}</button>
      </dialog>
    </section>
  );
}
