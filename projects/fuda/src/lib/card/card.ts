import { Component, ElementRef, computed, inject, input } from '@angular/core';
import { FdEmblem, FdEmblemName } from '../emblem/emblem';

export type FdCardSky = 'sakura' | 'asagi' | 'tokiwa' | 'fuji' | 'yamabuki' | 'kon';

/**
 * La fuda : une carte au liseré d'encre, avec en option un ciel coloré et un emblème.
 * Sur `<a fdCard href>` elle est cliquable en entier (et ne contient alors aucun autre bouton) ;
 * sur `<article fdCard>` elle peut porter des actions.
 *
 * Emplacements : `slot="badge"` (dans le ciel), `slot="title"`, `slot="meta"`, `slot="actions"`, le reste est le texte.
 * Le disque de l'emblème ne reprend jamais la couleur du ciel.
 */
@Component({
  // Composant posé sur un élément natif (sémantique HTML conservée) : le sélecteur n'est pas un élément fd-.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[fdCard], article[fdCard], div[fdCard]',
  imports: [FdEmblem],
  templateUrl: './card.html',
  host: { '[class]': 'classes()' },
})
export class FdCard {
  /** Couleur du ciel ; sans ciel, la carte n'a que son liseré. */
  readonly sky = input<FdCardSky>();
  readonly emblem = input<FdEmblemName>();

  private readonly isLink =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'A';
  protected readonly classes = computed(() => (this.isLink ? 'fd-card fd-card--link' : 'fd-card'));
}
