# @loopmind/adapter-langgraph

> LangGraph checkpoint adapter for LoopMind

**Status**: In development (grant-funded open-source deliverable)

---

## Overview

LangGraph state-machine adapter. Saves graph execution checkpoints as immutable memory objects on Autonomys. Each graph execution's state is persisted as a verifiable, permanent memory record.

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-langgraph
```

---

## Usage

```typescript
import { LoopMindCheckpointer } from "@loopmind/adapter-langgraph"
import { StateGraph } from "@langchain/langgraph"

const checkpointer = new LoopMindCheckpointer({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "governance-agent-01",
})

const graph = new StateGraph({
  checkpointer,
  // ... your graph definition
})
```

---

## Files

```
adapters/langgraph/
├── src/
│   ├── LoopMindNode.ts       # Graph node wrapper
│   ├── checkpointer.ts       # LangGraph Checkpointer implementation
│   └── index.ts
└── package.json
```

---

## License

MIT — see [LICENSE](../../LICENSE)
