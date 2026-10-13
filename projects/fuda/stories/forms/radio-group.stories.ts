import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdRadioGroup } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Forms/Radio group',
  decorators: [moduleMetadata({ imports: [FdRadioGroup] })],
  parameters: { layout: 'padded' },
  args: { legend: 'Who can see this notebook?' },
  argTypes: { legend: { ...text, description: 'The question the group asks' } },
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: 'me', label: 'Only me' },
        { value: 'friends', label: 'My friends', hint: 'The people you invited.' },
        { value: 'link', label: 'Anyone with the link' },
        { value: 'gallery', label: 'Public in the gallery (soon)', disabled: true },
      ],
      seasons: [
        { value: 'spring', label: 'Spring' },
        { value: 'summer', label: 'Summer' },
        { value: 'autumn', label: 'Autumn' },
      ],
    },
    template: `
      <div style="display: grid; gap: 32px">
        <fd-radio-group [legend]="legend" [options]="options" value="me" />
        <fd-radio-group legend="Season (horizontal)" orientation="horizontal" [options]="seasons" value="autumn" />
        <fd-radio-group legend="Season (disabled)" [options]="seasons" value="spring" disabled />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
