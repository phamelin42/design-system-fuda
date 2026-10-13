import type { Preview } from '@storybook/angular-vite';
import '../src/styles/fuda.css';
import '../src/styles/fonts.css';

/** Applique le thème choisi dans la barre d'outils, comme le ferait FdThemeService. */
function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

/**
 * Simule `prefers-reduced-motion: reduce` : une feuille recopie les règles du bloc @media de base.css,
 * sans condition. (Les tests Playwright utilisent le vrai emulateMedia.)
 */
function applyReducedMotion(reduced: boolean) {
  const id = 'fd-reduced-motion';
  document.getElementById(id)?.remove();
  if (!reduced) return;

  const rules = [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules])
    .filter(
      (rule): rule is CSSMediaRule =>
        rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion'),
    )
    .flatMap((media) => [...media.cssRules].map((rule) => rule.cssText));
  const style = document.createElement('style');
  style.id = id;
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Thème',
      toolbar: {
        title: 'Thème',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Jour' },
          { value: 'dark', title: 'Nuit' },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: 'Mouvement',
      toolbar: {
        title: 'Mouvement',
        icon: 'play',
        items: [
          { value: 'normal', title: 'Mouvement normal' },
          { value: 'reduced', title: 'Mouvement réduit' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', motion: 'normal' },
  decorators: [
    (story, context) => {
      applyTheme(context.globals['theme']);
      applyReducedMotion(context.globals['motion'] === 'reduced');
      return story();
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
