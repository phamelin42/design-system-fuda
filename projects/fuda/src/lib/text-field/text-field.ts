import { booleanAttribute, Component, computed, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { FdIcon, FdIconName } from '../icon/icon';

let nextId = 0;

/**
 * Champ de saisie avec son libellé, son aide et son message d'erreur.
 * Utilisable seul (`[(value)]`) ou avec Signal Forms (`[formField]="form.name"`).
 */
@Component({
  selector: 'fd-text-field',
  imports: [FdIcon],
  template: `
    <label class="fd-field__label" [for]="id">
      {{ label() }}
      @if (optional()) {
        <span class="fd-field__optional">(facultatif)</span>
      }
    </label>

    <span class="fd-input-wrap">
      @if (icon(); as icon) {
        <svg [fdIcon]="icon"></svg>
      }
      @if (multiline()) {
        <textarea
          class="fd-input"
          [id]="id"
          [value]="value()"
          [attr.maxlength]="maxLength()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [attr.aria-invalid]="hasError() || null"
          [attr.aria-describedby]="describedBy()"
          (input)="onInput($event)"
          (blur)="touch.emit()"
        ></textarea>
      } @else {
        <input
          class="fd-input"
          [id]="id"
          [type]="type()"
          [value]="value()"
          [attr.maxlength]="maxLength()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [attr.aria-invalid]="hasError() || null"
          [attr.aria-describedby]="describedBy()"
          (input)="onInput($event)"
          (blur)="touch.emit()"
        />
      }
    </span>

    <div class="fd-field__foot">
      @if (message(); as message) {
        <p class="fd-field__error" [id]="id + '-error'">
          <svg fdIcon="warning"></svg>
          {{ message }}
        </p>
      } @else if (hint()) {
        <p class="fd-field__help" [id]="id + '-hint'">{{ hint() }}</p>
      }
      @if (maxLength(); as max) {
        <span class="fd-field__count" [id]="id + '-count'">{{ value().length }} / {{ max }}</span>
      }
    </div>
  `,
  host: { class: 'fd-field' },
})
export class FdTextField implements FormValueControl<string> {
  /** Valeur saisie (modèle bidirectionnel, compatible Signal Forms). */
  readonly value = model('');

  /** Libellé toujours visible, jamais remplacé par le placeholder. */
  readonly label = input.required<string>();
  readonly hint = input<string>();
  /** Message d'erreur ; remplace l'aide. Sans lui, la première erreur de Signal Forms s'affiche une fois le champ touché. */
  readonly error = input<string>();
  /** Ajoute « (facultatif) » : on marque l'exception, pas l'obligatoire. */
  readonly optional = input(false, { transform: booleanAttribute });
  readonly multiline = input(false, { transform: booleanAttribute });
  readonly maxLength = input<number>();
  readonly icon = input<FdIconName>();
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'search' | 'tel' | 'url' | 'password'>('text');

  // Entrées renseignées par la directive de Signal Forms.
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touch = output<void>();

  protected readonly id = `fd-field-${nextId++}`;

  protected readonly message = computed(
    () => this.error() ?? (this.touched() ? this.errors()[0]?.message : undefined),
  );
  protected readonly hasError = computed(
    () => !!this.message() || (this.invalid() && this.touched()),
  );
  protected readonly describedBy = computed(() => {
    const ids = [this.message() ? `${this.id}-error` : this.hint() ? `${this.id}-hint` : null];
    if (this.maxLength()) ids.push(`${this.id}-count`);
    return ids.filter(Boolean).join(' ') || null;
  });

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement | HTMLTextAreaElement).value);
  }
}
