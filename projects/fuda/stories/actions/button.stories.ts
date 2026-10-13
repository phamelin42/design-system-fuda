import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Button',
  decorators: [moduleMetadata({ imports: [FdButton, FdIcon] })],
  args: { label: 'Create a notebook', icon: true, loading: false, disabled: false },
  argTypes: {
    label: text,
    icon: { ...bool, description: 'Leading icon (projected content)' },
    loading: {
      ...bool,
      description: 'Shows the flower spinner, sets `aria-busy` and blocks clicks',
    },
    disabled: bool,
  },
  render: (args) => ({
    props: {
      ...args,
      variants: ['primary', 'secondary', 'ghost', 'danger'],
      sizes: ['sm', 'md', 'lg'],
    },
    template: `
      <div style="display: grid; gap: 16px">
        @for (size of sizes; track size) {
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
            @for (variant of variants; track variant) {
              <button fdButton [variant]="variant" [size]="size" [loading]="loading" [disabled]="disabled">
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
