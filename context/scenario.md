---
title: Branching scenario (scenario)
tags: ensinolibre, docs, activity-type
type-id: scenario
analog-strategy: transform
---

# Branching scenario — `scenario`

A conversation simulation: the interlocutor speaks, the learner picks a reply, and choices steer the exchange. Wrong choices should lead somewhere *instructive*, not a dead end. Every path must reach a node with `isEnd: true` and every node must be reachable from `startNode` (the validator walks the graph). Mark the best reply at each decision with `isCorrect: true` — it drives both the printed answer key's "Best path" and the digital end-of-scenario "You took the best path!" note (omit it everywhere for open-ended scenarios). Speakers are roles, never real names.

| Field | Type | Required |
|-------|------|----------|
| `type` | `"scenario"` | **yes** |
| `startNode` | id of the first node | **yes** |
| `nodes` | `[{ id, speaker, text, choices?: [{text, nextNode, isCorrect?}], feedback?, isEnd?, endMessage? }]` | **yes** |

**Analog version:** transform — numbered **choose-your-path boxes** ("If you reply …, go to box 4"), with the best path on the key. Box order is shuffled so the right path isn't just sequential.

```worksheet
{
  "type": "scenario",
  "instruction": "You are ordering at a restaurant. Choose your replies.",
  "startNode": "n1",
  "nodes": [
    { "id": "n1", "speaker": "Waiter", "text": "Good evening! Are you ready to order?", "choices": [
      { "text": "Yes — I'd like the grilled fish, please.", "nextNode": "n2", "isCorrect": true },
      { "text": "Give me fish.", "nextNode": "n3" }
    ] },
    { "id": "n3", "speaker": "Waiter", "text": "…Certainly.", "feedback": "A bit abrupt! 'I'd like…' is the polite form.", "choices": [
      { "text": "Sorry — I'd like the grilled fish, please.", "nextNode": "n2", "isCorrect": true }
    ] },
    { "id": "n2", "speaker": "Waiter", "text": "Excellent choice. Anything to drink?", "isEnd": true, "endMessage": "Well done — polite and clear!" }
  ]
}
```

Related: [[activities/dialogue|Dialogue]] · [[activities/lesson|Adaptive lesson]] · [[worksheet-schema]]
