import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'resume', path: '/resume' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
];

for (const { name, path } of pages) {
  test(`${name}: has exactly one h1`, async ({ page }) => {
    await page.goto(path);
    const h1s = await page.locator('h1').all();
    expect(h1s.length, `${path} must have exactly one h1`).toBe(1);
  });

  test(`${name}: heading hierarchy has no skipped levels`, async ({ page }) => {
    await page.goto(path);

    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((el) =>
        parseInt(el.tagName[1], 10),
      ),
    );

    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      expect(
        diff,
        `Heading level skipped: h${levels[i - 1]} → h${levels[i]} on ${path}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  test(`${name}: all images have non-empty alt text or are marked decorative`, async ({ page }) => {
    await page.goto(path);

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      const hasAlt = alt !== null;
      const isDecorative = ariaHidden === 'true' || alt === '';

      expect(
        hasAlt || isDecorative,
        `Image missing alt attribute on ${path}: ${await img.evaluate((n) => n.outerHTML)}`,
      ).toBe(true);
    }
  });

  test(`${name}: all links have an accessible name`, async ({ page }) => {
    await page.goto(path);

    const links = await page.locator('a[href]').all();
    for (const link of links) {
      const name = await link.evaluate((el) => {
        const text = el.textContent?.trim() ?? '';
        const ariaLabel = el.getAttribute('aria-label') ?? '';
        const ariaLabelledby = el.getAttribute('aria-labelledby') ?? '';
        return text || ariaLabel || ariaLabelledby;
      });
      expect(
        name.length,
        `Link has no accessible name on ${path}: ${await link.evaluate((n) => n.outerHTML.slice(0, 120))}`,
      ).toBeGreaterThan(0);
    }
  });

  test(`${name}: landmark regions are present`, async ({ page }) => {
    await page.goto(path);

    // Use first() since blog/post pages may have multiple header/footer elements
    await expect(page.locator('header').first()).toBeAttached();
    await expect(page.locator('main#main-content')).toBeAttached();
    await expect(page.locator('footer').first()).toBeAttached();
    await expect(page.locator('nav[aria-label]').first()).toBeAttached();
  });

  test(`${name}: external links have rel="noopener noreferrer"`, async ({ page }) => {
    await page.goto(path);

    const externalLinks = await page.locator('a[target="_blank"]').all();
    for (const link of externalLinks) {
      const rel = await link.getAttribute('rel');
      expect(rel, `External link missing rel on ${path}`).toContain('noopener');
      expect(rel, `External link missing noreferrer on ${path}`).toContain('noreferrer');
    }
  });
}
