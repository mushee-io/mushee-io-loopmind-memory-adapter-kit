# API Reference

## saveMemory, getMemory, searchMemory, verifyMemory

---

## Installation

```bash
# Core SDK
npm install @loopmind/sdk

# Framework adapters (install only what you need)
npm install @loopmind/adapter-langchain
npm install @loopmind/adapter-langgraph
npm install @loopmind/adapter-autonomys
```

---

## Initialization

```typescript
import { LoopMind } from "@loopmind/sdk"

const loopmind = new LoopMind({
  storage: "autonomys",    // "autonomys" | "local"
  encryption: true,        // encrypt content before storage
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "my-agent-01",
  owner: "0xYourWalletAddress",
})
```

### Config options

```typescript
interface LoopMindConfig {
  storage: "autonomys" | "local"  // Storage backend
  encryption?: boolean             // Encrypt content (default: false)
  apiKey?: string                  // Autonomys API key (required for write)
  agentId: string                  // Your agent's unique identifier
  owner?: string                   // Wallet address for attribution
  network?: "mainnet" | "testnet"  // Default: "testnet"
  debug?: boolean                  // Verbose logging
}
```

---

## saveMemory()

Saves a memory object to Autonomys storage and returns the on-chain hash.

```typescript
const result = await loopmind.saveMemory({
  agentId: "research-agent-01",
  content: "User prefers concise grant milestones.",
  tags: ["grant", "preference"],
  consent: true,     // Required — must be true
  ttlDays: 30,       // Days until expiry. 0 = permanent
})

// result.id          — local UUID
// result.hash        — Auto SDK CID (on-chain reference)
// result.storageRef  — Auto Drive URL
// result.createdAt   — ISO8601 timestamp
// result.status      — "verified" | "pending"
```

### Input

```typescript
interface MemoryInput {
  agentId: string       // Which agent owns this memory
  content: string       // Memory content (plain text)
  tags?: string[]       // Searchable tags
  consent: true         // Required — literal true
  ttlDays?: number      // Days until expiry (0 = permanent, default: 0)
}
```

### Returns

```typescript
interface SaveMemoryResult {
  id: string            // UUID v4
  hash: string          // Auto SDK CID
  storageRef: string    // Auto Drive URL
  createdAt: string     // ISO8601
  status: "verified" | "pending"
}
```

### Errors

- `ConsentError` — thrown if `consent` is not `true`
- `StorageError` — thrown if Auto SDK upload fails
- `ValidationError` — thrown if required fields are missing

---

## getMemory()

Retrieves memory objects from the local store, optionally filtered.

```typescript
// All memories for this agent
const memories = await loopmind.getMemory({
  agentId: "research-agent-01",
})

// Filter by tag
const prefs = await loopmind.getMemory({
  agentId: "research-agent-01",
  tags: ["preference"],
  limit: 10,
  since: "2025-01-01",
})
```

### Input

```typescript
interface MemoryFilter {
  agentId: string        // Required
  tags?: string[]        // Filter by any matching tag
  since?: string         // ISO8601 — only memories after this date
  limit?: number         // Max results (default: 100)
  offset?: number        // Pagination offset
}
```

### Returns

```typescript
type GetMemoryResult = MemoryRecord[]

interface MemoryRecord {
  id: string
  agentId: string
  owner: string
  content: string
  tags: string[]
  consentGiven: boolean
  ttlDays: number
  createdAt: string
  hash?: string
  storageRef?: string
}
```

---

## searchMemory()

Semantic search across agent memories. Returns results sorted by relevance.

```typescript
const memories = await loopmind.searchMemory({
  agentId: "research-agent-01",
  query: "grant milestones",
})

// memories[0].score  — relevance 0–1
// memories[0].content
// memories[0].hash
```

### Input

```typescript
interface SearchMemoryInput {
  agentId: string        // Required
  query: string          // Natural language search query
  limit?: number         // Max results (default: 10)
  minScore?: number      // Minimum relevance score (default: 0.5)
}
```

### Returns

```typescript
type SearchMemoryResult = (MemoryRecord & { score: number })[]
```

### Implementation note

In the current demo implementation, `searchMemory` performs keyword matching. The production implementation will use vector embeddings for semantic search.

---

## verifyMemory()

Verifies a memory hash against the Autonomys network. Works without an API key — verification is public.

```typescript
const proof = await loopmind.verifyMemory(
  "0x3f8a1cd2e4b9a7c1f58e2d4b9a7c1f58"
)

console.log(proof.exists)       // true
console.log(proof.matchesHash)  // true
console.log(proof.agentId)      // "research-agent-01"
console.log(proof.createdAt)    // "2025-05-07T10:23:11Z"
console.log(proof.networkUrl)   // "auto://drive/QmXYZ..."
```

### Input

```typescript
verifyMemory(hash: string): Promise<ProofResult>
```

### Returns

```typescript
interface ProofResult {
  exists: boolean         // CID exists on Autonomys DSN
  matchesHash: boolean    // Content hash matches stored hash
  agentId: string         // Agent that created the memory
  owner: string           // Wallet address of memory owner
  createdAt: string       // ISO8601 timestamp from chain
  networkUrl: string      // Auto Drive URL for the object
  verified: boolean       // Combined verification status
}
```

### Notes

- `verifyMemory()` does not require an API key
- The check is read-only — no writes to the network
- In demo mode, this returns simulated data without a real network call
- In production, this calls the Autonomys DSN to confirm CID existence

---

## Framework Adapters

### LangChain

```typescript
import { LoopMindMemory } from "@loopmind/adapter-langchain"

const memory = new LoopMindMemory({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "research-agent-01",
  owner: "0xYourWalletAddress",
})

// Use as a drop-in LangChain memory class
const chain = new ConversationChain({ memory })
```

### LangGraph

```typescript
import { LoopMindCheckpointer } from "@loopmind/adapter-langgraph"

const checkpointer = new LoopMindCheckpointer({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "my-graph-agent",
})

const graph = new StateGraph({ checkpointer })
```

### Autonomys Agents

```typescript
import { LoopMindAutonomysAdapter } from "@loopmind/adapter-autonomys"

const memoryAdapter = new LoopMindAutonomysAdapter({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "my-autonomys-agent",
})
```
