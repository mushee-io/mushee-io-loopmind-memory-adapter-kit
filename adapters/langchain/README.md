# @loopmind/adapter-langchain

> LangChain memory adapter for LoopMind

**Status**: Stable (grant-funded open-source deliverable)

---

## Overview

Drop-in LangChain memory class. Extends `BaseMemory` to store all chat history and agent conclusions as verifiable on-chain memory objects on Autonomys.

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-langchain
```

---

## Usage

```typescript
import { LoopMindMemory } from "@loopmind/adapter-langchain"
import { ConversationChain } from "langchain/chains"

const memory = new LoopMindMemory({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "research-agent-01",
  owner: "0xYourWalletAddress",
})

// Use as drop-in LangChain memory
const chain = new ConversationChain({ memory })

// Or use directly
const { hash } = await memory.saveMemory({
  content: "User prefers concise summaries.",
  consent: true,
})
```

---

## How It Works

`LoopMindMemory` extends LangChain's `BaseMemory` interface. On every conversation turn:

1. The LangChain chain calls `saveContext()` with the new input/output
2. `LoopMindMemory` constructs a `MemoryRecord` with consent and metadata
3. Auto SDK uploads the record to Autonomys DSN
4. The returned CID hash is stored locally for future verification

On `loadMemoryVariables()`, the adapter retrieves memories from the local store and injects them into the LangChain context window.

---

## Files

```
adapters/langchain/
├── src/
│   ├── LangChainMemory.ts    # Main adapter class
│   ├── index.ts              # Exports
│   └── types.ts              # Input/output types
├── examples/
│   └── basic-chain.ts        # Example usage
└── package.json
```

---

## License

MIT — see [LICENSE](../../LICENSE)
