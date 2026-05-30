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
- `--page-mobile-inset` from layout `mobile_site_inset` (default `16px`)

Current behavior:
- Boxed/custom global page width is controlled by `site_width_mode` and `custom_site_content_width`.
- Mobile site-width sections can apply a consistent side breathing room through `--page-mobile-inset`.

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
  - On mobile, section can combine `--page-mobile-inset` with section-side padding for breathing room.

- **Custom width**
  - `section__inner` uses section custom width variable.
  - Still clamped by viewport, and should be safe on narrow screens.

## Mobile inset behavior

- `mobile_site_inset` is the global baseline inset for site-width sections on mobile.
- Section mobile left/right padding is **additive** where supported.
- Full-width sections remain edge-to-edge unless their own section padding is set.

## Contract usage by current sections

- **Header**: uses its own internal safe mobile/header-specific spacing, and does not import global inset unless explicitly designed.
- **Single Image Hero**: content width and section width are now controlled through section variables (`section_width`, `content_width`, and side padding settings).
- **Collection Cards**: width modes and container constraints are section-owned and should remain aligned via shared `.cc-carousel__inner` width routing.
- **Announcement Bar**: width mode remains section-owned (full/site/custom). It is positioned in normal flow above header.

## Transparent header + announcement interaction

- Announcement bar stays normal-flow above header when enabled.
- Header transparent offset (home) is calculated from announcement heights when required.
- When not transparent (or scrolled solid state), header uses solid zero-offset behavior per header implementation.

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
