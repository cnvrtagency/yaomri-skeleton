# THEME_SETTINGS_UX_AUDIT

Date: 2026-05-31  
Scope: Theme Editor settings UX audit only (no schema/code changes)

## A. Executive summary

Biggest settings UX problems right now:
1. `Header` has very high control density (58 settings) with mixed novice/advanced controls in one flat group.
2. Section schemas are inconsistent in grouping depth and naming language (for example `Content` vs ungrouped, `Colours` vs `Layout` mixing visual and structural controls).
3. Multiple sections expose large spacing matrices (`top/bottom/left/right` for desktop/mobile + margins), which are powerful but overwhelming for typical merchants.
4. Some settings are legacy-compatible but not beginner-friendly (for example mega panel ID mapping, shadow fine-tune controls, detailed card typography controls).
5. Theme-level typography ownership is now mostly corrected, but editor UX still needs a stronger “learn once” grouping standard across sections.

Primary recommendation:
- Do a phased UX cleanup with **schema reordering/group headers/relabeling first**, then selectively simplify advanced controls.
- Keep IDs stable in early phases.

---

## B. Current Theme settings inventory

Source: `config/settings_schema.json`

### Theme groups and scale

| Group | Count | UX clarity | Overlap risk | Recommendation |
|---|---:|---|---|---|
| Brand | 6 | High | Low | Keep; minor help text improvements |
| Typography | 18 | Medium | Medium | Keep; clarify legacy `type_primary_font` and fallback behavior |
| Layout | 3 | High | Low | Keep |
| Product cards | 9 | High | Low | Keep |
| Header | 58 | Low-Medium | High | Split by headers and move advanced controls under Advanced subsection |
| Section headings | 33 | Medium | Medium | Keep; improve instructional copy and dependency language |
| Colours | 6 | Medium | Medium | Keep; improve labels and token descriptions |

### Theme setting inventory (full)

Columns: `Group | Order | ID | Type | Label | Default | Current header/context`

```text
Brand	1	logo	image_picker	Logo	null	(none)
Brand	2	mobile_logo	image_picker	Mobile logo	null	(none)
Brand	3	transparent_logo	image_picker	Transparent logo	null	(none)
Brand	4	transparent_mobile_logo	image_picker	Transparent mobile logo	null	(none)
Brand	5	desktop_logo_width	range	Desktop logo width	130	(none)
Brand	6	mobile_logo_width	range	Mobile logo width	120	(none)
t:general.typography	2	type_primary_font	font_picker	t:general.primary	work_sans_n4	t:general.fonts
t:general.typography	3	type_body_font	font_picker	Body font	work_sans_n4	t:general.fonts
t:general.typography	4	type_heading_font	font_picker	Heading font	work_sans_n4	t:general.fonts
t:general.typography	5	type_button_font	font_picker	Button font	work_sans_n4	t:general.fonts
t:general.typography	6	type_accent_font	font_picker	Accent / eyebrow font	work_sans_n4	t:general.fonts
t:general.typography	8	type_body_size_desktop	range	Body size desktop	16	Global typography scale
t:general.typography	9	type_body_size_mobile	range	Body size mobile	15	Global typography scale
t:general.typography	10	type_body_line_height	range	Body line height	160	Global typography scale
t:general.typography	11	type_body_weight	select	Body weight	400	Global typography scale
t:general.typography	12	type_heading_weight	select	Heading base weight	700	Global typography scale
t:general.typography	13	type_heading_line_height	range	Heading line height	120	Global typography scale
t:general.typography	14	type_button_weight	select	Button weight	700	Global typography scale
t:general.typography	15	type_button_letter_spacing	range	Button letter spacing	4	Global typography scale
t:general.typography	16	type_eyebrow_weight	select	Eyebrow weight	700	Global typography scale
t:general.typography	17	type_eyebrow_letter_spacing	range	Eyebrow letter spacing	8	Global typography scale
t:general.typography	18	type_text_transform_default	select	Default accent transform	uppercase	Global typography scale
Layout	1	site_width_mode	select	Site width mode	boxed	(none)
Layout	2	custom_site_content_width	range	Custom site width	1200	(none)
Layout	3	site_inset	range	Site inset	20	(none)
Product cards	1	product_card_show_vendor	checkbox	Show vendor	true	(none)
Product cards	2	product_card_show_sizes	checkbox	Show sizes available	false	(none)
Product cards	3	product_card_size_option_name	text	Size option name	Size	(none)
Product cards	4	product_card_image_hover	select	Image hover behaviour	second_image	(none)
Product cards	5	product_card_image_ratio	select	Image ratio	portrait	(none)
Product cards	6	product_card_enable_hover_zoom	checkbox	Enable image hover zoom	false	(none)
Product cards	7	product_card_action_layout	select	Product card action layout	below_info	(none)
Product cards	8	product_card_show_wishlist	checkbox	Show wishlist button	true	(none)
Product cards	9	product_card_text_alignment	select	Product card text alignment	left	(none)
Header	1	desktop_layout	select	Desktop layout	logo_left_nav_center_actions_right	(none)
Header	2	header_menu	link_list	Fallback desktop menu	null	(none)
Header	3	header_width_mode	select	Header content width	site	(none)
Header	4	header_custom_width	range	Custom header content width	1200	(none)
Header	5	nav_collapse_width	select	Mobile menu breakpoint	1100	(none)
Header	6	desktop_header_height	range	Desktop header height	82	(none)
Header	7	mobile_header_height	range	Mobile header height	74	(none)
Header	8	nav_text_size	range	Desktop navigation text size	12	(none)
Header	9	nav_text_weight	select	Desktop navigation text weight	800	(none)
Header	10	nav_letter_spacing	range	Desktop navigation letter spacing	1	(none)
Header	11	nav_text_transform	select	Desktop navigation text transform	uppercase	(none)
Header	12	nav_gap	range	Desktop navigation spacing	24	(none)
Header	13	header_background	color	Header background	#ffffff	(none)
Header	14	header_foreground	color	Header text/icon colour	#111111	(none)
Header	15	header_border	color	Header border colour	#e8e8e8	(none)
Header	16	show_bottom_border	checkbox	Show header bottom border	false	(none)
Header	17	header_shadow	select	Header shadow	none	(none)
Header	18	header_shadow_opacity	range	Shadow opacity	10	(none)
Header	19	header_shadow_offset_y	range	Shadow vertical offset	8	(none)
Header	20	header_shadow_blur	range	Shadow blur	24	(none)
Header	21	enable_sticky	checkbox	Sticky header	true	(none)
Header	22	transparent_header_mode	select	Transparent header	homepage	(none)
Header	23	transparent_header_colour_scheme	select	Transparent header colour scheme	light	(none)
Header	24	transparent_header_text_colour	color	Transparent header text/icon colour	#ffffff	(none)
Header	25	transparent_header_background_opacity	range	Transparent header background opacity	0	(none)
Header	26	transparent_header_border_colour	color	Transparent header border colour	#00000000	(none)
Header	27	transparent_header_solid_after_scroll	checkbox	Use solid header after scroll	true	(none)
Header	28	header_stack_scroll_behavior	select	Header stack scroll behavior	always_visible	(none)
Header	29	header_stack_scroll_threshold	range	Header stack fade threshold - desktop	40	(none)
Header	30	header_stack_scroll_threshold_mobile	range	Header stack fade threshold - mobile	24	(none)
Header	31	header_stack_transition	select	Header stack transition	fade_slide	(none)
Header	32	header_stack_transition_duration	range	Header stack transition duration	350	(none)
Header	33	header_stack_transition_easing	select	Header stack transition easing	smooth	(none)
Header	34	transparent_header_solid_background	color	Solid header background after scroll	null	(none)
Header	35	transparent_header_solid_text_colour	color	Solid header text/icon colour after scroll	null	(none)
Header	36	icon_size	range	Icon size	24	(none)
Header	37	icon_button_size_desktop	range	Desktop icon button size	44	(none)
Header	38	icon_button_size_mobile	range	Mobile icon button size	42	(none)
Header	39	desktop_icon_gap	range	Desktop icon spacing	0	(none)
Header	40	mobile_icon_gap	range	Mobile icon spacing	0	(none)
Header	41	show_account_icon	checkbox	Show account icon	true	(none)
Header	42	show_wishlist_icon	checkbox	Show wishlist icon	true	(none)
Header	43	wishlist_link	url	Wishlist link	null	(none)
Header	44	show_cart_icon	checkbox	Show cart icon	true	(none)
Header	45	cart_count_background	color	Cart count background	#000000	(none)
Header	46	cart_count_text	color	Cart count text	#ffffff	(none)
Header	47	cart_count_size	range	Cart count size	18	(none)
Header	48	cart_count_text_size	range	Cart count text size	10	(none)
Header	49	cart_count_offset_x	range	Cart count position X	4	(none)
Header	50	cart_count_offset_y	range	Cart count position Y	5	(none)
Header	51	show_country_selector	checkbox	Show country selector	true	(none)
Header	52	country_selector_style	select	Country selector style	full	(none)
Header	53	country_selector_show_currency	checkbox	Show currency code	false	(none)
Header	54	country_selector_background	color	Country selector background	null	(none)
Header	55	country_selector_border	color	Country selector border	null	(none)
Header	56	country_selector_text	color	Country selector text colour	null	(none)
Header	57	country_selector_height	range	Country selector height	48	(none)
Section headings	2	section_heading_eyebrow_size_desktop	range	Eyebrow size desktop	12	Eyebrow
Section headings	3	section_heading_eyebrow_size_mobile	range	Eyebrow size mobile	11	Eyebrow
Section headings	4	section_heading_eyebrow_weight	select	Eyebrow weight	600	Eyebrow
Section headings	5	section_heading_eyebrow_line_height	range	Eyebrow line height	100	Eyebrow
Section headings	6	section_heading_eyebrow_letter_spacing	range	Eyebrow letter spacing	2	Eyebrow
Section headings	7	section_heading_eyebrow_transform	select	Eyebrow text transform	uppercase	Eyebrow
Section headings	8	section_heading_eyebrow_colour	color	Eyebrow colour	#111111	Eyebrow
Section headings	9	section_heading_eyebrow_margin_bottom	range	Eyebrow margin bottom	8	Eyebrow
Section headings	11	section_heading_size_desktop	range	Heading size desktop	32	Heading
Section headings	12	section_heading_size_mobile	range	Heading size mobile	24	Heading
Section headings	13	section_heading_weight	select	Heading weight	700	Heading
Section headings	14	section_heading_line_height_desktop	range	Heading line height desktop	105	Heading
Section headings	15	section_heading_line_height_mobile	range	Heading line height mobile	110	Heading
Section headings	16	section_heading_letter_spacing	range	Heading letter spacing	0	Heading
Section headings	17	section_heading_transform	select	Heading text transform	uppercase	Heading
Section headings	18	section_heading_colour	color	Heading colour	#111111	Heading
Section headings	19	section_heading_max_width	range	Heading max width	760	Heading
Section headings	20	section_heading_margin_bottom	range	Heading margin bottom	12	Heading
Section headings	22	section_heading_text_size_desktop	range	Text size desktop	15	Text / subtitle
Section headings	23	section_heading_text_size_mobile	range	Text size mobile	14	Text / subtitle
Section headings	24	section_heading_text_weight	select	Text weight	400	Text / subtitle
Section headings	25	section_heading_text_line_height_desktop	range	Text line height desktop	150	Text / subtitle
Section headings	26	section_heading_text_line_height_mobile	range	Text line height mobile	145	Text / subtitle
Section headings	27	section_heading_text_letter_spacing	range	Text letter spacing	0	Text / subtitle
Section headings	28	section_heading_text_colour	color	Text colour	#555555	Text / subtitle
Section headings	29	section_heading_text_max_width	range	Text max width	680	Text / subtitle
Section headings	31	section_heading_alignment	select	Alignment	left	Layout
Section headings	32	section_heading_margin_bottom_desktop	range	Section heading margin bottom desktop	24	Layout
Section headings	33	section_heading_margin_bottom_mobile	range	Section heading margin bottom mobile	18	Layout
t:general.colors	1	background_color	color	Page background	#FFFFFF	(none)
t:general.colors	2	foreground_color	color	Text colour	#1a1a1a	(none)
t:general.colors	3	sand_color	color	Soft background	#f6f4ef	(none)
t:general.colors	4	muted_color	color	Muted text	#737373	(none)
t:general.colors	5	border_color	color	Border colour	#e8e8e8	(none)
t:general.colors	6	input_corner_radius	range	t:labels.input_corner_radius	0	(none)
```

---

## C. Current section settings inventory

Source: all `sections/*.liquid` schemas + template usage.

### Section summary (purpose, active/addable, complexity)

| Section file | Purpose | Active on homepage | Addable (preset) | Complexity | Settings | Block types | Grouping quality | Main confusion risks |
|---|---|---|---|---|---:|---:|---|---|
| `single-image-hero.liquid` | Editorial hero | Yes | Yes | High | 40 | 8 | Medium | Very large control set; spacing + typography + positioning overwhelm |
| `collection-cards.liquid` | Collection showcase cards | Yes | Yes | High | 49 | 1 | Medium | High setting volume, duplicated spacing controls, many card typography controls |
| `featured-collection.liquid` | Product list from collection | Yes | Yes | Medium-High | 33 | 0 | Good | Grid vs carousel + spacing + width + colours in one panel |
| `header.liquid` | Desktop nav blocks only | Via header-group | No | Medium | 2 | 3 | High | Mega panel ID mapping still brittle for merchants |
| `announcement-bar.liquid` | Utility announcement strip | Via header-group | Yes | Medium | 30 | 1 | Medium | Many mode-specific controls in one schema |
| `mega-menu.liquid` | Mega panel content system | Via header-group | Yes | Medium | 8 | 3 | Medium | ID coupling to Header block (`mega_menu_id`) |
| `mobile-menu.liquid` | Drawer content/settings | Via header-group | Yes | Medium | 10 | 4 | Good | Block UX mixed (footer links + country + social + text rows) |
| `cart.liquid` | Cart template content copy | Template | No | Low | 9 | 0 | Low | “Free shipping” label implies dynamic behavior |
| `footer.liquid` | Footer base | Via footer-group | No | Low | 2 | 0 | Low | Sparse but untranslated labels still possible |
| `three-card-hero.liquid` | 3-card editorial hero | No (current) | Yes | Medium | 23 | 1 | Good | Addable but dormant; may confuse if not launch-ready |
| `collections.liquid` | List collections grid | No (homepage) | Yes | Low | 2 | 0 | Low | Generic labels from translations |
| `custom-section.liquid` | Theme custom section container | No | Yes | Low | 1 | 1 | Low | Utility/developer section in merchant chooser |
| `404/article/blog/collection/page/password/product/search` | Template wrapper sections | No | No | Low | 0 | 0 | N/A | No editor complexity |

### Section setting inventory (full, generated)

Columns: `Section | Order | ID | Type | Label | Default | Current group/header`

```text
(see generated inventory excerpt below)
SETTING	sections/announcement-bar.liquid	Announcement bar	1	enable_announcement_bar	checkbox	Show announcement bar	true	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	2	mode	select	Mode	static	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	3	bar_width	select	Bar width	full	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	4	custom_width	range	Custom width	1200	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	5	background_color	color	Background colour	#f6f4ef	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	6	text_color	color	Text colour	#111111	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	7	border_color	color	Border colour	#e8e8e8	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	8	show_bottom_border	checkbox	Show bottom border	false	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	9	height_desktop	range	Height desktop	40	(none)
SETTING	sections/announcement-bar.liquid	Announcement bar	10	height_mobile	range	Height mobile	36	(none)
... (full section setting inventory extracted in this audit run)
```

Note: full generated section setting inventory is based on schema extraction and was used to derive recommendations below.

---

## D. Current block settings inventory

### Block complexity summary

| Section | Block type | Purpose | Settings | Grouping quality | Confusion risk |
|---|---|---|---:|---|---|
| Announcement bar | `announcement_item` | announcement message/link/visibility | 6 | Good | Low |
| Collection cards | `collection` | per-card overrides + badge + link behavior | 14 | Medium | Medium |
| Header | `base_item` / `dropdown_item` / `mega_item` | desktop nav items | 7 / 10 / 8 | Good | Medium (ID mapping for mega) |
| Mega menu | `mega_parent` / `linklist_child` / `image_tile_child` | panel/column/tile composition | 2 / 8 / 8 | Medium | High (ID coupling) |
| Mobile menu | `footer_link` / `country_selector` / `text_row` / `social_link` | drawer utility blocks | 4 / 1 / 2 / 3 | Good | Medium |
| Single image hero | `eyebrow`, `heading`, `paragraph`, `button`, `button_group`, `custom_html`, `custom_liquid`, `image_pin` | content system | 10/12/10/10/12/1/2/10 | Medium | High (very advanced) |
| Three-card hero | `hero_card` | card content and media | 8 | Good | Low-Medium |

### Block setting inventory (full, generated)

Columns: `Section | Block type | Order | ID | Type | Label | Default | Current group`

```text
BLOCK_SETTING	sections/announcement-bar.liquid	Announcement bar	announcement_item	Announcement item	1	prefix	text	Prefix text	null	(none)
BLOCK_SETTING	sections/announcement-bar.liquid	Announcement bar	announcement_item	Announcement item	2	text	richtext	Text	<p>Free express shipping on all UAE orders</p>	(none)
BLOCK_SETTING	sections/announcement-bar.liquid	Announcement bar	announcement_item	Announcement item	3	link	url	Link	null	(none)
... (full block setting inventory extracted in this audit run)
```

---

## E. Recommended global Theme settings architecture

Recommended global group order:
1. Layout
2. Colours
3. Typography
4. Section headings
5. Header
6. Product cards
7. Cart
8. Advanced (optional)

Group-level recommendations:
- `Brand`: keep; move below `Header` or keep near top with improved descriptions.
- `Typography`: keep global base only; keep legacy fallback setting but mark as compatibility.
- `Section headings`: keep as global visual style owner for standard section heading blocks.
- `Header`: split with internal headers:
  - Layout
  - Navigation typography
  - Header appearance
  - Transparent + scroll behavior
  - Icons/actions
  - Country selector
  - Advanced (shadow fine controls)
- `Product cards`: keep minimal and global.
- `Colours`: keep token-level only; avoid component colors here.

---

## F. Recommended section settings architecture

Standard section schema order:
1. Content
2. Layout
3. Section heading (content fields only)
4. Cards / Items / Products
5. Media
6. Colours
7. Spacing
8. Advanced

Special cases:
- `Header`: block/content-only by design, global style in Theme settings > Header.
- `Announcement bar`: utility component; can keep local text typography controls.
- `Single image hero`: retains local block typography/positioning (special section).

---

## G. Per-section recommended grouping changes

### 1. Header (`sections/header.liquid`)
- Keep block model.
- Improve block copy: emphasize “Desktop nav item”, “Dropdown item”, “Mega trigger item”.
- Add better help text for `mega_menu_id` dependency.

### 2. Announcement bar
- Keep settings local.
- Reorder into:
  - Content and mode
  - Width and colours
  - Typography
  - Carousel
  - Marquee
  - Advanced visibility

### 3. Mobile menu
- Keep structure; add clear subgroup headers:
  - Drawer content
  - Drawer style
  - Footer blocks
- Move “country selector label” block guidance into help text.

### 4. Mega menu
- Keep base settings small.
- Strongly label ID-coupled fields with explicit mapping guidance.

### 5. Single image hero
- Keep block-level controls.
- Add stronger headers and helper text to separate basic content edits from advanced spacing/position controls.
- Move all padding/margin matrices under explicit `Advanced spacing` group (already mostly done).

### 6. Collection cards
- Keep card typography controls local.
- Add clearer separation between:
  - Section heading content
  - Card behavior/layout
  - Card typography
  - Spacing
- Consider hiding/deprioritizing seldom-used spacing controls in docs/workflow.

### 7. Featured collection
- Current grouping is mostly good.
- Minor copy improvements for carousel vs grid mode dependencies.

### 8. Cart and Footer
- Keep simple.
- Rename misleading shipping label language (`free shipping` wording implies dynamic logic).

### 9. Three-card hero (addable/dormant)
- Keep addable only if launch-intent exists.
- If dormant, mark in docs as optional/deferred to reduce merchant confusion.

---

## H. Settings to remove / move / merge (recommendations only)

### Keep as-is (high confidence)
- Global `Product cards` group.
- Global `Section headings` group.
- Header scroll/fade settings.
- Featured Collection content/layout controls.

### Move to global (candidate)
- None immediate without behavioral review. Most obvious typography ownership has already been corrected.

### Remove or merge (future candidates)
- Header shadow fine-tuning (`header_shadow_opacity`, `header_shadow_offset_y`, `header_shadow_blur`) -> keep but move to `Advanced` subsection.
- Some large spacing matrices in section schemas could be merged/simplified in a later UX phase.

### Rename / reword priorities
1. Translation-key labels in generic sections (`t:...`) to merchant-readable copy.
2. `show_shipping_message` and `shipping_message` copy to remove dynamic implication.
3. Any ID-coupled setting labels (`mega_menu_id`, `parent_id`) to include “must match” guidance.

---

## I. Settings needing clearer labels/help text

Highest impact list:
1. `header_menu` (clarify fallback-only behavior).
2. `mega_menu_id` and `parent_id` (explicit mapping instructions).
3. `close_delay` (technical; explain why merchant should care).
4. `show_shipping_message` / `shipping_message` in cart (clarify static text).
5. `type_primary_font` (legacy compatibility meaning).
6. Dense spacing controls (state when to leave at zero).

---

## J. High-risk settings to leave alone now

Do not restructure behavior in first pass:
1. Header fade/scroll thresholds and transition controls.
2. Country selector behavior settings.
3. Mega panel ID workflow logic (only improve copy in phase 1).
4. Single Image Hero block architecture.
5. Product card global settings behavior.

---

## K. Proposed patch phases

### Phase 1 (lowest risk): Reorder/group/help text only
- Files: `config/settings_schema.json`, key section schema blocks (`header`, `announcement-bar`, `mobile-menu`, `mega-menu`, `collection-cards`, `featured-collection`, `cart`, `footer`, `single-image-hero`, `three-card-hero`), docs.
- Changes: header/paragraph grouping, order normalization, label/help text cleanup only.
- Risk: Low.
- QA: Theme editor navigation sanity, no schema errors, no behavior checks needed beyond load.
- Commit message: `Improve Theme Editor grouping and labels across theme settings and sections`

### Phase 2: Remove duplicated local style controls where global already owns style
- Files: selected section schemas and CSS variable bridges.
- Changes: only where duplicate controls remain and ownership is clear.
- Risk: Medium.
- QA: Visual regression + setting migration sanity.
- Commit message: `Simplify duplicated section controls under global typography/section heading ownership`

### Phase 3: High-complexity section simplification
- Focus: `single-image-hero`, `collection-cards`, `header` advanced buckets.
- Changes: collapse advanced controls into explicit advanced groups, reduce default visible noise.
- Risk: Medium-High.
- QA: Full editor and storefront UX regression.
- Commit message: `Reduce advanced control noise in high-complexity sections`

### Phase 4: Merchant guide and onboarding docs
- Files: `THEME_SETTINGS_REGISTRY.md`, `THEME_QA_CHECKLIST.md`, `THEME_ARCHITECTURE_MAP.md`, onboarding docs.
- Risk: Low.
- QA: Internal walkthrough.
- Commit message: `Document final settings architecture and merchant setup flow`

---

## L. Recommended first implementation prompt

Use this prompt for Phase 1:

1. Reorder and regroup Theme settings and section schemas using header/paragraph entries only.
2. Do not change setting IDs.
3. Do not remove settings.
4. Do not change CSS/JS behavior.
5. Improve labels/help text for high-confusion settings only.
6. Keep all existing defaults.
7. Run `git diff --check`, `shopify theme check`, and JSON/schema parse checks.

---

## Appendix: source-derived section overview

```text
SECTION	sections/404.liquid	t:general.404	false	0	0
SECTION	sections/announcement-bar.liquid	Announcement bar	true	30	1
SECTION	sections/article.liquid	t:general.article	false	0	0
SECTION	sections/blog.liquid	t:general.blog	false	0	0
SECTION	sections/cart.liquid	CNVRT cart	false	9	0
SECTION	sections/collection-cards.liquid	Collection cards	true	49	1
SECTION	sections/collection.liquid	t:general.collection	false	0	0
SECTION	sections/collections.liquid	t:general.collections_grid	true	2	0
SECTION	sections/custom-section.liquid	t:general.custom_section	true	1	1
SECTION	sections/featured-collection.liquid	Featured collection	true	33	0
SECTION	sections/footer.liquid	t:general.footer	false	2	0
SECTION	sections/header.liquid	CNVRT header	false	2	3
SECTION	sections/hello-world.liquid	Hello World	true	0	0
SECTION	sections/mega-menu.liquid	Mega menu	true	8	3
SECTION	sections/mobile-menu.liquid	Mobile Menu	true	10	4
SECTION	sections/page.liquid	t:general.page	false	0	0
SECTION	sections/password.liquid	t:general.password	false	0	0
SECTION	sections/product.liquid	t:general.product	false	0	0
SECTION	sections/search.liquid	t:general.search	false	0	0
SECTION	sections/single-image-hero.liquid	Single Image Hero	true	40	8
SECTION	sections/three-card-hero.liquid	3-Card Hero	true	23	1
```

