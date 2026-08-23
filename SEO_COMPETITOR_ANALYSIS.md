# SEO Competitor Analysis — Baraati (2026-08-02)

Purpose: understand who ranks for wedding-app searches in India, why, and where Baraati can uniquely win. **We do not copy competitor content** — this maps the gaps Baraati can own. Verify freshness with live search before citing publicly.

---

## 1. Two different competitive sets

Baraati sits in a category — the **wedding guest experience** — that the biggest "wedding" sites in India do **not** serve. That's the whole opportunity.

### A. Indian wedding platforms (adjacent, not direct)
| Player | What they are | SEO strength | Where they rank | Our wedge |
|---|---|---|---|---|
| **WedMeGood** | Vendor marketplace + planning blog | Dominant DA, huge blog, thousands of vendor/city pages | "wedding planner", "wedding venues in {city}", "best {vendor} in {city}" | They serve *finding & booking vendors*. Baraati serves *running the wedding + the guest experience*. Different search, different intent. |
| **WeddingWire India / ShaadiSaga** | Vendor discovery + reviews | Large listing/review corpus | vendor + venue queries | Same wedge — post-booking, guest-facing is open. |
| **WeddingBazaar** | Vendor services, price-led | Price/lead pages | vendor pricing queries | We never compete on vendor economics. |

**Takeaway:** these giants own **vendor/venue/planning** intent. They do **not** target "wedding guest app", "wedding rsvp app", "digital wedding invitation with rsvp", "wedding itinerary app", "wedding games app". Those SERPs are contested by weaker pages — winnable.

### B. Guest-experience / wedding apps (direct feature competitors)
| Player | Notes | Gap Baraati exploits |
|---|---|---|
| **Joy (withjoy.com)** | Closest global analog — wedding website + app + RSVP, free, US-centric | No multi-ceremony Indian model, no travel/room/ID workflows, weak India presence |
| **Appy Couple / HitchHike** | Paid premium wedding apps | Validate willingness-to-pay; not built for Indian multi-day structure |
| **The Knot / Zola** | US registries + websites | Study their *content* playbook, not the product; irrelevant to India intent |

### C. The real competitor: **WhatsApp + Google Sheets + PDF invites**
Free, universal, already installed — the actual default for Indian weddings. This is what `/vs-whatsapp-groups` targets, and what most content should punch at (chaos, exposed numbers, lost RSVPs) rather than named brands.

### D. Brand-name collision (SERP hygiene, not competitors)
"baraati" is a common Hindi word. The SERP for the bare term shows **Shaadi Baraati** (vendor marketplace), **Baraati Inc** (a wedding-planning company), and **Bar Baraati** (a bar service) — none are software products. Mitigation already shipped: strong brand `<title>`, `llms.txt` name-disambiguation, entity graph. Off-site entity signals (below) are the remaining work.

---

## 2. What the strong competitors do well (patterns to adopt, not copy)

- **Title patterns:** `{Keyword} in {City} — {Benefit} | {Brand}`. We mirror the *structure* (keyword-first, benefit, brand) without their vendor angle.
- **Massive FAQ + question content** → they win People-Also-Ask. We match with FAQPage schema on every page (done).
- **City/entity page architecture at scale.** We do a *restrained* version (Udaipur/Jaipur/Goa) with genuinely city-specific content — never thin doorway pages.
- **Backlinks from wedding blogs + PR.** This is their real moat and our biggest gap (see §4).

---

## 3. Gaps Baraati can uniquely own

| Gap | Why it's ours | Page |
|---|---|---|
| **Wedding guest app** as a category | Nobody in India markets to this intent | `/wedding-guest-app`, `/wedding-app` |
| **Encrypted government-ID collection** for destination weddings | Genuinely unique feature; no competitor offers it | `/destination-wedding-guest-app`, `/security` |
| **Indian wedding games** (Shaadi Ka Khel) | No competitor has in-app games | `/wedding-games` |
| **Multi-day, multi-ceremony model** | Global apps assume single-day | `/indian-wedding-app` |
| **"Instead of WhatsApp groups"** angle | Speaks to the real default; high emotional resonance | `/vs-whatsapp-groups` |
| **Privacy-first, no-ads positioning** | Marketplaces monetise data/leads; we don't | `/security`, homepage |

---

## 4. Off-page / backlink opportunities (the real gate — not started)

Coverage is now strong; **authority is the ceiling** for competitive terms. Priority order:

1. **Digital-PR data study** — a small original survey → *"The State of Indian Weddings {year}"* stat pack. Wedding + tech + travel press link to stats. Highest-leverage single asset.
2. **Free-tool link magnet** — `/wedding-rsvp-tracker` already exists; promote it to wedding blogs/forums as a linkable free tool.
3. **Directories:** Product Hunt, Indian startup directories, "best wedding apps" roundups (pitch inclusion in the many `/best-wedding-apps-*` listicles that already rank).
4. **HARO / Connectively / Featured / Qwoted** — answer journalist queries in weddings/tech/travel.
5. **Planner partnerships** — each planner mention = a contextual link + referral pipeline (the `partnerships` marketing lane).
6. **Unlinked brand mentions + competitor backlink-gap** sweeps (needs a backlink tool).

---

## 5. One-line strategy

**Concede vendor/venue/planner search to the marketplaces. Own the wedding *guest experience* — a category they ignore — with intent-matched pages (done) and the authority to rank them (the next job).**
