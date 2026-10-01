import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://127.0.0.1:4174/");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.loading = "eager";
      await img.decode().catch(() => {});
    }
  });
  await page.screenshot({
    path: `artifacts/portfolio-${width}.png`,
    fullPage: true,
  });
  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `artifacts/portfolio-about-${width}.png` });
}
await page.goto("http://127.0.0.1:4174/projects/mahila-mitr");
await page.screenshot({ path: "artifacts/mahila-mobile.png", fullPage: true });
console.log(JSON.stringify({ errors }));
await browser.close();
