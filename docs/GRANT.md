# LoopMind — Autonomys Foundation Grant

## Overview

LoopMind is a grant-funded open-source project under the **Autonomys Foundation Grant Program**. The goal is to build production-quality memory infrastructure for AI agents running on or integrated with the Autonomys Network.

This document describes the grant scope, deliverables, milestones, and the rationale for each component.

---

## Problem Statement

AI agents operating in production environments face three critical memory failures:

1. **Fragile memory** — every session restart wipes agent context. Agents cannot accumulate knowledge over time.
2. **No verifiable consent** — users cannot audit what an agent remembered, when, or whether it was deleted. Trust is assumed, not proven.
3. **Zero interoperability** — memory saved in one framework (LangChain) is inaccessible to another (Autonomys Agents SDK). The ecosystem is siloed.

Autonomys' decentralized storage (DSN + Auto Drive) provides the technical substrate to solve all three. LoopMind builds the adapter layer that makes it accessible to the broader AI agent ecosystem.

---

## Solution

LoopMind provides:

- A **universal memory interface** (`saveMemory`, `getMemory`, `deleteMemory`, `verifyProof`) that works identically across all major agent frameworks
- A **consent-first schema** where `consentGiven: true` is required at the data layer — not an afterthought
- **Cryptographic proof** — every memory is content-addressed by the Autonomys Auto SDK, creating an immutable on-chain reference
- **Framework adapters** for LangChain, LangGraph, MCP, and Autonomys Agents SDK

---

## Grant Deliverables

### Phase 1 — Core SDK (Complete)

| Deliverable | Status | Notes |
|-------------|--------|-------|
| Memory schema + consent model | ✅ Done | `MemoryRecord` interface with `consentGiven`, `ttlDays`, `owner` |
| Auto SDK integration | ✅ Done | `saveMemory` → CID, `verifyProof` → on-chain check |
| LangChain adapter | ✅ Done | `@loopmind/adapter-langchain` — extends `BaseMemory` |
| Autonomys Agents adapter | ✅ Done | `@loopmind/adapter-autonomys` — native SDK integration |
| Verification proof flow | ✅ Done | Hash comparison + Auto Drive reference |
| Mobile reference client | ✅ Done | PWA inside iPhone 15 Pro frame — 10 pages |
| Developer Console | ✅ Done | 9-page web app with SDK playground, docs, architecture |

### Phase 2 — Ecosystem Expansion (In Progress)

| Deliverable | Status | Notes |
|-------------|--------|-------|
| LangGraph adapter | 🔄 In progress | `@loopmind/adapter-langgraph` — state checkpointer |
| MCP adapter | 📋 Roadmap | `@loopmind/adapter-mcp` — resource provider |
| npm package publishing | 📋 Roadmap | Public npm registry under `@loopmind` scope |
| Testnet deployment guide | 📋 Roadmap | Step-by-step for Autonomys testnet integration |

---

## Demo Agents

Three reference agents demonstrate different production use cases:

### Research Agent (`research-agent-01`)
- **Framework**: LangChain
- **Use case**: Persistent user preferences and topic knowledge across sessions
- **Memory pattern**: Saves user preferences, topic interests, and prior conclusions
- **Value**: Demonstrates how knowledge accumulation transforms a stateless LLM into a persistent AI assistant

### Governance Agent (`governance-agent-01`)
- **Framework**: LangGraph
- **Use case**: Immutable DAO voting records and proposal history
- **Memory pattern**: Votes and governance decisions stored as permanent on-chain records
- **Value**: Demonstrates how decentralized storage enables trustless governance audit trails

### DePIN Monitor (`depin-monitor-01`)
- **Framework**: Autonomys Agents SDK
- **Use case**: Sensor anomaly logs for physical infrastructure networks
- **Memory pattern**: Anomalous readings written to on-chain memory with sensor ID and timestamp
- **Value**: Demonstrates how tamper-proof logs replace centralized databases for physical infrastructure

---

## Architecture Rationale

### Why Autonomys?

1. **Permanent storage** — Autonomys DSN stores data indefinitely without ongoing fees. This is essential for memory that must persist across agent lifetimes.
2. **Content-addressed** — every memory object is identified by its content hash (CID). This makes verification trivial and manipulation impossible.
3. **Decentralized** — no single point of failure. Memory survives even if LoopMind itself shuts down.
4. **Auto SDK** — Autonomys provides a production-ready SDK for interacting with the DSN, reducing integration complexity.

### Why a consent model?

Regulatory pressure (GDPR, CCPA) and ethical AI principles both require that users control what AI agents remember about them. Existing memory solutions treat consent as optional — LoopMind makes it mandatory at the schema level.

---

## Open Source Commitment

All deliverables are published under the **MIT License**:

- Full source code in this repository
- npm packages under `@loopmind` scope (Phase 2)
- Documentation and architecture diagrams
- Reference implementations for all demo agents

The Autonomys ecosystem benefits from LoopMind becoming the standard memory adapter layer — any framework that wants decentralized memory can integrate via a single interface.

---

## Milestone Summary

| Milestone | Description | Status |
|-----------|-------------|--------|
| M1 | Memory schema + consent model defined | ✅ |
| M2 | Auto SDK write integration working | ✅ |
| M3 | LangChain adapter published | ✅ |
| M4 | Verification proof flow end-to-end | ✅ |
| M5 | Mobile reference client (10 pages, iPhone frame) | ✅ |
| M6 | Developer Console (9 pages, SDK playground, docs) | ✅ |
| M7 | LangGraph adapter | 🔄 |
| M8 | MCP adapter | 📋 |
| M9 | npm package publication | 📋 |
