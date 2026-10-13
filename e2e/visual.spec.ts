import { expect, test } from '@playwright/test';
import { openStory, storyIds, themes } from './stories';

// One screenshot per story, in the Light and Dark themes.
for (const id of storyIds) {
  for (const theme of themes) {
    test(`${id} (${theme})`, async ({ page }) => {
      await openStory(page, id, theme);
      await expect(page).toHaveScreenshot(`${id}-${theme}.png`, { fullPage: true });
    });
  }
}
