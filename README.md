<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/EnsinoLibre/assets/main/wordmark-primary-dark.svg">
  <img src="https://raw.githubusercontent.com/EnsinoLibre/assets/main/wordmark-primary-light.svg" alt="EnsinoLibre" width="360">
</picture>

# blocks — the teaching-component library

</div>

---

`@ensinolibre/blocks` is EnsinoLibre's library of reusable worksheet **blocks** — the activity types the [`core`](https://github.com/EnsinoLibre/core) builder assembles into worksheets. Third parties building their own worksheet tools can consume this library directly instead of reinventing multiple choice, gap-fill, flashcards, crosswords, branching scenarios and the rest.

The library grew out of the classroom-tested activity catalogue of the *English with Sara* PWA, generalised for any subject.

## What a block is

Each block type is defined by four things:

1. **A contract** — the data shape (its TypeScript interface in [`contracts/activity-types.ts`](contracts/activity-types.ts)) and a runtime guard in [`src/validator.js`](src/validator.js) that returns plain-language problems for bad data.
2. **A digital renderer** — an interactive DOM renderer in [`src/renderer.js`](src/renderer.js) with tiered feedback (hint → hint → reveal), and, for the visual-grammar types, an Anime.js animation layer ([`src/anim.js`](src/anim.js)).
3. **An analog emitter** — a pure function in [`src/analog.js`](src/analog.js) that translates the block into printable Markdown, so **every block also works on paper** (a flashdeck becomes a vocabulary table, a memory game becomes a cut-out card sheet, a listening task becomes a teacher read-aloud script).
4. **An AI-prompt contract** — the JSON shape in [`src/prompt-builder.js`](src/prompt-builder.js) that teaches any AI assistant to author the block.

## Context specifications

[`context/`](context/) holds one Markdown file per activity type: what it is, its fields, its digital behaviour, and its **analog translation strategy** (`direct` or `transform`). These are Obsidian-compatible and double as the authoring spec. See [`context/README.md`](context/README.md) for the full catalogue and the digital→analog principle.

## The analog principle

No block is screen-only. Every type degrades to an offline format via one of three strategies:

| Strategy | Meaning | Examples |
|----------|---------|----------|
| `direct` | Works on paper as-is | quiz, gap-fill, crossword, word-search |
| `transform` | Digital mechanic → analog equivalent | flashdeck → vocabulary table, memory-game → cut-out cards, scenario → numbered choose-your-path boxes |

## Usage

```js
import { validateActivity, KNOWN_TYPES } from '@ensinolibre/blocks/validator';
import { emitAnalog } from '@ensinolibre/blocks/analog';
```

`validator.js`, `analog.js` and `prompt-builder.js` are pure (no DOM) and run under Node; `renderer.js` and `anim.js` are browser modules.

```
npm install
npm test        # catalogue integrity: registries, schema and context all agree
```

## Related repos

- [`core`](https://github.com/EnsinoLibre/core) — the builder app that consumes these blocks
- [`design-system`](https://github.com/EnsinoLibre/design-system) — tokens and CSS the block UI is styled against
- [`docs`](https://github.com/EnsinoLibre/docs) — the fuller authoring guide, with a live example per block
