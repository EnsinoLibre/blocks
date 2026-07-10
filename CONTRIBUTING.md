# Contributing to blocks

For org-wide norms see the [org-wide guide](https://github.com/EnsinoLibre/.github/blob/main/CONTRIBUTING.md). This file covers what's specific to `blocks`.

## Layout

```
blocks/
├── contracts/activity-types.ts   ← TypeScript data contracts (provenance: the English with Sara PWA)
├── context/<type>.md             ← per-type spec: fields, digital behaviour, analog strategy, live example
├── src/
│   ├── validator.js              ← runtime guards → plain-language problems (pure)
│   ├── renderer.js               ← interactive DOM renderers
│   ├── anim.js                   ← Web Animations API layer for visual-grammar blocks
│   ├── analog.js                 ← Markdown/print emitters (pure)
│   └── prompt-builder.js         ← AI-prompt contracts (pure)
├── schema/worksheet.schema.json  ← the worksheet format
└── tests/run-tests.mjs           ← catalogue integrity
```

## Adding or changing a block type

A block type is only complete when it appears in **all** of these, and the test suite enforces it:

1. `contracts/activity-types.ts` — the data shape
2. `src/validator.js` — a validator returning readable problems
3. `src/renderer.js` — an interactive renderer with tiered feedback
4. `src/analog.js` — an analog (print) emitter; pick a strategy (`direct` / `transform`)
5. `src/prompt-builder.js` — the `CONTRACTS` entry and `ACTIVITY_TYPES` listing
6. `schema/worksheet.schema.json` — the per-type schema branch
7. `context/<type>.md` — the spec, with `analog-strategy` frontmatter and a live example

## Before opening a PR

- Run `npm test`; the suite checks every registry, the schema enum and the context files all agree.
- Style block UI against [design-system](https://github.com/EnsinoLibre/design-system) tokens, never hardcoded colours.
