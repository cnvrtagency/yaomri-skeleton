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
- `transparent_logo`
- `transparent_mobile_logo`
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
- `site_inset`
- `--page-width`
- `--page-inset`

Must not own:
- Header-only width.
- Mega menu panel width.
- Mobile drawer width.
- Cart page max width unless the cart is explicitly moved onto the global grid.

Must not be duplicated elsewhere:
- Generic site/page width settings.

Current implementation:
- `site_width_mode` and `custom_site_content_width` control `--page-width`.
- `site_inset` controls global site-width breathing room across desktop/tablet/mobile via `--page-inset`.
- `--page-mobile-inset` remains an alias of `--page-inset` for compatibility while sections migrate.
- Responsive width behavior for modern sections is documented in `THEME_RESPONSIVE_SYSTEM.md`.
- `header_width_mode` and `header_custom_width` are separate header-specific settings, which is acceptable if clearly labelled.
- Legacy `settings.site_content_width` fallback has been removed. `custom_site_content_width` is the only custom page width setting.

Guidance:
- Site-width sections should follow the shared inner-wrapper contract in the responsive system doc and avoid hidden hardcoded inner side inset.

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

### Announcement Bar Section

Owned by `sections/announcement-bar.liquid`.

Owns:
- Announcement strip content above the header.
- Display mode: static, carousel, marquee.
- Bar-local width, colours, border, spacing, and typography.
- Announcement item blocks (text, link, visibility toggles).

Must not own:
- Header layout, icons, logo, or country selector.
- Mega menu or mobile drawer behavior.
- Global typography tokens.

Must not be duplicated elsewhere:
- Announcement mode controls.
- Announcement item content blocks.

Current implementation:
- Announcement is a standalone section in `sections/header-group.json` above Header.
- Header and announcement stay separately editable in Theme Editor.
- Frontend behavior is coordinated through a shared header-group wrapper in `layout/theme.liquid` (`[data-yaomri-header-group]` and `.yaomri-header-stack`), so the two sections move together in transparent/sticky mode.
- Header group order is: Announcement Bar, Header, Mega Menu, Mobile Menu.
- Stack ownership moved to the wrapper level to avoid placing announcement-related transforms on the header section alone.
- Skip link and main content landmark are wired in layout for keyboard-first navigation into the page flow.

Judgement:
- This ownership is launch-correct. Announcement should remain standalone for merchant clarity, with stack behavior coordinated at the group level.

### Reusable Section Header Pattern

Owned by:
Deferred (not active) while we keep section-specific local heading implementations for launch.

Owns:
- `n/a` in the active build (snippet and CSS have been removed from runtime use).
- Planned reusable section-level editorial header UI for content sections.
- Shared structure for eyebrow, heading, text, optional CTA, and width/alignment variants (future use).

Must not own:
- Actual section settings schema for each consuming section.
- Header/navigation logic.
- Global typography tokens.

Current implementation:
- The runtime owner remains local to each section (`Collection Cards` and `Single Image Hero`).
- `snippets/section-header.liquid` and `assets/section-header.css` are not rendered in active sections.
- Theme settings still include dormant `Section headers` defaults documented for future rollout.
- Deferred system is intentionally not consuming any active section yet.

Judgement:
- Keep this system deferred until a dedicated migration pass. Current active sections keep local heading implementations.

### Collection Cards Section

Owned by:
- `sections/collection-cards.liquid`
- `assets/section-collection-cards.css`
- `assets/section-collection-cards.js`

Owns:
- Collection showcase in Grid or Carousel mode.
- Simple section heading row with optional subtitle and carousel arrows.
- Card-level collection overrides (title/image/link/subtitle/image/count).
- Section-level card typography controls and per-card badge/label rendering.

Must not own:
- Global header/nav/cart logic.
- Global typography tokens.

Current implementation:
- Uses a handoff-style simplified structure with a dedicated heading row.
- Supports fallbacks from selected `collection` object with explicit custom overrides.
- Carousel is lightweight, scroll-snap based, with progressive enhancement via vanilla JS arrows.
- No separate card snippet; card rendering is local to the section for easier maintenance.
- Keeps local heading row markup (does not use `section-header` snippet) to preserve the approved Lovable carousel composition.

Judgement:
- This is the launch-ready pattern for category merchandising sections; keep it simple and avoid adding styling bloat.

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
- Country selector visibility, style, and local styling.
- Transparent header mode and transparent/sold-after-scroll colour behavior.

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
- Country selector settings.

Current implementation:
- The intended global header settings are in `config/settings_schema.json`.
- `desktop_layout` now exposes only the two build-spec layouts.
- `sections/header.liquid` no longer reads removed section-level header styling settings.
- `sections/header-group.json` has no stale removed header settings from the previous header schema.
- Header code still defensively falls back to Layout A if old saved data contains an unsupported layout value.
- Manual region chip fields were removed. The header now uses Shopify localization for the country selector and renders it only when multiple countries are available.
- Country selector flags were removed from the header. The selector uses uppercase text in the header button and normal-case native options.
- Header responsive split is contract-aligned: desktop header and large-screen logo behavior starts at `>= 990px`, while mobile layout paths remain active through `<= 989px`.

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
- Country selector settings.
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
- Panel style preset.
- Mega panel background, text, border, and shadow.
- Link column heading style.
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
- Drawer footer utility blocks.
- Footer links, country selector block, text rows, and social links.
- Mobile drawer width and drawer-specific colours.

Must not own:
- Desktop header layout.
- Desktop dropdown width.
- Desktop mega panel width.
- Header icon/cart count styling.

Must not be duplicated elsewhere:
- Mobile drawer width.
- Mobile drawer menu picker.
- Mobile drawer footer utility blocks.

Current implementation:
- Putting Mobile Menu in the Header group makes sense. It is part of header navigation behavior even though it is a separate section.
- Mobile menu currently has its own menu picker, while desktop header has `header_menu` and header blocks. This is a deliberate split, but it requires merchant guidance.
- If `drawer_menu` is blank, the implementation falls back to `main-menu` only. Demo menu behavior has been removed.
- Mobile drawer footer utilities are now blocks. This is cleaner than fixed sign-in/wishlist/shipping/Instagram settings because merchants can remove, reorder, and replace rows.
- Mobile drawer country selection uses the same Shopify localization model as the header country selector and only renders when multiple countries are available.

Judgement:
- Keep Mobile Menu in the Header group.
- Do not reintroduce manual shipping/country text as localization. Use the country selector block where market context matters.
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

## Homepage

Owned by `templates/index.json`, `sections/single-image-hero.liquid`, `sections/three-card-hero.liquid`, `assets/section-single-image-hero.css`, and `assets/section-three-card-hero.css`.

Owns:
- Homepage section order.
- Single Image Hero imagery, positioning, and content blocks.
- 3-Card Hero card blocks.
- Hero-only width, height, overlay, border, colour, and spacing settings.

Must not own:
- Global page width tokens.
- Header layout or header spacing.
- Product card architecture.
- Footer/social settings.

Must not be duplicated elsewhere:
- Hero spacing controls should stay in the relevant Hero section, because these sections intentionally need flush-by-default editorial control.
- Single Image Hero text/buttons/custom markup should stay in content blocks, not section-level fixed content settings.
- Single Image Hero image pins should stay in Image pin blocks, not global theme settings.
- 3-Card Hero content should stay in Hero card blocks, not global theme settings.

Current implementation:
- Homepage no longer uses Skeleton Hello World.
- `templates/index.json` uses `single-image-hero` as the first launch-ready homepage section.
- The old combined layout-switch `sections/hero.liquid` has been removed.
- `sections/single-image-hero.liquid` owns overlay-text single image hero content through blocks: Eyebrow, Heading, Paragraph, Button, Two buttons, Custom HTML, Custom Liquid, and Image pin.
- Single Image Hero has separate Section width and Content width controls. Section width owns the overall hero frame; Content width owns the text/button content area inside the hero.
- Single Image Hero separates desktop/mobile content block position from desktop/mobile text alignment and supports desktop/mobile height modes.
- `sections/three-card-hero.liquid` owns the 3-card editorial hero and its card blocks.
- Styles are scoped under `.yaomri-single-hero` and `.yaomri-three-hero`.

Judgement:
- Keep Single Image Hero and 3-Card Hero separate. Shopify does not hide irrelevant settings in a layout-switch section, so separate sections are clearer for merchants.
- Padding defaults to `0` and margin defaults to `0` so hero sections start flush by default.

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
- Homepage no longer uses `hello-world`; it now starts with Single Image Hero.
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
| Homepage | Half-built | Hello World is removed and Single Image Hero is active; remaining homepage launch sections still need to be built. |
| Product page | Not started | Still default Skeleton unless separately changed. |
| Collection page | Not started | Still default Skeleton unless separately changed. |
| Search | Half-built | Basic search page exists; no Ya Omri QA pass. |
| Footer | Half-built | Skeleton default, not brand-ready. |
| Theme editor UX | Needs cleanup | Labels and stale saved settings need tightening. |
| Responsive QA | In progress | Responsive system contract is documented in `THEME_RESPONSIVE_SYSTEM.md`; modern sections are converging on shared width/inset rules. |
| Publish readiness | Not started | No unpublished-theme/editor QA cycle yet. |
