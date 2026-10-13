import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon, FdIconButton, FdTooltip } from '../../src/public-api';
import { choice, text } from '../controls';

const meta: Meta = {
  title: 'Overlays/Tooltip',
  decorators: [moduleMetadata({ imports: [FdTooltip, FdButton, FdIconButton, FdIcon] })],
  args: { text: 'Share the notebook', placement: 'top' },
  argTypes: {
    text: { ...text, description: 'Shown after 400 ms on hover, immediately on keyboard focus' },
    placement: {
      ...choice(['top', 'bottom', 'left', 'right']),
      description: 'Flips automatically when it would leave the screen',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; padding: 64px">
        <button fdButton [fdTooltip]="text" [placement]="placement">Hover or tab here</button>
        <button fdIconButton label="Icon buttons get their tooltip from the label"><svg fdIcon="info"></svg></button>
      </div>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
