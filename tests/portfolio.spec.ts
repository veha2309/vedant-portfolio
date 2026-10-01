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
    for (const route of ["/", ...projects.map(project=>`/projects/${project.slug}`)]) {
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

test("Back restores selected work and all local media loads", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View projects" }).click();
  await page.locator(".project").first().click();
  await expect(page).toHaveURL(/projects\/financeflow/);
  await page.goBack();
  await expect(page).toHaveURL(/#work/);
  await page.evaluate(async () => {
    for (const image of document.images) {
      image.loading = "eager";
      await image.decode();
    }
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBeTruthy();
});

test("full-screen menu traps focus, closes on Escape, and navigates at mobile widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link", { name: /Home/ })).toBeFocused();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(nav.getByRole("link", { name: /Contact/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await page.getByRole("button", { name: "Open menu" }).click();
  await nav.getByRole("link", { name: /Experience/ }).click();
  await expect(page).toHaveURL(/#experience/);
  await expect(nav).toHaveCount(0);
});

test("single canvas carries the introduction through all projects and supports chapter skips", async ({ page }) => {
  await page.setViewportSize({ width:1440,height:1000 });
  await page.goto("/");
  await page.waitForTimeout(600);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const start=await page.locator(".portfolio-film").evaluate(el=>el.getBoundingClientRect().top+scrollY-90);
  const before=await page.locator(".film-track").evaluate(el=>getComputedStyle(el).transform);
  await page.evaluate(y=>scrollTo({top:y,behavior:"instant"}),start+1300);
  await page.waitForTimeout(1000);
  expect(await page.locator(".film-track").evaluate(el=>getComputedStyle(el).transform)).not.toBe(before);
  await page.screenshot({path:"artifacts/gallery-finance.png"});
  for (const slug of ["vision-assistant","mahila-mitr"]) {
    await page.locator(`.story-jumps a[href="#chapter-${slug}"]`).click();
    await page.waitForTimeout(1700);
    await expect(page.locator(`#chapter-${slug}`)).not.toHaveAttribute("inert");
    await expect(page.locator(`.story-jumps a[href="#chapter-${slug}"]`)).toHaveAttribute("aria-current","step");
    await page.screenshot({path:`artifacts/gallery-${slug}.png`});
  }
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".film-panel[inert]")).toHaveCount(0);
  for (const element of await page.locator(".chapter-image,.chapter-decision").all()) {
    expect(await element.evaluate(el=>getComputedStyle(el).visibility)).toBe("visible");
    expect(await element.evaluate(el=>getComputedStyle(el).opacity)).toBe("1");
  }
});

test("desktop chapter deep link reloads into its gallery position", async ({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('/#chapter-mahila-mitr');
 await page.waitForTimeout(1800);
 await expect(page.locator('#chapter-mahila-mitr')).not.toHaveAttribute('inert');
 await page.reload();
 await page.waitForTimeout(1800);
 await expect(page.locator('.story-jumps a[href="#chapter-mahila-mitr"]')).toHaveAttribute('aria-current','step');
});

test("case-study reading index navigates to decisions and capabilities",async({page})=>{
 await page.goto('/projects/financeflow');
 await page.getByRole('navigation',{name:'Case study sections'}).getByRole('link',{name:'Engineering decisions ↓'}).click();
 await expect(page).toHaveURL(/#case-decisions$/);
 await expect(page.locator('#case-decisions')).toBeInViewport();
 await page.getByRole('navigation',{name:'Case study sections'}).getByRole('link',{name:'Capabilities ↓'}).click();
 await expect(page).toHaveURL(/#case-capabilities$/);
 await expect(page.locator('#case-capabilities')).toBeInViewport();
});

test("mobile scroll story moves project imagery with no pinning and keeps the chapter rail visible",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('.pin-spacer')).toHaveCount(0);
 const chapter=page.locator('#chapter-financeflow');
 const top=await chapter.evaluate(el=>el.getBoundingClientRect().top+scrollY);
 await page.evaluate(y=>scrollTo({top:y-500,behavior:'instant'}),top);
 await page.waitForTimeout(600);
 const before=await chapter.locator('.chapter-image').evaluate(el=>getComputedStyle(el).transform);
 await page.evaluate(y=>scrollTo({top:y-150,behavior:'instant'}),top);
 await page.waitForTimeout(700);
 expect(await chapter.locator('.chapter-image').evaluate(el=>getComputedStyle(el).transform)).not.toBe(before);
 await expect(page.locator('.film-index')).toBeInViewport();
 await page.screenshot({path:'artifacts/mobile-project-refined.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.pin-spacer')).toHaveCount(0);
 expect(await chapter.locator('.chapter-image').evaluate(el=>getComputedStyle(el).transform)).toBe('none');
});
