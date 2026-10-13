import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon, FdIconButton, FdLink, FdSpinner } from '../src/public-api';
import { ICON_NAMES, bool, choice, text } from './controls';

const meta: Meta = {
  title: 'Actions',
  decorators: [moduleMetadata({ imports: [FdButton, FdIconButton, FdLink, FdSpinner, FdIcon] })],
};
export default meta;
type Story = StoryObj;

export const Boutons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
        <button fdButton variant="primary"><svg fdIcon="plus"></svg>Créer un carnet</button>
        <button fdButton>Voir le détail</button>
        <button fdButton variant="ghost">Annuler</button>
        <button fdButton variant="danger"><svg fdIcon="trash"></svg>Supprimer le carnet</button>
        <button fdButton variant="primary" disabled>Enregistrer</button>
      </div>`,
  }),
};

export const Tailles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
        <button fdButton size="sm">Petit</button>
        <button fdButton>Enregistrer</button>
        <button fdButton size="lg" variant="primary">Commencer le voyage</button>
      </div>`,
  }),
};

export const Chargement: Story = {
  render: () => ({
    template: `<button fdButton variant="primary" loading>Enregistrement…</button>`,
  }),
};

export const BoutonsIcone: Story = {
  name: 'Boutons-icônes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center">
        <button fdIconButton label="Modifier"><svg fdIcon="edit"></svg></button>
        <button fdIconButton label="Partager"><svg fdIcon="share"></svg></button>
        <button fdIconButton label="Ajouter aux favoris" [pressed]="true"><svg fdIcon="heart"></svg></button>
        <button fdIconButton label="Plus d'options"><svg fdIcon="more"></svg></button>
        <button fdIconButton variant="outlined" label="Rechercher"><svg fdIcon="search"></svg></button>
        <button fdIconButton size="sm" label="Fermer"><svg fdIcon="close"></svg></button>
      </div>`,
  }),
};

export const Liens: Story = {
  render: () => ({
    template: `
      <p style="max-width: 460px; margin: 0">
        Ton carnet est publié. Tu peux <a fdLink href="#">voir le carnet de Kyoto</a> ou
        <a fdLink href="#">inviter des amis</a> à le commenter.
        <a fdLink quiet href="#">Mentions légales</a>
      </p>`,
  }),
};

export const Spinners: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <fd-spinner></fd-spinner>
        <fd-spinner size="md"></fd-spinner>
        <fd-spinner size="lg"></fd-spinner>
      </div>`,
  }),
};

// Terrain de jeu : le panneau « Controls » pilote ces stories.
const playground = { tags: ['playground'] };

export const Bouton: Story = {
  ...playground,
  name: 'Bouton (contrôles)',
  args: {
    label: 'Créer un carnet',
    variant: 'primary',
    size: 'md',
    loading: false,
    block: false,
    disabled: false,
    icon: true,
  },
  argTypes: {
    label: text,
    variant: choice(['primary', 'secondary', 'ghost', 'danger']),
    size: choice(['sm', 'md', 'lg']),
    loading: bool,
    block: bool,
    disabled: bool,
    icon: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <button fdButton [variant]="variant" [size]="size" [loading]="loading" [block]="block" [disabled]="disabled">
        @if (icon) { <svg fdIcon="plus"></svg> }
        {{ label }}
      </button>`,
  }),
};

export const BoutonIconeControles: Story = {
  ...playground,
  name: 'Bouton-icône (contrôles)',
  args: { label: 'Modifier', icon: 'edit', variant: 'ghost', size: 'md', pressed: undefined },
  argTypes: {
    label: text,
    icon: choice(ICON_NAMES),
    variant: choice(['ghost', 'outlined']),
    size: choice(['sm', 'md']),
    pressed: bool,
  },
  render: (args) => ({
    props: args,
    template: `<button fdIconButton [label]="label" [variant]="variant" [size]="size" [pressed]="pressed"><svg [fdIcon]="icon"></svg></button>`,
  }),
};

export const LienControles: Story = {
  ...playground,
  name: 'Lien (contrôles)',
  args: { label: 'Voir le carnet de Kyoto', quiet: false },
  argTypes: { label: text, quiet: bool },
  render: (args) => ({
    props: args,
    template: `<a fdLink [quiet]="quiet" href="#">{{ label }}</a>`,
  }),
};

export const SpinnerControles: Story = {
  ...playground,
  name: 'Spinner (contrôles)',
  args: { size: 'md', color: 'sakura', label: 'Chargement…' },
  argTypes: { size: choice(['sm', 'md', 'lg']), color: choice(['sakura', 'current']), label: text },
  render: (args) => ({
    props: args,
    template: `<fd-spinner [size]="size" [color]="color" [label]="label"></fd-spinner>`,
  }),
};
