# Data schema — primstav content

This is the schema a content-research agent (or a human) fills in *before* any
entry is merged into the live `FIXED` / `DAYNAMES` / `ICONS` objects in
`index.html`, `dual.html`, `polished.html`. It's stricter than what's
currently shipped — see [Relationship to the live app](#relationship-to-the-live-app).

## Entry types

The app has three kinds of day entries today (see `research/coverage.csv` and
`research/coverage-moveable.csv` for the full inventory):

| type      | keyed by                        | count | current richness |
|-----------|----------------------------------|-------|-------------------|
| `fixed`   | `"M-D"` (1-indexed month, literal day) | 40  | k/f/d/desc/icon, but no sources |
| `moveable`| offset in days from Easter Sunday | 16  | k/f/d/desc/icon, but no sources |
| `nameday` | `"M-D"`                          | 320   | name only, no desc/source |
| *(gap)*   | `"M-D"`                          | 6     | nothing — `1-11`, `1-12`, `2-29`, `10-11`, `10-12`, `11-2` |

`fixed` + `nameday` + gaps = 366 (leap day `2-29` included).

## Fields

| field | type | required | notes |
|---|---|---|---|
| `date` | `"M-D"` string, or `null` for moveable | required unless `type: moveable` | matches existing key convention exactly — 1-indexed month, no zero-padding |
| `type` | `fixed \| moveable \| nameday` | required | |
| `easter_offset` | integer | required if `type: moveable`, else omit | days relative to Easter Sunday, e.g. `-49`, `0`, `60` |
| `k` (kirkenavn) | string | required for `fixed`/`moveable` | official church feast name |
| `f` (folkenavn) | string | required for `fixed`/`moveable` | folk/vernacular name — this is the interesting one |
| `d` (dagsnavn) | string | required for `fixed`/`moveable` | liturgical/Latin or alternate day-name |
| `desc` | string, one sentence, Norwegian | required for `fixed`/`moveable` | mirrors existing tone — short, concrete, no filler |
| `icon` | single emoji | required for `fixed`/`moveable` | matches existing `ICONS` convention |
| `region` | array of strings, or `null` | optional | Norwegian landsdeler/regions this variant is attested in; `null`/omitted = nationwide or unknown |
| `variants` | array of `{region, k?, f?, d?, desc?, source}` | optional | see [Regional variants](#regional-variants) below |
| `sources` | array of `{citation, ref, type}` | required to reach `confirmed` | `type` must be one of the acceptable categories in `research/SOURCING.md` |
| `confidence` | `confirmed \| proposed` | required | `confirmed` = 2+ independent sources; anything else (0 or 1 source) is `proposed` |
| `notes` | string | optional | ambiguity, conflicting sources, open questions |

### Example — fixed feast

```json
{
  "date": "8-10",
  "type": "fixed",
  "k": "Laurentiusmesse",
  "f": "Lavransmesse",
  "d": "Lorensdag",
  "desc": "Martyren Laurentius. «Laurentiusgråt» — augustregnet.",
  "icon": "💧",
  "region": null,
  "sources": [
    {"citation": "Ørnulf Hodne, Norsk folkloristikk, 1999", "ref": "p. 142", "type": "academic"},
    {"citation": "Norsk folkeminnesamling, UiO", "ref": "NFS X-1234", "type": "archive"}
  ],
  "confidence": "confirmed",
  "notes": null
}
```

### Example — nameday (currently name-only, needs full research)

```json
{
  "date": "1-9",
  "type": "nameday",
  "k": null,
  "f": null,
  "d": "Julian",
  "desc": null,
  "icon": null,
  "sources": [],
  "confidence": "proposed",
  "notes": "Only a saint name exists today (DAYNAMES). No folk material researched yet."
}
```

### Example — moveable feast

```json
{
  "date": null,
  "type": "moveable",
  "easter_offset": -46,
  "k": "Askeonsdag",
  "f": "Askonsdag",
  "d": "Dies cinerum",
  "desc": "Fastens første dag. Aska strykes i pannen.",
  "icon": "⚫",
  "sources": [],
  "confidence": "proposed",
  "notes": "Existing content, unsourced."
}
```

## Regional variants

Decision: **one entry per day, with a `variants[]` array** — not separate
entries per region.

Why: the app's rendering is built entirely around a single `"M-D"` → entry
lookup (`getFeast()`, `FIXED[key]`, `DAYNAMES[key]`). Separate per-region
entries would require a second dimension (which region is the viewer in?)
that doesn't exist anywhere in the app today — a much bigger change than the
content work this plan is scoped to. A `variants[]` array is additive: the
base entry stays the nationwide/most-attested version, and regional
divergence is data hanging off it. The UI can ignore `variants` entirely
until "Surface sourcing in the UI" is picked up.

## Confidence rule

- `confirmed` — at least 2 independent sources in `sources[]`, per
  `research/SOURCING.md`'s acceptable list.
- `proposed` — 0 or 1 sources. **This includes all 56 currently-shipped
  `fixed`/`moveable` entries** — they have real content but no citations on
  record, so under this standard they start as `proposed`, not `confirmed`,
  until sourced retroactively. That backfill is real work, not a formality —
  track it the same as new research in `research/coverage.csv`.

Do not smooth a `proposed` entry into looking `confirmed` by omitting the
distinction in the UI or in a PR description. If only one weak source exists,
say so in `notes`.

## Relationship to the live app

This schema is intentionally richer than the `FIXED`/`DAYNAMES`/`ICONS`
objects in the three HTML files (no `sources`, `confidence`, `region`, or
`variants` fields exist there today). Research output lives here, in
`research/`, as the working/source-of-truth format. Merging a `confirmed`
entry into the live JS objects is a separate, later step — do not skip
straight to editing `index.html`/`dual.html`/`polished.html` from raw
research. (An automated sync step is a candidate for the "graduate to
scheduled runs" phase, not built yet.)
