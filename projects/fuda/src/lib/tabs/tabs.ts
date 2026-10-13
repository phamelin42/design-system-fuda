import { NgTemplateOutlet } from '@angular/common';
import {
  afterEveryRender,
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  contentChildren,
  ElementRef,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
  viewChildren,
  ViewEncapsulation,
} from '@angular/core';

let nextId = 0;

/** Un onglet et son panneau : le contenu projeté est le panneau. */
@Component({
  selector: 'fd-tab',
  templateUrl: './tab.html',
})
export class FdTab {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly count = input<number>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly panel = viewChild.required(TemplateRef);
}

/**
 * Onglets WAI-ARIA : flèches (en boucle), Début et Fin, tabindex itinérant.
 * L'onglet actif est souligné d'un trait rose qui glisse.
 */
@Component({
  selector: 'fd-tabs',
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'fd-tabs' },
})
export class FdTabs {
  /** Nom de la liste d'onglets, lu par les lecteurs d'écran. */
  readonly label = input.required<string>();
  /** Identifiant de l'onglet actif ; le premier onglet actif par défaut. */
  readonly selected = model<string>();
  /** `manual` quand un panneau est coûteux à charger : les flèches déplacent le focus sans changer d'onglet. */
  readonly activation = input<'auto' | 'manual'>('auto');

  protected readonly tabs = contentChildren(FdTab);
  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');
  private readonly indicator = viewChild.required<ElementRef<HTMLElement>>('indicator');

  private readonly uid = `fd-tabs-${nextId++}`;
  private readonly focusedId = signal<string | undefined>(undefined);
  private placed = false;

  protected readonly current = computed(
    () =>
      this.tabs().find((tab) => tab.id() === this.selected() && !tab.disabled()) ??
      this.tabs().find((tab) => !tab.disabled()),
  );
  /** Le tab qui reçoit Tab : celui qui a le focus, sinon l'onglet actif. */
  protected readonly focusable = computed(
    () => this.tabs().find((tab) => tab.id() === this.focusedId()) ?? this.current(),
  );

  constructor() {
    afterEveryRender(() => this.placeIndicator());
    // Les polices changent la largeur des onglets : on replace l'indicateur quand elles sont chargées.
    afterNextRender(() => document.fonts?.ready.then(() => this.placeIndicator()));
  }

  protected tabId(tab: FdTab): string {
    return `${this.uid}-tab-${tab.id()}`;
  }

  protected panelId(tab: FdTab): string {
    return `${this.uid}-panel-${tab.id()}`;
  }

  protected select(tab: FdTab): void {
    this.selected.set(tab.id());
    this.focusedId.set(tab.id());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const enabled = this.tabs().filter((tab) => !tab.disabled());
    // On part de l'onglet qui reçoit la touche, pas de l'état : c'est lui qui a le focus.
    const index = enabled.findIndex(
      (tab) => this.tabId(tab) === (event.currentTarget as HTMLElement).id,
    );
    const target = {
      ArrowRight: enabled[(index + 1) % enabled.length],
      ArrowLeft: enabled[(index - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1],
    }[event.key];
    if (!target) return;

    event.preventDefault();
    this.focusedId.set(target.id());
    if (this.activation() === 'auto') this.selected.set(target.id());
    this.buttons()[this.tabs().indexOf(target)]?.nativeElement.focus();
  }

  /** Mesure l'onglet actif et glisse l'indicateur dessous (largeur et position). */
  private placeIndicator(): void {
    const tab = this.current();
    const button = tab && this.buttons()[this.tabs().indexOf(tab)]?.nativeElement;
    if (!button) return;

    const indicator = this.indicator().nativeElement;
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.transform = `translateX(${button.offsetLeft}px)`;
    // La première mise en place ne s'anime pas.
    if (!this.placed) {
      this.placed = true;
      requestAnimationFrame(() => indicator.classList.add('is-ready'));
    }
  }
}
