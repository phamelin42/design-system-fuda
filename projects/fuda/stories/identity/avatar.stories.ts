import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAvatar } from '../../src/public-api';
import { EMBLEMS, all, choice, pick, text } from '../controls';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const meta: Meta = {
  title: 'Identity/Avatar',
  decorators: [moduleMetadata({ imports: [FdAvatar] })],
  args: { name: 'Phil Hamelin', emblem: 'auto', src: '', size: 'all' },
  argTypes: {
    name: {
      ...text,
      description: 'Full name: accessible name, and source of the automatic emblem',
    },
    emblem: {
      ...choice(['auto', 'initials', ...EMBLEMS]),
      description: '`auto` picks an emblem from the name',
    },
    src: { ...text, description: 'Photo URL; the emblem is the fallback if it fails to load' },
    size: { ...all(SIZES), description: '24 / 32 / 40 / 56 / 80 px; `all` shows the five sizes' },
  },
  render: (args) => ({
    props: { ...args, sizes: pick(args['size'], SIZES) },
    template: `
      <div style="display: flex; gap: 20px; align-items: center">
        @for (s of sizes; track s) {
          <fd-avatar [name]="name" [emblem]="emblem" [size]="s" [src]="src || undefined" />
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
