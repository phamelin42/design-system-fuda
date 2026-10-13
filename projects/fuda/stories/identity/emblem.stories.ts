import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { EMBLEM_NAMES, FdEmblem } from '../../src/public-api';
import { EMBLEMS, bool, choice, count, text } from '../controls';

const meta: Meta = {
  title: 'Identity/Emblem',
  decorators: [moduleMetadata({ imports: [FdEmblem] })],
  args: { name: 'ume', size: 96, ring: true, label: 'Plum blossom' },
  argTypes: { name: choice(EMBLEMS), size: count(24, 160), ring: bool, label: text },
  render: (args) => ({
    props: args,
    template: `<fd-emblem [name]="name" [size]="size" [ring]="ring" [label]="label" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithoutRing: Story = { args: { name: 'koi', label: 'Koi carp', ring: false } };

/** All ten emblems of the set, each in its disc. */
export const AllEmblems: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { names: EMBLEM_NAMES },
    template: `
      <div style="display: grid; grid-template-columns: repeat(5, 96px); gap: 24px">
        @for (name of names; track name) {
          <figure style="margin: 0; display: grid; justify-items: center; gap: 6px; text-align: center">
            <fd-emblem [name]="name" [size]="72" [label]="name" />
            <figcaption class="caption">{{ name }}</figcaption>
          </figure>
        }
      </div>`,
  }),
};
