import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdIcon, FdIconButton } from '../../src/public-api';
import { ICON_NAMES, bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Icon button',
  decorators: [moduleMetadata({ imports: [FdIconButton, FdIcon] })],
  args: { label: 'Edit', icon: 'edit', variant: 'ghost', size: 'md', pressed: undefined },
  argTypes: {
    label: { ...text, description: 'Required: accessible name and tooltip text' },
    icon: choice(ICON_NAMES),
    variant: choice(['ghost', 'outlined']),
    size: choice(['sm', 'md']),
    pressed: { ...bool, description: 'Makes it a toggle button (`aria-pressed`)' },
  },
  render: (args) => ({
    props: args,
    template: `<button fdIconButton [label]="label" [variant]="variant" [size]="size" [pressed]="pressed"><svg [fdIcon]="icon"></svg></button>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Outlined: Story = { args: { label: 'Search', icon: 'search', variant: 'outlined' } };

export const Pressed: Story = { args: { label: 'Add to favorites', icon: 'heart', pressed: true } };

export const Small: Story = { args: { label: 'Close', icon: 'close', size: 'sm' } };
