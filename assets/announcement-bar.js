(() => {
  const initCarousel = (root) => {
    const slides = Array.from(root.querySelectorAll('[data-announcement-slide]'));
    if (slides.length < 2) return;

    const prevBtn = root.querySelector('[data-announcement-prev]');
    const nextBtn = root.querySelector('[data-announcement-next]');
    const dots = Array.from(root.querySelectorAll('[data-announcement-dot]'));
    const autoplay = root.dataset.autoplay === 'true';
    const speed = Number(root.dataset.speed || 4000);
    let index = 0;
    let timer = null;

    const render = () => {
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };

    const goTo = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      render();
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (!autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stop();
      timer = window.setInterval(next, Math.max(2000, speed));
    };

    prevBtn?.addEventListener('click', () => {
      prev();
      start();
    });

    nextBtn?.addEventListener('click', () => {
      next();
      start();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const dotIndex = Number(dot.dataset.announcementDot || 0);
        goTo(dotIndex);
        start();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    render();
    start();
  };

  const mount = () => {
    document.querySelectorAll('[data-announcement-carousel]').forEach(initCarousel);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  document.addEventListener('shopify:section:load', mount);
})();
