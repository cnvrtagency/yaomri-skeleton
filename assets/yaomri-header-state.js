(() => {
  const GROUP_CLASS = 'yaomri-header-stack';
  const GROUP_CLASS_CNVRT = 'cnvrt-header-stack';
  const GROUP_OVERLAY_CLASS = 'yaomri-header-stack--overlay';
  const GROUP_OVERLAY_CLASS_CNVRT = 'cnvrt-header-stack--overlay';
  const GROUP_FADE_CLASS = 'yaomri-header-stack--fade';
  const GROUP_SLIDE_CLASS = 'yaomri-header-stack--slide';
  const GROUP_FADE_SLIDE_CLASS = 'yaomri-header-stack--fade-slide';
  const GROUP_FADE_CLASS_CNVRT = 'cnvrt-header-stack--fade';
  const GROUP_SLIDE_CLASS_CNVRT = 'cnvrt-header-stack--slide';
  const GROUP_FADE_SLIDE_CLASS_CNVRT = 'cnvrt-header-stack--fade-slide';
  const HIDDEN_CLASS = 'is-hidden-after-scroll';
  const SCROLL_BEHAVIOR_ALWAYS_VISIBLE = 'always_visible';
  const SCROLL_BEHAVIOR_FADE_AWAY = 'fade_away_after_scroll';
  const MOBILE_BREAKPOINT = '(max-width: 749px)';
  const DEFAULT_SCROLL_THRESHOLD = 40;
  const DEFAULT_SCROLL_THRESHOLD_MOBILE = 24;
  const DEFAULT_STACK_TRANSITION = 'fade_slide';
  const DEFAULT_STACK_TRANSITION_DURATION = 350;
  const MIN_STACK_TRANSITION_DURATION = 100;
  const MAX_STACK_TRANSITION_DURATION = 1200;
  const DEFAULT_STACK_TRANSITION_EASING = 'smooth';
  const STACK_TRANSITION_EASING_MAP = {
    ease: 'ease',
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
    snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear'
  };

  const parseIntSetting = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value));

  const cleanTransitionClass = (group, transitionClasses) => {
    group.classList.remove(
      GROUP_FADE_CLASS,
      GROUP_SLIDE_CLASS,
      GROUP_FADE_SLIDE_CLASS,
      GROUP_FADE_CLASS_CNVRT,
      GROUP_SLIDE_CLASS_CNVRT,
      GROUP_FADE_SLIDE_CLASS_CNVRT
    );
    if (transitionClasses) {
      group.classList.add(transitionClasses.primary, transitionClasses.secondary);
    }
  };

  const isMobileViewport = () => window.matchMedia(MOBILE_BREAKPOINT).matches;

  const resolveTransitionEasing = (value) =>
    STACK_TRANSITION_EASING_MAP[value] || STACK_TRANSITION_EASING_MAP[DEFAULT_STACK_TRANSITION_EASING];

  const hasOpenOverlayInteraction = () => {
    const megaOpen = document.querySelector(
      '.cnvrt-mega-panels.is-open, .yaomri-mega-panels.is-open, .cnvrt-mega__item.is-open, .yaomri-mega__item.is-open'
    );
    if (megaOpen) return true;

    const drawerOpen =
      document.querySelector('.cnvrt-drawer.is-open, .mdrawer.is-open') ||
      document.documentElement.classList.contains('cnvrt-drawer-open') ||
      document.documentElement.classList.contains('mdrawer-open');
    if (drawerOpen) return true;

    return false;
  };

  const resolveHeaderDataAttr = (header, keys) => {
    for (const key of keys) {
      if (header.dataset[key]) return header.dataset[key];
    }

    return null;
  };

  const findStackGroup = (header) => {
    if (!header) return null;
    const explicitGroup = header.closest('[data-yaomri-header-group], [data-cnvrt-header-group]');
    if (explicitGroup) return explicitGroup;

    const themedGroup = header.closest('.shopify-section-group-header-group');
    if (themedGroup) return themedGroup;

    const headerSection = header.closest('[id^="shopify-section-"]') || header.parentElement;
    const announcement = document.querySelector('.cnvrt-announcement, .yaomri-announcement');
    const announcementSection =
      announcement && (announcement.closest('[id^="shopify-section-"]') || announcement.parentElement);

    if (!announcementSection) return headerSection?.parentElement || null;

    const headerAncestors = [];
    let current = headerSection;
    while (current) {
      headerAncestors.push(current);
      current = current.parentElement;
      if (current === document.body || current === document.documentElement) break;
    }

    current = announcementSection;
    while (current) {
      if (headerAncestors.includes(current)) return current;
      current = current.parentElement;
      if (current === document.body || current === document.documentElement) break;
    }

    return headerSection?.parentElement || null;
  };

  const resolveTransitionClass = (value) => {
    switch (value) {
      case 'fade':
        return { primary: GROUP_FADE_CLASS, secondary: GROUP_FADE_CLASS_CNVRT };
      case 'slide':
        return { primary: GROUP_SLIDE_CLASS, secondary: GROUP_SLIDE_CLASS_CNVRT };
      case 'fade_slide':
      default:
        return { primary: GROUP_FADE_SLIDE_CLASS, secondary: GROUP_FADE_SLIDE_CLASS_CNVRT };
    }
  };

  const applyState = (header, group) => {
    if (!header) return;

    const transparentActive = header.dataset.transparentActive === 'true';
    const stickyEnabled =
      header.classList.contains('cnvrt-header--sticky-enabled') ||
      header.classList.contains('yaomri-header--sticky-enabled');
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    const stackBehavior = resolveHeaderDataAttr(header, [
      'headerStackScrollBehavior',
      'cnvrtHeaderStackScrollBehavior'
    ]) || SCROLL_BEHAVIOR_ALWAYS_VISIBLE;
    const scrollThresholdRaw = resolveHeaderDataAttr(header, [
      'headerStackScrollThreshold',
      'cnvrtHeaderStackScrollThreshold'
    ]);
    const scrollThresholdMobileRaw = resolveHeaderDataAttr(header, [
      'headerStackScrollThresholdMobile',
      'cnvrtHeaderStackScrollThresholdMobile'
    ]);
    const stackTransition = resolveHeaderDataAttr(header, [
      'headerStackTransition',
      'cnvrtHeaderStackTransition'
    ]) || DEFAULT_STACK_TRANSITION;
    const stackTransitionDurationRaw = resolveHeaderDataAttr(header, [
      'headerStackTransitionDuration',
      'cnvrtHeaderStackTransitionDuration'
    ]);
    const stackTransitionEasingRaw = resolveHeaderDataAttr(header, [
      'headerStackTransitionEasing',
      'cnvrtHeaderStackTransitionEasing'
    ]) || DEFAULT_STACK_TRANSITION_EASING;
    const stackTransitionDuration = clampNumber(
      parseIntSetting(stackTransitionDurationRaw, DEFAULT_STACK_TRANSITION_DURATION),
      MIN_STACK_TRANSITION_DURATION,
      MAX_STACK_TRANSITION_DURATION
    );
    const stackTransitionEasing = resolveTransitionEasing(stackTransitionEasingRaw);
    const scrollThreshold = isMobileViewport()
      ? parseIntSetting(scrollThresholdMobileRaw, DEFAULT_SCROLL_THRESHOLD_MOBILE)
      : parseIntSetting(scrollThresholdRaw, DEFAULT_SCROLL_THRESHOLD);
    const isPastThreshold = window.scrollY > clampNumber(scrollThreshold, 0, 200);

    const shouldHideStack = (
      stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY &&
      isPastThreshold &&
      !hasOpenOverlayInteraction()
    );
    const isTransparentHeader = transparentActive && solidAfterScroll;
    const shouldApplyScrolledVisual =
      isTransparentHeader && !(stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY && shouldHideStack);

    if (group) {
      group.classList.add(GROUP_CLASS, GROUP_CLASS_CNVRT);
      group.style.setProperty('--cnvrt-header-stack-transition-duration', `${stackTransitionDuration}ms`);
      group.style.setProperty('--cnvrt-header-stack-transition-easing', stackTransitionEasing);
      group.style.setProperty('--yaomri-header-stack-transition-duration', `${stackTransitionDuration}ms`);
      group.style.setProperty('--yaomri-header-stack-transition-easing', stackTransitionEasing);
      const isStickyOverlay = transparentActive && stickyEnabled;
      group.classList.toggle(GROUP_OVERLAY_CLASS, isStickyOverlay);
      group.classList.toggle(GROUP_OVERLAY_CLASS_CNVRT, isStickyOverlay);
      const transitionClass = resolveTransitionClass(stackTransition);
      cleanTransitionClass(
        group,
        stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY ? transitionClass : null
      );
      group.classList.toggle(HIDDEN_CLASS, shouldHideStack);
      if (stackBehavior === SCROLL_BEHAVIOR_ALWAYS_VISIBLE) {
        group.classList.remove(HIDDEN_CLASS);
      }
    }

    if (shouldApplyScrolledVisual) {
      header.classList.toggle('is-scrolled', isPastThreshold);
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  const mount = () => {
    if (document.body.dataset.yaomriHeaderStateInit === 'true') return;

    let rafId = null;
    const queueApply = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const activeHeader = document.querySelector('.cnvrt-header, .yaomri-header');
        if (!activeHeader) return;
        const group = findStackGroup(activeHeader);
        applyState(activeHeader, group);
      });
    };

    queueApply();
    window.addEventListener('scroll', queueApply, { passive: true });
    window.addEventListener('resize', queueApply);
    document.addEventListener('click', queueApply, { passive: true });
    document.addEventListener('touchstart', queueApply, { passive: true });
    document.addEventListener('keyup', queueApply);

    document.addEventListener('shopify:section:load', queueApply);
    document.addEventListener('shopify:section:reorder', queueApply);
    document.addEventListener('shopify:section:select', queueApply);
    document.addEventListener('shopify:section:unload', queueApply);
    document.addEventListener('shopify:block:select', queueApply);

    document.body.dataset.yaomriHeaderStateInit = 'true';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
