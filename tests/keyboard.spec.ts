import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'resume', path: '/resume' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
];

test('skip link is the first focusable element and leads to main content', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press('Enter');
  const main = page.locator('#main-content');
  await expect(main).toBeVisible();
});

test('theme toggle is reachable via keyboard and toggles theme', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));

  const toggle = page.locator('#theme-toggle');
  await toggle.focus();
  await expect(toggle).toBeFocused();

  await page.keyboard.press('Enter');
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(theme).toBe('dark');
});

for (const { name, path } of pages) {
  test(`${name}: all interactive elements are keyboard reachable`, async ({ page }) => {
    await page.goto(path);

    const interactives = await page
      .locator('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
      .all();

    for (const el of interactives) {
      const visible = await el.isVisible();
      if (!visible) continue;

      await el.focus();
      const focused = await el.evaluate((node) => node === document.activeElement);
      expect(
        focused,
        `Element should be focusable: ${await el.evaluate((n) => n.outerHTML.slice(0, 120))}`,
      ).toBe(true);
    }
  });

  test(`${name}: focused elements have a visible focus indicator`, async ({ page }) => {
    await page.goto(path);

    const firstFocusable = page.locator('a[href], button').first();
    await firstFocusable.focus();

    const outlineStyle = await firstFocusable.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
        outlineColor: styles.outlineColor,
      };
    });

    // Focus ring must be present — any non-zero outline width counts
    const hasOutline =
      parseFloat(outlineStyle.outlineWidth) > 0 && outlineStyle.outlineStyle !== 'none';

    expect(hasOutline, `No visible focus ring on first focusable element on ${path}`).toBe(true);
  });
}
