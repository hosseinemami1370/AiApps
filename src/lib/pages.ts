import type { Field } from "@/components/form";
type L = "en" | "fa";
export const nav = { en: { submit: "Submit your app", report: "Report / DMCA", about: "About", contact: "Contact", privacy: "Privacy", disclaimer: "Disclaimer" }, fa: { submit: "ثبت اپلیکیشن", report: "گزارش تخلف / DMCA", about: "درباره ما", contact: "تماس با ما", privacy: "حریم خصوصی", disclaimer: "سلب مسئولیت" } };
export const forms: Record<L, Record<"submit" | "report", { title: string; intro: string; fields: Field[]; send: string; ok: string; bad: string }>> = {
  en: {
    submit: { title: "Submit your app", intro: "Tell us about your AI app. We review every submission.", fields: [["appName", "App name"], ["version", "Version (e.g. 1.2.0)"], ["downloadUrl", "Download or official URL", "url"], ["email", "Contact email", "email"], ["description", "Description (min. 20 characters)", "area"]], send: "Submit", ok: "Thanks! Your app was received.", bad: "Please check the highlighted fields." },
    report: { title: "Report content / DMCA", intro: "If you own rights to a file or content on this site, tell us and we will review and remove it promptly.", fields: [["url", "URL of the page on our site", "url"], ["name", "Your name"], ["email", "Contact email", "email"], ["details", "Details of your claim (min. 20 characters)", "area"]], send: "Send report", ok: "Report received. We will review it shortly.", bad: "Please check the highlighted fields." },
  },
  fa: {
    submit: { title: "ثبت اپلیکیشن", intro: "درباره اپلیکیشن هوش مصنوعی خود به ما بگویید. همه درخواست‌ها بررسی می‌شوند.", fields: [["appName", "نام اپلیکیشن"], ["version", "نسخه (مثلاً 1.2.0)"], ["downloadUrl", "لینک دانلود یا سایت رسمی", "url"], ["email", "ایمیل تماس", "email"], ["description", "توضیحات (حداقل ۲۰ نویسه)", "area"]], send: "ارسال", ok: "ممنون! اپلیکیشن شما دریافت شد.", bad: "لطفاً فیلدهای مشخص‌شده را بررسی کنید." },
    report: { title: "گزارش تخلف / DMCA", intro: "اگر مالک حقوق یک فایل یا محتوا در این سایت هستید، به ما اطلاع دهید تا سریعاً بررسی و حذف شود.", fields: [["url", "نشانی صفحه در سایت ما", "url"], ["name", "نام شما"], ["email", "ایمیل تماس", "email"], ["details", "جزئیات ادعا (حداقل ۲۰ نویسه)", "area"]], send: "ارسال گزارش", ok: "گزارش دریافت شد. به‌زودی بررسی می‌کنیم.", bad: "لطفاً فیلدهای مشخص‌شده را بررسی کنید." },
  },
};
export const statics: Record<L, Record<string, { title: string; body: string[] }>> = {
  en: {
    about: { title: "About", body: ["AIFolder helps you discover AI apps and download every version in one place.", "We organize apps by category, pricing and platform, and keep a clear history of versions."] },
    contact: { title: "Contact", body: ["Questions or feedback? Email us at hello@example.com.", "For copyright claims, please use the Report / DMCA page."] },
    privacy: { title: "Privacy Policy", body: ["We collect only the information you send through our forms (such as your email) and basic analytics.", "We do not sell personal data. Contact us to request deletion of your data.", "Draft text — have it reviewed by legal counsel before launch."] },
    disclaimer: { title: "Disclaimer", body: ["All app names, logos and trademarks belong to their respective owners. AIFolder is not affiliated with them.", "Files are provided as-is. Verify the SHA-256 checksum and use files at your own risk.", "If you hold rights to any content, use the Report / DMCA page and we will review it promptly.", "Draft text — have it reviewed by legal counsel before launch."] },
  },
  fa: {
    about: { title: "درباره ما", body: ["AIFolder به شما کمک می‌کند اپلیکیشن‌های هوش مصنوعی را کشف کنید و همه نسخه‌ها را یک‌جا دانلود کنید.", "اپلیکیشن‌ها بر اساس دسته، قیمت و پلتفرم سازماندهی شده و تاریخچه نسخه‌ها به‌روشنی نگهداری می‌شود."] },
    contact: { title: "تماس با ما", body: ["سوال یا پیشنهاد دارید؟ به hello@example.com ایمیل بزنید.", "برای ادعای کپی‌رایت لطفاً از صفحه گزارش تخلف / DMCA استفاده کنید."] },
    privacy: { title: "سیاست حریم خصوصی", body: ["ما فقط اطلاعاتی را که از طریق فرم‌ها می‌فرستید (مثل ایمیل) و آمار پایه جمع‌آوری می‌کنیم.", "اطلاعات شخصی فروخته نمی‌شود. برای حذف داده‌هایتان با ما تماس بگیرید.", "متن پیش‌نویس است؛ پیش از انتشار توسط مشاور حقوقی بررسی شود."] },
    disclaimer: { title: "سلب مسئولیت", body: ["نام، لوگو و علائم تجاری اپلیکیشن‌ها متعلق به صاحبان آن‌هاست و AIFolder وابسته به آن‌ها نیست.", "فایل‌ها «همان‌گونه که هست» ارائه می‌شوند. checksum را بررسی کنید و با مسئولیت خود استفاده کنید.", "اگر مالک حقوق محتوایی هستید، از صفحه گزارش تخلف / DMCA استفاده کنید تا سریعاً بررسی کنیم.", "متن پیش‌نویس است؛ پیش از انتشار توسط مشاور حقوقی بررسی شود."] },
  },
};
