import { booleanAttribute, Component, computed, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { FdIcon } from '../icon/icon';

export interface FdSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let nextId = 0;

/** Liste déroulante native (clavier, lecteurs d'écran et sélecteur mobile gratuits). */
@Component({
  selector: 'fd-select',
  imports: [FdIcon],
  template: `
    <label class="fd-field__label" [for]="id">{{ label() }}</label>
    <span class="fd-select">
      <select
        class="fd-input"
        [id]="id"
        [disabled]="disabled()"
        [attr.aria-invalid]="hasError() || null"
        [attr.aria-describedby]="describedBy()"
        (change)="onChange($event)"
        (blur)="touch.emit()"
      >
        @if (placeholder(); as placeholder) {
          <option value="" disabled [selected]="!value()">{{ placeholder }}</option>
        }
        @for (option of options(); track option.value) {
          <option
            [value]="option.value"
            [disabled]="option.disabled"
            [selected]="option.value === value()"
          >
            {{ option.label }}
          </option>
        }
      </select>
    </span>
    @if (message(); as message) {
      <p class="fd-field__error" [id]="id + '-error'">
        <svg fdIcon="warning"></svg>
        {{ message }}
      </p>
    } @else if (hint()) {
      <p class="fd-field__help" [id]="id + '-hint'">{{ hint() }}</p>
    }
  `,
  host: { class: 'fd-field' },
})
export class FdSelect implements FormValueControl<string> {
  readonly value = model('');

  readonly label = input.required<string>();
  readonly options = input.required<readonly FdSelectOption[]>();
  /** Première option désactivée, par exemple « Choisir une taille ». */
  readonly placeholder = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touch = output<void>();

  protected readonly id = `fd-select-${nextId++}`;
  protected readonly message = computed(
    () => this.error() ?? (this.touched() ? this.errors()[0]?.message : undefined),
  );
  protected readonly hasError = computed(
    () => !!this.message() || (this.invalid() && this.touched()),
  );
  protected readonly describedBy = computed(() =>
    this.message() ? `${this.id}-error` : this.hint() ? `${this.id}-hint` : null,
  );

  protected onChange(event: Event): void {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
