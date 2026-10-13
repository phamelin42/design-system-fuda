import { booleanAttribute, Component, input, model, output } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

/** Case à cocher : cocher, c'est encrer. Le libellé est le contenu projeté. */
@Component({
  selector: 'fd-checkbox',
  template: `
    <label class="fd-check">
      <input
        class="fd-check__input"
        type="checkbox"
        [checked]="checked()"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        (change)="onChange($event)"
        (blur)="touch.emit()"
      />
      <span class="fd-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path class="fd-check__mark" d="M5 12.5l4.5 4.5L19 7.5" />
          <path class="fd-check__dash" d="M6 12h12" />
        </svg>
      </span>
      <span>
        <ng-content />
        @if (hint()) {
          <span class="fd-check__hint">{{ hint() }}</span>
        }
      </span>
    </label>
  `,
})
export class FdCheckbox implements FormCheckboxControl {
  readonly checked = model(false);
  /** Parent d'une liste partiellement cochée : un trait remplace la coche. */
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly hint = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
