import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, input, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdDialog, FdDialogFrame, FdDialogRef } from '../../src/public-api';
import { bool, choice, text } from '../controls';

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
        <button fdButton cdkFocusInitial (click)="ref.close(false)">Cancel</button>
        <button fdButton variant="danger" (click)="ref.close(true)">Delete notebook</button>
      </div>
    </fd-dialog>
  `,
})
class ConfirmDialog {
  protected readonly ref = inject<FdDialogRef<boolean>>(FdDialogRef);
  protected readonly data = inject<ConfirmData>(DIALOG_DATA);
}

@Component({
  selector: 'fd-demo-dialog',
  imports: [FdButton],
  template: `
    <button fdButton (click)="open()">Delete notebook</button>
    @if (result() !== undefined) {
      <p class="caption" style="margin: 12px 0 0">
        Result: {{ result() ? 'deleted' : 'cancelled' }}
      </p>
    }
  `,
})
class DemoDialog {
  readonly title = input('');
  readonly body = input('');
  readonly role = input<'dialog' | 'alertdialog'>('alertdialog');
  readonly dismissible = input(true);

  private readonly dialog = inject(FdDialog);
  protected readonly result = signal<boolean | undefined>(undefined);

  open() {
    this.dialog
      .open<boolean, ConfirmData>(ConfirmDialog, {
        role: this.role(),
        dismissible: this.dismissible(),
        data: { title: this.title(), body: this.body(), dismissible: this.dismissible() },
      })
      .closed.subscribe((confirmed) => this.result.set(!!confirmed));
  }
}

const meta: Meta = {
  title: 'Overlays/Dialog',
  decorators: [moduleMetadata({ imports: [DemoDialog] })],
  args: {
    title: 'Delete this notebook?',
    body: '"Kyoto in spring" and its 48 photos will be deleted for good. Your friends will lose access.',
    role: 'alertdialog',
    dismissible: true,
  },
  argTypes: {
    title: { ...text, description: 'A question or an action' },
    body: { ...text, description: 'The precise consequence' },
    role: {
      ...choice(['dialog', 'alertdialog']),
      description: '`alertdialog` for destructive confirmations',
    },
    dismissible: { ...bool, description: 'Escape, click on the scrim and the close button' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-demo-dialog [title]="title" [body]="body" [role]="role" [dismissible]="dismissible" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Confirmation: Story = {};

export const PlainDialog: Story = {
  args: {
    role: 'dialog',
    title: 'Rename the notebook?',
    body: 'The new name is visible to everyone you share it with.',
  },
};
