import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon, FdIconButton, FdTooltip } from '../../src/public-api';
import { all, pick, text } from '../controls';

const PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const;

const meta: Meta = {
  title: 'Overlays/Tooltip',
  decorators: [moduleMetadata({ imports: [FdTooltip, FdButton, FdIconButton, FdIcon] })],
  args: { text: 'Share the notebook', placement: 'all' },
  argTypes: {
    text: {
      ...text,
      description: '`fdTooltip`: shown after 400 ms on hover, immediately on keyboard focus',
    },
    placement: {
      ...all(PLACEMENTS),
      description: 'Flips automatically when it would leave the screen',
    },
  },
  render: (args) => ({
    props: { ...args, placements: pick(args['placement'], PLACEMENTS) },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; padding: 64px 96px">
        @for (p of placements; track p) {
          <button fdButton [fdTooltip]="text" [placement]="p">{{ p }}</button>
        }
        <button fdIconButton label="Icon buttons use their label as tooltip"><svg fdIcon="info"></svg></button>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
