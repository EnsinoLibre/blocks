# Block context specifications

One Markdown file per activity type the library implements. Each is an Obsidian-compatible spec covering the block's fields, its **digital** behaviour (how [`core`](https://github.com/EnsinoLibre/core) renders it interactively), and its **analog** translation (how it prints to paper via the Markdown emitter). Every page carries an `analog-strategy` in its frontmatter and a live worksheet example.

These specs match the implemented catalogue exactly — the test suite enforces a `context/<type>.md` for every renderable block type. The activity types generalise the classroom-tested catalogue of the *English with Sara* PWA; the original TypeScript contracts are preserved in [`../contracts/activity-types.ts`](../contracts/activity-types.ts).

## The digital → analog principle

No block is screen-only. Each type degrades to an offline format via one strategy:

| Strategy | Meaning | Examples |
|----------|---------|----------|
| `direct` | Works on paper as-is | quiz, gap-fill, true-false, crossword, word-search, reading-comp |
| `transform` | Digital mechanic → analog equivalent | flashcards → vocabulary table, memory game → cut-out cards, scenario → numbered choose-your-path boxes, slides → sectioned handout |

## Catalogue

- **Core** — mcq, true-false, gap-fill, matching, ordering, open-response
- **Input** — content, course-presentation, timeline, dialogue, grammar-forms, tense-shift, word-transform, translation-compare
- **Vocabulary** — flashdeck, memory-game, word-search
- **Practice sets** — quiz, single-choice-set, question-set, mark-words
- **Contextualised** — reading-comp, translation, scenario, lesson, crossword, image-hotspot
- **Checks & forms** — summary, survey, poll
