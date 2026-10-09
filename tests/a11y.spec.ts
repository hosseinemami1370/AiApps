import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = ["", "/apps", "/app/chatnova", "/app/chatnova/versions/2.0.0", "/submit", "/report", "/about"];
for (const l of ["en", "fa"]) for (const p of paths) test(`a11y ${l}${p}`, async ({ page }) => {
  await page.goto(`/${l}${p}`);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});
