# Ya Omri Theme Architecture Map

This is the control map for the Skeleton-based Ya Omri theme. It is intentionally opinionated: the point is to reduce duplicate settings, unclear ownership, and merchant-facing controls that are hard to explain.

## Source Of Truth

- `YAOMRI_BUILD_SPEC.md` is the product and architecture source of truth.
- Shopify Skeleton is the base architecture.
- The old Dawn repo is reference only and must not be copied.
- Theme settings own global brand, layout, colour, and header style defaults.
- Sections own content and local behavior only.
- Section group JSON can contain stale editor-saved settings; it must not be treated as schema truth.

## Global Theme Settings

### Brand

Owned by `config/settings_schema.json` under `Brand`.

Owns:
- `logo`
- `mobile_logo`
- `desktop_logo_width`
- `mobile_logo_width`

Must not own:
- Header layout.
- Header spacing beyond logo sizing.
- Mobile drawer behavior.
- Footer or homepage content.

Must not be duplicated elsewhere:
- Logo image pickers.
- Desktop/mobile logo width controls.

Current implementation:
- Mostly follows the model. `sections/header.liquid` reads these global settings and renders desktop/mobile logos.
- Missing settings from the build spec: logo max height and logo vertical offset are listed in the spec but are not currently exposed. Do not add them until header QA proves they are needed.

Judgement:
- Keep logo width global. It affects the brand identity everywhere the header appears.
- Defer logo max-height and offset until visual QA shows a launch problem. They are easy to overbuild.

### Layout

Owned by `config/settings_schema.json` under `Layout` and emitted by `snippets/css-variables.liquid`.

Owns:
- `site_width_mode`
- `custom_site_content_width`
- `--page-width`

Must not own:
- Header-only width.
- Mega menu panel width.
- Mobile drawer width.
- Cart page max width unless the cart is explicitly moved onto the global grid.

Must not be duplicated elsewhere:
- Generic site/page width settings.

Current implementation:
- `site_width_mode` and `custom_site_content_width` control `--page-width`.
- `header_width_mode` and `header_custom_width` are separate header-specific settings, which is acceptable if clearly labelled.
- Legacy `settings.site_content_width` fallback has been removed. `custom_site_content_width` is the only custom page width setting.

Judgement:
- Keep both site width and header width, but label them clearly. The merchant must understand that site width is page content and header width is header row content.
- Mega panel width must remain separate from both.

### Colours

Owned by `config/settings_schema.json` under `t:general.colors` and emitted by `snippets/css-variables.liquid`.

Owns:
- `background_color`
- `foreground_color`
- `sand_color`
- `muted_color`
- `border_color`
- `input_corner_radius`

Must not own:
- Header-specific colours that need separate header contrast.
- Mobile drawer-specific colours if the drawer needs independent styling.
- Cart-specific colours until cart style is promoted to a reusable token system.

Must not be duplicated elsewhere:
- Generic page background, text, muted, border, and soft background tokens.

Current implementation:
- Global tokens are wired to `--color-background`, `--color-foreground`, `--color-sand`, `--color-muted`, `--color-border`, and `--style-border-radius-inputs`.
- Header, mobile drawer, mega menu, and cart still contain some hard-coded colours. This is acceptable for launch only if visual QA passes, but it is not reusable-theme quality.

Judgement:
- Keep the current small colour system for launch.
- Do not add more colour settings until each maps to a visible token and has a clear merchant use case.

## Header System

### Theme Settings > Header

Owned by `config/settings_schema.json` under `Header`.

Owns:
- Global desktop header layout.
- Desktop fallback menu picker.
- Header width mode and custom header width.
- Desktop/mobile header height.
- Navigation text size and gap.
- Header background, foreground, border, bottom border, and shadow.
- Sticky behavior.
- Icon size, icon button sizes, icon gaps.
- Account, wishlist, cart visibility.
- Wishlist link.
- Cart count style.
- Region chip display-only fields and styling.

Must not own:
- Individual navigation item content.
- Dropdown menu content.
- Mega panel content.
- Mega panel visible width.
- Mobile drawer content and footer utilities.
- Cart drawer behavior.

Must not be duplicated elsewhere:
- Header layout.
- Header colours.
- Header icon sizing.
- Cart count styling.
- Region chip fields.

Current implementation:
- The intended global header settings are in `config/settings_schema.json`.
- `desktop_layout` now exposes only the two build-spec layouts.
- `sections/header.liquid` no longer reads removed section-level header styling settings.
- `sections/header-group.json` has no stale removed header settings from the previous header schema.
- Header code still defensively falls back to Layout A if old saved data contains an unsupported layout value.

Judgement:
- Header ownership is now clear enough for launch: global Theme settings own header style, and Header section blocks own desktop navigation items.
- Keep navigation blocks in the Header section. Do not move them to global theme settings.

### Header Section

Owned by `sections/header.liquid`.

Owns:
- Top-level navigation item blocks only:
  - Simple link.
  - Dropdown link.
  - Mega menu link.

Must not own:
- Header visual style.
- Logo settings.
- Header width settings.
- Region chip settings.
- Mobile drawer settings.
- Mega panel content.

Must not be duplicated elsewhere:
- Navigation item title/link/open-new-window controls should not be recreated in Mega Menu.
- Dropdown width belongs to the dropdown block because each dropdown can reasonably differ.

Current implementation:
- The section schema correctly limits settings to two informational paragraphs and nav blocks.
- The Liquid no longer reads old section settings for header style fallback.
- Navigation sources are mixed: header blocks take priority, then `header_menu`, then `main-menu`. This is convenient but confusing for merchants.

Judgement:
- For launch, keep the fallback menu picker only as a fallback when no blocks exist.
- Merchant documentation must say: "Use Header blocks for curated desktop navigation. Use Mobile Menu section for mobile drawer navigation."

### Mega Menu Section

Owned by `sections/mega-menu.liquid` and `snippets/mega-menu-panel.liquid`.

Owns:
- `mega_panel_width`
- `close_delay`
- Mega panel IDs.
- Flexible column layout toggle.
- Link columns.
- Image tiles.
- Mega content block widths.

Must not own:
- Top-level nav labels.
- Header fallback menu.
- Header layout.
- Mobile drawer navigation.
- Dropdown link panels.

Must not be duplicated elsewhere:
- Mega panel visible width.
- Panel ID connection controls.

Current implementation:
- Ownership is now clearer: `.yaomri-mega-panel` owns the visible panel width; `.yaomri-mega-panel__inner` is internal.
- The panel ID workflow is functional but merchant-unfriendly. Matching text IDs across Header and Mega Menu is fragile.
- `close_delay` is too technical for most merchants and should likely be hidden, renamed, or removed for launch.
- Image tile settings are launch-useful, but the tile content model is minimal.

Judgement:
- Keep Mega Menu as a separate Header group section. This makes sense because mega content is too large for individual header blocks.
- Rename ID labels to make the connection obvious, or replace IDs later with a more merchant-safe chooser if Shopify schema allows it.

### Mobile Menu Section

Owned by `sections/mobile-menu.liquid` and `snippets/mobile-drawer.liquid`.

Owns:
- Mobile drawer menu.
- Mobile drawer title.
- Search field toggle and placeholder.
- Drawer footer utilities.
- Sign in, wishlist, shipping text, Instagram link.
- Mobile drawer width and drawer-specific colours.

Must not own:
- Desktop header layout.
- Desktop dropdown width.
- Desktop mega panel width.
- Header icon/cart count styling.

Must not be duplicated elsewhere:
- Mobile drawer width.
- Mobile drawer menu picker.
- Mobile drawer footer utility controls.

Current implementation:
- Putting Mobile Menu in the Header group makes sense. It is part of header navigation behavior even though it is a separate section.
- Mobile menu currently has its own menu picker, while desktop header has `header_menu` and header blocks. This is a deliberate split, but it requires merchant guidance.
- If `drawer_menu` is blank, the implementation falls back to `main-menu` only. Demo menu behavior has been removed.
- Mobile drawer Instagram now uses the section URL setting only, with `#` as the final empty fallback. It no longer references a missing global social setting.

Judgement:
- Keep Mobile Menu in the Header group.
- Blank navigation should fail cleanly, not invent storefront links.

## Cart

Owned by `sections/cart.liquid`, `assets/yaomri-cart.css`, and `assets/yaomri-cart.js`.

Owns:
- Cart page fallback rendering.
- Empty cart copy.
- Cart page summary copy.
- Continue shopping link.
- Trust text.
- Static free shipping message.
- Quantity display recalculation on the page.

Must not own:
- Cart drawer.
- Header cart icon styling.
- Checkout behavior beyond standard form submit.
- Global money formatting.

Must not be duplicated elsewhere:
- Cart page fallback copy should not be duplicated in a future cart drawer. A cart drawer should have its own minimal labels or share snippets deliberately.

Current implementation:
- Cart page is not clearly marked in code or settings as fallback-only.
- `yaomri-cart.js` recalculates visible prices client-side but does not update Shopify cart state until form submit. That is acceptable for a fallback cart page but should not be mistaken for cart drawer behavior.
- A cart drawer is not built yet, which conflicts with the requested 7-day launch plan but not with the original build spec.

Judgement:
- Keep cart page as fallback.
- Build cart drawer only after header/mobile navigation is stable.

## Footer

Owned by `sections/footer.liquid`.

Owns:
- Footer menu.
- Payment icon visibility.
- Footer layout only.

Must not own:
- Global social settings until a social token/group exists.
- Header/mobile drawer Instagram settings.
- Homepage social layer.

Must not be duplicated elsewhere:
- Footer menu should not be reused as mobile drawer utility menu unless explicitly designed.

Current implementation:
- Footer is still mostly Skeleton default and uses translation labels.
- Footer CSS is inline inside the section. That is acceptable for Skeleton default but not ideal for reusable Ya Omri architecture.

Judgement:
- Footer is half-built and needs a launch pass.

## Navigation Ownership Audit

Desktop navigation:
- Primary source: Header section blocks.
- Fallback source: global `header_menu`, then `main-menu`.
- Dropdown content source: dropdown block `menu`.
- Mega trigger source: header block `mega_menu_id`.
- Mega content source: Mega Menu section blocks with matching `parent_id`.

Mobile navigation:
- Primary source: Mobile Menu section `drawer_menu`.
- Fallback source: `main-menu`.

Conflict:
- Desktop and mobile navigation do not share one obvious source of truth.
- This can be acceptable for a fashion storefront where desktop mega navigation differs from mobile drilldown, but the editor workflow must be documented.
- The former demo fallback has been removed.

Recommendation:
- Keep desktop curated through Header blocks.
- Keep mobile through Mobile Menu section.
- Require merchant setup for both before publish.

## Spec Conflicts And Cleanup Needed

- No current desktop header layout schema conflict remains; `desktop_layout` exposes the two build-spec layouts only.
- `sections/header.liquid` no longer contains mappings for retired search-field layouts.
- `sections/header-group.json` contains no known stale settings from the previous header schema.
- `snippets/css-variables.liquid` no longer references legacy `settings.site_content_width`.
- `snippets/mobile-drawer.liquid` no longer references missing `settings.social_instagram_link`.
- Homepage still uses `hello-world`, which the spec says must be replaced before launch.
- Footer remains default Skeleton quality.

## Current Launch Readiness By Area

| Area | Status | Reason |
|---|---|---|
| Global settings | Needs cleanup | Useful foundation; remaining cleanup is mostly broader labels/token polish. |
| Header | Needs cleanup | Spec conflict is fixed; visual QA still needs to pass. |
| Desktop mega menu | Needs cleanup | Width ownership fixed, but ID workflow is fragile. |
| Mobile menu | Needs cleanup | Demo fallback removed; drawer still needs full visual QA. |
| Cart page fallback | Half-built | Works as fallback, but not clearly documented and uses client-only recalculation before submit. |
| Cart drawer | Not started | Required by requested launch plan, not present. |
| Homepage | Not started | Still Skeleton Hello World. |
| Product page | Not started | Still default Skeleton unless separately changed. |
| Collection page | Not started | Still default Skeleton unless separately changed. |
| Search | Half-built | Basic search page exists; no Ya Omri QA pass. |
| Footer | Half-built | Skeleton default, not brand-ready. |
| Theme editor UX | Needs cleanup | Labels and stale saved settings need tightening. |
| Responsive QA | Needs cleanup | Header has responsive work, but full-site QA not complete. |
| Publish readiness | Not started | No unpublished-theme/editor QA cycle yet. |
