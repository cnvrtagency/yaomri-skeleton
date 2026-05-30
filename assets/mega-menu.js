(() => {
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  const listenerCleanup = [];
  let nav = null;
  let panelRoot = null;
  let header = null;
  let closeDelay = 250;
  let closeTimer = null;
  let activeTrigger = null;
  let activePanel = null;

  const bind = (target, eventName, handler, options) => {
    if (!target) return;
    target.addEventListener(eventName, handler, options);
    listenerCleanup.push(() => target.removeEventListener(eventName, handler, options));
  };

  const unbindAll = () => {
    while (listenerCleanup.length > 0) {
      const remove = listenerCleanup.pop();
      if (remove) remove();
    }
  };

  const refreshElements = () => {
    nav = document.querySelector('[data-mega]');
    panelRoot = document.querySelector('[data-mega-panels]');
    header = document.querySelector('.yaomri-header');
    closeDelay =
      Number(panelRoot?.getAttribute('data-close-delay')) ||
      Number(nav?.getAttribute('data-close-delay')) ||
      250;
  };

  const getPanelWidth = () => {
    const parsedPanelWidth =
      Number(panelRoot?.getAttribute('data-panel-width')) ||
      Number(nav?.getAttribute('data-panel-width')) ||
      1200;
    return parsedPanelWidth > 0 ? parsedPanelWidth : 1200;
  };

  const syncPanelWidthVars = () => {
    if (!panelRoot) return;
    const panelWidth = getPanelWidth();
    panelRoot.style.setProperty('--ym-panel-width', `${panelWidth}px`);
    panelRoot.style.setProperty('--cnvrt-mega-panel-width', `${panelWidth}px`);
  };

  const syncPanelPadding = () => {
    if (!panelRoot) return;
    const headerDesktopPadding = Number(header?.dataset.headerDesktopPadding) || 24;
    panelRoot.style.setProperty('--ym-content-padding', `${headerDesktopPadding}px`);
    panelRoot.style.setProperty('--cnvrt-mega-content-padding', `${headerDesktopPadding}px`);
  };

  const getHeaderBottom = () => {
    const liveHeader = document.querySelector('.yaomri-header, .cnvrt-header');
    if (!liveHeader) return 0;
    const rect = liveHeader.getBoundingClientRect();
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
    nav?.querySelectorAll('.yaomri-mega__item.is-open, .cnvrt-mega__item.is-open').forEach((item) =>
      item.classList.remove('is-open')
    );
    nav?.querySelectorAll('[data-dropdown-trigger], [data-mega-trigger]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });
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
    if (!desktopQuery.matches || !nav || !item) return;
    clearCloseTimer();
    nav.querySelectorAll('.yaomri-mega__item.is-open, .cnvrt-mega__item.is-open').forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove('is-open');
    });
    nav.querySelectorAll('[data-dropdown-trigger], [data-mega-trigger]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });
    item.classList.add('is-open');
    const dropdownTrigger = item.querySelector('[data-dropdown-trigger]');
    if (dropdownTrigger) {
      dropdownTrigger.setAttribute('aria-expanded', 'true');
    }
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
    if (!desktopQuery.matches || !panelRoot || !trigger || !nav) return false;
    const target = trigger.getAttribute('data-mega-target');
    if (!target) return false;
    const panel = panelRoot.querySelector(`[data-mega-parent="${CSS.escape(target)}"]`);
    if (!panel) return false;

    clearCloseTimer();
    updatePanelTop();
    syncPanelWidthVars();
    syncPanelPadding();

    nav.querySelectorAll('.yaomri-mega__item.is-open, .cnvrt-mega__item.is-open').forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove('is-open');
    });
    item.classList.add('is-open');
    nav.querySelectorAll('[data-dropdown-trigger], [data-mega-trigger]').forEach((menuTrigger) => {
      menuTrigger.setAttribute('aria-expanded', menuTrigger === trigger ? 'true' : 'false');
    });
    panelRoot.classList.add('is-open');
    panelRoot.setAttribute('aria-hidden', 'false');
    panelRoot.querySelectorAll('[data-mega-panel]').forEach((candidate) => {
      const isActive = candidate === panel;
      candidate.hidden = !isActive;
      candidate.classList.toggle('is-open', isActive);
    });
    activeTrigger = trigger;
    activePanel = panel;
    return true;
  };

  const syncForViewport = () => {
    if (desktopQuery.matches) {
      syncPanelWidthVars();
      syncPanelPadding();
      updatePanelTop();
      return;
    }
    closeAll();
  };

  const bindInteractions = () => {
    if (!nav) return;

    bind(nav, 'mouseenter', clearCloseTimer);
    bind(nav, 'mouseleave', scheduleClose);
    bind(nav, 'focusin', clearCloseTimer);
    bind(nav, 'focusout', () => {
      window.setTimeout(() => {
        if (!nav) return;
        if (!nav.contains(document.activeElement) && !(panelRoot && panelRoot.contains(document.activeElement))) {
          scheduleClose();
        }
      }, 0);
    });

    nav.querySelectorAll('[data-dropdown]').forEach((item) => {
      bind(item, 'mouseenter', () => openDropdown(item));
      const trigger = item.querySelector('[data-dropdown-trigger]');
      if (trigger) {
        bind(trigger, 'focus', () => openDropdown(item));
      }
    });

    nav.querySelectorAll('[data-mega-trigger]').forEach((trigger) => {
      const item = trigger.closest('[data-mega-item]');
      if (!item) return;
      bind(trigger, 'mouseenter', () => openMega(trigger, item));
      bind(trigger, 'focus', () => openMega(trigger, item));
      bind(trigger, 'click', (event) => {
        if (!desktopQuery.matches) return;
        const opened = openMega(trigger, item);
        if (opened) event.preventDefault();
      });
    });

    if (panelRoot) {
      bind(panelRoot, 'mouseenter', clearCloseTimer);
      bind(panelRoot, 'mouseleave', scheduleClose);

      const closeButton = panelRoot.querySelector('[data-mega-close]');
      if (closeButton) {
        bind(closeButton, 'click', closeAll);
      }

      bind(panelRoot, 'click', (event) => {
        const element = event.target;
        if (!(element instanceof HTMLElement)) return;
        if (element.closest('[data-mega-link]')) closeAll();
      });
    }

    bind(document, 'click', (event) => {
      if (!desktopQuery.matches || !nav) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (nav.contains(target) || (panelRoot && panelRoot.contains(target))) return;
      closeAll();
    });

    bind(document, 'keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeAll();
    });

    bind(document, 'click', (event) => {
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

    bind(window, 'resize', syncForViewport);
    bind(window, 'scroll', updatePanelTop, { passive: true });
    bind(desktopQuery, 'change', syncForViewport);
  };

  const mount = () => {
    unbindAll();
    clearCloseTimer();
    refreshElements();
    if (!nav) return;
    syncForViewport();
    bindInteractions();
  };

  const scheduleMount = () => {
    window.setTimeout(mount, 0);
  };

  if (document.readyState === 'loading') {
    bind(document, 'DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  bind(document, 'shopify:section:load', scheduleMount);
  bind(document, 'shopify:section:unload', scheduleMount);
  bind(document, 'shopify:section:reorder', scheduleMount);
})();
