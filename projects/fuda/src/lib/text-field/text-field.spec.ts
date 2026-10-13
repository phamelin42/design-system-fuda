import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, minLength } from '@angular/forms/signals';
import { FdTextField } from './text-field';

@Component({
  imports: [FdTextField],
  template: `
    <fd-text-field
      label="Nom du carnet"
      hint="Visible par tes amis"
      [(value)]="name"
      [maxLength]="20"
    />
    <fd-text-field label="Nom court" [error]="error()" optional />
  `,
})
class Standalone {
  name = signal('Kyoto');
  error = signal<string | undefined>(undefined);
}

@Component({
  imports: [FdTextField, FormField],
  template: `<fd-text-field label="Nom court" [formField]="nameForm.name" />`,
})
class WithSignalForms {
  model = signal({ name: 'Ky' });
  nameForm = form(this.model, (path) => {
    minLength(path.name, 3, { message: 'Le nom doit faire au moins 3 caractères.' });
  });
}

describe('FdTextField', () => {
  it('relie le libellé, la valeur et le compteur', async () => {
    const fixture = TestBed.createComponent(Standalone);
    await fixture.whenStable();
    const [first] = fixture.nativeElement.querySelectorAll(
      'fd-text-field',
    ) as NodeListOf<HTMLElement>;
    const input = first.querySelector('input')!;

    expect(first.querySelector('label')!.getAttribute('for')).toBe(input.id);
    expect(input.value).toBe('Kyoto');
    expect(first.querySelector('.fd-field__count')!.textContent).toBe('5 / 20');
    expect(input.getAttribute('aria-describedby')).toContain(`${input.id}-hint`);

    input.value = 'Nara';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.name()).toBe('Nara');
  });

  it("marque l'exception facultative et affiche l'erreur à la place de l'aide", async () => {
    const fixture = TestBed.createComponent(Standalone);
    await fixture.whenStable();
    const second = fixture.nativeElement.querySelectorAll('fd-text-field')[1] as HTMLElement;
    const input = second.querySelector('input')!;

    expect(second.textContent).toContain('(facultatif)');
    expect(input.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.error.set('Le nom doit faire au moins 3 caractères.');
    await fixture.whenStable();

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(second.querySelector('.fd-field__error')!.textContent).toContain(
      'au moins 3 caractères',
    );
    expect(input.getAttribute('aria-describedby')).toBe(`${input.id}-error`);
  });

  it("s'intègre à Signal Forms : valeur, puis erreur une fois le champ touché", async () => {
    const fixture = TestBed.createComponent(WithSignalForms);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    const input = host.querySelector('input')!;

    expect(input.value).toBe('Ky');
    expect(host.querySelector('.fd-field__error')).toBeNull();

    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(host.querySelector('.fd-field__error')!.textContent).toContain('au moins 3 caractères');

    input.value = 'Kyoto';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(fixture.componentInstance.model().name).toBe('Kyoto');
    expect(host.querySelector('.fd-field__error')).toBeNull();
  });
});
