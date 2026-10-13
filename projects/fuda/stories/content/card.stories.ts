import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge, FdButton, FdCard } from '../../src/public-api';
import { text } from '../controls';

const meta: Meta = {
  title: 'Content/Card',
  decorators: [moduleMetadata({ imports: [FdCard, FdBadge, FdButton] })],
  parameters: { layout: 'padded' },
  args: { title: 'Kyoto in spring', meta: '12 stops, April 2027' },
  argTypes: {
    title: { ...text, description: 'Title of the first card' },
    meta: { ...text, description: 'Meta line of the first card' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; width: 860px">
        <a fdCard href="#" sky="sakura" emblem="sakura">
          <fd-badge slot="badge" tone="tokiwa">Published</fd-badge>
          <span slot="title">{{ title }}</span>
          <span slot="meta">{{ meta }}</span>
        </a>
        <a fdCard href="#" sky="fuji" emblem="momiji">
          <fd-badge slot="badge" tone="yamabuki">Beginner</fd-badge>
          <span slot="title">Maple leaf shawl</span>
          <span slot="meta">4 mm hook, 5 skeins</span>
        </a>
        <article fdCard sky="yamabuki" emblem="koi">
          <fd-badge slot="badge" tone="sakura">Ongoing</fd-badge>
          <span slot="title">Friday game</span>
          <span slot="meta">4 players, round 3 of 5</span>
          Letter drawn: K. 40 seconds left.
          <div slot="actions">
            <button fdButton size="sm" variant="primary">Join</button>
            <button fdButton size="sm" variant="ghost">Invite</button>
          </div>
        </article>
        <article fdCard>
          <span slot="title">Card without a sky</span>
          <span slot="meta">For dense lists</span>
          The rim alone is enough to set the object on the page.
        </article>
      </div>`,
  }),
};
export default meta;

export const Default: StoryObj = {};
