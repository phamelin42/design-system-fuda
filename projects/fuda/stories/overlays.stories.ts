import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, input, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import {
  FdButton,
  FdDialog,
  FdDialogFrame,
  FdDialogRef,
  FdIcon,
  FdIconButton,
  FdTooltip,
} from '../src/public-api';
import { bool, choice, text } from './controls';

@Component({
  imports: [FdDialogFrame, FdButton, FdIcon],
  template: `
    <fd-dialog title="Supprimer ce carnet ?">
      <p>
        « Kyoto au printemps » et ses 48 photos seront supprimés définitivement. Tes amis n’y auront
        plus accès.
      </p>
      <div slot="actions">
        <button fdButton cdkFocusInitial (click)="ref.close(false)">Annuler</button>
        <button fdButton variant="danger" (click)="ref.close(true)">
          <svg fdIcon="trash"></svg>Supprimer le carnet
        </button>
      </div>
    </fd-dialog>
  `,
})
class DeleteNotebook {
  protected readonly ref = inject<FdDialogRef<boolean>>(FdDialogRef);
}

interface ConfirmData {
  title: string;
  body: string;
  dismissible: boolean;
}

@Component({
  imports: [FdDialogFrame, FdButton],
  template: `
    <fd-dialog [title]="data.title" [dismissible]="data.dismissible">
      <p>{{ data.body }}</p>
      <div slot="actions">
        <button fdButton cdkFocusInitial (click)="ref.close(false)">Annuler</button>
        <button fdButton variant="danger" (click)="ref.close(true)">Supprimer le carnet</button>
      </div>
    </fd-dialog>
  `,
})
class ConfirmDialog {
  protected readonly ref = inject<FdDialogRef<boolean>>(FdDialogRef);
  protected readonly data = inject<ConfirmData>(DIALOG_DATA);
}

@Component({
  selector: 'fd-demo-dialog-controls',
  imports: [FdButton],
  template: `<button fdButton (click)="open()">Ouvrir le dialogue</button>`,
})
class DemoDialogControls {
  readonly title = input('Supprimer ce carnet ?');
  readonly body = input('« Kyoto au printemps » sera supprimé définitivement.');
  readonly role = input<'dialog' | 'alertdialog'>('alertdialog');
  readonly dismissible = input(true);

  private readonly dialog = inject(FdDialog);

  open() {
    this.dialog.open<boolean, ConfirmData>(ConfirmDialog, {
      role: this.role(),
      dismissible: this.dismissible(),
      data: { title: this.title(), body: this.body(), dismissible: this.dismissible() },
    });
  }
}

@Component({
  selector: 'fd-demo-dialog',
  imports: [FdButton],
  template: `
    <button fdButton (click)="open()">Supprimer le carnet</button>
    @if (result() !== undefined) {
      <p class="caption" style="margin: 12px 0 0">
        Résultat : {{ result() ? 'supprimé' : 'annulé' }}
      </p>
    }
  `,
})
class DemoDialog {
  private readonly dialog = inject(FdDialog);
  protected readonly result = signal<boolean | undefined>(undefined);

  open() {
    this.dialog
      .open<boolean>(DeleteNotebook, { role: 'alertdialog' })
      .closed.subscribe((confirmed) => this.result.set(!!confirmed));
  }
}

const meta: Meta = {
  title: 'Superpositions',
  decorators: [
    moduleMetadata({
      imports: [FdTooltip, FdIconButton, FdIcon, FdButton, DemoDialog, DemoDialogControls],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Infobulles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; padding: 48px 48px 0">
        <button fdIconButton variant="outlined" label="Modifier l’étape"><svg fdIcon="edit"></svg></button>
        <button fdIconButton label="Partager le carnet"><svg fdIcon="share"></svg></button>
        <button fdIconButton label="Voir sur la carte"><svg fdIcon="pin"></svg></button>
      </div>`,
  }),
};

export const Dialogue: Story = {
  render: () => ({ template: `<fd-demo-dialog />` }),
};

// Terrain de jeu : le panneau « Controls » pilote ces stories.
export const InfobulleControles: Story = {
  tags: ['playground'],
  name: 'Infobulle (contrôles)',
  args: { text: 'Partager le carnet', placement: 'top' },
  argTypes: { text, placement: choice(['top', 'bottom', 'left', 'right']) },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 64px"><button fdButton [fdTooltip]="text" [placement]="placement">Survole ou tabule ici</button></div>`,
  }),
};

export const DialogueControles: Story = {
  tags: ['playground'],
  name: 'Dialogue (contrôles)',
  args: {
    title: 'Supprimer ce carnet ?',
    body: '« Kyoto au printemps » sera supprimé définitivement.',
    role: 'alertdialog',
    dismissible: true,
  },
  argTypes: { title: text, body: text, role: choice(['dialog', 'alertdialog']), dismissible: bool },
  render: (args) => ({
    props: args,
    template: `<fd-demo-dialog-controls [title]="title" [body]="body" [role]="role" [dismissible]="dismissible" />`,
  }),
};
