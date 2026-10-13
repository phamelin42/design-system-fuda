import { Component, inject, input } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { FdButton, FdToastService } from '../../src/public-api';
import { all, bool, count, pick, text } from '../controls';

type Tone = 'info' | 'success' | 'warning' | 'danger';
const TONES: readonly Tone[] = ['info', 'success', 'warning', 'danger'];

@Component({
  selector: 'fd-demo-toasts',
  imports: [FdButton],
  template: `
    <div style="display: grid; gap: 12px; justify-items: start">
      @for (t of tones(); track t) {
        <button fdButton (click)="show(t)">Show {{ t }} toast</button>
      }
    </div>
  `,
})
class DemoToasts {
  readonly tones = input<readonly Tone[]>(TONES);
  readonly title = input('');
  readonly text = input('');
  readonly duration = input(5000);
  readonly withAction = input(false);

  private readonly toast = inject(FdToastService);

  show(tone: Tone) {
    this.toast.show({
      tone,
      title: this.title(),
      text: this.text() || undefined,
      duration: this.duration(),
      action: this.withAction() ? { label: 'Undo', run: () => undefined } : undefined,
    });
  }
}

const meta: Meta = {
  title: 'Status/Toast',
  decorators: [moduleMetadata({ imports: [DemoToasts] })],
  args: {
    tone: 'all',
    title: 'Notebook created',
    text: '"Kyoto in spring" is ready.',
    duration: 5000,
    withAction: false,
  },
  argTypes: {
    tone: all(TONES),
    title: text,
    text: { ...text, description: 'Optional second line' },
    duration: {
      ...count(1000, 10000),
      description: 'Milliseconds before it leaves (paused on hover and focus)',
    },
    withAction: { ...bool, description: 'Adds an "Undo" action' },
  },
  render: (args) => ({
    props: { ...args, tones: pick(args['tone'], TONES) },
    template: `<fd-demo-toasts [tones]="tones" [title]="title" [text]="text" [duration]="duration" [withAction]="withAction" />`,
  }),
};
export default meta;

// Same name as the component: Storybook then shows one sidebar entry, with no "Default" child.
export const Default: StoryObj = { name: 'Toast' };
