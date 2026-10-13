import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdSelect } from './select';

@Component({
  imports: [FdSelect],
  template: `<fd-select
    label="Crochet"
    placeholder="Choisir une taille"
    [options]="options"
    [(value)]="size"
  />`,
})
class Host {
  options = [
    { value: '3', label: '3 mm' },
    { value: '4', label: '4 mm' },
  ];
  size = signal('');
}

describe('FdSelect', () => {
  it('garde le select natif et expose la valeur choisie', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    expect(select.options).toHaveLength(3);
    expect(select.options[0].disabled).toBe(true);
    expect(select.value).toBe('');

    select.value = '4';
    select.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.size()).toBe('4');
  });
});
