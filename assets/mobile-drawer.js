(function () {
  var drawer = document.querySelector("[data-mdrawer]");
  if (!drawer) return;

  var panel = drawer.querySelector(".mdrawer__panel");
  var drawerHeader = drawer.querySelector("[data-mdrawer-header]");
  var titleNode = drawer.querySelector("[data-mdrawer-title]");
  var backButton = drawer.querySelector("[data-mdrawer-back]");
  var closeButtons = drawer.querySelectorAll("[data-mdrawer-close]");
  var triggers = document.querySelectorAll("[data-mdrawer-trigger]");
  var drillButtons = drawer.querySelectorAll("[data-mdrawer-drill]");
  var views = drawer.querySelectorAll("[data-mdrawer-view]");
  var rootView = drawer.querySelector('[data-mdrawer-view="root"]');
  var rootTitle = titleNode ? titleNode.textContent : "Menu";
  var activeTrigger = null;
  var viewStack = ["root"];

  function syncDrawerTriggerExpanded(isOpen) {
    triggers.forEach(function (trigger) {
      trigger.setAttribute("aria-expanded", isOpen && trigger === activeTrigger ? "true" : "false");
    });
  }

  function getView(name) {
    return drawer.querySelector('[data-mdrawer-view="' + name + '"]');
  }

  function setView(name, options) {
    var animateFromRight = options && options.reverse ? -1 : 1;
    views.forEach(function (view) {
      var isTarget = view.getAttribute("data-mdrawer-view") === name;
      view.classList.toggle("is-active", isTarget);
      if (isTarget) {
        view.style.transform = "translateX(0)";
      } else if (options && options.keepDirection) {
        view.style.transform =
          "translateX(" + String(100 * animateFromRight) + "%)";
      } else {
        view.style.transform = "translateX(100%)";
      }
    });

    if (titleNode) {
      if (name === "root") {
        titleNode.textContent = rootTitle;
      } else {
        var sourceButton = drawer.querySelector(
          '[data-target="' + name + '"][data-title]'
        );
        titleNode.textContent = sourceButton
          ? sourceButton.getAttribute("data-title")
          : rootTitle;
      }
    }

    if (backButton) {
      if (name === "root") {
        backButton.hidden = true;
      } else {
        backButton.hidden = false;
      }
    }

    if (drawerHeader) {
      var isRoot = name === "root";
      drawerHeader.classList.toggle("is-root", isRoot);
      drawerHeader.classList.toggle("is-drill", !isRoot);
    }
  }

  function restoreRootView() {
    viewStack = ["root"];
    setView("root");
    syncDrawerDrillExpanded(null);
  }

  function openDrawer(trigger) {
    activeTrigger = trigger || null;
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.add("is-open");
    document.documentElement.classList.add("mdrawer-open");
    restoreRootView();
    syncDrawerTriggerExpanded(true);

    window.setTimeout(function () {
      if (panel) panel.focus();
    }, 20);
  }

  function closeDrawer() {
    drawer.setAttribute("aria-hidden", "true");
    drawer.classList.remove("is-open");
    document.documentElement.classList.remove("mdrawer-open");
    restoreRootView();
    syncDrawerTriggerExpanded(false);
    syncDrawerDrillExpanded(null);
    if (activeTrigger && typeof activeTrigger.focus === "function") {
      activeTrigger.focus();
    }
  }

  function syncDrawerDrillExpanded(viewName) {
    drillButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", button.getAttribute("data-target") === viewName ? "true" : "false");
    });
  }

  function handleEscape(event) {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  }

  function handleTabTrap(event) {
    if (!drawer.classList.contains("is-open")) return;
    if (event.key !== "Tab") return;

    var focusables = panel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openDrawer(trigger);
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeDrawer);
  });

  drillButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-target");
      if (!target || !getView(target)) return;
      viewStack.push(target);
      setView(target);
      syncDrawerDrillExpanded(target);
    });
  });

  if (backButton) {
    backButton.addEventListener("click", function () {
      if (viewStack.length > 1) viewStack.pop();
      var target = viewStack[viewStack.length - 1] || "root";
      setView(target, { reverse: true, keepDirection: true });
      syncDrawerDrillExpanded(target === "root" ? null : target);
    });
  }

  drawer.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;
    closeDrawer();
  });

  document.addEventListener("keydown", handleEscape);
  document.addEventListener("keydown", handleTabTrap);
})();
