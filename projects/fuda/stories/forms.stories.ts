import { signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdCheckbox, FdRadioGroup, FdSelect, FdSwitch, FdTextField } from '../src/public-api';
import { bool, choice, count, text } from './controls';

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

// Terrain de jeu : le panneau « Controls » pilote ces stories.
export const ChampControles: Story = {
  tags: ['playground'],
  name: 'Champ de saisie (contrôles)',
  args: {
    label: 'Nom du carnet',
    hint: 'Visible par les personnes avec qui tu partages le carnet.',
    error: '',
    placeholder: '',
    optional: false,
    multiline: false,
    maxLength: 0,
    icon: '',
    type: 'text',
    disabled: false,
  },
  argTypes: {
    label: text,
    hint: text,
    error: text,
    placeholder: text,
    optional: bool,
    multiline: bool,
    maxLength: count(0, 280),
    icon: choice(['', 'search', 'pin', 'edit']),
    type: choice(['text', 'email', 'search', 'tel', 'url', 'password']),
    disabled: bool,
  },
  render: (args) => ({
    props: args,
    template: `
      <fd-text-field style="width: 340px" [label]="label" [hint]="hint" [error]="error || undefined" [placeholder]="placeholder"
        [optional]="optional" [multiline]="multiline" [maxLength]="maxLength || undefined" [icon]="icon || undefined"
        [type]="type" [disabled]="disabled" />`,
  }),
};

export const SelectControles: Story = {
  tags: ['playground'],
  name: 'Select (contrôles)',
  args: {
    label: 'Crochet',
    placeholder: 'Choisir une taille',
    hint: 'Indiquée sur l’étiquette de la pelote.',
    error: '',
    disabled: false,
  },
  argTypes: { label: text, placeholder: text, hint: text, error: text, disabled: bool },
  render: (args) => ({
    props: {
      ...args,
      options: ['2,5 mm', '3 mm', '4 mm', '5 mm', '6 mm'].map((s) => ({ value: s, label: s })),
    },
    template: `
      <fd-select style="width: 300px" [label]="label" [placeholder]="placeholder || undefined" [hint]="hint" [error]="error || undefined"
        [disabled]="disabled" [options]="options" />`,
  }),
};

export const CaseControles: Story = {
  tags: ['playground'],
  name: 'Case à cocher (contrôles)',
  args: {
    label: 'Afficher les étapes passées',
    hint: 'Elles restent visibles sur la carte.',
    checked: true,
    indeterminate: false,
    disabled: false,
  },
  argTypes: { label: text, hint: text, checked: bool, indeterminate: bool, disabled: bool },
  render: (args) => ({
    props: args,
    template: `<fd-checkbox [checked]="checked" [indeterminate]="indeterminate" [hint]="hint || undefined" [disabled]="disabled">{{ label }}</fd-checkbox>`,
  }),
};

export const InterrupteurControles: Story = {
  tags: ['playground'],
  name: 'Interrupteur (contrôles)',
  args: { label: 'Mode hors ligne', checked: true, disabled: false },
  argTypes: { label: text, checked: bool, disabled: bool },
  render: (args) => ({
    props: args,
    template: `<fd-switch [checked]="checked" [disabled]="disabled">{{ label }}</fd-switch>`,
  }),
};

export const RadiosControles: Story = {
  tags: ['playground'],
  name: 'Groupe de radios (contrôles)',
  args: {
    legend: 'Qui peut voir ce carnet ?',
    orientation: 'vertical',
    value: 'me',
    disabled: false,
  },
  argTypes: {
    legend: text,
    orientation: choice(['vertical', 'horizontal']),
    value: choice(['me', 'friends', 'link']),
    disabled: bool,
  },
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: 'me', label: 'Seulement moi' },
        { value: 'friends', label: 'Mes amis' },
        { value: 'link', label: 'Avec le lien' },
      ],
    },
    template: `<fd-radio-group [legend]="legend" [orientation]="orientation" [options]="options" [value]="value" [disabled]="disabled" />`,
  }),
};
