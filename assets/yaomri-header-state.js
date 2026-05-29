(() => {
  const SCROLL_THRESHOLD = 10;

  const applyState = (header) => {
    if (!header) return;
    const transparentActive = header.dataset.transparentActive === 'true';
    const solidAfterScroll = header.dataset.transparentSolidAfterScroll === 'true';
    if (!transparentActive || !solidAfterScroll) {
      header.classList.remove('is-scrolled');
      return;
    }
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  const mount = () => {
    const header = document.querySelector('.yaomri-header');
    if (!header) return;
    applyState(header);

    const onScroll = () => applyState(header);
    window.addEventListener('scroll', onScroll, { passive: true });

    document.addEventListener('shopify:section:load', () => {
      const currentHeader = document.querySelector('.yaomri-header');
      applyState(currentHeader);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
