import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdAlert } from '../alert/alert';
import { FdProgress } from '../progress/progress';
import { FdChip } from '../chip/chip';
import { FdBadge } from '../badge/badge';

@Component({
  imports: [FdBadge, FdAlert, FdProgress, FdChip],
  template: `
    <fd-badge tone="tokiwa" soft>Publié</fd-badge>
    <fd-alert
      tone="danger"
      title="Échec de l'import"
      announce
      dismissible
      (dismissed)="dismissed.set(true)"
    >
      Le fichier dépasse 20 Mo.
    </fd-alert>
    <fd-alert title="Synchronisation en pause">Rien à faire.</fd-alert>
    <fd-progress label="Import des photos" [value]="64" valueText="16 photos sur 25" />
    <fd-progress label="Préparation de l'export PDF" />
    <div role="group" aria-label="Valeurs">
      @for (tag of tags(); track tag) {
        <fd-chip [label]="tag" removable (removed)="remove(tag)" />
      }
    </div>
    <fd-chip label="Temples" [(selected)]="temples" />
  `,
})
class Host {
  dismissed = signal(false);
  tags = signal(['Laine mérinos', 'Crochet 4 mm', 'Point mousse']);
  temples = signal(false);
  remove(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }
}

describe('composants de statut', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it('Badge : combine ton et variante douce', async () => {
    const { root } = await setup();
    expect([...root.querySelector('fd-badge')!.classList].sort()).toEqual([
      'fd-badge',
      'fd-badge--soft',
      'fd-badge--tokiwa',
    ]);
  });

  it('Alert : annoncée en alert pour un danger apparu après une action, silencieuse sinon', async () => {
    const { fixture, root } = await setup();
    const [danger, info] = root.querySelectorAll('fd-alert');

    expect(danger.getAttribute('role')).toBe('alert');
    expect(info.hasAttribute('role')).toBe(false);
    expect(danger.className).toContain('fd-tone-danger');

    danger.querySelector<HTMLButtonElement>('button')!.click();
    expect(fixture.componentInstance.dismissed()).toBe(true);
  });

  it('Progress : valeurs ARIA, et indéterminée sans valeur', async () => {
    const { root } = await setup();
    const [determinate, indeterminate] = root.querySelectorAll('[role="progressbar"]');

    expect(determinate.getAttribute('aria-valuenow')).toBe('64');
    expect(determinate.getAttribute('aria-valuetext')).toBe('16 photos sur 25');
    expect(indeterminate.hasAttribute('aria-valuenow')).toBe(false);
    expect(indeterminate.className).toContain('fd-progress--indeterminate');
  });

  it('Chip saisie : retire la valeur et place le focus sur le chip voisin', async () => {
    const { fixture, root } = await setup();
    const removers = root.querySelectorAll<HTMLButtonElement>('.fd-chip__remove');

    expect(removers[1].getAttribute('aria-label')).toBe('Retirer Crochet 4 mm');
    removers[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.tags()).toEqual(['Laine mérinos', 'Point mousse']);
    expect(document.activeElement).toBe(removers[2]);
  });

  it('Chip filtre : bascule aria-pressed', async () => {
    const { fixture, root } = await setup();
    const chip = root.querySelector<HTMLButtonElement>('button.fd-chip[aria-pressed]')!;

    expect(chip.getAttribute('aria-pressed')).toBe('false');
    chip.click();
    await fixture.whenStable();
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.componentInstance.temples()).toBe(true);
  });
});
