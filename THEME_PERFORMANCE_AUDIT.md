# Theme Performance & Asset Audit

Date: 2026-05-30
Scope: `cnvrt-skeleton`
Goal: identify safe performance/asset cleanup opportunities before future code changes.

## Executive summary
The theme is small-to-medium in footprint and mostly follows a clean section-driven loading pattern. Core risks are **asset scope creep** from always-on header stack assets and a growing set of **unused/deferred sections/assets** (not currently referenced by active templates). No hard blockers are present in current checks.

- `shopify theme check` → **57 files inspected, no offenses**.
- No orphaned `asset_url` references or syntax errors found.
- No theme-check warnings for dead or duplicate assets.
- Potential cleanup is mostly: avoid shipping assets for unused sections, tighten image loading strategy in non-critical sections, and consider CSS/JS deferment for non-critical features.

## Asset inventory summary
### Global and section-scoped CSS
| Asset | Type | Where loaded | Current load scope | Status |
|---|---|---|---|---|
| `assets/critical.css` | CSS | `layout/theme.liquid`, `layout/password.liquid`, `templates/gift_card.liquid` | Global on all non-password/gift-card and password/gift-card pages where used | Keep (critical baseline) |
| `assets/cnvrt-base.css` | CSS | `layout/theme.liquid` | Global on theme layout pages | Keep |
| `assets/cnvrt-header.css` | CSS | `sections/header.liquid` | Always because `header` is in `sections 'header-group'` for all templates | Global (critical visual system) |
| `assets/mega-menu.css` | CSS | `sections/header.liquid` | Always (header-group includes `mega-menu`) | Global |
| `assets/announcement-bar.css` | CSS | `sections/announcement-bar.liquid` | Always (header-group includes `announcement-bar`) | Global |
| `assets/mobile-drawer.css` | CSS | `sections/mobile-menu.liquid` | Always (header-group includes `mobile-menu`) | Global |
| `assets/section-single-image-hero.css` | CSS | `sections/single-image-hero.liquid` | Loaded when `single-image-hero` section renders (`templates/index.json`) | Section-scoped |
| `assets/section-collection-cards.css` | CSS | `sections/collection-cards.liquid` | Loaded when `collection-cards` section renders (`templates/index.json`) | Section-scoped |
| `assets/section-three-card-hero.css` | CSS | `sections/three-card-hero.liquid` | No active template currently references this section type | Candidate cleanup / low-risk if section is disabled |
| `assets/cnvrt-cart.css` | CSS | `sections/cart.liquid` | Loaded on cart template only | Section-scoped |
| `assets/critical.css` (password/gift) | CSS | `layout/password.liquid`, `templates/gift_card.liquid` | Password layout / gift card template only | Keep |

### JS assets
| Asset | Type | Where loaded | Current load scope | Status |
|---|---|---|---|---|
| `assets/mega-menu.js` | JS | `sections/header.liquid` | Global via header-group | Global |
| `assets/cnvrt-header-state.js` | JS | `sections/header.liquid` | Global via header-group | Global |
| `assets/announcement-bar.js` | JS | `sections/announcement-bar.liquid` | Global via header-group | Global |
| `assets/mobile-drawer.js` | JS | `sections/mobile-menu.liquid` | Global via header-group | Global |
| `assets/section-collection-cards.js` | JS | `sections/collection-cards.liquid` | Section-scoped on index where section appears | Section-scoped |
| `assets/cnvrt-cart.js` | JS | `sections/cart.liquid` | Cart template only | Section-scoped |

### Media assets
| Asset | Type | Used where | Status |
|---|---|---|---|
| `assets/icon-account.svg` | SVG icon | Not referenced by repo now | Orphaned candidate |
| `assets/icon-cart.svg` | SVG icon | Not referenced by repo now | Orphaned candidate |
| `assets/shoppy-x-ray.svg` | SVG image | `sections/hello-world.liquid` only | Orphaned with unused section |

## CSS loading report
1. **Global CSS behavior**
- `layout/theme.liquid` loads `critical.css` (preloaded) and `cnvrt-base.css`.
- Header-group is rendered on all pages via `{% sections 'header-group' %}`; therefore header, announcement-bar, mega-menu, and mobile-menu CSS/JS are effectively site-wide.
- `layout/password.liquid` intentionally excludes `cnvrt-base.css` and header stack assets.

2. **Section/local CSS behavior**
- `single-image-hero`, `collection-cards`, and `cart` include section-local stylesheet tags.
- `collection`, `collections`, `custom-section`, `footer`, `search`, `404`, `article`, `blog`, `page`, `product` use inline `{% stylesheet %}` blocks (not external assets), which can increase HTML payload on those templates but are still scoped by section render.

3. **Candidates for CSS audit cleanup**
- `section-three-card-hero.css` appears not used by active templates and should be deferred until section is introduced.
- `hello-world` section is currently unused but still shipping section-level logic in its markup (small; no external CSS/JS).

4. **No duplicate external CSS loader behavior found**
- No duplicate stylesheet tags for same asset in different files.
- Repetition risk remains mostly from many inline stylesheet blocks in old sections (`collection`, `collections`, etc.), not from duplicate external asset loading.

## JS loading report
1. **Always-on JS now loaded**
- Header + announcement + mega-menu + mobile drawer scripts initialize on all standard templates through header-group sections.
- This is expected and currently required for interaction continuity.

2. **Section-local JS**
- `section-collection-cards.js` and `cnvrt-cart.js` are loaded only when their sections are present.

3. **No duplicate asset loads**
- Each JS file is loaded once per theme render context via its section `script` tag.

4. **Potential JS performance observations**
- `mega-menu.js` and `mobile-drawer.js` install several event listeners and maintain state; acceptable for a commerce header but candidates for deferred initialization optimization:
  - `resize`/`scroll` listeners for mega-menu and drawer close/focus handling may be reduced to `passive` where possible and throttled on large-scale interactions.
  - `header-state.js` already uses `requestAnimationFrame` and listener guards.
- There are no obvious duplicate scripts for the same behavior.

## Image performance report
### Single image hero (`sections/single-image-hero.liquid`)
- Desktop image: `image_url` width 2400, `loading: 'eager'`, `sizes: '100vw'`, `widths: '720,960,1200,1600,2000,2400'`.
- Mobile image: `image_url` width 1200, `loading: 'eager'`, `sizes: '100vw'`, `widths: '360,540,720,900,1200'`.
- Notes: Eager loading is intentional for top hero; ensure mobile image only one variant may be emitted when desktop-only use exists.

### Collection cards (`sections/collection-cards.liquid`)
- Card images: `width 900`, `loading: 'lazy'`, `widths: '300,500,700,900'`, `sizes` progressive by viewport.
- Placeholder fallback uses `placeholder_svg_tag` (no network request until image exists).

### Header logos (`sections/header.liquid`)
- Desktop and mobile logos use `loading: 'eager'`.
- Sizes/width lists are detailed with `var(--...width)`; good for CLS control.

### Cart (`sections/cart.liquid`)
- Item image uses `loading: 'lazy'`, `widths: '120,180,240,320,420'`.

### Mega menu tiles (`snippets/mega-menu-panel.liquid`)
- Panel images are `loading: 'lazy'` with narrow width presets.

### General observation
- Placeholder strategy is clear and avoids layout collapse where content is missing.
- No obvious obvious broken `sizes` usage.
- Hero section still uses eager loading by design (LCP-critical first viewport visual).

## Unused/deprecated candidates
### Directly unused / low-value right now
- `sections/three-card-hero.liquid` + `assets/section-three-card-hero.css` (no active template references found).
- `assets/shoppy-x-ray.svg` (referenced only by `sections/hello-world.liquid`, which is currently inactive in active template set).
- `assets/icon-account.svg`, `assets/icon-cart.svg` (not referenced by any `render`/`asset_url` usage in repo).
- `templates/password` / gift card routes still follow existing paths and are intentionally isolated; no cleanup there.

### Potentially valid but dormant (keep unless intentional deactivation)
- `sections/custom-section.liquid` and some icon snippets remain reusable. Even if not referenced in active templates, these are developer/editor extension points and should be assessed before removal.

## Safe cleanup tasks
These can be done with low risk:
1. **Document and mark inactive section/assets for deferred loading**
   - Update docs/settings (outside this audit) to clarify `three-card-hero` and `hello-world` are optional/unused in current routes.
2. **Remove truly orphaned static assets** if merchant acceptance confirmed (no current dependencies)
   - `assets/icon-account.svg`, `assets/icon-cart.svg`, `assets/shoppy-x-ray.svg`.
3. **Audit inline `stylesheet` usage** in non-critical sections (`collection`, `collections`, `footer`, `search`, `custom-section`) and migrate if repeatedly requested, but not required now.
4. **Compress/optimize large static assets if size grows** (none currently urgent; `section-single-image-hero.css` and `cnvrt-cart.css` are moderate but acceptable).

## Medium-risk optimization tasks
1. **Defer non-critical header-side interactions**
   - Consider loading `mobile-drawer.js` and `announcement-bar.js` via dynamic import on first user intent (menu open / interaction) if mobile-first performance budget becomes tight.
2. **Scope `header-group` behavior**
   - Measure bundle/runtime impact of always-on `mega-menu.js` for pages that do not expose desktop menu content; consider lazy attach on first nav hover/focus.
3. **Potential CSS bloat reduction**
   - Remove/trim duplicate selector families if future design migration adds inline CSS overlap.
4. **Image strategy tuning for hero on repeat views**
   - Keep eager on first screen hero but consider preconnect/preload adjustments by variant.

## Deferred tasks (larger architectural work)
1. Convert `header-group` JS into module-based controller with conditional loaders (menu vs scroll-only vs announcement-only).
2. Split `cnvrt-header.css` into smaller chunks once route/feature profiling confirms savings.
3. Introduce explicit asset manifest/performance notes for each section to avoid ambiguity in active/inactive status.
4. Replace static icon SVG asset files with inline snippets/ sprite strategy only after full visual QA.

## Recommended next 5 Codex tasks
1. **Create a cleanup PR for dormant assets**: remove confirmed orphaned static assets after confirmatory search pass.
2. **Add performance instrumentation notes** (Lighthouse/Web Vitals baseline on homepage and cart) to verify gains before/after asset deferrals.
3. **Add template-level asset matrix check** in audit docs so future sections mark whether they’re active on index/product/collections.
4. **Audit `sections/header-group.json` block payload complexity** and measure bytes for header payload size on first paint.
5. **Evaluate lazy-init for mega-menu and drawer interactions** behind feature flags and keep accessibility behavior unchanged.

## Validation state for this audit
- `git status --short`: clean.
- `git diff --check`: no whitespace/errors.
- `shopify theme check`: success (57 files, no offenses).
- No old Dawn repo files modified or introduced by this audit.
