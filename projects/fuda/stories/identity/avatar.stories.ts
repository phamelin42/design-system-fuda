import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAvatar } from '../../src/public-api';
import { EMBLEMS, choice, text } from '../controls';

const meta: Meta = {
  title: 'Identity/Avatar',
  decorators: [moduleMetadata({ imports: [FdAvatar] })],
  args: { name: 'Phil Hamelin', emblem: 'auto', src: '' },
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
  },
  render: (args) => ({
    props: { ...args, sizes: ['xs', 'sm', 'md', 'lg', 'xl'] },
    template: `
      <div style="display: flex; gap: 20px; align-items: center">
        @for (size of sizes; track size) {
          <fd-avatar [name]="name" [emblem]="emblem" [size]="size" [src]="src || undefined" />
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
