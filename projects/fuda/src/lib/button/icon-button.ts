import { Directive, computed, input } from '@angular/core';
import { FdTooltip } from '../tooltip/tooltip';

/**
 * Bouton carré qui ne montre qu'une icône : `<button fdIconButton label="Modifier"><svg fdIcon="edit" /></button>`.
 * Le `label` est obligatoire : il devient le nom accessible et le texte de l'infobulle.
 */
@Directive({
  selector: 'button[fdIconButton], a[fdIconButton]',
  hostDirectives: [{ directive: FdTooltip, inputs: ['fdTooltip: label'] }],
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'label()',
    '[attr.aria-pressed]': 'pressed()',
  },
})
export class FdIconButton {
  readonly label = input.required<string>();
  readonly variant = input<'ghost' | 'outlined'>('ghost');
  readonly size = input<'sm' | 'md'>('md');
  /** Pour un bouton bascule (favori) : pose `aria-pressed`. */
  readonly pressed = input<boolean>();

  protected readonly classes = computed(() => {
    const classes = ['fd-icon-button'];
    if (this.variant() === 'outlined') classes.push('fd-icon-button--outlined');
    if (this.size() === 'sm') classes.push('fd-icon-button--sm');
    return classes.join(' ');
  });
}
