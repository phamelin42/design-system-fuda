import {
  booleanAttribute,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

/** Case à cocher : cocher, c'est encrer. Le libellé est le contenu projeté. */
@Component({
  selector: 'fd-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  encapsulation: ViewEncapsulation.None,
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
