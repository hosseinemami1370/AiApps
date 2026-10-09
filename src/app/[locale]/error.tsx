"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="py-20 text-center"><p className="text-lg font-semibold">Something went wrong · مشکلی پیش آمد</p><button onClick={reset} className="mt-4 rounded-full bg-violet-600 px-6 py-2 text-white">Retry · تلاش مجدد</button></div>;
}
