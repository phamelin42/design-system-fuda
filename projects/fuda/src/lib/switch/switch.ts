import {
  booleanAttribute,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

const PETALS = [
  [12, 6.9],
  [16.85, 10.42],
  [15, 16.13],
  [9, 16.13],
  [7.15, 10.42],
];

/** Interrupteur à effet immédiat dont le pouce est une fleur de prunier qui roule. */
@Component({
  selector: 'fd-switch',
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FdSwitch implements FormCheckboxControl {
  readonly checked = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected readonly petals = PETALS;

  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
