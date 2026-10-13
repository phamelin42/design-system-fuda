import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdButton } from './button';
import { FdIcon } from '../icon/icon';
import { FdIconButton } from './icon-button';

@Component({
  imports: [FdButton, FdIconButton, FdIcon],
  template: `
    <button
      fdButton
      variant="primary"
      size="lg"
      [loading]="loading()"
      (click)="clicks.update((n) => n + 1)"
    >
      Enregistrer
    </button>
    <button fdIconButton label="Favori" [pressed]="true"><svg fdIcon="heart"></svg></button>
  `,
})
class Host {
  loading = signal(false);
  clicks = signal(0);
}

describe('FdButton', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('[fdButton]') as HTMLButtonElement;
    return { fixture, button };
  }

  it('applique la variante et la taille', async () => {
    const { button } = await setup();
    expect([...button.classList].sort()).toEqual([
      'fd-button',
      'fd-button--lg',
      'fd-button--primary',
    ]);
  });

  it('laisse passer les clics au repos', async () => {
    const { fixture, button } = await setup();
    button.click();
    expect(fixture.componentInstance.clicks()).toBe(1);
  });

  it('pose aria-busy, affiche la fleur et bloque les clics pendant le chargement', async () => {
    const { fixture, button } = await setup();
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();

    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('fd-spinner')).not.toBeNull();
    button.click();
    expect(fixture.componentInstance.clicks()).toBe(0);
  });
});

describe('FdIconButton', () => {
  it('prend son nom accessible dans le label et pose aria-pressed', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('[fdIconButton]') as HTMLElement;

    expect(button.getAttribute('aria-label')).toBe('Favori');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.className).toContain('fd-icon-button');
  });
});
