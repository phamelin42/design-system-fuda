import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

export type FdTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

const OFFSET = 10;
const SHOW_DELAY = 400; // ms au survol ; le focus clavier ouvre sans délai
const HIDE_DELAY = 100; // laisse le temps d'aller du bouton à la bulle

const POSITIONS: Record<FdTooltipPlacement, ConnectedPosition> = {
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -OFFSET,
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: OFFSET,
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -OFFSET,
  },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: OFFSET,
  },
};
const OPPOSITE: Record<FdTooltipPlacement, FdTooltipPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

/** Bulle d'encre affichée par la directive `fdTooltip`. */
@Component({
  selector: 'fd-tooltip-panel',
  templateUrl: './tooltip-panel.html',
  host: {
    class: 'fd-tooltip',
    role: 'tooltip',
    '[id]': 'id()',
    '[attr.data-open]': 'open()',
    '[attr.data-placement]': 'placement()',
  },
})
export class FdTooltipPanel {
  readonly text = input('');
  readonly id = input('');
  readonly placement = signal<FdTooltipPlacement>('top');
  readonly open = signal(false);
}

let nextId = 0;

/**
 * Infobulle : `<button fdTooltip="Partager le carnet">`.
 * Apparaît après 400 ms au survol, tout de suite au focus clavier ; Échap la ferme.
 * Pas d'infobulle sur écran tactile : le contrôle doit se suffire.
 */
@Directive({
  selector: '[fdTooltip]',
  host: {
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointerleave)': 'hide()',
    '(focus)': 'onFocus()',
    '(blur)': 'hide(true)',
    '(keydown.escape)': 'hide(true)',
    '[attr.aria-describedby]': 'describedBy()',
  },
})
export class FdTooltip {
  readonly fdTooltip = input.required<string>();
  readonly placement = input<FdTooltipPlacement>('top');

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly overlay = inject(Overlay);
  private readonly panelId = `fd-tooltip-${nextId++}`;

  private overlayRef?: OverlayRef;
  private panel?: ComponentRef<FdTooltipPanel>;
  private timer?: ReturnType<typeof setTimeout>;
  protected readonly isOpen = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.dispose());
  }

  /** Une infobulle qui répète le `aria-label` du contrôle n'a pas besoin d'être lue deux fois. */
  protected describedBy(): string | null {
    if (!this.isOpen() || this.host.getAttribute('aria-label') === this.fdTooltip()) return null;
    return this.panelId;
  }

  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.schedule(() => this.show(), SHOW_DELAY);
  }

  protected onFocus(): void {
    if (this.host.matches(':focus-visible')) this.show();
  }

  protected hide(immediately = false): void {
    this.schedule(() => this.close(), immediately ? 0 : HIDE_DELAY);
  }

  private schedule(action: () => void, delay: number): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(action, delay);
  }

  private show(): void {
    clearTimeout(this.timer);
    if (this.isOpen()) return;

    const preferred = this.placement();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.host)
      .withPositions([POSITIONS[preferred], POSITIONS[OPPOSITE[preferred]]])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
    this.panel = this.overlayRef.attach(new ComponentPortal(FdTooltipPanel));
    this.panel.setInput('text', this.fdTooltip());
    this.panel.setInput('id', this.panelId);
    this.panel.instance.placement.set(preferred);

    // L'arrow suit le côté choisi par CDK (retournement automatique).
    positionStrategy.positionChanges.subscribe(({ connectionPair }) => {
      const flipped = connectionPair !== POSITIONS[preferred];
      this.panel?.instance.placement.set(flipped ? OPPOSITE[preferred] : preferred);
    });

    // La bulle reste ouverte tant que le pointeur est dessus.
    const element = this.panel.location.nativeElement as HTMLElement;
    element.addEventListener('pointerenter', () => clearTimeout(this.timer));
    element.addEventListener('pointerleave', () => this.hide());

    this.isOpen.set(true);
    requestAnimationFrame(() => this.panel?.instance.open.set(true));
  }

  private close(): void {
    if (!this.isOpen()) return;
    this.panel?.instance.open.set(false);
    this.isOpen.set(false);
    // On laisse jouer la sortie (duration-quick) avant de détacher.
    const overlayRef = this.overlayRef;
    setTimeout(() => overlayRef?.dispose(), 160);
    this.overlayRef = this.panel = undefined;
  }

  private dispose(): void {
    clearTimeout(this.timer);
    this.overlayRef?.dispose();
  }
}
