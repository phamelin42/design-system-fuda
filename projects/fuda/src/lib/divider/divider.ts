import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

/** Séparateur : un filet discret, ou une bande de brume (`kasumi`) pour un vrai changement de chapitre, une fois par vue au plus. */
@Component({
  selector: 'fd-divider',
  template: '',
  styleUrl: './divider.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fd-divider',
    '[class.fd-divider--kasumi]': 'kasumi()',
    '[attr.role]': 'kasumi() ? null : "separator"',
    '[attr.aria-hidden]': 'kasumi() ? "true" : null',
  },
})
export class FdDivider {
  readonly kasumi = input(false, { transform: booleanAttribute });
}
