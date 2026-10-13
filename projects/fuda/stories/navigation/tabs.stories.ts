import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTab, FdTabs } from '../../src/public-api';
import { all, choice, json, pick, text } from '../controls';

const ACTIVATIONS = ['auto', 'manual'] as const;

const meta: Meta = {
  title: 'Navigation/Tabs',
  decorators: [moduleMetadata({ imports: [FdTabs, FdTab] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Kyoto notebook',
    selected: '',
    activation: 'all',
    tabs: [
      {
        id: 'steps',
        label: 'Stops',
        count: 12,
        disabled: false,
        content: 'Twelve stops, from Fushimi Inari to the Silver Pavilion.',
      },
      {
        id: 'photos',
        label: 'Photos',
        count: 48,
        disabled: false,
        content: '48 photos, sorted by day.',
      },
      { id: 'map', label: 'Map', disabled: true, content: 'The map of the stops.' },
      { id: 'notes', label: 'Notes', disabled: false, content: 'Your private notes.' },
    ],
  },
  argTypes: {
    label: { ...text, description: 'Accessible name of the tab list' },
    selected: {
      ...choice(['', 'steps', 'photos', 'map', 'notes']),
      description: 'Active tab id (`model`); empty means the first enabled one',
    },
    activation: {
      ...all(ACTIVATIONS),
      description: '`manual`: arrow keys move focus, Enter or Space selects',
    },
    tabs: {
      ...json,
      description: 'The `fd-tab` children: `{ id, label, count?, disabled?, content }[]`',
    },
  },
  render: (args) => ({
    props: { ...args, activations: pick(args['activation'], ACTIVATIONS) },
    template: `
      <div style="display: grid; gap: 32px; width: 560px">
        @for (a of activations; track a) {
          <fd-tabs [label]="label + ' (' + a + ' activation)'" [selected]="selected || undefined" [activation]="a">
            @for (tab of tabs; track tab.id) {
              <fd-tab [id]="tab.id" [label]="tab.label" [count]="tab.count" [disabled]="tab.disabled">{{ tab.content }}</fd-tab>
            }
          </fd-tabs>
        }
      </div>`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Tabs' };
