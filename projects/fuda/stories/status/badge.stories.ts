import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Status/Badge',
  decorators: [moduleMetadata({ imports: [FdBadge] })],
  parameters: { layout: 'padded' },
  args: { label: 'Badge' },
  argTypes: { label: text },
  render: (args) => ({
    props: { ...args, tones: ['neutral', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'enji'] },
    template: `
      <div style="display: grid; gap: 16px">
        @for (soft of [false, true]; track soft) {
          <div style="display: flex; flex-wrap: wrap; gap: 12px">
            @for (tone of tones; track tone) {
              <fd-badge [tone]="tone" [soft]="soft">{{ label }}</fd-badge>
            }
          </div>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
