# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Primstav is an interactive Norwegian folk almanac (bondealmanak) rendered as a traditional wooden stave calendar. It is a pure HTML/CSS/JavaScript project — no build tools, no framework, no package manager. Open any HTML file directly in a browser to run it.

## Files

- `index.html` — single-stave layout with a winter/summer half-toggle; mobile-first with a bottom-sheet popup
- `primstav(1).html` — dual side-by-side stave layout showing both halves simultaneously
- `index(2).html` — most polished version; uses JS-driven CSS variables (`--unit`, `--thick`, `--notch`) recalculated on load/resize for responsive metrics
- `primstav.zip` — archive copy, not the source of truth

## Architecture

Each file is a fully self-contained single-file app. The structure is the same across all three:

### Data layer (JS constants)
- `FIXED` — `"M-D"` → `{k, f, d, desc, s}` — fixed church feast days. Keys: `k`=kirkenavn, `f`=folkenavn, `d`=dagsnavn, `s`/`icon`=emoji symbol
- `DAYNAMES` — `"M-D"` → saint name, used only in `dag` mode for non-feast days
- `GN_TABLE` — golden number (gyllentall) dates per 19-year Metonic cycle; golden number = `year % 19 + 1`

### Computed data
- `easter(yr)` — Anonymous Gregorian algorithm, returns a `Date`
- `buildMoveables(yr)` / `moveable(yr)` — builds a `"M-D"` keyed map of moveable feasts as offsets from Easter
- `moonPhase(date)` — approximate phase from a fixed reference date (2000-01-06)
- `season(m0)` — seasonal label + runic symbol for a 0-indexed month

### Rendering
- `buildStave()` / `buildStaves()` / `buildHalf(plank, months)` — DOM construction; iterates months then days, appending `.day-slot` divs
- Each day slot contains: sparse day number (shown on 1st, 5th, 10th, 15th, 20th, 25th), feast icon, carved notch mark (SVG inline or CSS `div.stem`/`div.cross`), and optionally a golden number badge
- Notch visual types: `day | sunday | feast | moveable | today | today-feast`

### UI modes
- **Name mode** (`nameMode`): `kirke` | `folk` | `dag` — controls which feast name field is displayed
- **Half toggle** (index.html): shows one 6-month half at a time (winter = Jan–Jun, summer = Jul–Dec)
- **Dual stave** (primstav(1).html): renders both sides simultaneously

### Popup
Bottom-sheet overlay showing weekday, date, traditional name, golden number indicator, season + rune, feast details (with folk-name alternative), and moon phase.

## Key conventions

- All date map keys use `"M-D"` format with 1-indexed month and literal day (e.g. `"1-1"`, `"12-25"`).
- The variable `m0` is always a 0-indexed month (JavaScript `Date` convention); conversion to 1-indexed happens only at `getFeast()` key lookup boundaries.
- No localStorage, no external API calls, no server required.
- UI text is Norwegian throughout.
