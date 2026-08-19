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

## Current state (as of removing the 3 unsourced days, 2026-08-19)

`coverage.csv` (366 calendar days):

| status | count | meaning |
|---|---|---|
| `solid` | 67 | 37 from earlier backfills + 30 promoted from `nameday` to `fixed` |
| `thin` | 294 | 290 remaining name-only `nameday` days + 3 unconfirmed `fixed` days (`1-20`, `8-1`, `8-29`) + `1-12` (Midtvinter, researched but deliberately not filled) |
| `missing` | 5 | `10-11`, `10-12` (confirmed absent from the primstav tradition) + `2-14`, `12-27`, `12-31` (removed 2026-08-19 — see below) |

`coverage-moveable.csv` (16 Easter-relative feasts): 11 `solid`, 5 `thin`.

`needs-regional-variants` has not been applied to any entry yet in either
tracker.

**Findings worth flagging explicitly:**

- Three previously-shipped entries — `2-14` (Valentinsdagen), `12-27`
  (Johannes apostelmesse), `12-31` (Nyttårsaften) — were absent from *both*
  SNL's primstav table *and* the museum's month pages, real evidence they
  weren't traditional primstav days. Reported to the user, who directed
  removal; removed from `FIXED`/`ICONS` across all three HTML files
  2026-08-19. `research/entries/fixed-feasts-backfill.json` keeps the
  original finding for the record.
- SNL's own primstav article lists ~110 dated entries total, but the app's
  `FIXED` content only covered 59 of them before this pass (43 fixed + 16
  moveable). The other ~50 were sitting as generic `nameday` entries. This
  pass promoted 30 of them with 2-source confirmation, including **Olsok
  (7-29, St. Olav's Day)** — one of the most historically significant days
  in the Norwegian calendar, and the single most surprising gap found in
  this research effort. The remaining ~29 SNL-listed candidates were
  checked directly against the museum's month pages (not just assumed
  absent from an earlier excerpt) — none are corroborated there. That
  pool is genuinely single-sourced for now, not just unresearched; each
  is noted individually in `coverage.csv` with the SNL name recorded.
  Not promoted to `FIXED`, consistent with how `1-20`/`8-1`/`8-29` (also
  single-sourced) were left alone rather than force-added.
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
