import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { EMBLEM_NAMES, FdEmblem } from '../../src/public-api';
import { all, bool, count, pick, text } from '../controls';

const meta: Meta = {
  title: 'Identity/Emblem',
  decorators: [moduleMetadata({ imports: [FdEmblem] })],
  args: { name: 'all', size: 72, ring: true, label: '' },
  argTypes: {
    name: { ...all(EMBLEM_NAMES), description: '`all` shows the ten emblems' },
    size: { ...count(24, 160), description: 'In px' },
    ring: { ...bool, description: '`rim` ring around the disc' },
    label: { ...text, description: 'Accessible name; the emblem name is used when empty' },
  },
  render: (args) => ({
    props: { ...args, names: pick(args['name'], EMBLEM_NAMES) },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px 32px; max-width: 720px">
        @for (n of names; track n) {
          <figure style="margin: 0; display: grid; justify-items: center; gap: 6px">
            <fd-emblem [name]="n" [size]="size" [ring]="ring" [label]="label || n" />
            <figcaption class="caption">{{ n }}</figcaption>
          </figure>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
