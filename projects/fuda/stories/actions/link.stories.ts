import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdLink } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Actions/Link',
  decorators: [moduleMetadata({ imports: [FdLink] })],
  args: { label: 'View the Kyoto notebook' },
  argTypes: { label: text },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px">
        <a fdLink href="#">{{ label }}</a>
        <a fdLink quiet href="#">{{ label }} (quiet: inherits the text color)</a>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
