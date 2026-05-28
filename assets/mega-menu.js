(() => {
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  const nav = document.querySelector('[data-mega]');
  const panelRoot = document.querySelector('[data-mega-panels]');
  if (!nav) return;

  const closeDelay = Number(nav.getAttribute('data-close-delay')) || 250;
  const panelWidth = Number(nav.getAttribute('data-panel-width')) || 1400;
  const header = document.querySelector('.yaomri-header');
  const headerMaxWidth = Number(header?.dataset.headerMaxWidth) || panelWidth;
  const headerDesktopPadding = Number(header?.dataset.headerDesktopPadding) || 24;
  let closeTimer = null;
  let activeTrigger = null;
  let activePanel = null;

  if (panelRoot) {
    panelRoot.style.setProperty('--ym-panel-max-width', `${panelWidth}px`);
    panelRoot.style.setProperty('--ym-content-max-width', `${Math.min(panelWidth, headerMaxWidth)}px`);
    panelRoot.style.setProperty('--ym-content-padding', `${headerDesktopPadding}px`);
  }

  const getHeaderBottom = () => {
    const header = document.querySelector('.yaomri-header');
    if (!header) return 0;
    const rect = header.getBoundingClientRect();
    return Math.max(0, rect.bottom);
  };

  const updatePanelTop = () => {
    if (!panelRoot) return;
    const top = getHeaderBottom();
    panelRoot.style.setProperty('--ym-panel-top', `${top}px`);
  };

  const clearCloseTimer = () => {
    if (!closeTimer) return;
    clearTimeout(closeTimer);
    closeTimer = null;
  };

  const closeAll = () => {
    clearCloseTimer();
    nav.querySelectorAll('.yaomri-mega__item.is-open').forEach((item) => item.classList.remove('is-open'));
    if (panelRoot) {
      panelRoot.classList.remove('is-open');
      panelRoot.setAttribute('aria-hidden', 'true');
      panelRoot.querySelectorAll('[data-mega-panel]').forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove('is-open');
      });
    }
    activeTrigger = null;
    activePanel = null;
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer = window.setTimeout(closeAll, closeDelay);
  };

  const openDropdown = (item) => {
    if (!desktopQuery.matches) return;
    if (!item) return;
    clearCloseTimer();
    nav.querySelectorAll('.yaomri-mega__item.is-open').forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove('is-open');
    });
    item.classList.add('is-open');
    if (panelRoot) {
      panelRoot.classList.remove('is-open');
      panelRoot.setAttribute('aria-hidden', 'true');
      panelRoot.querySelectorAll('[data-mega-panel]').forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove('is-open');
      });
    }
    activePanel = null;
    activeTrigger = item.querySelector('[data-dropdown-trigger]') || null;
  };

  const openMega = (trigger, item) => {
    if (!desktopQuery.matches || !panelRoot || !trigger) return false;
    const target = trigger.getAttribute('data-mega-target');
    if (!target) return false;
    const panel = panelRoot.querySelector(`[data-mega-parent="${CSS.escape(target)}"]`);
    if (!panel) return false;

    const widthMode = trigger.getAttribute('data-mega-width-mode') || 'full';
    const customWidth = Number(trigger.getAttribute('data-mega-custom-width')) || panelWidth;
    let activeContentWidth = panelWidth;
    if (widthMode === 'content') {
      activeContentWidth = headerMaxWidth;
    } else if (widthMode === 'custom') {
      activeContentWidth = customWidth;
    }
    const resolvedWidth = Math.min(activeContentWidth, panelWidth, headerMaxWidth);

    clearCloseTimer();
    updatePanelTop();
    nav.querySelectorAll('.yaomri-mega__item.is-open').forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove('is-open');
    });
    item.classList.add('is-open');
    panelRoot.classList.add('is-open');
    panelRoot.setAttribute('aria-hidden', 'false');
    panelRoot.style.setProperty('--ym-content-max-width', `${resolvedWidth}px`);
    panelRoot.querySelectorAll('[data-mega-panel]').forEach((candidate) => {
      const isActive = candidate === panel;
      candidate.hidden = !isActive;
      candidate.classList.toggle('is-open', isActive);
    });
    activeTrigger = trigger;
    activePanel = panel;
    return true;
  };

  nav.addEventListener('mouseenter', clearCloseTimer);
  nav.addEventListener('mouseleave', scheduleClose);
  nav.addEventListener('focusin', clearCloseTimer);
  nav.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!nav.contains(document.activeElement) && !(panelRoot && panelRoot.contains(document.activeElement))) {
        scheduleClose();
      }
    }, 0);
  });

  nav.querySelectorAll('[data-dropdown]').forEach((item) => {
    item.addEventListener('mouseenter', () => openDropdown(item));
    const trigger = item.querySelector('[data-dropdown-trigger]');
    if (trigger) {
      trigger.addEventListener('focus', () => openDropdown(item));
    }
  });

  nav.querySelectorAll('[data-mega-trigger]').forEach((trigger) => {
    const item = trigger.closest('[data-mega-item]');
    if (!item) return;

    trigger.addEventListener('mouseenter', () => {
      openMega(trigger, item);
    });

    trigger.addEventListener('focus', () => {
      openMega(trigger, item);
    });

    trigger.addEventListener('click', (event) => {
      if (!desktopQuery.matches) return;
      const opened = openMega(trigger, item);
      if (opened) {
        event.preventDefault();
      }
    });
  });

  if (panelRoot) {
    panelRoot.addEventListener('mouseenter', clearCloseTimer);
    panelRoot.addEventListener('mouseleave', scheduleClose);

    const closeButton = panelRoot.querySelector('[data-mega-close]');
    if (closeButton) {
      closeButton.addEventListener('click', closeAll);
    }

    panelRoot.addEventListener('click', (event) => {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      if (element.closest('[data-mega-link]')) {
        closeAll();
      }
    });
  }

  document.addEventListener('click', (event) => {
    if (!desktopQuery.matches) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (nav.contains(target) || (panelRoot && panelRoot.contains(target))) return;
    closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeAll();
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const link = target.closest('[data-mega-link]');
    if (!link) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'mega_menu_click',
      label: (link.textContent || '').trim(),
      url: link.getAttribute('href') || ''
    });
  });

  const syncForViewport = () => {
    if (desktopQuery.matches) {
      updatePanelTop();
      return;
    }
    closeAll();
  };

  window.addEventListener('resize', syncForViewport);
  window.addEventListener('scroll', updatePanelTop, { passive: true });
  desktopQuery.addEventListener('change', syncForViewport);
  syncForViewport();
})();
