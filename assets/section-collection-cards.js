(() => {
  const motionReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateProgress = (root, track) => {
    const progressBar = root.querySelector('[data-carousel-progress-bar]');
    if (!progressBar) return;
    const max = track.scrollWidth - track.clientWidth;
    const progress = max > 0 ? (track.scrollLeft / max) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  };

  const initCarousel = (root) => {
    if (!root || root.dataset.yccInit === 'true') return;
    const track = root.querySelector('[data-carousel-track]');
    if (!track) return;

    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const autoplay = root.dataset.autoplay === 'true';
    const autoplaySpeed = Number(root.dataset.autoplaySpeed || 5000);
    const enableDrag = root.dataset.drag !== 'false';
    let autoplayTimer = null;

    if (!enableDrag) {
      track.style.overflowX = 'hidden';
    }

    const slideDistance = () => {
      const first = track.querySelector('.yaomri-collection-cards__slide');
      if (!first) return track.clientWidth;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '0');
      return first.getBoundingClientRect().width + gap;
    };

    const scrollByCards = (direction) => {
      track.scrollBy({ left: slideDistance() * direction, behavior: 'smooth' });
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const startAutoplay = () => {
      if (!autoplay || motionReduced()) return;
      stopAutoplay();
      autoplayTimer = window.setInterval(() => scrollByCards(1), Math.max(2000, autoplaySpeed));
    };

    prevBtn?.addEventListener('click', () => {
      scrollByCards(-1);
      startAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      scrollByCards(1);
      startAutoplay();
    });

    track.addEventListener('scroll', () => updateProgress(root, track), { passive: true });
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    updateProgress(root, track);
    startAutoplay();
    root.dataset.yccInit = 'true';
  };

  const mount = (scope) => {
    const target = scope && scope.querySelectorAll ? scope : document;
    target.querySelectorAll('[data-collection-carousel]').forEach(initCarousel);
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
