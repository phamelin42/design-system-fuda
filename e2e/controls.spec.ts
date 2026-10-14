import { expect, test } from '@playwright/test';

// The Storybook "Controls" panel goes through the `args` URL parameter: check that it drives the components.
const open = (page: import('@playwright/test').Page, id: string, args: string) =>
  page.goto(`/iframe.html?id=${id}&viewMode=story&args=${args}`);

test('button: controls change the label and the loading state of every variant', async ({
  page,
}) => {
  await open(page, 'actions-button--default', 'label:Delete;loading:!true');
  const buttons = page.getByRole('button', { name: 'Delete' });

  await expect(buttons).toHaveCount(15); // 5 variants x 3 sizes
  for (const button of await buttons.all()) {
    await expect(button).toHaveAttribute('aria-busy', 'true');
  }
});

test('button: the story shows every variant and size', async ({ page }) => {
  await open(page, 'actions-button--default', '');
  for (const variant of ['primary', 'danger', 'ghost', 'success']) {
    await expect(page.locator(`.fd-button--${variant}`)).toHaveCount(3);
  }
  await expect(page.locator('.fd-button--sm')).toHaveCount(5);
  await expect(page.locator('.fd-button--lg')).toHaveCount(5);
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

test('button: variant and size controls narrow the story to one button', async ({ page }) => {
  await open(page, 'actions-button--default', 'variant:ghost;size:sm');
  await expect(page.locator('.fd-button')).toHaveCount(1);
  await expect(page.locator('.fd-button')).toHaveClass(/fd-button--ghost/);
  await expect(page.locator('.fd-button')).toHaveClass(/fd-button--sm/);
});

test('spinner: the size control picks one of the three sizes', async ({ page }) => {
  await open(page, 'actions-spinner--default', '');
  await expect(page.locator('fd-spinner')).toHaveCount(3);

  await open(page, 'actions-spinner--default', 'size:lg');
  await expect(page.locator('fd-spinner')).toHaveCount(1);
  await expect(page.locator('fd-spinner')).toHaveClass(/fd-spinner--lg/);
});

test('emblem: the name control picks one of the ten emblems', async ({ page }) => {
  await open(page, 'identity-emblem--default', '');
  await expect(page.locator('fd-emblem')).toHaveCount(10);

  await open(page, 'identity-emblem--default', 'name:koi;ring:!false');
  await expect(page.locator('fd-emblem')).toHaveCount(1);
  await expect(page.locator('svg.fd-mon--koi')).toBeVisible();
  await expect(page.locator('.fd-mon__ring')).toHaveCount(0);
});

test('checkbox: the checked control reaches the first checkbox', async ({ page }) => {
  await open(page, 'forms-checkbox--default', 'checked:!true;disabled:!true');
  const first = page.getByRole('checkbox', { name: /Show past stops/ });
  await expect(first).toBeChecked();
  await expect(first).toBeDisabled();
});

test('tabs: the activation control shows a single tab list', async ({ page }) => {
  await open(page, 'navigation-tabs--default', '');
  await expect(page.getByRole('tablist')).toHaveCount(2);

  await open(page, 'navigation-tabs--default', 'activation:manual');
  await expect(page.getByRole('tablist')).toHaveCount(1);
});
