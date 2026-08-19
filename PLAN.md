# Primstavkalender — Project Plan

## Brand direction (decided 2026-08-18)

Content stays scoped to what's actually sourced: medieval/Christian-era
Norwegian folk-calendar (primstav) tradition, per `research/SOURCING.md`.
"Norse"/"Viking" language is fine in marketing/SEO copy where it's honestly
defensible (e.g. "the ancestor of Viking-era timekeeping"), but the feast-day
content itself does not get bent toward pre-Christian material to chase that
framing. See `research/SOURCING.md` and `research/SCHEMA.md` for why the
evidence base is much thinner for pre-Christian practice than for the
church-calendar primstav tradition — that gap is the reason this was worth
deciding explicitly rather than drifting into it.

## Phase 1: Content Research Agent

- [x] Data schema (`research/SCHEMA.md`) — entry fields: date, type, k/f/d,
      desc, icon, region, variants, sources, confidence, notes
- [x] Coverage tracker (`research/coverage.csv`, `research/coverage-moveable.csv`)
      — every calendar day + all moveable feasts, status-tracked
- [x] Sourcing standard (`research/SOURCING.md`) — acceptable/unacceptable
      sources defined, citation format specified
- [x] Cross-referencing requirement — `confirmed` requires 2+ independent
      acceptable sources, else `proposed` (SCHEMA.md)
- [x] Uncertainty flagged explicitly via `confidence` + `notes`, never
      smoothed over (demonstrated on PR #1: 3 of 6 researched gap days were
      left unfilled because the evidence didn't support adding them)
- [x] Regional-variant representation decided: single entry + `variants[]`
      array, not separate per-region entries (SCHEMA.md § Regional variants)
- [x] Draft-branch + PR discipline — enforced on PR #1
      (`research/fill-missing-days`), merged 2026-08-18
- [x] Per-entry provenance notes in PRs — see PR #1's description and
      `research/entries/*.json`
- [x] Test coverage for moveable feasts — `tests/moveable-feasts.test.js`,
      wired into `.github/workflows/test.yml`, runs on every push/PR.
      Extended to also check `FIXED` content parity across the three HTML
      files (PR #5) — this is what caught two of the three cross-file drift
      bugs below.
- [ ] Graduate to scheduled GitHub Action once manual research sessions
      feel reliable — not started; 7 manual research PRs in now (#1-#7),
      still too early to automate
- [x] Surface sourcing in the UI — PR #8, merged 2026-08-19. Small
      "📚 Kilder: ..." footnote in the feast popup across all three HTML
      files, shown only for the 78 confirmed entries.

Only unchecked item left in Phase 1's original plan is the scheduled
GitHub Action — deliberately held, not blocked on anything.

**Content status (2026-08-19)**: 67 `solid`/`confirmed` calendar days + 11
`solid` moveable feasts, out of 366 + 16. The SNL-primstav-table ×
Musea i Nord-Østerdalen research line is now cleanly exhausted — every
date in SNL's ~110-entry table has been checked against the museum's
month pages; most reached `confirmed`, the rest are genuinely single-sourced
(not just unresearched). Further FIXED-day promotion needs a different
source (NFS archive, digitized bygdebok, academic paper), not more of the
same two sources. The remaining 290 `nameday` entries are outside SNL's
primstav table entirely — likely correctly minimal, not an unresearched
gap. Full detail and per-batch provenance in `research/README.md` and
`research/entries/`.

**Notable findings from this research pass**, worth knowing about even
without reading the research docs:
- **Olsok (7-29, St. Olav's Day) was missing from the app entirely** until
  PR #4 — one of the most historically significant days in the Norwegian
  calendar (Olav's death at Stiklestad, 1030), found by cross-referencing
  SNL's full primstav table (~110 dated entries) against what `FIXED`
  actually covered (was only 59 of them).
- Three shipped entries — `2-14` Valentinsdagen, `12-27` Johannes
  apostelmesse, `12-31` Nyttårsaften — were absent from every primstav
  source checked, real evidence they weren't traditional primstav days.
  Removed from the app 2026-08-19 at your direction (PR #6).
- Found and fixed 3 pre-existing cross-file content-drift bugs between
  `index.html`/`dual.html`/`polished.html` (a Blåmandag feast missing from
  two files, a Vinternatt entry missing from two files, one file's
  Trettendagen name missing the word "dag"). None were caused by this
  session's own edits — they predated it and surfaced while
  cross-referencing sourced content against what the app actually ships.

## Phase 2: US Market / Positioning

- [x] Brand direction decided (see above)
- [ ] Pick a name + domain for the US-facing product
- [ ] Full English translation of UI copy and feast-day content — hold
      until Phase 1 has produced enough `confirmed`/`solid` content that
      there's something substantial to translate (most of the calendar is
      still `thin`/name-only per `research/coverage.csv`)
- [ ] Decide site structure: `/en/` path on the same domain vs. a fully
      separate US-branded site over the same content backend
- [ ] Legal/business basics: entity structure, US payment processing (Stripe)

## Phase 3: Monetization

- [ ] Content-driven: each `confirmed` feast day as a long-form SEO landing
      page — contingent on Phase 1 actually producing that content first
- [ ] Physical product: printed wall calendar / primstav replica
      (print-on-demand or Etsy)
- [ ] Digital product: PDF calendar, ad-free tier, or feast-day email digest
- [ ] Affiliate: Norse-themed products via Amazon Associates / Etsy,
      placed contextually per relevant feast day
- [ ] Free vs. paid tier boundary, decided before building payment infra

## Phase 4: SEO

- [ ] Keyword research — map accurate terms (primstav, Norwegian folk
      calendar) vs. traffic terms (Viking calendar, Norse zodiac, runic
      calendar) honestly per page, consistent with the brand decision above
- [ ] Each feast-day page as its own indexed URL — quality gated by Phase 1
      actually reaching `confirmed` on enough days first
- [ ] Structured data / schema markup for calendar/event content
- [ ] Backlink strategy: Norse history forums, r/Norse, folklore subreddits,
      homeschool/history-curriculum bloggers
- [ ] Pinterest presence, if physical products happen
- [ ] Core Web Vitals check on the US-facing build

## Notes on execution

A lot of Phase 2/3 is real-world action outside what I can do directly:
buying a domain, forming a business entity, opening a Stripe account. I can
research options, draft copy, and build the technical side, but those specific
steps need you to act. Flagging this so the plan doesn't imply I'll just
silently execute them.
