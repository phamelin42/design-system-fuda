import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdAvatar, FdAvatarGroup } from './avatar';

@Component({
  imports: [FdAvatar, FdAvatarGroup],
  template: `
    <fd-avatar name="Phil Hamelin" emblem="initials" size="lg" />
    <fd-avatar name="Mariko" src="/inexistant.png" />
    <fd-avatar-group [names]="['Phil', 'Mariko', 'Léo', 'Yuki', 'Aya', 'Ren', 'Sora']" />
  `,
})
class Host {}

describe('FdAvatar', () => {
  it('nomme la personne et affiche ses initiales', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const [initials] = fixture.nativeElement.querySelectorAll('fd-avatar');

    expect(initials.getAttribute('aria-label')).toBe('Phil Hamelin');
    expect(initials.textContent.trim()).toBe('PH');
    expect(initials.classList).toContain('fd-avatar--lg');
  });

  it("se replie sur l'emblème quand la photo ne charge pas", async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const avatar = fixture.nativeElement.querySelectorAll('fd-avatar')[1] as HTMLElement;

    avatar.querySelector('img')!.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(avatar.querySelector('img')).toBeNull();
    expect(avatar.querySelector('svg')).not.toBeNull();
  });

  it('résume les personnes en trop dans une pastille annoncée', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const more = fixture.nativeElement.querySelector('.fd-avatar__more') as HTMLElement;

    expect(more.textContent).toBe('+3');
    expect(more.getAttribute('aria-label')).toBe('et 3 autres personnes');
  });
});
