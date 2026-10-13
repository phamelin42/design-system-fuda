import { booleanAttribute, Component, input, model, output } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export interface FdRadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

let nextId = 0;

/** Choix unique parmi deux à cinq options. Les flèches changent d'option (comportement natif). */
@Component({
  selector: 'fd-radio-group',
  templateUrl: './radio-group.html',
})
export class FdRadioGroup implements FormValueControl<string> {
  readonly value = model('');

  /** Question posée par le groupe. */
  readonly legend = input.required<string>();
  readonly options = input.required<readonly FdRadioOption[]>();
  /** Horizontal seulement pour deux ou trois options courtes. */
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected readonly groupName = `fd-radio-${nextId++}`;
}
