# Differentiation

## How LoopMind differs from Auto SDK, Auto Memory, and Autonomys Agents

---

## Summary

LoopMind is not a replacement for any of these tools. It is a **memory adapter layer on top of them**. Each tool serves a different purpose:

| Tool | Purpose | Relationship to LoopMind |
|------|---------|--------------------------|
| **Auto SDK** | Low-level Autonomys primitives | LoopMind uses it underneath |
| **Auto Memory** | Permanent storage pattern | LoopMind adds developer workflows on top |
| **Autonomys Agents** | Native Autonomys agent framework | LoopMind provides an adapter for it |
| **LoopMind** | Memory adapter/orchestration layer | Helps external AI developers adopt Autonomys faster |

---

## Auto SDK

Auto SDK provides the raw primitives for interacting with the Autonomys network:

- `auto.upload(data)` → CID
- `auto.download(CID)` → data
- `auto.wallet.sign(payload)` → signature

**What it is**: A low-level integration library. You talk directly to Autonomys DSN.

**What it is not**: It has no concept of agent memory, consent models, TTL, framework adapters, or search.

**LoopMind's relationship**: LoopMind uses Auto SDK as its storage backend. The `saveMemory()` function internally calls `auto.upload()`. Developers using LoopMind never need to call Auto SDK directly unless they want to.

---

## Auto Memory

Auto Memory is a pattern and tooling from Autonomys for permanent storage of memory-like objects.

**What it is**: A permanent memory/storage pattern built on Autonomys infrastructure.

**What it is not**: It does not include framework-specific adapters (LangChain, LangGraph, MCP), consent models enforced at the schema level, or developer-facing verification UX.

**LoopMind's relationship**: LoopMind adds developer workflows, structured schema, framework adapters, and verification UX on top of the Auto Memory concept. If Auto Memory is the storage primitive, LoopMind is the developer toolkit.

---

## Autonomys Agents

Autonomys Agents is the native agent framework from Autonomys. It is purpose-built for agents that run natively on the Autonomys network.

**What it is**: A native agent execution framework with built-in Autonomys integration.

**What it is not**: It does not serve developers building agents in LangChain, LangGraph, or MCP — the dominant external frameworks.

**LoopMind's relationship**: LoopMind provides an adapter (`@loopmind/adapter-autonomys`) that integrates with Autonomys Agents natively, and also provides equivalent adapters for LangChain, LangGraph, and MCP. LoopMind bridges the Autonomys ecosystem to the broader AI agent developer community.

---

## LoopMind's Unique Position

LoopMind is the **only open-source memory solution** that combines:

1. **Decentralized storage** — Autonomys Auto Drive via Auto SDK
2. **Framework adapters** — LangChain, LangGraph, MCP, Autonomys Agents (one interface for all)
3. **Consent-first schema** — every memory requires `consentGiven: true`, owner, and TTL
4. **Public verifiability** — `verifyMemory(hash)` works without any API key
5. **Shareable proof links** — any memory object can be independently verified

No other solution spans all four frameworks with a unified schema and built-in consent model.

---

## What LoopMind Is Not

To be precise about scope:

- LoopMind is **not** a storage provider — it uses Autonomys for storage
- LoopMind is **not** an agent framework — it works alongside existing frameworks
- LoopMind is **not** a wallet product — it uses wallet signing for attribution, not transactions
- LoopMind is **not** a KYC or identity system
- LoopMind is **not** a closed commercial dashboard
- LoopMind is **not** a rewards or incentive platform

---

## Feature Comparison

| Feature | LoopMind | Auto SDK | Auto Memory | Autonomys Agents | LangChain Memory |
|---------|----------|----------|-------------|------------------|------------------|
| Decentralized storage | ✅ | ✅ | ✅ | partial | ❌ |
| LangChain adapter | ✅ | ❌ | ❌ | ❌ | ✅ |
| LangGraph adapter | ✅ | ❌ | ❌ | ❌ | ❌ |
| MCP adapter | ✅ | ❌ | ❌ | ❌ | ❌ |
| Autonomys Agents native | ✅ | ✅ | partial | ✅ | ❌ |
| Built-in consent model | ✅ | ❌ | ❌ | ❌ | ❌ |
| User-controlled TTL | ✅ | ❌ | ❌ | ❌ | ❌ |
| Public proof verification | ✅ | ✅ | ✅ | ❌ | ❌ |
| Single adapter API | ✅ | ❌ | ❌ | ❌ | partial |
| Three-line integration | ✅ | ❌ | ❌ | ❌ | partial |
| Open source (MIT) | ✅ | ✅ | partial | ✅ | ✅ |
