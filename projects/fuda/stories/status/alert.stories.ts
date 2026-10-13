import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAlert } from '../../src/public-api';
import { bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Status/Alert',
  decorators: [moduleMetadata({ imports: [FdAlert] })],
  parameters: { layout: 'padded' },
  args: {
    tone: 'info',
    title: 'Sync paused',
    text: 'Your changes will be sent as soon as the network is back.',
    dismissible: false,
    announce: false,
  },
  argTypes: {
    tone: choice(['info', 'success', 'warning', 'danger']),
    title: { ...text, description: 'What is happening, in a few words' },
    text,
    dismissible: bool,
    announce: {
      ...bool,
      description: 'For an alert that appears after an action: `role="alert"` (danger) or `status`',
    },
  },
  render: (args) => ({
    props: args,
    template: `<fd-alert style="width: 560px" [tone]="tone" [title]="title" [dismissible]="dismissible" [announce]="announce">{{ text }}</fd-alert>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Info: Story = {};

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Notebook published',
    text: 'Your friends can now read and comment on it.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Storage almost full',
    text: '120 MB left. Delete photos or switch to reduced quality.',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'Import failed',
    text: 'The file is larger than 20 MB. Pick a smaller file or compress it.',
    announce: true,
  },
};

export const Dismissible: Story = { args: { dismissible: true } };
