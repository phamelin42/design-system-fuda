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
        <a fdCard href="#" sky="shu" emblem="sakura">
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
          <fd-badge slot="badge" tone="shu">En cours</fd-badge>
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
