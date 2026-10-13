import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge, FdButton, FdCard } from '../../src/public-api';
import { EMBLEMS, bool, choice, text } from '../controls';

// The first card takes every input from the Controls panel; the others are fixed reference states.
const meta: Meta = {
  title: 'Content/Card',
  decorators: [moduleMetadata({ imports: [FdCard, FdBadge, FdButton] })],
  parameters: { layout: 'padded' },
  args: {
    link: true,
    sky: 'sakura',
    emblem: 'sakura',
    badge: 'Published',
    title: 'Kyoto in spring',
    meta: '12 stops, April 2027',
    body: '',
  },
  argTypes: {
    link: {
      ...bool,
      description:
        'Whole card is a link (`a[fdCard]`); otherwise an `article` that can hold actions',
    },
    sky: {
      ...choice(['', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'kon']),
      description: 'Sky color; empty for a plain card',
    },
    emblem: { ...choice(EMBLEMS), description: 'Never the same disc color as the sky' },
    badge: { ...text, description: '`slot="badge"`, only shown in the sky' },
    title: { ...text, description: '`slot="title"`' },
    meta: { ...text, description: '`slot="meta"`' },
    body: { ...text, description: 'Default slot' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; width: 860px">
        @if (link) {
          <a fdCard href="#" [sky]="sky || undefined" [emblem]="emblem">
            <fd-badge slot="badge" tone="tokiwa">{{ badge }}</fd-badge>
            <span slot="title">{{ title }}</span>
            <span slot="meta">{{ meta }}</span>
            {{ body }}
          </a>
        } @else {
          <article fdCard [sky]="sky || undefined" [emblem]="emblem">
            <fd-badge slot="badge" tone="tokiwa">{{ badge }}</fd-badge>
            <span slot="title">{{ title }}</span>
            <span slot="meta">{{ meta }}</span>
            {{ body }}
            <div slot="actions">
              <button fdButton size="sm" variant="primary">Join</button>
              <button fdButton size="sm" variant="ghost">Invite</button>
            </div>
          </article>
        }
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

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Card' };
