import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSwitch } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Forms/Switch',
  decorators: [moduleMetadata({ imports: [FdSwitch] })],
  parameters: { layout: 'padded' },
  args: { label: 'Offline mode' },
  argTypes: { label: { ...text, description: 'Names the setting, not its state' } },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px">
        <fd-switch>{{ label }}</fd-switch>
        <fd-switch [checked]="true">{{ label }}</fd-switch>
        <fd-switch disabled>Cellular sync (unavailable)</fd-switch>
        <fd-switch [checked]="true" disabled>Autosave (required)</fd-switch>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
