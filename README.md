# LoopMind

## Memory Adapter Kit for AI Agents

LoopMind is an open-source discovery MVP for adding structured, verifiable memory flows to AI agents.

The current deployable app is a premium mobile reference client. It demonstrates how an AI agent can capture memory, store structured memory records, view them in a Memory Vault, run a proof/verification flow, and expose the same logic through SDK-style functions.

The wider goal is simple: make agent memory easier for developers to build on top of Autonomys tooling without forcing every team to design their own memory schema, retrieval flow, verification model, and integration layer from scratch.

---

## Current Status

This repository is a **Discovery MVP / reference implementation**.

The current app demonstrates the LoopMind product flow in demo mode. Storage references, memory hashes, and verification states are simulated for the prototype.

The grant-funded implementation would connect the SDK and adapters to Autonomys tooling through open and auditable integration points.

---

## What LoopMind Is

LoopMind is intended to become an open-source **Memory Adapter Kit for AI agents**.

The project focuses on reusable developer infrastructure:

- a structured memory schema
- SDK-style memory functions
- framework adapters
- verification helpers
- privacy and consent patterns
- demo agents
- developer documentation
- a mobile reference client that shows the memory flow visually

The mobile app is not the main product. It is a reference client used to demonstrate how the SDK, memory schema, and verification flow would work in practice.

---

## What LoopMind Is Not

LoopMind is not:

- a wallet feature
- a KYC product
- a survey product
- a rewards product
- a closed commercial dashboard
- a generic chatbot wrapper
- a replacement for existing Autonomys tooling

The project has been narrowed into one clear scope: **developer-facing memory infrastructure for AI agents**.

---

## Why This Exists

AI agents are becoming more useful, but most of them still struggle with memory.

They often:

- forget useful context between sessions
- depend on centralized databases for memory
- lack a clear structure for storing and retrieving memories
- do not provide simple verification that a memory record has not changed
- make developers rebuild the same memory logic repeatedly

LoopMind is designed to sit above lower-level storage primitives and give developers a cleaner way to work with agent memory.

---

## How LoopMind Fits With Autonomys

LoopMind is designed to build around the Autonomys ecosystem rather than duplicate it.

| Tool | Role | How LoopMind Relates |
|---|---|---|
| Auto SDK | Lower-level Autonomys integration primitives | LoopMind can use Auto SDK underneath for storage and network integration |
| Auto Memory | Permanent memory / storage pattern | LoopMind adds developer workflows, schema, adapters, and verification UX around memory |
| Autonomys Agents | Autonomys-native agent framework | LoopMind can integrate with Autonomys Agents while also supporting external frameworks |
| LoopMind | Memory adapter and orchestration layer | Helps external AI developers adopt Autonomys-backed memory faster |

LoopMind is not trying to replace these tools. The aim is to make them easier to use in real agent workflows.

---

## Target Developers

LoopMind is intended for:

- AI agent developers
- web3 developers building AI-powered dApps
- developers using LangChain, LangGraph, MCP, or Autonomys Agents
- teams building research agents, governance agents, DePIN agents, and automation tools
- developers who want verifiable memory without building the full storage, schema, consent, and verification model themselves

---

## Current Demo Features

The current mobile reference client includes:

- AI agent chat flow
- memory capture from agent responses
- Memory Vault
- saved memory cards
- memory search and management
- proof verification screen
- SDK example screen
- demo-mode hashes and storage references
- grant MVP positioning
- premium mobile-first interface

All demo data is currently stored locally in the browser for demonstration purposes.

---

## Proposed Core SDK Functions

The intended SDK interface is centered around four simple functions:

```ts
saveMemory()
getMemory()
searchMemory()
verifyMemory()
```

### `saveMemory`

Creates a structured memory object from agent/user context.

Planned flow:

1. accept agent ID, content, tags, and optional metadata
2. normalize the input into the LoopMind memory schema
3. check consent metadata
4. optionally encrypt the memory payload
5. generate a content hash
6. store the memory object through Autonomys tooling
7. return the memory ID, hash, timestamp, and storage reference

### `getMemory`

Retrieves a memory by memory ID, agent ID, tag, or storage reference.

### `searchMemory`

Searches memories using metadata such as agent ID, tags, timestamps, and optional developer-provided indexing.

Semantic/vector search may be supported later as an optional self-hosted extension, but it is not required for the core MVP.

### `verifyMemory`

Checks that a retrieved memory object matches its expected hash and storage reference.

`verifyMemory` is about integrity and retrievability. It does not claim that the content of a memory is factually true.

---

## Technical Model

A LoopMind memory object may include:

```ts
{
  memoryId: string
  agentId: string
  projectId?: string
  content?: string
  encryptedContent?: string
  tags: string[]
  timestamp: string
  consent: boolean
  hash: string
  storageRef: string
  previousMemoryRef?: string
  metadata?: Record<string, unknown>
}
```

For the Discovery MVP:

- memory records are simulated in the app
- hashes are generated for demo purposes
- storage references are demo-mode references
- no production backend is required
- no environment variables are required

For the grant-funded implementation:

- memory objects would be stored through Autonomys tooling
- hashes would be used for integrity verification
- sensitive memory content would support client-side encryption
- developers would be able to self-host the required components
- integration points would be open and auditable

---

## Privacy and Consent

Agent memory can contain sensitive user or project context, so LoopMind treats memory as data that should be handled carefully.

The intended model includes:

- explicit consent metadata
- client-side encryption support for sensitive memory
- clear separation between public metadata and private memory content
- exportable memory records
- developer guidance on avoiding sensitive plaintext storage
- self-hostable components where possible

The default direction is not to assume that all agent memory should be public.

---

## Demo Agents

The planned demo agents are:

### 1. Research Memory Agent

Stores research notes, summaries, source references, and project context.

Example use:
A developer or researcher can save useful research findings and retrieve them later when the agent needs prior context.

### 2. Governance Memory Agent

Stores DAO proposal summaries, debate context, voting preference notes, and prior governance decisions.

Example use:
A governance assistant can remember previous proposal context before helping summarize or compare new proposals.

### 3. DePIN Mission Memory Agent

Stores field task history, operator notes, mission references, and follow-up actions.

Example use:
A mission agent can retrieve prior operator/device history before suggesting next steps.

---

## Repository Structure

```txt
src/                     Vite + React mobile reference client
public/                  Static assets
docs/                    Architecture, API, privacy, verification, and open-source scope notes
adapters/                Planned adapter docs for LangChain, LangGraph, MCP, and Autonomys Agents
examples/                Planned demo agent descriptions
packages/loopmind-sdk/   SDK interface and design-spec package
```

---

## Planned Open-Source Scope

The open-source scope is intended to include:

- LoopMind SDK
- memory schema
- verification helpers
- LangChain / LangGraph adapter
- MCP memory server
- Autonomys Agents integration example
- demo agents
- mobile reference client
- developer documentation
- setup and architecture guides

No hosted paid API, proprietary indexing layer, closed commercial dashboard, or private product logic is included in the current grant-funded MVP scope.

If commercial hosted services are explored later, they would be separate from the open-source grant-funded components.

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

---

## Build

```bash
npm run build
```

The production build is generated in:

```txt
dist/
```

---

## Deploy to Vercel

Recommended Vercel settings:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: repo root
```

No environment variables are required for the current demo deployment.

---

## Review Notes

For reviewers, the most important distinction is:

**The mobile app is a reference client. The main project is the open-source memory adapter kit, SDK structure, schema, verification model, documentation, and planned framework integrations.**

The current implementation is intentionally scoped as a working discovery prototype. It is meant to demonstrate the product direction clearly before the deeper Autonomys integration work is completed.

---

## License

MIT
