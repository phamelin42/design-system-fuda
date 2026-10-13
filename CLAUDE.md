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

## Structure

- `projects/fuda/tokens/tokens.json` : tokens. Parti de la source de vérité, il en **diverge** désormais (palette, voir plus bas) : ne pas l'écraser en resynchronisant. Ne jamais éditer `tokens.css` à la main.
- `projects/fuda/src/styles/` : `tokens.css` (généré), `base.css` (reset, keyframes, mouvement réduit), `components.css` (classes `fd-*`), `fonts.css`, `fuda.css` (point d'entrée).
- `projects/fuda/src/lib/<composant>/` : un dossier par composant, spec à côté.
- `projects/fuda/stories/<famille>/<composant>.stories.ts` : **une seule story par composant**, qui affiche toutes ses variantes (tous les tons d'un badge, toutes les variantes et tailles d'un bouton…) ; le panneau Controls règle le reste (libellé, icône, chargement, désactivé…). Pas de story par variante, pas de copie « avec contrôles ». Helpers de contrôles dans `controls.ts`. Tout le texte de Storybook (titres, descriptions, contenu de démonstration) est en **anglais** ; les textes intégrés à la bibliothèque (libellés ARIA comme « Fermer », « Retirer… ») restent en français.
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

- Uniquement des custom properties issues des tokens, aucune valeur en dur (couleur, espacement, durée, courbe). Classes BEM `fd-` comme dans `components.css`.
- **Feuille globale plutôt qu'encapsulation par composant** : les composants gardent `ViewEncapsulation.Emulated` sans styles propres, et leurs classes `fd-*` vivent dans `components.css`. Raisons : les classes sont partagées entre composants (tons, disque de statut, emblème dans le ciel d'une carte, icône dans un bouton), les consommateurs peuvent les surcharger, et la feuille de référence du design system est reprise telle quelle, ce qui rend les écarts faciles à repérer.
- Les hôtes de composants sont des éléments personnalisés, donc `inline` par défaut : un hôte qui porte une bordure ou une hauteur reçoit `display` explicite dans `components.css`.
- Thème Jour par défaut. Thème Nuit **uniquement** par `data-theme="dark"` sur `<html>`, posé par `FdThemeService` sur choix de l'utilisateur. Jamais de `prefers-color-scheme` pour les couleurs.
- Mouvement : durées et courbes des tokens, animation de `transform` et `opacity` seulement, bloc `prefers-reduced-motion` de `base.css` respecté (fondu seul pour toast et dialogue, pulsation pour les chargements).

## Accessibilité (WCAG 2.2 AA)

- Focus toujours visible (`--focus-ring`), cibles de 44 px, libellé de champ toujours visible.
- Texte à 4.5:1 dans les deux thèmes : `contrast.spec.ts` lit la note de chaque token (« sur `surface` »…) et vérifie chaque paire.
- `e2e/a11y.spec.ts` passe axe sur chaque story dans les deux thèmes ; aucune violation tolérée.

## Tests

- Unitaires (Vitest, jsdom) : comportement et ARIA de chaque composant, tokens, contrastes. jsdom n'a pas de mise en page : ce qui en dépend (focus initial d'un dialogue, position d'une infobulle) est couvert par Playwright.
- Playwright : un test visuel par story et par thème, axe, clavier, mouvement réduit.
- Les captures de référence viennent de Chromium sous Linux. Après un changement d'apparence voulu : `npm run build-storybook && npm run e2e -- --update-snapshots`, puis relire les images modifiées.
- Lancer Playwright avec un Chromium déjà installé : `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/chemin/chrome npm run e2e`.

## Écarts assumés par rapport aux planches

- **Palette plus claire et plus rose** (demande explicite) : la couleur principale est `sakura` (rose cerisier, texte `on-sakura` foncé) à la place de `shu`, qui ne reste qu'un accent d'illustration des emblèmes. `ink`, `rim`, `kon` et les neutres sont éclaircis, les surfaces tirent vers le rose. `sakura-press` (survol), `sakura-deep` (texte rose, bords, indicateur d'onglet) et `mizu` (bleu clair de la progression) sont nouveaux.
- **Sélection** (case, radio, interrupteur, chip actif) : fond `sakura`, bord `sakura-deep`, au lieu d'un remplissage `ink`. L'interrupteur éteint est une piste claire cernée de `line-strong`.
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
2. Ajouter ses classes à `components.css` (valeurs de tokens uniquement) ou réutiliser celles de la planche.
3. Écrire le composant et sa spec dans `src/lib/<nom>/`, l'exporter dans `src/public-api.ts`.
4. Ajouter une story (textes de la planche) ; `npm run e2e -- --update-snapshots` pour la capture, puis la relire.
