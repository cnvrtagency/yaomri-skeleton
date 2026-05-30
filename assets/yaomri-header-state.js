(() => {
  const SCROLL_THRESHOLD = 24;

  const applyState = (header) => {
    if (!header) return;

    const transparentActive = header.dataset.transparentActive === 'true';
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    const isPastThreshold = window.scrollY > SCROLL_THRESHOLD;

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
        applyState(header);
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

    document.body.dataset.yaomriHeaderStateInit = 'true';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
