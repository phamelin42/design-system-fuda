import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { EMBLEM_NAMES, FdEmblem, emblemFor } from './emblem';

@Component({
  imports: [FdEmblem],
  template: `
    @for (name of names; track name) {
      <fd-emblem [name]="name" [label]="name" />
    }
    <fd-emblem name="ume" />
  `,
})
class Host {
  names = EMBLEM_NAMES;
}

describe('emblems', () => {
  it('rend chacun des dix emblèmes avec son disque et son nom accessible', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const svgs = [...fixture.nativeElement.querySelectorAll('svg')] as SVGElement[];

    expect(svgs).toHaveLength(11);
    EMBLEM_NAMES.forEach((name, i) => {
      expect(svgs[i].classList).toContain(`fd-mon--${name}`);
      expect(svgs[i].getAttribute('role')).toBe('img');
      expect(svgs[i].getAttribute('aria-label')).toBe(name);
      expect(svgs[i].querySelector('.disc')).not.toBeNull();
    });
  });

  it("est décoratif sans label et porte l'anneau par défaut", async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const decorative = fixture.nativeElement.querySelectorAll('svg')[10] as SVGElement;

    expect(decorative.getAttribute('aria-hidden')).toBe('true');
    expect(decorative.getAttribute('role')).toBeNull();
    expect(decorative.querySelector('.fd-mon__ring')).not.toBeNull();
  });

  it('attribue un emblème stable à un identifiant', () => {
    expect(emblemFor('Phil')).toBe(emblemFor('Phil'));
    expect(EMBLEM_NAMES).toContain(emblemFor('Mariko'));
    const used = new Set(
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'].map(emblemFor),
    );
    expect(used.size).toBeGreaterThan(3);
  });
});
