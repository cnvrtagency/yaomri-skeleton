# Ya Omri Theme Settings Registry

Rules:
- No new setting can be added unless it is added to this registry.
- No width setting can be added unless its ownership is clear.
- No colour setting can be added unless it maps to a visible token.
- No section setting should duplicate a global setting unless there is a clear override reason.
- If a setting is moved, this registry must be updated.
- If a setting is removed from the schema, stale references must also be removed from Liquid/CSS/JS.
- Passing theme check does not prove a setting is merchant-friendly or visually effective.

Status values:
- `keep`: keep as-is.
- `rename`: keep behavior but improve merchant-facing label/help.
- `remove`: remove from schema and stale references.
- `move`: setting belongs in a different owner.
- `defer`: useful later, but not launch-critical or too technical now.

## High-Risk Findings

- Header layout now matches `YAOMRI_BUILD_SPEC.md`: two desktop layout options only.
- Header Liquid no longer reads removed section-level header style settings.
- `sections/header-group.json` currently contains no known stale removed Header section settings.
- Mobile drawer demo menu behavior has been removed.
- `snippets/css-variables.liquid` no longer references legacy `settings.site_content_width`.
- `snippets/mobile-drawer.liquid` no longer references missing `settings.social_instagram_link`.
- `close_delay` remains as `Hover close delay`; keep an eye on whether merchants actually need it.

## Global Theme Settings

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| logo | Logo | Theme settings > Brand | image_picker | blank | Brand | Desktop logo image | `sections/header.liquid` | none | keep | Logo | Used in the desktop header. | Correct global owner. |
| mobile_logo | Mobile logo | Theme settings > Brand | image_picker | blank | Brand | Mobile logo image fallback | `sections/header.liquid` | none | keep | Mobile logo | Optional. Falls back to Logo. | Correct global owner. |
| desktop_logo_width | Desktop logo width | Theme settings > Brand | range | 130 | Brand | Desktop rendered logo width | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-desktop-logo-width` | keep | Desktop logo width | Controls logo width in the desktop header. | Spec also mentions max height/offset, but defer until needed. |
| mobile_logo_width | Mobile logo width | Theme settings > Brand | range | 120 | Brand | Mobile rendered logo width | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-mobile-logo-width` | keep | Mobile logo width | Controls logo width in the mobile header. | Correct global owner. |
| type_primary_font | t:general.primary | Theme settings > Typography | font_picker | `work_sans_n4` | Typography | Primary font family and variants | `snippets/css-variables.liquid`, `layout/theme.liquid`, `assets/critical.css` | `--font-primary--family`, `--font-primary--style`, `--font-primary--weight` | rename | Primary font | Controls the main storefront font. | Translation label is not merchant-friendly in this custom theme context. |
| site_width_mode | Site width mode | Theme settings > Layout | select | boxed | Layout | Global page content width mode | `snippets/css-variables.liquid`, `assets/critical.css` | `--page-width` | rename | Page width | Controls the main content width for standard sections. | Needs help text clarifying it does not control header, mega menu, or drawer widths. |
| custom_site_content_width | Custom site width | Theme settings > Layout | range | 1200 | Layout | Custom global page width when site width mode is custom | `snippets/css-variables.liquid` | `--page-width` | rename | Custom page width | Used only when Page width is Custom. | Current label is acceptable but "page" is clearer than "site". |
| desktop_layout | Desktop layout | Theme settings > Header | select | `logo_left_nav_center_actions_right` | Header | Desktop header placement | `sections/header.liquid`, `assets/yaomri-header.css` | class modifier | keep | Desktop layout | Choose one of the two supported desktop header layouts. | Cleaned: only the two build-spec layouts remain. |
| header_menu | Fallback desktop menu | Theme settings > Header | link_list | blank | Header | Fallback desktop nav when no Header nav blocks exist | `sections/header.liquid`, `snippets/mega-menu.liquid` | none | keep | Fallback desktop menu | Used only when the Header section has no navigation blocks. | Renamed and clarified. |
| header_width_mode | Header content width | Theme settings > Header | select | site | Header | Header row width mode | `sections/header.liquid`, `assets/yaomri-header.css` | class modifier | keep | Header content width | Controls desktop header row width only. | Must not control mega panel width. |
| header_custom_width | Custom header content width | Theme settings > Header | range | 1200 | Header | Header row max width in custom mode | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-custom-content-width` | keep | Custom header content width | Used only when Header content width is Custom. | Renamed and clarified. |
| nav_collapse_width | Mobile menu breakpoint | Theme settings > Header | select | 1100 | Header | Breakpoint for desktop nav vs mobile header | `sections/header.liquid`, `assets/yaomri-header.css` | class modifier | keep | Mobile menu breakpoint | Switches from desktop header to mobile header at this viewport width. | Renamed from technical switch-width wording. |
| desktop_header_height | Desktop header height | Theme settings > Header | range | 82 | Header | Desktop header minimum height | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-desktop-height` | keep | Desktop header height | Controls the desktop header height. | Correct owner. |
| mobile_header_height | Mobile header height | Theme settings > Header | range | 74 | Header | Mobile header minimum height | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-mobile-height` | keep | Mobile header height | Controls the mobile header height. | Correct owner. |
| nav_text_size | Desktop navigation text size | Theme settings > Header | range | 12 | Header | Desktop nav text size | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-nav-size` | keep | Desktop navigation text size | Controls top-level desktop navigation text size. | Renamed for clarity. |
| nav_gap | Desktop navigation spacing | Theme settings > Header | range | 24 | Header | Desktop nav item spacing | `sections/header.liquid`, `assets/yaomri-header.css`, `assets/mega-menu.css` | `--yh-nav-gap` | keep | Desktop navigation spacing | Controls spacing between top-level desktop navigation items. | Renamed for clarity. |
| header_background | Header background | Theme settings > Header | color | `#ffffff` | Header | Header background | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-bg` | keep | Header background | Controls the header background colour. | Correct owner. |
| header_foreground | Header text/icon colour | Theme settings > Header | color | `#111111` | Header | Header text and icon colour | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-fg` | keep | Header text and icon colour | Controls text and icon colour in the header. | Correct owner. |
| header_border | Header border colour | Theme settings > Header | color | `#e8e8e8` | Header | Header bottom border | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-border` | keep | Header border colour | Controls the header border colour. | Correct owner. |
| show_bottom_border | Show header bottom border | Theme settings > Header | checkbox | true | Header | Header border visibility | `sections/header.liquid`, `assets/yaomri-header.css` | class modifier | keep | Show header bottom border | Shows a line under the header. | Renamed for clarity. |
| header_shadow | Header shadow | Theme settings > Header | select | none | Header | Header shadow preset | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-shadow` | keep | Header shadow | Controls the header shadow. | Good. |
| header_shadow_opacity | Shadow opacity | Theme settings > Header | range | 10 | Header | Custom shadow opacity | `sections/header.liquid` | `--yh-shadow` generated | defer | Custom shadow opacity | Used only when Header shadow is Custom. | Too technical; keep only if conditional visibility is available. |
| header_shadow_offset_y | Shadow vertical offset | Theme settings > Header | range | 8 | Header | Custom shadow Y offset | `sections/header.liquid` | `--yh-shadow` generated | defer | Custom shadow distance | Used only when Header shadow is Custom. | Technical but acceptable if grouped under custom shadow. |
| header_shadow_blur | Shadow blur | Theme settings > Header | range | 24 | Header | Custom shadow blur | `sections/header.liquid` | `--yh-shadow` generated | defer | Custom shadow softness | Used only when Header shadow is Custom. | Technical, not launch-critical. |
| enable_sticky | Sticky header | Theme settings > Header | checkbox | true | Header | Sticky header behavior | `sections/header.liquid` | inline section style | keep | Sticky header | Keeps the header visible while scrolling. | Correct owner. |
| icon_size | Icon size | Theme settings > Header | range | 24 | Header | SVG icon size | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-icon-size` | keep | Header icon size | Controls header icon artwork size. | Correct owner. |
| icon_button_size_desktop | Desktop icon tap area | Theme settings > Header | range | 44 | Header | Desktop icon hit area | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-icon-button-desktop` | keep | Desktop icon tap area | Controls clickable icon button size on desktop. | Renamed for merchant clarity. |
| icon_button_size_mobile | Mobile icon tap area | Theme settings > Header | range | 42 | Header | Mobile icon hit area | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-icon-button-mobile` | keep | Mobile icon tap area | Controls clickable icon button size on mobile. | Renamed for merchant clarity. |
| desktop_icon_gap | Desktop icon spacing | Theme settings > Header | range | 0 | Header | Gap between desktop header actions | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-desktop-icon-gap` | keep | Desktop icon spacing | Controls spacing between header action icons on desktop. | Renamed for merchant clarity. |
| mobile_icon_gap | Mobile icon spacing | Theme settings > Header | range | 0 | Header | Gap between mobile header actions | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-mobile-icon-gap` | keep | Mobile icon spacing | Controls spacing between header action icons on mobile. | Renamed for merchant clarity. |
| show_account_icon | Show account icon | Theme settings > Header | checkbox | true | Header | Account icon visibility | `sections/header.liquid` | none | keep | Show account icon | Shows the account icon when customer accounts are enabled. | Good. |
| show_wishlist_icon | Show wishlist icon | Theme settings > Header | checkbox | true | Header | Wishlist icon visibility | `sections/header.liquid` | none | keep | Show wishlist icon | Shows the wishlist icon. | Placeholder link only per spec. |
| wishlist_link | Wishlist link | Theme settings > Header | url | blank | Header | Header wishlist URL fallback | `sections/header.liquid` | none | keep | Wishlist link | Leave blank to use `/pages/wishlist`. | Also duplicated by mobile drawer wishlist link; acceptable because mobile footer can differ, but document it. |
| show_cart_icon | Show cart icon | Theme settings > Header | checkbox | true | Header | Cart icon visibility | `sections/header.liquid` | none | keep | Show cart icon | Shows the cart icon in the header. | Correct owner. |
| cart_count_background | Cart count background | Theme settings > Header | color | `#000000` | Header | Cart bubble background | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-bg` | keep | Cart count background | Controls the cart count bubble background. | Correct owner. |
| cart_count_text | Cart count text | Theme settings > Header | color | `#ffffff` | Header | Cart bubble text colour | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-text` | keep | Cart count text colour | Controls the cart count bubble text colour. | Correct owner. |
| cart_count_size | Cart count size | Theme settings > Header | range | 18 | Header | Cart bubble size | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-size` | keep | Cart count size | Controls the cart count bubble size. | Correct owner. |
| cart_count_text_size | Cart count text size | Theme settings > Header | range | 10 | Header | Cart bubble text size | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-font-size` | keep | Cart count text size | Controls the cart count number size. | Correct owner. |
| cart_count_offset_x | Cart count position X | Theme settings > Header | range | 4 | Header | Cart bubble horizontal position | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-offset-x` | keep | Cart count position X | Moves the cart count left or right. | Renamed. |
| cart_count_offset_y | Cart count position Y | Theme settings > Header | range | 5 | Header | Cart bubble vertical position | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-cart-count-offset-y` | keep | Cart count position Y | Moves the cart count up or down. | Renamed. |
| show_region_chip | Show shipping region chip | Theme settings > Header | checkbox | true | Header | Region chip visibility | `sections/header.liquid` | none | keep | Show shipping region chip | Display only. Does not change market, currency, or localization. | Renamed to avoid implying localization. |
| region_flag | Region chip flag | Theme settings > Header | text | UAE flag | Header | Region flag text | `sections/header.liquid` | none | keep | Region chip flag | Display only. Does not change market, currency, or localization. | Renamed. |
| region_label | Region chip country label | Theme settings > Header | text | AE | Header | Region label text | `sections/header.liquid` | none | keep | Region chip country label | Display only. Does not change market, currency, or localization. | Renamed. |
| region_currency | Region chip currency label | Theme settings > Header | text | AED | Header | Region currency text | `sections/header.liquid` | none | keep | Region chip currency label | Display only. Does not change market, currency, or localization. | Renamed. |
| region_link | Region chip link | Theme settings > Header | url | blank | Header | Optional chip link | `sections/header.liquid` | none | defer | Region chip link | Optional. Display only; this does not switch market or currency. | Kept but clarified. |
| region_chip_background | Region chip background | Theme settings > Header | color | `#ffffff` | Header | Region chip background | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-region-bg` | keep | Region chip background | Controls the display-only region chip background. | Correct owner. |
| region_chip_border | Region chip border | Theme settings > Header | color | `#e8e8e8` | Header | Region chip border | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-region-border` | keep | Region chip border colour | Controls the display-only region chip border. | Correct owner. |
| region_chip_text | Region chip text colour | Theme settings > Header | color | `#111111` | Header | Region chip text | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-region-text` | keep | Region chip text colour | Controls the display-only region chip text. | Correct owner. |
| region_chip_height | Region chip height | Theme settings > Header | range | 48 | Header | Region chip height | `sections/header.liquid`, `assets/yaomri-header.css` | `--yh-region-height` | keep | Region chip height | Controls the display-only region chip height. | Correct owner. |
| background_color | Page background | Theme settings > Colours | color | `#FFFFFF` | Colours | Global page background | `snippets/css-variables.liquid`, `assets/critical.css` | `--color-background` | keep | Page background | Controls the default page background. | Correct owner. |
| foreground_color | Text colour | Theme settings > Colours | color | `#1a1a1a` | Colours | Global text colour | `snippets/css-variables.liquid`, `assets/critical.css` | `--color-foreground` | keep | Text colour | Controls the default text colour. | Correct owner. |
| sand_color | Soft background | Theme settings > Colours | color | `#f6f4ef` | Colours | Soft background token | `snippets/css-variables.liquid`, `assets/yaomri-base.css`, `assets/mega-menu.css`, `assets/mobile-drawer.css` | `--color-sand` | rename | Soft background colour | Used for subtle surfaces and hover states. | "Sand" is brand language but less reusable. |
| muted_color | Muted text | Theme settings > Colours | color | `#737373` | Colours | Muted text token | `snippets/css-variables.liquid`, `assets/mobile-drawer.css` | `--color-muted` | keep | Muted text colour | Controls secondary text in supported areas. | Cart still hard-codes muted colours. |
| border_color | Border colour | Theme settings > Colours | color | `#e8e8e8` | Colours | Global border token | `snippets/css-variables.liquid`, `assets/critical.css`, `assets/mobile-drawer.css` | `--color-border` | keep | Border colour | Controls standard borders in supported areas. | Header has its own border colour. |
| input_corner_radius | t:labels.input_corner_radius | Theme settings > Colours | range | 0 | Colours | Input border radius | `snippets/css-variables.liquid`, `assets/critical.css` | `--style-border-radius-inputs` | rename | Input corner radius | Controls the corner radius on form inputs. | Translation label is not merchant-friendly. |

## Header Section Settings And Blocks

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `(paragraph)` | Header style settings are managed in Theme settings > Header. | Header section | paragraph | n/a | Header section | Editor guidance | Theme editor only | none | keep | n/a | n/a | Good guardrail. |
| `(paragraph)` | Mobile drawer settings are in the Mobile Menu section. | Header section | paragraph | n/a | Header section | Editor guidance | Theme editor only | none | keep | n/a | n/a | Good guardrail. |
| title | Navigation label | Header block: Simple link | text | Link | Header nav item | Top-level simple nav text | `snippets/mega-menu-item.liquid` | none | keep | Navigation label | Text shown in the desktop navigation. | Renamed from "Heading". |
| link | Link | Header block: Simple link | url | blank | Header nav item | Simple nav URL | `snippets/mega-menu-item.liquid` | none | keep | Link | Link for this navigation item. | Good. |
| open_new_window | Open in new tab | Header block: Simple link | checkbox | false | Header nav item | Link target | `snippets/mega-menu-item.liquid` | none | keep | Open in new tab | Opens this link in a new browser tab. | Renamed. |
| highlight_item | Highlight item | Header block: Simple link | checkbox | false | Header nav item | Enables custom nav colour | `snippets/mega-menu-item.liquid` | `--ym-link-color` if enabled | keep | Highlight this link | Uses the highlight colour for this item. | Good. No automatic sale colour. |
| highlight_color | Highlight colour | Header block: Simple link | color | `#c0392b` | Header nav item | Highlight colour | `snippets/mega-menu-item.liquid`, `assets/mega-menu.css` | `--ym-link-color` | keep | Highlight colour | Used when Highlight this link is enabled. | Good. |
| label_text | Badge text | Header block: Simple link | text | blank | Header nav item | Small badge text | `snippets/mega-menu-item.liquid` | none | keep | Badge text | Optional small label shown beside the navigation item. | Renamed. |
| label_color | Badge colour | Header block: Simple link | color | `#111111` | Header nav item | Badge colour | `snippets/mega-menu-item.liquid`, `assets/mega-menu.css` | `--ym-label-color` | keep | Badge colour | Controls the optional badge colour. | Renamed. |
| title | Navigation label | Header block: Dropdown link | text | Dropdown | Header nav item | Top-level dropdown nav text | `snippets/mega-menu-item.liquid` | none | keep | Navigation label | Text shown in the desktop navigation. | Renamed from "Heading". |
| link | Link | Header block: Dropdown link | url | blank | Header nav item | Top-level dropdown URL | `snippets/mega-menu-item.liquid` | none | keep | Link | Optional link for this top-level item. | JS opens dropdown on hover/focus. |
| open_new_window | Open in new tab | Header block: Dropdown link | checkbox | false | Header nav item | Link target | `snippets/mega-menu-item.liquid` | none | keep | Open in new tab | Opens this link in a new browser tab. | Renamed. |
| menu | Dropdown menu | Header block: Dropdown link | link_list | blank | Header nav item | Dropdown menu content | `snippets/mega-menu-item.liquid` | none | keep | Dropdown menu | Menu shown in this dropdown. | Renamed. |
| dropdown_position | Dropdown position | Header block: Dropdown link | select | start | Header nav item | Horizontal dropdown alignment | `snippets/mega-menu-item.liquid`, `assets/mega-menu.css` | class modifier | keep | Dropdown alignment | Aligns the dropdown to the start, centre, or end of the link. | Good. |
| dropdown_width | Dropdown panel width | Header block: Dropdown link | range | 260 | Header nav item | Visible dropdown box width | `snippets/mega-menu-item.liquid`, `assets/mega-menu.css` | `--ym-dropdown-width` | keep | Dropdown width | Controls the visible dropdown box width on desktop. | Correct owner. |
| highlight_item | Highlight item | Header block: Dropdown link | checkbox | false | Header nav item | Enables custom nav colour | `snippets/mega-menu-item.liquid` | `--ym-link-color` if enabled | keep | Highlight this link | Uses the highlight colour for this item. | Good. |
| highlight_color | Highlight colour | Header block: Dropdown link | color | `#c0392b` | Header nav item | Highlight colour | `snippets/mega-menu-item.liquid` | `--ym-link-color` | keep | Highlight colour | Used when Highlight this link is enabled. | Good. |
| label_text | Badge text | Header block: Dropdown link | text | blank | Header nav item | Small badge text | `snippets/mega-menu-item.liquid` | none | keep | Badge text | Optional small label shown beside the navigation item. | Renamed. |
| label_color | Badge colour | Header block: Dropdown link | color | `#111111` | Header nav item | Badge colour | `snippets/mega-menu-item.liquid` | `--ym-label-color` | keep | Badge colour | Controls the optional badge colour. | Renamed. |
| title | Navigation label | Header block: Mega menu link | text | Mega | Header nav item | Top-level mega nav text | `snippets/mega-menu-item.liquid` | none | keep | Navigation label | Text shown in the desktop navigation. | Renamed from "Heading". |
| link | Fallback link | Header block: Mega menu link | url | blank | Header nav item | Fallback URL | `snippets/mega-menu-item.liquid` | none | keep | Fallback link | Used if the mega panel cannot open. | Clarifies desktop clicks are normally intercepted by mega open behavior. |
| open_new_window | Open fallback link in new tab | Header block: Mega menu link | checkbox | false | Header nav item | Link target | `snippets/mega-menu-item.liquid` | none | defer | Open fallback link in new tab | Opens the fallback link in a new browser tab. | Still a little confusing, but clearer. |
| mega_menu_id | Mega panel ID to open | Header block: Mega menu link | text | 1 | Header nav item | Connects nav item to Mega Menu panel | `snippets/mega-menu-item.liquid`, `assets/mega-menu.js` | `data-mega-target` | keep | Mega panel ID to open | Must match a Panel ID in the Mega Menu section. | Fragile merchant workflow; launch risk if mistyped. |
| highlight_item | Highlight item | Header block: Mega menu link | checkbox | false | Header nav item | Enables custom nav colour | `snippets/mega-menu-item.liquid` | `--ym-link-color` if enabled | keep | Highlight this link | Uses the highlight colour for this item. | Good. |
| highlight_color | Highlight colour | Header block: Mega menu link | color | `#c0392b` | Header nav item | Highlight colour | `snippets/mega-menu-item.liquid` | `--ym-link-color` | keep | Highlight colour | Used when Highlight this link is enabled. | Good. |
| label_text | Badge text | Header block: Mega menu link | text | blank | Header nav item | Small badge text | `snippets/mega-menu-item.liquid` | none | keep | Badge text | Optional small label shown beside the navigation item. | Renamed. |
| label_color | Badge colour | Header block: Mega menu link | color | `#111111` | Header nav item | Badge colour | `snippets/mega-menu-item.liquid` | `--ym-label-color` | keep | Badge colour | Controls the optional badge colour. | Renamed. |

## Mega Menu Section Settings And Blocks

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mega_panel_width | Mega panel width | Mega Menu section | range | 1200 | Mega Menu | Visible mega panel box width | `sections/mega-menu.liquid`, `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css`, `assets/mega-menu.js` | `--ym-panel-width` | keep | Mega panel width | Controls the visible mega menu panel width on desktop. | Correct owner after width fix. |
| close_delay | Hover close delay | Mega Menu section | range | 250 | Mega Menu | Hover leave close delay | `sections/mega-menu.liquid`, `assets/mega-menu.js` | none | defer | Hover close delay | Time before the mega menu closes after the cursor leaves. | Renamed, but still likely too technical for most merchants. |
| parent_id | Panel ID | Mega panel block | text | 1 | Mega Menu | Panel identifier | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.js` | `data-mega-parent` | keep | Panel ID | Must match the Mega panel ID to open in a Header mega menu link. | Help text clarified. |
| enable_packery | Flexible layout | Mega panel block | checkbox | true | Mega Menu | Dense vs row grid flow | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css` | class modifier | keep | Flexible layout | Allows mixed-width blocks to pack into available space. | Renamed from more technical wording. |
| parent_id | Show in panel ID | Link column block | text | 1 | Mega Menu | Assigns link column to panel | `snippets/mega-menu-panel.liquid` | none | keep | Show in panel ID | Must match the panel this column belongs to. | Same fragile ID workflow. |
| heading | Heading | Link column block | text | blank | Mega Menu | Column heading text | `snippets/mega-menu-panel.liquid` | none | keep | Heading | Optional heading above this link column. | Good. |
| heading_link | Heading link | Link column block | url | blank | Mega Menu | Optional heading URL | `snippets/mega-menu-panel.liquid` | none | keep | Heading link | Optional link for the heading. | Good. |
| menu | Link column menu | Link column block | link_list | blank | Mega Menu | Links in column | `snippets/mega-menu-panel.liquid` | none | keep | Link column menu | Menu shown in this column. | Renamed. |
| open_new_window | Open heading link in new tab | Link column block | checkbox | false | Mega Menu | Heading link target only | `snippets/mega-menu-panel.liquid` | none | keep | Open heading link in new tab | Opens the heading link in a new tab. | Renamed because this does not affect every menu item. |
| font_size | Link text size | Link column block | range | 13 | Mega Menu | Link font size | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css` | `--ym-column-size` | keep | Link text size | Controls link text size in this column. | Renamed. |
| space_between | Link spacing | Link column block | range | 10 | Mega Menu | Link vertical gap | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css` | `--ym-column-gap` | keep | Link spacing | Controls spacing between links in this column. | Renamed. |
| column_width | Column width | Link column block | select | 25 | Mega Menu | Grid span for column | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css` | `--ym-column-span`, unused `--ym-column-percent` | keep | Column width | Controls how much of the mega panel row this column uses. | Renamed. `--ym-column-percent` is emitted but not used. |
| parent_id | Show in panel ID | Image tile block | text | 1 | Mega Menu | Assigns tile to panel | `snippets/mega-menu-panel.liquid` | none | keep | Show in panel ID | Must match the panel this image tile belongs to. | Same fragile ID workflow. |
| image | Image | Image tile block | image_picker | blank | Mega Menu | Tile image | `snippets/mega-menu-panel.liquid` | none | keep | Image | Image shown in this tile. | Good. |
| image_alt | Image alt text | Image tile block | text | blank | Mega Menu | Tile image alt fallback | `snippets/mega-menu-panel.liquid` | none | keep | Image alt text | Describes the image for accessibility. | Renamed. |
| eyebrow | Small label | Image tile block | text | blank | Mega Menu | Small tile label | `snippets/mega-menu-panel.liquid` | none | keep | Small label | Optional small text above the title. | Renamed from design jargon. |
| title | Title | Image tile block | text | blank | Mega Menu | Tile title | `snippets/mega-menu-panel.liquid` | none | keep | Title | Main text for this image tile. | Good. |
| cta | Button text | Image tile block | text | blank | Mega Menu | Tile CTA text | `snippets/mega-menu-panel.liquid` | none | keep | Button text | Optional call-to-action text. | Renamed. |
| url | Link | Image tile block | url | blank | Mega Menu | Tile URL | `snippets/mega-menu-panel.liquid` | none | keep | Link | Link for this image tile. | Good. |
| column_width | Tile width | Image tile block | select | 25 | Mega Menu | Grid span for tile | `snippets/mega-menu-panel.liquid`, `assets/mega-menu.css` | `--ym-column-span`, unused `--ym-column-percent` | keep | Tile width | Controls how much of the mega panel row this tile uses. | Renamed. |

## Mobile Menu Section Settings

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `(header)` | Mobile drawer | Mobile Menu section | header | n/a | Mobile Menu | Editor grouping | Theme editor only | none | keep | n/a | n/a | Good group. |
| drawer_menu | Mobile drawer menu | Mobile Menu section | link_list | blank | Mobile Menu | Mobile drawer root menu | `sections/mobile-menu.liquid`, `snippets/mobile-drawer.liquid` | none | keep | Mobile drawer menu | Menu shown inside the mobile drawer. | Uses `main-menu` fallback only; demo fallback removed. |
| mobile_menu_label | Drawer title | Mobile Menu section | text | Menu | Mobile Menu | Drawer root title | `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.js` | none | keep | Drawer title | Title shown at the top of the mobile drawer. | Good. |
| show_mobile_drawer_search | Show search field | Mobile Menu section | checkbox | true | Mobile Menu | Drawer search visibility | `snippets/mobile-drawer.liquid` | none | keep | Show search field | Shows a search field in the mobile drawer. | Renamed. |
| mobile_drawer_search_placeholder | Search placeholder | Mobile Menu section | text | Search Ya Omri | Mobile Menu | Drawer search placeholder | `snippets/mobile-drawer.liquid` | none | keep | Search placeholder | Placeholder text for drawer search. | Good. |
| show_mobile_drawer_footer | Show drawer footer | Mobile Menu section | checkbox | true | Mobile Menu | Drawer footer visibility | `snippets/mobile-drawer.liquid` | none | keep | Show drawer footer | Shows utility links and supporting text at the bottom of the drawer. | Renamed. |
| `(header)` | Mobile drawer footer | Mobile Menu section | header | n/a | Mobile Menu | Editor grouping | Theme editor only | none | keep | n/a | n/a | Good group. |
| show_mobile_drawer_sign_in | Show sign in link | Mobile Menu section | checkbox | true | Mobile Menu | Sign-in link visibility | `snippets/mobile-drawer.liquid` | none | keep | Show sign in link | Shows sign in when customer accounts are enabled. | Good. |
| show_mobile_drawer_wishlist | Show wishlist link | Mobile Menu section | checkbox | true | Mobile Menu | Drawer wishlist visibility | `snippets/mobile-drawer.liquid` | none | keep | Show wishlist link | Shows a wishlist link in the drawer footer. | Duplicates header wishlist concept, but mobile footer can differ. |
| mobile_drawer_wishlist_link | Mobile wishlist link | Mobile Menu section | url | blank | Mobile Menu | Drawer wishlist URL | `snippets/mobile-drawer.liquid` | none | keep | Mobile wishlist link | Leave blank to use the header wishlist fallback. | Renamed. Currently passed fallback remains `/pages/wishlist`; align with global `wishlist_link` later if needed. |
| show_mobile_drawer_shipping | Show shipping region text | Mobile Menu section | checkbox | true | Mobile Menu | Shipping line visibility | `snippets/mobile-drawer.liquid` | none | keep | Show shipping region text | Display-only. Does not change market or currency. | Renamed. |
| mobile_drawer_shipping_label | Shipping label | Mobile Menu section | text | Shipping to | Mobile Menu | Shipping prefix | `snippets/mobile-drawer.liquid` | none | keep | Shipping label | Text before the shipping region. | Renamed. |
| mobile_drawer_shipping_region | Shipping region | Mobile Menu section | text | United Arab Emirates - AED | Mobile Menu | Shipping region display | `snippets/mobile-drawer.liquid` | none | keep | Shipping region | Display only. Does not change market or currency. | Renamed. |
| show_mobile_drawer_instagram | Show Instagram link | Mobile Menu section | checkbox | true | Mobile Menu | Instagram link visibility | `snippets/mobile-drawer.liquid` | none | keep | Show Instagram link | Shows an Instagram link in the drawer footer. | Good. |
| mobile_drawer_instagram_label | Instagram label | Mobile Menu section | text | Follow @yaomri | Mobile Menu | Instagram link text | `snippets/mobile-drawer.liquid` | none | keep | Instagram label | Text for the Instagram link. | Good. |
| mobile_drawer_instagram_url | Instagram link | Mobile Menu section | url | blank | Mobile Menu | Instagram URL | `snippets/mobile-drawer.liquid` | none | keep | Instagram link | Link to the brand Instagram profile. | Missing `settings.social_instagram_link` fallback removed. |
| mobile_drawer_width | Mobile drawer width | Mobile Menu section | range | 320 | Mobile Menu | Visible drawer panel width | `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.css` | `--mdrawer-max-width` | keep | Mobile drawer width | Controls the visible mobile drawer width. | Correct owner; must not affect desktop mega/dropdown widths. |
| mobile_drawer_background | Mobile drawer background | Mobile Menu section | color | `#ffffff` | Mobile Menu | Drawer background | `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.css` | `--paper` | keep | Mobile drawer background | Controls the mobile drawer background colour. | Renamed. |
| mobile_drawer_text | Mobile drawer text colour | Mobile Menu section | color | `#111111` | Mobile Menu | Drawer text colour | `snippets/mobile-drawer.liquid`, `assets/mobile-drawer.css` | `--ink` | keep | Mobile drawer text colour | Controls text colour in the mobile drawer. | Renamed. |

## Cart Section Settings

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| heading | Heading | Cart section | text | Your cart | Cart page fallback | Cart page heading | `sections/cart.liquid` | none | rename | Cart page heading | Heading shown on the cart page fallback. | Mark fallback-only. |
| summary_heading | Summary heading | Cart section | text | Order summary | Cart page fallback | Summary card heading | `sections/cart.liquid` | none | keep | Order summary heading | Heading for the cart summary. | Good. |
| empty_heading | Empty cart heading | Cart section | text | Your cart is empty | Cart page fallback | Empty state heading | `sections/cart.liquid` | none | keep | Empty cart heading | Heading shown when the cart is empty. | Good. |
| empty_text | Empty cart text | Cart section | text | Discover this season's edit... | Cart page fallback | Empty state body copy | `sections/cart.liquid` | none | keep | Empty cart text | Body text shown when the cart is empty. | Good. |
| continue_link | Continue shopping link | Cart section | url | blank | Cart page fallback | Continue shopping URL | `sections/cart.liquid` | none | keep | Continue shopping link | Leave blank to link to all collections. | Good. |
| show_trust_text | Show trust text | Cart section | checkbox | true | Cart page fallback | Trust text visibility | `sections/cart.liquid` | none | keep | Show trust text | Shows a short reassurance line in the cart summary. | Good. |
| trust_text | Trust text | Cart section | text | Secure checkout | Cart page fallback | Trust copy | `sections/cart.liquid` | none | keep | Trust text | Short reassurance text in the cart summary. | Good. |
| show_shipping_message | Show free shipping message | Cart section | checkbox | true | Cart page fallback | Static shipping message visibility | `sections/cart.liquid` | none | rename | Show shipping message | Shows a static shipping message above cart items. | Current label says free shipping but no threshold logic exists. |
| shipping_message | Free shipping message | Cart section | text | Add AED 500 for free shipping | Cart page fallback | Static shipping message | `sections/cart.liquid` | none | rename | Shipping message | Static text shown above cart items. | It is not dynamic. Do not imply live progress. |

## Footer Section Settings

| Setting ID | Current label | Location | Type | Default | Owner | What it controls | Where it is used | CSS variable | Status | Suggested label | Suggested help text | Notes/conflicts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| menu | t:labels.menu | Footer section | link_list | blank | Footer | Footer link menu | `sections/footer.liquid` | none | rename | Footer menu | Menu shown in the footer. | Translation label is not merchant-friendly. |
| show_payment_icons | t:labels.show_payment_icons | Footer section | checkbox | true | Footer | Payment icon visibility | `sections/footer.liquid` | none | rename | Show payment icons | Shows enabled Shopify payment icons in the footer. | Translation label is not merchant-friendly. |

## Stale Or Referenced Settings Not In Current Schemas

These are not current schema settings, but they are still present in code or saved JSON and must be handled before launch.

| Setting ID | Found in | Status | Recommendation |
|---|---|---|---|
| submenu_width | previously in `sections/header-group.json` | removed | No longer present in saved header group JSON. |
| custom_width | previously in `sections/header-group.json` | removed | No longer present in saved header group JSON. |
| menu | previously in `sections/header-group.json`, `sections/header.liquid` fallback | removed | Header Liquid now uses global `header_menu` only. |
| desktop_side_padding | previously in `sections/header-group.json` | removed | No longer present in saved header group JSON. Header currently hard-codes 24px. |
| mobile_side_padding | previously in `sections/header-group.json` | removed | No longer present in saved header group JSON. Header currently hard-codes 16px. |
| country_label | previously in `sections/header.liquid` fallback | removed | Header Liquid now uses `region_label`. |
| site_content_width | previously in `snippets/css-variables.liquid` fallback | removed | `custom_site_content_width` is the only custom page-width setting. |
| social_instagram_link | previously in `snippets/mobile-drawer.liquid` fallback | removed | No global social setting exists; drawer uses its own Instagram link setting. |
| legacy search layout values | previously in `sections/header.liquid` mapping | removed | Spec forbids search-field layouts. |
| logo_center_icons_right_nav_below | previously in `config/settings_schema.json`, `sections/header.liquid`, `assets/yaomri-header.css` | removed | Spec allows exactly two desktop layouts. |
