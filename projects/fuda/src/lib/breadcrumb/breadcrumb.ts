import { Component, input, ViewEncapsulation } from '@angular/core';

export interface FdBreadcrumbItem {
  label: string;
  link?: string;
}

/** Fil d'Ariane, à partir de trois niveaux. Le dernier élément est la page courante. */
@Component({
  selector: 'fd-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'fd-breadcrumb' },
})
export class FdBreadcrumb {
  readonly items = input.required<readonly FdBreadcrumbItem[]>();
}
