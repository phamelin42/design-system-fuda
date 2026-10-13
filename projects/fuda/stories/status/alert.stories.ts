import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAlert } from '../../src/public-api';
import { all, bool, pick, text } from '../controls';

const TONES = ['info', 'success', 'warning', 'danger'] as const;

const meta: Meta = {
  title: 'Status/Alert',
  decorators: [moduleMetadata({ imports: [FdAlert] })],
  parameters: { layout: 'padded' },
  args: {
    tone: 'all',
    title: 'Sync paused',
    text: 'Your changes will be sent as soon as the network is back.',
    dismissible: false,
    announce: false,
  },
  argTypes: {
    tone: all(TONES),
    title: { ...text, description: 'What is happening, in a few words' },
    text: { ...text, description: 'Projected content, not an input' },
    dismissible: { ...bool, description: 'Shows a close button and emits `dismissed`' },
    announce: {
      ...bool,
      description: 'For an alert that appears after an action: `role="alert"` (danger) or `status`',
    },
  },
  render: (args) => ({
    props: { ...args, tones: pick(args['tone'], TONES) },
    template: `
      <div style="display: grid; gap: 12px; width: 560px">
        @for (t of tones; track t) {
          <fd-alert [tone]="t" [title]="title" [dismissible]="dismissible" [announce]="announce">{{ text }}</fd-alert>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
