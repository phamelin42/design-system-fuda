import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

/** Lien dans le texte ou vers une autre page : `<a fdLink href="…">Voir le carnet de Kyoto</a>`. */
@Component({
  // Composant posé sur un élément natif (sémantique HTML conservée) : le sélecteur n'est pas un élément fd-.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[fdLink], button[fdLink]',
  templateUrl: './link.html',
  styleUrl: './link.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'fd-link', '[class.fd-link--quiet]': 'quiet()' },
})
export class FdLink {
  /** Couleur du texte parent, pour les listes de liens denses. */
  readonly quiet = input(false, { transform: booleanAttribute });
}
