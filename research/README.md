# Content research — foundation

This directory is the working home for primstav content research, kept
separate from the three live HTML apps (see `SCHEMA.md` §
"Relationship to the live app" for why).

## What's here

- **`SCHEMA.md`** — the field schema every entry must follow.
- **`SOURCING.md`** — what counts as an acceptable source, and what doesn't.
- **`coverage.csv`** — all 366 calendar days (`M-D`), each with its current
  status. This is the work queue.
- **`coverage-moveable.csv`** — the 15 Easter-relative feasts, tracked
  separately since their calendar date shifts year to year and can't be
  keyed by `M-D`.

## Current state (generated from the live `polished.html` data)

| status | count | meaning |
|---|---|---|
| `thin` | 360 + 15 moveable | entry exists (either full `fixed`/`moveable` content, or a name-only `nameday`) but has zero sources on record, so it's `proposed` under the new standard, not `confirmed` |
| `missing` | 6 | no entry at all: `1-11`, `1-12`, `2-29`, `10-11`, `10-12`, `11-2` |
| `needs-regional-variants` | 0 | not yet assessed for any entry — apply this status as regional research surfaces divergent naming |

Nothing today is `solid`/`confirmed` — that's expected. The 40 `fixed` and
15 `moveable` entries have real, usable content, it just predates the
sourcing standard. Backfilling citations for those is equally valid research
work to filling the 6 gaps or fleshing out the 320 name-only `nameday`
entries — track all three the same way in `coverage.csv`.

## What's not built yet

This covers only the "Foundation" phase. Later phases from the original
plan — cross-referencing workflow, draft-branch/PR discipline, per-entry
changelogs, scheduled GitHub Action runs, sourcing tooltips in the UI, and
moveable-feast date tests — are intentionally out of scope here and not yet
implemented.
