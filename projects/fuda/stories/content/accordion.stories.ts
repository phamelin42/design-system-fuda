import { signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAccordion, FdAccordionItem } from '../../src/public-api';
import { bool } from '../controls';

const meta: Meta = {
  title: 'Content/Accordion',
  decorators: [moduleMetadata({ imports: [FdAccordion, FdAccordionItem] })],
  parameters: { layout: 'padded' },
  args: { multiple: true },
  argTypes: { multiple: { ...bool, description: '`false`: opening an item closes the others' } },
  render: (args) => ({
    props: { ...args, expanded: signal<readonly string[]>(['who']) },
    template: `
      <fd-accordion style="width: 560px" [multiple]="multiple" [(expanded)]="expanded">
        <fd-accordion-item id="who" title="Who can see my notebook?">Only you by default. You then choose between your friends or anyone with the link.</fd-accordion-item>
        <fd-accordion-item id="offline" title="Can I write offline?">Yes. Your stops are kept on the device and sent when the network is back.</fd-accordion-item>
        <fd-accordion-item id="pdf" title="How do I export to PDF?">From the notebook menu, choose "Export". The PDF includes your photos and notes.</fd-accordion-item>
      </fd-accordion>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Multiple: Story = {};

export const Single: Story = { args: { multiple: false } };
