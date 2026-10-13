import {
  booleanAttribute,
  Component,
  ElementRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { FdIcon } from '../icon/icon';

/**
 * Pilule cliquable. Filtre par défaut (`[(selected)]`, bascule) ;
 * avec `removable`, valeur saisie qu'on peut retirer (`(removed)`).
 * Regrouper les chips d'un même ensemble dans un `role="group"` étiqueté.
 */
@Component({
  selector: 'fd-chip',
  imports: [FdIcon],
  template: `
    @if (removable()) {
      <span class="fd-chip fd-chip--input">
        {{ label() }}
        <button
          class="fd-chip__remove"
          type="button"
          [attr.aria-label]="'Retirer ' + label()"
          (click)="remove()"
        >
          <svg fdIcon="close"></svg>
        </button>
      </span>
    } @else {
      <button
        class="fd-chip"
        type="button"
        [attr.aria-pressed]="selected()"
        (click)="selected.set(!selected())"
      >
        <svg class="fd-chip__check" fdIcon="check"></svg>
        {{ label() }}
      </button>
    }
  `,
  host: { style: 'display: contents' },
})
export class FdChip {
  readonly label = input.required<string>();
  readonly selected = model(false);
  readonly removable = input(false, { transform: booleanAttribute });
  readonly removed = output<void>();

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected remove(): void {
    // Le focus passe au chip voisin avant que celui-ci disparaisse.
    const neighbour = this.host.nextElementSibling ?? this.host.previousElementSibling;
    neighbour?.querySelector<HTMLElement>('.fd-chip__remove')?.focus();
    this.removed.emit();
  }
}
