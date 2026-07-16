/**
 * @ensinolibre/blocks — catalogue integrity tests.
 * Run: node tests/run-tests.mjs
 *
 * Verifies the block library is internally consistent: the validator,
 * renderer, analog emitter and prompt contracts all cover the same set of
 * block types, the JSON Schema enum agrees, and every active type has a
 * context specification file.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import Ajv from 'ajv/dist/2020.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const { KNOWN_TYPES, validateActivity } = await import(new URL('../src/validator.js', import.meta.url));
const { ANALOG_EMITTERS } = await import(new URL('../src/analog.js', import.meta.url));
const { ACTIVITY_TYPES, CONTRACTS } = await import(new URL('../src/prompt-builder.js', import.meta.url));

let passed = 0;
let failed = 0;
// Async-aware: awaits fn() so a rejecting async test is COUNTED as a failure
// instead of escaping the try/catch and crashing after a lying "0 failed"
// summary. Every call site awaits (top-level await, ESM).
async function test(name, fn) {
  try { await fn(); passed += 1; console.log(`  ok    ${name}`); }
  catch (e) { failed += 1; console.error(`  FAIL  ${name}\n        ${e.message}`); }
}

const schema = JSON.parse(await readFile(join(ROOT, 'schema', 'worksheet.schema.json'), 'utf8'));
const ajv = new Ajv({ allErrors: true });
const validateSchema = ajv.compile(schema);
const contextFiles = new Set((await readdir(join(ROOT, 'context'))).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));

console.log('\n1) Registries cover the same block types');
const known = [...KNOWN_TYPES].sort();
await test('analog emitter matches the validator', () => assert.deepEqual(Object.keys(ANALOG_EMITTERS).sort(), known));
await test('prompt contracts match the validator', () => assert.deepEqual(Object.keys(CONTRACTS).sort(), known));
await test('creator type list matches the validator', () => assert.deepEqual(ACTIVITY_TYPES.map((t) => t.id).sort(), known));
await test('JSON Schema enum matches the validator', () => assert.deepEqual([...schema.$defs.activity.properties.type.enum].sort(), known));

console.log('\n2) Every active block type has a context specification');
await test('a context/<type>.md exists for every renderable type', () => {
  for (const t of KNOWN_TYPES) assert.ok(contextFiles.has(t), `missing context/${t}.md`);
});

console.log('\n3) The schema compiles and validates a representative block');
await test('schema accepts a valid worksheet', () => {
  const ws = { title: 't', subject: 's', audience: 'a', language: 'en-GB',
    sections: [{ title: 'x', activities: [{ type: 'mcq', question: 'q', options: ['a', 'b'], answer: 0 }] }] };
  assert.ok(validateSchema(ws), JSON.stringify(validateSchema.errors));
  assert.deepEqual(validateActivity(ws.sections[0].activities[0]), []);
});

console.log('\n4) The contracts file lists every type');
await test('contracts/activity-types.ts declares each active type id', async () => {
  const ts = await readFile(join(ROOT, 'contracts', 'activity-types.ts'), 'utf8');
  const missing = KNOWN_TYPES.filter((t) => !ts.includes(`'${t}'`));
  assert.deepEqual(missing, [], `types absent from contracts: ${missing.join(', ')}`);
});

console.log('\n5) Every context live example validates (validator + JSON Schema)');
for (const t of KNOWN_TYPES) {
  await test(`context/${t}.md live example is a valid ${t} activity`, async () => {
    const md = await readFile(join(ROOT, 'context', `${t}.md`), 'utf8');
    const m = md.match(/```worksheet\r?\n([\s\S]*?)```/);
    assert.ok(m, 'no ```worksheet fenced example found');
    const activity = JSON.parse(m[1]);
    assert.equal(activity.type, t, `example declares type "${activity.type}"`);
    assert.deepEqual(validateActivity(activity), []);
    const ws = { title: 't', subject: 's', audience: 'a', language: 'en-GB',
      sections: [{ title: 'x', activities: [activity] }] };
    assert.ok(validateSchema(ws), JSON.stringify(validateSchema.errors));
  });
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
