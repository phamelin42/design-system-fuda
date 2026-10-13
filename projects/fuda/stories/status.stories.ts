import { Component, inject, input, signal } from '@angular/core';
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
import { bool, choice, count, text } from './controls';

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

@Component({
  selector: 'fd-demo-toast',
  imports: [FdButton],
  template: `<button fdButton variant="primary" (click)="show()">Afficher le toast</button>`,
})
class DemoToast {
  readonly tone = input<'info' | 'success' | 'warning' | 'danger'>('success');
  readonly title = input('Carnet créé');
  readonly text = input('');
  readonly duration = input(5000);
  readonly withAction = input(false);

  private readonly toast = inject(FdToastService);

  show() {
    this.toast.show({
      tone: this.tone(),
      title: this.title(),
      text: this.text() || undefined,
      duration: this.duration(),
      action: this.withAction() ? { label: 'Annuler', run: () => undefined } : undefined,
    });
  }
}

const meta: Meta = {
  title: 'Statut',
  decorators: [
    moduleMetadata({
      imports: [FdBadge, FdChip, FdAlert, FdProgress, FdLink, DemoToasts, DemoToast],
    }),
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
          <fd-badge tone="sakura">Nouveau</fd-badge>
          <fd-badge tone="asagi">Partagé</fd-badge>
          <fd-badge tone="tokiwa">Publié</fd-badge>
          <fd-badge tone="fuji">Kyoto</fd-badge>
          <fd-badge tone="yamabuki">Débutant</fd-badge>
          <fd-badge tone="enji">Échec</fd-badge>
          <fd-badge>Brouillon</fd-badge>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <fd-badge tone="sakura" soft>Nouveau</fd-badge>
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

// Terrain de jeu : le panneau « Controls » pilote ces stories.
export const BadgeControles: Story = {
  tags: ['playground'],
  name: 'Badge (contrôles)',
  args: { label: 'Nouveau', tone: 'sakura', soft: false },
  argTypes: {
    label: text,
    tone: choice(['neutral', 'sakura', 'asagi', 'tokiwa', 'fuji', 'yamabuki', 'enji']),
    soft: bool,
  },
  render: (args) => ({
    props: args,
    template: `<fd-badge [tone]="tone" [soft]="soft">{{ label }}</fd-badge>`,
  }),
};

export const ChipControles: Story = {
  tags: ['playground'],
  name: 'Chip (contrôles)',
  args: { label: 'Temples', selected: true, removable: false },
  argTypes: { label: text, selected: bool, removable: bool },
  render: (args) => ({
    props: args,
    template: `<fd-chip [label]="label" [selected]="selected" [removable]="removable" />`,
  }),
};

export const AlerteControles: Story = {
  tags: ['playground'],
  name: 'Alerte (contrôles)',
  args: {
    tone: 'info',
    title: 'Synchronisation en pause',
    text: 'Tes modifications seront envoyées dès que le réseau revient.',
    dismissible: false,
    announce: false,
  },
  argTypes: {
    tone: choice(['info', 'success', 'warning', 'danger']),
    title: text,
    text,
    dismissible: bool,
    announce: bool,
  },
  render: (args) => ({
    props: args,
    template: `<fd-alert style="width: 560px" [tone]="tone" [title]="title" [dismissible]="dismissible" [announce]="announce">{{ text }}</fd-alert>`,
  }),
};

export const ProgressionControles: Story = {
  tags: ['playground'],
  name: 'Progression (contrôles)',
  args: {
    label: 'Import des photos',
    value: 64,
    indeterminate: false,
    valueText: '16 sur 25',
    tone: 'mizu',
  },
  argTypes: {
    label: text,
    value: count(0, 100),
    indeterminate: bool,
    valueText: text,
    tone: choice(['mizu', 'tokiwa']),
  },
  render: (args) => ({
    props: args,
    template: `<fd-progress style="width: 480px" [label]="label" [value]="indeterminate ? null : value" [valueText]="valueText || undefined" [tone]="tone" />`,
  }),
};

export const ToastControles: Story = {
  tags: ['playground'],
  name: 'Toast (contrôles)',
  args: {
    tone: 'success',
    title: 'Carnet créé',
    text: '« Kyoto au printemps » est prêt.',
    duration: 5000,
    withAction: false,
  },
  argTypes: {
    tone: choice(['info', 'success', 'warning', 'danger']),
    title: text,
    text,
    duration: count(1000, 10000),
    withAction: bool,
  },
  render: (args) => ({
    props: args,
    template: `<fd-demo-toast [tone]="tone" [title]="title" [text]="text" [duration]="duration" [withAction]="withAction" />`,
  }),
};
