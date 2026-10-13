import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon } from '../../src/public-api';
import { all, bool, pick, text } from '../controls';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const meta: Meta = {
  title: 'Actions/Button',
  decorators: [moduleMetadata({ imports: [FdButton, FdIcon] })],
  args: {
    variant: 'all',
    size: 'all',
    label: 'Create a notebook',
    icon: true,
    loading: false,
    block: false,
    disabled: false,
  },
  argTypes: {
    variant: { ...all(VARIANTS), description: 'Visual hierarchy: one `primary` per view' },
    size: { ...all(SIZES), description: '36 / 44 / 52 px high' },
    label: text,
    icon: { ...bool, description: 'Leading icon (projected content, not an input)' },
    loading: {
      ...bool,
      description: 'Shows the flower spinner, sets `aria-busy` and blocks clicks',
    },
    block: { ...bool, description: 'Full width' },
    disabled: bool,
  },
  render: (args) => ({
    props: { ...args, variants: pick(args['variant'], VARIANTS), sizes: pick(args['size'], SIZES) },
    template: `
      <div style="display: grid; gap: 16px">
        @for (s of sizes; track s) {
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
            @for (v of variants; track v) {
              <button fdButton [variant]="v" [size]="s" [loading]="loading" [block]="block" [disabled]="disabled">
                @if (icon) { <svg fdIcon="plus"></svg> }
                {{ label }}
              </button>
            }
          </div>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
