# DePIN Mission Memory Agent

> Autonomys Agents SDK agent with tamper-proof sensor logs

**Framework**: Autonomys Agents SDK  
**Adapter**: `@loopmind/adapter-autonomys`  
**Use case**: Tamper-proof field task history, operator notes, and mission references

---

## Overview

An Autonomys Agents SDK agent that monitors DePIN (Decentralized Physical Infrastructure Network) sensor networks. Anomalous readings are automatically written to on-chain memory with timestamp and sensor ID, creating an immutable audit trail for physical infrastructure.

Every sensor event saved through this agent:
- Is permanently stored on Autonomys DSN
- Has a cryptographic hash as proof of existence
- Cannot be retroactively altered or deleted
- Can be independently verified by network participants

---

## Sample Memories Saved

```json
{
  "content": "Anomaly: Sensor 7-G — temperature spike +42°C above baseline. Auto-flagged for review.",
  "tags": ["alert", "sensor", "anomaly", "depin"],
  "agentId": "depin-monitor-01",
  "ttlDays": 0,
  "hash": "0x2a5b9c7e..."
}

{
  "content": "Normal: Sector 12 — all sensor readings within tolerance. No action required.",
  "tags": ["normal", "sector-12"],
  "agentId": "depin-monitor-01",
  "hash": "0x6f1d4b3a..."
}

{
  "content": "Maintenance window logged: Node cluster B offline 14:00–16:30 UTC for scheduled upgrade.",
  "tags": ["maintenance", "cluster-b"],
  "agentId": "depin-monitor-01",
  "ttlDays": 0,
  "hash": "0x8e3c1f9d..."
}
```

---

## SDK Calls Used

- `saveMemory({ ttlDays: 0 })` — on every sensor event (permanent record)
- `getMemory({ agentId: 'depin-monitor-01' })` — to retrieve full event history for a sensor cluster
- `verifyMemory(hash)` — to confirm an anomaly report is on-chain before escalating

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-autonomys @autonomys/agent-sdk
```

---

## Ideal For

- Decentralized physical infrastructure networks (DePIN)
- Energy grids, IoT mesh networks, environmental sensors
- Any system requiring tamper-proof logs without a centralized database
- Regulatory compliance where immutable records are required
