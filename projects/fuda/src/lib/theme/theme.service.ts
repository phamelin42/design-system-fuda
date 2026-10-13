import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type FdTheme = 'light' | 'dark';

const STORAGE_KEY = 'fuda-theme';

/**
 * Thème Jour par défaut ; le thème Nuit n'est posé (data-theme="dark" sur <html>)
 * que si l'utilisateur le choisit. La préférence système n'est jamais lue.
 */
@Injectable({ providedIn: 'root' })
export class FdThemeService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly theme = signal<FdTheme>(this.stored());

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (theme === 'dark') {
        this.root.setAttribute('data-theme', 'dark');
      } else {
        this.root.removeAttribute('data-theme');
      }
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // stockage indisponible (navigation privée) : le choix reste valable pour la session
      }
    });
  }

  set(theme: FdTheme): void {
    this.theme.set(theme);
  }

  toggle(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private stored(): FdTheme {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
