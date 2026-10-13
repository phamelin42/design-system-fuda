import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { EMBLEM_NAMES, FdEmblem } from '../../src/public-api';
import { bool, count } from '../controls';

const meta: Meta = {
  title: 'Identity/Emblem',
  decorators: [moduleMetadata({ imports: [FdEmblem] })],
  args: { size: 72, ring: true },
  argTypes: { size: count(24, 160), ring: bool },
  render: (args) => ({
    props: { ...args, names: EMBLEM_NAMES },
    template: `
      <div style="display: grid; grid-template-columns: repeat(5, auto); gap: 24px 32px; justify-items: center">
        @for (name of names; track name) {
          <figure style="margin: 0; display: grid; justify-items: center; gap: 6px">
            <fd-emblem [name]="name" [size]="size" [ring]="ring" [label]="name" />
            <figcaption class="caption">{{ name }}</figcaption>
          </figure>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
