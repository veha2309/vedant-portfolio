import { defineConfig } from "@playwright/test";
const remote = process.env.PORTFOLIO_TEST_URL;
export default defineConfig({
  testDir: "./tests",
  workers: 1,
  use: {
    baseURL: remote || "http://127.0.0.1:4174",
    channel: "chrome",
    viewport: { width: 1440, height: 1000 },
  },
  webServer: remote
    ? undefined
    : {
        command: "npm run preview -- --host 127.0.0.1 --port 4174",
        url: "http://127.0.0.1:4174",
        reuseExistingServer: true,
      },
});
