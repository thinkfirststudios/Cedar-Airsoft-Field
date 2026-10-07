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

## Design (v3: tactical-HUD interface, 2026-10-06)

Third pass, at Alex's request for a "Ghost Recon UI". It's a game-HUD interface built from scratch: no game names, logos, fonts or assets are used. It **overrides the brief's daylight direction** by Alex's call. The brief's bans still hold: no camo, stencils, skulls or neon green.

- **Look:** near-black field green, translucent blurred panels with corner ticks, bone-white UI type, and blaze `#E8642A` as the only action colour. Olive, khaki, coyote and slate survive only as thin category stripes. Faint scanlines and a vignette over everything. `[CONFIRM brand hex from logo files]`
- **Type:** Barlow Condensed for UI and headlines, Barlow for text, Exo 2 for the wordmark (their current font).
- **HUD pieces:** a compass strip that turns with the pointer, a waypoint marker over the hero photo, and the countdown to the next published game as a main-objective tracker. Section titles have their own labels (Intel, Briefing, Loadout, Area of operations, Weapon classes, Rules of engagement, Armory). The map is restyled as a dark tactical map with a grid and pulse marker. Menu rows, shop items and the rules contents invert to white on hover or focus.
- **Loading screen:** home page only, the first visit per browser session, about 1.3s. A click or any key skips it, and it never shows for reduced-motion users. The tip is one of their own published rules.
- **Keyboard:** Q and E switch pages like menu tabs (ignored while typing in a form). Key hints are shown in the nav and footer.
- **Motion:** the region-name title reveal, compass, reticle (mouse only), game-modes feed, segmented velocity bar, 10-acre count-up and parallax band. All of it is off under `prefers-reduced-motion`.
- The compass heading and the waypoint's position on it are decorative. They don't claim to be a real bearing to the field.
- Cedar is a rec field, not a milsim operator; the copy doesn't claim milsim events.

### v4 refinements (2026-10-06, review feedback)

- **Headlines:** Chakra Petch 700, chosen from a side-by-side test of eight faces. Its chamfered corners read like stencilled equipment plates without being a stencil font. The hero and page titles use the italic and a worn-print speckle mask. Barlow Condensed stays for the small HUD labels.
- **Light sections:** every `section--bone` / `section--paper` is now an off-white "canvas" theme driven by CSS variables, so the same components flip automatically. The tactical map stays a dark inset.
- **Texture:** film grain over the whole page; ripstop weave (the grid of military fabric, not camo) on light and dark sections; generated topographic contours (`assets/tex/topo-*.svg`, about 23 KB each); hazard-tape tabs on the light sections and footer; a faint hatch inside panels.

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
