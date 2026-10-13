import { signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdCheckbox, FdRadioGroup, FdSelect, FdSwitch, FdTextField } from '../src/public-api';

const meta: Meta = {
  title: 'Formulaires',
  decorators: [
    moduleMetadata({ imports: [FdTextField, FdSelect, FdCheckbox, FdRadioGroup, FdSwitch] }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const ChampsDeSaisie: Story = {
  name: 'Champs de saisie',
  render: () => ({
    props: {
      name: signal('Kyoto au printemps'),
      short: signal('Ky'),
      notes: signal('Arrivée par le Shinkansen.'),
    },
    template: `
      <div style="display: grid; gap: 24px; max-width: 360px">
        <fd-text-field label="Nom du carnet" hint="Visible par les personnes avec qui tu partages le carnet." [(value)]="name" />
        <fd-text-field label="Ville de départ" optional placeholder="Par exemple Lyon" />
        <fd-text-field label="Nom court" [(value)]="short" error="Le nom doit faire au moins 3 caractères." />
        <fd-text-field label="Rechercher une étape" icon="search" placeholder="Temple, jardin, quartier…" />
        <fd-text-field label="Notes" multiline [maxLength]="280" hint="Seulement pour toi." [(value)]="notes" />
        <fd-text-field label="Code" disabled />
      </div>`,
  }),
};

export const Liste: Story = {
  name: 'Select',
  render: () => ({
    props: {
      seasons: ['Printemps', 'Été', 'Automne', 'Hiver'].map((s) => ({ value: s, label: s })),
      hooks: ['2,5 mm', '3 mm', '4 mm', '5 mm'].map((s) => ({ value: s, label: s })),
      season: signal('Automne'),
      hook: signal(''),
    },
    template: `
      <div style="display: grid; gap: 24px; max-width: 320px">
        <fd-select label="Saison" [options]="seasons" [(value)]="season" />
        <fd-select label="Crochet" placeholder="Choisir une taille" hint="Indiquée sur l’étiquette de la pelote." [options]="hooks" [(value)]="hook" />
      </div>`,
  }),
};

export const Selection: Story = {
  name: 'Cases, radios et interrupteurs',
  render: () => ({
    props: {
      all: signal(false),
      shown: signal(true),
      visibility: signal('me'),
      offline: signal(true),
      reminders: signal(false),
      options: [
        { value: 'me', label: 'Seulement moi' },
        { value: 'friends', label: 'Mes amis', hint: 'Les personnes que tu as invitées.' },
        { value: 'link', label: 'Tout le monde avec le lien' },
        { value: 'gallery', label: 'Public dans la galerie (bientôt)', disabled: true },
      ],
    },
    template: `
      <div style="display: grid; gap: 32px; max-width: 420px">
        <div style="display: grid; gap: 12px">
          <fd-checkbox [(checked)]="all" [indeterminate]="!all() && shown()">Tout sélectionner</fd-checkbox>
          <fd-checkbox [(checked)]="shown" hint="Elles restent visibles sur la carte.">Afficher les étapes passées</fd-checkbox>
          <fd-checkbox [checked]="true" disabled>Sauvegarde automatique (imposée)</fd-checkbox>
        </div>
        <fd-radio-group legend="Qui peut voir ce carnet ?" [options]="options" [(value)]="visibility" />
        <div style="display: grid; gap: 12px">
          <fd-switch [(checked)]="offline">Mode hors ligne</fd-switch>
          <fd-switch [(checked)]="reminders">Rappels de révision le soir</fd-switch>
          <fd-switch disabled>Synchronisation cellulaire (indisponible)</fd-switch>
        </div>
      </div>`,
  }),
};
