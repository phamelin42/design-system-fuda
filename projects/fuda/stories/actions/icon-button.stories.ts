import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdIcon, FdIconButton } from '../../src/public-api';
import { ICON_NAMES, choice, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Icon button',
  decorators: [moduleMetadata({ imports: [FdIconButton, FdIcon] })],
  args: { label: 'Edit', icon: 'edit' },
  argTypes: {
    label: { ...text, description: 'Required: accessible name and tooltip text' },
    icon: choice(ICON_NAMES),
  },
  render: (args) => ({
    props: { ...args, variants: ['ghost', 'outlined'], sizes: ['md', 'sm'] },
    template: `
      <div style="display: grid; gap: 16px">
        @for (size of sizes; track size) {
          <div style="display: flex; gap: 12px; align-items: center">
            @for (variant of variants; track variant) {
              <button fdIconButton [label]="label" [variant]="variant" [size]="size"><svg [fdIcon]="icon"></svg></button>
            }
            <button fdIconButton label="Add to favorites" [size]="size" [pressed]="true"><svg fdIcon="heart"></svg></button>
          </div>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
