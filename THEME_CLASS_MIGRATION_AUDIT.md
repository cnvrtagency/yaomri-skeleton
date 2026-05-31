# Theme Class Naming Migration Audit

Date: 2026-05-30
Scope: Pre-change namespace planning for sellable distribution

## A. Executive summary

The theme currently uses a stable but brand-forward naming system with multiple co-existing prefixes tied to historical ownership:

- `yaomri-` / `yh-` / `ysh-` / `ym-` / `yab-` / `cc-` / `mdrawer-` / `icon-yaomri-`
- plus shared layout vars `--page-*`

Migration to a neutral namespace is feasible, but a **single-pass rename is high risk** because several components are tightly coupled through selector + data attribute + script assumptions.

Recommended path:

1. Keep current runtime behavior unchanged.
2. Introduce a compatibility/mapping strategy first.
3. Migrate section-by-section in increasing isolation order.
4. Remove old prefixes only after behavior and accessibility regression checks.

### Controlled cleanup pass (2026-05-30, post phase rollout)

CNVRT is now the primary runtime namespace for migrated systems, with legacy namespaces intentionally retained as compatibility fallbacks.

Legacy prefix status after inventory:

| Prefix | Current role | Classification |
|---|---|---|
| `yaomri-` | Legacy class aliases across migrated components | Keep as compatibility alias for now |
| `ysh-` | Single Image Hero legacy variable aliases | Keep as compatibility alias for now |
| `yh-` | Header legacy variable aliases | Keep as compatibility alias for now |
| `yab-` | Announcement legacy variable aliases | Keep as compatibility alias for now |
| `ym-` | Mega menu legacy variable aliases + JS writes | Must keep (runtime compatibility) |
| `cc-` | Collection Cards legacy class/data/var aliases | Must keep (runtime compatibility) |
| `mdrawer-` | Drawer open-lock class + legacy selectors/data attrs | Must keep (runtime compatibility) |
| `yth-` | 3-card hero legacy variable aliases | Keep as compatibility alias for now |
| `icon-yaomri` | Icon snippet/class system | Deferred icon migration (do not rename yet) |

Runtime cleanup completed in this pass:

1. JS selector priority now prefers CNVRT hooks first, while preserving legacy fallbacks.
2. No Shopify setting IDs were renamed.
3. No legacy data attributes were removed.
4. Legacy class and variable aliases remain intentionally until a dedicated alias-removal phase.
5. Cart Phase 1 legacy markup cleanup is complete: `sections/cart.liquid` now renders CNVRT cart classes only, while legacy CSS/JS fallbacks remain intentionally active for one release.
6. Footer Phase 2 legacy markup cleanup is complete: `sections/footer.liquid` now renders CNVRT footer classes only, while legacy footer CSS fallback selectors remain intentionally active for one release.
7. Single Image Hero Phase 5 legacy markup cleanup is complete: `sections/single-image-hero.liquid` now renders CNVRT single-hero classes only, while legacy hero CSS selector fallbacks and `--ysh-*` variable fallbacks remain intentionally active for one release.

## B. Prefix inventory

| Prefix | Where seen | Primary system/component | Artifact type | Dependency risk | Rename recommendation |
|---|---|---|---|---|---|
| `yaomri-` | `layout/`, `sections/`, `assets/`, `snippets/` (large footprint, e.g. `assets/yaomri-header.css`, `assets/section-single-image-hero.css`, `layout/theme.liquid`) | Shared global UI scaffolding (header stack, announcement, cart, mega, hero cards, drawer visuals) | CSS classes, some data attributes (`data-yaomri-header-group`), JS selectors | Very high | Keep now, migrate later with alias layer |
| `yh-` | `sections/header.liquid`, `assets/yaomri-header.css` | Header visual tokens | CSS variables | High (wired inline from settings + consumed by CSS only) | Migrate after header migration plan with aliases |
| `ysh-` | `sections/single-image-hero.liquid`, `assets/section-single-image-hero.css` | Single Image Hero system | CSS classes, vars | Medium-high (single component isolated) | Medium priority: migrate next wave |
| `ym-` | `sections/mega-menu.liquid`, `assets/mega-menu.css`, `assets/mega-menu.js`, `snippets/mega-menu-*.liquid` | Mega menu system | CSS classes, vars, data attributes via JS | High (desktop + panel logic tightly coupled) | Migrate after class alias coverage is in place |
| `yab-` | `sections/announcement-bar.liquid`, `assets/announcement-bar.css` | Announcement bar system | CSS classes, vars | Medium (isolated but in shared stack path) | Good candidate for early migration |
| `cc-` | `sections/collection-cards.liquid`, `assets/section-collection-cards.css`, `assets/section-collection-cards.js` | Collection Cards | CSS classes, vars, data attributes | Medium (JS + CSS + section coupling, isolated) | Good candidate for early migration |
| `mdrawer-` | `sections/header.liquid`, `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.css`, `assets/mobile-drawer.js` | Mobile drawer | CSS classes, data attributes, JS selectors | Medium-high (keyboard/focus behavior + drawer lifecycle) | Migrate after drawer QA + alias layer |
| `icon-yaomri-` | `snippets/icon-yaomri-*.liquid`, `sections/*` icon usages | Icon components and utility glyph classes | CSS classes only | Medium (purely visual, low behavioral risk) | Can migrate alongside component migration, but maintain alias during overlap |
| `--page-` | `snippets/css-variables.liquid`, `assets/*.css`, `sections/*` | Global responsive/layout tokens | CSS variables | Medium (global behavior) | Keep existing; add neutral aliases only if needed |
| `data-*` without prefix | `data-label`, `data-target`, `data-controls` etc | Native interop / legacy snippet patterns | Data attributes | Medium | Leave unless explicitly coupled to external integrations |

Notes:
- No strong evidence for other brand-like prefixes beyond those above.
- `data-yaomri-header-group` is currently a critical anchor for stack coordination and should be preserved/aliased, not removed.

## C. JS selector + dependency map

### 1) `assets/yaomri-header-state.js`

- Class selectors: `.yaomri-header-stack`, `.cnvrt-header-stack`, `.yaomri-header-stack--overlay`, `.cnvrt-header-stack--overlay`, `.yaomri-header-stack--fade`, `.cnvrt-header-stack--fade`, `.yaomri-header-stack--slide`, `.cnvrt-header-stack--slide`, `.yaomri-header-stack--fade-slide`, `.cnvrt-header-stack--fade-slide`, `.is-hidden-after-scroll`, `.yaomri-header`, `.cnvrt-header`, `.yaomri-mega-panels`, `.mdrawer`
- Data attributes: `[data-yaomri-header-group]`, `[data-cnvrt-header-group]`, plus header data attributes read from `sections/header.liquid` (`data-header-stack-*`, `data-cnvrt-header-stack-*`, `data-transparent-*`, `data-transparent-active`)
- CSS custom props written: `--cnvrt-header-stack-transition-duration`, `--cnvrt-header-stack-transition-easing` (with `--yaomri-` aliases for compatibility)
- Events/targets: `scroll`, `resize`, `click`, `touchstart`, `keyup`, `shopify:section:*`, `DOMContentLoaded`
- Risk if rename: **critical** unless alias layer exists, because it owns the shared stack show/hide behavior and header transparency state.

### 2) `assets/mega-menu.js`

- Class selectors: `.yaomri-header`, `.yaomri-mega__item.is-open`, `.yaomri-mega__item`, `[data-mega-panels]`, `.is-open`, `[data-mega-parent]`, `[data-mega-panel]`
- Data attributes: `[data-mega]`, `[data-mega-panels]`, `[data-mega]`, `[data-mega-close]`, `[data-dropdown-trigger]`, `[data-mega-trigger]`, `[data-dropdown]`, `[data-mega-link]`, `[data-panel-width]`, `[data-close-delay]`
- CSS vars written: `--ym-panel-width`, `--ym-content-padding`, `--ym-panel-top`
- Event targets: `mouseenter`, `mouseleave`, `focusin`, `focusout`, `keydown`, `resize`, `scroll`, click handlers
- Risk if rename: **high**, because panel open state and ARIA state updates are selector-driven.

### 3) `assets/mobile-drawer.js`

- Class selectors: `.mdrawer`, `.mdrawer__panel`, `.is-active`, `.is-root`, `.is-drill`, etc.
- Data attributes: `[data-mdrawer]`, `[data-mdrawer-trigger]`, `[data-mdrawer-close]`, `[data-mdrawer-drill]`, `[data-mdrawer-view]`, `[data-mdrawer-back]`, `[data-mdrawer-title]`, `[data-mdrawer-header]`, `[data-mdrawer-view="root"]`, `[data-target]`, `[data-title]`
- CSS vars written: none
- Event targets: click on triggers/buttons, keydown (`Escape`, `Tab`), load-time init from DOM queries
- Risk if rename: **high** for accessibility and focus restoration paths.

### 4) `assets/announcement-bar.js`

- Class selectors: none direct
- Data attributes: `[data-announcement-carousel]`, `[data-announcement-slide]`, `[data-announcement-prev]`, `[data-announcement-next]`, `[data-announcement-dot]`
- CSS vars written: none
- Event targets: click, mouseenter/mouseleave, focusin/focusout
- Risk if rename: **low-medium**, largely contained to announcement.

### 5) `assets/section-collection-cards.js`

- Class selectors: `.cc-carousel`
- Data attributes: `[data-cc-track]`, `[data-cc-prev]`, `[data-cc-next]`
- CSS vars written: none
- Event targets: click on prev/next buttons
- Risk if rename: **medium** (isolated but required for navigation behavior).

### 6) `assets/yaomri-cart.js`

- Class selectors: `.yaomri-cart`
- Data attributes: `[data-cart-subtotal]`, `[data-line-item]`, `[data-line-price]`, `[data-line-compare-price]`, `[data-unit-price]`, `[data-quantity-input]`
- CSS vars written: none
- Event targets: quantity input/input change events
- Risk if rename: **low-medium** in section-local context.

### General risk verdict

Data attributes and class selectors are currently tightly coupled per component. Safe migration requires **compatibility selectors** and staged activation.

## D. CSS variable audit (prefixed)

### `--yh-*` (Header token system)
- Controls: header sizing/colors, logo sizing, icon sizing, nav spacing, cart chip sizing, country selector tokens.
- Scope: **local to header root**, but set inline on header element by settings.
- Rename now: **not yet** (highly coupled to header JS/CSS and settings docs).
- Migration pattern: dual-read/dual-write alias during migration.

### `--ysh-*` (Single Image Hero)
- Controls: stage/overlay/pin/content typography/spacing/size/position.
- Scope: **component-local** (hero block).
- Rename now: medium, good candidate for section migration once JS coupling absent (no JS currently uses these vars).

### `--ym-*` (Mega Menu)
- Controls: panel width, shadows, paddings, typography, link/label sizing, dropdown geometry.
- Scope: **component-local**, plus panel runtime updates in JS.
- Rename now: deferred until JS alias plan ready.

### `--yab-*` (Announcement)
- Controls: announcement section spacing/typography/colours/height and animation speed.
- Scope: **component-local**.
- Rename now: safe-ish and can be migrated early with CSS/markup alignment.

### `--cc-*` (Collection Cards)
- Controls: section layout, typography, spacing, card visuals, badge values.
- Scope: **component-local**, plus CSS-first.
- Rename now: good candidate for early migration; JS is generic enough if selectors are aliased.

### `--mdrawer-*`
- Controls: drawer width (`--mdrawer-max-width`) and drawer-specific visuals in CSS.
- Scope: **component-local**, but a11y flow is sensitive.
- Rename now: deferred until drawer JS/markup aliases are in place.

### `--page-*`
- Controls: site width/inset tokens and foundational global constants.
- Scope: **global layout foundation** from `snippets/css-variables.liquid`.
- Rename now: **do not rename now**; keep for compatibility and migration stability.

## E. Schema/settings risk audit

- No major setting IDs in `config/settings_schema.json` currently use the brand prefixes (`yaomri-`, `ysh-`, etc.) as identifiers.
- Header-stack settings introduced for migration work:
  - `header_stack_scroll_behavior`
  - `header_stack_scroll_threshold`
  - `header_stack_scroll_threshold_mobile`
  - `header_stack_transition`
  - `header_stack_transition_duration`
  - `header_stack_transition_easing`

- Merchant-safe rule: **do not rename existing setting IDs now** due saved-storefront JSON persistence.
- Keep setting IDs stable; if needed, add compatibility mapping in section docs and migrate underlying class/var names only.

## F. Recommended naming convention (for future distribution)

### Recommended destination strategy

- CSS classes/state: `cnvrt-*`
- CSS variables: `--cnvrt-*` (with component namespaces, e.g., `--cnvrt-header-*`, `--cnvrt-mega-*`, `--cnvrt-cc-*`)
- Data attributes: `data-cnvrt-*` for newly added JS hooks only
- Keep a long-running compatibility shim until all sections are migrated.

### Example structure

- `cnvrt-header-stack`, `cnvrt-mega`, `cnvrt-cc-carousel`
- `--cnvrt-header-stack-transition-duration`, `--cnvrt-header-stack-transition-easing`
- `data-cnvrt-header-group`

### Why `cnvrt-`

- Short, neutral, product-ready, distinct from `theme-` while still clear.
- Lower collision risk than `theme-*`.
- Fits goal of CNVRT-sellable theme branding.

### Compatibility rule

- Never ship a rename that deletes old selectors without aliases.
- New selector logic should match both old and new names during transition windows.

## G. Migration method (recommended)

Preferred: **section-by-section with compatibility aliases**.

1. Create alias layer per component
   - CSS dual selectors: `.cnvrt-* , .yaomri-*`
   - Data attr compatibility (where selector coupling exists): retain `data-yaomri-*` and optionally add `data-cnvrt-*`
   - JS selector queries should accept old and new forms.

2. Migrate in this order (low risk -> high risk):
   - Announcement bar (`yab-*`)
   - Collection Cards (`cc-*`)
   - Single Image Hero (`ysh-*`)
   - Header/Mega interaction (`yaomri-*`, `yh-*`, `ym-*`)
   - Mobile drawer (`mdrawer-*`)
   - Cart
   - Docs + registry alignment

3. Post-migration cleanup
   - Remove temporary aliases only after two consecutive QA passes.

4. Preserve settings IDs unchanged.

## H. Migration order + expected QA + commit strategy

### Phase 1 — Announcement
- Files: `sections/announcement-bar.liquid`, `assets/announcement-bar.css`
- Risk: medium-low
- Status: Completed (compatibility alias phase + legacy markup cleanup phase)
- QA: desktop/mobile visibility, marquee/carousel controls, autoplay behavior
- Suggested commit: `feat: add cnvrt announcement namespace aliases`

Announcement bar now renders CNVRT namespace classes in markup and keeps compatibility fallbacks for one release:
- markup primary: `cnvrt-announcement*`
- fallback aliases retained: CSS/JS support for `yaomri-announcement*` selectors and `--yab-*` variables
- new variable namespace: `--cnvrt-announcement-*`

### Phase 2 — Collection Cards
- Files: `sections/collection-cards.liquid`, `assets/section-collection-cards.css`, `assets/section-collection-cards.js`
- Risk: medium
- Status: Completed (compatibility alias phase + legacy markup cleanup phase)
- QA: arrow interactions, placeholders, responsive layout, links
- Compatibility note: Collection Cards markup now emits CNVRT classes as primary; legacy CSS/JS/data support and `--cc-*` variables remain as aliases for one release.
- Suggested commit: `feat: migrate collection cards class namespace with compatibility selectors`

### Phase 3 — Single Image Hero
- Files: `sections/single-image-hero.liquid`, `assets/section-single-image-hero.css`
- Risk: medium
- Status: Completed (compatibility alias phase + legacy markup cleanup phase)
- QA: typography, layout modes, button/pin behavior, mobile overrides
- Compatibility note: `sections/single-image-hero.liquid` now emits CNVRT single-hero classes as primary in markup; legacy CSS selector aliases and `--ysh-*` variable fallbacks remain as compatibility for one release.
- Suggested commit: `feat: migrate single-image-hero classes and css vars to cnvrt namespace`

### Phase 4 — Header Core
- Files: `sections/header.liquid`, `assets/yaomri-header.css`, `assets/yaomri-header-state.js`
- Risk: high
- QA: stack transitions, transparent/solid states, country selector visuals, desktop/mobile header breakpoints
- Status: Completed (compatibility alias phase)
- Compatibility note: legacy `yaomri-header*`/`yaomri-header-stack` classes and `--yh-*`/`--yaomri-header-stack-*` variables remain as aliases while `cnvrt-header*` classes and `--cnvrt-header-*` variables are now used as primary.
- Suggested commit: `feat: migrate header stack classes and data hooks behind compatibility layer`

### Phase 5 — Mega Menu
- Files: `sections/mega-menu.liquid`, `snippets/mega-menu*.liquid`, `assets/mega-menu.css`, `assets/mega-menu.js`
- Risk: high
- QA: desktop open/close, panel geometry, keyboard close, close delay behavior
- Status: Completed (compatibility alias phase)
- Compatibility note: legacy `yaomri-mega*` classes and `--ym-*` variables remain as aliases while `cnvrt-mega*` classes and `--cnvrt-mega-*` variables are now used as primary.
- Suggested commit: `feat: migrate mega menu namespace with script compatibility fallbacks`

### Phase 6 — Mobile Drawer
- Files: `sections/header.liquid`, `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.css`, `assets/mobile-drawer.js`
- Risk: high (a11y/focus)
- QA: aria-expanded, open/close, Escape, focus restore, drill nav
- Status: Completed (compatibility alias phase)
- Compatibility note: legacy `mdrawer*` classes/data attributes and `--mdrawer-*` variables remain as aliases while `cnvrt-drawer*` classes/data attributes are active as primary.
- Suggested commit: `feat: migrate mobile drawer selectors with accessibility-safe compatibility layer`

### Phase 7 — Cart
- Files: `sections/cart.liquid`, `assets/yaomri-cart.css`, `assets/yaomri-cart.js`
- Risk: low-medium
- QA: quantity updates, totals, accessibility semantics
- Status: Completed (compatibility alias phase)
- Compatibility note: legacy `yaomri-cart*` classes remain as aliases while `cnvrt-cart*` classes are active as primary.
- Suggested commit: `refactor: align cart class namespace for CNVRT system`

### Phase 8 — Docs + Registry cleanup
- Files: `THEME_CLASS_MIGRATION_AUDIT.md`, `THEME_SETTINGS_REGISTRY.md` (status notes), `THEME_QA_CHECKLIST.md`
- Risk: low
- QA: docs consistency and migration status checklist
- Status: Completed
- Suggested commit: `docs: complete namespace migration inventory and rollout plan`

## I. Compatibility alias strategy

- Add aliases per component and keep both old/new names until cutover complete.
- Do not rename `data-yaomri-header-group` immediately; it is the stack coordination anchor.
- Prefer compatibility CSS:
  - `.cnvrt-* {}` + `.yaomri-* {}`
  - shared variable bridge patterns (new token resolves to old token).
- In JS, query for old/new selectors in the same expression.

### Current completed state (post Phase 8)

- Announcement namespace migration is complete and stable.
- Announcement legacy markup aliases have been removed (Phase 3 legacy cleanup), with CSS/JS/`--yab-*` fallbacks retained for one release.
- Collection Cards namespace migration is now complete; legacy `cc-*` markup aliases are removed (Phase 4 legacy cleanup) while CSS/JS/data/`--cc-*` fallbacks remain for one release.
- Single Image Hero namespace migration is complete and legacy markup aliases are removed (Phase 5 legacy cleanup); CSS selector aliases and `--ysh-*` variable fallbacks remain for one release.
- Header migration is complete with compatibility aliases.
- Mega menu migration is complete with compatibility aliases.
- Mobile drawer migration is complete with compatibility aliases.
- Cart migration is complete with compatibility aliases.
- Footer and Three Card Hero alias migration are complete with compatibility aliases.
- Deferred for later cleanup: `icon-yaomri-*` snippet naming and other non-component utility/icon namespace refactors.

## J. QA checklist for migration phase validation

- Global: no `shopify theme check` errors, no JS console errors in header/mobile/announcement flows.
- Visual: no stacking regressions, no layout jumps on header transition.
- Accessibility: focus and keyboard behavior unchanged in drawer/mega.
- Functional: announcement controls, slider/carousel interactions, responsive breakpoints respected.
- Persistence: saved JSON still loads after class changes (settings untouched).

## K. What not to rename yet

- Do not rename section/theme setting IDs.
- Do not migrate `data-yaomri-header-group` without a compatibility period.
- Do not rename `--page-*` global tokens.
- Do not rename entire `yaomri-*` stack before mega + drawer + header + announcement migrations are complete and QA-verified.

## L. Suggested next Codex prompt

"Run post-migration cleanup planning for eventual alias removal (`yaomri-*`, `y*` vars, `mdrawer-*`, `cc-*`) after QA sign-off, while preserving settings IDs and stable data attributes."
