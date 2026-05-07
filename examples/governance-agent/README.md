# Governance Memory Agent

> LangGraph state-machine agent with immutable voting records on Autonomys

**Framework**: LangGraph  
**Adapter**: `@loopmind/adapter-langgraph`  
**Use case**: Immutable voting records, proposal history, and governance audit trails

---

## Overview

A LangGraph agent that records governance actions — votes, proposals, and approvals — as immutable memory objects on Autonomys. Votes become provably permanent, tamper-resistant, and publicly auditable.

Every governance decision saved through this agent:
- Is stored permanently on Autonomys DSN
- Has a cryptographic hash that cannot be altered
- Can be verified by any participant without trusting a central server

---

## Sample Memories Saved

```json
{
  "content": "Vote: Proposal #12 — APPROVED (2/3 threshold met). Voter: governance-agent-01.",
  "tags": ["vote", "proposal", "approved"],
  "agentId": "governance-agent-01",
  "ttlDays": 0,
  "hash": "0x9f3c2a1b..."
}

{
  "content": "Governance session: quorum reached for protocol upgrade v2.1. 7/9 nodes present.",
  "tags": ["quorum", "session"],
  "agentId": "governance-agent-01",
  "hash": "0x4d7e8f2c..."
}

{
  "content": "Flagged: Proposal #11 requires additional security review before next vote cycle.",
  "tags": ["review", "flag"],
  "agentId": "governance-agent-01",
  "hash": "0x1a5c9e4d..."
}
```

---

## SDK Calls Used

- `saveMemory({ consentGiven: true, ttlDays: 0 })` — on every vote or governance action (permanent)
- `getMemory({ tags: ['vote'] })` — to retrieve full voting history for audit
- `verifyMemory(hash)` — to confirm a vote record exists and is unaltered

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-langgraph @langchain/langgraph
```

---

## Ideal For

- DAOs and protocol governance
- Any system requiring transparent, auditable voting history
- Governance records that must be verifiable by any participant without trusting a central server
