import { Component, computed, input, signal } from '@angular/core';
import { FdEmblem, FdEmblemName, emblemFor } from '../emblem/emblem';

export type FdAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Rond d'identité : photo (avec repli sur l'emblème), emblème, ou initiales quand l'emblème est désactivé. */
@Component({
  selector: 'fd-avatar',
  imports: [FdEmblem],
  template: `
    @if (src() && !photoFailed()) {
      <img class="fd-avatar__photo" [src]="src()" alt="" (error)="photoFailed.set(true)" />
    } @else if (emblem() === 'initials') {
      {{ initials() }}
    } @else {
      <fd-emblem [name]="emblemName()" size="fill" [ring]="false" />
    }
  `,
  host: {
    class: 'fd-avatar',
    '[class]': '"fd-avatar--" + size()',
    role: 'img',
    '[attr.aria-label]': 'name()',
  },
})
export class FdAvatar {
  /** Nom complet : texte alternatif et source de l'emblème automatique. */
  readonly name = input.required<string>();
  /** `auto` : emblème déterminé par le nom ; `initials` : initiales en Dela Gothic One. */
  readonly emblem = input<FdEmblemName | 'auto' | 'initials'>('auto');
  readonly src = input<string>();
  readonly size = input<FdAvatarSize>('md');

  protected readonly photoFailed = signal(false);
  protected readonly emblemName = computed(() => {
    const emblem = this.emblem();
    return emblem === 'auto' || emblem === 'initials' ? emblemFor(this.name()) : emblem;
  });
  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join(''),
  );
}

/** Groupe d'avatars qui se chevauchent ; au-delà de `max`, une pastille « +n ». */
@Component({
  selector: 'fd-avatar-group',
  imports: [FdAvatar],
  template: `
    @for (person of visible(); track person) {
      <fd-avatar [name]="person" />
    }
    @if (hidden() > 0) {
      <span class="fd-avatar fd-avatar__more" role="img" [attr.aria-label]="hiddenLabel()"
        >+{{ hidden() }}</span
      >
    }
  `,
  host: { class: 'fd-avatar-group', role: 'group' },
})
export class FdAvatarGroup {
  readonly names = input.required<readonly string[]>();
  readonly max = input(4);

  protected readonly visible = computed(() => this.names().slice(0, this.max()));
  protected readonly hidden = computed(() => Math.max(0, this.names().length - this.max()));
  protected readonly hiddenLabel = computed(() => {
    const n = this.hidden();
    return `et ${n} autre${n > 1 ? 's' : ''} personne${n > 1 ? 's' : ''}`;
  });
}
