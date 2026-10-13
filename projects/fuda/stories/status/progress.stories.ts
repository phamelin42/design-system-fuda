import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdProgress } from '../../src/public-api';
import { all, both, count, pick, states, text } from '../controls';

const TONES = ['mizu', 'tokiwa'] as const;

const meta: Meta = {
  title: 'Status/Progress',
  decorators: [moduleMetadata({ imports: [FdProgress] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Importing photos',
    value: 64,
    valueText: '16 of 25',
    tone: 'all',
    indeterminate: 'both',
  },
  argTypes: {
    label: { ...text, description: 'What is progressing' },
    value: { ...count(0, 100), description: '0 to 100; `null` makes it indeterminate' },
    valueText: { ...text, description: 'Readable text, also used as `aria-valuetext`' },
    tone: { ...all(TONES), description: '`tokiwa` for a goal reached step by step' },
    indeterminate: { ...both, description: 'Unknown duration: `value` is `null`' },
  },
  render: (args) => ({
    props: {
      ...args,
      tones: pick(args['tone'], TONES),
      indeterminateStates: states(args['indeterminate']),
    },
    template: `
      <div style="display: grid; gap: 24px; width: 480px">
        @for (t of tones; track t) {
          @for (i of indeterminateStates; track i) {
            <fd-progress [label]="label + ' (' + t + ')'" [tone]="t" [value]="i ? null : value" [valueText]="i ? undefined : valueText || undefined" />
          }
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
