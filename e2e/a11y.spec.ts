import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openStory, storyIds, themes } from './stories';

// WCAG 2.2 AA: no axe violation, contrast included, in both themes.
for (const id of storyIds) {
  for (const theme of themes) {
    test(`${id} (${theme})`, async ({ page }) => {
      await openStory(page, id, theme);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual(
        [],
      );
    });
  }
}
