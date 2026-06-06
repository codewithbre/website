import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/contact');
});

test('all form inputs have an associated label', async ({ page }) => {
  const inputs = await page.locator('input, textarea, select').all();

  for (const input of inputs) {
    const id = await input.getAttribute('id');
    const ariaLabel = await input.getAttribute('aria-label');
    const ariaLabelledby = await input.getAttribute('aria-labelledby');

    let hasLabel = !!ariaLabel || !!ariaLabelledby;

    if (id && !hasLabel) {
      const label = page.locator(`label[for="${id}"]`);
      hasLabel = (await label.count()) > 0;
    }

    expect(
      hasLabel,
      `Input missing label: ${await input.evaluate(n => n.outerHTML)}`
    ).toBe(true);
  }
});

test('required fields have required attribute', async ({ page }) => {
  const requiredInputs = await page.locator('input[required], textarea[required]').all();
  expect(requiredInputs.length).toBeGreaterThan(0);

  for (const input of requiredInputs) {
    const required = await input.getAttribute('required');
    expect(required).not.toBeNull();
  }
});

test('submit button has an accessible name', async ({ page }) => {
  const submit = page.locator('button[type="submit"]');
  await expect(submit).toBeAttached();

  const name = await submit.evaluate((el) => {
    return (
      el.textContent?.trim() ||
      el.getAttribute('aria-label') ||
      ''
    );
  });
  expect(name.length).toBeGreaterThan(0);
});

test('status message region uses aria-live', async ({ page }) => {
  const status = page.locator('[aria-live]');
  await expect(status).toBeAttached();

  const liveValue = await status.getAttribute('aria-live');
  expect(['polite', 'assertive']).toContain(liveValue);
});

test('form fields are keyboard operable in sequence', async ({ page }) => {
  await page.keyboard.press('Tab');

  const nameInput = page.locator('#name');
  const emailInput = page.locator('#email');
  const messageInput = page.locator('#message');
  const submitBtn = page.locator('button[type="submit"]');

  await nameInput.focus();
  await expect(nameInput).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(emailInput).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(messageInput).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(submitBtn).toBeFocused();
});
