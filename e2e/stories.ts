import { readFileSync } from 'node:fs';
import type { Page } from '@playwright/test';

/** Les stories du Storybook construit (npm run build-storybook), lues dans son index. */
const index = JSON.parse(readFileSync('storybook-static/index.json', 'utf8'));

export const storyIds: string[] = Object.values<{ id: string; type: string }>(index.entries)
  .filter((entry) => entry.type === 'story')
  .map((entry) => entry.id);

export const themes = ['light', 'dark'] as const;

export async function openStory(page: Page, id: string, theme: (typeof themes)[number] = 'light') {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}
