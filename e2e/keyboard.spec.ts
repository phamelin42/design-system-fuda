import { expect, test } from '@playwright/test';
import { openStory } from './stories';

test('dialog: focus on the safest action, trap, Escape and focus return', async ({ page }) => {
  await openStory(page, 'overlays-dialog--default');
  const opener = page.getByRole('button', { name: 'Open alertdialog' });

  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('alertdialog', { name: 'Delete this notebook?' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();

  // Focus stays trapped inside the dialog.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    await expect(dialog.locator(':focus')).toHaveCount(1);
  }

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.getByText('Result: cancelled')).toBeVisible();
});

test('tooltip: shown on keyboard focus, Escape closes it', async ({ page }) => {
  await openStory(page, 'overlays-tooltip--default');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('tooltip')).toHaveText('Share the notebook');

  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('tooltip: 400 ms delay on hover', async ({ page }) => {
  await openStory(page, 'overlays-tooltip--default');

  await page.getByRole('button', { name: 'top' }).hover();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(page.getByRole('tooltip')).toHaveText('Share the notebook');
});

test('tabs: arrows loop, Home and End', async ({ page }) => {
  await openStory(page, 'navigation-tabs--default');
  const tabs = page.getByRole('tablist', { name: 'Kyoto notebook (auto activation)' });
  const tab = (name: string) => tabs.getByRole('tab', { name });

  await tab('Stops').focus();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Photos')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel').first()).toContainText('48 photos');

  await page.keyboard.press('End');
  await expect(tab('Notes')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Stops')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tab('Notes')).toHaveAttribute('aria-selected', 'true');
});

test('tabs: with manual activation, arrows only move the focus', async ({ page }) => {
  await openStory(page, 'navigation-tabs--default');
  const tabs = page.getByRole('tablist', { name: 'Kyoto notebook (manual activation)' });

  await tabs.getByRole('tab', { name: 'Stops' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: /Photos/ })).toBeFocused();
  await expect(tabs.getByRole('tab', { name: /Photos/ })).toHaveAttribute('aria-selected', 'false');
  await page.keyboard.press('Enter');
  await expect(tabs.getByRole('tab', { name: /Photos/ })).toHaveAttribute('aria-selected', 'true');
});

test('radios: arrows change the option', async ({ page }) => {
  await openStory(page, 'forms-radio-group--default');

  await page.getByRole('radio', { name: 'Only me' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio', { name: /My friends/ })).toBeChecked();
});

test('toast: does not steal focus and is announced in a live region', async ({ page }) => {
  await openStory(page, 'status-toast--default');
  const trigger = page.getByRole('button', { name: 'Show success toast' });

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.locator('fd-toast-region[aria-live="polite"]').getByRole('status'),
  ).toContainText('Notebook created');
  await expect(trigger).toBeFocused();
});
