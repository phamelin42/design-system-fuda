import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSelect } from '../../src/public-api';
import { bool, json, text } from '../controls';

const OPTIONS = ['2.5 mm', '3 mm', '4 mm', '5 mm', '6 mm'].map((size) => ({
  value: size,
  label: size,
}));

// The first select takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Forms/Select',
  decorators: [moduleMetadata({ imports: [FdSelect] })],
  parameters: { layout: 'padded' },
  args: {
    value: '',
    label: 'Hook',
    options: OPTIONS,
    placeholder: 'Choose a size',
    hint: 'Printed on the yarn label.',
    error: '',
    disabled: false,
    invalid: false,
    touched: false,
    errors: [],
  },
  argTypes: {
    value: { ...text, description: 'Chosen value (`model`, two-way bindable)' },
    label: text,
    options: { ...json, description: '`{ value, label, disabled? }[]`' },
    placeholder: { ...text, description: 'First, disabled option' },
    hint: text,
    error: { ...text, description: 'Replaces the hint and sets `aria-invalid`' },
    disabled: bool,
    invalid: { ...bool, description: 'Set by Signal Forms' },
    touched: { ...bool, description: 'Set by Signal Forms: validation errors show once touched' },
    errors: { ...json, description: 'Set by Signal Forms: `{ kind, message }[]`' },
  },
  render: (args) => ({
    props: { ...args, referenceOptions: OPTIONS },
    template: `
      <div style="display: grid; gap: 24px; width: 300px">
        <fd-select [value]="value" [label]="label" [options]="options" [placeholder]="placeholder || undefined" [hint]="hint"
          [error]="error || undefined" [disabled]="disabled" [invalid]="invalid" [touched]="touched" [errors]="errors" />
        <fd-select label="Hook (with error)" placeholder="Choose a size" error="Choose a hook size to continue." [options]="referenceOptions" />
        <fd-select label="Hook (disabled)" placeholder="Choose a size" disabled [options]="referenceOptions" />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
