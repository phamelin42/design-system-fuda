import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSwitch } from '../../src/public-api';
import { bool, text } from '../controls';

// The first switch takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Forms/Switch',
  decorators: [moduleMetadata({ imports: [FdSwitch] })],
  parameters: { layout: 'padded' },
  args: { label: 'Offline mode', checked: false, disabled: false },
  argTypes: {
    label: {
      ...text,
      description: 'Projected content, not an input: names the setting, not its state',
    },
    checked: { ...bool, description: '`model`, two-way bindable' },
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px">
        <fd-switch [checked]="checked" [disabled]="disabled">{{ label }}</fd-switch>
        <fd-switch [checked]="true">On</fd-switch>
        <fd-switch disabled>Cellular sync (unavailable)</fd-switch>
        <fd-switch [checked]="true" disabled>Autosave (required)</fd-switch>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
