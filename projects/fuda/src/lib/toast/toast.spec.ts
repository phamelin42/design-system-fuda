import { TestBed } from '@angular/core/testing';
import { FdToastService } from './toast';

describe('FdToastService', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('fd-toast-region').forEach((region) => region.remove());
  });

  async function flush() {
    TestBed.tick();
    await vi.advanceTimersByTimeAsync(0);
    TestBed.tick();
  }

  it('affiche un toast dans une région aria-live créée à la demande', async () => {
    const toast = TestBed.inject(FdToastService);
    toast.show({ tone: 'success', title: 'Carnet créé', text: '« Kyoto » est prêt.' });
    await flush();

    const region = document.querySelector('fd-toast-region')!;
    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(region.querySelector('.fd-toast__title')!.textContent).toBe('Carnet créé');
    expect(region.querySelector('.fd-toast')!.getAttribute('role')).toBe('status');
  });

  it('annonce un danger en role="alert"', async () => {
    TestBed.inject(FdToastService).show({ tone: 'danger', title: "Échec de l'import" });
    await flush();

    expect(document.querySelector('.fd-toast')!.getAttribute('role')).toBe('alert');
  });

  it('garde trois toasts au plus : le plus ancien part en premier', async () => {
    const toast = TestBed.inject(FdToastService);
    ['un', 'deux', 'trois', 'quatre'].forEach((title) => toast.show({ title }));
    await flush();

    const leaving = [...document.querySelectorAll('.fd-toast.is-leaving .fd-toast__title')];
    expect(leaving.map((el) => el.textContent)).toEqual(['un']);

    await vi.advanceTimersByTimeAsync(500);
    TestBed.tick();
    const titles = [...document.querySelectorAll('.fd-toast__title')].map((el) => el.textContent);
    expect(titles).toEqual(['deux', 'trois', 'quatre']);
  });

  it("se ferme avec dismiss() et lance l'action avant de partir", async () => {
    const toast = TestBed.inject(FdToastService);
    const run = vi.fn();
    const ref = toast.show({ title: 'Photo supprimée', action: { label: 'Annuler', run } });
    await flush();

    document.querySelector<HTMLButtonElement>('.fd-toast__action')!.click();
    expect(run).toHaveBeenCalled();

    ref.dismiss();
    await vi.advanceTimersByTimeAsync(500);
    TestBed.tick();
    expect(document.querySelector('.fd-toast')).toBeNull();
  });
});
