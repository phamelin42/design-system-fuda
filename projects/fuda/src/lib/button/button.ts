import {
  afterEveryRender,
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { FdSpinner } from '../spinner/spinner';

export type FdButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type FdButtonSize = 'sm' | 'md' | 'lg';

/**
 * Bouton ou lien d'action : `<button fdButton variant="primary">Enregistrer</button>`.
 * Un seul `primary` par vue ; `danger` seulement pour confirmer une suppression.
 */
@Component({
  // Composant posé sur un élément natif (sémantique HTML conservée) : le sélecteur n'est pas un élément fd-.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[fdButton], a[fdButton]',
  imports: [FdSpinner],
  templateUrl: './button.html',
  host: {
    '[class]': 'classes()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class FdButton {
  readonly variant = input<FdButtonVariant>('secondary');
  readonly size = input<FdButtonSize>('md');
  /** Affiche la fleur de chargement, pose `aria-busy`, fige la largeur et bloque les clics. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Pleine largeur. */
  readonly block = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() => {
    const classes = ['fd-button'];
    if (this.variant() !== 'secondary') classes.push(`fd-button--${this.variant()}`);
    if (this.size() !== 'md') classes.push(`fd-button--${this.size()}`);
    if (this.block()) classes.push('fd-button--block');
    return classes.join(' ');
  });

  constructor() {
    const host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    // Écouteur en phase de capture : il passe avant les (click) du consommateur.
    host.addEventListener(
      'click',
      (event) => {
        if (this.loading()) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true,
    );

    // La largeur au repos est mémorisée, puis figée pendant le chargement (le libellé change).
    let restingWidth = 0;
    afterEveryRender(() => {
      if (this.loading()) {
        host.style.minWidth = `${restingWidth}px`;
      } else {
        host.style.minWidth = '';
        restingWidth = host.offsetWidth;
      }
    });
  }
}
