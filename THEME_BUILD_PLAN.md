# Ya Omri 7-Day Launch Build Plan

Goal: get a clean, launchable Skeleton-based Ya Omri theme live in one week without adding avoidable complexity.

Do not build speculative storefront features before the launch-critical surfaces are stable.

## Launch Readiness Score

| Area | Status | Why |
|---|---|---|
| Global settings | Needs cleanup | Useful base; major stale width/social fallbacks are now removed. |
| Header | Needs cleanup | Spec conflict is fixed; visual QA still needs to pass. |
| Desktop mega menu | Needs cleanup | Visible width ownership is fixed, but panel ID workflow is fragile. |
| Mobile menu | Needs cleanup | Drawer is built and demo fallback is removed; full visual QA still needed. |
| Cart page fallback | Half-built | Usable page fallback, but it is not positioned clearly as fallback-only. |
| Cart drawer | Not started | Required for a polished launch if cart drawer is in scope. |
| Homepage | Half-built | Hello World has been replaced with a block-based Single Image Hero; 3-Card Hero is available, but remaining homepage sections are still needed. |
| Product page | Not started | Still default Skeleton unless separately changed. |
| Collection page | Not started | Still default Skeleton unless separately changed. |
| Search | Half-built | Basic search exists; no Ya Omri QA pass. |
| Footer | Half-built | Skeleton default, not brand-ready. |
| Theme editor UX | Needs cleanup | Labels, duplicate/stale settings, and merchant workflow need tightening. |
| Responsive QA | In progress | Responsive width/inset system now documented (`THEME_RESPONSIVE_SYSTEM.md`); launch pass still required by viewport matrix. |
| Publish readiness | Not started | Needs unpublished theme push, editor setup, and final QA. |

Naming migration status:
- CNVRT namespace aliases are rolled out across Announcement, Collection Cards, Single Image Hero, Header/Header Stack, Mega Menu, Mobile Drawer, Cart, Footer, and 3-Card Hero.
- Runtime hooks are now CNVRT-first with legacy fallback support.
- Legacy alias removal is deferred until a dedicated regression pass.

## Day 1: Settings And Navigation Control Layer

Objective:
- Clean up settings/editor ownership before any more storefront features.

Tasks:
- Done: remove unsupported `desktop_layout` option `logo_center_icons_right_nav_below`.
- Done: remove legacy header layout mapping for search-field layouts.
- Done: remove stale Header section fallbacks from `sections/header.liquid`.
- Done: confirm `sections/header-group.json` has no known stale removed Header keys.
- Done: restore standalone `announcement-bar` section in `sections/header-group.json` (above Header) and remove failed announcement-in-Header merge.
- Done: remove `settings.site_content_width` fallback from `snippets/css-variables.liquid`.
- Done: remove `settings.social_instagram_link` fallback from the mobile drawer.
- Finalize navigation source rules:
  - Header blocks own curated desktop nav.
  - Header fallback menu is only fallback.
  - Mobile Menu owns mobile drawer nav.
  - Mega Menu owns mega content only.

Success looks like:
- Registry matches schema.
- No stale setting references.
- Header has exactly two desktop layout options.
- Merchant workflow is explainable in one paragraph.

Do not get distracted by:
- Homepage design.
- Cart drawer.
- Product cards.
- New animation settings.

## Day 2: Header, Mega Menu, Mobile Drawer QA

Objective:
- Finish navigation surfaces and fix only remaining nav bugs.

Tasks:
- Run the full Header, Mega Menu, and Mobile Menu QA checklist.
- Verify width behavior for header, dropdown, mega panel, and mobile drawer.
- Validate transparent header modes (Off, Homepage only, All pages) and scroll-to-solid behavior.
- Done: remove demo mobile drawer fallback.
- Improve merchant labels for Header blocks and Mega Menu IDs.
- Confirm no default browser-blue links.
- Confirm no mobile interference from desktop mega menu.

Success looks like:
- Header is visually stable at 1440, 1280, 1024, 768, 430, 390, 360.
- Mega menu opens/closes reliably.
- Mobile drawer opens, drills, backs, closes, and locks body scroll.
- Merchant cannot accidentally ship fake/demo nav.

Do not get distracted by:
- Building predictive search.
- Building localization.
- Building wishlist storage.

## Day 3: Cart Drawer And Cart Page Fallback

Objective:
- Add the launch cart experience while keeping the cart page as fallback.

Tasks:
- Build cart drawer only if the launch requires drawer UX.
- Keep `/cart` page working as fallback.
- Reuse cart item rendering carefully or create a small cart item snippet.
- Ensure header cart icon opens drawer only if drawer exists; otherwise it links to `/cart`.
- Confirm cart drawer update/remove/checkout behavior against Shopify cart endpoints.
- Rename cart page labels to make static shipping message honest.

Success looks like:
- Cart drawer works without breaking cart page.
- Cart page remains usable with JavaScript disabled or drawer failure.
- Header cart behavior is predictable.

Do not get distracted by:
- Upsells.
- Free-shipping progress logic unless explicitly required.
- Gift notes.
- Discount code entry.

## Day 4: Replace Hello World And Build Homepage Shell

Objective:
- Make the storefront first impression launchable.

Tasks:
- Done: replace `templates/index.json` Hello World.
- Done: split the old combined Hero into Single Image Hero and 3-Card Hero so merchants do not see irrelevant layout settings.
- Done: make Single Image Hero content block-based with separate Eyebrow, Heading, Paragraph, buttons, custom markup, and image pins.
- Done: integrate Announcement Bar into the Header section with Static/Carousel/Marquee modes (single header system ownership).
- Deferred: `section-header` snippet/CSS pattern remains out-of-scope for active rollout while we ship with local heading ownership in Collection Cards.
- Deferred: global Theme settings > Section headers defaults are documented for future use; no active section currently consumes them.
- Done: add `Collection cards` section with Grid/Carousel modes and a simplified premium heading row.
- Add core launch sections in this order:
  1. Brand strip.
  2. Promo banner.
  3. Product carousel or launch-safe product grid.
  4. Footer/social layer if not already handled by footer.
- Avoid demo copy and fake links.

Success looks like:
- Home page no longer looks like Skeleton.
- Merchants can configure basic homepage content without confusing controls.
- No global architecture churn.

Do not get distracted by:
- Complex editorial CMS.
- Excessive animation.
- Too many colour controls.
- Alternate homepage templates.

## Day 5: Product And Collection Foundations

Objective:
- Make shopping paths usable enough to launch.

Tasks:
- Audit current product template.
- Ensure media, title, price, variants, quantity, add-to-cart, and basic product info work.
- Audit current collection template.
- Ensure product grid, product cards, pagination, and empty states work.
- Use global tokens and Ya Omri visual language.

Success looks like:
- A customer can browse a collection, open a product, choose a variant, add to cart, and checkout.
- No obvious Skeleton default styling remains on core commerce paths.

Do not get distracted by:
- Complex filters unless already present and stable.
- Product recommendations.
- Size guide modals.
- Reviews.

## Day 6: Footer, Search, Responsive Polish, Editor Cleanup

Objective:
- Close brand and usability gaps.

Tasks:
- Keep responsive layout contract centralized (`--page-width` + global `site_inset`) and avoid per-section hidden side padding hacks.
- Replace default footer presentation with Ya Omri styling.
- Rename footer labels away from translation keys if needed.
- Audit search template and search routes from header/mobile drawer.
- Finish responsive QA across all target widths.
- Confirm theme editor sections are understandable.
- Update merchant notes for navigation, country selector, wishlist placeholder, mobile footer blocks, and cart behavior.

Success looks like:
- Search works.
- Footer is brand-ready.
- Theme editor does not expose confusing technical controls.
- Responsive QA issues are fixed or explicitly deferred.

Do not get distracted by:
- Predictive search.
- Blog styling.
- Advanced social feed embeds.

## Day 7: Final QA, Unpublished Push, Editor Setup, Publish Readiness

Objective:
- Get to publish decision with evidence.

Tasks:
- Run `git diff --check`.
- Run `shopify theme check`.
- Parse all edited schemas/JSON.
- Push to unpublished Shopify theme.
- Configure editor content.
- Pull settings and inspect diffs.
- Run final storefront QA.
- Run final theme editor QA.
- Prepare publish notes and rollback plan.

Success looks like:
- No automated check failures.
- No console errors.
- No horizontal overflow.
- Header/mobile/cart/home/product/collection/search/footer pass QA.
- Merchant has clear setup notes.
- Publish happens only after approval.

Do not get distracted by:
- Extra sections.
- Optional settings.
- Post-launch merchandising ideas.

## What Not To Build Before Launch

- Predictive search.
- Real localization/market switching.
- Wishlist storage or customer metafields.
- Advanced mega menu animation controls.
- Multiple header variants beyond the two approved layouts.
- More colour settings without token ownership.
- Blog/article polish unless content launch requires it.
- Reviews, size guides, upsells, gift notes, or loyalty widgets.
- Advanced filtering unless current collection UX depends on it.

## Can Be Deferred

- Logo max-height and vertical offset settings.
- Header custom shadow controls if presets are enough.
- Mega menu close delay setting.
- Global social settings group.
- Flag emoji enhancement for the country selector.
- Dynamic free-shipping progress.
- Product recommendations.
- Predictive search.
- Advanced footer/social layer.
- Reusable/sellable theme documentation beyond launch notes.

## Must Be Tested Before Publish

- Theme editor opens without warnings.
- Header has exactly supported desktop layouts.
- Header blocks, fallback menu, and mobile drawer menu behavior are understood.
- Mega panel width changes the visible panel box.
- Dropdown width changes the visible dropdown box.
- Mobile drawer has no fake/demo menu links.
- Cart path works from header icon through checkout.
- Homepage is not Hello World and does not use the old combined `hero` section.
- Product path works from collection to add-to-cart.
- Search form works from header and mobile drawer.
- No horizontal overflow at target widths.
- No console errors.
- No stale settings reappear after pulling editor saves.

## Merchant Documentation Required For Launch

- How to set Logo and Mobile logo.
- Difference between Page width, Header content width, Mega panel width, Dropdown width, and Mobile drawer width.
- How desktop navigation is built with Header blocks.
- How mobile navigation is controlled by Mobile Menu.
- How Mega panel IDs connect Header mega links to Mega Menu panels.
- How the Shopify country selector works and when it appears.
- How Mobile Menu footer blocks are configured.
- Wishlist is a placeholder link.
- Cart page is fallback; cart drawer status must be stated.
- How to update footer links and payment icons.

## Required Later For Sellable/Reusable Theme Quality

- Remove all stale compatibility paths.
- Replace ID-based mega panel matching with a safer merchant workflow if possible.
- Create a formal token map for global, header, drawer, cart, footer, and section colours.
- Move footer CSS out of inline section CSS if the pattern grows.
- Add robust product card and product form architecture.
- Add editor-facing help text to every non-obvious setting.
- Build a component/snippet inventory.
- Build fixture content for QA without demo fallbacks in production.
- Add regression screenshots for header, mega, drawer, cart, home, product, and collection.

## Top 10 Cleanup Actions

1. Run full visual QA for the cleaned two-layout header.
2. Document the desktop/mobile navigation workflow for merchants.
3. Replace ID-based mega matching later if Shopify schema allows a safer workflow.
4. Decide whether `Hover close delay` should stay exposed.
5. Rename cart static shipping labels so they do not imply dynamic logic.
6. Mark cart page as fallback-only in settings/help documentation.
7. Replace Skeleton footer labels and styling.
8. Done: replace homepage Hello World with Single Image Hero and add a separate 3-Card Hero section.
9. Audit product page.
10. Audit collection page.

## Top 10 Launch Blockers

1. Homepage still needs remaining launch sections after Hero.
2. Product page not audited.
3. Collection page not audited.
4. Header, mega, and mobile drawer still need final visual QA after cleanup.
5. Desktop/mobile navigation source model requires merchant explanation.
6. Cart drawer is not started if drawer UX is required for launch.
7. Cart drawer is not started if drawer UX is required for launch.
8. Footer is still default Skeleton quality.
9. Desktop/mobile navigation source model requires merchant explanation.
10. Full responsive QA has not been completed.

## Top 10 Settings Or Labels To Rename

1. `desktop_layout`: done, unsupported option removed.
2. `site_width_mode`: "Page width".
3. `custom_site_content_width`: "Custom page width".
4. `nav_text_size`: "Desktop navigation text size".
5. `nav_gap`: "Desktop navigation spacing".
6. Header block `title`: "Navigation label".
7. Header block `label_text`: "Badge text".
8. Mega block `mega_menu_id`: "Mega panel ID to open".
9. Mega block `eyebrow`: "Small label".
10. Cart `shipping_message`: "Shipping message".

## Top 10 Settings To Remove Or Merge

1. Done: remove `logo_center_icons_right_nav_below`.
2. Done: remove stale `submenu_width`.
3. Done: remove stale `custom_width`.
4. Done: remove stale Header section `menu`.
5. Done: remove stale `desktop_side_padding`.
6. Done: remove stale `mobile_side_padding`.
7. Done: remove legacy `country_label` fallback.
8. Done: remove legacy `site_content_width` fallback.
9. Done: remove missing `social_instagram_link` fallback.
10. Done: remove manual region chip and mobile shipping text settings; use Shopify localization and mobile footer blocks.

## Next 5 Codex Tasks In Exact Order

### 1. Settings And Header Cleanup

Objective:
- Remove stale/unsupported header settings and align the schema with `YAOMRI_BUILD_SPEC.md`.

Why it comes now:
- Every future feature depends on stable setting ownership.

Success looks like:
- Header exposes exactly two desktop layouts.
- No stale Header section setting fallbacks remain.
- Section group JSON is clean after editor workflow is confirmed.

What not to get distracted by:
- Visual redesign.
- Homepage.
- Cart drawer.

Likely files affected:
- `config/settings_schema.json`
- `sections/header.liquid`
- `sections/header-group.json`
- `assets/yaomri-header.css`
- `THEME_SETTINGS_REGISTRY.md`

Risk level:
- Medium. Header layout regressions are possible.

### 2. Mobile Drawer Production Hardening

Objective:
- Remove demo fallback behavior and clean drawer setting ownership.

Why it comes now:
- Fake navigation links are a publish risk.

Success looks like:
- Blank mobile menu fails gracefully or uses only deliberate `main-menu` fallback.
- No missing global social setting fallback remains.
- Root/drill/back behavior passes QA.

What not to get distracted by:
- Predictive search.
- Localization.
- Social feed embeds.

Likely files affected:
- `sections/mobile-menu.liquid`
- `snippets/mobile-drawer.liquid`
- `assets/mobile-drawer.js`
- `assets/mobile-drawer.css`
- `THEME_SETTINGS_REGISTRY.md`

Risk level:
- Medium. Drawer navigation can break if fallback logic is changed carelessly.

### 3. Navigation Visual QA And Bug Fixes

Objective:
- Lock header, dropdown, mega menu, and mobile drawer behavior before homepage work.

Why it comes now:
- Navigation is global and affects every template.

Success looks like:
- Width settings work.
- Mega IDs connect correctly.
- Dropdown and mega close behavior is reliable.
- No mobile interference.

What not to get distracted by:
- New mega menu content types.
- Animation options.
- Merchant personalization settings.

Likely files affected:
- `assets/mega-menu.css`
- `assets/mega-menu.js`
- `snippets/mega-menu-item.liquid`
- `snippets/mega-menu-panel.liquid`
- `sections/mega-menu.liquid`

Risk level:
- Medium.

### 4. Cart Drawer Or Cart Fallback Decision

Objective:
- Decide and implement the launch cart path.

Why it comes now:
- Cart behavior impacts header, product form, and checkout readiness.

Success looks like:
- If drawer is in scope, it works and cart page remains fallback.
- If drawer is deferred, header cart clearly links to `/cart` and page fallback is polished.

What not to get distracted by:
- Upsells.
- Free-shipping progress bars.
- Gift notes.

Likely files affected:
- `sections/cart.liquid`
- `assets/yaomri-cart.css`
- `assets/yaomri-cart.js`
- Possible new cart drawer section/snippets/assets.

Risk level:
- High if building drawer; low if polishing fallback only.

### 5. Finish Homepage Shell

Objective:
- Build the remaining launch homepage sections around the new Hero sections.

Why it comes now:
- Home is still the most visible launch blocker after global navigation, even though Hello World is removed.

Success looks like:
- `templates/index.json` starts with Single Image Hero.
- The old combined `hero` section is not active.
- Homepage has brand strip, promo banner, product carousel/grid, and footer/social coverage.

What not to get distracted by:
- Complex CMS.
- Too many optional styles.
- Alternate home templates.

Likely files affected:
- `templates/index.json`
- New homepage sections/assets/snippets.
- `THEME_SETTINGS_REGISTRY.md` for new settings.

Risk level:
- High because it introduces new sections and merchant settings.

## Fastest Path To Live Within One Week

1. Clean settings and navigation ownership immediately.
2. Freeze header/mega/mobile drawer except bug fixes.
3. Decide cart drawer scope by Day 3. If behind, polish cart page fallback and defer drawer.
4. Build the remaining homepage shell around the new Single Image Hero.
5. Make product and collection usable, not perfect.
6. Polish footer and search enough to avoid Skeleton feel.
7. Push unpublished, configure editor, pull settings, inspect diffs, QA, then publish.

## Cleaner Long-Term Path For A Sellable Theme

1. Finish launch with minimal settings.
2. Remove all compatibility fallbacks.
3. Create a formal token and component system.
4. Replace text-ID mega matching with safer editor workflow.
5. Build reusable product card/product form/cart components.
6. Add screenshot regression tests.
7. Add complete merchant setup docs.
8. Add optional features only after the base merchant workflow is simple.

## Current Direction Creating Unnecessary Complexity

- Keeping unsupported header layout options keeps the team debugging layouts the spec already rejected.
- Demo mobile navigation is helpful during development but dangerous for launch.
- ID-based mega menu matching works technically but is fragile for merchants.
- Separate desktop and mobile navigation sources are powerful but need documentation.
- Cart page JavaScript can look like a dynamic cart system even though it only recalculates display before submit.
- Custom shadow controls are probably too granular before launch.
- Fake manual country/shipping text has been removed; do not reintroduce it as localization.
