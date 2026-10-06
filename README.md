# Cedar Airsoft Field — spec mockup

**STATUS: LEAD — not signed.** Spec mockup built to pitch a restructure of cedarairsoftfield.com. Not deployed, not pointed at a domain. All photography is stock placeholder.

Built 2026-10-06 from `PROMPT.md`. Plain static HTML/CSS/JS, no build step. Open `index.html`.

## Pages

| File | What it is | Replaces on live site |
|---|---|---|
| `index.html` | Home — hero, next events, plan your visit, first-timer path, pricing, field, chrono, rules, waiver, rentals, shop, parties | `/` |
| `events.html` | Upcoming events + this season's past events | `/events` — **keep this URL** |
| `rules.html` | Full rules with anchors (`#engagement`, `#eye-protection`, …) | section of `/` |
| `rentals-shop.html` | Rental kit + full shop price list (filterable grid) | section of `/` |
| `parties.html` | Weekday/weekend pricing, enquiry form with live estimate | section of `/` |
| `plan-your-visit.html` | Address, map, schedule, bring/provided, first-game steps | — (new) |
| `waiver.html` | Waiver rules + links to their current PDFs | section of `/` |
| `contact.html` | Contact cards, demo form, `[STAFF PHOTO]` frames | section of `/` |
| `privacy.html` | **DRAFT** privacy page, written from what the site does | — (new) |

## Design

- **Palette sampled from their live Squarespace theme** (`site.css`): forest `#1C231B` (their `--darkAccent`), bone `#E2DFD6` (their `--lightAccent`). Their indigo theme accent (`hsl(242,65%,40%)`) is **not** carried over; cedar-bark `#9B4526` is a proposed second accent. `[CONFIRM brand hex from logo files]`
- **Type:** Exo 2 (kept from their site) + Barlow body.
- **Motif:** the chrono zip-tie — coloured tag swatches in the table, a tie-shaped mark on every eyebrow.
- **Logo:** text wordmark + a simple cedar-tree glyph. Placeholder until we have their vectors.
- Daylight-led, no camo, no stencils, no neon green.
- Motion: staggered reveals (~420ms), slow parallax on photo bands only, condensing sticky header (phone always visible), 10-acre count-up, sticky mobile bar (Events + Waiver). Everything is off under `prefers-reduced-motion`.

## Compliance notes (from PROMPT.md)

- Chrono table reproduced exactly from the brief (and checked against their live homepage). One shared source in the generator, so it's identical on Home, Events and Rules.
- Eye-pro rule uses their live wording verbatim: "Full seal glasses/goggles/mask (ANSI 87+) are required on the field at all times."
- "Age 13+ recommended." verbatim. Their "cater to all ages" line is deliberately **not** used.
- All four waiver rules appear everywhere the waiver is discussed. Waiver PDFs are **linked** to their live 2026 files, not hosted or rewritten.
- No minors in any image. Every player shown is masked and wearing eye protection. Their own photos were not reused.
- No reviews, ratings or `aggregateRating`. JSON-LD = `SportsActivityLocation` (home) and `Event` (events page) with real data only.
- `<meta name="robots" content="noindex, nofollow">` on every page while it's a mockup.

## Defects on their site — surfaced as [CONFIRM], not fixed

1. **18 Oct event**: "games Ending at 8pm" then "or until 5:00p" in the same paragraph.
2. **31 Oct Zombies!**: listed 5:00–11:45 PM with "To be listed!" as the description.
3. **"0.6mm" BBs** in the shop list (chrono section says 6mm).
4. **"cater to all ages"** in the intro vs **"Age 13+ recommended"** in the rules. Not shown on the page, raise it in conversation.
5. Two glove listings: "Gloves $30" (gear) and "Cedar Airsoft gloves $15" (merch). Both kept, since they're probably different products.

## Images

`assets/img/PLACEHOLDER-*.webp`, from Pexels (free licence), resized and converted to WebP (~2 MB total across the whole site, lazy-loaded below the fold). Sources are in `assets/img/CREDITS.md`. **Replace all of them before launch** with their own photos, with consent, and none showing minors.

## Redirect plan (if they sign)

- `/events` → `events.html` (Netlify/CF Pages pretty URLs handle this; see `_redirects`).
- `/s/1st-Adult-Waiver-Website-2026.pdf` and `/s/1st-Minor-Waiver-Website-2026.pdf`: copy the PDFs into `/s/` at those exact paths, or redirect them. Every printed flyer and old Facebook post links there.
- DNS: web records only. **Never touch MX.**

## Phase 2 markers

`[PHASE 2 — … CONFIRM SCOPE]` marks where commerce slots in without a redesign. In order of value: Season Pass → event admission → weekend party deposits → shop. Shop cards already carry `data-sku` / `data-price`.
