# CNVRT Build Spec (Source of Truth)

This document is the implementation contract for all future CNVRT Skeleton work.

## 1. Project direction

- Shopify Skeleton is the base architecture.
- Old Dawn repo is reference only.
- Do not copy Dawn architecture.
- Build clean CNVRT theme architecture from Skeleton primitives.

## 2. Final header model

Desktop layout options are limited to exactly two:

1. Layout A: `logo_left_nav_center_actions_right`
- Left: logo
- Centre: nav
- Right: search icon, region chip, account, wishlist, cart

2. Layout B: `nav_left_logo_center_actions_right`
- Left: nav
- Centre: logo
- Right: search icon, region chip, account, wishlist, cart

Rules:
- No large inline search field for now.
- Search is icon-only.
- Do not support search-field layouts such as search-left, search-centre, or search-right.

Mobile:
- Left: menu
- Centre: logo
- Right: search icon, wishlist, cart
- Wishlist can hide on tiny screens before overlap.
- Menu and cart never hide.

## 3. Header settings to keep

- Desktop layout (only the 2 layouts above)
- Menu picker
- Logo width desktop/mobile
- Logo max height desktop/mobile
- Logo vertical offset desktop/mobile
- Header height desktop/mobile
- Header background/foreground/border
- Sticky header
- Icon size
- Icon button size desktop/mobile
- Desktop icon gap
- Mobile icon gap
- Show account icon
- Show wishlist icon (default true)
- Wishlist link
- Show cart icon
- Cart count settings
- Show region chip
- Region flag
- Region label
- Region currency
- Region link
- Region chip colours/height
- Mobile drawer settings
- Nav text size
- Nav gap

## 4. Header settings to remove or avoid

- Large desktop search field controls
- Search width desktop
- Search height desktop
- Search background
- Search text colour
- Search icon position
- Show desktop search
- Show desktop nav
- Any layout that puts a search field into the utility row
- Any layout with ambiguous icon/action placement

## 5. Search behaviour

- Header search is icon-only.
- Icon links to `routes.search_url`.
- No predictive search in this phase.
- Search drawer/predictive search is a later feature.

## 6. Region chip behaviour

- Region chip is a manual display chip only.
- Default display: `🇦🇪 AE / AED`
- It does not change market/currency.
- If hidden, render no chip markup and leave no spacing residue.
- Real Shopify localization selector is future work.

## 7. Wishlist behaviour

- Visible by default.
- Placeholder link only.
- Fallback URL: `/pages/wishlist`
- No localStorage.
- No customer metafields.
- No wishlist page in this phase.

## 8. Cart behaviour

- Cart icon links to `routes.cart_url`.
- Cart count uses `cart.item_count`.
- No custom cart drawer in Skeleton yet.
- Cart drawer support is future work if required.

## 9. Homepage direction

- Remove Hello World from homepage template.
- Build a clean CNVRT homepage shell.
- Then implement in this order:
1. Brand strip
2. Promo banner
3. Fresh hero
4. Product carousel
5. Footer/social layer

## 10. CSS architecture

- `critical.css` remains Skeleton base.
- `cnvrt-base.css` holds global CNVRT tokens/utilities.
- `cnvrt-header.css` is header-only.
- Future sections use scoped CSS or section-specific assets.
- No Dawn classes.
- No global `.header` selectors.

## 11. Validation rules

Every implementation pass must:

1. Run `git diff --check`
2. Run `shopify theme check`
3. Parse edited schema JSON
4. List changed files
5. Confirm no old Dawn repo edits
6. Confirm no JS added unless explicitly allowed
7. Confirm every setting is referenced
8. Confirm no invalid URL defaults

## 12. Banned behaviours

- Do not add settings that are not wired.
- Do not keep old layout settings for flexibility.
- Do not add custom JS unless requested.
- Do not copy Dawn `settings_schema.json` or `settings_data.json`.
- Do not make region chip appear to switch currency/country.
- Do not implement predictive search until requested.
- Do not start homepage work until header passes visual check.
