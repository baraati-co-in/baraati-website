/* Shared page behaviour: mobile menu state, and keyboard support for the
   Calendly "Book a demo" popup. The menu's open/close click stays inline on
   each page. */
(function () {
  function closeMenu(nav, focusToggle) {
    nav.classList.remove('open');
    var t = nav.querySelector('.nav-toggle');
    if (t) {
      t.setAttribute('aria-expanded', 'false');
      t.setAttribute('aria-label', 'Open menu');
      if (focusToggle) t.focus();
    }
  }

  // Crossing to desktop width closes the mobile menu (its toggle disappears there).
  var desktop = window.matchMedia('(min-width: 769px)');
  function onWidth(e) {
    if (!e.matches) return;
    var nav = document.querySelector('nav.top.open');
    if (nav) closeMenu(nav, false);
  }
  if (desktop.addEventListener) desktop.addEventListener('change', onWidth);
  else if (desktop.addListener) desktop.addListener(onWidth);

  /* ── Calendly popup ─────────────────────────────────────────────
     Calendly draws its own overlay with an unnamed, unfocusable close <div>
     and no Escape handling. Name it, move focus into the dialog on open,
     close on Escape, and return focus to the button that opened it. */
  var launcher = null;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="calendly.com/"]');
    if (a) launcher = a;
  }, true);

  function overlay() { return document.querySelector('.calendly-overlay'); }

  function closePopup() {
    var o = overlay();
    if (!o) return;
    if (window.Calendly && typeof window.Calendly.closePopupWidget === 'function') {
      window.Calendly.closePopupWidget();
    } else {
      var c = o.querySelector('.calendly-popup-close');
      if (c) c.click(); else o.remove();
    }
  }

  function enhance(o) {
    if (o.getAttribute('data-a11y')) return;
    o.setAttribute('data-a11y', '1');
    o.setAttribute('role', 'dialog');
    o.setAttribute('aria-modal', 'true');
    o.setAttribute('aria-label', 'Book a demo');
    var c = o.querySelector('.calendly-popup-close');
    if (c) {
      c.setAttribute('role', 'button');
      c.setAttribute('tabindex', '0');
      c.setAttribute('aria-label', 'Close');
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); }
      });
      c.focus();
    }
  }

  var open = false;
  function isCalendly(n) {
    return n.nodeType === 1 && /calendly/.test(String(n.className || ''));
  }
  new MutationObserver(function (records) {
    var touched = records.some(function (r) {
      return Array.prototype.some.call(r.addedNodes, isCalendly) ||
             Array.prototype.some.call(r.removedNodes, isCalendly);
    });
    if (!touched) return;
    var o = overlay();
    if (o) { open = true; enhance(o); return; }
    if (open) {
      open = false;
      if (launcher) { var l = launcher; launcher = null; l.focus(); }
    }
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (overlay()) { closePopup(); return; }
    var nav = document.querySelector('nav.top.open');
    if (nav) closeMenu(nav, true);
  });
})();
