import { signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdAccordion, FdAccordionItem } from '../../src/public-api';

const meta: Meta = {
  title: 'Content/Accordion',
  decorators: [moduleMetadata({ imports: [FdAccordion, FdAccordionItem] })],
  parameters: { layout: 'padded' },
  render: () => ({
    props: {
      multiple: signal<readonly string[]>(['who']),
      single: signal<readonly string[]>(['a']),
    },
    template: `
      <div style="display: grid; gap: 32px; width: 560px">
        <fd-accordion [(expanded)]="multiple">
          <fd-accordion-item id="who" title="Who can see my notebook?">Only you by default. You then choose between your friends or anyone with the link.</fd-accordion-item>
          <fd-accordion-item id="offline" title="Can I write offline?">Yes. Your stops are kept on the device and sent when the network is back.</fd-accordion-item>
          <fd-accordion-item id="pdf" title="How do I export to PDF?">From the notebook menu, choose "Export". The PDF includes your photos and notes.</fd-accordion-item>
        </fd-accordion>
        <fd-accordion [multiple]="false" [(expanded)]="single">
          <fd-accordion-item id="a" title="Single mode: opening an item closes the others">Only one item is open at a time.</fd-accordion-item>
          <fd-accordion-item id="b" title="Second item">Try opening this one.</fd-accordion-item>
        </fd-accordion>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
