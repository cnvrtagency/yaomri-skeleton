# Ya Omri Theme QA Checklist

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

## Theme Settings

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
- Bottom border can be shown/hidden.
- Shadow presets work: none, subtle, medium, strong.
- Custom shadow controls work only when custom shadow is selected.
- Desktop icon spacing changes desktop action icons only.
- Mobile icon spacing changes mobile action icons only.
- Cart count style changes bubble background, text, size, and offset.
- Country selector renders only when more than one Shopify country is available.
- Country selector submits `country_code` through a Shopify localization form.
- Country selector style, height, and optional colours do not break header actions.
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

## Mega Menu

- Panel width `400px` visibly changes the white mega panel box.
- Panel width `700px` visibly narrows the white mega panel box.
- Panel width `1200px` visibly widens the white mega panel box.
- Panel width `1500px` works and clamps safely on narrower viewports.
- `.yaomri-mega-panels` remains positioning/backdrop only.
- `.yaomri-mega-panel` paints the visible background, border, and shadow.
- `.yaomri-mega-panel__inner` remains width `100%` inside the panel.
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
- No default blue browser links.

## Mobile Menu

- Drawer opens from mobile header menu button.
- Drawer closes with close button.
- Drawer closes by tapping scrim.
- Drawer closes with Escape.
- Drawer closes when a link is tapped.
- Body scroll locks while drawer is open.
- Focus moves into drawer on open.
- Focus returns to trigger on close.
- Root view shows no back arrow.
- Drill view shows Back.
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
- Homepage shell is present.
- Brand strip section is present or intentionally deferred.
- Promo banner section is present or intentionally deferred.
- Fresh hero is present.
- Product carousel is present or replaced by a launch-safe product grid.
- Footer/social layer is present or covered by footer.
- No placeholder/demo text ships.

## Product, Collection, And Search

### Product

- Current status: default Skeleton unless changed.
- Product page must be audited before launch.
- Product media, variant selection, quantity, add to cart, price, and selling-plan display must work.
- No visual mismatch with Ya Omri header/home styling.

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
- Footer is visually aligned with Ya Omri brand.
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

## Publish

- Commit only intentional changes.
- Push to an unpublished Shopify theme first.
- Pull settings safely and inspect diffs.
- Confirm no stale editor settings reappear.
- Run final theme editor QA.
- Run final storefront QA.
- Test header, mega menu, mobile drawer, cart, homepage, product, collection, search, footer.
- Publish only after explicit approval.
