import { signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import {
  FdAccordion,
  FdAccordionItem,
  FdBadge,
  FdBreadcrumb,
  FdButton,
  FdCard,
  FdDivider,
  FdEmptyState,
  FdIcon,
  FdTab,
  FdTabs,
} from '../src/public-api';
import { EMBLEMS, bool, choice, text } from './controls';

const meta: Meta = {
  title: 'Navigation et contenu',
  decorators: [
    moduleMetadata({
      imports: [
        FdTabs,
        FdTab,
        FdBreadcrumb,
        FdCard,
        FdBadge,
        FdButton,
        FdDivider,
        FdAccordion,
        FdAccordionItem,
        FdEmptyState,
        FdIcon,
      ],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Onglets: Story = {
  render: () => ({
    props: { selected: signal<string | undefined>(undefined) },
    template: `
      <fd-tabs label="Carnet de Kyoto" [(selected)]="selected" style="max-width: 600px">
        <fd-tab id="steps" label="Étapes" [count]="12">Douze étapes, du Fushimi Inari au pavillon d’Argent.</fd-tab>
        <fd-tab id="photos" label="Photos" [count]="48">48 photos, triées par jour.</fd-tab>
        <fd-tab id="map" label="Carte">La carte des étapes avec le trajet entre chacune.</fd-tab>
        <fd-tab id="notes" label="Notes">Tes notes privées.</fd-tab>
      </fd-tabs>`,
  }),
};

export const FilAriane: Story = {
  name: 'Fil d’Ariane',
  render: () => ({
    props: {
      items: [
        { label: 'Accueil', link: '#' },
        { label: 'Carnets', link: '#' },
        { label: 'Japon 2027', link: '#' },
        { label: 'Kyoto au printemps' },
      ],
    },
    template: `<fd-breadcrumb [items]="items" />`,
  }),
};

export const Cartes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; width: 860px">
        <a fdCard href="#" sky="sakura" emblem="sakura">
          <fd-badge slot="badge" tone="tokiwa">Publié</fd-badge>
          <span slot="title">Kyoto au printemps</span>
          <span slot="meta">12 étapes, avril 2027</span>
        </a>
        <a fdCard href="#" sky="fuji" emblem="momiji">
          <fd-badge slot="badge" tone="yamabuki">Débutant</fd-badge>
          <span slot="title">Châle feuille d’érable</span>
          <span slot="meta">Crochet 4 mm, 5 pelotes</span>
        </a>
        <article fdCard sky="yamabuki" emblem="koi">
          <fd-badge slot="badge" tone="sakura">En cours</fd-badge>
          <span slot="title">Partie du vendredi</span>
          <span slot="meta">4 joueurs, manche 3 sur 5</span>
          Lettre tirée : K. Il reste 40 secondes.
          <div slot="actions">
            <button fdButton size="sm" variant="primary">Rejoindre</button>
            <button fdButton size="sm" variant="ghost">Inviter</button>
          </div>
        </article>
        <article fdCard>
          <span slot="title">Carte sans ciel</span>
          <span slot="meta">Pour les listes denses</span>
          Le liseré seul suffit à poser l’objet sur la page.
        </article>
      </div>`,
  }),
};

export const Separateurs: Story = {
  name: 'Séparateurs',
  render: () => ({
    template: `
      <div style="display: grid; gap: 8px; width: 520px">
        <p style="margin: 0">Jour 1 : arrivée à Kyoto, balade le long du canal de Shirakawa.</p>
        <fd-divider />
        <p style="margin: 0">Jour 2 : Fushimi Inari à l’aube, puis le marché de Nishiki.</p>
        <fd-divider kasumi />
        <p style="margin: 0">Deuxième semaine : Nara et Osaka.</p>
      </div>`,
  }),
};

export const Accordeon: Story = {
  name: 'Accordéon',
  render: () => ({
    props: { expanded: signal<readonly string[]>(['who']) },
    template: `
      <fd-accordion [(expanded)]="expanded" style="width: 600px">
        <fd-accordion-item id="who" title="Qui peut voir mon carnet ?">Toi seul par défaut. Tu choisis ensuite entre tes amis ou toute personne disposant du lien.</fd-accordion-item>
        <fd-accordion-item id="offline" title="Puis-je écrire hors ligne ?">Oui. Tes étapes sont gardées sur l’appareil et envoyées au retour du réseau.</fd-accordion-item>
        <fd-accordion-item id="pdf" title="Comment exporter en PDF ?">Depuis le menu du carnet, choisis « Exporter ». Le PDF reprend tes photos et tes notes.</fd-accordion-item>
      </fd-accordion>`,
  }),
};

export const EtatVide: Story = {
  name: 'État vide',
  render: () => ({
    template: `
      <fd-empty-state title="Aucun carnet pour l’instant" text="Crée ton premier carnet pour garder tes étapes, tes photos et tes notes au même endroit.">
        <button fdButton variant="primary"><svg fdIcon="plus"></svg>Créer un carnet</button>
      </fd-empty-state>`,
  }),
};

// Terrain de jeu : le panneau « Controls » pilote ces stories.
export const OngletsControles: Story = {
  tags: ['playground'],
  name: 'Onglets (contrôles)',
  args: { label: 'Carnet de Kyoto', activation: 'auto' },
  argTypes: { label: text, activation: choice(['auto', 'manual']) },
  render: (args) => ({
    props: args,
    template: `
      <fd-tabs style="width: 560px" [label]="label" [activation]="activation">
        <fd-tab id="steps" label="Étapes" [count]="12">Douze étapes, du Fushimi Inari au pavillon d’Argent.</fd-tab>
        <fd-tab id="photos" label="Photos" [count]="48">48 photos, triées par jour.</fd-tab>
        <fd-tab id="map" label="Carte" disabled>La carte des étapes.</fd-tab>
        <fd-tab id="notes" label="Notes">Tes notes privées.</fd-tab>
      </fd-tabs>`,
  }),
};

export const CarteControles: Story = {
  tags: ['playground'],
  name: 'Carte (contrôles)',
  args: {
    sky: 'sakura',
    emblem: 'sakura',
    title: 'Kyoto au printemps',
    meta: '12 étapes, avril 2027',
    body: '',
    badge: 'Publié',
    link: true,
  },
  argTypes: {
    sky: choice(['', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'kon']),
    emblem: choice(EMBLEMS),
    title: text,
    meta: text,
    body: text,
    badge: text,
    link: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 280px">
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
            <div slot="actions"><button fdButton size="sm" variant="primary">Rejoindre</button></div>
          </article>
        }
      </div>`,
  }),
};

export const SeparateurControles: Story = {
  tags: ['playground'],
  name: 'Séparateur (contrôles)',
  args: { kasumi: false },
  argTypes: { kasumi: bool },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px">
        <p style="margin: 0">Jour 1 : arrivée à Kyoto.</p>
        <fd-divider [kasumi]="kasumi" />
        <p style="margin: 0">Jour 2 : Fushimi Inari à l’aube.</p>
      </div>`,
  }),
};

export const AccordeonControles: Story = {
  tags: ['playground'],
  name: 'Accordéon (contrôles)',
  args: { multiple: true },
  argTypes: { multiple: bool },
  render: (args) => ({
    props: args,
    template: `
      <fd-accordion style="width: 520px" [multiple]="multiple">
        <fd-accordion-item id="who" title="Qui peut voir mon carnet ?">Toi seul par défaut.</fd-accordion-item>
        <fd-accordion-item id="offline" title="Puis-je écrire hors ligne ?">Oui, tes étapes sont envoyées au retour du réseau.</fd-accordion-item>
        <fd-accordion-item id="pdf" title="Comment exporter en PDF ?">Depuis le menu du carnet, choisis « Exporter ».</fd-accordion-item>
      </fd-accordion>`,
  }),
};

export const EtatVideControles: Story = {
  tags: ['playground'],
  name: 'État vide (contrôles)',
  args: {
    emblem: 'tsubame',
    title: 'Aucun carnet pour l’instant',
    text: 'Crée ton premier carnet pour garder tes étapes au même endroit.',
  },
  argTypes: { emblem: choice(EMBLEMS), title: text, text },
  render: (args) => ({
    props: args,
    template: `
      <fd-empty-state [emblem]="emblem" [title]="title" [text]="text">
        <button fdButton variant="primary"><svg fdIcon="plus"></svg>Créer un carnet</button>
      </fd-empty-state>`,
  }),
};
