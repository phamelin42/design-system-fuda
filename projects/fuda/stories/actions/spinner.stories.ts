import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdSpinner } from '../../src/public-api';
import { all, bool, choice, pick, text } from '../controls';

const SIZES = ['sm', 'md', 'lg'] as const;

const meta: Meta = {
  title: 'Actions/Spinner',
  decorators: [moduleMetadata({ imports: [FdSpinner] })],
  args: { size: 'all', color: 'sakura', label: 'Loading…', decorative: false },
  argTypes: {
    size: { ...all(SIZES), description: '20 / 28 / 44 px' },
    color: { ...choice(['sakura', 'current']), description: '`current` inherits the text color' },
    label: { ...text, description: 'Text for screen readers' },
    decorative: {
      ...bool,
      description: 'Hidden from screen readers, for a parent that is already `aria-busy`',
    },
  },
  render: (args) => ({
    props: { ...args, sizes: pick(args['size'], SIZES) },
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        @for (s of sizes; track s) {
          <fd-spinner [size]="s" [color]="color" [label]="label" [decorative]="decorative"></fd-spinner>
        }
      </div>`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Spinner' };
