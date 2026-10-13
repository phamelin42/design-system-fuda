import type { Preview } from '@storybook/angular-vite';
import '../src/styles/fuda.css';
import '../src/styles/fonts.css';

/** Applies the theme picked in the toolbar, the way FdThemeService does. */
function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

/**
 * Simulates `prefers-reduced-motion: reduce`: a stylesheet copies the rules of the @media block of base.css,
 * unconditionally. (The Playwright tests use the real emulateMedia.)
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
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: 'Motion',
      toolbar: {
        title: 'Motion',
        icon: 'play',
        items: [
          { value: 'normal', title: 'Normal motion' },
          { value: 'reduced', title: 'Reduced motion' },
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
