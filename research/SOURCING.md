# Sourcing standard

Applies to every entry tracked in `research/coverage.csv` and
`research/coverage-moveable.csv`, and every `sources[]` item in
`research/SCHEMA.md`. An entry only reaches `confidence: confirmed` with
2+ acceptable sources that independently corroborate it.

## Acceptable sources

- **Norsk folkeminnesamling (NFS)**, University of Oslo — the primary
  Norwegian folklore archive. Cite the accession/reference number if known.
- **Digitized bygdebøker** (local/regional histories) via nb.no
  (Nasjonalbiblioteket) — cite the book, author, page.
- **Academic folklore scholarship** — monographs and peer-reviewed papers in
  norsk folkloristikk / kulturhistorie. E.g. Ørnulf Hodne, Ronald Grambo, or
  equivalent standing.
- **Established reference works** — e.g. *Norsk kulturhistorisk leksikon*,
  published primstav-specific literature.
- **Museum collection records** for physical primstav artifacts — Norsk
  Folkemuseum, Digitalt Museum — these are primary sources for how a given
  day was actually carved/named on real staves, which is the core subject
  matter here.
- **Church/liturgical calendars** for the `k` (kirkenavn) baseline — these
  dates and Latin/church names are well-documented and carry a lower
  evidentiary bar than folk material, since they're institutional record
  rather than oral tradition.

## Unacceptable sources

- Blog posts, Pinterest boards, or "fun traditions" listicles with no
  citation of their own.
- A single unverified Wikipedia sentence — Wikipedia can be a *pointer* to a
  source, but the entry must cite what Wikipedia itself cites, not Wikipedia
  as the source.
- AI-generated summaries or content with no traceable origin.
- Forum posts, social media claims, or "I heard that..." without provenance.

If a source is borderline, say so in the entry's `notes` field rather than
silently including or excluding it.

## Citation format

Keep it simple and consistent — a single string plus an optional locator:

```json
{"citation": "Author or institution, \"Title\", Year", "ref": "page/accession number", "type": "academic | archive | museum | reference-work | liturgical"}
```

`type` must be one of the five listed — it's what lets a future check flag an
entry whose sources don't map to the acceptable list above.
