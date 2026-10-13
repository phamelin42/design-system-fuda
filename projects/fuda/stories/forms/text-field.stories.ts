import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdTextField } from '../../src/public-api';
import { choice, count, text } from '../controls';

const meta: Meta = {
  title: 'Forms/Text field',
  decorators: [moduleMetadata({ imports: [FdTextField] })],
  parameters: { layout: 'padded' },
  args: {
    label: 'Notebook name',
    hint: 'Visible to the people you share the notebook with.',
    type: 'text',
    maxLength: 280,
  },
  argTypes: {
    label: { ...text, description: 'Always visible, never replaced by the placeholder' },
    hint: text,
    type: choice(['text', 'email', 'search', 'tel', 'url', 'password']),
    maxLength: { ...count(0, 500), description: 'Counter of the multiline field' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 24px; width: 340px">
        <fd-text-field [label]="label" [hint]="hint" [type]="type" />
        <fd-text-field label="Home city" optional placeholder="For example Lyon" />
        <fd-text-field label="Short name" error="The name must be at least 3 characters long." />
        <fd-text-field label="Search a stop" icon="search" placeholder="Temple, garden, district…" />
        <fd-text-field label="Notes" hint="Only for you." multiline [maxLength]="maxLength || undefined" />
        <fd-text-field label="Code" disabled />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
