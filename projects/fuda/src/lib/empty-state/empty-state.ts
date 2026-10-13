import { Component, input, ViewEncapsulation } from '@angular/core';
import { FdEmblem, FdEmblemName } from '../emblem/emblem';

/** Écran vide qui invite à agir : un emblème, une phrase, un seul bouton (contenu projeté). */
@Component({
  selector: 'fd-empty-state',
  imports: [FdEmblem],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'fd-empty' },
})
export class FdEmptyState {
  /** Ce qui manque, sans reproche. */
  readonly title = input.required<string>();
  /** Ce que l'utilisateur gagne à agir. */
  readonly text = input<string>();
  readonly emblem = input<FdEmblemName>('tsubame');
}
