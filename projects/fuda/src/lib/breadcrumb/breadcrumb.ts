import { Component, input } from '@angular/core';

export interface FdBreadcrumbItem {
  label: string;
  link?: string;
}

/** Fil d'Ariane, à partir de trois niveaux. Le dernier élément est la page courante. */
@Component({
  selector: 'fd-breadcrumb',
  template: `
    <nav aria-label="Fil d'Ariane">
      <ol>
        @for (item of items(); track $index; let last = $last) {
          <li>
            @if (last || !item.link) {
              <span [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            } @else {
              <a [href]="item.link">{{ item.label }}</a>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  host: { class: 'fd-breadcrumb' },
})
export class FdBreadcrumb {
  readonly items = input.required<readonly FdBreadcrumbItem[]>();
}
