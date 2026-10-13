import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSelect } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Forms/Select',
  decorators: [moduleMetadata({ imports: [FdSelect] })],
  parameters: { layout: 'padded' },
  args: { label: 'Hook', placeholder: 'Choose a size', hint: 'Printed on the yarn label.' },
  argTypes: {
    label: text,
    placeholder: { ...text, description: 'First, disabled option' },
    hint: text,
  },
  render: (args) => ({
    props: {
      ...args,
      options: ['2.5 mm', '3 mm', '4 mm', '5 mm', '6 mm'].map((size) => ({
        value: size,
        label: size,
      })),
    },
    template: `
      <div style="display: grid; gap: 24px; width: 300px">
        <fd-select [label]="label" [placeholder]="placeholder || undefined" [hint]="hint" [options]="options" />
        <fd-select label="Hook (with error)" placeholder="Choose a size" error="Choose a hook size to continue." [options]="options" />
        <fd-select label="Hook (disabled)" placeholder="Choose a size" disabled [options]="options" />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
