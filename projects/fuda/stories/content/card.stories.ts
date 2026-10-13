import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdBadge, FdButton, FdCard } from '../../src/public-api';
import { EMBLEMS, bool, choice, text } from '../controls';

const meta: Meta = {
  title: 'Content/Card',
  decorators: [moduleMetadata({ imports: [FdCard, FdBadge, FdButton] })],
  args: {
    sky: 'sakura',
    emblem: 'sakura',
    badge: 'Published',
    title: 'Kyoto in spring',
    meta: '12 stops, April 2027',
    body: '',
    link: true,
  },
  argTypes: {
    sky: {
      ...choice(['', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'kon']),
      description: 'Sky color; empty for a plain card',
    },
    emblem: { ...choice(EMBLEMS), description: 'Never the same disc color as the sky' },
    badge: text,
    title: text,
    meta: text,
    body: text,
    link: {
      ...bool,
      description:
        'Whole card is a link (`a[fdCard]`); otherwise an `article` that can hold actions',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 280px">
        @if (link) {
          <a fdCard href="#" [sky]="sky || undefined" [emblem]="emblem">
            @if (sky) { <fd-badge slot="badge" tone="tokiwa">{{ badge }}</fd-badge> }
            <span slot="title">{{ title }}</span>
            <span slot="meta">{{ meta }}</span>
            {{ body }}
          </a>
        } @else {
          <article fdCard [sky]="sky || undefined" [emblem]="emblem">
            @if (sky) { <fd-badge slot="badge" tone="sakura">{{ badge }}</fd-badge> }
            <span slot="title">{{ title }}</span>
            <span slot="meta">{{ meta }}</span>
            {{ body }}
            <div slot="actions">
              <button fdButton size="sm" variant="primary">Join</button>
              <button fdButton size="sm" variant="ghost">Invite</button>
            </div>
          </article>
        }
      </div>`,
  }),
};
export default meta;
type Story = StoryObj;

export const Link: Story = {};

export const Lavender: Story = {
  args: {
    sky: 'fuji',
    emblem: 'momiji',
    badge: 'Beginner',
    title: 'Maple leaf shawl',
    meta: '4 mm hook, 5 skeins',
  },
};

export const WithActions: Story = {
  args: {
    sky: 'yamabuki',
    emblem: 'koi',
    badge: 'Ongoing',
    title: 'Friday game',
    meta: '4 players, round 3 of 5',
    body: 'Letter drawn: K. 40 seconds left.',
    link: false,
  },
};

export const NoSky: Story = {
  args: {
    sky: '',
    title: 'Card without a sky',
    meta: 'For dense lists',
    body: 'The rim alone is enough to set the object on the page.',
    link: false,
  },
};
