import { expect, test } from '@playwright/test';
import { openStory } from './stories';

test('dialog: focus on the safest action, trap, Escape and focus return', async ({ page }) => {
  await openStory(page, 'overlays-dialog--confirmation');
  const opener = page.getByRole('button', { name: 'Delete notebook' });

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

  await page.getByRole('button', { name: 'Hover or tab here' }).hover();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(page.getByRole('tooltip')).toHaveText('Share the notebook');
});

test('tabs: arrows loop, Home and End', async ({ page }) => {
  await openStory(page, 'navigation-tabs--default');
  const tab = (name: string) => page.getByRole('tab', { name });

  await tab('Stops').focus();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Photos')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('48 photos');

  await page.keyboard.press('End');
  await expect(tab('Notes')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Stops')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tab('Notes')).toHaveAttribute('aria-selected', 'true');
});

test('radios: arrows change the option', async ({ page }) => {
  await openStory(page, 'forms-radio-group--vertical');

  await page.getByRole('radio', { name: 'Only me' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio', { name: /My friends/ })).toBeChecked();
});

test('toast: does not steal focus and is announced in a live region', async ({ page }) => {
  await openStory(page, 'status-toast--success');
  const trigger = page.getByRole('button', { name: 'Show the toast' });

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.locator('fd-toast-region[aria-live="polite"]').getByRole('status'),
  ).toContainText('Notebook created');
  await expect(trigger).toBeFocused();
});

test('loading button: no double trigger', async ({ page }) => {
  await openStory(page, 'actions-button--loading');
  const button = page.getByRole('button', { name: 'Saving…' });

  await expect(button).toHaveAttribute('aria-busy', 'true');
  await button.click();
  await expect(button).toHaveAttribute('aria-busy', 'true');
});
