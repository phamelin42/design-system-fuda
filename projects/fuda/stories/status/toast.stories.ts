import { Component, inject, input } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdToastService } from '../../src/public-api';
import { count } from '../controls';

@Component({
  selector: 'fd-demo-toasts',
  imports: [FdButton],
  template: `
    <div style="display: grid; gap: 12px; justify-items: start">
      <button fdButton variant="primary" (click)="success()">Success toast</button>
      <button fdButton (click)="withAction()">Toast with an action</button>
      <button fdButton (click)="danger()">Danger toast</button>
    </div>
  `,
})
class DemoToasts {
  readonly duration = input(5000);
  private readonly toast = inject(FdToastService);

  success() {
    this.toast.show({
      tone: 'success',
      title: 'Notebook created',
      text: '"Kyoto in spring" is ready.',
      duration: this.duration(),
    });
  }
  withAction() {
    this.toast.show({
      tone: 'info',
      title: 'Photo deleted',
      text: 'Kiyomizu-dera temple, April 3.',
      action: {
        label: 'Undo',
        run: () => this.toast.show({ tone: 'success', title: 'Photo restored' }),
      },
      duration: this.duration(),
    });
  }
  danger() {
    this.toast.show({
      tone: 'danger',
      title: 'Import failed',
      text: 'The file is larger than 20 MB.',
      duration: this.duration(),
    });
  }
}

const meta: Meta = {
  title: 'Status/Toast',
  decorators: [moduleMetadata({ imports: [DemoToasts] })],
  args: { duration: 5000 },
  argTypes: {
    duration: {
      ...count(1000, 10000),
      description: 'Milliseconds before it leaves (paused on hover and focus)',
    },
  },
  render: (args) => ({ props: args, template: `<fd-demo-toasts [duration]="duration" />` }),
};
export default meta;

export const Default: StoryObj = {};
