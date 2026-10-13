import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdIcon, FdIconButton, FdLink, FdSpinner } from '../src/public-api';

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
