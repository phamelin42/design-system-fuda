import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import {
  booleanAttribute,
  Component,
  inject,
  Injectable,
  InjectionToken,
  input,
} from '@angular/core';
import { Observable, filter } from 'rxjs';
import { FdIconButton } from '../button/icon-button';
import { FdIcon } from '../icon/icon';

/** Identifiants des éléments qui nomment et décrivent le dialogue (posés par le service). */
export const FD_DIALOG_IDS = new InjectionToken<{ title: string; body: string }>('FD_DIALOG_IDS');

const LEAVE_DURATION = 300; // marge au-dessus de duration-quick, si animationend n'arrive pas

/** Référence au dialogue ouvert, à injecter dans le composant de contenu. `close()` joue la sortie « chiru ». */
export class FdDialogRef<R = unknown> {
  private leaving = false;

  /** Émet le résultat à la fermeture. */
  readonly closed: Observable<R | undefined>;

  constructor(private readonly ref: DialogRef<R>) {
    this.closed = ref.closed;
  }

  close(result?: R): void {
    if (this.leaving) return;
    this.leaving = true;

    const overlay = this.ref.overlayRef;
    const card = overlay.overlayElement.querySelector('.fd-dialog');
    card?.classList.add('is-leaving');
    overlay.backdropElement?.classList.add('is-leaving');

    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        this.ref.close(result);
      }
    };
    card?.addEventListener('animationend', finish);
    setTimeout(finish, LEAVE_DURATION);
  }
}

export interface FdDialogConfig<D = unknown> {
  data?: D;
  /** `alertdialog` pour les confirmations destructrices. */
  role?: 'dialog' | 'alertdialog';
  /** Échap et clic sur le voile ferment le dialogue (par défaut `true`). */
  dismissible?: boolean;
}

let nextId = 0;

/**
 * Ouvre un composant dans un dialogue modal : `dialog.open(DeleteNotebook, { role: 'alertdialog' })`.
 * Le composant s'habille de `<fd-dialog>` et reçoit `FdDialogRef` et `DIALOG_DATA` par injection.
 * Pour le focus initial, poser `cdkFocusInitial` sur l'action la moins risquée.
 */
@Injectable({ providedIn: 'root' })
export class FdDialog {
  private readonly dialog = inject(Dialog);

  open<R = unknown, D = unknown>(
    component: ComponentType<unknown>,
    config: FdDialogConfig<D> = {},
  ): FdDialogRef<R> {
    const uid = nextId++;
    const ids = { title: `fd-dialog-title-${uid}`, body: `fd-dialog-body-${uid}` };
    let fdRef!: FdDialogRef<R>;

    const ref = this.dialog.open<R, D, unknown>(component, {
      data: config.data,
      role: config.role ?? 'dialog',
      ariaModal: true,
      ariaLabelledBy: ids.title,
      ariaDescribedBy: ids.body,
      disableClose: true, // Échap et voile passent par FdDialogRef pour jouer la sortie
      backdropClass: 'fd-dialog-backdrop',
      providers: (cdkRef) => {
        fdRef = new FdDialogRef(cdkRef);
        return [
          { provide: FdDialogRef, useValue: fdRef },
          { provide: FD_DIALOG_IDS, useValue: ids },
        ];
      },
    });

    if (config.dismissible ?? true) {
      ref.keydownEvents
        .pipe(filter((event) => event.key === 'Escape'))
        .subscribe(() => fdRef.close());
      ref.backdropClick.subscribe(() => fdRef.close());
    }
    return fdRef;
  }
}

/**
 * Cadre visuel d'un dialogue : titre, corps, bouton fermer et actions (`slot="actions"`).
 * Le titre pose la question, le corps dit la conséquence, les boutons répètent le verbe.
 */
@Component({
  selector: 'fd-dialog',
  imports: [FdIcon, FdIconButton],
  templateUrl: './dialog-frame.html',
  host: { class: 'fd-dialog' },
})
export class FdDialogFrame {
  readonly title = input.required<string>();
  /** Affiche le bouton fermer. */
  readonly dismissible = input(true, { transform: booleanAttribute });

  protected readonly ref = inject(FdDialogRef);
  protected readonly ids = inject(FD_DIALOG_IDS);
}
