import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { EMBLEM_NAMES, FdAvatar, FdAvatarGroup, FdEmblem } from '../src/public-api';

const KANJI: Record<string, string> = {
  ume: '梅 Prunier en fleur',
  sakura: '桜 Cerisier de nuit',
  fuji: '藤 Glycine',
  kiku: '菊 Chrysanthème',
  momiji: '紅葉 Feuille d’érable',
  cho: '蝶 Papillon',
  usagi: '兎 Lièvre sous la lune',
  tsubame: '燕 Hirondelle',
  koi: '鯉 Carpe koï',
  inu: '犬 Chien',
};

const meta: Meta = {
  title: 'Identité',
  decorators: [moduleMetadata({ imports: [FdEmblem, FdAvatar, FdAvatarGroup] })],
};
export default meta;
type Story = StoryObj;

export const Emblemes: Story = {
  name: 'Emblèmes',
  render: () => ({
    props: { names: EMBLEM_NAMES, kanji: KANJI },
    template: `
      <div style="display: grid; grid-template-columns: repeat(5, 120px); gap: 24px 12px">
        @for (name of names; track name) {
          <figure style="margin: 0; display: grid; justify-items: center; gap: 6px; text-align: center">
            <fd-emblem [name]="name" [size]="72" [label]="kanji[name]" />
            <figcaption class="caption"><strong>{{ name }}</strong><br />{{ kanji[name] }}</figcaption>
          </figure>
        }
      </div>`,
  }),
};

export const Avatars: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px">
        <div style="display: flex; gap: 20px; align-items: center">
          <fd-avatar name="Phil" size="xs" />
          <fd-avatar name="Mariko" size="sm" />
          <fd-avatar name="Léo" />
          <fd-avatar name="Yuki" size="lg" />
          <fd-avatar name="Phil" size="xl" />
          <fd-avatar name="Phil Hamelin" size="lg" emblem="initials" />
        </div>
        <div style="display: flex; gap: 12px; align-items: center">
          <fd-avatar-group [names]="['Phil', 'Mariko', 'Léo', 'Yuki', 'Aya', 'Ren', 'Sora']" />
          <span class="caption">Joueurs de la partie</span>
        </div>
      </div>`,
  }),
};
