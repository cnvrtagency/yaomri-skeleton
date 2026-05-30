(() => {
  const SCROLL_THRESHOLD = 24;
  const GROUP_CLASS = 'yaomri-header-stack';
  const GROUP_OVERLAY_CLASS = 'yaomri-header-stack--overlay';
  const GROUP_COLLAPSED_CLASS = 'is-collapsed';

  const findStackGroup = (header) => {
    if (!header) return null;
    return (
      header.closest('.shopify-section-group-header-group') ||
      header.parentElement ||
      null
    );
  };

  const isElementVisible = (element) => {
    if (!element) return false;
    return getComputedStyle(element).display !== 'none' && element.offsetHeight > 0;
  };

  const applyState = (header, group, announcement) => {
    if (!header) return;

    const transparentActive = header.dataset.transparentActive === 'true';
    const stickyEnabled = header.dataset.stickyEnabled === 'true';
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;

    if (group) {
      group.classList.add(GROUP_CLASS);
      group.classList.toggle(GROUP_OVERLAY_CLASS, transparentActive && stickyEnabled);
    }

    const announcementHeight = isElementVisible(announcement)
      ? Math.round(announcement.getBoundingClientRect().height)
      : 0;

    if (group) {
      group.style.setProperty('--yhs-announcement-height', `${announcementHeight}px`);
      group.classList.toggle(
        GROUP_COLLAPSED_CLASS,
        transparentActive && stickyEnabled && announcementHeight > 0 && isPastThreshold
      );
    }

    if (transparentActive && solidAfterScroll) {
      header.classList.toggle('is-scrolled', isPastThreshold);
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  const mount = () => {
    let rafId = null;
    const queueApply = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const header = document.querySelector('.yaomri-header');
        if (!header) return;
        const group = findStackGroup(header);
        const announcement = group
          ? group.querySelector('.yaomri-announcement')
          : document.querySelector('.yaomri-announcement');
        applyState(header, group, announcement);
      });
    };

    queueApply();
    window.addEventListener('scroll', queueApply, { passive: true });
    window.addEventListener('resize', queueApply);

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(queueApply);
      const bar = document.querySelector('.yaomri-announcement');
      if (bar) observer.observe(bar);
    }

    document.addEventListener('shopify:section:load', queueApply);
    document.addEventListener('shopify:section:reorder', queueApply);
    document.addEventListener('shopify:section:select', queueApply);
    document.addEventListener('shopify:block:select', queueApply);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
