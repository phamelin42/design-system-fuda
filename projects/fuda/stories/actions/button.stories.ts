import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon } from '../../src/public-api';
import { bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Button',
  decorators: [moduleMetadata({ imports: [FdButton, FdIcon] })],
  args: {
    label: 'Create a notebook',
    variant: 'primary',
    size: 'md',
    loading: false,
    block: false,
    disabled: false,
    icon: true,
  },
  argTypes: {
    label: text,
    variant: {
      ...choice(['primary', 'secondary', 'ghost', 'danger']),
      description: 'One `primary` per view',
    },
    size: choice(['sm', 'md', 'lg']),
    loading: {
      ...bool,
      description: 'Shows the flower spinner, sets `aria-busy` and blocks clicks',
    },
    block: { ...bool, description: 'Full width' },
    disabled: bool,
    icon: { ...bool, description: 'Leading icon (demo only: projected content)' },
  },
  render: (args) => ({
    props: args,
    template: `
      <button fdButton [variant]="variant" [size]="size" [loading]="loading" [block]="block" [disabled]="disabled">
        @if (icon) { <svg fdIcon="plus"></svg> }
        {{ label }}
      </button>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'View details', icon: false },
};

export const Ghost: Story = { args: { variant: 'ghost', label: 'Cancel', icon: false } };

export const Danger: Story = { args: { variant: 'danger', label: 'Delete notebook', icon: false } };

export const Loading: Story = { args: { loading: true, label: 'Saving…', icon: false } };

export const Disabled: Story = { args: { disabled: true, label: 'Save', icon: false } };

export const Large: Story = { args: { size: 'lg', label: 'Start the trip', icon: false } };
