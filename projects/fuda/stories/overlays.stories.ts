import { Component, inject, signal } from '@angular/core';
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
  decorators: [moduleMetadata({ imports: [FdTooltip, FdIconButton, FdIcon, DemoDialog] })],
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
