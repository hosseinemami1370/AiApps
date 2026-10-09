import { test, expect } from "@playwright/test";
test("SSR without JS: content + GET filter form", async ({ page }) => {
  await page.goto("/fa/apps");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator('select[name="category"]').selectOption("audio");
  await page.locator("form button").click();
  await expect(page).toHaveURL(/category=audio/);
  await expect(page.getByRole("link", { name: /TuneGen/ })).toBeVisible();
  await page.goto("/en/app/chatnova");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.getByText("All versions")).toBeVisible();
});
