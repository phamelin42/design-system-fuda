import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAlert } from '../../src/public-api';
import { bool } from '../controls';

const meta: Meta = {
  title: 'Status/Alert',
  decorators: [moduleMetadata({ imports: [FdAlert] })],
  parameters: { layout: 'padded' },
  args: { dismissible: false, announce: false },
  argTypes: {
    dismissible: bool,
    announce: {
      ...bool,
      description: 'For an alert that appears after an action: `role="alert"` (danger) or `status`',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 12px; width: 560px">
        <fd-alert tone="info" title="Sync paused" [dismissible]="dismissible" [announce]="announce">Your changes will be sent as soon as the network is back.</fd-alert>
        <fd-alert tone="success" title="Notebook published" [dismissible]="dismissible" [announce]="announce">Your friends can now read and comment on it.</fd-alert>
        <fd-alert tone="warning" title="Storage almost full" [dismissible]="dismissible" [announce]="announce">120 MB left. Delete photos or switch to reduced quality.</fd-alert>
        <fd-alert tone="danger" title="Import failed" [dismissible]="dismissible" [announce]="announce">The file is larger than 20 MB. Pick a smaller file or compress it.</fd-alert>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
