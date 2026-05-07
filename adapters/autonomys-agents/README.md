# @loopmind/adapter-autonomys

> Native Autonomys Agents SDK adapter for LoopMind

**Status**: Stable (grant-funded open-source deliverable)

---

## Overview

Native adapter for the Autonomys Agents SDK. Directly integrates with the Autonomys agent lifecycle to save memory objects without additional configuration. Built for agents running natively on the Autonomys network.

---

## Installation

```bash
npm install @loopmind/sdk @loopmind/adapter-autonomys
```

---

## Usage

```typescript
import { LoopMindAutonomysAdapter } from "@loopmind/adapter-autonomys"

const memoryAdapter = new LoopMindAutonomysAdapter({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "depin-monitor-01",
})

// Save a memory with permanent TTL
const { hash } = await memoryAdapter.saveMemory({
  content: "Anomaly: Sensor 7-G — temp spike +42°C above baseline.",
  tags: ["alert", "sensor", "depin"],
  consent: true,
  ttlDays: 0,  // Permanent
})

// Verify the anomaly record is on-chain
const proof = await memoryAdapter.verifyMemory(hash)
```

---

## Files

```
adapters/autonomys-agents/
├── src/
│   ├── AutonomysAdapter.ts   # Main adapter class
│   └── index.ts
└── package.json
```

---

## License

MIT — see [LICENSE](../../LICENSE)
