import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdCheckbox } from '../../src/public-api';
import { bool, text } from '../controls';

// The first checkbox takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Forms/Checkbox',
  decorators: [moduleMetadata({ imports: [FdCheckbox] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Show past stops',
    hint: 'They stay visible on the map.',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    label: { ...text, description: 'Projected content, not an input' },
    hint: text,
    checked: { ...bool, description: '`model`, two-way bindable' },
    indeterminate: {
      ...bool,
      description: 'Parent of a partially checked list: a dash replaces the tick',
    },
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px">
        <fd-checkbox [checked]="checked" [indeterminate]="indeterminate" [hint]="hint || undefined" [disabled]="disabled">{{ label }}</fd-checkbox>
        <fd-checkbox [checked]="true">Checked</fd-checkbox>
        <fd-checkbox [indeterminate]="true">Indeterminate</fd-checkbox>
        <fd-checkbox [checked]="true" disabled>Autosave (required)</fd-checkbox>
        <fd-checkbox disabled>Disabled</fd-checkbox>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
