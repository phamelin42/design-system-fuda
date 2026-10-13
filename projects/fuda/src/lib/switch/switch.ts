import { booleanAttribute, Component, input, model, output } from '@angular/core';
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
  template: `
    <label class="fd-switch">
      <input
        class="fd-switch__input"
        type="checkbox"
        role="switch"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="onChange($event)"
        (blur)="touch.emit()"
      />
      <span class="fd-switch__track" aria-hidden="true">
        <span class="fd-switch__thumb">
          <svg viewBox="0 0 24 24">
            @for (petal of petals; track $index) {
              <circle class="fd-switch__petal" [attr.cx]="petal[0]" [attr.cy]="petal[1]" r="4.7" />
            }
            <circle class="fd-switch__heart" cx="12" cy="12" r="2.4" />
          </svg>
        </span>
      </span>
      <span><ng-content /></span>
    </label>
  `,
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
