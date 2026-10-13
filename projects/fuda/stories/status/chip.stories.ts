import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdChip } from '../../src/public-api';
import { both, states, text } from '../controls';

const meta: Meta = {
  title: 'Status/Chip',
  decorators: [moduleMetadata({ imports: [FdChip] })],
  parameters: { layout: 'padded' },
  args: { label: 'Temples', selected: 'both', removable: 'both' },
  argTypes: {
    label: text,
    selected: { ...both, description: 'Filter chip: toggled state (`model`)' },
    removable: { ...both, description: 'Input chip: shows a remove button' },
  },
  render: (args) => ({
    props: {
      ...args,
      selectedStates: states(args['selected']),
      removableStates: states(args['removable']),
    },
    template: `
      <div style="display: grid; gap: 16px">
        @for (r of removableStates; track r) {
          <div role="group" [attr.aria-label]="r ? 'Input chips' : 'Filter chips'" style="display: flex; flex-wrap: wrap; gap: 12px">
            @for (s of selectedStates; track s) {
              <fd-chip [label]="label" [selected]="s" [removable]="r" />
            }
          </div>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
