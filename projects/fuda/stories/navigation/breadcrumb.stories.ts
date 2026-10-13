import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBreadcrumb } from '../../src/public-api';

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
    items: {
      control: 'object',
      description: '`{ label, link? }[]`: the last item is the current page',
    },
  },
  render: (args) => ({ props: args, template: `<fd-breadcrumb [items]="items" />` }),
};
export default meta;

export const Default: StoryObj = {};
