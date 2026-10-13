import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, input, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdDialog, FdDialogFrame, FdDialogRef } from '../../src/public-api';
import { bool } from '../controls';

interface DialogData {
  title: string;
  body: string;
  confirm: string;
  dismissible: boolean;
}

@Component({
  imports: [FdDialogFrame, FdButton],
  template: `
    <fd-dialog [title]="data.title" [dismissible]="data.dismissible">
      <p>{{ data.body }}</p>
      <div slot="actions">
        <button fdButton cdkFocusInitial (click)="ref.close(false)">Cancel</button>
        <button
          fdButton
          [variant]="data.confirm === 'Delete notebook' ? 'danger' : 'primary'"
          (click)="ref.close(true)"
        >
          {{ data.confirm }}
        </button>
      </div>
    </fd-dialog>
  `,
})
class DemoDialogContent {
  protected readonly ref = inject<FdDialogRef<boolean>>(FdDialogRef);
  protected readonly data = inject<DialogData>(DIALOG_DATA);
}

@Component({
  selector: 'fd-demo-dialogs',
  imports: [FdButton],
  template: `
    <div style="display: flex; gap: 12px">
      <button fdButton (click)="confirmDeletion()">Delete notebook</button>
      <button fdButton (click)="rename()">Rename notebook</button>
    </div>
    @if (result() !== undefined) {
      <p class="caption" style="margin: 12px 0 0">
        Result: {{ result() ? 'confirmed' : 'cancelled' }}
      </p>
    }
  `,
})
class DemoDialogs {
  readonly dismissible = input(true);

  private readonly dialog = inject(FdDialog);
  protected readonly result = signal<boolean | undefined>(undefined);

  confirmDeletion() {
    this.open('alertdialog', {
      title: 'Delete this notebook?',
      body: '"Kyoto in spring" and its 48 photos will be deleted for good. Your friends will lose access.',
      confirm: 'Delete notebook',
    });
  }

  rename() {
    this.open('dialog', {
      title: 'Rename the notebook?',
      body: 'The new name is visible to everyone you share it with.',
      confirm: 'Rename',
    });
  }

  private open(role: 'dialog' | 'alertdialog', content: Omit<DialogData, 'dismissible'>) {
    this.dialog
      .open<boolean, DialogData>(DemoDialogContent, {
        role,
        dismissible: this.dismissible(),
        data: { ...content, dismissible: this.dismissible() },
      })
      .closed.subscribe((confirmed) => this.result.set(!!confirmed));
  }
}

const meta: Meta = {
  title: 'Overlays/Dialog',
  decorators: [moduleMetadata({ imports: [DemoDialogs] })],
  args: { dismissible: true },
  argTypes: {
    dismissible: { ...bool, description: 'Escape, click on the scrim and the close button' },
  },
  render: (args) => ({ props: args, template: `<fd-demo-dialogs [dismissible]="dismissible" />` }),
};
export default meta;

export const Default: StoryObj = {};
