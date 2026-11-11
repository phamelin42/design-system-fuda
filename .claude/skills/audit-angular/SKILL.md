---
name: audit-angular
description: 'Auditer un projet Angular : versions obsolètes, patterns legacy, dette de migration, accessibilité.'
---

# Audit d'un projet Angular

## Déclencheur

L'utilisateur demande un état des lieux, un audit, un plan de mise à niveau ou une revue de dette technique sur un projet Angular.

## Étapes

### 1. Relever l'état réel

Depuis la racine du projet :

- `cat package.json` — version d'Angular, de TypeScript, runner de tests, scripts.
- `npx ng version` et `npm outdated` — écart avec les dernières versions.
- `cat angular.json` — budgets, configurations de build, projets multiples.
- Vérifier `tsconfig.json` : `strict`, `strictTemplates`.

### 2. Chercher les patterns legacy

Compter les occurrences plutôt que de lire tous les fichiers (`grep -rc`) :

- `*ngIf` / `*ngFor` / `*ngSwitch` → control flow natif `@if`/`@for`/`@switch`.
- `@Input()` / `@Output()` → `input()` / `output()`.
- `ngClass` / `ngStyle` → bindings `[class.x]` / `[style.x]`.
- Injection par constructeur → `inject()`.
- `NgModule` restants → standalone.
- Absence de `OnPush` sur les composants (si version < 22).
- `zone.js` dans `package.json` et `polyfills` → chantier zoneless.
- `subscribe()` sans `takeUntilDestroyed` → fuites potentielles.

### 3. Mesurer

- `npm run build` puis relever la taille des bundles et les budgets dépassés.
- Lancer les tests en one-shot et relever ceux qui échouent ou sont ignorés (`xit`, `fdescribe`).

### 4. Restituer

Un tableau : constat, impact, effort estimé, priorité. Distinguer ce qui est mécanisable par `ng update` / schematics de migration de ce qui demande une réécriture. Proposer un ordre de chantiers, pas une liste à plat.

## Vérification

Chaque constat est adossé à une commande réellement exécutée et à son résultat chiffré. Aucune affirmation sur une version ou un compte d'occurrences sans la sortie qui l'appuie.
