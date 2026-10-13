import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTab, FdTabs } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Navigation/Tabs',
  decorators: [moduleMetadata({ imports: [FdTabs, FdTab] })],
  parameters: { layout: 'padded' },
  args: { label: 'Kyoto notebook' },
  argTypes: { label: { ...text, description: 'Accessible name of the first tab list' } },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 32px; width: 560px">
        <fd-tabs [label]="label">
          <fd-tab id="steps" label="Stops" [count]="12">Twelve stops, from Fushimi Inari to the Silver Pavilion.</fd-tab>
          <fd-tab id="photos" label="Photos" [count]="48">48 photos, sorted by day.</fd-tab>
          <fd-tab id="map" label="Map" disabled>The map of the stops.</fd-tab>
          <fd-tab id="notes" label="Notes">Your private notes.</fd-tab>
        </fd-tabs>
        <fd-tabs label="Manual activation" activation="manual">
          <fd-tab id="a" label="Overview">Arrow keys move the focus, Enter or Space selects.</fd-tab>
          <fd-tab id="b" label="Details">Useful when a panel is costly to load.</fd-tab>
        </fd-tabs>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
