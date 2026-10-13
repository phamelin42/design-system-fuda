import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdCheckbox } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Forms/Checkbox',
  decorators: [moduleMetadata({ imports: [FdCheckbox] })],
  parameters: { layout: 'padded' },
  args: { label: 'Show past stops', hint: 'They stay visible on the map.' },
  argTypes: { label: text, hint: text },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px">
        <fd-checkbox>{{ label }}</fd-checkbox>
        <fd-checkbox [checked]="true" [hint]="hint">{{ label }}</fd-checkbox>
        <fd-checkbox [indeterminate]="true">Select all</fd-checkbox>
        <fd-checkbox [checked]="true" disabled>Autosave (required)</fd-checkbox>
        <fd-checkbox disabled>Disabled</fd-checkbox>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
