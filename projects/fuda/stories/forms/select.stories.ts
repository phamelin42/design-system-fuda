import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSelect } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Select',
  decorators: [moduleMetadata({ imports: [FdSelect] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Hook',
    placeholder: 'Choose a size',
    hint: 'Printed on the yarn label.',
    error: '',
    disabled: false,
    options: ['2.5 mm', '3 mm', '4 mm', '5 mm', '6 mm'].map((size) => ({
      value: size,
      label: size,
    })),
  },
  argTypes: {
    label: text,
    placeholder: { ...text, description: 'First, disabled option' },
    hint: text,
    error: text,
    disabled: bool,
    options: { control: 'object', description: '`{ value, label, disabled? }[]`' },
  },
  render: (args) => ({
    props: args,
    template: `
      <fd-select style="width: 300px" [label]="label" [placeholder]="placeholder || undefined" [hint]="hint"
        [error]="error || undefined" [disabled]="disabled" [options]="options" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithError: Story = { args: { hint: '', error: 'Choose a hook size to continue.' } };

export const Disabled: Story = { args: { disabled: true } };
