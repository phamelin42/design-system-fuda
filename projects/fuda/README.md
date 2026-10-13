# Fuda

Bibliothèque Angular du design system **Fuda** (札, « la carte »), inspiré du hanafuda : aplats de couleurs franches, liseré d'encre, dix emblèmes. Les tokens, les noms de couleurs et la documentation de chaque composant viennent du [design system](https://claude.ai/artifact/J8FezpFLFeajXXYPZzqrHB).

- 24 composants standalone, signaux, zoneless, formulaires compatibles Signal Forms
- Thèmes Jour et Nuit, WCAG 2.2 AA vérifié par des tests (contrastes des tokens, axe sur chaque story)
- Documentation vivante dans Storybook

## Installation

```bash
npm install fuda @angular/cdk @fontsource/dela-gothic-one @fontsource/zen-maru-gothic
```

Dans `angular.json` (ou dans votre feuille de styles globale) :

```json
"styles": [
  "node_modules/fuda/styles/fuda.css",
  "node_modules/fuda/styles/fonts.css"
]
```

`fuda.css` contient les tokens et les fondations ; le style de chaque composant (`.scss`) est embarqué avec lui. `fonts.css` charge Dela Gothic One et Zen Maru Gothic (sous-ensembles latin et japonais) via @fontsource ; on peut le remplacer par Google Fonts.

## Utilisation

```ts
import { Component, inject, signal } from '@angular/core';
import { FdButton, FdIcon, FdTextField, FdToastService } from 'fuda';

@Component({
  selector: 'app-nouveau-carnet',
  imports: [FdButton, FdIcon, FdTextField],
  template: `
    <fd-text-field label="Nom du carnet" [(value)]="name" hint="Visible par tes amis." />
    <button fdButton variant="primary" (click)="create()">
      <svg fdIcon="plus"></svg>Créer un carnet
    </button>
  `,
})
export class NouveauCarnet {
  protected readonly name = signal('');
  private readonly toast = inject(FdToastService);

  create() {
    this.toast.show({ tone: 'success', title: 'Carnet créé' });
  }
}
```

Avec Signal Forms : `<fd-text-field label="Nom" [formField]="carnetForm.name" />`.

### Thème Nuit

Le thème Nuit ne suit jamais la préférence système : il s'active par `data-theme="dark"` sur `<html>`, quand l'utilisateur le choisit.

```ts
inject(FdThemeService).set('dark'); // ou .toggle()
```

## Composants

| Famille | Composants |
|---|---|
| Identité | `fd-emblem`, `fd-avatar`, `fd-avatar-group`, `emblemFor(id)` |
| Actions | `button[fdButton]`, `a[fdButton]`, `button[fdIconButton]`, `a[fdLink]`, `fd-spinner` |
| Formulaires | `fd-text-field`, `fd-select`, `fd-checkbox`, `fd-radio-group`, `fd-switch` |
| Statut | `fd-badge`, `fd-chip`, `fd-alert`, `FdToastService`, `fd-progress` |
| Navigation et contenu | `fd-tabs`, `fd-breadcrumb`, `a[fdCard]`, `fd-divider`, `fd-accordion`, `fd-empty-state` |
| Superpositions | `[fdTooltip]`, `FdDialog` |

L'API de chaque composant est documentée dans sa story et dans son `README.md` du design system.

## Licence

MIT
