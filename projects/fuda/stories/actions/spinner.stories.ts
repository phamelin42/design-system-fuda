import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSpinner } from '../../src/public-api';
import { choice, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Spinner',
  decorators: [moduleMetadata({ imports: [FdSpinner] })],
  args: { color: 'sakura', label: 'Loading…' },
  argTypes: {
    color: { ...choice(['sakura', 'current']), description: '`current` inherits the text color' },
    label: { ...text, description: 'Text for screen readers' },
  },
  render: (args) => ({
    props: { ...args, sizes: ['sm', 'md', 'lg'] },
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        @for (size of sizes; track size) {
          <fd-spinner [size]="size" [color]="color" [label]="label"></fd-spinner>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
