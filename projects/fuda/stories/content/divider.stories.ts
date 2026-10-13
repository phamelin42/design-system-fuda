import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdDivider } from '../../src/public-api';
import { bool } from '../controls';

const meta: Meta = {
  title: 'Content/Divider',
  decorators: [moduleMetadata({ imports: [FdDivider] })],
  args: { kasumi: false },
  argTypes: {
    kasumi: { ...bool, description: 'Mist bands for a real chapter change: once per view at most' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px">
        <p style="margin: 0">Day 1: arrival in Kyoto, a walk along the Shirakawa canal.</p>
        <fd-divider [kasumi]="kasumi" />
        <p style="margin: 0">Day 2: Fushimi Inari at dawn, then the Nishiki market.</p>
      </div>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Rule: Story = {};

export const Kasumi: Story = { args: { kasumi: true } };
