import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdRadioGroup } from '../../src/public-api';
import { bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Radio group',
  decorators: [moduleMetadata({ imports: [FdRadioGroup] })],
  parameters: { layout: 'padded' },
  args: {
    legend: 'Who can see this notebook?',
    orientation: 'vertical',
    value: 'me',
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
    orientation: {
      ...choice(['vertical', 'horizontal']),
      description: 'Horizontal only for two or three short options',
    },
    value: choice(['me', 'friends', 'link']),
    disabled: bool,
    options: { control: 'object', description: '`{ value, label, hint?, disabled? }[]`' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-radio-group [legend]="legend" [orientation]="orientation" [options]="options" [value]="value" [disabled]="disabled" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: {
    legend: 'Season',
    orientation: 'horizontal',
    value: 'autumn',
    options: [
      { value: 'spring', label: 'Spring' },
      { value: 'summer', label: 'Summer' },
      { value: 'autumn', label: 'Autumn' },
    ],
  },
};

export const Disabled: Story = { args: { disabled: true } };
