import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { name: 'home', path: '/' },
  { name: 'resume', path: '/resume' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
];

function waitForTheme(page: import('@playwright/test').Page, expectedBg: string) {
  // Wait for the computed background-color on <html> — not the CSS variable —
  // so that the 150ms CSS color transition has fully settled before axe runs.
  return page.waitForFunction((bg) => {
    return window.getComputedStyle(document.documentElement).backgroundColor === bg;
  }, expectedBg);
}

for (const { name, path } of pages) {
  test(`${name}: no WCAG 2.1 AA violations (light mode)`, async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'light', reducedMotion: 'reduce' });
    const page = await context.newPage();

    await page.goto(path);
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await waitForTheme(page, 'rgb(255, 255, 255)');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    await context.close();
    expect(results.violations).toEqual([]);
  });

  test(`${name}: no WCAG 2.1 AA violations (dark mode)`, async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const page = await context.newPage();

    await page.goto(path);
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await waitForTheme(page, 'rgb(17, 24, 39)');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    await context.close();
    expect(results.violations).toEqual([]);
  });
}
