import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTab, FdTabs } from '../../src/public-api';
import { choice, text } from '../controls';

const meta: Meta = {
  title: 'Navigation/Tabs',
  decorators: [moduleMetadata({ imports: [FdTabs, FdTab] })],
  parameters: { layout: 'padded' },
  args: { label: 'Kyoto notebook', activation: 'auto' },
  argTypes: {
    label: { ...text, description: 'Accessible name of the tab list' },
    activation: {
      ...choice(['auto', 'manual']),
      description: '`manual`: arrow keys move focus, Enter or Space selects',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <fd-tabs style="width: 560px" [label]="label" [activation]="activation">
        <fd-tab id="steps" label="Stops" [count]="12">Twelve stops, from Fushimi Inari to the Silver Pavilion.</fd-tab>
        <fd-tab id="photos" label="Photos" [count]="48">48 photos, sorted by day.</fd-tab>
        <fd-tab id="map" label="Map" disabled>The map of the stops.</fd-tab>
        <fd-tab id="notes" label="Notes">Your private notes.</fd-tab>
      </fd-tabs>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ManualActivation: Story = { args: { activation: 'manual' } };
