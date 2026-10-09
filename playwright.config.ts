import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests", timeout: 30_000,
  use: { baseURL: "http://localhost:8123", channel: process.env.PW_CHANNEL ?? "chrome" },
  webServer: { command: "npm run build && npx next start -p 8123", url: "http://localhost:8123/en", reuseExistingServer: true, timeout: 180_000 },
  projects: [{ name: "js", testIgnore: /nojs/ }, { name: "nojs", testMatch: /nojs/, use: { javaScriptEnabled: false } }],
});
