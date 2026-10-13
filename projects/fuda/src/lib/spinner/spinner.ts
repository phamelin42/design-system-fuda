import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

const PETALS = [
  [12.0, 5.3],
  [18.37, 9.93],
  [15.94, 17.42],
  [8.06, 17.42],
  [5.63, 9.93],
];

/** Fleur à cinq pétales (hanabira) qui s'ouvrent l'un après l'autre. */
@Component({
  selector: 'fd-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fd-spinner',
    '[class.fd-spinner--md]': 'size() === "md"',
    '[class.fd-spinner--lg]': 'size() === "lg"',
    '[class.fd-spinner--current]': 'color() === "current"',
    '[attr.role]': 'decorative() ? null : "status"',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class FdSpinner {
  readonly size = input<'sm' | 'md' | 'lg'>('sm');
  /** Texte pour les lecteurs d'écran. */
  readonly label = input('Chargement…');
  /** `current` hérite de la couleur du texte (dans un bouton). */
  readonly color = input<'sakura' | 'current'>('sakura');
  /** Masqué aux lecteurs d'écran, quand le parent (un bouton `aria-busy`) porte déjà l'information. */
  readonly decorative = input(false, { transform: booleanAttribute });

  protected readonly petals = PETALS;
}
