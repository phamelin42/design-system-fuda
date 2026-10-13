import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdProgress } from '../../src/public-api';
import { bool, choice, count, text } from '../controls';

const meta: Meta = {
  title: 'Status/Progress',
  decorators: [moduleMetadata({ imports: [FdProgress] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Importing photos',
    value: 64,
    indeterminate: false,
    valueText: '16 of 25',
    tone: 'mizu',
  },
  argTypes: {
    label: text,
    value: count(0, 100),
    indeterminate: { ...bool, description: 'Unknown duration: `value` is `null`' },
    valueText: { ...text, description: 'Readable text, also used as `aria-valuetext`' },
    tone: {
      ...choice(['mizu', 'tokiwa']),
      description: '`tokiwa` for a goal reached step by step',
    },
  },
  render: (args) => ({
    props: args,
    template: `<fd-progress style="width: 480px" [label]="label" [value]="indeterminate ? null : value" [valueText]="valueText || undefined" [tone]="tone" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Determinate: Story = {};

export const Indeterminate: Story = {
  args: { label: 'Preparing the PDF export', indeterminate: true, valueText: '' },
};

export const Goal: Story = {
  args: { label: 'Skeins used', value: 60, valueText: '3 of 5', tone: 'tokiwa' },
};
