import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAccordion, FdAccordionItem } from '../../src/public-api';
import { both, json, states } from '../controls';

const meta: Meta = {
  title: 'Content/Accordion',
  decorators: [moduleMetadata({ imports: [FdAccordion, FdAccordionItem] })],
  parameters: { layout: 'padded' },
  args: {
    multiple: 'both',
    expanded: ['who'],
    items: [
      {
        id: 'who',
        title: 'Who can see my notebook?',
        content:
          'Only you by default. You then choose between your friends or anyone with the link.',
      },
      {
        id: 'offline',
        title: 'Can I write offline?',
        content: 'Yes. Your stops are kept on the device and sent when the network is back.',
      },
      {
        id: 'pdf',
        title: 'How do I export to PDF?',
        content: 'From the notebook menu, choose "Export". The PDF includes your photos and notes.',
      },
    ],
  },
  argTypes: {
    multiple: { ...both, description: '`off`: opening an item closes the others' },
    expanded: { ...json, description: 'Ids of the open items (`model`)' },
    items: { ...json, description: 'The `fd-accordion-item` children: `{ id, title, content }[]`' },
  },
  render: (args) => ({
    props: {
      ...args,
      // Ids carry the mode so that the two accordions never share a DOM id.
      accordions: states(args['multiple']).map((multiple) => ({
        multiple,
        suffix: multiple ? '' : ' (single)',
        expanded: (args['expanded'] as string[]).map((id) => `${id}-${multiple}`),
      })),
    },
    template: `
      <div style="display: grid; gap: 32px; width: 560px">
        @for (a of accordions; track a.multiple) {
          <fd-accordion [multiple]="a.multiple" [expanded]="a.expanded">
            @for (item of items; track item.id) {
              <fd-accordion-item [id]="item.id + '-' + a.multiple" [title]="item.title + a.suffix">{{ item.content }}</fd-accordion-item>
            }
          </fd-accordion>
        }
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
