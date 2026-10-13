import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTextField } from '../../src/public-api';
import { bool, choice, count, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Text field',
  decorators: [moduleMetadata({ imports: [FdTextField] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Notebook name',
    hint: 'Visible to the people you share the notebook with.',
    error: '',
    placeholder: '',
    optional: false,
    multiline: false,
    maxLength: 0,
    icon: '',
    type: 'text',
    disabled: false,
  },
  argTypes: {
    label: { ...text, description: 'Always visible, never replaced by the placeholder' },
    hint: text,
    error: { ...text, description: 'Replaces the hint and sets `aria-invalid`' },
    placeholder: text,
    optional: {
      ...bool,
      description: 'Adds "(facultatif)": we mark the exception, not the required',
    },
    multiline: { ...bool, description: 'Renders a textarea' },
    maxLength: { ...count(0, 280), description: 'Shows a counter when above 0' },
    icon: choice(['', 'search', 'pin', 'edit']),
    type: choice(['text', 'email', 'search', 'tel', 'url', 'password']),
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <fd-text-field style="width: 340px" [label]="label" [hint]="hint" [error]="error || undefined" [placeholder]="placeholder"
        [optional]="optional" [multiline]="multiline" [maxLength]="maxLength || undefined" [icon]="icon || undefined"
        [type]="type" [disabled]="disabled" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Optional: Story = {
  args: { label: 'Home city', hint: '', optional: true, placeholder: 'For example Lyon' },
};

export const WithError: Story = {
  args: { label: 'Short name', error: 'The name must be at least 3 characters long.' },
};

export const WithIcon: Story = {
  args: {
    label: 'Search a stop',
    hint: '',
    icon: 'search',
    placeholder: 'Temple, garden, district…',
  },
};

export const Multiline: Story = {
  args: { label: 'Notes', hint: 'Only for you.', multiline: true, maxLength: 280 },
};

export const Disabled: Story = { args: { label: 'Code', hint: '', disabled: true } };
