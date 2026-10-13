import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdEmptyState, FdIcon } from '../../src/public-api';
import { EMBLEMS, bool, choice, text } from '../controls';

// The first empty state takes every input from the Controls panel; the second is a fixed reference.
const meta: Meta = {
  title: 'Content/Empty state',
  decorators: [moduleMetadata({ imports: [FdEmptyState, FdButton, FdIcon] })],
  args: {
    emblem: 'tsubame',
    title: 'No notebooks yet',
    text: 'Create your first notebook to keep your stops, photos and notes in one place.',
    action: true,
  },
  argTypes: {
    emblem: choice(EMBLEMS),
    title: { ...text, description: 'What is missing, without blame' },
    text: { ...text, description: 'What the user gains by acting' },
    action: { ...bool, description: 'Projected action button (content, not an input)' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 420px); gap: 32px">
        <fd-empty-state [emblem]="emblem" [title]="title" [text]="text || undefined">
          @if (action) { <button fdButton variant="primary"><svg fdIcon="plus"></svg>Create a notebook</button> }
        </fd-empty-state>
        <fd-empty-state emblem="usagi" title="No stop for &quot;onsen&quot;" text="Remove a filter to see more stops." />
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
