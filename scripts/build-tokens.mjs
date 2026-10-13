// Génère projects/fuda/src/styles/tokens.css à partir de tokens/tokens.json.
// Usage : node scripts/build-tokens.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const source = new URL('../projects/fuda/tokens/tokens.json', import.meta.url);
const target = new URL('../projects/fuda/src/styles/tokens.css', import.meta.url);
const tokens = JSON.parse(readFileSync(source, 'utf8'));

const themes = tokens.color.themes.map((t) => t.id); // ['light', 'dark']
const [defaultTheme] = themes;

/** `{asagi}` devient `var(--asagi)`, tout le reste est gardé tel quel. */
const toCss = (value) => value.replace(/\{([\w.-]+)\}/g, 'var(--$1)');

/** Valeur d'un token pour un thème (une chaîne simple vaut pour tous les thèmes). */
const valueFor = (token, theme) =>
  typeof token.value === 'string' ? token.value : (token.value[theme] ?? token.value[defaultTheme]);

const themed = [...tokens.color.tokens, ...tokens.shadow.tokens];

const declarations = (list, theme) =>
  list.map((t) => `  --${t.name}: ${toCss(valueFor(t, theme))};`).join('\n');

const plain = ['spacing', 'radius', 'border', 'duration', 'easing', 'layer'].flatMap(
  (family) => tokens[family].tokens,
);

const fontVars = Object.entries(tokens.type.families)
  .map(([name, stack]) => `  --font-${name}: ${stack};`)
  .join('\n');

const typeClasses = tokens.type.groups
  .flatMap((group) => group.styles.map((style) => ({ ...style, family: group.family })))
  .map((s) => {
    const spacing = s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : '';
    return `.${s.name} { font-family: var(--font-${s.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${spacing} }`;
  })
  .join('\n');

const css = `/* ${tokens.name} — généré depuis tokens/tokens.json par scripts/build-tokens.mjs. Ne pas modifier à la main. */

:root,
[data-theme="${defaultTheme}"] {
${declarations(themed, defaultTheme)}
}

/* Le thème Nuit ne s'active que par data-theme="dark" sur <html>, jamais par prefers-color-scheme. */
[data-theme="dark"] {
${declarations(themed, 'dark')}
}

:root {
${plain.map((t) => `  --${t.name}: ${t.value};`).join('\n')}
${fontVars}
}

${typeClasses}
`;

writeFileSync(target, css);
console.log(`tokens.css écrit (${themed.length + plain.length} tokens).`);
