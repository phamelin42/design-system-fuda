import {
  booleanAttribute,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FdIconButton } from '../button/icon-button';
import { FdIcon, FdIconName } from '../icon/icon';

export type FdTone = 'info' | 'success' | 'warning' | 'danger';

export const TONE_ICONS: Record<FdTone, FdIconName> = {
  info: 'info',
  success: 'check',
  warning: 'warning',
  danger: 'close',
};

/** Message posé dans la page qui explique une situation et, si besoin, comment en sortir. */
@Component({
  selector: 'fd-alert',
  imports: [FdIcon, FdIconButton],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"fd-alert fd-tone-" + tone()',
    '[attr.role]': 'role()',
  },
})
export class FdAlert {
  readonly tone = input<FdTone>('info');
  /** Ce qui se passe, en quelques mots. */
  readonly title = input.required<string>();
  readonly dismissible = input(false, { transform: booleanAttribute });
  /** À activer pour une alerte apparue après une action : elle est alors annoncée (`alert` pour `danger`, `status` sinon). */
  readonly announce = input(false, { transform: booleanAttribute });
  readonly dismissed = output<void>();

  protected readonly icon = computed(() => TONE_ICONS[this.tone()]);
  protected readonly role = computed(() =>
    this.announce() ? (this.tone() === 'danger' ? 'alert' : 'status') : null,
  );
}
