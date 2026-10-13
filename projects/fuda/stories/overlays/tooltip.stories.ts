import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon, FdIconButton, FdTooltip } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Overlays/Tooltip',
  decorators: [moduleMetadata({ imports: [FdTooltip, FdButton, FdIconButton, FdIcon] })],
  args: { text: 'Share the notebook' },
  argTypes: {
    text: { ...text, description: 'Shown after 400 ms on hover, immediately on keyboard focus' },
  },
  render: (args) => ({
    props: { ...args, placements: ['top', 'right', 'bottom', 'left'] },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; padding: 64px 96px">
        @for (placement of placements; track placement) {
          <button fdButton [fdTooltip]="text" [placement]="placement">{{ placement }}</button>
        }
        <button fdIconButton label="Icon buttons use their label as tooltip"><svg fdIcon="info"></svg></button>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
