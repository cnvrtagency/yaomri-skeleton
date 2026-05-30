(() => {
  const GROUP_CLASS = 'yaomri-header-stack';
  const GROUP_OVERLAY_CLASS = 'yaomri-header-stack--overlay';
  const GROUP_FADE_CLASS = 'yaomri-header-stack--fade';
  const GROUP_SLIDE_CLASS = 'yaomri-header-stack--slide';
  const GROUP_FADE_SLIDE_CLASS = 'yaomri-header-stack--fade-slide';
  const HIDDEN_CLASS = 'is-hidden-after-scroll';
  const SCROLL_BEHAVIOR_ALWAYS_VISIBLE = 'always_visible';
  const SCROLL_BEHAVIOR_FADE_AWAY = 'fade_away_after_scroll';
  const DEFAULT_SCROLL_THRESHOLD = 40;
  const DEFAULT_STACK_TRANSITION = 'fade_slide';
  const DEFAULT_STACK_TRANSITION_DURATION = 350;
  const MIN_STACK_TRANSITION_DURATION = 100;
  const MAX_STACK_TRANSITION_DURATION = 1200;

  const parseIntSetting = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value));

  const cleanTransitionClass = (group, nextClass) => {
    group.classList.remove(GROUP_FADE_CLASS, GROUP_SLIDE_CLASS, GROUP_FADE_SLIDE_CLASS);
    if (nextClass) group.classList.add(nextClass);
  };

  const hasOpenOverlayInteraction = () => {
    const megaOpen = document.querySelector('.yaomri-mega-panels.is-open, .yaomri-mega__item.is-open');
    if (megaOpen) return true;

    const drawerOpen = document.querySelector('.mdrawer.is-open');
    if (drawerOpen) return true;

    return document.documentElement.classList.contains('mdrawer-open');
  };

  const findStackGroup = (header) => {
    if (!header) return null;
    const explicitGroup = header.closest('[data-yaomri-header-group]');
    if (explicitGroup) return explicitGroup;

    const themedGroup = header.closest('.shopify-section-group-header-group');
    if (themedGroup) return themedGroup;

    const headerSection = header.closest('[id^="shopify-section-"]') || header.parentElement;
    const announcement = document.querySelector('.yaomri-announcement');
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
        return GROUP_FADE_CLASS;
      case 'slide':
        return GROUP_SLIDE_CLASS;
      case 'fade_slide':
      default:
        return GROUP_FADE_SLIDE_CLASS;
    }
  };

  const applyState = (header, group) => {
    if (!header) return;

    const transparentActive = header.dataset.transparentActive === 'true';
    const stickyEnabled = header.classList.contains('yaomri-header--sticky-enabled');
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    const stackBehavior = header.dataset.headerStackScrollBehavior || SCROLL_BEHAVIOR_ALWAYS_VISIBLE;
    const scrollThresholdRaw = header.dataset.headerStackScrollThreshold;
    const stackTransition = header.dataset.headerStackTransition || DEFAULT_STACK_TRANSITION;
    const stackTransitionDurationRaw = header.dataset.headerStackTransitionDuration;
    const stackTransitionDuration = clampNumber(
      parseIntSetting(stackTransitionDurationRaw, DEFAULT_STACK_TRANSITION_DURATION),
      MIN_STACK_TRANSITION_DURATION,
      MAX_STACK_TRANSITION_DURATION
    );
    const isPastThreshold = window.scrollY > clampNumber(parseIntSetting(scrollThresholdRaw, DEFAULT_SCROLL_THRESHOLD), 0, 200);

    const shouldHideStack = (
      stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY &&
      isPastThreshold &&
      !hasOpenOverlayInteraction()
    );
    const isTransparentHeader = transparentActive && solidAfterScroll;
    const shouldApplyScrolledVisual = isTransparentHeader && !(stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY && shouldHideStack);

    if (group) {
      group.classList.add(GROUP_CLASS);
      group.style.setProperty('--yaomri-header-stack-transition-duration', `${stackTransitionDuration}ms`);
      group.classList.toggle(GROUP_OVERLAY_CLASS, transparentActive && stickyEnabled);
      cleanTransitionClass(group, stackBehavior === SCROLL_BEHAVIOR_FADE_AWAY ? resolveTransitionClass(stackTransition) : null);
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
        const header = document.querySelector('.yaomri-header');
        if (!header) return;
        const group = findStackGroup(header);
        applyState(header, group);
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
