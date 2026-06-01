# Typography System Audit

## Standardization update (2026-05-31)

The typography ownership model is now corrected:

1. Theme settings > Typography
- Owns global base typography only (body/heading/button/accent families + base size/weight/line-height defaults).

2. Theme settings > Header
- Owns header/nav/menu typography behavior.
- Header nav is decoupled from global eyebrow/section-heading typography tokens.

3. Theme settings > Section headings
- Owns reusable eyebrow/title/text section-heading styling for standard section headers.
- Emits global `--cnvrt-section-*` variables.

4. Section settings
- Standard sections (`Featured collection`, `Collection cards`) keep content fields only for heading stack content.
- Section-heading styling controls were removed from these sections and routed to global Section headings.

5. Exceptions
- `Single Image Hero` remains a special block-driven typography system and keeps local block typography controls.
- `Announcement bar` remains independent from Section headings and keeps local utility typography controls.

6. Product cards
- Product-card text typography is now global under Theme settings > Product cards (vendor/title/price/sizes/button), not per-section.
- Product-card typography tokens are emitted as `--cnvrt-product-card-*` variables and consumed in `assets/component-product-card.css`.

## Implementation update (2026-05-31)

The theme now uses a global CNVRT typography contract instead of only `type_primary_font`:

- Added global Typography settings in `config/settings_schema.json`:
  - `type_body_font`
  - `type_heading_font`
  - `type_button_font`
  - `type_accent_font`
  - `type_body_size_desktop`
  - `type_body_size_mobile`
  - `type_body_line_height`
  - `type_body_weight`
  - `type_heading_weight`
  - `type_heading_line_height`
  - `type_button_weight`
  - `type_button_letter_spacing`
  - `type_eyebrow_weight`
  - `type_eyebrow_letter_spacing`
  - `type_text_transform_default`
- Added global typography variables in `snippets/css-variables.liquid`:
  - `--cnvrt-font-body-family`
  - `--cnvrt-font-heading-family`
  - `--cnvrt-font-button-family`
  - `--cnvrt-font-accent-family`
  - `--cnvrt-body-size-desktop`
  - `--cnvrt-body-size-mobile`
  - `--cnvrt-body-line-height`
  - `--cnvrt-body-weight`
  - `--cnvrt-heading-weight`
  - `--cnvrt-heading-line-height`
  - `--cnvrt-button-weight`
  - `--cnvrt-button-letter-spacing`
  - `--cnvrt-eyebrow-weight`
  - `--cnvrt-eyebrow-letter-spacing`
- Font loading now attempts weights `300/400/500/600/700/800` for body/heading/button/accent families via `font_face`.
- Limitation: visible differences still depend on whether the selected Shopify font actually provides that weight. CSS now outputs requested weights correctly.
- Single Image Hero paragraph now explicitly applies selected weight to rich text container and paragraph tags:
  - `.cnvrt-single-hero__text`
  - `.cnvrt-single-hero__text p`

## Executive summary

The theme currently has one advanced, granular typography implementation (`single-image-hero`) and several other sections with mostly hardcoded typography. The result is inconsistent merchant experience:

1. Controls exist with different naming and units across sections.
2. Some sections expose only presets or one-off text size sliders.
3. Most typography in header/mega/mobile/cart/3-card hero is CSS-hardcoded and not merchant-controlled.
4. Legacy documentation below still contains some pre-migration entries and should be treated as historical; active runtime now uses CNVRT global typography tokens from Theme settings > Typography.

This audit recommends a standardized, granular system without reducing control.

## Scope audited

- `config/settings_schema.json`
- `layout/theme.liquid`
- `assets/critical.css`
- `assets/cnvrt-base.css`
- `assets/cnvrt-header.css`
- `assets/mega-menu.css`
- `assets/mobile-drawer.css`
- `assets/cnvrt-cart.css`
- `assets/section-single-image-hero.css`
- `assets/section-three-card-hero.css`
- all section schema files and relevant snippets rendering text/headings/buttons:
  - `sections/header.liquid`
  - `sections/mega-menu.liquid`
  - `sections/mobile-menu.liquid`
  - `sections/single-image-hero.liquid`
  - `sections/three-card-hero.liquid`
  - `sections/cart.liquid`
  - `snippets/mega-menu-panel.liquid`
  - `snippets/mobile-drawer.liquid`
  - `snippets/css-variables.liquid`

`assets/base.css` and `assets/theme.css` are not present in this repo.

## Current typography problems

1. Naming is inconsistent: `font_size_desktop`, `nav_text_size`, `font_size`, `heading_style`, hardcoded `clamp(...)`.
2. Units are inconsistent: px ranges, percent line-height values, em letter spacing in hardcoded CSS, and no standard transform control naming.
3. Merchant control is uneven:
   - `single-image-hero`: granular.
   - `three-card-hero`: almost no typography controls.
   - header/mega/mobile/cart: mostly hardcoded typography.
4. Global tokens do not cover heading/body/button weights, line-height, and letter spacing defaults.
5. Repeated pattern components (eyebrow/heading/text/button) do not share a single naming contract across sections.

Update note (May 31, 2026):
- Reusable section-heading styling is active in Theme settings > Section headings (`section_heading_*`) and shared `.cnvrt-section-heading*` CSS.
- Section headings labels now describe “Description” copy (supporting text under section titles) while keeping existing `section_heading_text_*` IDs for compatibility.
- `Featured collection` and `Collection cards` consume global section-heading styling and keep heading content fields local.
- Header/nav/menu typography is explicitly routed to Theme settings > Header and no longer reads global eyebrow/section-heading tokens.
- Single Image Hero Paragraph weight options now include Light (300) and Extra bold (800).
- Single Image Hero paragraph rich text now inherits the selected paragraph font weight, so Light/300 produces an actual rendered change when the active font supports that weight.

## Inventory of typography-related settings (current)

## Global (theme settings)

| Setting ID | Label | Type | Range/default | Location | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|---|
| `type_primary_font` | Primary font | `font_picker` | `work_sans_n4` | `config/settings_schema.json` | Global font family/style/weight seed | `--font-primary--*` via `snippets/css-variables.liquid` | Both |
| `nav_text_size` | Desktop navigation text size | `range` | 10-18, step 1, default 12 | `config/settings_schema.json` | Header nav link size | `--cnvrt-header-nav-size` -> `.cnvrt-header__nav-link` | Desktop only |
| `cart_count_text_size` | Cart count text size | `range` | 9-14, step 1, default 10 | `config/settings_schema.json` | Cart badge number text | `--cnvrt-header-cart-count-font-size` | Both headers |

## Header section blocks (text content, not typography style)

| Setting ID | Label | Type | Default | Location | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|---|
| `title` | Navigation label | `text` | varies | `sections/header.liquid` blocks | Menu item label content | N/A | Desktop |
| `label_text` | Badge text | `text` | blank | `sections/header.liquid` blocks | Item badge copy | N/A | Desktop |

## Mega Menu section

| Setting ID | Label | Type | Range/default | Location | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|---|
| `heading_style` | Link column heading style | `select` | `bold` | `sections/mega-menu.liquid` | Heading typography preset for mega column headings | `cnvrt-mega-panels--heading-*` modifier | Desktop |
| `font_size` (link column block) | Link text size | `range` | 11-18, step 1, default 13 | `sections/mega-menu.liquid` + `snippets/mega-menu-panel.liquid` | Link column text size | `--cnvrt-mega-column-size` -> `.cnvrt-mega-panel__links a` | Desktop |

## Mobile Menu section/footer blocks

No typography style controls. Typography is hardcoded in `assets/mobile-drawer.css`.

## Single Image Hero section (section-level typography-adjacent)

| Setting ID | Label | Type | Default | Location | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|---|
| `desktop_text_alignment` | Desktop text alignment | `select` | `left` | `sections/single-image-hero.liquid` | Text alignment | `--cnvrt-single-hero-desktop-text-align` | Desktop |
| `mobile_text_alignment` | Mobile text alignment | `select` | `center` | `sections/single-image-hero.liquid` | Text alignment | `--cnvrt-single-hero-mobile-text-align` | Mobile |
| `content_width` | Content width | `select` | `site` | `sections/single-image-hero.liquid` | Content text area width container | `--cnvrt-single-hero-content-width` | Both |
| `custom_content_width` | Custom content width | `range` | 280-1800, step 20, default 720 | `sections/single-image-hero.liquid` | Custom content text area width | `--cnvrt-single-hero-content-width` | Both |

## Single Image Hero blocks: Eyebrow (`type: eyebrow`)

| Setting ID | Label | Type | Range/default | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|
| `text` | Text | `text` | `NEW SEASON` | Eyebrow content | `.cnvrt-single-hero__eyebrow` | Both |
| `font_size_desktop` | Font size desktop | `range` | 10-40, step 1, default 12 | Eyebrow size | `--cnvrt-single-hero-eyebrow-font-size-desktop` | Desktop |
| `font_size_mobile` | Font size mobile | `range` | 10-40, step 1, default 11 | Eyebrow size | `--cnvrt-single-hero-eyebrow-font-size-mobile` | Mobile |
| `font_weight` | Font weight | `select` | default `700` | Eyebrow weight | `--cnvrt-single-hero-eyebrow-font-weight` | Both |
| `letter_spacing` | Letter spacing | `range` | 0-20, step 1, default 1 (px) | Eyebrow spacing | `--cnvrt-single-hero-eyebrow-letter-spacing` | Both |
| `uppercase` | Uppercase | `checkbox` | true | Eyebrow transform | `--cnvrt-single-hero-eyebrow-uppercase` | Both |
| `color` | Colour override | `color` | blank | Eyebrow color override | `--cnvrt-single-hero-block-text-color` | Both |
| `margin_bottom` | Margin bottom | `range` | 0-64, step 2, default 0 | Spacing after eyebrow | `--cnvrt-single-hero-block-margin-bottom` | Both |

## Single Image Hero blocks: Heading (`type: heading`)

| Setting ID | Label | Type | Range/default | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|
| `heading` | Heading text | `text` | default copy | Heading content | `.cnvrt-single-hero__heading` | Both |
| `heading_tag` | Heading tag | `select` | `h1` | Semantic tag | `<h1>/<h2>` | Both |
| `font_size_desktop` | Font size desktop | `range` | 24-160, step 2, default 72 | Heading size | `--cnvrt-single-hero-heading-font-size-desktop` | Desktop |
| `font_size_mobile` | Font size mobile | `range` | 24-120, step 2, default 42 | Heading size | `--cnvrt-single-hero-heading-font-size-mobile` | Mobile |
| `font_weight` | Font weight | `select` | default `800` | Heading weight | `--cnvrt-single-hero-heading-font-weight` | Both |
| `line_height_desktop` | Line height desktop | `range` | 90-180, step 5, default 105 (%) | Heading line-height | `--cnvrt-single-hero-heading-line-height-desktop` | Desktop |
| `line_height_mobile` | Line height mobile | `range` | 90-180, step 5, default 115 (%) | Heading line-height | `--cnvrt-single-hero-heading-line-height-mobile` | Mobile |
| `letter_spacing` | Letter spacing | `range` | 0-8, step 1, default 0 (px) | Heading spacing | `--cnvrt-single-hero-heading-letter-spacing` | Both |
| `max_width` | Max width | `range` | 0-900, step 20, default 0 | Heading width constraint | `--cnvrt-single-hero-block-max-width` | Both |
| `color` | Colour override | `color` | blank | Heading color override | `--cnvrt-single-hero-block-text-color` | Both |
| `margin_bottom` | Margin bottom | `range` | 0-64, step 2, default 0 | Spacing after heading | `--cnvrt-single-hero-block-margin-bottom` | Both |

## Single Image Hero blocks: Paragraph (`type: paragraph`)

| Setting ID | Label | Type | Range/default | Controls | CSS var/class | Desktop/Mobile |
|---|---|---|---|---|---|---|
| `text` | Text | `richtext` | default copy | Paragraph content | `.cnvrt-single-hero__text` | Both |
| `font_size_desktop` | Font size desktop | `range` | 12-40, step 1, default 18 | Paragraph size | `--cnvrt-single-hero-paragraph-font-size-desktop` | Desktop |
| `font_size_mobile` | Font size mobile | `range` | 12-40, step 1, default 16 | Paragraph size | `--cnvrt-single-hero-paragraph-font-size-mobile` | Mobile |
| `font_weight` | Font weight | `select` | default `400` | Paragraph weight | `--cnvrt-single-hero-paragraph-font-weight` | Both |
| `line_height_desktop` | Line height desktop | `range` | 120-220, step 5, default 150 (%) | Paragraph line-height | `--cnvrt-single-hero-paragraph-line-height-desktop` | Desktop |
| `line_height_mobile` | Line height mobile | `range` | 120-220, step 5, default 160 (%) | Paragraph line-height | `--cnvrt-single-hero-paragraph-line-height-mobile` | Mobile |
| `max_width` | Max width | `range` | 0-900, step 20, default 0 | Paragraph width constraint | `--cnvrt-single-hero-block-max-width` | Both |
| `color` | Colour override | `color` | blank | Paragraph color override | `--cnvrt-single-hero-block-text-color` | Both |
| `margin_bottom` | Margin bottom | `range` | 0-64, step 2, default 0 | Spacing after paragraph | `--cnvrt-single-hero-block-margin-bottom` | Both |

## Single Image Hero blocks: Button and Button group

No typography settings for button text style. Only `style` variant + spacing + visibility behavior. Typography is hardcoded in CSS (`font-size`, `font-weight`, `letter-spacing`, `text-transform`).

## Three Card Hero section and block settings

No typography controls (only text content fields: eyebrow, heading, text, link label). Typography is hardcoded in `assets/section-three-card-hero.css`.

## Cart section settings

No typography style settings (text content only). Typography is hardcoded in `assets/cnvrt-cart.css`.

## Inconsistent naming table

| Current naming | Where | Problem | Recommended standard |
|---|---|---|---|
| `font_size_desktop` / `font_size_mobile` | single hero blocks | Generic id reused across block types, unclear when searching globally | `eyebrow_size_desktop`, `heading_size_desktop`, `text_size_desktop` |
| `font_weight` | single hero blocks | Same id across eyebrow/heading/paragraph, context-only meaning | `eyebrow_weight`, `heading_weight`, `text_weight` |
| `font_size` | mega link column | Missing desktop/mobile convention, and no type prefix | `text_size_desktop` (or `column_text_size_desktop` if scoped) |
| `heading_style` (preset) | mega section | Preset naming mixed with granular naming elsewhere | keep preset optional but map to explicit variables |
| `nav_text_size` | global header | “text size” pattern differs from hero block naming | `heading/text/button` family naming at section scope |
| hardcoded `clamp(...)` sizes | 3-card/cart CSS | No editor mapping | expose through standardized controls |

## Duplicated controls with inconsistent behavior

1. Heading/text sizing exists in single hero with granular sliders, but 3-card hero headings/text are hardcoded.
2. Button typography appears in single hero, 3-card hero, cart buttons, and mobile drawer links, but only single hero exposes button style choice (not typography).
3. Eyebrow typography appears in base utility (`.eyebrow`), single hero, mega tile eyebrow, and 3-card hero with different defaults and no shared token system.
4. Header nav text size is globally configurable, but mega dropdown link typography is separate and hardcoded except one link-size slider.

## Missing controls by section (against requested full model)

Legend: `Y` implemented, `P` partial, `N` missing.

| Section | Eyebrow controls | Heading controls | Text controls | Button controls |
|---|---|---|---|---|
| Single Image Hero | `P` (missing line-height, max-width) | `P` (missing text transform) | `P` (missing letter spacing) | `N` (all button typography hardcoded) |
| 3-Card Hero | `N` | `N` | `N` | `N` |
| Mega Menu | `N` | `P` (preset only, no granular) | `P` (link text size only) | `N` |
| Header | `N` | `P` (nav size only) | `N` | `N` |
| Mobile Menu drawer | `N` | `N` | `N` | `N` |
| Cart page fallback | `N` | `N` | `N` | `N` |

## Presets overriding or constraining user controls

1. Mega heading preset (`heading_style`) changes heading typography by class modifiers and can conflict with expected granular controls because granular heading controls do not exist.
2. 3-card hero uses hardcoded typography presets in CSS (`clamp`, uppercase, fixed letter spacing); merchant cannot fine tune.
3. Single hero is mostly granular; presets define defaults but do not lock controls. This is the desired model.

## Hardcoded typography by file (not editor-controllable)

1. `assets/section-three-card-hero.css`: eyebrow, heading, text, button all hardcoded.
2. `assets/cnvrt-cart.css`: cart headings, body text, metadata, buttons hardcoded.
3. `assets/mobile-drawer.css`: drawer title/nav/group/footer/country selector typography hardcoded.
4. `assets/mega-menu.css`: dropdown links, panel headings, tile eyebrow/title/cta mostly hardcoded (except link column size and heading style preset).
5. `assets/cnvrt-header.css`: shop name, nav link transform/weight/style hardcoded except `nav_text_size`.
6. `assets/cnvrt-base.css`: `.eyebrow` utility and placeholders hardcoded.

## Settings present but ineffective or misleading

1. No confirmed dead schema setting in current single hero typography pipeline after recent fixes.
2. `heading_style` in mega is effective but coarse; merchants may assume it also affects link body text (it does not).
3. `font_size` in mega link column affects links only, not heading/tile text.
4. “Typography” in many sections is implied by content fields but not actually style-controllable.

## Desktop/mobile control gaps

1. Single hero has desktop/mobile typography for heading/paragraph/eyebrow size and line-height where available.
2. 3-card hero has no desktop/mobile typography settings.
3. Mega/header/mobile/cart generally have no desktop/mobile typography settings, except header `nav_text_size`.

## Max-width control quality

1. Single hero `heading.max_width` and `paragraph.max_width` now bind to actual elements via `--cnvrt-single-hero-block-max-width` and are effective.
2. Single hero `content_width` controls content area wrapper width; this is correct separation from section frame width.
3. Other sections use hardcoded `max-width` in CSS (`10ch`, `30rem`, etc.) with no editor control, which is misleading for advanced merchants expecting parity.

## Global typography settings inheritance status

Current inheritance:

1. `type_primary_font` is global and inherited broadly through `body`.
2. No global tokens for heading/body/button weight, line-height, letter-spacing.
3. Section CSS frequently hardcodes weights/transform/spacing, bypassing reusable global typography defaults.

Result: inheritance exists for family, but not for the rest of typography system.

## Recommended standard typography architecture

## A) Proposed global typography settings (`config/settings_schema.json`)

Add:

1. `heading_font_family` (font picker or derive from primary if omitted)
2. `body_font_family`
3. `button_font_family`
4. `heading_weight_default`
5. `body_weight_default`
6. `button_weight_default`
7. `heading_line_height_default`
8. `body_line_height_default`
9. `heading_letter_spacing_default`
10. `body_letter_spacing_default`
11. `button_letter_spacing_default`

Output as root vars in `snippets/css-variables.liquid`:

- `--font-heading-family`
- `--font-body-family`
- `--font-button-family`
- `--font-heading-weight`
- `--font-body-weight`
- `--font-button-weight`
- `--font-heading-line-height`
- `--font-body-line-height`
- `--font-heading-letter-spacing`
- `--font-body-letter-spacing`
- `--font-button-letter-spacing`

## B) Standard section-level typography controls

Use consistent IDs (section or block scoped as needed):

Eyebrow:
- `eyebrow_size_desktop`
- `eyebrow_size_mobile`
- `eyebrow_weight`
- `eyebrow_line_height`
- `eyebrow_letter_spacing`
- `eyebrow_text_transform`
- `eyebrow_max_width`

Heading:
- `heading_size_desktop`
- `heading_size_mobile`
- `heading_weight`
- `heading_line_height`
- `heading_letter_spacing`
- `heading_text_transform`
- `heading_max_width`

Text:
- `text_size_desktop`
- `text_size_mobile`
- `text_weight`
- `text_line_height`
- `text_letter_spacing`
- `text_max_width`

Button:
- `button_size`
- `button_weight`
- `button_letter_spacing`
- `button_text_transform`

## C) Standard merchant labels

Use:

- `Heading size - desktop`
- `Heading size - mobile`
- `Heading weight`
- `Heading line height`
- `Heading letter spacing`
- `Heading max width`
- `Text size - desktop`
- `Text size - mobile`
- `Text line height`
- `Eyebrow letter spacing`

## D) Standard ranges

Recommended defaults/ranges:

1. Eyebrow size desktop: 10-24px, step 1
2. Eyebrow size mobile: 10-20px, step 1
3. Heading size desktop: 20-110px, step 1
4. Heading size mobile: 18-64px, step 1
5. Text size desktop: 12-32px, step 1
6. Text size mobile: 12-24px, step 1
7. Heading weight: 300-900, step 100
8. Text weight: 300-800, step 100
9. Line height: 0.8-2.2, step 0.05
10. Letter spacing: -0.08em to 0.24em, step 0.01em
11. Max width: 240-1100px, step 10

Note: move line-height storage to unitless decimal (not percent) to avoid conversion friction.

## E) Standard local CSS variable output

Per section wrapper:

- `--section-eyebrow-size-desktop`
- `--section-eyebrow-size-mobile`
- `--section-eyebrow-weight`
- `--section-eyebrow-line-height`
- `--section-eyebrow-letter-spacing`
- `--section-eyebrow-text-transform`
- `--section-eyebrow-max-width`
- `--section-heading-size-desktop`
- `--section-heading-size-mobile`
- `--section-heading-weight`
- `--section-heading-line-height`
- `--section-heading-letter-spacing`
- `--section-heading-text-transform`
- `--section-heading-max-width`
- `--section-text-size-desktop`
- `--section-text-size-mobile`
- `--section-text-weight`
- `--section-text-line-height`
- `--section-text-letter-spacing`
- `--section-text-max-width`
- `--section-button-size`
- `--section-button-weight`
- `--section-button-letter-spacing`
- `--section-button-text-transform`

## F) Standard CSS classes

Recommended shared classes:

- `.theme-eyebrow`
- `.theme-heading`
- `.theme-text`
- `.theme-button`

If keeping CNVRT naming, define equivalents and a mapping layer:

- `.cnvrt-typo-eyebrow`
- `.cnvrt-typo-heading`
- `.cnvrt-typo-text`
- `.cnvrt-typo-button`

Then sections compose these classes rather than duplicating full typography declarations.

## G) Backwards compatibility / migration notes

No destructive rename should happen without JSON migration notes.

Suggested migration map:

1. `single-image-hero` eyebrow block:
   - `font_size_desktop` -> `eyebrow_size_desktop`
   - `font_size_mobile` -> `eyebrow_size_mobile`
   - `font_weight` -> `eyebrow_weight`
   - `uppercase` -> `eyebrow_text_transform` (`uppercase`/`none`)
   - `max_width` add new (`eyebrow_max_width`)
   - `line_height` add new (`eyebrow_line_height`)
2. `single-image-hero` heading block:
   - `font_size_desktop` -> `heading_size_desktop`
   - `font_size_mobile` -> `heading_size_mobile`
   - `font_weight` -> `heading_weight`
   - `line_height_*` -> unitless `heading_line_height_*`
   - `max_width` -> `heading_max_width`
3. `single-image-hero` paragraph block:
   - `font_size_desktop` -> `text_size_desktop`
   - `font_size_mobile` -> `text_size_mobile`
   - `font_weight` -> `text_weight`
   - `line_height_*` -> `text_line_height_*`
   - `max_width` -> `text_max_width`
   - add `text_letter_spacing`
4. `mega-menu`:
   - keep `heading_style` for compatibility
   - add granular optional overrides with standardized IDs
5. `templates/*.json` migration required where setting IDs change.

## H) Preset behavior standard

Rule:

1. Presets only populate initial values.
2. Preset selection must never disable granular controls.
3. If “style preset” is offered, it should write initial values to fields, then allow free tuning.

## Step-by-step implementation plan

1. Add global typography tokens to `config/settings_schema.json` and `snippets/css-variables.liquid`.
2. Create shared typography utility classes in `assets/cnvrt-base.css`.
3. Refactor `single-image-hero` setting IDs to standardized names with backward-compatible reads.
4. Add missing controls to `single-image-hero`:
   - eyebrow line-height/max-width
   - heading text-transform
   - paragraph letter-spacing
   - button typography controls
5. Add section-level typography controls to `three-card-hero` using the same IDs.
6. Add typography controls to mega menu link column and heading/tile text where needed.
7. Add optional typography controls for mobile drawer header/nav/footer.
8. Add cart fallback typography controls (or wire to global tokens at minimum).
9. Remove hardcoded typography only after variable wiring is in place.
10. Migrate JSON templates/settings data and verify no schema mismatches.

## QA checklist for typography standardization

1. Every typography control visibly changes the intended element.
2. Desktop and mobile controls can diverge where expected.
3. Line-height values render correctly as unitless decimals.
4. Letter-spacing supports negative and positive values where configured.
5. Max-width controls apply to actual text element, not unrelated wrapper.
6. Presets do not lock out manual customization.
7. Global typography defaults are inherited by sections with no overrides.
8. Button typography controls are consistent across hero/3-card/mega/cart/mobile where button-like UI exists.
9. No section has orphan settings (schema exists but no CSS/Liquid consumption).
10. No section has hardcoded typography for primary text elements unless explicitly marked intentional.

## High-priority issues to fix first

1. Standardize `single-image-hero` naming to target schema pattern and complete missing controls.
2. Add typography controls to `three-card-hero` (currently the largest inconsistency vs single hero).
3. Add global heading/body/button typography tokens.
4. Replace hardcoded mega/menu/cart/mobile text styles with token-driven defaults plus optional overrides.
5. Keep old IDs temporarily readable to avoid breaking existing merchant JSON.

## Implementation status note

`Single Image Hero typography Phase 1` has now been implemented after this audit:

1. Typography IDs were standardized for eyebrow, heading, paragraph, and button/button-group blocks.
2. Backward-compatible Liquid fallbacks for old setting IDs were added.
3. New controls were added for eyebrow line-height/max width/transform, heading transform, paragraph letter spacing, and button typography.
4. This is intentionally scoped to Single Image Hero only; global tokens and other sections remain deferred.
