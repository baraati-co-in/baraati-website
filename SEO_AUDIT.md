# SEO Audit — baraati.co.in (2026-08-02)

Senior technical-SEO / GEO audit of the Baraati marketing website. Companion to the existing `GEO-AUDIT.md` (AI-search specifics) — this doc is the full picture: current implementation, problems, risks, opportunities, and the plan. Read the **Final Report** (`SEO_FINAL_REPORT.md`) for what changed in this pass.

---

## 1. Current implementation

| Aspect | State |
|---|---|
| **Framework** | Hand-written **static HTML** files at the repo root (`baraati - Website/`). No SPA, no framework, no client-side rendering. The old Next.js `site/` build was removed. |
| **Hosting** | Cloudflare Worker (`baraati-website`, static assets, `assets.directory: "."`), account `baraati.co.in@gmail.com`. Global edge, HTTP/2, automatic HTTPS. |
| **Rendering** | **Fully server-rendered static HTML** — ideal for crawlers; all content is in the initial response, zero JS dependency for SEO. |
| **Routing** | Clean URLs (`/features`, `/wedding-guest-app`) served from `*.html`; `.html` 307-redirects to the clean URL. Internal links use root-relative clean paths. |
| **Canonical domain** | **`https://baraati.co.in` (non-www)** — used consistently in every canonical, `og:url`, and sitemap `loc`. GSC property is `sc-domain:baraati.co.in` (covers both). |
| **Titles** | Unique, keyword-forward, under ~60 chars on every indexable page. Homepage: *"Baraati — The Wedding App Built for Indian Weddings"*. |
| **Meta descriptions** | Unique, benefit-led, with pricing where relevant. |
| **Canonicals** | Self-referencing absolute canonical on every page. |
| **Open Graph / Twitter** | Full OG + Twitter card set per page; shared 1200×630 `og.png`; `og:locale en_IN`. |
| **robots.txt** | Excellent. Allows all search + explicitly welcomes every major AI crawler (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot, CCBot, etc.). Points to sitemap. |
| **Sitemap** | `sitemap.xml` with `lastmod`/`changefreq`/`priority`; excludes noindex pages. |
| **Structured data** | JSON-LD `@graph` on every page: `WebPage` + `BreadcrumbList` + `FAQPage`, referencing shared `#organization` / `#website` / `#app` (`SoftwareApplication`) nodes defined on the homepage. Valid, matches visible content, **no fabricated review/rating schema**. |
| **Entity / GEO layer** | `llms.txt` (+ `llms-full.txt`) machine-readable product brief, name-disambiguation ("baraati" the word vs **Baraati** the product), entity facts, first-answer snippets. |
| **Headings** | One meaningful H1 per page; logical H2/H3. |
| **Internal linking** | Nav + footer (Product / Guides / Company columns) + in-body contextual links with descriptive anchors. |
| **Performance** | Static HTML on edge; inlined CSS; only external requests are Google Fonts + `logo.png`. No JS bundles, no hydration. Fast by construction. |
| **Private/app routes** | `/join`, `/checkout`, `/upgrade` are `noindex` and excluded from sitemap. Private per-wedding content lives in the mobile app / Supabase — **not on this domain** — so there is no risk of indexing guest data. |

**Bottom line:** this is a mature, well-executed static-site SEO/GEO implementation. The technical foundation is strong.

---

## 2. Problems discovered

| # | Problem | Severity | Status |
|---|---|---|---|
| P1 | **Head-term landing-page gaps** — no dedicated pages for `wedding app`, `indian wedding app`, `wedding planning app`, `wedding guest management`, `wedding games`. Only the homepage + guest-experience cluster existed. | High | **FIXED this pass** (5 pages built) |
| P2 | **No audience pages** — `/for-couples`, `/for-wedding-planners`, `/for-destination-weddings`, `/for-families` don't exist; "wedding app for couples/planners" long-tail unserved. | Medium | Open (planned) |
| P3 | **No `/blog/` hub** — 3 editorial articles exist (`best-wedding-apps-india`, `indian-wedding-planning-checklist`, `glossary`) but no index tying them together. | Medium | Open (planned) |
| P4 | **Backlinks / off-page authority ≈ zero** — the true ceiling on competitive rankings. Coverage is strong; authority is not started. | High | Open (off-page) |
| P5 | **Brand-name ambiguity** — "baraati" is a common Hindi word; SERP shares space with *Shaadi Baraati*, *Baraati Inc*, *Bar Baraati*. Mitigated by `llms.txt` disambiguation + strong brand title, but off-site entity signals are thin. | Medium | Partially mitigated |
| P6 | **`www` vs non-www** — brief requested `www.baraati.co.in` as canonical, but the entire live site + index + GSC are **non-www**. Switching now = needless re-indexing risk. | Low | **Decision: keep non-www** (see Risks) |
| P7 | **No feature sub-pages** (`/features/events`, `/features/photos`, …) — the brief's deep feature tree. Low priority; `/features` + the cluster cover the intent. | Low | Deferred (avoid thin pages) |

---

## 3. SEO risks

- **`www` migration risk (do not do lightly).** The site is indexed on non-www. Forcing a switch to `www.baraati.co.in` would require 301s, canonical rewrites across ~30 pages, GSC re-verification, and a temporary ranking dip. There is **no SEO benefit** to www over non-www. **Recommendation: keep `https://baraati.co.in` (non-www) as canonical.** Only revisit if the founder has an infrastructure reason (e.g., cookie scoping).
- **Doorway-page risk on programmatic city pages.** Udaipur/Jaipur/Goa pages exist with genuinely city-specific content. Expanding to thin `/wedding-app-[city]` variants would trigger Google's doorway-page penalties. Keep each city page substantive or don't build it.
- **Concurrent multi-session edits.** Several sessions edit this repo. Risk of clobbering deploys/commits. Mitigation: `git pull --rebase` before every deploy+push; deploy is additive for new files.
- **FAQ schema drift.** FAQPage schema must always match visible on-page FAQs. Every new page here keeps them in lockstep — maintain that.

---

## 4. Technical SEO opportunities (state)

- ✅ Sitemap, robots, canonicals, HTTPS, structured data, OG, entity graph, llms.txt — **done**.
- ✅ Clean URLs, one-H1, alt text on meaningful images, internal linking — **done**.
- 🟡 **Off-page authority** — the single biggest remaining lever (see `SEO_COMPETITOR_ANALYSIS.md`, Phase-3 plan).
- 🟡 **Content depth expansion** — audience pages, blog hub, more comparison content.
- 🟢 **Image derivatives / WebP** — `og.png` and `logo.png` are the only raster assets; already light. Low priority.

---

## 5. Keyword opportunities

See `SEO_KEYWORD_MAP.md` for the full URL→keyword table. Summary of where Baraati can genuinely win (intent-matched, product-backed):

- **Won/covered now:** brand (`baraati`), `wedding guest app`, `digital wedding invitation`, `wedding rsvp app`, `wedding photo sharing app`, `wedding itinerary app`, `destination wedding guest app`, `best wedding apps india`, + Udaipur/Jaipur/Goa destination terms.
- **Newly targeted this pass:** `wedding app`, `indian wedding app`, `wedding planning app`, `wedding guest management`, `wedding games app`.
- **Deliberately NOT chased:** `wedding planner` / `wedding vendors` / `wedding budget` (vendor-marketplace intent = our anti-persona; authority wall). "Bare `wedding app`" in the app-store sense is won via ASO, not this page.

---

## 6. Recommended URL architecture (current + planned)

```
/                              ✅ brand + primary intent
/wedding-app                   ✅ NEW — definitional pillar (head term)
/indian-wedding-app            ✅ NEW — core positioning
/wedding-planning-app          ✅ NEW — planning/coordination (Planner)
/wedding-guest-app             ✅ guest-experience pillar
/wedding-guest-management      ✅ NEW — host-side management
/destination-wedding-guest-app ✅ destination
/destination-wedding-app-{city}✅ Udaipur / Jaipur / Goa (template proven)
/digital-wedding-invitation    ✅
/wedding-rsvp-app              ✅
/wedding-rsvp-tracker          ✅ free tool / link magnet
/wedding-itinerary-app         ✅
/wedding-photo-sharing         ✅
/wedding-games                 ✅ NEW — unique differentiator
/vs-whatsapp-groups            ✅ comparison
/best-wedding-apps-india       ✅ editorial
/indian-wedding-planning-checklist ✅ editorial
/glossary                      ✅ entity/definitions
/features /pricing /security /faq /support ✅
/privacy /terms /refunds /delete-account ✅ trust/legal
/join /checkout /upgrade       ✅ noindex (transactional)

PLANNED (next batch, genuine content only):
/for-couples  /for-wedding-planners  /for-destination-weddings  /for-families
/blog/ (hub tying the editorial articles together)
```

## 7. Recommended content architecture

**Pillar → cluster**, with the homepage and `/wedding-app` as top pillars:
- `/wedding-app` (what it is) → links down to every use-case + audience page.
- `/wedding-guest-app` (guest side) ↔ `/wedding-guest-management` (host side).
- `/indian-wedding-app` + `/destination-wedding-guest-app` → city pages.
- Editorial (`/best-wedding-apps-india`, checklist, glossary) → link into commercial pages with descriptive anchors.
- Internal-linking rule: every new page links to 3–5 siblings/pillars; the strongest pages (home, features, `/wedding-app`) link down to the cluster via the footer **Guides** column.

## 8. Implementation plan

1. **Technical SEO / indexability / structured data / robots / sitemap / GEO** — ✅ complete (GEO overhaul + this pass).
2. **Homepage** — ✅ optimized (title/desc/H1/entity graph).
3. **High-intent landing pages** — ✅ 5 head-term pages built this pass; audience pages + blog hub = next batch.
4. **Internal linking** — ✅ footer Guides + in-body links; extend to new pages (done) and add audience pages when built.
5. **Content architecture** — pillar/cluster in place; grow editorial.
6. **GEO/AEO** — ✅ llms.txt, question-based H2s, FAQ schema, entity graph.
7. **Performance** — ✅ static edge site; monitor Core Web Vitals in GSC.
8. **Off-page authority (P4)** — the next real priority: digital-PR data study, directories, HARO, planner partnerships. Not started.
9. **Measurement** — GSC weekly (impressions/CTR/position by query); see `SEO_DEPLOYMENT_CHECKLIST.md`.

**Priority order from here:** off-page authority (P4) > audience pages + blog hub (P2/P3) > feature sub-pages (P7, only if non-thin).
