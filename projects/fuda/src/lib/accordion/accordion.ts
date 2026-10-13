import { booleanAttribute, Component, computed, inject, input, model } from '@angular/core';
import { FdIcon } from '../icon/icon';

/** Liste de sections repliables : des `fd-accordion-item` en contenu. */
@Component({
  selector: 'fd-accordion',
  template: '<ng-content />',
  host: { class: 'fd-accordion' },
})
export class FdAccordion {
  /** `false` : ouvrir un item referme les autres. */
  readonly multiple = input(true, { transform: booleanAttribute });
  /** Identifiants des items ouverts. */
  readonly expanded = model<readonly string[]>([]);

  toggle(id: string): void {
    const open = this.expanded().includes(id);
    if (open) {
      this.expanded.update((ids) => ids.filter((other) => other !== id));
    } else {
      this.expanded.update((ids) => (this.multiple() ? [...ids, id] : [id]));
    }
  }
}

@Component({
  selector: 'fd-accordion-item',
  imports: [FdIcon],
  template: `
    <h3 class="fd-accordion__heading">
      <button
        class="fd-accordion__trigger"
        type="button"
        [id]="id() + '-trigger'"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="id() + '-panel'"
        (click)="accordion.toggle(id())"
      >
        {{ title() }}
        <svg fdIcon="chevron-right"></svg>
      </button>
    </h3>
    <div
      class="fd-accordion__panel"
      role="region"
      [id]="id() + '-panel'"
      [attr.aria-labelledby]="id() + '-trigger'"
    >
      <div>
        <div class="fd-accordion__body"><ng-content /></div>
      </div>
    </div>
  `,
  host: { class: 'fd-accordion__item', '[attr.data-open]': 'open()' },
})
export class FdAccordionItem {
  readonly id = input.required<string>();
  readonly title = input.required<string>();

  protected readonly accordion = inject(FdAccordion);
  protected readonly open = computed(() => this.accordion.expanded().includes(this.id()));
}
