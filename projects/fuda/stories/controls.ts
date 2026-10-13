import type { ArgTypes } from '@storybook/angular-vite';
import { EMBLEM_NAMES } from '../src/public-api';

type ArgType = ArgTypes[string];

/** Shortcuts to declare the Storybook "Controls" panel: every input of a component gets one. */
export const text: ArgType = { control: 'text' };
export const bool: ArgType = { control: 'boolean' };
export const json: ArgType = { control: 'object' };
export const count = (min: number, max: number): ArgType => ({
  control: { type: 'range', min, max, step: 1 },
});
export const choice = (options: readonly string[]): ArgType => ({ control: 'select', options });

/**
 * An input that defines variants (button variant, spinner size…): `all` (the default) shows every value,
 * any other value shows just that one.
 */
export const all = (options: readonly string[]): ArgType => ({
  control: 'select',
  options: ['all', ...options],
});
export const pick = <T extends string>(value: T | 'all', options: readonly T[]): readonly T[] =>
  value === 'all' ? options : [value];

/** A boolean input that defines variants (`soft`, `quiet`…): both states are shown unless one is picked. */
export const both: ArgType = { control: 'inline-radio', options: ['both', 'on', 'off'] };
export const states = (value: 'both' | 'on' | 'off'): readonly boolean[] =>
  value === 'both' ? [false, true] : [value === 'on'];

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
