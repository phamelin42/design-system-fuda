import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSpinner } from '../../src/public-api';
import { choice, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Spinner',
  decorators: [moduleMetadata({ imports: [FdSpinner] })],
  args: { size: 'sm', color: 'sakura', label: 'Loading…' },
  argTypes: {
    size: choice(['sm', 'md', 'lg']),
    color: { ...choice(['sakura', 'current']), description: '`current` inherits the text color' },
    label: { ...text, description: 'Text for screen readers' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-spinner [size]="size" [color]="color" [label]="label"></fd-spinner>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Small: Story = {};

export const Medium: Story = { args: { size: 'md' } };

export const Large: Story = { args: { size: 'lg' } };
