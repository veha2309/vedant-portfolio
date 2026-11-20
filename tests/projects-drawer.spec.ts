import { test, expect } from "@playwright/test";
import { projects } from "../src/data/project";

for (const width of [390,1440]) {
  test(`project drawer groups all projects and supports keyboard and navigation at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    const trigger = page.getByRole('button',{name:/All projects/});
    const drawer = page.getByRole('dialog',{name:'All the work.'});
    await trigger.click();
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('button',{name:'Close projects'})).toBeFocused();
    await expect(drawer.getByRole('link')).toHaveCount(projects.length);
    for (const [category,count] of [['Web applications',2],['Mobile applications',3],['Flutter packages',1],['Developer tools',1]] as const) {
      const group = drawer.getByRole('region',{name:category});
      await expect(group.getByRole('link')).toHaveCount(count);
    }
    await page.keyboard.press('Shift+Tab');
    await expect(drawer.getByRole('link').last()).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(drawer.getByRole('button',{name:'Close projects'})).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    await trigger.click();
    await drawer.getByRole('button',{name:/Flutter packages/}).click();
    await expect(drawer.getByRole('link')).toHaveCount(1);
    await expect(drawer.getByRole('region')).toHaveCount(1);
    await expect(drawer.getByRole('button',{name:/Flutter packages/})).toHaveAttribute('aria-pressed','true');
    await expect(drawer.getByRole('heading',{name:'Flutter packages',exact:true})).toBeInViewport();
    await page.waitForTimeout(400);
    await page.screenshot({path:`artifacts/project-drawer-${width}.png`});
    expect(await drawer.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBeTruthy();
    await drawer.getByRole('link',{name:/Liquid UI Components/}).click();
    await expect(page).toHaveURL(/\/projects\/liquid-ui-components$/);
    await expect(drawer).not.toBeVisible();
    await expect(page.getByRole('heading',{level:1})).toHaveText('Liquid UI Components');
    await trigger.click();
    await drawer.getByRole('button',{name:'Close projects'}).click();
    await expect(trigger).toBeFocused();
    await trigger.click();
    if(width===1440) await page.mouse.click(10,400);
    else await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });
}

test('drawer animates its exit before closing and filters categories without stale results', async ({page}) => {
  await page.goto('/');
  const trigger = page.getByRole('button',{name:/All projects/});
  const drawer = page.getByRole('dialog',{name:'All the work.'});
  await trigger.click();
  await page.waitForTimeout(500);
  for (const [category,count] of [['Web applications',2],['Mobile applications',3],['Flutter packages',1],['Developer tools',1]] as const) {
    await drawer.getByRole('button',{name:new RegExp(category)}).click();
    await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','false');
    await expect(drawer.getByRole('link')).toHaveCount(count);
    await expect(drawer.getByRole('region')).toHaveCount(1);
    await expect(drawer.getByRole('region',{name:category})).toBeVisible();
  }
  await drawer.getByRole('button',{name:/Web applications/}).click();
  await drawer.getByRole('button',{name:/Mobile applications/}).click();
  await drawer.getByRole('button',{name:/Flutter packages/}).click();
  await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','false');
  await expect(drawer.getByRole('link')).toHaveCount(1);
  await expect(drawer.getByRole('link')).toContainText('Liquid UI Components');
  await drawer.getByRole('button',{name:/^All /}).click();
  await expect(drawer.getByRole('link')).toHaveCount(projects.length);
  await drawer.getByRole('button',{name:'Close projects'}).click();
  await expect(drawer).toHaveAttribute('data-state','closing');
  expect(await drawer.evaluate(el => (el as HTMLDialogElement).open)).toBe(true);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await expect(drawer).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(drawer.getByRole('link')).toHaveCount(projects.length);
});

test('reduced motion drawer opens, filters and closes without animated delays', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.getByRole('button',{name:/All projects/}).click();
  const drawer = page.getByRole('dialog',{name:'All the work.'});
  expect(await drawer.evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
  await drawer.getByRole('button',{name:/Flutter packages/}).click();
  await expect(drawer.getByRole('link')).toHaveCount(1);
  await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','false');
  await page.keyboard.press('Escape');
  await expect(drawer).not.toBeVisible();
});

test('filtering moves retained tiles and reverses the movement when showing all projects', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:/All projects/}).click();
  const drawer = page.getByRole('dialog',{name:'All the work.'});
  const tile = drawer.getByRole('link',{name:/Liquid UI Components/});
  const start = await tile.evaluate(el => el.getBoundingClientRect().top);
  await drawer.getByRole('button',{name:/Flutter packages/}).click();
  const outgoing = drawer.locator('.project-drawer-tile-layer [data-project-tile]');
  await expect(outgoing).toHaveCount(projects.length - 1);
  expect(await outgoing.first().evaluate(el => {
    const effect = el.getAnimations()[0]?.effect;
    return effect instanceof KeyframeEffect ? effect.getKeyframes().at(-1)?.transform : null;
  })).toBe('translateY(64px)');
  await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','false');
  expect(await tile.evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(start);
  await expect(outgoing).toHaveCount(0);
  await drawer.getByRole('button',{name:/^All /}).click();
  await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','true');
  expect(await tile.evaluate(el => {
    const effect = el.getAnimations()[0]?.effect;
    const transform = effect instanceof KeyframeEffect ? String(effect.getKeyframes()[0].transform) : '';
    return new DOMMatrix(transform).m42;
  })).toBeLessThan(0);
  await expect(drawer.locator('.project-drawer-groups')).toHaveAttribute('aria-busy','false');
  await expect(drawer.getByRole('link')).toHaveCount(projects.length);
});

test('Liquid UI demos load local GIFs, pause, replay and respect reduced motion', async ({page}) => {
  await page.goto('/projects/liquid-ui-components');
  await page.getByRole('link',{name:'Demos ↓'}).click();
  const demos = page.getByRole('region',{name:'See it in motion.'});
  await expect(demos.locator('img')).toHaveCount(2);
  const morph = demos.locator('figure').filter({has:page.getByRole('heading',{name:'Morph styles',exact:true})});
  const image = morph.locator('img');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute('src','/images/liquid-ui/morph-styles.gif');
  expect(await image.evaluate(async el => {await (el as HTMLImageElement).decode(); return (el as HTMLImageElement).naturalWidth;})).toBe(1080);
  await morph.getByRole('button',{name:'Pause Morph styles'}).click();
  await expect(image).toHaveAttribute('src','/images/liquid-ui/morph-styles.png');
  await morph.getByRole('button',{name:'Play Morph styles'}).click();
  await expect(image).toHaveAttribute('src','/images/liquid-ui/morph-styles.gif');
  const modal = demos.locator('figure').filter({has:page.getByRole('heading',{name:'Prompts and panels',exact:true})});
  await modal.locator('img').scrollIntoViewIfNeeded();
  expect(await modal.locator('img').evaluate(async el => {await (el as HTMLImageElement).decode(); return (el as HTMLImageElement).naturalWidth;})).toBe(1080);
  await page.screenshot({path:'artifacts/liquid-ui-gif-demos-desktop.png'});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  for (const img of await demos.locator('img').all()) await expect(img).toHaveAttribute('src',/\.png$/);
  await expect(demos.getByRole('button',{name:/^Play /})).toHaveCount(2);
  await page.setViewportSize({width:390,height:844});
  await demos.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({path:'artifacts/liquid-ui-gif-demos-mobile.png'});
});
