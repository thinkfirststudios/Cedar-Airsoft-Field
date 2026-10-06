# Cedar Airsoft Field — Mockup Brief

**Lead:** Cedar Airsoft Field · Outdoor airsoft field · Cedar Springs, MI
**Slug:** `cedar-airsoft-field`
**Type:** Redesign / restructure of a live Squarespace site
**Status:** LEAD — has not signed. Spec mockup only.
**Researched:** 2026-10-06

---

## Business snapshot — VERIFIED from their own site

| | |
|---|---|
| **Name** | Cedar Airsoft Field |
| **Domain** | cedarairsoftfield.com — **Squarespace**, commerce enabled, `Exo 2` display font |
| **Address** | **17370 Trenton Ave NE, Cedar Springs, MI 49319** |
| **Phone** | **(616) 520-3212** |
| **Email** | **cedarairsoftfield@gmail.com** |
| **Facebook** | facebook.com/CedarAirsoftField |
| **Instagram** | @cedarairsoft |
| **YouTube** | channel `UCL5Nqz78FYM2UR3WV9ELx0w` |
| **Site** | **10 acres**, just north of Grand Rapids, MI |

**Their own positioning, verbatim:**
> *"Cedar Airsoft Field is a 10 acre property just north of Grand Rapids, MI. We're able to cater to all ages, abilities, and airsoft gun preferences through a variety of rec games, large events, private parties, environments throughout the field, rental options, and frequently used products for sale in our field shop. Come sling some BBs with us!"*

> *"we run on an event style schedule so be sure to check our website and Facebook for new and updated events!"*

**Field environments, their words:** exposed field with well-placed pallets for cover · wooded tree lines · bunkers · heavily structured areas like **Village** · large buildings.

**Game modes they run:** Team Death Match · Chaos · Attack & Defend · Kill Confirmed · Infected · Duos/Squads · Search & Destroy · Juggernaut · Hostage · Trouble in Terrorist Town (TTT) · Hunter & Hunted · Pilots Down.

### Real published pricing — use exactly, do not alter

| Item | Price |
|---|---|
| Admission | **$20 / player / day** |
| Rental package | **$20** |
| **Season Pass** | **$400** — valid at all games, **includes HPA fills**, excludes pizza |
| Military discount (veteran or active, any branch, ID required) | **$15** admission |
| Pizza — 2 slices + sports drink | **$5** (no longer included with admission) |
| HPA fill | **$5** all day, game days only unless called ahead |
| Barrel bag | **$5** (required in staging, no exceptions) |
| Mask-only rental | **$5** |

**Private parties:** Mon–Fri **$15/person, no money down** · Sat–Sun **$20/person, 50% down, non-refundable**. Recommend booking **two weeks ahead**. Good for birthdays, bachelor/bachelorette, team building, graduations, family gatherings.

**Shop (in-person at events only):** full seal goggles $28 · high-performance goggles $35 · gloves $30 · slings $15 · BBs by weight 0.20g $20 / 0.25g $25 / 0.28g $28 / 0.30g $30 / 0.32g $32 / 0.40g $15 · tracer BBs $25 · small speed loader $5 · large $30 · green gas $15 · red gas $25 · CO2 $1 each · patches $2–15 · stickers $2 · barrel bag $5 · 32oz water bottle $5 · T-shirt $10 · hoodie $45 · gloves $15 · ushanka $40 · mag rags $80.

### Real field rules — safety-critical, reproduce exactly

**Chrono / engagement tiers** — all guns chrono'd with **0.20g 6mm BBs**, tagged with coloured zip ties:

| Tag | Velocity | Joules | Engagement |
|---|---|---|---|
| **Green** | Under 350 FPS | under 1.1 J | Any distance / 0 ft |
| **Yellow** | 350–400 FPS | 1.1–1.49 J | 20 ft |
| **Red** | 400–450 FPS | 1.5–1.8 J | 50 ft — DMR / semi-locked |
| **Clear** | 450–520 FPS | 1.8–2.8 J | 100 ft — bolt action snipers only. **Not allowed at night games** |

Abuse of the engagement system = warning, then ejection without refund. Re-chrono available on request after a spring or pressure change.

**Other published rules:**
- **Full seal glasses / goggles / mask, ANSI 87+, required on the field at all times**
- No shooting in staging. Guns on safe, mag out, **barrel bags on**. HPA lines disconnected, pistols holstered.
- **Bio BBs required** — biodegradable only, all weights sold at the field store
- No blind fire · call your hits · don't overshoot · **no "bang" rule — a BB must make contact**
- **Grenades have a 15 ft kill radius.** Check with a ref before grenades or pyro.
- Clean up after yourself; don't damage or move property
- **Age 13+ recommended**
- Rentals require **collateral** — driver's licence or car keys, no exceptions
- Rental kit: semi-auto M4 at 300–350 FPS (green tag), 1000 BBs, mask or full seal goggles. Field BBs only in rentals.

**Waiver:** fill out at the field or print at home. **Adults 18+ sign their own. Minors under 18 need a guardian to sign — the guardian is not required to stay.** One waiver per calendar year. All sections must be completed. Current PDFs live at `/s/1st-Adult-Waiver-Website-2026.pdf` and `/s/1st-Minor-Waiver-Website-2026.pdf`.

---

## ⚠️ COMPLIANCE FLAGS — Airsoft field / recreational venue

> **Claude Code: read this section before you build anything in this folder.
> Surface it again, unprompted, before any launch or DNS change.**

### 🔨 BUILD-TIME — changes what you render

| # | Flag | What to do instead |
|---|---|---|
| B1 | ⛔ **No children or minors in any image, any section** — despite "age 13+" and birthday parties being a core line | Masked and helmeted adult players, gear, the Village structures, treelines, bunkers, empty staging. A fully masked player is anonymous and reads as airsoft instantly |
| B2 | **Reproduce the chrono table exactly.** Do not round, re-band, re-order or convert the figures | The four tags, their FPS ranges, their joule ranges and their engagement distances exactly as published, as a real table |
| B3 | Do not paraphrase the eye-protection requirement | "Full seal glasses / goggles / mask, **ANSI 87+**, required on the field at all times" — verbatim |
| B4 | Do not soften or restate the age guidance | "**Age 13+ recommended**" exactly. Not "all ages", not "family friendly" as a substitute |
| B5 | Do not simplify the waiver signing rules | 18+ self-sign · under 18 needs a guardian · guardian need not stay · once per calendar year. All four, every time |
| B6 | **Do not host or author waiver text** | Link their existing 2026 PDFs. `[WAIVER — CLIENT'S CURRENT PDFs, VERIFY YEAR]` |
| B7 | No invented safety claims | ⛔ No "100% safe", "injury-free", "fully supervised at all times", "safest field in Michigan" |
| B8 | Do not invent event dates, game modes or attendance | Their published modes and dates only; everything else `[CONFIRM]` |
| B9 | **Do not quietly fix the contradictions found on their site** — see the defect list | Surface them as `[CONFIRM]` so Alex can raise them |
| B10 | No real replica, gear or BB manufacturer names | They publish weights and gas types, not brands. Keep it that way |
| B11 | Reproduce the grenade rule with its figure | "**15 ft kill radius**, check with a ref before grenades or pyro" |

### 🚀 PRE-LAUNCH — blocks the DNS switch

| # | Must be resolved | Who owns it | Done |
|---|---|---|---|
| L1 | Chrono tiers confirmed current — velocity, joules and engagement distances | Client | ☐ |
| L2 | Waiver PDFs confirmed as the current year's version, and who updates them each January | Client | ☐ |
| L3 | Liability insurance in force; any insurer requirements on site content | Client | ☐ |
| L4 | **If online purchase goes in scope** — refund, cancellation and no-show terms for admission, season passes and party deposits | Client + their counsel | ☐ |
| L5 | Season Pass terms in writing — validity window, transferability, what "all games" includes | Client | ☐ |
| L6 | Party deposit terms — the 50% weekend deposit is non-refundable; that must be stated at the point of payment, not after | Client + their counsel | ☐ |
| L7 | Military discount verification process | Client | ☐ |
| L8 | Written consent for any identifiable player photo; **anything showing a minor is excluded regardless** | Client | ☐ |
| L9 | Terms + Privacy drafted, reviewed, approved | Alex → Client | ☐ |

### 🧨 WALK-AWAY

None. Ordinary recreational venue, well run.

### 📌 Why these apply

The chrono table is the field's stated condition of entry and a safety control — a player who turns up with a gun built to a limit we mis-transcribed is a real injury risk, and re-banding those numbers to look tidier would be the easiest way to cause one. The waiver is a legal instrument their insurer almost certainly specifies; we link it, we don't write it. If online payment enters scope, the non-refundable weekend party deposit and any season-pass terms have to be disclosed before the customer pays, not in a follow-up email. On imagery: our no-minors rule holds even though 13-year-olds play here, because a real photo of a real minor on a spec mockup for an unsigned prospect is a consent problem we cannot solve.

---

## 🔴 Current site — the problem is the opposite of neglect

**This is a good site trapped in one page.** Cedar has done the hard part: real rules, real prices, a real chrono table, real party terms, a real shop list, current waivers. Almost no field in the country publishes this much. It is all stacked onto a single homepage behind a **two-item navigation**.

1. **The entire business is one scroll.** Nav is `Home` and `Events`. Field updates, rules, waiver, admission, rentals, the whole shop price list, private parties and contact are all on `/`. On a phone that is an enormous scroll with no way to jump.
2. **440KB homepage.** Photos are raw camera files — `IMG_0079.JPG`, `IMG_0764.JPG` — uploaded unresized.
3. **Empty meta description.** `<meta name="description" content="" />` — literally blank. Google writes their snippet for them.
4. **A cart exists and sells nothing.** Squarespace commerce is enabled, `/cart` resolves, and the shop section says *"Available for purchase in-person during events only!"* There's a full published price list and no way to buy any of it.
5. **A $400 Season Pass with no way to buy it.** Highest-value product on the site, cash-at-the-gate only.
6. **Admission isn't pre-payable.** Event-style scheduling with walk-up payment.
7. **The waiver is a printable PDF.** Better than most — but still paper at the admissions booth.
8. **Two contradictions in their own event copy** (surface, don't fix):
   - The 18 Oct event says *"Open at 1pm with games Ending at 8pm"* and then *"or until 5:00p"* in the same paragraph
   - The 31 Oct "Zombies!" event is listed at **11:45 PM** with the description *"To be listed!"* — almost certainly a placeholder time
9. **No "plan your visit" block.** Address, hours, price and what to bring are scattered across the scroll.

---

## Pitch angle — for Alex, NOT for the page

**Do not open by telling them their site is bad.** It isn't, and they'll know you haven't looked. Open with the compliment, because it's true and it sets up the actual argument:

> "You've published more real information than almost any field I've looked at — the chrono table, the party terms, the full shop list. The problem is it's all on one page behind a two-item menu. Nobody on a phone is finding your Season Pass."

Then the money:

> "You have a $400 Season Pass, a $20 admission, party deposits and a full shop price list — and a Squarespace cart that sells none of it. Everything is cash at the gate."

Then the throughput:

> "Your waiver is a PDF people print at home. Most don't. Which means your admissions booth is doing paperwork instead of taking money on the busiest hour of the day."

**The commercial case is e-commerce and pre-payment**, in that order: season passes, event admission, party deposits, then the shop. They already have the catalogue written. Be honest that this is phase two, not launch week.

---

## Art direction

### Their identity — preserve
- Current display font is **`Exo 2`** — a wide techy sans. It's a reasonable instinct for the category; keep it or propose a stronger relative, but don't swing to something delicate.
- ⚠️ **Sample their actual brand colours from the live site and logo** rather than guessing — Squarespace serves theme colours from a separate stylesheet, so they aren't in the page source. Their branding leans dark with photography doing the colour work.
- Keep the Cedar wordmark and the field name prominent. "Cedar" and the Michigan woodland setting are the identity — this is a *woodland* field, not an urban CQB arena, and the site should look like it.

### Reference
Closest sibling in the library is the demo template **`_DEMO-AIRSOFT\01-outdoor-woodland-field`** — daylight-led, natural palette, walk-in conversion model. Read that brief for the register; Cedar is the real-world version of exactly that business.

Design references go in:
```
Leads\Website References\_DESIGN-REFERENCES\airsoft-tactical-venue\
```

**Avoid:** camo-pattern backgrounds, stencil fonts, bullet holes, chrome bevels, skull motifs. ⛔ And specifically **do not go neon-green-on-black** — that is another Michigan-adjacent field's look and we have a separate lead using it.

---

## Section plan — the whole job is structure

Mobile-first. The single biggest deliverable here is **turning one page into a navigable site**.

**Navigation:** Home · Events · Rules · Rentals & Shop · Parties · Plan Your Visit · Contact

1. **Hero** — full-bleed field photography. Name, the 10-acre/Grand Rapids line, and the two facts everyone wants: **next event date** and **$20**. `[IMAGE: hero — woodland field, masked adult players, wide]`
2. **Next events strip** — their three or four upcoming dates, pulled forward. Currently buried on a second page.
3. **Plan your visit** — address, directions, hours, admission, what to bring, what's provided. The block that doesn't currently exist.
4. **New here? Start here** — age 13+, waiver before you arrive, eye pro requirement, barrel bag, bio BBs. First-timer path.
5. **Pricing** — admission, rental, **Season Pass $400**, military $15, pizza $5, HPA $5. The Season Pass deserves its own card, not a bullet.
6. **The field** — 10 acres, the five named environments, the game-mode list. Photo-led. They have the photos; the site barely uses them.
7. **Chrono & engagement** — the four-tag table, reproduced exactly, as a real table. This is the page experienced players come for.
8. **Rules** — full rules, properly typeset with anchors.
9. **Waiver** — own page, prominent, both PDFs, "sign before you arrive" framing.
10. **Rentals** — kit contents, collateral requirement, mask-only option.
11. **Shop** — the full catalogue as a real product grid. ⚠️ Built so prices and stock can move online later without a redesign; mark the online-purchase path `[PHASE 2 — CONFIRM SCOPE]`.
12. **Private parties** — weekday vs weekend pricing and deposit terms, two-week lead time, enquiry form capturing date, headcount and rentals needed.
13. **Footer** — address, phone, email, socials, waiver link, current year.

**Extra pages:** `events.html`, `rules.html`, `rentals-shop.html`, `parties.html`, `plan-your-visit.html`, `waiver.html`, `contact.html`, `privacy.html`.

**On a redesign, preserve existing URLs or plan redirects.** Their current structure is just `/` and `/events` plus the two waiver PDF paths — keep `/events` and both PDF URLs working.

---

## Animations & gradients

Restrained. Woodland, daylight, substantial — not neon or frantic.

- Scroll reveals with stagger, 300–450ms
- Slow parallax on full-bleed photo bands only
- Condensing sticky header with the phone number always visible
- Count-up on verified figures only (10 acres)
- Sticky mobile bar: **Events** + **Waiver**
- **Always respect `prefers-reduced-motion`**

**Gradients:** photo scrims only — dark→transparent so type stays legible over field photography, plus warm section transitions. Two stops, same family. No neon bloom.

---

## Imagery

- Royalty-free stock (Unsplash/Pexels) in every `[IMAGE: …]` slot — Michigan-style mixed woodland, pallet and bunker structures, treelines, gear detail, staging areas. Cohesive natural grading, daylight-led.
- ⛔ **NO CHILDREN OR MINORS in any image.** Masked and helmeted adults, gear, terrain, structures, empty staging.
- **Do not reuse their photos.** They have dozens on the live site, but those are real identifiable players — some likely minors — with no consent for our use.
- `[STAFF PHOTO — client to supply]` as labelled empty frames.
- Alt text on everything. Their current images are raw `IMG_####.JPG` uploads; proper sizing and alt text is itself part of the pitch.

---

## ⛔ Do not invent

- ⛔ No prices beyond the verified lists above.
- ⛔ **No altered chrono figures.** Not rounded, not re-banded, not converted.
- ⛔ No invented event dates, game modes or attendance figures.
- ⛔ No invented safety claims, supervision guarantees or injury statistics.
- ⛔ No invented insurance, certification or affiliation.
- ⛔ No testimonials or review scores. `[COLLECT]`. No `aggregateRating` schema.
- ⛔ Do not resolve the two event-copy contradictions — surface them.
- Keep every `[CONFIRM]` visible in the rendered page.

---

## If they sign — collect first

1. Confirmation the chrono tiers and all rules are current
2. Who maintains the waiver PDFs and when they roll over each January
3. Season Pass terms in writing — validity, transferability, what "all games" covers
4. Party deposit and cancellation terms, for display at point of payment
5. Scope decision on e-commerce: season passes, admission, party deposits, shop — and in what order
6. Real field photography with consent, **excluding minors**
7. How the event calendar is maintained, and whether it should sync with Facebook
8. Shop inventory and whether stock is tracked
9. Logo vectors, exact brand hex, licensed fonts
10. Domain + DNS access — **web records only, never touch MX**
11. Redirect map — keep `/events` and both waiver PDF URLs alive
