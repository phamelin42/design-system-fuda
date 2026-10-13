import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAvatar } from '../../src/public-api';
import { EMBLEMS, choice, text } from '../controls';

const meta: Meta = {
  title: 'Identity/Avatar',
  decorators: [moduleMetadata({ imports: [FdAvatar] })],
  args: { name: 'Phil Hamelin', emblem: 'auto', size: 'lg', src: '' },
  argTypes: {
    name: {
      ...text,
      description: 'Full name: accessible name, and source of the automatic emblem',
    },
    emblem: {
      ...choice(['auto', 'initials', ...EMBLEMS]),
      description: '`auto` picks an emblem from the name',
    },
    size: choice(['xs', 'sm', 'md', 'lg', 'xl']),
    src: { ...text, description: 'Photo URL; the emblem is the fallback if it fails to load' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-avatar [name]="name" [emblem]="emblem" [size]="size" [src]="src || undefined" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Initials: Story = { args: { emblem: 'initials' } };

export const ExtraSmall: Story = { args: { name: 'Mariko', size: 'xs' } };

export const ExtraLarge: Story = { args: { name: 'Leo', size: 'xl' } };
