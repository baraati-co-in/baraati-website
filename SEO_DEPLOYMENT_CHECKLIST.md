# SEO Deployment Checklist — baraati.co.in

Run through this after any SEO deploy. Most items are one-time and already ✅; the recurring ones are marked 🔁.

## Deploy mechanics (this repo)
- [x] Static site → Cloudflare Worker `baraati-website` via `npx wrangler deploy` (from `baraati - Website/`, account `baraati.co.in@gmail.com`).
- [ ] 🔁 **Before every deploy+push: `git pull --rebase`** (multiple sessions edit this repo; `wrangler deploy` ships your whole local `.` — pull first so you don't revert a peer's change).
- [ ] 🔁 After deploy, verify new/changed URLs return **200** at the clean path (Cloudflare clean-URL routing can lag a few seconds post-deploy).
- [ ] 🔁 Ping IndexNow for new/changed URLs (Bing/Yandex): `GET https://api.indexnow.org/indexnow?url={URL}&key=bfc3232e2b3d439b893c96824f1b392a&keyLocation=https://baraati.co.in/bfc3232e2b3d439b893c96824f1b392a.txt` → expect `200/202`.

## Indexability
- [x] HTTPS enforced (Cloudflare).
- [x] Canonical domain = `https://baraati.co.in` (non-www), self-referencing canonical on every page.
- [x] `robots.txt` allows search + AI crawlers, points to sitemap, blocks nothing needed for rendering.
- [x] `sitemap.xml` lists only canonical indexable URLs; excludes `/join`, `/checkout`, `/upgrade`.
- [x] Transactional/deep-link pages carry `<meta name="robots" content="noindex">` **and** are left crawlable (so the tag is seen).
- [ ] 🔁 No accidental `noindex` on a page you want indexed (grep before deploy).

## Per-page (every new landing page)
- [x] Unique `<title>` (<60 chars, keyword-first) and meta description (<160).
- [x] Self-referencing absolute canonical.
- [x] Exactly one `<h1>`; logical H2/H3.
- [x] OG + Twitter tags; `og:image` = `https://baraati.co.in/og.png` (1200×630); `og:locale en_IN`.
- [x] JSON-LD `@graph`: `WebPage` (→ `#website`/`#app`/`#organization`) + `BreadcrumbList` + `FAQPage`.
- [x] FAQPage schema matches the **visible** on-page FAQ exactly.
- [x] Descriptive alt text on meaningful images; no keyword-stuffed alt.
- [x] Added to `sitemap.xml` + footer **Guides** column + cross-links to siblings/pillars.

## Google Search Console (manual — needs founder login)
- [ ] Resubmit `sitemap.xml` (or confirm Google re-reads it; it auto-recrawls).
- [ ] URL-inspect + **Request indexing** for the new pillar (`/wedding-app`) — Google finds the rest via sitemap.
- [ ] 🔁 Check **Indexing → Pages**: watch new pages move to "Indexed"; investigate "Crawled – not indexed" if it persists >2 weeks.
- [ ] 🔁 The "noindex / 404" report will list `/join`,`/checkout`,`/upgrade` (intentional) — leave them.

## Bing / IndexNow (manual)
- [x] Bing Webmaster imported from GSC (site + sitemap).
- [x] IndexNow key file live at `/{key}.txt`.

## Validation
- [ ] Structured data: test key pages in Google Rich Results Test (FAQ + Breadcrumb should validate).
- [ ] OG: test a page in the Facebook Sharing Debugger + LinkedIn Post Inspector.
- [ ] Core Web Vitals: spot-check a page in PageSpeed Insights (static site should pass comfortably).
- [ ] Broken-link sweep: every internal `href="/..."` returns 200 (script in repo history).

## Measurement (🔁 recurring)
- [ ] **Weekly (first month):** GSC Performance — impressions, clicks, avg CTR, # queries in positions 1–3 / 4–10 / 11–20, by query and page.
- [ ] **Monthly:** review top gaining/losing pages; refresh titles for pages ranking 3–15; run the striking-distance play (positions 8–20 → strengthen page + internal links + re-request indexing).
- [ ] Track each publish + date so ranking movement is attributable.

## Manual steps still owed
- [ ] iOS **ASO listing** paste in App Store Connect (`creatives/2026-07-app-store-listing-ios.md`) — needs founder access.
- [ ] **Off-page authority program** (backlinks) — the real gate; not started. See `SEO_COMPETITOR_ANALYSIS.md` §4.
- [ ] Data-safety / privacy labels at next store submission (tracked in memory).
