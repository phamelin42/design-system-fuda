import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSwitch } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Switch',
  decorators: [moduleMetadata({ imports: [FdSwitch] })],
  parameters: { layout: 'padded' },
  args: { label: 'Offline mode', checked: false, disabled: false },
  argTypes: {
    label: { ...text, description: 'Names the setting, not its state' },
    checked: bool,
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `<fd-switch [checked]="checked" [disabled]="disabled">{{ label }}</fd-switch>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Off: Story = {};

export const On: Story = { args: { checked: true } };

export const Disabled: Story = { args: { label: 'Cellular sync (unavailable)', disabled: true } };
