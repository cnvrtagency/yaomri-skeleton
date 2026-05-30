(() => {
  const init = (root) => {
    if (!root || root.dataset.ccInit === 'true') return;
    const track = root.querySelector('[data-cc-track]');
    if (!track) return;

    const prev = root.querySelector('[data-cc-prev]');
    const next = root.querySelector('[data-cc-next]');
    const step = () => Math.max(220, track.clientWidth * 0.8);

    prev?.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });

    next?.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    root.dataset.ccInit = 'true';
  };

  const mount = (scope) => {
    const container = scope && scope.querySelectorAll ? scope : document;
    container.querySelectorAll('.cc-carousel').forEach(init);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mount(document), { once: true });
  } else {
    mount(document);
  }

  document.addEventListener('shopify:section:load', (event) => {
    mount(event.target);
  });
})();
