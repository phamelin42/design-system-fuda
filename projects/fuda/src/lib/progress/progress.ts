import { Component, input, ViewEncapsulation } from '@angular/core';

let nextId = 0;

/** Barre de progression ; `value` à `null` (par défaut) : durée inconnue. */
@Component({
  selector: 'fd-progress',
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  encapsulation: ViewEncapsulation.None,
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
