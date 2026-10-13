import type { ArgTypes } from '@storybook/angular-vite';
import { EMBLEM_NAMES } from '../src/public-api';

/** Raccourcis pour déclarer les contrôles du panneau « Controls » de Storybook. */
export const text: ArgTypes[string] = { control: 'text' };
export const bool: ArgTypes[string] = { control: 'boolean' };
export const count = (min: number, max: number): ArgTypes[string] => ({
  control: { type: 'range', min, max, step: 1 },
});
export const choice = (options: readonly string[]): ArgTypes[string] => ({
  control: 'select',
  options,
});

export const ICON_NAMES = [
  'plus',
  'trash',
  'close',
  'check',
  'info',
  'warning',
  'edit',
  'share',
  'heart',
  'more',
  'search',
  'pin',
];
export const EMBLEMS = [...EMBLEM_NAMES];
