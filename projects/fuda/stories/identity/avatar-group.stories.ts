import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAvatarGroup } from '../../src/public-api';
import { count } from '../controls';

const NAMES = ['Phil', 'Mariko', 'Leo', 'Yuki', 'Aya', 'Ren', 'Sora'];

const meta: Meta = {
  title: 'Identity/Avatar group',
  decorators: [moduleMetadata({ imports: [FdAvatarGroup] })],
  args: { max: 4 },
  argTypes: { max: { ...count(1, 8), description: 'Avatars shown before the "+n" badge' } },
  render: (args) => ({
    props: { ...args, names: NAMES, fewNames: NAMES.slice(0, 3) },
    template: `
      <div style="display: grid; gap: 24px">
        <fd-avatar-group [names]="names" [max]="max" />
        <fd-avatar-group [names]="fewNames" [max]="max" />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
