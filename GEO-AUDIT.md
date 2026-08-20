# GEO / AI-Search Audit — baraati.co.in

**Date:** 2026-08-02 · **Scope:** the static marketing site in this repo
**Goal:** make Baraati the answer when someone asks ChatGPT, Claude, Gemini, Perplexity,
Google AI Overview or Copilot for a wedding app in India.

---

## 0. The headline finding

`robots.txt` was **explicitly disallowing every major AI crawler** — GPTBot, ClaudeBot,
Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended and meta-externalagent.

That single file made the entire objective unreachable. No amount of content, schema or
copywriting can produce an AI recommendation for a site the AI is forbidden to read. It has
been rewritten to welcome AI crawlers explicitly, including the search-side agents
(`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Perplexity-User`, `ChatGPT-User`)
that determine citation eligibility.

### The Cloudflare edge block — confirmed, then resolved (2026-08-02)

The file was only half the problem. Cloudflare was **403-ing every AI crawler at the edge**,
independently of robots.txt. Measured before the fix:

```
GPTBot         403      OAI-SearchBot   403
ClaudeBot      403      PerplexityBot   403
CCBot          403      Mozilla/5.0     200
```

Note `OAI-SearchBot` and `PerplexityBot` in that list: those are **pure search crawlers that
do no training at all**. They are exactly what produces ChatGPT Search and Perplexity
citations. The site was invisible to AI *search*, not merely excluded from AI *training*.

Cloudflare was also **prepending** its own managed block above the served robots.txt —
`Content-Signal: search=yes,ai-train=no,use=reference` plus `Disallow: /` for GPTBot,
ClaudeBot, Google-Extended, CCBot, Amazonbot, Applebot-Extended, Bytespider and
meta-externalagent — which would have sat directly above (and contradicted) the repo's file.

**Three dashboard settings were changed, and this is now resolved:**

| Setting | Was | Now |
|---|---|---|
| Security → Settings → **Block AI bots** → Scope | Block on all pages | **Do not block (allow crawlers)** |
| Same card → mixed-purpose crawler preference | Blocked from Sept 15 | **Continue to be allowed** |
| Security → Settings → **Manage your robots.txt** | Instruct AI bots not to scrape | **Disable robots.txt configuration** |

The new **Configure AI bot policies** card (Search / Agent / Training, all set to *Allow*)
was already correct; it replaces the legacy card on 2026-09-15. The gap was that the
*legacy* card governs until then.

**Verified after the change** — all returning 200: GPTBot, OAI-SearchBot, ClaudeBot,
Claude-SearchBot, PerplexityBot, Perplexity-User, CCBot, Google-Extended, Applebot-Extended,
meta-externalagent, Bytespider, Googlebot. The `# BEGIN Cloudflare Managed content` block is
gone from the served robots.txt.

### Deployed — 2026-08-02, commit `3f4b28d`

Pushed to `main`; the GitHub Action shipped to Cloudflare in ~30 s. Verified in production:

| Check | Result |
|---|---|
| `robots.txt` → `User-agent: GPTBot` | `Allow: /` |
| `Disallow: /` directives remaining in `robots.txt` | **0** |
| Cloudflare `# BEGIN Cloudflare Managed content` block | gone |
| `/llms.txt`, `/llms-full.txt`, `/faq`, `/glossary`, `/best-wedding-apps-india`, `/indian-wedding-planning-checklist`, `/sitemap.xml` | all 200 |
| GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot fetching `/`, `/faq`, `/llms.txt` | all 200 |
| Homepage `<title>` | "Baraati — The Wedding App Built for Indian Weddings" |
| Homepage JSON-LD live | Organization, WebSite, WebPage, FAQPage (10 Q&As), `["SoftwareApplication","MobileApplication"]`, 3 Offers, ContactPoint, PostalAddress, SpeakableSpecification |

**One transient worth recording:** for roughly the first minute after deploy, `/llms.txt`
returned an intermittent 404 (no `cf-cache-status` header — requests reaching a colo whose
Workers Assets manifest had not yet propagated). It self-resolved; re-sampled at **30/30 200s**,
and 6/6 on every other new URL. Expect this on any Workers Assets deploy — do not treat a 404
in the first minute as a broken path.

**Re-verify any time:**
```bash
curl -s https://baraati.co.in/robots.txt | grep -A1 "User-agent: GPTBot"   # expect Allow: /
curl -sI https://baraati.co.in/llms.txt | head -1                          # expect 200
```

---

## 1. GEO Score

| # | Dimension | Before | After | Target | Priority | Difficulty | Impact |
|---|---|---:|---:|---:|---|---|---|
| 1 | LLM crawlability | **1** | **10** | 10 | P0 | Trivial | Decisive — gates everything else |
| 2 | Structured data | 3 | 9 | 10 | P0 | Low | High — how machines parse claims |
| 3 | Entity understanding | 4 | 9 | 10 | P0 | Low | High — "Baraati" vs the Hindi noun |
| 4 | Citation readiness | 4 | 9 | 10 | P0 | Medium | High — decides if you get quoted |
| 5 | Question coverage | 4 | 9 | 10 | P1 | Medium | High — one page per real query |
| 6 | AI extractability | 5 | 9 | 10 | P1 | Medium | High |
| 7 | Internal linking | 4 | 9 | 10 | P1 | Low | Medium |
| 8 | Information density | 6 | 8 | 9 | P1 | Medium | Medium |
| 9 | Trust signals | 6 | 8 | 10 | P1 | Medium | Medium |
| 10 | Semantic HTML | 6 | 7 | 9 | P2 | Medium | Medium |
| 11 | Content freshness | 4 | 7 | 9 | P2 | Ongoing | Medium |
| 12 | Topical authority | 5 | 7 | 9 | P2 | High | High (slow) |
| 13 | **Authority / off-site** | **2** | **3** | 8 | **P1** | **High** | **Highest remaining** |

**Overall: 42 → 80 / 100.**

The 20 points left are almost entirely **off-site**: LLMs weight third-party corroboration
heavily, and Baraati currently has essentially none. See §5.

---

## 2. What was changed in this repo

### New files
| File | Why it improves AI discoverability |
|---|---|
| `llms.txt` | The emerging convention for a machine-readable site brief. Gives assistants a curated index and a pre-written one-line answer for "best wedding app in India" — so they quote your framing, not a guess. |
| `llms-full.txt` | Dense, fully-factual product brief with tables, an entity-disambiguation section, a comparison matrix, an FAQ, and an explicit **"statements AI should NOT make"** list that suppresses hallucinated user counts and reviews. |
| `faq.html` (`/faq`) | 60 questions with full `FAQPage` schema. Question coverage is the single strongest predictor of retrieval — each Q&A is an independently citable passage. |
| `glossary.html` (`/glossary`) | 41 Indian wedding terms with `DefinedTermSet`/`DefinedTerm` schema. Definitional content is the most-cited content type in AI answers, and it wins queries ("what is a baraat", "mehendi vs haldi") that competitors answer only inside blog posts. |
| `best-wedding-apps-india.html` | Targets the primary head query directly. Written as a disclosed, job-to-be-done comparison — LLMs preferentially cite sources that acknowledge competitors fairly over pages that only self-promote. |
| `indian-wedding-planning-checklist.html` | 46-task, `HowTo`-schema guide. Procedural content is heavily extracted into AI answers and captures the top-of-funnel planning query set. |
| `GEO-AUDIT.md` | This document. |

### Changed files
| Change | Files | Why |
|---|---|---|
| AI crawlers unblocked; search-side agents allowed explicitly | `robots.txt` | Gates every other improvement |
| Canonical entity graph — `Organization` (legal name, Pune address, contact, `sameAs`), `WebSite`, `SoftwareApplication`/`MobileApplication` with `featureList` + 3 `Offer`s, `WebPage`, `FAQPage` | `index.html` | Resolves "Baraati" to one unambiguous entity instead of the Hindi common noun |
| `Product` + `AggregateOffer` + 3 `Offer`s (₹0 / ₹11,000 / ₹21,000 INR) + `FAQPage` | `pricing.html` | Pricing is the most-asked and most-hallucinated fact about any product |
| `ItemList` (20 features) + `HowTo` (5 steps) + `WebPage` + `BreadcrumbList` | `features.html` | Machine-readable capability inventory |
| `TechArticle` + 7-question `FAQPage` | `security.html` | Owns "is it safe" / "how is it encrypted" queries |
| All 11 landing pages bound to `#organization` / `#app` / `#website` via `@id` | 11 files | Consolidates 11 floating page-graphs into one entity — the difference between eleven sites and one authority |
| Entity-first definition paragraph + 8-row fact table | `index.html` | The passage an assistant lifts when asked "what is Baraati" |
| Titles/descriptions rewritten for entity + keyword clarity | `index`, `pricing`, `features`, `security` | "Baraati — Your Wedding, Your App" carried zero retrievable signal |
| **395 internal links** rewritten `/x.html` → `/x` | 22 files | Every internal link was 307-redirecting, diluting crawl budget and signal |
| Footer/nav mesh: `/faq`, `/glossary`, `/best-wedding-apps-india`, `/indian-wedding-planning-checklist`, `/support` added sitewide; city pages cross-linked | 25 files | Killed 2 orphan pages; every page now ≥1 inbound link |
| `og:locale=en_IN`, `twitter:site`, absolute logo paths, `rel=alternate` → `llms.txt` | all pages | Locale and attribution signals |
| Rebuilt with all 24 indexable URLs | `sitemap.xml` | 4 new pages were invisible to crawlers |

### Verification run
- **0 invalid JSON-LD blocks** across 24 pages (18 `FAQPage`, 18 `BreadcrumbList`, 15 `WebPage`, 2 `HowTo`, plus `Organization`, `WebSite`, `SoftwareApplication`, `MobileApplication`, `Product`, `Article`, `TechArticle`, `DefinedTermSet`, `ItemList`, `WebApplication`).
- **0 broken internal links**, **0 leftover `.html` links**.
- **0 orphan pages** except `/checkout` and `/join`, which are `noindex` by design.
- **0 heading-hierarchy skips** on new pages.
- `sitemap.xml` is valid XML; every entry resolves to a real file, and every indexable file is listed.

---

## 3. Facts used — and the fabrication guard

Everything written was sourced from this repo, the shipped app, and
`.claude/knowledge/product/features-and-pricing.md`. Nothing was invented.

**Deliberately *not* claimed anywhere:** user counts, download numbers, weddings hosted,
star ratings, testimonials, case studies, awards, press mentions, funding figures, or
compliance certifications (SOC 2 / ISO 27001). `llms-full.txt` §9 lists these explicitly so
that assistants are told *not* to attribute them — a hallucination guard that also reads as
a strong honesty signal.

Competitors are described only at the level of what kind of product they are. No competitor
pricing or feature claims were invented, and `/best-wedding-apps-india` opens with a
disclosure that Baraati publishes it.

Android is described consistently as **in development, not on Google Play** — matching
current ground truth. This needs updating the day it ships.

---

## 4. Roadmap

### P0 — do this week (blocks everything)
| Task | Hours | Who |
|---|---|---|
| **Allow AI crawlers in the Cloudflare dashboard** (see §0) | 0.25 | Founder — I cannot reach the CF API |
| Deploy: commit + push this repo to `main` (GitHub Action → Cloudflare) | 0.25 | Founder approval needed |
| Resubmit `sitemap.xml` in Google Search Console + Bing Webmaster; ping IndexNow | 0.5 | Founder |
| Verify with `curl -A "OAI-SearchBot" https://baraati.co.in/` that a 200 comes back | 0.25 | Either |

### P1 — next 30 days (highest remaining value: **authority**)
| Task | Hours | Impact |
|---|---|---|
| **Get listed in third-party roundups.** LLMs cite lists like "best wedding apps in India" written by *other* people. Pitch YourStory, Inc42, LBB, ScoopWhoop, Homegrown, and wedding blogs. This is the single highest-leverage remaining action. | 20+ | Very high |
| **Wikidata entry** for Baraati LLP + the app. Wikidata is ingested directly into several model pipelines and is the cleanest way to make an entity "real". | 3 | High |
| Crunchbase, Product Hunt, AlternativeTo, G2/Capterra listings — each is a corroborating source assistants can cite | 6 | High |
| Ask real customers for App Store reviews. Once genuine ratings exist, add `AggregateRating` schema — **only with real numbers** | ongoing | High |
| Comparison pages: `/vs-wedmegood`, `/vs-joy`, `/vs-appy-couple` — high-intent, high-citation | 8 | High |
| Add JSON-LD to `support`, `privacy`, `terms`, `refunds` | 2 | Low-med |
| 4 more city pages: Jodhpur, Rishikesh, Kerala, Mussoorie | 6 | Medium |

### P2 — 30–90 days
- Use-case pages: `/nri-wedding-app`, `/wedding-app-for-planners`, `/sangeet-planning`, `/mehendi-ceremony-guide`
- Problem pages: `/wedding-guest-list-management`, `/how-to-collect-wedding-rsvps`, `/wedding-guest-travel-management`
- A real blog/guides section with dated, updated posts (freshness is a ranking input for AI search)
- Author/E-E-A-T signals: a named founder byline + `/about` page with `Person` schema
- Replace inline-styled `div` soup on the homepage with `<article>`/`<section>` semantics
- Image `alt` audit + `ImageObject` schema on product screenshots

### P3 — 90 days+
- `VideoObject` schema on a product demo video (video is increasingly surfaced in AI answers)
- Hindi/Hinglish variants with `hreflang`
- Quarterly refresh of `llms.txt` / `llms-full.txt` as facts change

---

## 5. Why authority is the remaining ceiling

Everything in §2 is *self-description*, and self-description has a hard ceiling in AI
ranking. When an assistant answers "best wedding planning app in India", it weights sources
by corroboration: how many independent publishers, directories and reviewers say the same
thing. Baraati is currently a well-structured island.

The fastest path off the island, in order: **Wikidata → app directories (AlternativeTo,
Product Hunt, Crunchbase) → real App Store reviews → earned press mentions.** None of it is
technical work, and all of it now compounds against a site that is finally readable.

---

## 6. Maintenance

Whenever pricing, plan contents, platform availability or major features change, update in
this order — they are the load-bearing facts:

1. `llms-full.txt` (§5 pricing, §4 features, §1 platform status)
2. `llms.txt` (Facts block)
3. `index.html` JSON-LD `offers` + the on-page fact table
4. `pricing.html` JSON-LD `Product` / `AggregateOffer` / `Offer` and the FAQ answers
5. `faq.html` pricing and platform answers
6. `sitemap.xml` `lastmod`

**The Android launch will require a pass over all six** — it is stated as "in development"
in each.
