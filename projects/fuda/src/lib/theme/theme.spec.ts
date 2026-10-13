import { TestBed } from '@angular/core/testing';
import { FdThemeService } from './theme.service';

describe('FdThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('reste en thème Jour par défaut, sans data-theme', () => {
    const service = TestBed.inject(FdThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('light');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('pose data-theme="dark" sur <html> et mémorise le choix', () => {
    const service = TestBed.inject(FdThemeService);

    service.set('dark');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('fuda-theme')).toBe('dark');

    service.toggle();
    TestBed.tick();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
