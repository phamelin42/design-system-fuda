import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdDivider } from '../../src/public-api';
import { both, states } from '../controls';

const meta: Meta = {
  title: 'Content/Divider',
  decorators: [moduleMetadata({ imports: [FdDivider] })],
  args: { kasumi: 'both' },
  argTypes: {
    kasumi: { ...both, description: 'Mist bands for a real chapter change: once per view at most' },
  },
  render: (args) => ({
    props: { ...args, kasumiStates: states(args['kasumi']) },
    template: `
      <div style="width: 420px">
        @for (k of kasumiStates; track k) {
          <p style="margin: 0">Day 1: arrival in Kyoto, a walk along the Shirakawa canal.</p>
          <fd-divider [kasumi]="k" />
        }
        <p style="margin: 0">Day 2: Fushimi Inari at dawn, then the Nishiki market.</p>
      </div>`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Divider' };
