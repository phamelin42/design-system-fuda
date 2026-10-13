import { expect, test } from '@playwright/test';
import { openStory } from './stories';

async function showToast(page: import('@playwright/test').Page) {
  await openStory(page, 'statut--toasts');
  await page.getByRole('button', { name: 'Créer un carnet' }).click();
  return page.locator('.fd-toast').first();
}

const animationOf = (toast: import('@playwright/test').Locator) =>
  toast.evaluate((el) => getComputedStyle(el).animationName);

test('toast : entrée « uchi » par défaut', async ({ page }) => {
  expect(await animationOf(await showToast(page))).toBe('fd-uchi');
});

test.describe('prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('toast : fondu seul à la place du « uchi »', async ({ page }) => {
    expect(await animationOf(await showToast(page))).toBe('fd-fade');
  });

  test('spinner : pulsation d’opacité à la place des pétales qui s’ouvrent', async ({ page }) => {
    await openStory(page, 'actions--spinners');
    const petal = page.locator('.fd-spinner__petal').first();
    expect(await petal.evaluate((el) => getComputedStyle(el).animationName)).toBe('fd-pulse');
  });
});
