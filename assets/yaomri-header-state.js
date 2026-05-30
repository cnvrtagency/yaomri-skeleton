(() => {
  const SCROLL_THRESHOLD = 24;
  const GROUP_CLASS = 'yaomri-header-stack';
  const GROUP_OVERLAY_CLASS = 'yaomri-header-stack--overlay';

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

  const applyState = (header, group) => {
    if (!header) return;

    const transparentActive = header.dataset.transparentActive === 'true';
    const stickyEnabled = header.classList.contains('yaomri-header--sticky-enabled');
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;

    if (group) {
      group.classList.add(GROUP_CLASS);
      group.classList.toggle(GROUP_OVERLAY_CLASS, transparentActive && stickyEnabled);
    }

    if (transparentActive && solidAfterScroll) {
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

    document.addEventListener('shopify:section:load', queueApply);
    document.addEventListener('shopify:section:reorder', queueApply);
    document.addEventListener('shopify:section:select', queueApply);
    document.addEventListener('shopify:block:select', queueApply);

    document.body.dataset.yaomriHeaderStateInit = 'true';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
