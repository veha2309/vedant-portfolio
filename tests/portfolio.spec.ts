import { test, expect } from "@playwright/test";
import { projects } from "../src/data/project";
test("all case studies reload and return to selected work", async ({
  page,
}) => {
  for (const project of projects) {
    await page.goto(`/projects/${project.slug}`);
    await expect(
      page.getByRole("heading", { name: project.title, exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Engineering decisions", exact: true }),
    ).toBeVisible();
    await page.getByRole("link", { name: "← Selected work" }).click();
    await expect(page).toHaveURL(/#work/);
  }
});
test("projects, anchors, contact prompt, unknown route and no backend UI", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "VedantShukla.",
  );
  await expect(page.locator(".project")).toHaveCount(5);
  await expect(page.locator(".project").last()).toContainText("Mahila Mitr");
  await page.getByRole("link", { name: "Contact me" }).click();
  await expect(page).toHaveURL(/#contact/);
  await page.locator(".contact-email").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Stay here" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("link", { name: "GitHub ↗", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("github.com");
  await page.keyboard.press("Escape");
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: /A wrong turn/ }),
  ).toBeVisible();
});
for (const width of [360, 390, 768, 1024, 1440])
  test(`no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/projects/mahila-mitr"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBeTruthy();
    }
  });
test("reduced motion and keyboard skip link", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});
