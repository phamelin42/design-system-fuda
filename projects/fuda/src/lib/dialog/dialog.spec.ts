import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdButton } from '../button/button';
import { FdDialog, FdDialogFrame, FdDialogRef } from './dialog';

@Component({
  imports: [FdDialogFrame, FdButton],
  template: `
    <fd-dialog title="Supprimer ce carnet ?">
      <p>« Kyoto au printemps » sera supprimé définitivement.</p>
      <div slot="actions">
        <button fdButton cdkFocusInitial type="button" id="cancel" (click)="ref.close(false)">
          Annuler
        </button>
        <button fdButton variant="danger" type="button" id="confirm" (click)="ref.close(true)">
          Supprimer le carnet
        </button>
      </div>
    </fd-dialog>
  `,
})
class ConfirmDelete {
  ref = inject<FdDialogRef<boolean>>(FdDialogRef);
}

@Component({
  imports: [FdButton],
  template: '<button fdButton id="opener" type="button">Supprimer</button>',
})
class Opener {}

describe('FdDialog', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => el.replaceChildren());
  });

  async function open(role: 'dialog' | 'alertdialog' = 'alertdialog') {
    const fixture = TestBed.createComponent(Opener);
    document.body.appendChild(fixture.nativeElement);
    const opener = fixture.nativeElement.querySelector('#opener') as HTMLButtonElement;
    opener.focus();

    const ref = TestBed.inject(FdDialog).open<boolean>(ConfirmDelete, { role });
    const result = vi.fn();
    ref.closed.subscribe(result);
    await vi.advanceTimersByTimeAsync(50);
    return { ref, opener, result };
  }

  // Le focus initial sur l'action la moins risquée dépend de la mise en page : il est vérifié par les tests Playwright.
  it('ouvre une modale nommée et décrite', async () => {
    await open();
    const container = document.querySelector('.cdk-dialog-container')!;
    const title = document.querySelector('.fd-dialog__title')!;

    expect(container.getAttribute('role')).toBe('alertdialog');
    expect(container.getAttribute('aria-modal')).toBe('true');
    expect(container.getAttribute('aria-labelledby')).toBe(title.id);
    expect(container.getAttribute('aria-describedby')).toBe(
      document.querySelector('.fd-dialog__body')!.id,
    );
  });

  it('rend le résultat à la fermeture après la sortie « chiru », et rend le focus au déclencheur', async () => {
    const { opener, result } = await open();

    document.querySelector<HTMLButtonElement>('#confirm')!.click();
    expect(document.querySelector('.fd-dialog.is-leaving')).not.toBeNull();
    await vi.advanceTimersByTimeAsync(400);

    expect(result).toHaveBeenCalledWith(true);
    expect(document.querySelector('.fd-dialog')).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it('se ferme avec Échap, sans résultat', async () => {
    const { result } = await open();

    document
      .querySelector('.cdk-dialog-container')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await vi.advanceTimersByTimeAsync(400);

    expect(result).toHaveBeenCalledWith(undefined);
    expect(document.querySelector('.fd-dialog')).toBeNull();
  });

  it('se ferme au clic sur le voile', async () => {
    const { result } = await open('dialog');

    document.querySelector<HTMLElement>('.cdk-overlay-backdrop')!.click();
    await vi.advanceTimersByTimeAsync(400);

    expect(result).toHaveBeenCalledWith(undefined);
  });
});
