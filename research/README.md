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

## Current state (as of the fixed-day source backfill, 2026-08-19)

`coverage.csv` (366 calendar days):

| status | count | meaning |
|---|---|---|
| `solid` | 37 | all `fixed`-type days except 6: `1-20`, `8-1`, `8-29`, `2-14`, `12-27`, `12-31` |
| `thin` | 327 | 320 name-only `nameday` days + the 6 unconfirmed `fixed` days above + `1-12` (Midtvinter, researched but deliberately not filled) |
| `missing` | 2 | `10-11`, `10-12` — confirmed absent from the primstav tradition |

`coverage-moveable.csv` (16 Easter-relative feasts): 11 `solid`, 5 `thin`
(`Quinquagesima`, `Fastelavn-mandag`, `Fastelavn-tirsdag`, `Midfaste-søndag`,
`Andre pinsedag`).

`needs-regional-variants` has not been applied to any entry yet in either
tracker.

**Notable finding from the fixed-day backfill**: three currently-shipped
entries — `2-14` (Valentinsdagen), `12-27` (Johannes apostelmesse), and
`12-31` (Nyttårsaften) — are absent from *both* SNL's ~110-date primstav
table *and* the regional museum's dedicated month pages. That's real
evidence these may not be traditional primstav days (Valentine's Day
almost certainly isn't; New Year's Eve as a big secular event is a modern
institution). Left in the app as-is — removing shipped content is a
content-scope call, not something to resolve inside a sourcing pass — but
flagged clearly in `research/coverage.csv` and
`research/entries/fixed-feasts-backfill.json` for whoever picks that up.

Per-entry source records live in `research/entries/` — one file per fixed
day researched individually early on (`1-11.json`, `2-29.json`,
`11-2.json`), plus two consolidated files for later batch work
(`moveable-feasts.json`, `fixed-feasts-backfill.json`) — a single file per
bounded batch made more sense than one file per entry once the batches got
large.

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
