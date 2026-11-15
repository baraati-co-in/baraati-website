/* Mobile menu: Escape closes it, updates the toggle's state and returns focus
   to the toggle. The open/close click itself stays inline on each page. */
(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    var nav = document.querySelector('nav.top.open');
    if (!nav) return;
    nav.classList.remove('open');
    var t = nav.querySelector('.nav-toggle');
    if (t) {
      t.setAttribute('aria-expanded', 'false');
      t.setAttribute('aria-label', 'Open menu');
      t.focus();
    }
  });
})();
