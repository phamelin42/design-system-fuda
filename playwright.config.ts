import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  snapshotPathTemplate: 'e2e/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:6006',
    viewport: { width: 960, height: 640 },
    // Pour utiliser un Chromium déjà installé : PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/chemin/vers/chrome
    launchOptions: {
      executablePath: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'],
      // Text hinting follows the fontconfig of the machine; without hinting the captures do not depend on it.
      args: ['--font-render-hinting=none'],
    },
  },
  // 0,2 % : la CI et un poste ne lissent pas le texte tout à fait pareil. Avec un texte presque noir,
  // les pages denses dépassaient 0,1 % (633 à 694 px sur 614) sans aucun changement visible.
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled' } },
  webServer: {
    command: 'npx http-server storybook-static -p 6006 -s',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env['CI'],
  },
});
