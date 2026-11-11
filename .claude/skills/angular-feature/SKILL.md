---
name: angular-feature
description: 'Développer une feature Angular de bout en bout : spec, implémentation, vérification, relecture adverse.'
---

# Feature Angular, de la spec à la relecture

## Déclencheur

L'utilisateur demande d'ajouter une fonctionnalité à une application Angular existante : nouvel écran, nouveau composant, nouveau flux, nouvelle route.

## Étapes

### 1. Cadrer avant de coder

- Lire le `CLAUDE.md` du repo s'il existe, puis `package.json` et `angular.json` pour la version d'Angular, le runner de tests et les scripts.
- Repérer un composant/service existant qui sert de modèle et le lire. Suivre son découpage plutôt qu'en inventer un.
- Si la feature touche plus de deux fichiers ou si l'approche n'est pas évidente : interroger l'utilisateur avec AskUserQuestion (implémentation, UX, cas limites, arbitrages), puis écrire un plan court avant de coder. Nommer explicitement ce qui est hors périmètre.

### 2. Implémenter selon la version d'Angular détectée

Ne jamais appliquer une convention d'une version supérieure à celle du projet.

- v19+ : composants standalone par défaut, ne pas réécrire `standalone: true`.
- v20/21 : `changeDetection: ChangeDetectionStrategy.OnPush` explicite ; Reactive Forms (Signal Forms indisponible) ; `@Injectable({ providedIn: 'root' })`.
- v22+ : OnPush par défaut, Signal Forms stable, décorateur `@Service`.
- Toutes versions modernes : signals pour l'état local, `computed()` pour l'état dérivé, jamais de mutation d'un signal (`set()`/`update()`) ; `input()`/`output()`/`model()` au lieu des décorateurs ; `inject()` au lieu de l'injection par constructeur ; control flow natif `@if`/`@for`/`@switch` ; bindings `[class.x]`/`[style.x]` ; `NgOptimizedImage` ; lazy loading par route.
- Utiliser `ng generate` plutôt que de créer les fichiers à la main.
- Ne pas ajouter de dépendance sans demander.

### 3. Vérifier

- Lancer les tests en one-shot, jamais en watch : `npx ng test --watch=false --browsers=ChromeHeadless` (adapter si le projet utilise Vitest ou Jest).
- Lancer `npm run build` ou `npx tsc --noEmit`.
- Pour une modification visuelle, ouvrir l'app dans le navigateur et prendre une capture.

### 4. Relire

Lancer un sous-agent qui relit le diff par rapport au plan : exigences couvertes, cas limites testés, rien hors périmètre. Lui demander de ne signaler que ce qui affecte la correction ou les exigences énoncées — pas les préférences de style.

## Vérification

La tâche n'est terminée que si la sortie réelle du build et des tests a été montrée à l'utilisateur. Ne jamais affirmer que ça fonctionne sans la sortie de commande correspondante. Ne pas commiter ni pousser sans demande explicite.
