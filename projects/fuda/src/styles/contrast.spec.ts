import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface Token {
  name: string;
  value: string | Record<string, string>;
  usage: string;
}

const tokens = JSON.parse(
  readFileSync(join(__dirname, '..', '..', 'tokens', 'tokens.json'), 'utf8'),
);
const colors: Token[] = tokens.color.tokens;
const themes: string[] = tokens.color.themes.map((theme: { id: string }) => theme.id);

/** Résout un token en couleur hex pour un thème (suit les alias `{x}`). */
function resolve(name: string, theme: string): string {
  const token = colors.find((t) => t.name === name)!;
  const value =
    typeof token.value === 'string' ? token.value : (token.value[theme] ?? token.value[themes[0]]);
  const alias = value.match(/^\{(.+)\}$/);
  return alias ? resolve(alias[1], theme) : value;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** Les fonds nommés dans la note d'un token : « … sur `surface`, `surface-raised` et `shu-soft` ». */
function backgroundsOf(usage: string): string[] {
  const sentence = usage.match(/\bsur (?:un remplissage )?((?:`[\w-]+`(?:,| et| ou| \(|\s)*)+)/);
  if (!sentence) return [];
  return [...sentence[1].matchAll(/`([\w-]+)`/g)]
    .map((m) => m[1])
    .filter((name) => colors.some((c) => c.name === name));
}

// line-strong et focus sont des bords : 3:1 suffit. Les autres portent du texte : 4.5:1.
const NON_TEXT = new Set(['line-strong', 'focus']);

const pairs = colors
  .filter((token) => !token.name.startsWith('scrim'))
  .flatMap((token) =>
    backgroundsOf(token.usage).map((background) => ({ token: token.name, background })),
  );

describe('contrastes des tokens', () => {
  it('trouve des paires à vérifier', () => {
    expect(pairs.length).toBeGreaterThan(20);
  });

  for (const theme of themes) {
    it.each(pairs)(`$token sur $background (${theme})`, ({ token, background }) => {
      const ratio = contrast(resolve(token, theme), resolve(background, theme));
      expect(ratio).toBeGreaterThanOrEqual(NON_TEXT.has(token) ? 3 : 4.5);
    });
  }
});
