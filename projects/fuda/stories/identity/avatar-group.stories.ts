import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAvatarGroup } from '../../src/public-api';
import { count, json } from '../controls';

const meta: Meta = {
  title: 'Identity/Avatar group',
  decorators: [moduleMetadata({ imports: [FdAvatarGroup] })],
  args: { names: ['Phil', 'Mariko', 'Leo', 'Yuki', 'Aya', 'Ren', 'Sora'], max: 4 },
  argTypes: {
    names: { ...json, description: 'People of the group' },
    max: { ...count(1, 8), description: 'Avatars shown before the "+n" badge' },
  },
  render: (args) => ({ props: args, template: `<fd-avatar-group [names]="names" [max]="max" />` }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Avatar group' };
