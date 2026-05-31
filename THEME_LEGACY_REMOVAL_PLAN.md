# THEME_LEGACY_REMOVAL_PLAN

## Executive summary
- CNVRT aliases are present across all major systems, but most legacy aliases are still active runtime dependencies in CSS and/or JS.
- `config/` and `templates/` currently contain no legacy-prefix setting IDs or class strings from this audit set.
- The only universally safe removals right now are docs-only references.
- First code-removal target should be a controlled pilot on one isolated component (recommended: Cart markup classes only), with CSS/JS fallbacks retained for one release.
- Phase 1 is complete: legacy `cnvrt-cart*` markup classes were removed from `sections/cart.liquid`; CSS/JS legacy fallbacks remain intentionally active for one release.
- Phase 2 is complete: legacy footer markup aliases (`site-footer`, `footer__*`) were removed from `sections/footer.liquid`; footer CSS legacy fallbacks remain intentionally active for one release.
- Phase 3 is complete: legacy `cnvrt-announcement*` markup classes were removed from `sections/announcement-bar.liquid`; CSS/JS and `--cnvrt-announcement-*` variable fallbacks remain intentionally active for one release.
- Phase 4 is complete: legacy `cc-*` markup classes were removed from `sections/collection-cards.liquid`; CSS/JS/data and `--cnvrt-collection-*` variable fallbacks remain intentionally active for one release.
- Phase 5 is complete: legacy `cnvrt-single-hero*` markup classes were removed from `sections/single-image-hero.liquid`; hero CSS selector fallbacks and `--cnvrt-single-hero-*` variable fallbacks remain intentionally active for one release.

## Current status update (2026-05-31)

- Legacy class aliases have now been removed from active runtime markup and primary CSS/JS selectors across Announcement Bar, Collection Cards, Single Image Hero, Header/Header Stack, Mega Menu, Mobile Drawer, Cart, Footer, and Three Card Hero.
- CNVRT classes are the active runtime contract.
- Remaining legacy references are intentionally retained where they are not class aliases:
  - icon system: `cnvrt-icon*` (deferred icon migration)
  - utility skip-link class: `cnvrt-skip-link` (kept as a stable utility hook)
  - compatibility CSS variable fallbacks: `--cnvrt-announcement-*`, `--cnvrt-collection-*`, `--cnvrt-single-hero-*`, `--cnvrt-header-*`, `--cnvrt-mega-*`, `--cnvrt-three-hero-*`
  - legacy-prefixed asset filenames (non-runtime selector concern)
- Setting IDs and schema keys were intentionally preserved.

## Prefix inventory (legacy readiness)

| Prefix | Rendered in Liquid | Used in CSS | Used in JS | CNVRT equivalent exists | JS CNVRT-first | Safe to remove now | Risk | Recommended action | Class |
|---|---|---|---|---|---|---|---|---|---|
| `cnvrt-` | Yes (header, announcement, hero, mega, cart, stack wrapper) | Yes (global component styles) | Yes (`cnvrt-header-state.js`, `mega-menu.js`, fallbacks) | Yes | Partial | No | High | Keep as compatibility alias; remove per-component only after selector parity pass | C |
| `ysh-` | Yes (Single Image Hero inline vars) | Yes (`section-single-image-hero.css` fallbacks) | No direct JS | Yes (`--cnvrt-single-hero-*`) | N/A | No | Medium | Keep until hero CSS drops `--cnvrt-single-hero-*` fallbacks | B |
| `yh-` | Yes (Header inline vars) | Yes (`cnvrt-header.css` fallbacks/state vars) | Indirect via CSS var writes | Yes (`--cnvrt-header-*`) | N/A | No | High | Keep until header/state var chain is fully CNVRT-only | C |
| `yab-` | Yes (Announcement inline vars) | Yes (`announcement-bar.css` fallbacks) | No | Yes (`--cnvrt-announcement-*`) | N/A | No | Medium | Keep until announcement CSS no longer consumes `--cnvrt-announcement-*` fallbacks | B |
| `ym-` | Yes (Mega inline vars) | Yes (`mega-menu.css` fallbacks) | Yes (`mega-menu.js` writes `--cnvrt-mega-*`) | Yes (`--cnvrt-mega-*`) | Partial | No | High | Keep; JS/CSS both still write/read `--cnvrt-mega-*` | C |
| `cc-` | Yes (Collection Cards classes/data/vars) | Yes (`section-collection-cards.css`) | Yes (`section-collection-cards.js`) | Yes | Partial | No | High | Keep until data hooks and CSS aliases are retired together | C |
| `cnvrt-drawer-` | Yes (drawer classes + data attrs + html lock class) | Yes (`mobile-drawer.css`) | Yes (`mobile-drawer.js`, header-state lock check) | Yes | Partial | No | High | Keep; open/close lock and accessibility flows still depend on legacy hooks | C |
| `yth-` | Yes (3-card hero inline vars) | Yes (`section-three-card-hero.css` fallbacks) | No | Yes (`--cnvrt-three-hero-*`) | N/A | No | Medium | Keep until 3-card CSS consumes only CNVRT vars | B |
| `cnvrt-icon` | Yes (icon snippets + renders) | Yes (icon sizing/fill selectors) | No | No full icon namespace replacement | N/A | No | Medium | Defer as dedicated icon-system migration | E |

## Component-by-component removal readiness

### 1) Announcement Bar
- Liquid: CNVRT announcement classes are now primary in markup; legacy `--cnvrt-announcement-*` variable aliases remain emitted.
- CSS: many selectors still target legacy classes directly or mixed legacy/CNVRT combinations.
- JS: behavior is data-attribute based (`data-announcement-*`), not class-prefixed.
- CNVRT equivalent: yes.
- JS prefers CNVRT: N/A (data attrs).
- Remove legacy markup classes now: **Completed in Phase 3 (markup-only)**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-announcement-*`).
- Risk: **Medium**.
- Action: keep CSS/JS/variable compatibility aliases for one release; next removal candidate remains pending QA sign-off.
- Class: **B**.

### 2) Collection Cards
- Liquid: CNVRT collection-card classes are now primary in markup; legacy `data-cc-*` hooks and `--cnvrt-collection-*` variable aliases remain emitted.
- CSS: dual selectors rely on both `cc-*` and `cnvrt-*` namespaces.
- JS: queries both namespaces; sets both init flags.
- CNVRT equivalent: yes.
- JS prefers CNVRT: partial (queries both).
- Remove legacy markup classes now: **Completed in Phase 4 (markup-only)**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-collection-*`).
- Risk: **High**.
- Action: keep CSS/JS/data/variable compatibility fallbacks for one release; next removal candidate remains pending QA sign-off.
- Class: **C**.

### 3) Single Image Hero
- Liquid: CNVRT single-hero classes are now primary in markup; legacy `--cnvrt-single-hero-*` compatibility vars remain emitted.
- CSS: legacy fallback vars and legacy selector coverage still active.
- JS: none.
- CNVRT equivalent: yes.
- JS prefers CNVRT: N/A.
- Remove legacy markup classes now: **Completed in Phase 5 (markup-only)**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-single-hero-*`).
- Risk: **Medium**.
- Action: keep CSS selector fallbacks and variable compatibility aliases for one release; next removal candidate remains pending QA sign-off.
- Class: **B**.

### 4) Three Card Hero
- Liquid: dual classes + `--cnvrt-three-hero-*` compatibility vars.
- CSS: legacy fallback vars still consumed.
- JS: none.
- Activation status: dormant in current store config (`templates/` and `config/settings_data.json` have no `three-card-hero` references), but section is addable through presets in Theme Editor.
- CNVRT equivalent: yes.
- JS prefers CNVRT: N/A.
- Remove legacy markup classes now: **No**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-three-hero-*`).
- Risk: **Medium**.
- Action: keep aliases until 3-card CSS is CNVRT-only.
- Class: **B**.

### 5) Footer
- Liquid/CSS use `site-footer` + `footer__*` with CNVRT aliases.
- Not part of the listed legacy prefix set (`cnvrt-/y*/cc-/cnvrt-drawer-`).
- Runtime dependency risk is low, but this is a separate naming-cleanup track.
- Remove now: **Completed in Phase 2 (markup-only)**.
- Risk: **Low**.
- Action: keep footer CSS fallback selectors for one release; next runtime alias-removal candidate remains pending QA sign-off.
- Class: **B (temporary compatibility naming)**.

### 6) Cart
- Liquid: dual `cnvrt-cart*` + `cnvrt-cart*` classes.
- CSS: dual selector coverage appears broad.
- JS: root query is `".cnvrt-cart, .cnvrt-cart"` (CNVRT-first fallback).
- CNVRT equivalent: yes.
- JS prefers CNVRT: yes (for root lookup).
- Remove legacy markup classes now: **Completed in Phase 1 (markup-only)**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: N/A (no `y*` var namespace dependency like other components).
- Risk: **Low-Medium**.
- Action: keep CSS/JS fallback selectors for one release; next runtime alias-removal candidate remains pending QA sign-off.
- Class: **B**.

### 7) Mobile Drawer
- Liquid: dual classes and dual data attrs (`data-cnvrt-drawer-*` + `data-cnvrt-drawer-*`).
- CSS: html lock and structure styles still include `cnvrt-drawer-open`/legacy selectors.
- JS: uses both namespaces; toggles both `cnvrt-drawer-open` and `cnvrt-drawer-open`.
- CNVRT equivalent: yes.
- JS prefers CNVRT: partial.
- Remove legacy markup classes now: **No**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (where present), plus lock class support.
- Risk: **High**.
- Action: keep until drawer lock/focus system is migrated in one atomic pass.
- Class: **C**.

### 8) Mega Menu
- Liquid/snippets: dual `cnvrt-mega*` + `cnvrt-mega*`.
- CSS: mixed legacy/CNVRT selector groups; legacy vars still used as fallbacks.
- JS: uses both class namespaces; writes both `--cnvrt-mega-*` and `--cnvrt-mega-*` runtime vars.
- CNVRT equivalent: yes.
- JS prefers CNVRT: partial.
- Remove legacy markup classes now: **No**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-mega-*`).
- Risk: **High**.
- Action: keep until mega JS stops writing legacy var names and selector parity is validated.
- Class: **C**.

### 9) Header / Header Stack
- Liquid/layout: dual classes and data attrs (`data-cnvrt-header-group` + `data-cnvrt-header-group`), legacy + CNVRT stack vars.
- CSS: heavy mixed selectors and legacy var fallback chain for transparent/solid/country states.
- JS: header state logic checks both namespaces and legacy lock/open signals.
- CNVRT equivalent: yes.
- JS prefers CNVRT: partial.
- Remove legacy markup classes now: **No**.
- Remove legacy CSS aliases now: **No**.
- Keep old vars: **Yes** (`--cnvrt-header-*`, `--cnvrt-header-stack-*`).
- Risk: **High**.
- Action: keep until a dedicated header-state refactor retires legacy vars and selectors together.
- Class: **C**.

### 10) Icon system
- Legacy icon namespace (`cnvrt-icon*`) is still rendered by snippets and consumed by CSS.
- No complete CNVRT icon namespace/runtime replacement yet.
- Remove now: **No**.
- Risk: **Medium**.
- Action: defer to standalone icon migration.
- Class: **E**.

## Safe-to-remove list (A)
1. Docs-only legacy references in markdown files where they are historical/contextual and not current instructions.
2. Cart markup-only `cnvrt-cart*` aliases in `sections/cart.liquid` were safe and have now been removed (Phase 1 complete).
3. Footer markup-only legacy aliases (`site-footer`, `footer__*`) in `sections/footer.liquid` were safe and have now been removed (Phase 2 complete).
4. Announcement markup-only `cnvrt-announcement*` aliases in `sections/announcement-bar.liquid` were safe and have now been removed (Phase 3 complete).
5. Collection Cards markup-only `cc-*` aliases in `sections/collection-cards.liquid` were safe and have now been removed (Phase 4 complete).
6. Single Image Hero markup-only `cnvrt-single-hero*` aliases in `sections/single-image-hero.liquid` were safe and have now been removed (Phase 5 complete).
7. No additional runtime legacy class/var alias is globally safe for immediate removal across all components.

## Keep-temporarily list (B)
1. `yab-*` (Announcement vars)
2. `ysh-*` (Single Hero vars)
3. `yth-*` (3-card Hero vars)
4. `cnvrt-cart*` markup aliases after pilot may move from B to removable; keep CSS/JS fallback initially
5. `site-footer` / `footer__*` naming cleanup (outside strict legacy-prefix set)

## Keep because runtime depends on it (C)
1. `cnvrt-*` shared header/mega/stack selectors
2. `yh-*` header variable chain
3. `ym-*` mega variables (including JS writes)
4. `cc-*` collection cards classes/data/vars
5. `cnvrt-drawer-*` drawer classes/data/lock class

## Keep because settings/schema depend on it (D)
1. No direct legacy-prefix setting IDs found in `config/settings_schema.json` or templates.
2. Continue preserving existing setting IDs regardless of namespace cleanup.

## Keep/defer icon system (E)
1. `cnvrt-icon*` snippet/class namespace and references.

## Docs-only references (F)
1. Legacy namespace references in:
   - `THEME_CLASS_MIGRATION_AUDIT.md`
   - `THEME_FULL_AUDIT.md`
   - `THEME_QA_CHECKLIST.md`
   - `THEME_SETTINGS_REGISTRY.md`
   - `THEME_ARCHITECTURE_MAP.md`
   - `THEME_RESPONSIVE_SYSTEM.md`
   - `THEME_PERFORMANCE_AUDIT.md`
   - `TYPOGRAPHY_SYSTEM_AUDIT.md`
   - `CNVRT_BUILD_SPEC.md`

## First removal target recommendation
- **Completed runtime removal phases:** Cart markup aliases (Phase 1), Footer markup aliases (Phase 2), Announcement markup aliases (Phase 3), Collection Cards markup aliases (Phase 4), Single Image Hero markup aliases (Phase 5).
- Scope:
  1. Removed `cnvrt-cart*` classes from `sections/cart.liquid` only.
  2. Kept `cnvrt-cart*` classes.
  3. Kept `assets/cnvrt-cart.css` dual selectors for one release.
  4. Kept `assets/cnvrt-cart.js` fallback selector (`.cnvrt-cart, .cnvrt-cart`) for one release.
  5. Removed footer legacy aliases (`site-footer`, `footer__*`) from `sections/footer.liquid`.
  6. Kept footer CSS fallback selectors for one release.
  7. Removed `cnvrt-announcement*` classes from `sections/announcement-bar.liquid`.
  8. Kept announcement CSS/JS selector fallbacks and `--cnvrt-announcement-*` variable fallbacks for one release.
  9. Removed `cc-*` classes from `sections/collection-cards.liquid`.
  10. Kept collection-cards CSS/JS/data selector fallbacks and `--cnvrt-collection-*` variable fallbacks for one release.
  11. Removed `cnvrt-single-hero*` classes from `sections/single-image-hero.liquid`.
  12. Kept single-image-hero CSS selector fallbacks and `--cnvrt-single-hero-*` variable fallbacks for one release.
- Why these phases: isolated/low-coupling markup-only cleanups with no selector/runtime removals.
- Next candidate: pending QA sign-off.

## Exact next Codex prompt for first removal phase
"You are working inside `~/Desktop/shopify-themes/cnvrt-skeleton`.

Task: Remove legacy cart markup aliases only.

Scope:
- Edit `sections/cart.liquid` only.
- Remove `cnvrt-cart*` classes from markup.
- Keep all `cnvrt-cart*` classes.
- Do not edit `assets/cnvrt-cart.css` or `assets/cnvrt-cart.js` in this phase.
- Do not touch other components.

Validation:
- Run `git diff --check`
- Run `shopify theme check`
- Confirm cart still renders and cart JS still initializes.

After completing:
- Summarise removed classes.
- Confirm no other component files changed." 

## QA checklist for any removal phase
1. `git diff --check` clean.
2. `shopify theme check` clean or unchanged known warnings.
3. Header stack fade behavior unchanged.
4. Transparent header + country selector unchanged.
5. Mega open/close + keyboard unchanged.
6. Mobile drawer open/close/focus/escape unchanged.
7. Announcement static/carousel/marquee unchanged.
8. Collection cards carousel/grid unchanged.
9. Hero sections unchanged.
10. Cart functionality unchanged.
