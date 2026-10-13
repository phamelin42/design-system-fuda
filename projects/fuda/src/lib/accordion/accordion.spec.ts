import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdAccordion, FdAccordionItem } from './accordion';

@Component({
  imports: [FdAccordion, FdAccordionItem],
  template: `
    <fd-accordion [multiple]="multiple()" [(expanded)]="expanded">
      <fd-accordion-item id="who" title="Qui peut voir mon carnet ?"
        >Toi seul par défaut.</fd-accordion-item
      >
      <fd-accordion-item id="offline" title="Puis-je écrire hors ligne ?">Oui.</fd-accordion-item>
    </fd-accordion>
  `,
})
class Host {
  multiple = signal(true);
  expanded = signal<readonly string[]>(['who']);
}

describe('FdAccordion', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const triggers = () => [...root.querySelectorAll<HTMLButtonElement>('.fd-accordion__trigger')];
    const items = () => [...root.querySelectorAll('fd-accordion-item')];
    return { fixture, root, triggers, items };
  }

  it("relie le déclencheur, la région et l'état ouvert", async () => {
    const { root, triggers, items } = await setup();

    expect(triggers().map((t) => t.getAttribute('aria-expanded'))).toEqual(['true', 'false']);
    expect(items().map((item) => item.getAttribute('data-open'))).toEqual(['true', 'false']);
    const region = root.querySelector('[role="region"]')!;
    expect(triggers()[0].getAttribute('aria-controls')).toBe(region.id);
    expect(region.getAttribute('aria-labelledby')).toBe(triggers()[0].id);
  });

  it('ouvre plusieurs items, ou un seul avec multiple=false', async () => {
    const { fixture, triggers } = await setup();

    triggers()[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.expanded()).toEqual(['who', 'offline']);

    fixture.componentInstance.multiple.set(false);
    fixture.componentInstance.expanded.set(['who']);
    await fixture.whenStable();
    triggers()[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.expanded()).toEqual(['offline']);
  });
});
