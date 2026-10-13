import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdProgress } from '../../src/public-api';
import { count } from '../controls';

const meta: Meta = {
  title: 'Status/Progress',
  decorators: [moduleMetadata({ imports: [FdProgress] })],
  parameters: { layout: 'padded' },
  args: { value: 64 },
  argTypes: { value: { ...count(0, 100), description: 'Value of the first bar' } },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 24px; width: 480px">
        <fd-progress label="Importing photos" [value]="value" [valueText]="value + '%'" />
        <fd-progress label="Preparing the PDF export" />
        <fd-progress label="Skeins used" tone="tokiwa" [value]="60" valueText="3 of 5" />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
