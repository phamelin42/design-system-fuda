import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdCheckbox } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Checkbox',
  decorators: [moduleMetadata({ imports: [FdCheckbox] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Show past stops',
    hint: '',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    label: text,
    hint: text,
    checked: bool,
    indeterminate: {
      ...bool,
      description: 'Parent of a partially checked list: a dash replaces the tick',
    },
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `<fd-checkbox [checked]="checked" [indeterminate]="indeterminate" [hint]="hint || undefined" [disabled]="disabled">{{ label }}</fd-checkbox>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };

export const WithHint: Story = { args: { checked: true, hint: 'They stay visible on the map.' } };

export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };

export const Disabled: Story = {
  args: { label: 'Autosave (required)', checked: true, disabled: true },
};
