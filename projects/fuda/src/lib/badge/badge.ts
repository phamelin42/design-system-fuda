import { booleanAttribute, Component, computed, input } from '@angular/core';

export type FdBadgeTone = 'neutral' | 'shu' | 'asagi' | 'tokiwa' | 'fuji' | 'yamabuki' | 'enji';

/** Étiquette courte en tanzaku (parallélogramme), jamais cliquable : pour filtrer, utiliser `fd-chip`. */
@Component({
  selector: 'fd-badge',
  template: '<ng-content />',
  host: { '[class]': 'classes()' },
})
export class FdBadge {
  readonly tone = input<FdBadgeTone>('neutral');
  /** Fond `*-soft` et texte de la couleur. */
  readonly soft = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() => {
    const classes = ['fd-badge'];
    if (this.tone() !== 'neutral') classes.push(`fd-badge--${this.tone()}`);
    if (this.soft()) classes.push('fd-badge--soft');
    return classes.join(' ');
  });
}
