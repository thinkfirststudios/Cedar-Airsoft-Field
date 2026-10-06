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

## Design (v2: tactical direction, 2026-10-06)

Redesigned after Alex's feedback ("looks vibecoded"). References: dark paintball template with olive, khaki and slate tiles, and a red diagonal-slash paintball template. The goal is military in feel but still fun. This **overrides the brief's daylight direction** by Alex's call. The brief's hard bans still hold: no camo, stencils, skulls or bullet holes, and no neon-green-on-black.

- **Palette, field-kit colours:** night olive `#10150F`, olive drab `#4F5B32`, khaki `#C8B98C`, coyote `#93714D`, slate `#3B4650`, bone `#EEE8D9`. Blaze `#E8642A` is used only for actions. Their live theme dark (`#1C231B`) sits inside this range. `[CONFIRM brand hex from logo files]`
- **Type:** Saira Condensed for headlines. Exo 2 is kept for the wordmark (their current font). Barlow is the body face.
- **The big idea:** a live countdown clock in the hero to their next published game, set against a diagonal blaze slash.
- **Structure:** diagonal section cuts, HUD corner brackets on key photos, the schedule as briefing rows coloured by game type, first-game steps as olive, khaki, coyote and slate tiles, and a price list with dotted leaders like a supply sheet.
- **Motion:** a hero load sequence (headline rises, slash draws in, khaki sheen), a reticle that follows the pointer over the hero (mouse only), the game-modes ticker, and a to-scale velocity bar on chrono that fills on scroll. Also a 10-acre count-up, parallax bands, the condensing header, and the sticky mobile bar (Events + Waiver). All of it is off under `prefers-reduced-motion`.
- Cedar is a rec field, not a milsim operator. The site only borrows the look; the copy doesn't claim milsim events.

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
