import { expect, test } from '@playwright/test';

// Le panneau « Controls » de Storybook passe par le paramètre d'URL `args` : on vérifie qu'il pilote bien les composants.
const open = (page: import('@playwright/test').Page, id: string, args: string) =>
  page.goto(`/iframe.html?id=${id}&viewMode=story&args=${args}`);

test('bouton : les contrôles changent la variante et le chargement', async ({ page }) => {
  await open(page, 'actions--bouton', 'variant:danger;size:lg;loading:!true;label:Supprimer');
  const button = page.getByRole('button', { name: 'Supprimer' });

  await expect(button).toHaveClass(/fd-button--danger/);
  await expect(button).toHaveClass(/fd-button--lg/);
  await expect(button).toHaveAttribute('aria-busy', 'true');
});

test('badge : les contrôles changent le ton', async ({ page }) => {
  await open(page, 'statut--badge-controles', 'tone:tokiwa;soft:!true;label:Publié');
  await expect(page.locator('fd-badge')).toHaveClass(/fd-badge--tokiwa/);
  await expect(page.locator('fd-badge')).toHaveClass(/fd-badge--soft/);
});

test('progression : indéterminée quand le contrôle est coché', async ({ page }) => {
  await open(page, 'statut--progression-controles', 'indeterminate:!true');
  await expect(page.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow', /.+/);
});

test('champ de saisie : le message d’erreur remplace l’aide', async ({ page }) => {
  await open(page, 'formulaires--champ-controles', 'error:Le+nom+est+trop+court');
  await expect(page.getByText('Le nom est trop court')).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
