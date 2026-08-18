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

## Current state (as of the moveable-feast source backfill, 2026-08-18)

| status | count | meaning |
|---|---|---|
| `solid`/`confirmed` | 14 | 2+ independent acceptable sources on record — 3 calendar days (`1-11`, `2-29`, `11-2`, from PR #1) + 11 moveable feasts (from the source backfill) |
| `thin`/`proposed` | 366 | either 0-1 sources, or full legacy content that predates the sourcing standard — includes the 320 name-only `nameday` days, the 37 remaining `fixed` days, and 5 moveable feasts where a second source couldn't be found |
| `missing` | 2 | no entry at all, and researched-and-confirmed-absent from the primstav tradition: `10-11`, `10-12` |
| `needs-regional-variants` | 0 | not yet assessed for any entry |

Per-entry source records live in `research/entries/` — one file per fixed
day researched so far (`1-11.json`, `2-29.json`, `11-2.json`), plus one
consolidated `moveable-feasts.json` covering all 16 moveable feasts (a
single file made more sense for that batch: same 16-entry bounded set,
researched in one pass, rather than 16 near-duplicate files).

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
