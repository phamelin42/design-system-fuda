import { booleanAttribute, Component, computed, input, ViewEncapsulation } from '@angular/core';

export const EMBLEM_NAMES = [
  'ume',
  'sakura',
  'fuji',
  'kiku',
  'momiji',
  'cho',
  'usagi',
  'tsubame',
  'koi',
  'inu',
] as const;

export type FdEmblemName = (typeof EMBLEM_NAMES)[number];

/** Emblème attribué automatiquement à un identifiant : `hash(id) % 10`, stable d'une session à l'autre. */
export function emblemFor(id: string): FdEmblemName {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  }
  return EMBLEM_NAMES[hash % EMBLEM_NAMES.length];
}

/** Un des dix emblèmes (mon) de Fuda, dont les couleurs suivent le thème. */
@Component({
  selector: 'fd-emblem',
  templateUrl: './emblem.html',
  styleUrl: './emblem.scss',
  encapsulation: ViewEncapsulation.None,
  host: { style: 'display: contents' },
})
export class FdEmblem {
  readonly name = input.required<FdEmblemName>();
  /** Taille en px, ou `'fill'` pour laisser le CSS du parent décider (avatar, ciel de carte). */
  readonly size = input<number | 'fill'>(48);
  /** Anneau `rim` autour du disque ; à désactiver quand le parent porte déjà le sien (avatar). */
  readonly ring = input(true, { transform: booleanAttribute });
  /** Si fourni : `role="img"` et nom accessible. Sinon l'emblème est décoratif. */
  readonly label = input<string>();

  protected readonly dimension = computed(() =>
    this.size() === 'fill' ? null : `${this.size()}px`,
  );
}
