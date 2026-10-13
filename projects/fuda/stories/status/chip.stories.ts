import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdChip } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Status/Chip',
  decorators: [moduleMetadata({ imports: [FdChip] })],
  args: { label: 'Temples', selected: false, removable: false },
  argTypes: {
    label: text,
    selected: { ...bool, description: 'Filter chip: toggled state' },
    removable: { ...bool, description: 'Input chip: shows a remove button' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-chip [label]="label" [selected]="selected" [removable]="removable" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Filter: Story = {};

export const Selected: Story = { args: { selected: true } };

export const Removable: Story = { args: { label: 'Merino wool', removable: true } };
