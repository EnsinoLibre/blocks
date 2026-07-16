// ============================================================
// ACTIVITY COMPONENT DEFINITIONS — canonical type contracts
// Extracted verbatim from english-with-sara-pwa/src/data/course.ts
// (types only; course data removed). The PWA is the reference
// implementation: one React component per activity type
// (src/components/activities/). Keep in sync when the PWA types
// change. Context files: context/<type>.md
// ============================================================
export type ActivityType =
  | 'content'
  | 'quiz'
  | 'flashdeck'
  | 'spelling'
  | 'audio'
  | 'reflection'
  | 'learning-reflection'
  | 'dialogue-sort'
  // New types
  | 'gap-fill'
  | 'gap-fill-audio'
  | 'gap-fill-analog'
  | 'dictation'
  | 'drag-match'
  | 'true-false'
  | 'para-write'
  | 'summary'
  | 'feedback'
  | 'mark-words'
  | 'para-sort'
  | 'reading-comp'
  | 'single-choice-set'
  | 'question-set'
  | 'choice'
  | 'lesson'
  | 'scenario'
  | 'memory-game'
  | 'crossword'
  | 'image-hotspot'
  | 'listen-mcq'
  | 'word-search'
  | 'course-presentation'
  | 'timeline'
  | 'grammar-anim'
  | 'dialogue-anim'
  | 'tense-shift'
  | 'word-transform'
  | 'translation-compare'
  | 'flow'
  // Synced from core's worksheet schema (site/assets/js/validator.js) — these
  // ship in EnsinoLibre's worksheet engine but don't yet have a dedicated
  // PWA component/interface below; kept here as string literals so the
  // catalogue-integrity test (every schema type must appear in this union)
  // stays green. Add full interfaces if/when the PWA gets its own component.
  | 'matching'
  | 'ordering'
  | 'open-response'
  | 'dialogue'
  | 'grammar-forms'
  | 'translation'
  | 'survey'
  | 'poll'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation?: string
}

export interface FlashCard {
  id: string
  front: string
  back: string
  pronunciation?: string
  example?: string
  emoji?: string
  audio?: string
}

export interface SpellingWord {
  word: string
  sentence: string
  blank: string
  audioFile: string
}

export interface ContentSection {
  heading: string
  body: string   // rich text with **bold**, *italic*, `code`, | tables |
}

export interface BaseActivity {
  id: string
  type: ActivityType
  title: string
  subtitle: string
  etivity?: number
  icon?: string
  /** PT-PT stage label shown in the Flow stepper, e.g. "Descobrir", "Praticar" */
  stage?: string
}

export interface ContentActivity extends BaseActivity {
  type: 'content'
  sections: ContentSection[]
}

export interface QuizActivity extends BaseActivity {
  type: 'quiz'
  questions: QuizQuestion[]
  passMark: number
}

export interface FlashDeckActivity extends BaseActivity {
  type: 'flashdeck'
  cards: FlashCard[]
  instruction: string
}

export interface SpellingActivity extends BaseActivity {
  type: 'spelling'
  words: SpellingWord[]
  instruction: string
}

export interface AudioActivity extends BaseActivity {
  type: 'audio'
  prompt: string
  guidelines: string[]
  exampleText?: string
  videoSrc?: string
}

export interface ReflectionActivity extends BaseActivity {
  type: 'reflection'
  prompts: string[]
}

export interface DialogueLine {
  id: string
  speaker: string
  text: string
}

export interface DialogueSortActivity extends BaseActivity {
  type: 'dialogue-sort'
  instruction: string
  lines: DialogueLine[]  // Stored in correct order; component shuffles on mount
}

// â”€â”€ New activity interfaces â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface GapFillBlank {
  id: string
  answer: string
  alternatives?: string[]
  hint?: string
  audioFile?: string
}

export interface GapFillActivity extends BaseActivity {
  type: 'gap-fill'
  instruction: string
  text: string
  blanks: GapFillBlank[]
  passMark: number
  audioFile?: string
}

export interface GapFillAudioActivity extends BaseActivity {
  type: 'gap-fill-audio'
  instruction: string
  text: string
  blanks: GapFillBlank[]
  passMark: number
  audioFile?: string
}

export interface GapFillAnalogActivity extends BaseActivity {
  type: 'gap-fill-analog'
  instruction: string
  text: string
  blanks: GapFillBlank[]
  passMark: number
  audioFile?: string
}

export interface DictationItem {
  id: string
  text: string
  audioFile: string
  hint?: string
}

export interface DictationActivity extends BaseActivity {
  type: 'dictation'
  instruction: string
  items: DictationItem[]
  passMark: number
}

export interface MatchPair {
  id: string
  left: string
  right: string
  emoji?: string
  imageSrc?: string
}

export interface DragMatchActivity extends BaseActivity {
  type: 'drag-match'
  instruction: string
  mode?: 'word-to-translation' | 'word-to-definition' | 'word-to-image' | 'phrase-to-phrase'
  pairs: MatchPair[]
  passMark: number
}

export interface TrueFalseStatement {
  id: string
  statement: string
  answer: boolean
  explanation: string
}

export interface TrueFalseActivity extends BaseActivity {
  type: 'true-false'
  instruction: string
  statements: TrueFalseStatement[]
  passMark: number
}

export interface ParaWriteSentence {
  id: string
  /** Portuguese translation, shown as the input placeholder */
  pt: string
  /** Canonical English answer */
  en: string
  /** Other acceptable English phrasings */
  alternatives?: string[]
  /** Optional PT hint shown after first wrong attempt */
  hint?: string
}

export interface ParaWriteActivity extends BaseActivity {
  type: 'para-write'
  prompt: string
  sentences?: ParaWriteSentence[]
  /** Number of sentences that must be correct to pass. Defaults to all. */
  passMark?: number
}

export interface SummaryStatement {
  id: string
  text: string
  correct: boolean
  explanation: string
}

export interface SummaryActivity extends BaseActivity {
  type: 'summary'
  instruction: string
  intro: string
  statements: SummaryStatement[]
  passMark: number
}

export interface FeedbackItem {
  id: string
  question: string
  itemType: 'scale' | 'choice' | 'opentext'
  scale?: number
  labels?: string[]
  options?: string[]
}

export interface FeedbackActivity extends BaseActivity {
  type: 'feedback'
  instruction: string
  items: FeedbackItem[]
}

/** End-of-unit self-reflection â€” fixed 5-step structure rendered by the
 *  component; responses are stored for research (see lib/reflections). */
export interface LearningReflectionActivity extends BaseActivity {
  type: 'learning-reflection'
}

export interface MarkWordsActivity extends BaseActivity {
  type: 'mark-words'
  instruction: string
  text: string
  targets: string[]
  passMark: number
}

export interface SortParagraph {
  id: string
  text: string
  order: number
  hint?: string
}

export interface ParaSortActivity extends BaseActivity {
  type: 'para-sort'
  instruction: string
  paragraphs: SortParagraph[]
}

export interface ReadingCompTrueFalse {
  type: 'true-false'
  id: string
  statement: string
  answer: boolean
  explanation: string
}

export interface ReadingCompMCQ {
  type: 'mcq'
  id: string
  question: string
  options: string[]
  correct: number
  explanation?: string
}

export interface ReadingCompGapFill {
  type: 'gap-fill'
  id: string
  text: string        // sentence with ___ for the blank
  answer: string      // correct answer (case-insensitive)
  options?: string[]  // word bank â€” if provided, show as clickable buttons
  explanation?: string
}

export interface ReadingCompMatchPair {
  id: string
  left: string
  right: string
}

export interface ReadingCompMatch {
  type: 'match'
  id: string
  instruction?: string
  pairs: ReadingCompMatchPair[]
  explanation?: string
}

export type ReadingCompQuestion =
  | ReadingCompTrueFalse
  | ReadingCompMCQ
  | ReadingCompGapFill
  | ReadingCompMatch

export interface ReadingCompActivity extends BaseActivity {
  type: 'reading-comp'
  instruction: string
  passage: string
  audioFile?: string
  questions: ReadingCompQuestion[]
  passMark: number
}

export interface SingleChoiceQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation?: string
}

export interface SingleChoiceSetActivity extends BaseActivity {
  type: 'single-choice-set'
  instruction: string
  questions: SingleChoiceQuestion[]
}

export interface QuestionSetItem {
  id: string
  subtype: 'mcq' | 'true-false' | 'gap-fill'
  question?: string
  options?: string[]
  correct?: number
  statement?: string
  answer?: boolean
  text?: string
  blanks?: GapFillBlank[]
  explanation?: string
}

export interface QuestionSetActivity extends BaseActivity {
  type: 'question-set'
  instruction: string
  questions: QuestionSetItem[]
  passMark: number
}

export interface ChoiceOption {
  id: string
  text: string
  followUp?: string
}

export interface ChoiceActivity extends BaseActivity {
  type: 'choice'
  question: string
  options: ChoiceOption[]
  showResultsAfter?: boolean
}

export interface LessonPage {
  id: string
  pageType: 'content' | 'question'
  title?: string
  body?: string
  nextPage?: string | null
  question?: string
  options?: string[]
  correct?: number
  explanation?: string
  onCorrect?: string
  onWrong?: string
}

export interface LessonActivity extends BaseActivity {
  type: 'lesson'
  startPage: string
  pages: LessonPage[]
}

export interface ScenarioChoice {
  id: string
  text: string
  nextNode: string
  isCorrect?: boolean
}

export interface ScenarioNode {
  id: string
  speaker: string
  text: string
  avatarSrc?: string
  feedback?: string
  choices?: ScenarioChoice[]
  isEnd?: boolean
  endMessage?: string
}

export interface ScenarioActivity extends BaseActivity {
  type: 'scenario'
  instruction: string
  startNode: string
  nodes: ScenarioNode[]
}

export interface MemoryGameActivity extends BaseActivity {
  type: 'memory-game'
  instruction: string
  pairs: MatchPair[]
}

export interface CrosswordClue {
  number: number
  clue: string
  answer: string
  row: number
  col: number
}

export interface CrosswordActivity extends BaseActivity {
  type: 'crossword'
  instruction: string
  clues: { across: CrosswordClue[]; down: CrosswordClue[] }
}

export interface Hotspot {
  id: string
  label: string
  x: number
  y: number
  width?: number
  height?: number
  description?: string
}

export interface ImageHotspotActivity extends BaseActivity {
  type: 'image-hotspot'
  instruction: string
  imageSrc: string
  mode?: 'quiz' | 'label'
  hotspots: Hotspot[]
  passMark?: number
}

export interface ListenMcqActivity extends BaseActivity {
  type: 'listen-mcq'
  instruction: string
  /** Optional â€” when omitted, the transcript is read aloud via TTS. */
  audioFile?: string
  questions: QuizQuestion[]
  passMark: number
  transcript?: string
  showTranscriptAfter?: boolean
}

export interface WordSearchActivity extends BaseActivity {
  type: 'word-search'
  instruction: string
  words: string[]
  gridSize?: number
  directions?: Array<'horizontal' | 'vertical' | 'diagonal-right' | 'diagonal-left' | 'reverse'>
  showWordList?: boolean
}

export interface CourseSlideActivity {
  subtype: 'mcq' | 'true-false'
  question?: string
  options?: string[]
  correct?: number
  statement?: string
  answer?: boolean
  explanation?: string
}

export interface CourseSlide {
  id: string
  title?: string
  body?: string
  imageSrc?: string
  activity?: CourseSlideActivity | null
}

export interface CoursePresentationActivity extends BaseActivity {
  type: 'course-presentation'
  instruction: string
  slides: CourseSlide[]
}

export interface TimelineItem {
  id: string
  date: string
  headline: string
  text?: string
  imageSrc?: string
  mediaSrc?: string
}

export interface TimelineActivity extends BaseActivity {
  type: 'timeline'
  instruction: string
  items: TimelineItem[]
}

export interface GrammarWord {
  text: string
  type: 'subject' | 'verb' | 'object' | 'time' | 'neg' | 'aux' | 'punct'
  label: string
}

export interface GrammarForm {
  words: GrammarWord[]
  ptPT: string
  audio?: string
}

/** Per-person variation. Used to add a second row of tabs (I / You / He-She-It / We / They). */
export interface PersonForms {
  /** Stable key for state */
  key: string
  /** Display label, e.g. 'I' | 'You' | 'He/She/It' | 'We' | 'They' */
  label: string
  positive: GrammarForm
  negative: GrammarForm
  question: GrammarForm
}

export interface GrammarAnimActivity extends BaseActivity {
  type: 'grammar-anim'
  instruction: string
  grammar: string  // e.g. "Present Simple"
  /** Default forms â€” used when no `persons` array is supplied. */
  forms: {
    positive: GrammarForm
    negative: GrammarForm
    question: GrammarForm
  }
  /** Optional: per-person variations. When set, a second tab row appears above the form tabs
   *  in the exact order supplied (canonical order: I, You, He/She/It, We, They). */
  persons?: PersonForms[]
}

// â”€â”€â”€ Tense-Shift â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Like grammar-anim but tabs morph between tenses (Past / Present / Future / Perfect).
// Shares the GrammarForm shape so the same animation/colour system is reused.

export interface TenseEntry {
  /** Stable key for state */
  key: string
  /** Display label, e.g. 'Past Simple' | 'Present Simple' | 'Future' */
  label: string
  /** Short PT label shown under the tab, optional */
  ptLabel?: string
  form: GrammarForm
}

export interface TenseShiftActivity extends BaseActivity {
  type: 'tense-shift'
  instruction: string
  /** Verb being conjugated, e.g. 'to work' â€” shown as the title */
  verb: string
  /** Optional sentence context shared across tenses (e.g. subject who is doing the action) */
  context?: string
  tenses: TenseEntry[]
}

// â”€â”€â”€ Word-Transform â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Visualises morphology: a base word + prefix/suffix tiles fly in to form a derived word.

export interface WordTransformStep {
  id: string
  /** The final derived word, e.g. 'unhappiness' */
  derived: string
  /** The class of the derived form */
  pos: 'noun' | 'verb' | 'adjective' | 'adverb'
  /** Morpheme breakdown â€” each piece becomes an animated tile */
  morphemes: Array<{
    text: string
    role: 'prefix' | 'root' | 'suffix'
  }>
  /** PT translation of the derived word */
  ptPT: string
  /** Example sentence using the derived word */
  example?: string
}

export interface WordTransformActivity extends BaseActivity {
  type: 'word-transform'
  instruction: string
  /** Base/root word, shown unchanging at the centre, e.g. 'happy' */
  baseWord: string
  basePos: 'noun' | 'verb' | 'adjective' | 'adverb'
  basePtPT?: string
  steps: WordTransformStep[]
}

// â”€â”€â”€ Translation-Compare â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PT row + EN row of word blocks with SVG curves connecting matching tokens.
// Crossing/colour-coded lines highlight word-order or structural differences.

export interface TokenPair {
  pt: string
  en: string
  /** Optional semantic role for colouring */
  role?: 'subject' | 'verb' | 'object' | 'modifier' | 'function'
  /** Mark this pair as a structural mismatch (different idiom / verb / etc.) */
  note?: string
}

export interface TranslationComparePair {
  id: string
  /** PT tokens left-to-right */
  ptTokens: string[]
  /** EN tokens left-to-right */
  enTokens: string[]
  /** Index mapping: each entry is [ptIdx, enIdx, optional role/note] */
  links: Array<{
    pt: number
    en: number
    role?: 'subject' | 'verb' | 'object' | 'modifier' | 'function'
    note?: string
  }>
  /** Optional headline above the comparison, e.g. "Tenho fome â†’ I am hungry" */
  headline?: string
}

export interface TranslationCompareActivity extends BaseActivity {
  type: 'translation-compare'
  instruction: string
  pairs: TranslationComparePair[]
}

export interface DialogueAnimLine {
  id: string
  speaker: 'a' | 'b'
  text: string
  ptPT?: string
  audio?: string
}

export interface DialogueSpeaker {
  name: string
  color: string
}

export interface DialogueAnimActivity extends BaseActivity {
  type: 'dialogue-anim'
  instruction: string
  context?: string
  speakerA: DialogueSpeaker
  speakerB: DialogueSpeaker
  lines: DialogueAnimLine[]
}

// â”€â”€â”€ Flow: multi-component activity â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// A flow chains several sub-activities of different types into one
// e-tivity with alternating engagement (discover â†’ practise â†’ apply).
// Steps must NOT be of type 'flow' (no nesting).
export interface FlowActivity extends BaseActivity {
  type: 'flow'
  /** Optional PT-PT intro shown above the stepper on the first step */
  intro?: string
  steps: Activity[]
}

export type Activity =
  | FlowActivity
  | ContentActivity
  | QuizActivity
  | FlashDeckActivity
  | SpellingActivity
  | AudioActivity
  | ReflectionActivity
  | DialogueSortActivity
  | GapFillActivity
  | GapFillAudioActivity
  | GapFillAnalogActivity
  | DictationActivity
  | DragMatchActivity
  | TrueFalseActivity
  | ParaWriteActivity
  | SummaryActivity
  | FeedbackActivity
  | LearningReflectionActivity
  | MarkWordsActivity
  | ParaSortActivity
  | ReadingCompActivity
  | SingleChoiceSetActivity
  | QuestionSetActivity
  | ChoiceActivity
  | LessonActivity
  | ScenarioActivity
  | MemoryGameActivity
  | CrosswordActivity
  | ImageHotspotActivity
  | ListenMcqActivity
  | WordSearchActivity
  | CoursePresentationActivity
  | TimelineActivity
  | GrammarAnimActivity
  | DialogueAnimActivity
  | TenseShiftActivity
  | WordTransformActivity
  | TranslationCompareActivity

export interface Unit {
  id: string
  number: number
  title: string
  titlePT: string
  color: string        // CSS class suffix: unit1, unit2, unit3, unit4, final
  emoji: string
  objective: string
  estimatedHours: number
  activities: Activity[]
}

export interface Course {
  title: string
  titlePT: string
  level: string
  totalActivities: number
  units: Unit[]
}
