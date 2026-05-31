(() => {
  const initSection = (section) => {
    if (!section || section.dataset.cnvrtFeaturedCollectionInit === 'true') return;

    const track = section.querySelector('[data-cnvrt-featured-collection-track]');
    const prev = section.querySelector('[data-cnvrt-featured-collection-prev]');
    const next = section.querySelector('[data-cnvrt-featured-collection-next]');

    if (!track || !prev || !next) {
      section.dataset.cnvrtFeaturedCollectionInit = 'true';
      return;
    }

    const step = () => Math.max(240, Math.round(track.clientWidth * 0.85));

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    section.dataset.cnvrtFeaturedCollectionInit = 'true';
  };

  const mount = (scope) => {
    const root = scope && scope.querySelectorAll ? scope : document;
    root.querySelectorAll('[data-cnvrt-featured-collection]').forEach(initSection);
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
