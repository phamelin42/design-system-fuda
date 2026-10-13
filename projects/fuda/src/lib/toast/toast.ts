import {
  ApplicationRef,
  Component,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { FdTone, TONE_ICONS } from '../alert/alert';
import { FdIconButton } from '../button/icon-button';
import { FdLink } from '../button/link';
import { FdIcon } from '../icon/icon';

export interface FdToastOptions {
  tone?: FdTone;
  title: string;
  text?: string;
  /** Action facultative, par exemple « Annuler ». */
  action?: { label: string; run: () => void };
  /** Durée d'affichage en ms (5000 par défaut). */
  duration?: number;
}

export interface FdToastRef {
  dismiss(): void;
}

interface ToastItem extends FdToastOptions {
  id: number;
  leaving: boolean;
}

const MAX_VISIBLE = 3;
const LEAVE_DURATION = 400; // marge au-dessus de duration-quick, pour laisser jouer la sortie « chiru »

/** Affiche des toasts : `toast.show({ tone: 'success', title: 'Carnet créé' })`. */
@Injectable({ providedIn: 'root' })
export class FdToastService {
  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  private region?: ComponentRef<FdToastRegion>;
  private nextId = 0;

  /** Les toasts à l'écran, du plus ancien au plus récent. */
  readonly toasts = signal<ToastItem[]>([]);

  show(options: FdToastOptions): FdToastRef {
    this.ensureRegion();
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { ...options, id, leaving: false }]);

    // Trois toasts au plus : le plus ancien part en premier.
    const visible = this.toasts().filter((toast) => !toast.leaving);
    visible
      .slice(0, Math.max(0, visible.length - MAX_VISIBLE))
      .forEach((toast) => this.dismiss(toast.id));

    return { dismiss: () => this.dismiss(id) };
  }

  dismiss(id: number): void {
    this.toasts.update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)),
    );
    setTimeout(
      () => this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id)),
      LEAVE_DURATION,
    );
  }

  /** La région des toasts est créée au premier affichage : rien à poser dans l'application. */
  private ensureRegion(): void {
    if (this.region) return;
    this.region = createComponent(FdToastRegion, { environmentInjector: this.injector });
    this.appRef.attachView(this.region.hostView);
    document.body.appendChild(this.region.location.nativeElement);
  }
}

@Component({
  selector: 'fd-toast-region',
  imports: [FdIcon, FdIconButton, FdLink],
  template: `
    @for (toast of service.toasts(); track toast.id) {
      <div
        class="fd-toast"
        [class]="'fd-tone-' + (toast.tone ?? 'info')"
        [class.is-entering]="!toast.leaving"
        [class.is-leaving]="toast.leaving"
        [attr.role]="toast.tone === 'danger' ? 'alert' : 'status'"
      >
        <span class="fd-status" aria-hidden="true"
          ><svg [fdIcon]="icons[toast.tone ?? 'info']"></svg
        ></span>
        <div>
          <p class="fd-toast__title">{{ toast.title }}</p>
          @if (toast.text) {
            <p class="fd-toast__text">{{ toast.text }}</p>
          }
          @if (toast.action; as action) {
            <button
              fdLink
              class="fd-toast__action"
              type="button"
              (click)="action.run(); service.dismiss(toast.id)"
            >
              {{ action.label }}
            </button>
          }
        </div>
        <button fdIconButton label="Fermer" (click)="service.dismiss(toast.id)">
          <svg fdIcon="close"></svg>
        </button>
        <span
          class="fd-toast__timer"
          [style.--_duration.ms]="toast.duration ?? 5000"
          (animationend)="service.dismiss(toast.id)"
        ></span>
      </div>
    }
  `,
  host: { class: 'fd-toast-region', 'aria-live': 'polite' },
})
export class FdToastRegion {
  protected readonly service = inject(FdToastService);
  protected readonly icons = TONE_ICONS;
}
