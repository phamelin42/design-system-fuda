import { expect, test } from '@playwright/test';

// The Storybook "Controls" panel goes through the `args` URL parameter: check that it drives the components.
const open = (page: import('@playwright/test').Page, id: string, args: string) =>
  page.goto(`/iframe.html?id=${id}&viewMode=story&args=${args}`);

test('button: controls change the variant, size and loading state', async ({ page }) => {
  await open(page, 'actions-button--primary', 'variant:danger;size:lg;loading:!true;label:Delete');
  const button = page.getByRole('button', { name: 'Delete' });

  await expect(button).toHaveClass(/fd-button--danger/);
  await expect(button).toHaveClass(/fd-button--lg/);
  await expect(button).toHaveAttribute('aria-busy', 'true');
});

test('badge: controls change the tone', async ({ page }) => {
  await open(page, 'status-badge--sakura', 'tone:tokiwa;soft:!true;label:Published');
  await expect(page.locator('fd-badge')).toHaveClass(/fd-badge--tokiwa/);
  await expect(page.locator('fd-badge')).toHaveClass(/fd-badge--soft/);
});

test('progress: indeterminate when the control is on', async ({ page }) => {
  await open(page, 'status-progress--determinate', 'indeterminate:!true');
  await expect(page.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow', /.+/);
});

test('text field: the error message replaces the hint', async ({ page }) => {
  await open(page, 'forms-text-field--default', 'error:Name+too+short');
  await expect(page.getByText('Name too short')).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
