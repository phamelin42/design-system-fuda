import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdCheckbox } from './checkbox';
import { FdSwitch } from '../switch/switch';
import { FdRadioGroup } from '../radio/radio-group';

@Component({
  imports: [FdCheckbox, FdSwitch, FdRadioGroup],
  template: `
    <fd-checkbox [(checked)]="all" [indeterminate]="partial()" hint="Elles restent visibles"
      >Tout sélectionner</fd-checkbox
    >
    <fd-switch [(checked)]="offline">Mode hors ligne</fd-switch>
    <fd-radio-group legend="Qui peut voir ce carnet ?" [options]="options" [(value)]="visibility" />
  `,
})
class Host {
  all = signal(false);
  partial = signal(true);
  offline = signal(true);
  visibility = signal('me');
  options = [
    { value: 'me', label: 'Seulement moi' },
    { value: 'friends', label: 'Mes amis', hint: 'Les personnes invitées.' },
    { value: 'soon', label: 'Public (bientôt)', disabled: true },
  ];
}

describe('formulaires de sélection', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it("coche la case, avec l'état indéterminé quand il est demandé", async () => {
    const { fixture, root } = await setup();
    const input = root.querySelector<HTMLInputElement>('.fd-check__input')!;

    expect(input.indeterminate).toBe(true);
    input.click();
    expect(fixture.componentInstance.all()).toBe(true);
  });

  it('est un vrai role="switch" natif', async () => {
    const { fixture, root } = await setup();
    const input = root.querySelector<HTMLInputElement>('input[role="switch"]')!;

    expect(input.checked).toBe(true);
    input.click();
    expect(fixture.componentInstance.offline()).toBe(false);
  });

  it('regroupe les radios dans un fieldset nommé et suit le choix', async () => {
    const { fixture, root } = await setup();
    const radios = [...root.querySelectorAll<HTMLInputElement>('.fd-radio__input')];

    expect(root.querySelector('fieldset legend')!.textContent).toBe('Qui peut voir ce carnet ?');
    expect(new Set(radios.map((radio) => radio.name)).size).toBe(1);
    expect(radios.map((radio) => radio.checked)).toEqual([true, false, false]);
    expect(radios[2].disabled).toBe(true);

    radios[1].click();
    expect(fixture.componentInstance.visibility()).toBe('friends');
  });
});
