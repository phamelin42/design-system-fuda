import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdChip } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Status/Chip',
  decorators: [moduleMetadata({ imports: [FdChip] })],
  parameters: { layout: 'padded' },
  args: { label: 'Temples' },
  argTypes: { label: text },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 16px">
        <div role="group" aria-label="Filter chips" style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-chip [label]="label" />
          <fd-chip [label]="label" [selected]="true" />
        </div>
        <div role="group" aria-label="Input chips" style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-chip label="Merino wool" removable />
          <fd-chip label="4 mm hook" removable />
        </div>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
