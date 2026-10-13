import { Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { FdEmblem, FdEmblemName, emblemFor } from '../emblem/emblem';

export type FdAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Rond d'identité : photo (avec repli sur l'emblème), emblème, ou initiales quand l'emblème est désactivé. */
@Component({
  selector: 'fd-avatar',
  imports: [FdEmblem],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  encapsulation: ViewEncapsulation.None,
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
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.scss',
  encapsulation: ViewEncapsulation.None,
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
