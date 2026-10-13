import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..', '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens', 'tokens.json'), 'utf8'));
const css = readFileSync(join(__dirname, 'tokens.css'), 'utf8');

const names: string[] = [
  'color',
  'spacing',
  'radius',
  'shadow',
  'border',
  'duration',
  'easing',
  'layer',
]
  .flatMap((family) => tokens[family].tokens)
  .map((token: { name: string }) => token.name);

describe('tokens.css', () => {
  it.each(names)('déclare --%s', (name) => {
    expect(css).toContain(`--${name}:`);
  });

  it('déclare une classe par style typographique', () => {
    const styles = tokens.type.groups.flatMap(
      (group: { styles: { name: string }[] }) => group.styles,
    );
    for (const style of styles) {
      expect(css).toContain(`.${style.name} {`);
    }
  });

  it('ne dépend jamais de prefers-color-scheme', () => {
    expect(css.replace(/\/\*[\s\S]*?\*\//g, '')).not.toContain('prefers-color-scheme');
  });

  it('redéclare les alias dans chaque thème', () => {
    const dark = css.slice(css.indexOf('[data-theme="dark"]'));
    expect(dark).toContain('--link: var(--asagi);');
  });
});
