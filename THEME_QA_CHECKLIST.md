# CNVRT Theme QA Checklist

Use this before publishing and after any architecture-level change. Passing automated checks is required but not enough.

## Global

- Run `git diff --check`.
- Run `shopify theme check`.
- Parse `config/settings_schema.json`.
- Parse every edited section schema.
- Parse `sections/header-group.json` and `sections/footer-group.json`.
- Parse edited templates, especially `templates/index.json` and `templates/cart.json`.
- Open the theme editor with no warnings.
- Check browser console for errors on home, collection, product, cart, search, and page templates.
- Confirm no horizontal overflow at all target breakpoints.
- Confirm no broken section group JSON.
- Confirm no stale settings after pulling editor saves.
- Confirm no old Dawn repo edits.
- Confirm no settings were added without registry updates.
- Confirm no invalid URL defaults.
- Confirm CNVRT-first runtime hooks still work with legacy compatibility aliases enabled.
- Confirm skip-link target and layout landmarks are present (`Skip to content`, `MainContent`, landmark roles).

## Theme Settings

### Typography

- Typography settings group is present and organised under Theme settings > Typography.
- Body/Heading/Button/Accent font pickers render selected families.
- Body font size desktop/mobile updates global body text scale.
- Body line-height and body weight apply globally.
- Heading base weight and line-height apply to heading elements where section-local overrides are not set.
- Button weight and letter spacing apply to native button elements and section button controls without local override.
- Eyebrow weight and letter spacing apply to accent/eyebrow typography fallback layer.
- Single Image Hero paragraph `text_weight` values output correctly for all options:
  - 300 Light
  - 400 Regular
  - 500 Medium
  - 600 Semibold
  - 700 Bold
  - 800 Extra bold
- Single Image Hero rich text paragraphs inherit the selected paragraph weight (`.cnvrt-single-hero__text`, `.cnvrt-single-hero__text p`).
- If selected font lacks a specific weight (for example 300), CSS still outputs that weight and browser fallback behavior is acceptable.

### Brand

- Desktop logo renders when `logo` is set.
- Mobile logo renders when `mobile_logo` is set.
- Mobile logo falls back to desktop logo when blank.
- Desktop logo width visibly changes desktop logo only.
- Mobile logo width visibly changes mobile logo only.
- Header remains aligned with long shop name fallback.

### Layout

- `boxed` page width constrains normal sections.
- `full` page width allows normal sections to span full width.
- `custom` page width uses `custom_site_content_width`.
- `site_inset` updates `--page-inset`.
- Site-width wrappers apply `--page-inset` at desktop, tablet, and mobile.
- Full-width wrappers remain edge-to-edge unless section-local padding is set.
- Custom page width does not control header width.
- Custom page width does not control mega panel width.
- Custom page width does not control mobile drawer width.

### Colours

- Page background changes visible page background.
- Text colour changes default text.
- Soft background changes supported subtle surfaces and hover states.
- Muted text changes supported secondary text.
- Border colour changes supported borders.
- Input corner radius changes native/form input radius.
- Header colour settings remain header-owned and do not unexpectedly change page colour.

### Header Settings

- Header content width: site, full, and custom modes.
- Custom header width only affects custom mode.
- Desktop and mobile header heights visibly change their respective headers.
- Sticky header works and does not cover content unexpectedly.
- Transparent header mode Off keeps normal header behavior.
- Transparent header mode Homepage only applies on the homepage (`request.page_type = index`) only.
- Transparent header mode All pages applies on all page types.
- Transparent header overlays the first section without pushing page content down.
- Header stack scroll behavior defaults to Always visible.
- Header stack behaviour can be switched to Fade away after scroll.
- Fade-away threshold (desktop/tablet) accepts 0–200px and defaults to 40.
- Fade-away threshold (mobile) accepts 0–200px and defaults to 24.
- Desktop/tablet uses the desktop threshold; mobile (`<= 749px`) uses the mobile threshold.
- Header layout/markup switches at contract breakpoints (`>= 990` desktop, `<= 989` mobile) for responsive header mode and desktop/mobile logo image selection.
- Header stack transition options work: Fade, Slide, Fade + Slide.
- Header stack transition duration controls both hide and reappear timing.
- Header stack transition easing controls hide/show feel (Smooth/Snappy/Linear/Ease).
- Scroll down past threshold hides both announcement + header together.
- Scroll back to top shows the shared stack again with no jump.
- Header runtime classes/selectors are CNVRT-first (`cnvrt-header*`, `cnvrt-header-stack*`) and still preserve expected behavior.
- Mega menu runtime classes/selectors are CNVRT-first (`cnvrt-mega*`) and still preserve expected behavior.
- In fade-away mode, solid-after-scroll styles are suppressed while hiding/hidden so there is no white/solid flash.
- Transparent logo and transparent mobile logo swap correctly in transparent state and fall back correctly when blank.
- Transparent header colour scheme Light/Dark/Custom resolves expected icon/link/logo visibility.
- Transparent header background opacity applies only in transparent state.
- Transparent state suppresses normal border/shadow and uses transparent border colour when configured.
- Use solid header after scroll toggles to solid state after a small scroll threshold.
- Solid/scrolled state restores normal border/shadow behavior and uses solid-after-scroll colours.
- Mobile drawer still opens and stays tappable when stack is hidden (`pointer-events: none` only when hidden).
- Mega menu/dropdown does not hide while open during scroll interaction.
- Bottom border can be shown/hidden.
- Shadow presets work: none, subtle, medium, strong.
- Custom shadow controls work only when custom shadow is selected.
- Desktop icon spacing changes desktop action icons only.
- Mobile icon spacing changes mobile action icons only.
- Cart count style changes bubble background, text, size, and offset.
- Country selector renders only when more than one Shopify country is available.
- Country selector submits `country_code` through a Shopify localization form.
- Country selector visibly shows country code/name, not a visible "Country/region" label.
- No flags render in the header country selector.
- AE displays as `AE` in compact mode or `UNITED ARAB EMIRATES` in full mode.
- Full mode is the default and the styled header button is uppercase.
- Native dropdown option labels render in normal case, for example `Canada`, not `CANADA`.
- Compact mode renders stable ISO code, for example `CA`.
- When `Show currency code` is enabled, currency uses Shopify localization data and does not render a broken trailing slash when currency data is unavailable.
- Selector country list comes from Shopify `localization.available_countries`; the theme does not hardcode or limit the list.
- Country selector style, height, and optional colours do not break header actions.
- Transparent header mobile layout remains stable (menu, logo, search/wishlist/cart) and readable.
- In transparent header mode, the country selector returns to solid-state contrast tokens once `.is-scrolled` is active.
- Desktop action order is country selector, search, account, wishlist, cart.
- Manual region/shipping labels are not present in Header settings.
- Account icon respects Shopify customer-account availability.
- Wishlist icon uses the configured or fallback URL.

## Header Navigation

- Simple link renders as a top-level desktop nav item.
- Simple link URL works.
- Dropdown link renders as a top-level desktop nav item.
- Dropdown menu renders only when a menu is selected and has links.
- Dropdown position works: start, centre, end.
- Dropdown width controls the visible dropdown box.
- Mega menu link renders as a top-level desktop nav item.
- Mega menu link opens the matching Mega Menu panel ID.
- Missing Mega panel ID fails gracefully and still allows a fallback link path where appropriate.
- Highlight item changes only that nav item.
- Highlight colour picker does not create automatic sale colour behavior.
- Badge text displays only when set.
- Badge colour controls the badge, not the whole nav link.
- No default blue browser links appear in header, dropdowns, or mega panels.
- Desktop fallback menu appears only when no Header navigation blocks exist.
- The merchant workflow is documented: Header blocks own curated desktop nav.

## Announcement Bar

- Announcement bar is a standalone section in `sections/header-group.json` above Header.
- `Skip to content` focuses `MainContent` when present.
- Static mode renders the first non-empty announcement item.
- Carousel mode rotates announcements one at a time.
- Carousel mode is always centre-aligned.
- Carousel autoplay pauses on hover and focus.
- Carousel arrows appear only when enabled.
- Carousel dots appear only when enabled.
- Marquee mode scrolls continuously without visible gaps.
- Marquee pause on hover works when enabled.
- Marquee respects `prefers-reduced-motion`.
- Announcement runtime markup/CSS/JS selectors are CNVRT-first.
- Announcement `--cnvrt-announcement-*` variable fallbacks remain intentionally as compatibility aliases.
- Announcement links are keyboard accessible.
- Announcement control buttons expose clear accessible names.
- Announcement item with no link renders plain text.
- Empty announcement blocks are not rendered.
- Hide on mobile works per block.
- Hide on desktop works per block.
- Desktop/mobile typography settings apply.
- Announcement bar works with Full/Site/Custom bar width modes.
- Announcement shows above the main header in the shared header-group stack and does not overlap header controls.
- Shared header-stack class/state is attached to the common header-group wrapper, not the header section wrapper alone.
- Disabling announcement leaves no residual vertical gap.
- Transparent/sticky/solid-after-scroll stack states have no top gap, overlap, or flicker.

## Mega Menu

- Mega runtime classes/selectors are CNVRT (`cnvrt-mega*`); `--cnvrt-mega-*` variable fallbacks remain as compatibility aliases.
- Panel width `400px` visibly changes the white mega panel box.
- Panel width `700px` visibly narrows the white mega panel box.
- Panel width `1200px` visibly widens the white mega panel box.
- Panel width `1500px` works and clamps safely on narrower viewports.
- `.cnvrt-mega-panels` remains positioning/backdrop only.
- `.cnvrt-mega-panel` paints the visible background, border, and shadow.
- `.cnvrt-mega-panel__inner` remains width `100%` inside the panel.
- Panel background/text/border/shadow settings affect the visible panel.
- Panel style presets do not break 25/50/100 column layout.
- Simple link behavior is unaffected by mega scripts.
- Dropdown link behavior is unaffected by mega panel width.
- Mega link opens and closes on hover/focus.
- Panel ID connection works.
- Missing panel ID fails gracefully.
- Link column width `25` allows four columns in one row.
- Link column width `50` allows two columns in one row.
- Link column width `100` takes a full row.
- Image tile renders with image, label, title, CTA, and link.
- Flexible layout on packs mixed-width blocks as intended.
- Flexible layout off uses row layout as intended.
- Escape closes the mega menu.
- Click outside closes the mega menu.
- Hover leave closes after the configured delay.
- Clicking a mega menu link closes the menu.
- No mobile interference below the desktop breakpoint.
- Mega menu and dropdown panels remain readable when triggered from transparent header state.
- Theme editor preview remains stable when sections reload with transparent header mode enabled.
- No default blue browser links.

## Mobile Menu

- Mobile drawer runtime markup/CSS/JS selectors are CNVRT-first (`cnvrt-drawer*`).
- Drawer opens from mobile header menu button.
- Mobile drawer trigger reflects open/closed state through `aria-expanded`.
- Drawer closes with close button.
- Drawer closes by tapping scrim.
- Drawer closes with Escape.
- Drawer closes when a link is tapped.
- Body scroll locks while drawer is open.
- Focus moves into drawer on open.
- Focus returns to trigger on close.
- Root view shows no back arrow.
- Drill view shows Back.
- Drill buttons expose `aria-expanded` and `aria-controls` on open/close.
- Back returns to root or prior drill view.
- Root title displays drawer title when set.
- Blank drawer title removes title text and does not reserve unnecessary centre title space.
- Drill title displays selected menu item when a title node exists.
- Search field appears when enabled.
- Search submits to Shopify search.
- Footer block area hides when disabled.
- Footer link blocks render only when they have usable links.
- Account footer link appears only when customer accounts are enabled.
- Country selector block renders only when more than one Shopify country is available.
- Text row blocks render only when label or text is set.
- Social link blocks render only when label and link are set.
- Mobile drawer width affects the visible drawer only.
- Mobile drawer colours affect drawer only.
- No duplicate drawer exists in DOM.
- No demo mobile navigation appears when the drawer menu is blank.

## Cart

- Cart runtime markup/CSS/JS selectors are CNVRT-first (`cnvrt-cart*`).
- Collection Cards runtime markup/CSS/JS selectors are CNVRT-first (`cnvrt-collection-*`).
- Footer runtime markup/CSS selectors are CNVRT-first (`cnvrt-footer*`).
- Empty state renders heading, body text, icon, and continue shopping link.
- Item state renders item image, title, options, price, quantity, remove link, line total, and summary.
- Quantity input recalculates visible line totals and subtotal.
- Update cart submits actual quantity changes to Shopify.
- Remove link removes the line item.
- Checkout button submits to checkout.
- Live price display matches Shopify money format.
- Discounts display when present.
- Cart page fallback works if cart drawer is unavailable.
- Cart page is documented as fallback-only until drawer is built.
- Static shipping message does not imply dynamic free-shipping progress unless dynamic logic is built.

## Homepage

- `templates/index.json` no longer uses Skeleton Hello World before launch.
- `templates/index.json` uses `single-image-hero`, not the old combined `hero` section.
- Single Image Hero appears in the theme editor.
- 3-Card Hero appears in the theme editor.
- 3-Card Hero runtime classes/selectors are CNVRT-first (`cnvrt-three-hero*`); `--cnvrt-three-hero-*` variable fallbacks remain compatibility aliases.
- Single Image Hero renders on desktop and mobile.
- Single Image Hero mobile image overrides desktop image when provided.
- Single Image Hero buttons render only when labels and links are set.
- Single Image Hero overlay colour and opacity affect readability.
- Single Image Hero outer border renders only when enabled.
- Single Image Hero border colour changes the visible outer border.
- Single Image Hero desktop height mode works: Adapt to image and Custom height.
- Single Image Hero mobile height mode works: Adapt to image and Custom height.
- Single Image Hero custom height sliders only affect their matching Custom height modes.
- Single Image Hero desktop content horizontal position moves the content block left, centre, and right.
- Single Image Hero desktop content vertical position moves the content block top, centre, and bottom.
- Single Image Hero mobile content horizontal position overrides desktop on mobile.
- Single Image Hero mobile content vertical position overrides desktop on mobile.
- Single Image Hero desktop/mobile text alignment changes text/buttons inside the content block.
- Single Image Hero runtime markup/CSS selectors are CNVRT-first (`cnvrt-single-hero*`).
- Single Image Hero `--cnvrt-single-hero-*` variable fallbacks remain compatibility aliases.
- Single Image Hero desktop text alignment does not change content-area placement.
- Single Image Hero mobile text alignment does not change content-area placement.
- Single Image Hero desktop horizontal position remains effective when text alignment changes.
- Single Image Hero mobile horizontal position remains effective when text alignment changes.
- Single Image Hero with Content width = Custom and Custom content width = `680px` visibly moves the content area for Left/Centre/Right positions.
- Single Image Hero heading/paragraph/eyebrow blocks follow the same content-area placement and do not drift independently.
- Single Image Hero Eyebrow typography controls (desktop/mobile font size, weight, letter spacing, uppercase) apply.
- Single Image Hero Eyebrow line-height control applies.
- Single Image Hero Eyebrow max width control applies.
- Single Image Hero content width works: Narrow, Medium, Wide, Site width, Full width, Custom width.
- Single Image Hero content width defaults to Medium (`680px`) and makes Left/Centre/Right positioning visually clear.
- Single Image Hero Site width content mode is intentionally very wide; horizontal movement can appear subtle in this mode.
- Single Image Hero content width is controlled by Content width and is constrained in Site-width mode.
- Single Image Hero Eyebrow block renders and hides when blank.
- Single Image Hero Heading block renders H1/H2, desktop/mobile font size, line height, font weight, max width, and hides when blank.
- Single Image Hero Heading text transform control applies.
- Single Image Hero Paragraph block renders rich text, desktop/mobile font size, line height, font weight, max width, and hides when blank.
- Single Image Hero Paragraph block offers Light/300 and Extra bold/800 weight options in addition to existing weights.
- Single Image Hero Paragraph letter spacing control applies.
- Single Image Hero generic Text block is not active in homepage JSON.
- Single Image Hero Button block renders only when label and link are set.
- Single Image Hero Two buttons block renders only valid buttons and never empty wrappers.
- Single Image Hero button typography controls (size, weight, letter spacing, text transform) apply for Button and Two buttons blocks.
- Single Image Hero Custom HTML block renders inside the content stack.
- Single Image Hero Custom Liquid block renders inside the content stack.
- Single Image Hero Image pin positions correctly on desktop and mobile.
- Single Image Hero Image pin can hide on mobile.
- Single Image Hero empty blocks do not render empty markup.
- Single Image Hero width modes work: Site width, Full width, Custom.

## Reusable Section Header Pattern

- The section-header reusable system is deferred and currently not rendered by active sections.
- `snippets/section-header.liquid` and `assets/section-header.css` were removed from active runtime ownership.
- QA for this pattern is deferred until it is migrated back into production sections.
- Keep future checks for:
  - section-level setting overrides
  - preset/decorative behavior
  - width/alignment class behavior
  - CTA and empty-state rendering
  - colour inheritance
  - but block this section in current QA passes until reintroduction.

## Collection Cards

- Collection Cards section appears in Theme Editor.
- Collection Cards runtime classes/selectors are CNVRT-first; `--cnvrt-collection-*` variable fallbacks remain compatibility aliases.
- Heading and optional heading subtitle render correctly in the section header row.
- Heading/subtitle/arrows align on one clean row on desktop.
- Mobile heading layout stacks cleanly and arrows do not crowd heading text.
- Section width modes (Full/Site/Custom) visibly change the shared heading/cards container width.
- Site width mode in Collection Cards resolves to `var(--page-width)` and does not silently fall back to full width.
- Cards visible desktop setting works in carousel mode (3/4/5/6).
- Cards visible tablet setting works in carousel mode (2/3/4).
- Cards visible mobile setting works in carousel mode (1/1.2/1.5/2).
- Grid mode is unaffected by carousel visible-card controls.
- Site and Custom width modes apply global inset safety on Collection Cards inner wrapper (`calc(100% - (2 * --page-inset))` clamp).
- Full width mode can remain edge-to-edge on mobile when section mobile side padding is 0.
- No hidden hardcoded inner padding is reintroduced for Collection Cards mobile inset.
- Grid mode renders the same card design in responsive columns.
- Carousel mode renders horizontal scroll-snap cards.
- Switching between Carousel and Grid does not cause awkward top-spacing/width jumps.
- Carousel arrows move the track by about 80% of the track width.
- Carousel works after Theme Editor section reload.
- Selected collection fallback works: title, image, link from collection object.
- Collection image displays when present on the selected collection.
- First product image fallback displays when collection image is missing and fallback setting is enabled.
- Custom title/image/link overrides take priority over collection defaults.
- Product count line renders when enabled and falls back to subtitle override when count is hidden or unavailable.
- Empty block cards are not rendered on storefront.
- In Theme Editor, placeholder cards render for empty configured blocks so layout does not collapse during setup.
- In Theme Editor, if no usable blocks exist, four clean placeholder cards render.
- Placeholder cards use a light overlay style (no heavy dark blur).
- Card ratio modes work: 4:5, 1:1, 4:3, 16:9.
- Gap desktop and gap mobile allow `0` and visually remove card spacing.
- Cards with no resolved link render as non-clickable articles, not fake `#` links.
- No nested/broken links are rendered.
- Image position setting affects image crop focus.
- Image hover mode supports none and subtle zoom.
- Card title typography controls apply (desktop/mobile size, weight, line-height, letter-spacing, transform, colour).
- Card meta typography controls apply (desktop/mobile size, weight, line-height, letter-spacing, transform, colour).
- Badge text renders only when set.
- Badge placement options position correctly at top/bottom and left/right.
- Badge colour, font size, and text transform controls apply.
- Border top and border colour render correctly.
- Desktop/mobile padding and margin defaults remain 0.
- No default browser-blue link styling appears.
- 3-Card Hero renders one, two, or three cards cleanly.
- 3-Card Hero no-block placeholder state is polished and not clickable.
- 3-Card Hero cards are equal height on desktop.
- 3-Card Hero cards stack cleanly on mobile.
- 3-Card Hero card mobile image overrides desktop image when provided.
- 3-Card Hero card link label renders only when label and link are set.
- 3-Card Hero shared overlay colour and opacity affect card readability.
- Both Hero custom section width controls apply only in Custom mode.
- Both Hero padding and margin controls default to `0`.
- Both Hero desktop padding/margin controls apply on desktop.
- Both Hero mobile padding/margin controls override desktop spacing on mobile.
- Both Hero empty/placeholder states are clean and have no broken links.
- Both Hero sections keep text as accessible HTML, not image-only copy.
- Brand strip section is present or intentionally deferred.
- Promo banner section is present or intentionally deferred.
- Product carousel is present or replaced by a launch-safe product grid.
- Footer/social layer is present or covered by footer.
- No placeholder/demo text ships.

## Product, Collection, And Search

### Product

- Current status: default Skeleton unless changed.
- Product page must be audited before launch.
- Product media, variant selection, quantity, add to cart, price, and selling-plan display must work.
- No visual mismatch with CNVRT header/home styling.

### Collection

- Current status: default Skeleton unless changed.
- Collection grid must be audited before launch.
- Product cards, empty collection, pagination/sorting/filtering status must be known.
- No horizontal overflow.

### Search

- Current status: basic Skeleton search unless changed.
- Search form works from header and mobile drawer.
- Empty search results state works.
- Product results display acceptably.
- No predictive search is expected before launch.

## Footer

- Footer menu renders selected links.
- Payment icons render only when enabled.
- Footer is visually aligned with CNVRT brand.
- Footer is responsive.
- Footer does not rely on untranslated labels in the merchant editor.
- Footer does not duplicate mobile drawer social settings unless documented.

## Responsive Viewports

Test all major pages at:
- 1440px desktop.
- 1280px desktop.
- 1024px tablet/desktop boundary.
- 768px tablet.
- 430px mobile.
- 390px mobile.
- 360px small mobile.

For each:
- No horizontal overflow.
- Header does not overlap itself.
- Mobile header keeps menu and cart visible.
- Wishlist may hide on tiny screens.
- Mega menu does not show on mobile.
- Mobile drawer width clamps correctly.
- Cart page remains usable.
- Footer does not overflow.
- Modern sections follow width/inset contract from `THEME_RESPONSIVE_SYSTEM.md`.
- Site-width sections do not appear edge-to-edge unless intended by mode and section/mobile padding.
- Single Image Hero content block aligns to the active content width mode without hardcoded extra inset.
- Collection Cards align heading row and track within active section width mode.

## Publish

- Commit only intentional changes.
- Push to an unpublished Shopify theme first.
- Pull settings safely and inspect diffs.
- Confirm no stale editor settings reappear.
- Run final theme editor QA.
- Run final storefront QA.
- Test header, mega menu, mobile drawer, cart, homepage, product, collection, search, footer.
- Publish only after explicit approval.
