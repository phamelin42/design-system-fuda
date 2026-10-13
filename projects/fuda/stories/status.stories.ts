import { Component, inject, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import {
  FdAlert,
  FdBadge,
  FdButton,
  FdChip,
  FdLink,
  FdProgress,
  FdToastService,
} from '../src/public-api';

@Component({
  selector: 'fd-demo-toasts',
  imports: [FdButton],
  template: `
    <div style="display: grid; gap: 12px; justify-items: start">
      <button fdButton variant="primary" (click)="success()">Créer un carnet</button>
      <button fdButton (click)="undo()">Supprimer une photo</button>
      <button fdButton (click)="failure()">Importer un fichier</button>
    </div>
  `,
})
class DemoToasts {
  private readonly toast = inject(FdToastService);
  success() {
    this.toast.show({
      tone: 'success',
      title: 'Carnet créé',
      text: '« Kyoto au printemps » est prêt.',
    });
  }
  undo() {
    this.toast.show({
      tone: 'info',
      title: 'Photo supprimée',
      text: 'Temple Kiyomizu-dera, 3 avril.',
      action: {
        label: 'Annuler',
        run: () => this.toast.show({ tone: 'success', title: 'Photo rétablie' }),
      },
    });
  }
  failure() {
    this.toast.show({
      tone: 'danger',
      title: 'Échec de l’import',
      text: 'Le fichier dépasse 20 Mo.',
    });
  }
}

const meta: Meta = {
  title: 'Statut',
  decorators: [
    moduleMetadata({ imports: [FdBadge, FdChip, FdAlert, FdProgress, FdLink, DemoToasts] }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Badges: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px">
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-badge tone="shu">Nouveau</fd-badge>
          <fd-badge tone="asagi">Partagé</fd-badge>
          <fd-badge tone="tokiwa">Publié</fd-badge>
          <fd-badge tone="fuji">Kyoto</fd-badge>
          <fd-badge tone="yamabuki">Débutant</fd-badge>
          <fd-badge tone="enji">Échec</fd-badge>
          <fd-badge>Brouillon</fd-badge>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-badge tone="shu" soft>Nouveau</fd-badge>
          <fd-badge tone="asagi" soft>Partagé</fd-badge>
          <fd-badge tone="tokiwa" soft>Publié</fd-badge>
          <fd-badge tone="fuji" soft>Kyoto</fd-badge>
          <fd-badge tone="yamabuki" soft>Débutant</fd-badge>
          <fd-badge tone="enji" soft>Échec</fd-badge>
        </div>
      </div>`,
  }),
};

export const Chips: Story = {
  render: () => ({
    props: {
      tags: signal(['Laine mérinos', 'Crochet 4 mm', 'Point mousse']),
      temples: signal(true),
      gardens: signal(false),
      food: signal(true),
    },
    template: `
      <div style="display: grid; gap: 16px">
        <div role="group" aria-label="Filtrer les étapes" style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-chip label="Temples" [(selected)]="temples" />
          <fd-chip label="Jardins" [(selected)]="gardens" />
          <fd-chip label="Cuisine" [(selected)]="food" />
        </div>
        <div role="group" aria-label="Fournitures" style="display: flex; flex-wrap: wrap; gap: 12px">
          @for (tag of tags(); track tag) {
            <fd-chip [label]="tag" removable (removed)="tags.set(tags().filter((t) => t !== tag))" />
          }
        </div>
      </div>`,
  }),
};

export const Alertes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 12px; max-width: 620px">
        <fd-alert tone="info" title="Synchronisation en pause" dismissible>Tes modifications seront envoyées dès que le réseau revient.</fd-alert>
        <fd-alert tone="success" title="Carnet publié">Tes amis peuvent maintenant le consulter et le commenter.</fd-alert>
        <fd-alert tone="warning" title="Stockage presque plein">
          Il reste 120 Mo. Supprime des photos ou passe en qualité réduite.
          <div class="fd-alert__actions"><a fdLink href="#">Gérer le stockage</a></div>
        </fd-alert>
        <fd-alert tone="danger" title="Échec de l’import">Le fichier dépasse 20 Mo. Choisis un fichier plus léger ou compresse-le.</fd-alert>
      </div>`,
  }),
};

export const Progression: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 24px; width: 520px">
        <fd-progress label="Import des photos" [value]="64" valueText="16 sur 25" />
        <fd-progress label="Préparation de l’export PDF" />
        <fd-progress label="Pelotes utilisées" tone="tokiwa" [value]="60" valueText="3 sur 5" />
      </div>`,
  }),
};

export const Toasts: Story = {
  render: () => ({ template: `<fd-demo-toasts />` }),
};
