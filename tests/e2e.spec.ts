import { test, expect } from "@playwright/test";
for (const l of ["en", "fa"] as const) {
  test.describe(l, () => {
    test("home: lang/dir, h1, search", async ({ page }) => {
      await page.goto(`/${l}`);
      await expect(page.locator("html")).toHaveAttribute("lang", l);
      await expect(page.locator("html")).toHaveAttribute("dir", l === "fa" ? "rtl" : "ltr");
      await expect(page.locator("h1")).toBeVisible();
      await page.locator('input[name="q"]').fill("Voxa");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${l}/apps\\?q=Voxa`));
      await expect(page.getByRole("link", { name: /Voxa/ })).toBeVisible();
    });
    test("filter by category via URL", async ({ page }) => {
      await page.goto(`/${l}/apps?category=audio`);
      await expect(page.getByRole("link", { name: /TuneGen/ })).toBeVisible();
      await expect(page.getByRole("link", { name: /ChatNova/ })).toHaveCount(0);
    });
    test("app → versions → old version warning → download", async ({ page }) => {
      await page.goto(`/${l}/app/chatnova`);
      await expect(page.locator('a[href="/api/download/chatnova-3.0.0"]').first()).toBeVisible();
      await page.goto(`/${l}/app/chatnova/versions/2.0.0`);
      await expect(page.locator(".bg-amber-100")).toBeVisible();
      await expect(page.getByText(/[0-9a-f]{32}/)).toBeVisible();
      const r = await page.request.get("/api/download/chatnova-2.0.0");
      expect(r.headers()["content-disposition"]).toContain("attachment");
    });
    test("language switcher keeps path", async ({ page }) => {
      await page.goto(`/${l}/app/chatnova`);
      const other = l === "en" ? "fa" : "en";
      await page.locator("header nav a").last().click();
      await expect(page).toHaveURL(new RegExp(`/${other}/app/chatnova`));
    });
    test("submit form: invalid then valid", async ({ page }) => {
      await page.goto(`/${l}/submit`);
      await page.locator('form [name="appName"]').fill("X");
      await page.locator('form [name="version"]').fill("abc");
      await page.locator('form [name="downloadUrl"]').fill("https://example.com/a.apk");
      await page.locator('form [name="email"]').fill("a@b.co");
      await page.locator('form [name="description"]').fill("short");
      await page.locator("form button").click();
      await expect(page.locator(".bg-red-100")).toBeVisible();
      await page.locator('form [name="appName"]').fill("My App");
      await page.locator('form [name="version"]').fill("1.0.0");
      await page.locator('form [name="downloadUrl"]').fill("https://example.com/a.apk");
      await page.locator('form [name="email"]').fill("a@b.co");
      await page.locator('form [name="description"]').fill("A helpful AI app for everyone.");
      await page.locator("form button").click();
      await expect(page.locator(".bg-green-100")).toBeVisible();
    });
    test("category page + breadcrumb + faq", async ({ page }) => {
      await page.goto(`/${l}/category/audio`);
      await expect(page.getByRole("link", { name: /TuneGen/ })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
      await page.goto(`/${l}/app/chatnova/versions`);
      await expect(page.locator('a[href$="/versions/1.0.0"]')).toBeVisible();
      await page.goto(`/${l}/app/chatnova`);
      await page.locator("details summary").first().click();
      await expect(page.locator("details[open]")).toHaveCount(1);
    });
    test("404", async ({ page }) => { expect((await page.goto(`/${l}/nope`))?.status()).toBe(404); });
  });
}
