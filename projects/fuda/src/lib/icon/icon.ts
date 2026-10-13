import { Component, computed, input } from '@angular/core';

interface IconShape {
  paths: string[];
  circle?: [cx: number, cy: number, r: number];
  strokeWidth?: number;
}

/** Tracés des planches de référence (grille 24px, trait de 2px). Lucide reste le plus proche en substitution. */
const ICONS = {
  plus: { paths: ['M12 5v14M5 12h14'] },
  trash: {
    paths: ['M4 7h16M10 11v6M14 11v6M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7M9 7V4.5h6V7'],
  },
  close: { paths: ['M6.5 6.5l11 11M17.5 6.5l-11 11'] },
  check: { paths: ['M5 12.5l4.5 4.5L19 7.5'] },
  info: { paths: ['M12 11v6M12 7.2v.3'] },
  warning: { paths: ['M12 6.5v7M12 17.5v.3'] },
  edit: { paths: ['M4 20h4L19.5 8.5l-4-4L4 16v4zM13.5 6.5l4 4'] },
  share: {
    paths: [
      'M12 4v11M7.5 8.5L12 4l4.5 4.5M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13',
    ],
  },
  heart: {
    paths: [
      'M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z',
    ],
  },
  more: { paths: ['M5 12h.01M12 12h.01M19 12h.01'], strokeWidth: 3 },
  search: { paths: ['M20 20l-4.2-4.2'], circle: [11, 11, 6.5] },
  pin: {
    paths: ['M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z'],
    circle: [12, 10, 2.3],
  },
  'chevron-right': { paths: ['M9 6l6 6-6 6'] },
  'chevron-down': { paths: ['M6 9l6 6 6-6'] },
} satisfies Record<string, IconShape>;

export type FdIconName = keyof typeof ICONS;

/** Icône d'interface décorative : `<svg fdIcon="plus" />`. Le sens passe par le libellé du contrôle qui la porte. */
@Component({
  // Composant posé sur un élément natif (sémantique HTML conservée) : le sélecteur n'est pas un élément fd-.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[fdIcon]',
  template: `
    @for (d of shape().paths; track d) {
      <svg:path [attr.d]="d" [attr.stroke-width]="shape().strokeWidth" />
    }
    @if (shape().circle; as c) {
      <svg:circle [attr.cx]="c[0]" [attr.cy]="c[1]" [attr.r]="c[2]" />
    }
  `,
  host: { class: 'fd-icon', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
})
export class FdIcon {
  readonly fdIcon = input.required<FdIconName>();

  protected readonly shape = computed<IconShape>(() => ICONS[this.fdIcon()]);
}
