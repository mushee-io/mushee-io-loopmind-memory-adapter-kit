# Research Memory Agent

> LangChain-powered agent with persistent decentralized memory

**Framework**: LangChain  
**Adapter**: `@loopmind/adapter-langchain`  
**Use case**: Persistent user preferences and topic knowledge across sessions

---

## Overview

A LangChain-powered research agent that accumulates user preferences, topic interests, and prior conclusions across sessions. Each memory is saved with consent, tagged by topic, and retrievable in future conversations.

Memory is stored on Autonomys via LoopMind, meaning:
- Memory persists across restarts
- Memory is cryptographically verifiable
- Users can audit and delete their memories at any time

---

## Sample Memories Saved

```json
{
  "content": "User prefers bullet-point summaries over paragraphs.",
  "tags": ["preference", "format"],
  "agentId": "research-agent-01",
  "hash": "0x3f8a1cd2e4b9..."
}

{
  "content": "Interested in decentralized AI infrastructure and on-chain memory proofs.",
  "tags": ["topic", "interest"],
  "agentId": "research-agent-01",
  "hash": "0x7b2e4a1f..."
}

{
  "content": "Previous session: analyzed Autonomys whitepaper sections 3–5.",
  "tags": ["research", "session"],
  "agentId": "research-agent-01",
  "hash": "0xc9d1f2a8..."
}
```

---

## SDK Calls Used

- `saveMemory()` — after each conversation turn with user preference or research conclusion
- `getMemory({ tags: ['preference'] })` — at session start to restore user context
- `verifyMemory(hash)` — to confirm memory integrity before using stored context

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-langchain langchain
```

---

## Usage

```typescript
import { LoopMindMemory } from "@loopmind/adapter-langchain"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"

const memory = new LoopMindMemory({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "research-agent-01",
  owner: "0xYourWalletAddress",
})

const chain = new ConversationChain({
  llm: new ChatOpenAI(),
  memory,
})

const response = await chain.call({
  input: "Summarize what you know about my research preferences.",
})
```

---

## Ideal For

- AI research assistants
- Document summarizers
- Knowledge curators
- Any agent that needs to persist user context across sessions without re-prompting
