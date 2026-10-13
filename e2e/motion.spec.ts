import { expect, test } from '@playwright/test';
import { openStory } from './stories';

async function showToast(page: import('@playwright/test').Page) {
  await openStory(page, 'status-toast--default');
  await page.getByRole('button', { name: 'Show success toast' }).click();
  return page.locator('.fd-toast').first();
}

const animationOf = (toast: import('@playwright/test').Locator) =>
  toast.evaluate((el) => getComputedStyle(el).animationName);

test('toast: "uchi" entrance by default', async ({ page }) => {
  expect(await animationOf(await showToast(page))).toBe('fd-uchi');
});

test.describe('prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('toast: plain fade instead of "uchi"', async ({ page }) => {
    expect(await animationOf(await showToast(page))).toBe('fd-fade');
  });

  test('spinner: opacity pulse instead of the opening petals', async ({ page }) => {
    await openStory(page, 'actions-spinner--default');
    const petal = page.locator('.fd-spinner__petal').first();
    expect(await petal.evaluate((el) => getComputedStyle(el).animationName)).toBe('fd-pulse');
  });
});
