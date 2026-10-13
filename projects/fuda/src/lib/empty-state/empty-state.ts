import { Component, input } from '@angular/core';
import { FdEmblem, FdEmblemName } from '../emblem/emblem';

/** Écran vide qui invite à agir : un emblème, une phrase, un seul bouton (contenu projeté). */
@Component({
  selector: 'fd-empty-state',
  imports: [FdEmblem],
  template: `
    <fd-emblem [name]="emblem()" [size]="96" />
    <h2 class="fd-empty__title">{{ title() }}</h2>
    @if (text()) {
      <p class="fd-empty__text">{{ text() }}</p>
    }
    <ng-content />
  `,
  host: { class: 'fd-empty' },
})
export class FdEmptyState {
  /** Ce qui manque, sans reproche. */
  readonly title = input.required<string>();
  /** Ce que l'utilisateur gagne à agir. */
  readonly text = input<string>();
  readonly emblem = input<FdEmblemName>('tsubame');
}
