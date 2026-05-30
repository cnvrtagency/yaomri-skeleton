# Ya Omri Responsive Layout System

## Purpose

This document defines the current responsive width, inset and spacing contract across modern sections so sections behave consistently at 1440/1280/1024/768/430/390/360 viewports.

The contract intentionally stays pragmatic: small number of shared layout tokens, section-owned spacing, and predictable desktop/tablet/mobile behavior.

## Breakpoints

- **mobile**: `<= 749px`
- **tablet**: `750px – 989px`
- **desktop**: `>= 990px`
- **large desktop**: `>= 1200px` (and above)

## Global tokens and ownership

Owned by `config/settings_schema.json` + `snippets/css-variables.liquid`:

- `--page-width` from layout `site_width_mode` / `custom_site_content_width`
- `--page-inset` from layout `site_inset` (default `20px`)
- `--page-inset-effective` for core grid sections (`0px` when global page width mode is `full`)

Current behavior:
- Boxed/custom global page width is controlled by `site_width_mode` and `custom_site_content_width`.
- Site-width content uses a consistent global inset through `--page-inset`.
- `--page-mobile-inset` remains as a compatibility alias to `--page-inset`.

## Section structure contract

Modern sections should use:

```html
<section class="section-root ...">
  <div class="section-inner">...</div>
</section>
```

- **Section root** controls full-width strip and section-level external spacing.
- **Section inner** controls width mode and alignment.
- **Section-level paddings/margins** are explicit settings.
- Avoid hidden hardcoded side padding in the inner wrapper unless documented.

## Width modes

For sections with section-level width controls:

- **Full width**
  - `section__inner` is unconstrained (aside from explicit section padding/margins).
  - Use when the section must span the content row.

- **Site width**
  - `section__inner` follows global `--page-width`.
  - Wrapper width is clamped with global inset safety:
    `width: min(var(--page-width), calc(100% - (var(--page-inset) * 2)))`.

- **Custom width**
  - `section__inner` uses section custom width variable.
  - Wrapper width is clamped with global inset safety:
    `width: min(var(--custom-width), calc(100% - (var(--page-inset) * 2)))`.

## Inset behavior

- `site_inset` is a single global setting used across desktop, tablet, and mobile.
- Full-width sections stay edge-to-edge unless section-local padding is set.
- Section padding remains section-owned and additive to section layout, not a replacement for global inset.

## Contract usage by current sections

- **Header**: site/custom width modes consume global inset through width clamps; full mode stays edge-to-edge.
- **Single Image Hero**: content width and section width are now controlled through section variables (`section_width`, `content_width`, and side padding settings).
- **Collection Cards**: width modes and container constraints consume global inset through `.cc-carousel__inner`.
- **Announcement Bar**: standalone section above Header in `sections/header-group.json`; site/custom width modes consume global inset through its own inner wrapper.

## Transparent header + announcement interaction

- Announcement and Header remain separate sections, but are coordinated as one stack through shared state on the common header-group wrapper.
- The shared wrapper is the owner for hide/show control and uses `[data-yaomri-header-group]`, with the fallback `.shopify-section-group-header-group`.
- In normal flow and transparent+sticky flow, the stack keeps announcement and header locked together by mutating wrapper classes only (`is-hidden-after-scroll`, `yaomri-header-stack--fade`, `yaomri-header-stack--slide`, `yaomri-header-stack--fade-slide`).
- `is-hidden-after-scroll` removes pointer events and animates opacity/transform so announcement/header do not overlap and no invisible tap blocker remains.
- In normal flow and sticky-overlay flow, the shared stack animates with opacity/transform only (no shared max-height collapse).
- Desktop/tablet and mobile use different thresholds for hide behavior:
  - Desktop/tablet: `header_stack_scroll_threshold`
  - Mobile (`<= 749px`): `header_stack_scroll_threshold_mobile`
- In fade-away mode, solid-after-scroll styles are suppressed during hide/hidden so the stack leaves from its current transparent/top state.

## Section-level width/inset checklist

Before launch, each responsive-ready section should verify:

- No hidden inner padding that defeats explicit settings.
- Width mode visibly matches Full / Site / Custom.
- Shared insets do not create unexpected full-bleed behavior.
- No horizontal overflow at 360–430 viewport.
- Heading/controls remain legible at mobile/tablet boundaries.
- No fixed-width assumptions that force overflow.

## QA targets by viewport

- 1440px desktop
- 1280px desktop
- 1024px tablet/desktop boundary
- 768px tablet
- 430px mobile
- 390px mobile
- 360px small mobile

Checks should cover:
- no horizontal overflow
- header alignment and action stability
- hero width alignment + readable content block
- announcement/bar stacking behavior
- collection cards width/inset and carousel/grid behavior
- mobile drawer usability
