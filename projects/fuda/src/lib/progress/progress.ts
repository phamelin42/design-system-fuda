import { Component, input } from '@angular/core';

let nextId = 0;

/** Barre de progression ; `value` à `null` (par défaut) : durée inconnue. */
@Component({
  selector: 'fd-progress',
  template: `
    <div class="fd-progress__head">
      <span [id]="id">{{ label() }}</span>
      @if (valueText(); as text) {
        <span class="fd-progress__value">{{ text }}</span>
      }
    </div>
    <div
      class="fd-progress__track"
      role="progressbar"
      [class.fd-progress--indeterminate]="value() === null"
      [attr.aria-labelledby]="id"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuetext]="valueText() ?? null"
    >
      <div class="fd-progress__bar" [style.--value.%]="value()"></div>
    </div>
  `,
  host: { class: 'fd-progress', '[class.fd-progress--tokiwa]': 'tone() === "tokiwa"' },
})
export class FdProgress {
  /** 0 à 100 ; `null` : indéterminée. */
  readonly value = input<number | null>(null);
  /** Ce qui progresse. */
  readonly label = input.required<string>();
  /** Texte lisible, par exemple « 16 photos sur 25 ». */
  readonly valueText = input<string>();
  /** `tokiwa` pour un objectif atteint progressivement (pelotes utilisées, étapes visitées). */
  readonly tone = input<'mizu' | 'tokiwa'>('mizu');

  protected readonly id = `fd-progress-${nextId++}`;
}
