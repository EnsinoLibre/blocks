// ============================================================
// ACTIVITY BLOCK CONTRACTS — worksheet schema v2
//
// TypeScript interfaces for every activity type the library ships.
// These mirror the behavioural source of truth, src/validator.js
// (and schema/worksheet.schema.json); the runtime validator is what
// actually accepts/rejects data — these types exist so TypeScript
// consumers get compile-time shapes and editor completion.
//
// Field limits (e.g. "2–6 options") are enforced by the validator,
// not expressible in these types; they are noted in doc comments.
// Context specifications: context/<type>.md (one per type).
// ============================================================

/** All 30 activity type ids (matches validator KNOWN_TYPES / schema enum). */
export type ActivityType =
  /* core six */
  | 'mcq'
  | 'true-false'
  | 'gap-fill'
  | 'matching'
  | 'ordering'
  | 'open-response'
  /* input */
  | 'content'
  | 'course-presentation'
  | 'timeline'
  | 'dialogue'
  | 'grammar-forms'
  | 'tense-shift'
  | 'word-transform'
  | 'translation-compare'
  /* vocabulary */
  | 'flashdeck'
  | 'memory-game'
  | 'word-search'
  /* practice sets */
  | 'quiz'
  | 'single-choice-set'
  | 'question-set'
  | 'mark-words'
  /* contextualised */
  | 'reading-comp'
  | 'translation'
  | 'scenario'
  | 'lesson'
  | 'crossword'
  | 'image-hotspot'
  /* checks & forms */
  | 'summary'
  | 'survey'
  | 'poll';

/** Fields shared by every activity. */
export interface ActivityBase {
  type: ActivityType;
  /** Learner-facing instruction line shown above the activity. */
  instruction?: string;
  /** Nudge shown on the first two wrong tries — must never point at the answer. */
  hint?: string;
  /** Shown after answering; may state the answer and say why. */
  explanation?: string;
}

/* ---------- shared question cores (reused by set types) ---------- */

/** One multiple-choice question. 2–6 options, unique after trim+lowercase. */
export interface McqCore {
  question: string;
  options: string[];
  /** Zero-based index of the correct option. */
  answer: number;
  hint?: string;
  explanation?: string;
}

/** One true/false judgement. */
export interface TrueFalseCore {
  statement: string;
  answer: boolean;
  hint?: string;
  explanation?: string;
}

/** One gap-fill text. Gaps written {{answer}} (alternatives {{colour|color}}); 1–5 gaps. */
export interface GapFillCore {
  text: string;
  hint?: string;
  explanation?: string;
}

/** One left/right pair. Every `right` must be unique within the activity. */
export interface MatchPair {
  left: string;
  right: string;
}

/* ---------- core six ---------- */

export interface McqActivity extends ActivityBase, McqCore { type: 'mcq'; }

export interface TrueFalseActivity extends ActivityBase, TrueFalseCore { type: 'true-false'; }

export interface GapFillActivity extends ActivityBase, GapFillCore { type: 'gap-fill'; }

/** 2–8 pairs. */
export interface MatchingActivity extends ActivityBase {
  type: 'matching';
  prompt: string;
  pairs: MatchPair[];
}

/** 3–8 items given in the CORRECT order (the renderer shuffles them). */
export interface OrderingActivity extends ActivityBase {
  type: 'ordering';
  prompt: string;
  items: string[];
}

export interface OpenResponseActivity extends ActivityBase {
  type: 'open-response';
  prompt: string;
  /** Positive integer; live word counter targets it. */
  minWords?: number;
  sampleAnswer?: string;
}

/* ---------- input ---------- */

/** Headed sections of instructional text (no questions). `body` allows **bold**, *italic*, `code`. */
export interface ContentActivity extends ActivityBase {
  type: 'content';
  sections: { heading: string; body: string }[];
}

/** 2–12 slides; each needs a title or body; optional quick-check per slide. */
export interface CoursePresentationActivity extends ActivityBase {
  type: 'course-presentation';
  slides: {
    title?: string;
    body?: string;
    activity?: ({ subtype: 'mcq' } & McqCore) | ({ subtype: 'true-false' } & TrueFalseCore);
  }[];
}

/** 3–12 dated events in chronological order. */
export interface TimelineActivity extends ActivityBase {
  type: 'timeline';
  items: { date: string; headline: string; text?: string }[];
}

/** 2–16 turns between two named roles (never real people). */
export interface DialogueActivity extends ActivityBase {
  type: 'dialogue';
  /** One-line scene setting. */
  context?: string;
  speakerA: string;
  speakerB: string;
  lines: { speaker: 'a' | 'b'; text: string; gloss?: string }[];
}

/** 2–6 forms of one sentence; the changing part wrapped in **double asterisks** (required). */
export interface GrammarFormsActivity extends ActivityBase {
  type: 'grammar-forms';
  /** The grammar point being taught. */
  grammar: string;
  forms: { label: string; sentence: string; gloss?: string }[];
}

/** 2–6 tenses of one sentence; tense-bearing words wrapped in **double asterisks** (required). */
export interface TenseShiftActivity extends ActivityBase {
  type: 'tense-shift';
  verb: string;
  context?: string;
  tenses: { label: string; sentence: string; gloss?: string }[];
}

export type MorphemeRole = 'prefix' | 'root' | 'suffix';

/** 2–8 derivation steps of one word family, simple → complex. */
export interface WordTransformActivity extends ActivityBase {
  type: 'word-transform';
  baseWord: string;
  steps: {
    /** The derived word (headline of the analog table row). */
    derived: string;
    /** Part of speech. */
    pos: string;
    morphemes: { text: string; role: MorphemeRole }[];
    gloss?: string;
    example?: string;
  }[];
}

/** 1–6 aligned sentence pairs; link indices are zero-based into the token arrays. */
export interface TranslationCompareActivity extends ActivityBase {
  type: 'translation-compare';
  pairs: {
    headline?: string;
    sourceTokens: string[];
    targetTokens: string[];
    links: { s: number; t: number; note?: string }[];
  }[];
}

/* ---------- vocabulary ---------- */

/** 3–20 flip cards, one concept each. */
export interface FlashdeckActivity extends ActivityBase {
  type: 'flashdeck';
  cards: {
    front: string;
    back: string;
    pronunciation?: string;
    example?: string;
    emoji?: string;
  }[];
}

/** 3–8 pairs, texts 1–3 words, every `right` unique. */
export interface MemoryGameActivity extends ActivityBase {
  type: 'memory-game';
  pairs: MatchPair[];
}

/** 4–14 themed words, letters only, each ≤ gridSize; the whole SET must fit (validator places it). */
export interface WordSearchActivity extends ActivityBase {
  type: 'word-search';
  words: string[];
  /** 6–16; default 12. */
  gridSize?: number;
}

/* ---------- practice sets ---------- */

/** 2–12 scored MCQs. Pass is decided on first-attempt answers. */
export interface QuizActivity extends ActivityBase {
  type: 'quiz';
  questions: McqCore[];
  /** 1..questions.length. */
  passMark?: number;
}

/** 3–12 rapid one-answer questions drilling one narrow pattern. */
export interface SingleChoiceSetActivity extends ActivityBase {
  type: 'single-choice-set';
  questions: McqCore[];
}

/** 2–12 mixed items; every item MUST carry its `subtype`. */
export interface QuestionSetActivity extends ActivityBase {
  type: 'question-set';
  questions: (
    | ({ subtype: 'mcq' } & McqCore)
    | ({ subtype: 'true-false' } & TrueFalseCore)
    | ({ subtype: 'gap-fill' } & GapFillCore)
  )[];
  /** 1..questions.length. */
  passMark?: number;
}

/**
 * Learner marks every word matching a criterion. Every target must appear
 * verbatim as a word in the text; scoring is per OCCURRENCE — a repeated
 * target must be marked everywhere it appears.
 */
export interface MarkWordsActivity extends ActivityBase {
  type: 'mark-words';
  /** States the criterion; required. */
  instruction: string;
  text: string;
  targets: string[];
}

/* ---------- contextualised ---------- */

/** A passage followed by 1–10 mixed questions, each carrying its `type`. */
export interface ReadingCompActivity extends ActivityBase {
  type: 'reading-comp';
  passage: string;
  questions: (
    | ({ type: 'mcq' } & McqCore)
    | ({ type: 'true-false' } & TrueFalseCore)
    | ({ type: 'gap-fill' } & GapFillCore)
    | { type: 'matching'; prompt: string; pairs: MatchPair[] }
  )[];
}

/** 1–10 sentences translated one by one; comparison is punctuation- and accent-tolerant. */
export interface TranslationActivity extends ActivityBase {
  type: 'translation';
  sentences: {
    source: string;
    target: string;
    alternatives?: string[];
    hint?: string;
  }[];
}

export interface ScenarioChoice {
  text: string;
  nextNode: string;
  /**
   * Marks the best choice. Drives the analog answer key's "Best path" and the
   * digital end-of-scenario "You took the best path!" note. Optional — open-ended
   * scenarios simply omit it everywhere.
   */
  isCorrect?: boolean;
}

/**
 * 2–20 branching nodes (aim for 5–10). The validator walks the graph: every
 * node must be reachable from startNode and every path must be able to reach
 * a node with isEnd: true.
 */
export interface ScenarioActivity extends ActivityBase {
  type: 'scenario';
  startNode: string;
  nodes: {
    id: string;
    speaker: string;
    text: string;
    choices?: ScenarioChoice[];
    isEnd?: boolean;
    endMessage?: string;
    /** Shown when the learner arrives at this node. */
    feedback?: string;
  }[];
}

/**
 * 2–20 linked pages (aim for 4–8); wrong answers can branch to re-teaching
 * pages. The validator walks the graph (reachability + termination).
 */
export interface LessonActivity extends ActivityBase {
  type: 'lesson';
  startPage: string;
  pages: (
    | {
        id: string;
        pageType: 'content';
        title?: string;
        body: string;
        /** null (or absent) ends the lesson. */
        nextPage?: string | null;
      }
    | ({
        id: string;
        pageType: 'question';
        title?: string;
        onCorrect?: string | null;
        onWrong?: string | null;
      } & McqCore)
  )[];
}

/** Zero-based grid coordinates; row/col ≤ 20, answers letters-only ≤ 15; crossings must share letters. */
export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export interface CrosswordActivity extends ActivityBase {
  type: 'crossword';
  clues: {
    across: CrosswordClue[];
    down: CrosswordClue[];
  };
}

/** A self-contained inline SVG scene (no scripts/handlers/links) with 2–10 labelled hotspots. */
export interface ImageHotspotActivity extends ActivityBase {
  type: 'image-hotspot';
  /** Must start with an <svg> tag; external image paths are not allowed. */
  svg: string;
  hotspots: {
    label: string;
    /** Percentages 0–100 across the rendered scene. */
    x: number;
    y: number;
    description?: string;
  }[];
}

/* ---------- checks & forms ---------- */

/** 4–12 statements, at least one correct; ticked-true statements build the summary. */
export interface SummaryActivity extends ActivityBase {
  type: 'summary';
  intro?: string;
  statements: { text: string; correct: boolean; explanation?: string }[];
}

/** 1–8 self-assessment items; no right answers; responses are not stored. */
export interface SurveyActivity extends ActivityBase {
  type: 'survey';
  items: (
    | { question: string; itemType: 'scale'; /** 2–10, default 5 */ scale?: number; /** [low, high] end labels */ labels?: string[] }
    | { question: string; itemType: 'choice'; options: string[] }
    | { question: string; itemType: 'opentext' }
  )[];
}

/** 2–5 options, no wrong answers; optional guidance per choice. */
export interface PollActivity extends ActivityBase {
  type: 'poll';
  question: string;
  options: { text: string; followUp?: string }[];
}

/* ---------- the worksheet ---------- */

export type Activity =
  | McqActivity
  | TrueFalseActivity
  | GapFillActivity
  | MatchingActivity
  | OrderingActivity
  | OpenResponseActivity
  | ContentActivity
  | CoursePresentationActivity
  | TimelineActivity
  | DialogueActivity
  | GrammarFormsActivity
  | TenseShiftActivity
  | WordTransformActivity
  | TranslationCompareActivity
  | FlashdeckActivity
  | MemoryGameActivity
  | WordSearchActivity
  | QuizActivity
  | SingleChoiceSetActivity
  | QuestionSetActivity
  | MarkWordsActivity
  | ReadingCompActivity
  | TranslationActivity
  | ScenarioActivity
  | LessonActivity
  | CrosswordActivity
  | ImageHotspotActivity
  | SummaryActivity
  | SurveyActivity
  | PollActivity;

export interface WorksheetSection {
  title: string;
  instructions?: string;
  activities: Activity[];
}

export interface Worksheet {
  $schemaVersion?: '2.0';
  title: string;
  subject: string;
  topic?: string;
  audience: string;
  /** BCP-47 tag, e.g. "en-GB". */
  language: string;
  estimatedMinutes?: number;
  instructions?: string;
  sections: WorksheetSection[];
}
