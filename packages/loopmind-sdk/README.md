# @loopmind/sdk

> Core SDK for LoopMind — Memory Adapter Kit for AI Agents

**Status**: In development (grant-funded open-source deliverable)

---

## Overview

`@loopmind/sdk` is the framework-agnostic core of LoopMind. It provides four functions for saving, retrieving, searching, and verifying agent memory on Autonomys decentralized storage.

Framework-specific adapters (`@loopmind/adapter-langchain`, etc.) wrap this core SDK.

---

## Installation

```bash
npm install @loopmind/sdk
```

---

## Usage

```typescript
import { LoopMind } from "@loopmind/sdk"

const loopmind = new LoopMind({
  storage: "autonomys",
  encryption: true,
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "research-agent-01",
})

// Save a memory
const { hash } = await loopmind.saveMemory({
  content: "User prefers concise grant milestones.",
  tags: ["grant", "preference"],
  consent: true,
})

// Retrieve memories
const memories = await loopmind.getMemory({
  agentId: "research-agent-01",
  tags: ["preference"],
})

// Search memories
const results = await loopmind.searchMemory({
  agentId: "research-agent-01",
  query: "grant milestones",
})

// Verify on-chain (no API key needed)
const proof = await loopmind.verifyMemory(hash)
console.log(proof.verified) // true
```

---

## API

See [docs/api.md](../../docs/api.md) for full API reference.

| Function | Description |
|----------|-------------|
| `saveMemory(input)` | Save a memory object to Autonomys storage |
| `getMemory(filter?)` | Retrieve memories filtered by tags, date, etc. |
| `searchMemory({ query })` | Semantic search across agent memories |
| `verifyMemory(hash)` | Verify a memory hash against Autonomys DSN |

---

## License

MIT — see [LICENSE](../../LICENSE)
