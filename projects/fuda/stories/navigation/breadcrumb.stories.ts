import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBreadcrumb } from '../../src/public-api';
import { json } from '../controls';

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  decorators: [moduleMetadata({ imports: [FdBreadcrumb] })],
  parameters: { layout: 'padded' },
  args: {
    items: [
      { label: 'Home', link: '#' },
      { label: 'Notebooks', link: '#' },
      { label: 'Japan 2027', link: '#' },
      { label: 'Kyoto in spring' },
    ],
  },
  argTypes: {
    items: { ...json, description: '`{ label, link? }[]`: the last item is the current page' },
  },
  render: (args) => ({ props: args, template: `<fd-breadcrumb [items]="items" />` }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Breadcrumb' };
