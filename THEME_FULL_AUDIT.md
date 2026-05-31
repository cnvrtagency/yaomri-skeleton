# CNVRT Theme Full Audit

Date: 2026-05-30
Branch: `skeleton-rebuild`
Scope: Full theme/code/site audit (post header-stack patch).

## A. Executive summary

The header-stack patch is integrated and stable: announcement and header remain standalone sections inside a shared wrapper (`[data-cnvrt-header-group]`) and the stack-level hide/show controls are owned there. The repo is generally coherent and launchable for internal QA, but there are still clear areas to strengthen before a sellable CNVRT-facing release.

Current state:
1. No theme-check blockers.
2. Reusable section-header system is currently deferred; orphaned assets were removed from runtime use.
3. Major architectural debt remains in naming and section ownership patterns (CNVRT-branded class system and mixed responsive conventions).
4. Homepage is minimal and predictable (`templates/index.json` has only `single-image-hero` and `collection-cards` in this snapshot).
5. Header/mobile drawer/mega menu stack behavior is now feature-complete for fade-away, mobile/desktop thresholds, easing, and duration, including solid-state suppression in fade-away mode.
6. Namespace migration is now complete through the remaining alias phases: announcement (`cnvrt-announcement*`/`yab-*`), collection cards (`cc-*`), Single Image Hero (`cnvrt-single-hero*`/`ysh-*`), Header stack (`cnvrt-header*`/`cnvrt-header-stack*`), Mega menu (`cnvrt-mega*`/`ym-*`), mobile drawer (`cnvrt-drawer*`), cart (`cnvrt-cart*`), footer (`site-footer`/`footer__*`) and 3-card hero (`cnvrt-three-hero*`/`yth-*`) with compatibility aliasing to CNVRT namespaces.
7. Controlled cleanup pass completed: runtime selectors now resolve CNVRT-first with legacy fallbacks, and alias-removal is explicitly deferred to avoid regressions.
8. Legacy removal Phase 1 (cart markup only) is complete: `sections/cart.liquid` now emits CNVRT cart classes only; cart CSS/JS legacy fallbacks are intentionally retained for one release.
9. Legacy removal Phase 2 (footer markup only) is complete: `sections/footer.liquid` now emits CNVRT footer classes only; footer CSS legacy fallback selectors are intentionally retained for one release.
10. Legacy removal Phase 3 (announcement markup only) is complete: `sections/announcement-bar.liquid` now emits CNVRT announcement classes only; announcement CSS/JS selector fallbacks and `--cnvrt-announcement-*` variable fallbacks are intentionally retained for one release.
11. Legacy removal Phase 4 (Collection Cards markup only) is complete: `sections/collection-cards.liquid` now emits CNVRT collection-card classes only; collection CSS/JS/data selector fallbacks and `--cnvrt-collection-*` variable fallbacks are intentionally retained for one release.
12. Legacy removal Phase 5 (Single Image Hero markup only) is complete: `sections/single-image-hero.liquid` now emits CNVRT single-hero classes only; hero CSS selector fallbacks and `--cnvrt-single-hero-*` variable fallbacks are intentionally retained for one release.
13. Three Card Hero section files exist and have presets, but the section is currently dormant in this store snapshot (not referenced in `templates/` or `config/settings_data.json`).
14. Legacy class alias cleanup is now complete for active runtime markup/CSS/JS selectors; CNVRT classes are primary runtime hooks.
15. Legacy-prefixed runtime remnants are limited to deferred icon classes (`cnvrt-icon*`), utility skip-link class (`cnvrt-skip-link`), and compatibility variable fallbacks.
16. Global typography system is now implemented with CNVRT font families/tokens, and Single Image Hero paragraph weight applies correctly to rich text paragraph tags; visual differences still depend on selected font support for specific weights.

## B. Critical launch blockers

1. No critical runtime blockers were found by theme check, but there are launch readiness gaps that should be addressed before release as a premium theme.
2. Confirm deferred reusable systems are either fully removed or actively reintroduced before packaging (`section-header` system is currently deferred in docs and inactive).
3. Some sections still rely on hardcoded/brand-specific class/token systems that are not yet migration-ready for broad distribution.
4. No end-to-end automated accessibility test harness is present for modal drawer focus trapping, mobile nav keyboard behavior, and announcement controls.
5. `layouts` and section-specific assets are loaded per section with potential duplication; this is manageable now but may become a perf issue as content sections grow.

## C. High-priority fixes

1. Keep deferred section-header assets out of active runtime paths and document clear migration criteria before reactivation.
2. Continue hardening class/naming migration planning before external theme package distribution:
   - replace or aliases `cnvrt-*`/`yh-*` in future updates
   - preserve data attributes for JS compatibility.
3. Audit and align responsive breakpoints with `THEME_RESPONSIVE_SYSTEM.md` (target contract: mobile<=749, tablet 750-989, desktop>=990) in all remaining section-level CSS.
4. Add focused accessibility verification cases for:
   - announcement marquee controls in reduced-motion
   - mobile drawer focus restore and aria-expanded states
   - skip navigation and keyboard ordering.
5. Add explicit documentation and QA notes for max-width assumptions on large-screen layouts in header/nav/hero sections.

## D. Medium-priority cleanup

1. Reduce mixed prefix friction while preserving current UI:
   - legacy prefixes are still present as compatibility aliases: `cnvrt-`, `ysh-`, `yh-`, `ym-`, `yab-`, `cnvrt-drawer-`, `cc-`, `yth-`.
2. Consolidate asset ownership for header/nav interaction logic and avoid duplicated state toggles in both JS and CSS for similar features.
3. Add schema comment consistency and help text for global/section settings with legacy values that remain hidden.
4. Replace repeated inline style declarations with centralized variables where applicable.
5. Add performance-focused audits for image sizes/format usage in product and collection-heavy sections.

## E. Performance / speed quick wins

1. Global loading model
   - `layout/theme.liquid` loads `critical.css` (preload) and `cnvrt-base.css` globally.
   - Section-specific CSS/JS are loaded via `stylesheet_tag` and deferred scripts in sections.
2. Global vs section load map
   - `sections/announcement-bar.liquid`: `announcement-bar.css` + `announcement-bar.js`
   - `sections/header.liquid`: `cnvrt-header.css`, `mega-menu.css`, `mega-menu.js`, `cnvrt-header-state.js`
   - `sections/collection-cards.liquid`: `section-collection-cards.css`, `section-collection-cards.js`
   - `sections/mobile-menu.liquid`: `mobile-drawer.css`, `mobile-drawer.js`
   - `sections/single-image-hero.liquid`: `section-single-image-hero.css`
   - `sections/three-card-hero.liquid`: `section-three-card-hero.css`
   - `sections/cart.liquid`: `cnvrt-cart.css`, `cnvrt-cart.js`
3. Potential wins
   - Consolidate header/nav JS responsibilities into one small module if future sections add additional scroll/interaction controllers.
   - Audit and eliminate unused selectors/assets before publish.
   - Defer non-essential scripts in non-interactive templates where practical.
4. No blocking heavy issues found; no blocking console-level JS exceptions from theme check.

## F. Shopify schema quality audit

1. Range validation
   - All range settings are within safe Shopify constraints (3–101 steps and unit <=3 chars).
   - Header-stack settings now include:
     - `header_stack_scroll_threshold` (0-200, step 2)
     - `header_stack_scroll_threshold_mobile` (0-200, step 2)
     - `header_stack_transition_duration` (100-1200, step 50, ms)
2. Header schema quality (core)
   - Added and wired:
     - `header_stack_scroll_behavior`
     - `header_stack_scroll_threshold`
     - `header_stack_scroll_threshold_mobile`
     - `header_stack_transition`
     - `header_stack_transition_easing`
     - `header_stack_transition_duration`
   - fallback sanitization is present in `sections/header.liquid`.
3. Potential schema issues for future cleanup
   - Some sections have large setting surfaces but no obvious stale values.
   - `settings_schema.json` is stable for current feature set.
4. Recommended schema tasks
   - Audit for repeated semantic overlap between section and theme settings.
   - Add clearer cross-references in docs between theme behavior settings and section outputs where merchant confusion can happen.

## G. Responsive system compliance report

1. Contract target
   - mobile: `<=749px`
   - tablet: `750px–989px`
   - desktop: `>=990px`
   - large desktop: `>=1200px`
2. Compliance status
   - Confirmed in `THEME_RESPONSIVE_SYSTEM.md` and implemented for the header stack threshold split and menu behaviour.
   - `sections/header.liquid` and `assets/cnvrt-header.css` now use a consistent desktop boundary at `>= 990px` and mobile boundary at `<= 989px` for shared header-stack/desktop-mobile rendering.
3. Drift findings
   - Mixed breakpoint usage still exists across the theme (`1024/1360` plus `1100`), but the former `989/990` contract-surface mismatch has been cleaned up.
   - Single Image Hero has robust mobile width clamp (`<=749px`) and is generally aligned.
   - Announcement bar media handling at `<=989px` is close to contract, but should be reviewed with actual product content.
4. Top issues to monitor
   - Horizontal overflow checks at `430`, `390`, `360` should be made part of mandatory regression for all templates.
   - Avoid implicit section-level overflow clipping when hidden headers are active.

## H. Header/navigation risk report

1. Ownership and structure
- Shared wrapper in `layout/theme.liquid` remains correct:
  - `<div class="cnvrt-header-stack cnvrt-header-stack" data-cnvrt-header-group data-cnvrt-header-group>`
     - contains announcement-bar, header, mega-menu, mobile-menu (via `sections 'header-group'`).
2. Fade-away behavior
- JS (`assets/cnvrt-header-state.js`) now:
  - uses desktop/mobile thresholds based on viewport
  - suppresses `header.is-scrolled` while hide is active in fade-away mode
  - keeps always-visible behavior unchanged.
- `cnvrt` aliases are now supported in the same ownership pipeline:
  - JS reads both legacy `data-header-stack-*` and `data-cnvrt-header-stack-*`.
  - CSS and JS recognise both `cnvrt-header-stack*` and `cnvrt-header-stack*`.
  - `--cnvrt-header-stack-transition-*` are primary timing variables with `--cnvrt-*` compatibility fallback.
  - CSS uses stack-level transition vars + opacity+transform only, no max-height collapse.
3. Solid-after-scroll interaction
   - Solid state is prevented during hide/hidden transitions in fade-away mode to avoid flash.
   - Transparent state visuals and color switching are still active in always-visible mode.
4. Interaction safety
   - Basic overlay safety is present: open mega menu or mobile drawer keeps stack from immediately hiding.
5. Mega/drawer/caraousel risks
   - Mobile drawer and mega menu JS run from separate files and now accept legacy + CNVRT aliases; future cleanup still needs careful de-aliasing plans.
   - Announcement carousel remains independent and should be re-tested if stack hide interactions are altered.

## I. Homepage section audit

1. Homepage sections in `templates/index.json`
   - `single-image-hero` (`single_image_hero`)
   - `collection-cards` (`collection_cards_aXzpjd`)
2. `single-image-hero`
   - Strong typography/spacing control surface.
   - Desktop/mobile dual mode with good asset control.
   - Needs periodic QA for width behavior at 1024, 768, and 430.
3. `collection-cards`
   - Contains local heading/metadata block system with carousel/grid.
   - Strong section-level controls and responsive card sizing.
   - JS handles arrows and scroll behavior.
4. Homepage launch readiness
   - Minimal current homepage means low structural risk but limited merchandising depth.
   - Missing extra hero/content composition coverage for broader merchant use-cases.
5. Three Card Hero activation state
   - `sections/three-card-hero.liquid` and `assets/section-three-card-hero.css` exist.
   - The section is currently not active in templates/settings data.
   - It remains addable in Theme Editor via section presets.

## J. Accessibility report

1. Strengths
   - Multiple icon links have explicit `aria-label`.
   - Many controls include semantic roles in cart and heading sections.
   - Buttons and links use clear labels in menu and announcement interactions.
2. Medium issues
   - Explicit "skip to content" landmark pattern is now present in layout; confirm regression on future structural changes.
   - Some decorative placeholders and rich text blocks need periodic validation for descriptive alt/assistive behavior.
   - Reduced-motion is respected for header stack and some section transitions; verify consistency across non-header animations.
3. Improvements to prioritize
   - Keep focus-visible verification and focus restoration in mobile drawer open/close.
   - Ensure announcement controls do not become trapped when hidden or rapidly changing.
   - Add explicit aria-live strategy for additional dynamic text surfaces as features expand.
4. No critical accessibility regression detected in static review, but no automated WCAG pass was run.

## K. Class naming migration plan

1. Prefix inventory (large-theme presence)
   - `cnvrt-`: very high concentration (core styling, all major nav/header/hero components)
  - `ysh-`: Single Image Hero variable system (`--cnvrt-single-hero-*`) retained as compatibility fallback after Phase 5 markup cleanup
   - `yh-`: header-level tokens/variables
  - `ym-`: header/inline variables (paired with header migration work; mega-menu still pending)
  - `yab-`: announcement local variants (already paired with `cnvrt-announcement*` in phase 1 aliases)
  - `cc-`: collection cards system (phase 2 alias migration complete; phase 4 markup cleanup complete with runtime fallbacks retained)
   - `cnvrt-drawer-`: mobile drawer system (now compatibility-only alongside `cnvrt-drawer*`)
2. Current risk profile
   - These prefixes are functionally stable but brand-specific for distribution readiness.
   - Blind global renaming would break section/JS/css selectors immediately.
3. Recommended migration approach
- Introduce neutral aliases where feasible, then migrate per section:
  1. Add dual selectors in CSS/JS (`cnvrt-*` + `cnvrt-*`) or data attributes to preserve behavior.
  2. Update sections one-at-a-time starting with low-traffic utility sections.
     3. Announcement alias migration is complete and markup cleanup is complete; selector/variable fallbacks remain for one release.
     4. Header stack aliases are now complete (phase 4) and documented.
     5. Mega menu aliases are now complete (phase 5) and documented.
     5. After migration and QA, remove aliases.
4. Preserve data attributes
 - Keep `[data-cnvrt-header-group]`, `[data-cnvrt-header-group]`, and migrate intentionally with compatibility shim.
5. Suggested end-state convention
  - Use `cnvrt-` for new code, keep legacy shims during migration.

## L. What not to touch yet

1. Do not edit `sections/header-group.json` ordering unless required by merchant request (announcement+header stack ownership is correct).
2. Do not remove header/mobile overlay interaction guards in JS until focused navigation QA is complete.
3. Do not perform any destructive cleanup before creating a migration-safe mapping for all `cnvrt-*` selectors.
4. Avoid redesigning collection cards before performance and naming migration are synchronized.

## M. Recommended branch/commit strategy for cleanup

1. Keep current branch for the header-stack control stabilization.
2. Create a dedicated cleanup branch for naming migration and remove/alias prefixes progressively.
3. Use atomic commits per subsystem in this order:
   1) Asset hygiene (orphan removal + unused files)
   2) Responsive alignment sweep
   3) Accessibility hardening
   4) Naming migration per section module (`collection-cards`, `cart`, `header`)
   5) Performance consolidation
4. Before merge, run `shopify theme check`, manual mobile/desktop regression list, and this full audit again.

## Suggested next 10 Codex tasks (in order)

1. Keep the deferred section-header system state documented and only reintroduce with owning section migration.
2. Confirm ownership and usage of `assets/icon-account.svg`.
3. Keep skip-link and landmark regression checks in automated QA checkpoints.
4. Audit and fix remaining breakpoint mismatches against `THEME_RESPONSIVE_SYSTEM.md` in all section-level CSS.
5. Extend accessibility checks for mobile drawer focus/close behavior and keyboard navigation.
6. Add lightweight runtime metric instrumentation for hero and carousel load interactions.
7. Implement compatibility alias layer for class migration (`cnvrt-*` -> neutral alias).
8. Document the alias mapping in `THEME_SETTINGS_REGISTRY.md` and migration notes in `CNVRT_BUILD_SPEC.md`.
9. Migrate Header Core, Mega Menu, and Mobile Drawer to neutral namespace aliases while preserving interaction contracts.
10. Run second full audit pass and prepare launch readiness report for internal sign-off.
