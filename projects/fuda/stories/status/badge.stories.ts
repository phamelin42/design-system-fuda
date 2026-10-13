import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge } from '../../src/public-api';
import { bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Status/Badge',
  decorators: [moduleMetadata({ imports: [FdBadge] })],
  args: { label: 'New', tone: 'sakura', soft: false },
  argTypes: {
    label: text,
    tone: choice(['neutral', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'enji']),
    soft: { ...bool, description: 'Tinted `*-soft` background with colored text' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-badge [tone]="tone" [soft]="soft">{{ label }}</fd-badge>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Sakura: Story = {};

export const Neutral: Story = { args: { label: 'Draft', tone: 'neutral' } };

export const Info: Story = { args: { label: 'Shared', tone: 'asagi' } };

export const Success: Story = { args: { label: 'Published', tone: 'tokiwa' } };

export const Category: Story = { args: { label: 'Kyoto', tone: 'fuji' } };

export const Warning: Story = { args: { label: 'Beginner', tone: 'yamabuki' } };

export const Danger: Story = { args: { label: 'Failed', tone: 'enji' } };

export const Soft: Story = { args: { soft: true } };
