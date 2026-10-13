import { booleanAttribute, Directive, input } from '@angular/core';

/** Lien dans le texte ou vers une autre page : `<a fdLink href="…">Voir le carnet de Kyoto</a>`. */
@Directive({
  selector: 'a[fdLink], button[fdLink]',
  host: { class: 'fd-link', '[class.fd-link--quiet]': 'quiet()' },
})
export class FdLink {
  /** Couleur du texte parent, pour les listes de liens denses. */
  readonly quiet = input(false, { transform: booleanAttribute });
}
