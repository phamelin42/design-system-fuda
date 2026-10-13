import { expect, test } from '@playwright/test';
import { openStory, storyIds, themes } from './stories';

// Une capture par story, en thème Jour et en thème Nuit.
for (const id of storyIds) {
  for (const theme of themes) {
    test(`${id} (${theme})`, async ({ page }) => {
      await openStory(page, id, theme);
      await expect(page).toHaveScreenshot(`${id}-${theme}.png`, { fullPage: true });
    });
  }
}
