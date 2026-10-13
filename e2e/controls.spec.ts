import { expect, test } from '@playwright/test';

// The Storybook "Controls" panel goes through the `args` URL parameter: check that it drives the components.
const open = (page: import('@playwright/test').Page, id: string, args: string) =>
  page.goto(`/iframe.html?id=${id}&viewMode=story&args=${args}`);

test('button: controls change the label and the loading state of every variant', async ({
  page,
}) => {
  await open(page, 'actions-button--default', 'label:Delete;loading:!true');
  const buttons = page.getByRole('button', { name: 'Delete' });

  await expect(buttons).toHaveCount(12); // 4 variants x 3 sizes
  for (const button of await buttons.all()) {
    await expect(button).toHaveAttribute('aria-busy', 'true');
  }
});

test('button: the story shows every variant and size', async ({ page }) => {
  await open(page, 'actions-button--default', '');
  for (const variant of ['primary', 'danger', 'ghost']) {
    await expect(page.locator(`.fd-button--${variant}`)).toHaveCount(3);
  }
  await expect(page.locator('.fd-button--sm')).toHaveCount(4);
  await expect(page.locator('.fd-button--lg')).toHaveCount(4);
});

test('badge: the story shows every tone, solid and soft', async ({ page }) => {
  await open(page, 'status-badge--default', 'label:Published');
  await expect(page.locator('fd-badge')).toHaveCount(14);
  await expect(page.locator('fd-badge.fd-badge--soft')).toHaveCount(7);
  await expect(page.locator('fd-badge').first()).toHaveText('Published');
});

test('progress: the control sets the first bar', async ({ page }) => {
  await open(page, 'status-progress--default', 'value:30');
  await expect(page.getByRole('progressbar').first()).toHaveAttribute('aria-valuenow', '30');
});

test('text field: the label control reaches the first field', async ({ page }) => {
  await open(page, 'forms-text-field--default', 'label:Title');
  await expect(page.getByRole('textbox', { name: 'Title' })).toBeVisible();
});
