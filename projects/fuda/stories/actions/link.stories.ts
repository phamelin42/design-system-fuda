import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdLink } from '../../src/public-api';
import { both, states, text } from '../controls';

const meta: Meta = {
  title: 'Actions/Link',
  decorators: [moduleMetadata({ imports: [FdLink] })],
  args: { label: 'View the Kyoto notebook', quiet: 'both' },
  argTypes: {
    label: text,
    quiet: { ...both, description: '`quiet` inherits the parent text color, for dense link lists' },
  },
  render: (args) => ({
    props: { ...args, quietStates: states(args['quiet']) },
    template: `
      <div style="display: grid; gap: 12px">
        @for (q of quietStates; track q) {
          <a fdLink [quiet]="q" href="#">{{ label }}</a>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
