/* Carry campaign tags from the page URL onto the App Store / Play buttons, so the
   store consoles can attribute installs to an ad or post.
   No cookies, no storage, no network calls: it only rewrites links on this page,
   and does nothing when the page URL has no utm_ parameters. */
(function () {
  // App Store Connect → App Analytics → Campaign link generator → "Provider token".
  // Apple ignores ct= without it, so iOS links are left untouched until this is set.
  var APPLE_PROVIDER_TOKEN = '129028126';

  var q = new URLSearchParams(location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utm = keys.filter(function (k) { return q.get(k); });
  if (!utm.length) return;

  // Play: referrer=<url-encoded utm string>, read by Play Console's acquisition reports.
  var referrer = utm.map(function (k) { return k + '=' + encodeURIComponent(q.get(k)); }).join('&');
  // App Store: ct= is a free-text campaign name, max 40 characters.
  var ct = [q.get('utm_source'), q.get('utm_campaign'), q.get('utm_content')]
    .filter(Boolean).join('-').replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 40);

  function tag() {
    document.querySelectorAll('a[href*="play.google.com/store/apps/details"]').forEach(function (a) {
      var u = new URL(a.href);
      u.searchParams.set('referrer', referrer);
      a.href = u.toString();
    });
    if (!APPLE_PROVIDER_TOKEN) return;
    document.querySelectorAll('a[href*="apps.apple.com/"]').forEach(function (a) {
      var u = new URL(a.href);
      u.searchParams.set('pt', APPLE_PROVIDER_TOKEN);
      u.searchParams.set('ct', ct);
      u.searchParams.set('mt', '8');
      a.href = u.toString();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tag);
  else tag();
})();
