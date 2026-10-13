import { expect, test } from '@playwright/test';
import { openStory } from './stories';

test('dialogue : focus sur l’action la moins risquée, piège, Échap et retour du focus', async ({
  page,
}) => {
  await openStory(page, 'superpositions--dialogue');
  const opener = page.getByRole('button', { name: 'Supprimer le carnet' });

  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('alertdialog', { name: 'Supprimer ce carnet ?' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Annuler' })).toBeFocused();

  // Le focus reste prisonnier du dialogue.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    await expect(dialog.locator(':focus')).toHaveCount(1);
  }

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.getByText('Résultat : annulé')).toBeVisible();
});

test('infobulle : apparaît au focus clavier, Échap la ferme', async ({ page }) => {
  await openStory(page, 'superpositions--infobulles');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('tooltip')).toHaveText('Modifier l’étape');

  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('infobulle : 400 ms de délai au survol', async ({ page }) => {
  await openStory(page, 'superpositions--infobulles');

  await page.getByRole('button', { name: 'Partager le carnet' }).hover();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(page.getByRole('tooltip')).toHaveText('Partager le carnet');
});

test('onglets : flèches en boucle, Début et Fin', async ({ page }) => {
  await openStory(page, 'navigation-et-contenu--onglets');
  const tab = (name: string) => page.getByRole('tab', { name });

  await tab('Étapes').focus();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Photos')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('48 photos');

  await page.keyboard.press('End');
  await expect(tab('Notes')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tab('Étapes')).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tab('Notes')).toHaveAttribute('aria-selected', 'true');
});

test('radios : les flèches changent d’option', async ({ page }) => {
  await openStory(page, 'formulaires--selection');

  await page.getByRole('radio', { name: 'Seulement moi' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio', { name: /Mes amis/ })).toBeChecked();
});

test('toast : ne vole pas le focus et s’annonce dans une région live', async ({ page }) => {
  await openStory(page, 'statut--toasts');
  const trigger = page.getByRole('button', { name: 'Créer un carnet' });

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.locator('fd-toast-region[aria-live="polite"]').getByRole('status'),
  ).toContainText('Carnet créé');
  await expect(trigger).toBeFocused();
});

test('bouton en chargement : pas de double déclenchement', async ({ page }) => {
  await openStory(page, 'actions--chargement');
  const button = page.getByRole('button', { name: 'Enregistrement…' });

  await expect(button).toHaveAttribute('aria-busy', 'true');
  await button.click();
  await expect(button).toHaveAttribute('aria-busy', 'true');
});
