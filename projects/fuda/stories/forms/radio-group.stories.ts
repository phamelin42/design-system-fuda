import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdRadioGroup } from '../../src/public-api';
import { bool, choice, json, text } from '../controls';

const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
];

// The first group takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Forms/Radio group',
  decorators: [moduleMetadata({ imports: [FdRadioGroup] })],
  parameters: { layout: 'padded' },
  args: {
    legend: 'Who can see this notebook?',
    value: 'me',
    orientation: 'vertical',
    disabled: false,
    options: [
      { value: 'me', label: 'Only me' },
      { value: 'friends', label: 'My friends', hint: 'The people you invited.' },
      { value: 'link', label: 'Anyone with the link' },
      { value: 'gallery', label: 'Public in the gallery (soon)', disabled: true },
    ],
  },
  argTypes: {
    legend: { ...text, description: 'The question the group asks' },
    value: { ...text, description: 'Chosen option (`model`, two-way bindable)' },
    orientation: {
      ...choice(['vertical', 'horizontal']),
      description: 'Horizontal only for two or three short options',
    },
    disabled: bool,
    options: { ...json, description: '`{ value, label, hint?, disabled? }[]`' },
  },
  render: (args) => ({
    props: { ...args, seasons: SEASONS },
    template: `
      <div style="display: grid; gap: 32px">
        <fd-radio-group [legend]="legend" [value]="value" [orientation]="orientation" [disabled]="disabled" [options]="options" />
        <fd-radio-group legend="Season (horizontal)" orientation="horizontal" [options]="seasons" value="autumn" />
        <fd-radio-group legend="Season (disabled)" [options]="seasons" value="spring" disabled />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
