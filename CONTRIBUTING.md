# Contributing to blocks

For org-wide norms see the [org-wide guide](https://github.com/EnsinoLibre/.github/blob/main/CONTRIBUTING.md). This file covers what's specific to `blocks`.

## Layout

```
blocks/
├── contracts/activity-types.ts   ← TypeScript data contracts (mirrors src/validator.js, the behavioural source of truth)
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

## Accessibility & keyboard navigation

Every block must be fully usable with a keyboard and a screen reader. The shipped renderers set the baseline — match it when adding or changing a block:

- **Focus order follows reading order.** Interactive elements are real `<button>`/`<input>`/`<select>` elements (never clickable divs), so Tab reaches everything in the order a sighted learner would work through it. Don't set positive `tabindex`.
- **Arrow keys inside composite widgets, Tab between them.** Grids and tab strips manage their own internal navigation: the crossword moves between cells with arrow keys and auto-advances on typing; grammar-forms/tense-shift tabs are a `role="tablist"` with roving tabindex and Left/Right arrows. A composite widget is ONE Tab stop.
- **Announce what changes.** Dynamic regions carry `aria-live="polite"`: feedback boxes, slide/page/question swaps (course-presentation, lesson, single-choice-set, scenario), word-search selection status, flashdeck face changes, ordering position changes. If an interaction changes something a screen-reader user can't see, say it.
- **Label state, not just presence.** Face-down memory cards say "card 3, face down", not "?"; ordering's move buttons say *what* they move where.
- **Animation is decoration, never information.** Every anim.js helper is a no-op under `prefers-reduced-motion`, and no block may encode meaning only in motion or colour — pair colour states with text (the feedback line) or a class the stylesheet can restyle.

Keyboard-walk a worksheet containing your block (Tab/Shift-Tab/arrows only, then once more with a screen reader) before opening the PR.

## Before opening a PR

- Run `npm test`; the suite checks every registry, the schema enum and the context files all agree.
- Style block UI against [design-system](https://github.com/EnsinoLibre/design-system) tokens, never hardcoded colours.
