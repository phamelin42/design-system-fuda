import { Component, inject, input } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdToastService } from '../../src/public-api';
import { bool, choice, count, text } from '../controls';

@Component({
  selector: 'fd-demo-toast',
  imports: [FdButton],
  template: `<button fdButton variant="primary" (click)="show()">Show the toast</button>`,
})
class DemoToast {
  readonly tone = input<'info' | 'success' | 'warning' | 'danger'>('success');
  readonly title = input('');
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
      action: this.withAction() ? { label: 'Undo', run: () => undefined } : undefined,
    });
  }
}

const meta: Meta = {
  title: 'Status/Toast',
  decorators: [moduleMetadata({ imports: [DemoToast] })],
  args: {
    tone: 'success',
    title: 'Notebook created',
    text: '"Kyoto in spring" is ready.',
    duration: 5000,
    withAction: false,
  },
  argTypes: {
    tone: choice(['info', 'success', 'warning', 'danger']),
    title: text,
    text,
    duration: {
      ...count(1000, 10000),
      description: 'Milliseconds before it leaves (paused on hover and focus)',
    },
    withAction: { ...bool, description: 'Adds an "Undo" action' },
  },
  render: (args) => ({
    props: args,
    template: `<fd-demo-toast [tone]="tone" [title]="title" [text]="text" [duration]="duration" [withAction]="withAction" />`,
  }),
};
export default meta;
type Story = StoryObj;

export const Success: Story = {};

export const WithAction: Story = {
  args: {
    tone: 'info',
    title: 'Photo deleted',
    text: 'Kiyomizu-dera temple, April 3.',
    withAction: true,
  },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Import failed', text: 'The file is larger than 20 MB.' },
};
