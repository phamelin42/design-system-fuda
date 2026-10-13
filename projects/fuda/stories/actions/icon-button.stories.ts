import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdIcon, FdIconButton } from '../../src/public-api';
import { ICON_NAMES, all, choice, pick, text } from '../controls';

const VARIANTS = ['ghost', 'outlined'] as const;
const SIZES = ['md', 'sm'] as const;

/** `mixed` shows the button without `aria-pressed` and pressed; the others force one state. */
const PRESSED: Record<string, (boolean | undefined)[]> = {
  mixed: [undefined, true],
  unset: [undefined],
  on: [true],
  off: [false],
};

const meta: Meta = {
  title: 'Actions/Icon button',
  decorators: [moduleMetadata({ imports: [FdIconButton, FdIcon] })],
  args: { label: 'Add to favorites', icon: 'heart', variant: 'all', size: 'all', pressed: 'mixed' },
  argTypes: {
    label: { ...text, description: 'Required: accessible name and tooltip text' },
    icon: { ...choice(ICON_NAMES), description: 'Projected icon, not an input' },
    variant: all(VARIANTS),
    size: { ...all(SIZES), description: '44 / 36 px' },
    pressed: {
      ...choice(['mixed', 'unset', 'on', 'off']),
      description: 'Toggle button state (`aria-pressed`); `unset` means a plain button',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      variants: pick(args['variant'], VARIANTS),
      sizes: pick(args['size'], SIZES),
      pressedStates: PRESSED[args['pressed']],
    },
    template: `
      <div style="display: grid; gap: 16px">
        @for (s of sizes; track s) {
          <div style="display: flex; gap: 12px; align-items: center">
            @for (v of variants; track v) {
              @for (p of pressedStates; track $index) {
                <button fdIconButton [label]="label" [variant]="v" [size]="s" [pressed]="p"><svg [fdIcon]="icon"></svg></button>
              }
            }
          </div>
        }
      </div>`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Icon button' };
