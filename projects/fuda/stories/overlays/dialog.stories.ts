import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, input, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdDialog, FdDialogFrame, FdDialogRef } from '../../src/public-api';
import { all, bool, pick, text } from '../controls';

type Role = 'dialog' | 'alertdialog';
const ROLES: readonly Role[] = ['dialog', 'alertdialog'];

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
        <button fdButton variant="danger" (click)="ref.close(true)">{{ data.confirm }}</button>
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
      @for (r of roles(); track r) {
        <button fdButton (click)="open(r)">Open {{ r }}</button>
      }
    </div>
    @if (result() !== undefined) {
      <p class="caption" style="margin: 12px 0 0">
        Result: {{ result() ? 'confirmed' : 'cancelled' }}
      </p>
    }
  `,
})
class DemoDialogs {
  readonly roles = input<readonly Role[]>(ROLES);
  readonly title = input('');
  readonly body = input('');
  readonly confirm = input('');
  readonly dismissible = input(true);

  private readonly dialog = inject(FdDialog);
  protected readonly result = signal<boolean | undefined>(undefined);

  open(role: Role) {
    this.dialog
      .open<boolean, DialogData>(DemoDialogContent, {
        role,
        dismissible: this.dismissible(),
        data: {
          title: this.title(),
          body: this.body(),
          confirm: this.confirm(),
          dismissible: this.dismissible(),
        },
      })
      .closed.subscribe((confirmed) => this.result.set(!!confirmed));
  }
}

const meta: Meta = {
  title: 'Overlays/Dialog',
  decorators: [moduleMetadata({ imports: [DemoDialogs] })],
  args: {
    role: 'all',
    dismissible: true,
    title: 'Delete this notebook?',
    body: '"Kyoto in spring" and its 48 photos will be deleted for good. Your friends will lose access.',
    confirm: 'Delete notebook',
  },
  argTypes: {
    role: { ...all(ROLES), description: '`alertdialog` for destructive confirmations' },
    dismissible: { ...bool, description: 'Escape, click on the scrim and the close button' },
    title: { ...text, description: '`fd-dialog` title: a question or an action' },
    body: { ...text, description: 'Projected content: the precise consequence' },
    confirm: { ...text, description: 'Label of the confirm button' },
  },
  render: (args) => ({
    props: { ...args, roles: pick(args['role'], ROLES) },
    template: `<fd-demo-dialogs [roles]="roles" [dismissible]="dismissible" [title]="title" [body]="body" [confirm]="confirm" />`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Dialog' };
