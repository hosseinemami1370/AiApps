import Link from "next/link";
export default function NotFound() { return <div className="py-20 text-center"><h1 className="text-5xl font-bold">404</h1><p className="mt-2 text-neutral-500">Page not found · صفحه پیدا نشد</p><Link href="/" className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-2 text-white">Home · خانه</Link></div>; }
