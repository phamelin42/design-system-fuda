import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdLink } from '../../src/public-api';
import { bool, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Link',
  decorators: [moduleMetadata({ imports: [FdLink] })],
  args: { label: 'View the Kyoto notebook', quiet: false },
  argTypes: {
    label: text,
    quiet: { ...bool, description: 'Inherits the parent text color, for dense link lists' },
  },
  render: (args) => ({
    props: args,
    template: `<a fdLink [quiet]="quiet" href="#">{{ label }}</a>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Quiet: Story = { args: { label: 'Legal notice', quiet: true } };
