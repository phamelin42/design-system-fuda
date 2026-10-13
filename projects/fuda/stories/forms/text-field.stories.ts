import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTextField } from '../../src/public-api';
import { bool, choice, count, json, text } from '../controls';

// The first field takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Forms/Text field',
  decorators: [moduleMetadata({ imports: [FdTextField] })],
  parameters: { layout: 'padded' },
  args: {
    value: '',
    label: 'Notebook name',
    hint: 'Visible to the people you share the notebook with.',
    error: '',
    optional: false,
    multiline: false,
    maxLength: 0,
    icon: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    invalid: false,
    touched: false,
    errors: [],
  },
  argTypes: {
    value: { ...text, description: 'Current value (`model`, two-way bindable)' },
    label: { ...text, description: 'Always visible, never replaced by the placeholder' },
    hint: text,
    error: { ...text, description: 'Replaces the hint and sets `aria-invalid`' },
    optional: {
      ...bool,
      description: 'Adds "(facultatif)": we mark the exception, not the required',
    },
    multiline: { ...bool, description: 'Renders a textarea' },
    maxLength: { ...count(0, 500), description: 'Shows a "n / max" counter when above 0' },
    icon: choice(['', 'search', 'pin', 'edit', 'info']),
    placeholder: text,
    type: choice(['text', 'email', 'search', 'tel', 'url', 'password']),
    disabled: bool,
    invalid: { ...bool, description: 'Set by Signal Forms' },
    touched: {
      ...bool,
      description: 'Set by Signal Forms: validation errors show once the field is touched',
    },
    errors: { ...json, description: 'Set by Signal Forms: `{ kind, message }[]`' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 24px; width: 340px">
        <fd-text-field [value]="value" [label]="label" [hint]="hint || undefined" [error]="error || undefined" [optional]="optional"
          [multiline]="multiline" [maxLength]="maxLength || undefined" [icon]="icon || undefined" [placeholder]="placeholder"
          [type]="type" [disabled]="disabled" [invalid]="invalid" [touched]="touched" [errors]="errors" />
        <fd-text-field label="Home city" optional placeholder="For example Lyon" />
        <fd-text-field label="Short name" error="The name must be at least 3 characters long." />
        <fd-text-field label="Search a stop" icon="search" placeholder="Temple, garden, district…" />
        <fd-text-field label="Notes" hint="Only for you." multiline [maxLength]="280" />
        <fd-text-field label="Code" disabled />
      </div>`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Text field' };
