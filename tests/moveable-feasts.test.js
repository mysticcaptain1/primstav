#!/usr/bin/env node
'use strict';
/*
 * Regression tests for the Easter-dependent date math (easter(), buildMoveables())
 * and the GN_TABLE golden-number lookup, run directly against the inline <script>
 * in each of the six self-contained HTML files (3 Norwegian + 3 English under en/)
 * — no build step, no dependencies, just Node's built-in vm/fs/assert.
 * Run with: node tests/moveable-feasts.test.js
 *
 * Cross-file consistency checks run separately per language group: the English
 * files are translations, not duplicates, so their kirkenavn/feast names are
 * expected to differ from the Norwegian ones — only within-group agreement
 * (the 3 Norwegian files vs each other, the 3 English files vs each other)
 * indicates drift.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT = path.join(__dirname, '..');
const GROUPS = {
  Norwegian: ['index.html', 'dual.html', 'polished.html'],
  English: ['en/index.html', 'en/dual.html', 'en/polished.html'],
};
const ALL_FILES = Object.values(GROUPS).flat();

// Extract a top-level `function name(...){ ... }` or `const NAME = { ... };` block
// by brace-counting from its first '{', respecting quoted strings so a stray
// '{'/'}' inside a description string can't desync the count.
function extractBlock(src, marker) {
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`marker not found: ${marker}`);
  const braceStart = src.indexOf('{', start);
  let depth = 0, inStr = null, i = braceStart;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  return src.slice(start, i);
}

function loadFns(file) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  // dual.html names the function `moveable`, not `buildMoveables`; index.html's
  // version references ICONS[...] for symbols instead of inlining them.
  const moveableMarker = src.includes('function buildMoveables(yr)')
    ? 'function buildMoveables(yr)'
    : 'function moveable(yr)';
  const moveableSrc = extractBlock(src, moveableMarker);
  const moveableFnName = moveableMarker.match(/function (\w+)/)[1];
  const parts = [extractBlock(src, 'function easter(yr)'), moveableSrc, extractBlock(src, 'const GN_TABLE')];
  if (moveableSrc.includes('ICONS[')) parts.push(extractBlock(src, 'const ICONS'));
  parts.push(`this.__easter = easter; this.__buildMoveables = ${moveableFnName}; this.__GN_TABLE = GN_TABLE;`);
  const code = parts.join('\n');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return { easter: sandbox.__easter, buildMoveables: sandbox.__buildMoveables, GN_TABLE: sandbox.__GN_TABLE };
}

function loadFixed(file) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const code = extractBlock(src, 'const FIXED') + '\nthis.__FIXED = FIXED;';
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox.__FIXED;
}

// Ground truth: independently computed (Anonymous Gregorian algorithm, Python
// reference) and cross-checked against well-documented historical Easter dates.
const KNOWN_EASTER = {
  2000: [4, 23], 2018: [4, 1], 2019: [4, 21], 2020: [4, 12], 2021: [4, 4],
  2022: [4, 17], 2023: [4, 9], 2024: [3, 31], 2025: [4, 20], 2026: [4, 5],
  2027: [3, 28], 2038: [4, 25],
};

// weekday each moveable feast must fall on, relative to Easter Sunday (getDay(): Sun=0)
const EXPECTED_WEEKDAY = {
  Norwegian: {
    'Quinquagesima': 0, 'Fastelavn – mandag': 1, 'Fastelavn – tirsdag': 2, 'Askeonsdag': 3, 'Midfaste-søndag': 0,
    'Palmesøndag': 0, 'Skjærtorsdag': 4, 'Langfredag': 5, 'Påskeaften': 6,
    'Første påskedag': 0, 'Andre påskedag': 1, 'Kristi himmelfartsdag': 4,
    'Pinsedag': 0, 'Andre pinsedag': 1, 'Treenighetsdag': 0, 'Kristi Legemsfest': 4,
  },
  English: {
    'Quinquagesima': 0, 'Shrove Monday': 1, 'Shrove Tuesday': 2, 'Ash Wednesday': 3, 'Mid-Lent Sunday': 0,
    'Palm Sunday': 0, 'Maundy Thursday': 4, 'Good Friday': 5, 'Holy Saturday': 6,
    'Easter Sunday': 0, 'Easter Monday': 1, 'Ascension Day': 4,
    'Whit Sunday': 0, 'Whit Monday': 1, 'Trinity Sunday': 0, 'Corpus Christi': 4,
  },
};

let pass = 0, fail = 0;
function test(name, fn) {
  try {
    fn();
    pass++;
    console.log(`  ok  - ${name}`);
  } catch (err) {
    fail++;
    console.log(`FAIL  - ${name}`);
    console.log(`        ${err.message}`);
  }
}

const YEARS = Array.from({ length: 101 }, (_, i) => 2000 + i); // 2000-2100

for (const [group, files] of Object.entries(GROUPS)) {
  for (const file of files) {
    console.log(`\n${file}`);
    const { easter, buildMoveables, GN_TABLE } = loadFns(file);
    const expectedWeekday = EXPECTED_WEEKDAY[group];

    test('easter() matches known historical dates', () => {
      for (const [yr, [mo, d]] of Object.entries(KNOWN_EASTER)) {
        const dt = easter(Number(yr));
        assert.strictEqual(dt.getMonth() + 1, mo, `${yr}: month`);
        assert.strictEqual(dt.getDate(), d, `${yr}: day`);
      }
    });

    test('easter() always falls on a Sunday, within Mar 22 - Apr 25, for 2000-2100', () => {
      for (const yr of YEARS) {
        const dt = easter(yr);
        assert.strictEqual(dt.getDay(), 0, `${yr}: not a Sunday (${dt})`);
        const inMarch = dt.getMonth() === 2 && dt.getDate() >= 22;
        const inAprilRange = dt.getMonth() === 3 && dt.getDate() <= 25;
        assert.ok(inMarch || inAprilRange, `${yr}: Easter out of valid range (${dt})`);
      }
    });

    test('buildMoveables() places every known feast on the correct weekday, for 2000-2100', () => {
      for (const yr of YEARS) {
        const R = buildMoveables(yr);
        const byName = {};
        for (const key of Object.keys(R)) byName[R[key].k] = key;
        for (const [name, expectedWd] of Object.entries(expectedWeekday)) {
          const key = byName[name];
          assert.ok(key, `${yr}: missing feast "${name}"`);
          const [m, d] = key.split('-').map(Number);
          const wd = new Date(yr, m - 1, d).getDay();
          assert.strictEqual(wd, expectedWd, `${yr}: "${name}" (${key}) expected weekday ${expectedWd}, got ${wd}`);
        }
      }
    });

    test('buildMoveables() dates are all valid (no NaN from missing add() args)', () => {
      for (const yr of YEARS) {
        const R = buildMoveables(yr);
        for (const [key, feast] of Object.entries(R)) {
          const [m, d] = key.split('-').map(Number);
          assert.ok(Number.isInteger(m) && Number.isInteger(d) && m >= 1 && m <= 12 && d >= 1 && d <= 31,
            `${yr}: "${feast.k}" produced an invalid date key "${key}"`);
        }
      }
    });

    test('GN_TABLE has exactly golden numbers 1-19, all valid calendar dates', () => {
      const keys = Object.keys(GN_TABLE).map(Number).sort((a, b) => a - b);
      assert.deepStrictEqual(keys, Array.from({ length: 19 }, (_, i) => i + 1));
      const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // allow leap Feb
      for (const [gn, dates] of Object.entries(GN_TABLE)) {
        assert.ok(Array.isArray(dates) && dates.length > 0, `gn ${gn}: empty`);
        for (const { m, d } of dates) {
          assert.ok(m >= 1 && m <= 12, `gn ${gn}: bad month ${m}`);
          assert.ok(d >= 1 && d <= DAYS_IN_MONTH[m - 1], `gn ${gn}: bad day ${m}-${d}`);
        }
      }
    });
  }
}

for (const [group, files] of Object.entries(GROUPS)) {
  test(`[${group}] easter() agrees across all files in the group, for 2000-2100`, () => {
    const loaded = files.map(loadFns);
    for (const yr of YEARS) {
      const dates = loaded.map(({ easter }) => easter(yr).toDateString());
      assert.ok(dates.every(d => d === dates[0]), `${yr}: easter() diverges across files: ${dates.join(' | ')}`);
    }
  });

  test(`[${group}] buildMoveables() has the same set of feast names across all files in the group`, () => {
    const loaded = files.map(loadFns);
    const namesPerFile = loaded.map(({ buildMoveables }) =>
      new Set(Object.values(buildMoveables(2025)).map(v => v.k)));
    const [base, ...rest] = namesPerFile;
    const diffs = [];
    rest.forEach((names, idx) => {
      const otherFile = files[idx + 1];
      const onlyInOther = [...names].filter(n => !base.has(n));
      const onlyInBase = [...base].filter(n => !names.has(n));
      if (onlyInOther.length || onlyInBase.length) {
        diffs.push(`${files[0]} vs ${otherFile}: only in ${otherFile} = [${onlyInOther}], only in ${files[0]} = [${onlyInBase}]`);
      }
    });
    assert.strictEqual(diffs.length, 0, `feast sets diverge between files:\n  ${diffs.join('\n  ')}`);
  });

  test(`[${group}] FIXED has the same set of dates and kirkenavn across all files in the group`, () => {
    const loaded = files.map(f => ({ file: f, fixed: loadFixed(f) }));
    const [base, ...rest] = loaded;
    const baseKeys = new Set(Object.keys(base.fixed));
    const diffs = [];
    for (const { file, fixed } of rest) {
      const keys = new Set(Object.keys(fixed));
      const onlyInOther = [...keys].filter(k => !baseKeys.has(k));
      const onlyInBase = [...baseKeys].filter(k => !keys.has(k));
      if (onlyInOther.length || onlyInBase.length) {
        diffs.push(`${base.file} vs ${file}: only in ${file} = [${onlyInOther}], only in ${base.file} = [${onlyInBase}]`);
      }
      for (const key of keys) {
        if (!baseKeys.has(key)) continue;
        if (fixed[key].k !== base.fixed[key].k) {
          diffs.push(`${base.file} vs ${file}: ${key} kirkenavn differs: "${base.fixed[key].k}" vs "${fixed[key].k}"`);
        }
      }
    }
    assert.strictEqual(diffs.length, 0, `FIXED diverges between files:\n  ${diffs.join('\n  ')}`);
  });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
