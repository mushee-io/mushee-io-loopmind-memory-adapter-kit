# LoopMind — System Architecture

## Overview

LoopMind is a layered adapter system that sits between AI agent frameworks and Autonomys decentralized storage. It provides a single, consent-first interface for persistent agent memory that is cryptographically verifiable by anyone.

---

## Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Frameworks                         │
│   LangChain  │  LangGraph  │  MCP  │  Autonomys Agents SDK │
└──────────────────────────┬──────────────────────────────────┘
                           │  Framework-native patterns
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               LoopMind Adapter Layer                        │  ← Core product
│                                                             │
│   saveMemory(input)  →  hash + storageRef                   │
│   getMemory(filter?) →  MemoryRecord[]                      │
│   deleteMemory(hash) →  void                                │
│   verifyProof(hash)  →  ProofResult                         │
└──────────────────────────┬──────────────────────────────────┘
                           │  MemoryRecord (validated)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│             Memory Schema + Consent Model                   │
│                                                             │
│   owner: string        agentId: string                      │
│   content: string      consentGiven: boolean (required)     │
│   ttlDays: number      createdAt: ISO8601                   │
│   hash?: string        storageRef?: string                  │
└──────────────────────────┬──────────────────────────────────┘
                           │  Signed + validated object
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Autonomys Auto SDK                         │
│                                                             │
│   auto.upload(data)       →  CID                            │
│   auto.download(CID)      →  data                           │
│   auto.wallet.sign(data)  →  signature                      │
└──────────────────────────┬──────────────────────────────────┘
                           │  Content-addressed write
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           Autonomys DSN / Auto Drive                        │
│                                                             │
│   Permanent storage · Global redundancy                     │
│   Content-addressed · Publicly verifiable                   │
│   No single point of failure                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow — Memory Lifecycle

### 1. Agent calls `saveMemory()`

The agent framework (LangChain, etc.) calls the LoopMind adapter's `saveMemory()` with a content string and metadata. The adapter validates against the consent schema — if `consentGiven` is `false` or missing, a `ConsentError` is thrown.

### 2. Schema validated & hashed

LoopMind constructs a `MemoryRecord`, enforces required fields (`owner`, `consentGiven`, `agentId`), and prepares the object for upload.

### 3. Auto SDK uploads to DSN

The Autonomys Auto SDK uploads the signed memory object to the Distributed Storage Network (DSN). The returned CID is the on-chain reference — a deterministic, content-addressed identifier.

### 4. CID stored locally

The CID is stored in the agent's local store alongside the plaintext content for fast retrieval. The on-chain hash serves as the proof of existence.

### 5. Verification — anytime, by anyone

Anyone can call `verifyProof(hash)` to confirm:
- The memory object exists on-chain
- The stored content matches the declared hash
- The memory was created by the declared agent

No API key is required for public verification.

---

## Memory Schema

```typescript
interface MemoryRecord {
  id: string;            // UUID v4 (auto-generated)
  owner: string;         // Wallet address of the memory owner
  agentId: string;       // Agent identifier
  content: string;       // Memory content (plain text)
  tags: string[];        // Searchable tags
  consentGiven: boolean; // Required — must be true to store
  ttlDays: number;       // Days until expiry (0 = permanent)
  createdAt: string;     // ISO8601 timestamp
  hash?: string;         // Auto SDK CID (set after upload)
  storageRef?: string;   // Auto Drive URL
}
```

### Consent Model

The `consentGiven` field is required and enforced at the schema level. LoopMind will throw a `ConsentError` if `consentGiven` is `false` or missing.

This design ensures that all memory stored on-chain was explicitly consented to by the owner. Users can:
- Audit their memories via the Vault
- Delete memories from the agent's index at any time
- Share proof links for independent verification

---

## Adapter Interface

Each framework-specific adapter implements the same core interface:

```typescript
interface ILoopMindAdapter {
  saveMemory(input: MemoryInput): Promise<{ hash: string; storageRef: string }>;
  getMemory(filter?: MemoryFilter): Promise<MemoryRecord[]>;
  deleteMemory(hash: string): Promise<void>;
  verifyProof(hash: string): Promise<ProofResult>;
}

interface MemoryInput {
  content: string;
  tags?: string[];
  consentGiven: boolean;  // Required
  ttlDays?: number;       // Default: 0 (permanent)
}

interface MemoryFilter {
  tags?: string[];
  since?: string;         // ISO8601
  limit?: number;
}

interface ProofResult {
  exists: boolean;
  matchesHash: boolean;
  agentId: string;
  owner: string;
  createdAt: string;
  networkUrl: string;
}
```

---

## Packages

| Package | Role |
|---------|------|
| `@loopmind/core` | Adapter interface, schema, consent model, hashing |
| `@loopmind/adapter-langchain` | LangChain `BaseMemory` subclass |
| `@loopmind/adapter-langgraph` | LangGraph state checkpointer |
| `@loopmind/adapter-mcp` | MCP resource provider |
| `@loopmind/adapter-autonomys` | Autonomys Agents SDK native adapter |

---

## Monorepo Structure

The monorepo uses **pnpm workspaces** with a strict separation between:

- `apps/` — deployable applications (frontend apps, API server)
- `lib/` — shared libraries (OpenAPI spec, generated clients, DB schema)
- `scripts/` — utility scripts

Artifacts are leaf packages (no declaration emit). Libraries are composite packages that emit declarations for cross-package imports.

See [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) for catalog pins and workspace config.
