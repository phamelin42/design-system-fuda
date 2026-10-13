import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdIconButton } from '../button/icon-button';
import { FdIcon } from '../icon/icon';
import { FdTooltip } from './tooltip';

@Component({
  imports: [FdTooltip, FdIconButton, FdIcon],
  template: `
    <button fdTooltip="Partager le carnet" type="button">Partager</button>
    <button fdIconButton label="Modifier l'étape" type="button"><svg fdIcon="edit"></svg></button>
  `,
})
class Host {}

describe('FdTooltip', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await vi.advanceTimersByTimeAsync(0);
    const [button, iconButton] = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    const panel = () => document.querySelector('.fd-tooltip');
    return { fixture, button, iconButton, panel };
  }

  it('attend 400 ms au survol, puis se décrit au bouton', async () => {
    const { fixture, button, panel } = await setup();

    button.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse' }));
    await vi.advanceTimersByTimeAsync(399);
    expect(panel()).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(panel()!.getAttribute('role')).toBe('tooltip');
    expect(panel()!.textContent).toBe('Partager le carnet');
    expect(button.getAttribute('aria-describedby')).toBe(panel()!.id);
  });

  it("s'ouvre tout de suite au focus clavier et se ferme avec Échap", async () => {
    const { fixture, button, panel } = await setup();
    vi.spyOn(button, 'matches').mockReturnValue(true);

    button.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(panel()).not.toBeNull();

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await vi.advanceTimersByTimeAsync(500);
    expect(panel()).toBeNull();
  });

  it("n'apparaît pas au toucher", async () => {
    const { button, panel } = await setup();

    button.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'touch' }));
    await vi.advanceTimersByTimeAsync(1000);
    expect(panel()).toBeNull();
  });

  it("n'est pas lue deux fois quand elle répète le nom accessible d'un IconButton", async () => {
    const { fixture, iconButton, panel } = await setup();
    vi.spyOn(iconButton, 'matches').mockReturnValue(true);

    iconButton.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(panel()!.textContent).toBe("Modifier l'étape");
    expect(iconButton.getAttribute('aria-label')).toBe("Modifier l'étape");
    expect(iconButton.hasAttribute('aria-describedby')).toBe(false);
  });
});
