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
      wired into `.github/workflows/test.yml`, runs on every push/PR
- [ ] Graduate to scheduled GitHub Action once manual research sessions
      feel reliable — not started; PR #1 is the first real research run,
      too early to automate
- [ ] Surface sourcing in the UI (tooltip/footnote per feast day) — not
      started; holding until there's enough `confirmed` content that a
      sourcing UI has something real to show

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
