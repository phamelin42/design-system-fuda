import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdTab, FdTabs } from './tabs';

@Component({
  imports: [FdTabs, FdTab],
  template: `
    <fd-tabs label="Carnet de Kyoto" [(selected)]="selected" [activation]="activation()">
      <fd-tab id="steps" label="Étapes" [count]="12">Douze étapes.</fd-tab>
      <fd-tab id="photos" label="Photos" [count]="48">48 photos.</fd-tab>
      <fd-tab id="map" label="Carte" disabled>La carte.</fd-tab>
      <fd-tab id="notes" label="Notes">Tes notes.</fd-tab>
    </fd-tabs>
  `,
})
class Host {
  selected = signal<string | undefined>(undefined);
  activation = signal<'auto' | 'manual'>('auto');
}

describe('FdTabs', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const tabs = () => [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const press = async (key: string) => {
      const active = tabs().find((tab) => tab.tabIndex === 0)!;
      active.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };
    return { fixture, root, tabs, press };
  }

  it('suit le pattern WAI-ARIA : tablist, tab, tabpanel, tabindex itinérant', async () => {
    const { root, tabs } = await setup();

    expect(root.querySelector('[role="tablist"]')!.getAttribute('aria-label')).toBe(
      'Carnet de Kyoto',
    );
    expect(tabs().map((tab) => tab.getAttribute('aria-selected'))).toEqual([
      'true',
      'false',
      'false',
      'false',
    ]);
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1]);

    const panel = root.querySelector('[role="tabpanel"]')!;
    expect(panel.textContent).toBe('Douze étapes.');
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs()[0].id);
    expect(tabs()[0].getAttribute('aria-controls')).toBe(panel.id);
  });

  it("change d'onglet aux flèches, en boucle, en sautant les onglets désactivés", async () => {
    const { fixture, tabs, press } = await setup();

    await press('ArrowRight');
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([-1, 0, -1, -1]); // le tabindex suit l'onglet actif
    expect(fixture.componentInstance.selected()).toBe('photos');
    await press('ArrowRight');
    expect(fixture.componentInstance.selected()).toBe('notes'); // « Carte » est désactivé
    await press('ArrowRight');
    expect(fixture.componentInstance.selected()).toBe('steps'); // retour au début
    await press('End');
    expect(fixture.componentInstance.selected()).toBe('notes');
    await press('Home');
    expect(fixture.componentInstance.selected()).toBe('steps');
    await press('ArrowLeft');
    expect(fixture.componentInstance.selected()).toBe('notes');
    expect(document.activeElement).toBe(tabs()[3]);
  });

  it("en activation manuelle, les flèches déplacent le focus sans changer d'onglet", async () => {
    const { fixture, tabs, press } = await setup();
    fixture.componentInstance.activation.set('manual');
    await fixture.whenStable();

    await press('ArrowRight');
    expect(tabs().map((tab) => tab.getAttribute('aria-selected'))).toEqual([
      'true',
      'false',
      'false',
      'false',
    ]);
    expect(fixture.componentInstance.selected()).toBeUndefined();
    expect(document.activeElement).toBe(tabs()[1]);

    tabs()[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selected()).toBe('photos');
  });
});
