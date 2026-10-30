# Fuda : bibliothèque Angular

Implémentation Angular de **Fuda**, le design system inspiré du hanafuda. Source de vérité : https://claude.ai/artifact/J8FezpFLFeajXXYPZzqrHB (`project/README.md`, `motion.md`, `tokens.json`, et par composant `README.md` + `preview.html`). Les libellés, la documentation et les messages de commit sont en français.

## Commandes

Node ≥ 22.22.3 (exigé par Angular 22).

| Commande | Rôle |
|---|---|
| `npm run tokens` | Régénère `projects/fuda/src/styles/tokens.css` depuis `projects/fuda/tokens/tokens.json` |
| `npm run build` | Tokens, puis build de la lib (`dist/fuda`) |
| `npm test` | Tests unitaires (Vitest via `ng test`) |
| `npm run lint` / `npm run typecheck` | ESLint (angular-eslint) / tsc sur la lib, les specs et les stories |
| `npm run storybook` / `npm run build-storybook` | Documentation vivante |
| `npm run e2e` | Playwright sur `storybook-static` : visuel Jour/Nuit, axe, clavier, mouvement réduit |

Une tâche est terminée quand `lint`, `typecheck`, `test` et `build` sont verts (et `e2e` si l'apparence ou le clavier change).

**Toute modification de code finit par une PR** : on commit, on pousse la branche de travail, puis on ouvre la PR vers `main` sans attendre qu'on la demande (après vérification qu'il n'en existe pas déjà une ouverte pour cette branche). Une PR déjà fusionnée ne suit plus la branche : le travail suivant repart de `main` et ouvre une nouvelle PR.

## Structure

- `projects/fuda/tokens/tokens.json` : tokens. Parti de la source de vérité, il en **diverge** désormais (palette, voir plus bas) : ne pas l'écraser en resynchronisant. Ne jamais éditer `tokens.css` à la main.
- `projects/fuda/src/styles/` : `tokens.css` (généré), `base.css` (reset, keyframes, mouvement réduit), `fonts.css`, `fuda.css` (point d'entrée).
- `projects/fuda/src/lib/<composant>/` : un dossier par composant, avec `<composant>.ts`, `<composant>.html` (template), `<composant>.scss` (styles) et la spec à côté. `lib/shared/` : partiels SCSS partagés par plusieurs composants (`_field`, `_status`, `_hint`, `_overlay`), importés par `@use '../shared/…'`.
- `projects/fuda/stories/<famille>/<composant>.stories.ts` : **une seule story par composant**, qui affiche toutes ses variantes, et **chaque `input` du composant a son contrôle** dans le panneau Controls. Règles :
  - une entrée qui définit des variantes (variante/taille/ton d'un bouton, taille d'un spinner…) a l'option `all` par défaut (`all(...)` + `pick(...)` dans `controls.ts`), ou une valeur précise pour n'en montrer qu'une ;
  - un booléen qui définit des variantes (`soft`, `quiet`, `kasumi`, `multiple`…) est un contrôle `both | on | off` (`both` + `states(...)`) ;
  - les autres entrées (libellé, `loading`, `disabled`, `maxLength`…) s'appliquent à tous les exemples ;
  - pour les composants dont les états sont des combinaisons d'entrées (champ, select, case, interrupteur, radios, carte, état vide), le **premier exemple** reçoit tous les contrôles et les suivants sont des états de référence fixes ;
  - les entrées objet (`options`, `tabs`, `items`, `names`) passent par un contrôle `object`.

  Pas de story par variante, pas de copie « avec contrôles ». Tout le texte de Storybook (titres, descriptions, contenu de démonstration) est en **anglais** ; les textes intégrés à la bibliothèque (libellés ARIA comme « Fermer », « Retirer… ») restent en français.
- `e2e/` : tests Playwright ; `e2e/__screenshots__/` : captures de référence (versionnées).

## Conventions Angular

- Angular 22 : composants standalone, `OnPush` et zoneless sont les valeurs par défaut, on ne les répète pas. Aucun NgModule, aucun `standalone: true`.
- Signaux partout : `input()`, `input.required()`, `model()`, `output()`, `computed()`, `viewChild()`, `contentChildren()`. Pas de `@Input`/`@Output`, pas de `ngOnChanges`. Les drapeaux booléens utilisent `{ transform: booleanAttribute }` pour s'écrire `<fd-switch disabled>`.
- Contrôle de flux natif (`@if`, `@for`, `@switch`), jamais `*ngIf`.
- `host: {}` dans le décorateur, pas de `@HostBinding`/`@HostListener`. `inject()` plutôt que l'injection par constructeur.
- Sélecteurs préfixés `fd` ; composants posés sur l'élément natif quand c'est possible (`button[fdButton]`, `a[fdCard]`, `svg[fdIcon]`) pour garder la sémantique HTML. Ces sélecteurs d'attribut portent un `eslint-disable` expliqué.
- Formulaires : les champs implémentent `FormValueControl<T>` (valeur en `model()`) ou `FormCheckboxControl` (`checked` en `model()`) de `@angular/forms/signals`, donc `[formField]="form.name"` fonctionne sans `ControlValueAccessor`.
- Un état qui change hors d'un événement Angular (observable, minuterie) passe par un signal, sinon l'affichage ne se met pas à jour (zoneless).

## Conventions de style

- Uniquement des custom properties issues des tokens, aucune valeur en dur (couleur, espacement, durée, courbe). Classes BEM `fd-`.
- **Template et styles dans des fichiers séparés** : `templateUrl` (`.html`) et `styleUrl` (`.scss`), jamais de `template:` ni de `styles:` inline (seul le template vide d'un composant sans contenu, comme `fd-divider`, reste inline). Un composant qui porte plusieurs classes dans un même `.ts` a un fichier par composant (`accordion.html`, `accordion-item.html`…).
- **`ViewEncapsulation.None` avec un `.scss` par composant** : les classes `fd-*` sont posées sur les hôtes et partagées entre composants (tons, disque de statut, emblème dans le ciel d'une carte, icône dans un bouton) et les consommateurs doivent pouvoir les surcharger, donc pas d'encapsulation émulée. Les styles d'un composant sont embarqués avec lui (pas de feuille globale des composants). Ce qui sert à plusieurs composants va dans un partiel de `lib/shared/`. Un composant n'a que ses propres règles, plus celles de ses enfants quand il les stylise (`.fd-button .fd-icon`). Les composants posés sur un élément natif (`button[fdButton]`, `a[fdLink]`…) sont des `@Component` à template `<ng-content />`, car une directive ne peut pas porter de styles.
- Les hôtes de composants sont des éléments personnalisés, donc `inline` par défaut : un hôte qui porte une bordure ou une hauteur reçoit `display` explicite dans son `.scss`.
- Thème Jour par défaut. Thème Nuit **uniquement** par `data-theme="dark"` sur `<html>`, posé par `FdThemeService` sur choix de l'utilisateur. Jamais de `prefers-color-scheme` pour les couleurs.
- Mouvement : durées et courbes des tokens, animation de `transform` et `opacity` seulement, bloc `prefers-reduced-motion` de `base.css` respecté (fondu seul pour toast et dialogue, pulsation pour les chargements).

## Accessibilité (WCAG 2.2 AA)

- Focus toujours visible (`--focus-ring`), cibles de 44 px, libellé de champ toujours visible.
- Texte à 4.5:1 dans les deux thèmes : `contrast.spec.ts` lit la note de chaque token (« sur `surface` »…) et vérifie chaque paire.
- `e2e/a11y.spec.ts` passe axe sur chaque story dans les deux thèmes ; aucune violation tolérée. `openStory` passe `a11y.manual` : l'addon a11y de Storybook ne lance pas son propre axe en parallèle (sinon « Axe is already running »).

## Tests

- Unitaires (Vitest, jsdom) : comportement et ARIA de chaque composant, tokens, contrastes. jsdom n'a pas de mise en page : ce qui en dépend (focus initial d'un dialogue, position d'une infobulle) est couvert par Playwright.
- Playwright : un test visuel par story et par thème, axe, clavier, mouvement réduit.
- Les captures de référence viennent de Chromium sous Linux, dans la version qu'épingle `@playwright/test` (c'est celle de la CI : `npx playwright --version`, puis `npx playwright install --dry-run chromium` donne le numéro). Un autre Chromium rend le texte différemment et fait échouer le visuel en CI : ne pas régénérer les captures avec un Chromium plus ancien ou plus récent. Le rendu du texte est épinglé (`--font-render-hinting=none` dans `playwright.config.ts`) pour ne pas dépendre de la fontconfig de la machine. Après un changement d'apparence voulu : `npm run build-storybook && npm run e2e -- --update-snapshots`, puis relire les images modifiées.
- Lancer Playwright avec un Chromium déjà installé : `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/chemin/chrome npm run e2e`.

## Écarts assumés par rapport aux planches

- **Palette de la pochette Hakuna Matata** (demande explicite, remplace la palette rose) : sable (`surface-sunken`, `#EFDDC5`), crème (`surface`), lagon turquoise (`sakura`, texte `on-sakura` encre), menthe (`sakura-soft`, `mizu`), ambre (`yamabuki`, lettrage de la pochette) et encre presque noir (`ink`, `rim`). Thème Nuit : lagon de nuit (`surface` `#0A2F2E`), texte crème, liseré menthe. **Les noms de jetons ne changent pas** (`sakura` reste la couleur principale, `shu` l'accent d'illustration, `kon` le fond d'emblème) : renommer casserait tous les consommateurs. `sakura-press` (survol), `sakura-deep` (texte turquoise, bords, indicateur d'onglet) et `mizu` (menthe de la progression) sont nouveaux. `tokiwa`, `asagi`, `fuji` et `enji` (succès, info, erreur) gardent leur teinte : ce sont des couleurs d'état. Publiée en 0.2.0 : `^0.1.0` ne la prend pas, les projets passent à `@phamelin/fuda@^0.2.0` quand ils le décident.
- **Sélection** (case, radio, interrupteur, chip actif) : fond `sakura`, bord `sakura-deep`, au lieu d'un remplissage `ink`. L'interrupteur éteint est une piste claire cernée de `line-strong`.
- **Bouton `success`** : variante verte (`tokiwa`, texte `on-tokiwa`, survol `tokiwa-press`, nouveau token) pour signaler un choix réussi, par exemple la bonne réponse d'un quiz. Les planches n'ont que `primary`, `secondary`, `ghost` et `danger`.
- **Badge et indicateur d'onglet** : pilule arrondie à la place du tanzaku (parallélogramme).
- **Progression** : barre `mizu` cernée d'`asagi` (3:1 avec la piste), plus de rouge qui ressemble à une erreur.
- **Accordéon** : chevron vers la droite fermé, vers le bas ouvert.
- **Select** : liste déroulante personnalisée (`appearance: base-select`, Chrome 135+) avec coins arrondis et survol `sakura-soft` ; les autres navigateurs gardent leur liste native.
- **Ciels de carte** `asagi`, `tokiwa`, `fuji`, `kon` : couleur mêlée à moitié à `surface-raised`, pour rester pastel.
- **Icônes** : un petit composant `svg[fdIcon]` avec les tracés des planches, au lieu de Lucide. Aucun écart visuel ; pour ajouter une icône, ajouter son tracé dans `icon.ts`.
- **Tabs** : l'API est `<fd-tabs><fd-tab id label>panneau</fd-tab></fd-tabs>` plutôt qu'un tableau `tabs`, pour que le panneau soit du contenu projeté.
- **Accordion** : `<fd-accordion-item id title>` en contenu plutôt qu'un tableau `items`.
- **Card** : `a[fdCard]`, `article[fdCard]` ou `div[fdCard]`, avec des emplacements `slot="badge|title|meta|actions"`. Une carte-lien est détectée à l'élément `a`.
- **Toast** : la région `aria-live` est créée au premier `toast.show()`, rien à ajouter dans l'application.
- **Fil d'Ariane** : la variante mobile (parent direct précédé d'un chevron) n'est pas implémentée.

## Pour ajouter un composant

1. Lire son `README.md` et sa `preview.html` dans la source de vérité.
2. Écrire ses styles dans `<nom>.scss` (valeurs de tokens uniquement, classes de la planche si elles existent) et son template dans `<nom>.html`.
3. Écrire le composant (`@Component` avec `templateUrl`, `styleUrl` et `ViewEncapsulation.None`) et sa spec dans `src/lib/<nom>/`, l'exporter dans `src/public-api.ts`.
4. Ajouter une story (textes de la planche) ; `npm run e2e -- --update-snapshots` pour la capture, puis la relire.
