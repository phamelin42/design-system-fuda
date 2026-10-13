import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge } from '../../src/public-api';
import { all, both, pick, states, text } from '../controls';

const TONES = ['neutral', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'enji'] as const;

const meta: Meta = {
  title: 'Status/Badge',
  decorators: [moduleMetadata({ imports: [FdBadge] })],
  parameters: { layout: 'padded' },
  args: { label: 'Badge', tone: 'all', soft: 'both' },
  argTypes: {
    label: { ...text, description: 'Projected content, not an input' },
    tone: all(TONES),
    soft: { ...both, description: 'Tinted `*-soft` background with colored text' },
  },
  render: (args) => ({
    props: { ...args, tones: pick(args['tone'], TONES), softStates: states(args['soft']) },
    template: `
      <div style="display: grid; gap: 16px">
        @for (s of softStates; track s) {
          <div style="display: flex; flex-wrap: wrap; gap: 12px">
            @for (t of tones; track t) {
              <fd-badge [tone]="t" [soft]="s">{{ label }}</fd-badge>
            }
          </div>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
