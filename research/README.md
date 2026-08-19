# Content research — foundation

This directory is the working home for primstav content research, kept
separate from the three live HTML apps (see `SCHEMA.md` §
"Relationship to the live app" for why).

## What's here

- **`SCHEMA.md`** — the field schema every entry must follow.
- **`SOURCING.md`** — what counts as an acceptable source, and what doesn't.
- **`coverage.csv`** — all 366 calendar days (`M-D`), each with its current
  status. This is the work queue.
- **`coverage-moveable.csv`** — the 16 Easter-relative feasts, tracked
  separately since their calendar date shifts year to year and can't be
  keyed by `M-D`.

## Current state (as of the secondary-merkedager promotion, 2026-08-19)

`coverage.csv` (366 calendar days):

| status | count | meaning |
|---|---|---|
| `solid` | 67 | 37 from earlier backfills + 30 promoted from `nameday` to `fixed` this pass |
| `thin` | 297 | 290 remaining name-only `nameday` days + 6 unconfirmed `fixed` days (`1-20`, `8-1`, `8-29`, `2-14`, `12-27`, `12-31`) + `1-12` (Midtvinter, researched but deliberately not filled) |
| `missing` | 2 | `10-11`, `10-12` — confirmed absent from the primstav tradition |

`coverage-moveable.csv` (16 Easter-relative feasts): 11 `solid`, 5 `thin`.

`needs-regional-variants` has not been applied to any entry yet in either
tracker.

**Findings worth flagging explicitly:**

- Three currently-shipped entries — `2-14` (Valentinsdagen), `12-27`
  (Johannes apostelmesse), `12-31` (Nyttårsaften) — are absent from *both*
  SNL's primstav table *and* the museum's month pages. Real evidence they
  may not be traditional primstav days. Left in the app; a content-scope
  call, not a sourcing one.
- SNL's own primstav article lists ~110 dated entries total, but the app's
  `FIXED` content only covered 59 of them before this pass (43 fixed + 16
  moveable). The other ~50 were sitting as generic `nameday` entries. This
  pass promoted 30 of them with 2-source confirmation, including **Olsok
  (7-29, St. Olav's Day)** — one of the most historically significant days
  in the Norwegian calendar, and the single most surprising gap found in
  this research effort. ~30 more SNL-listed candidates remain unpromoted,
  single-sourced (SNL only) — future work.
- Also fixed in passing: `10-14` (Vinternatt) existed in `polished.html`
  but was missing from `index.html`/`dual.html` entirely — a pre-existing
  cross-file drift, same category as the earlier Blåmandag bug, caught
  while cross-checking against SNL's table rather than by the test suite
  (which doesn't check `FIXED` content parity across files, only
  `easter`/`buildMoveables`/`GN_TABLE`).

Per-entry source records live in `research/entries/` — one file per entry
researched individually early on, three consolidated files for later batch
work (`moveable-feasts.json`, `fixed-feasts-backfill.json`,
`secondary-merkedager-promotion.json`) — one file per bounded batch made
more sense than one file per entry once the batches got large.

See `../PLAN.md` for where this fits in the overall project roadmap and
what phase/infra work is done vs. still open — this file just tracks the
research directory's own contents.

## Workflow for content changes

Content research always goes through a branch + PR, never a direct commit
to `master` — content claims need a review point before they're live, even
a self-review. Every PR gets a short provenance note: which entries
changed, why, and which sources were used (or "no new sources — retroactive
citation of existing content" for backfill work like this one). See PR #1
and the moveable-feast source-backfill PR for examples.
