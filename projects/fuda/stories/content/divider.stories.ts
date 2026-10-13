import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdDivider } from '../../src/public-api';

const meta: Meta = {
  title: 'Content/Divider',
  decorators: [moduleMetadata({ imports: [FdDivider] })],
  render: () => ({
    template: `
      <div style="width: 420px">
        <p style="margin: 0">Day 1: arrival in Kyoto, a walk along the Shirakawa canal.</p>
        <fd-divider />
        <p style="margin: 0">Day 2: Fushimi Inari at dawn, then the Nishiki market.</p>
        <fd-divider kasumi />
        <p style="margin: 0">Second week: Nara and Osaka. (The mist bands mark a real chapter change, once per view at most.)</p>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
