# @loopmind/adapter-mcp

> MCP (Model Context Protocol) resource provider for LoopMind

**Status**: Roadmap (planned grant-funded deliverable)

---

## Overview

MCP resource provider that exposes agent memory as an MCP resource, discoverable by any compatible MCP host. Allows any MCP-compatible AI client to read and write memories through the standard MCP resource interface.

---

## Planned Usage

```typescript
import { LoopMindMCPProvider } from "@loopmind/adapter-mcp"

const provider = new LoopMindMCPProvider({
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "mcp-agent-01",
})

// Expose as MCP resource
// memory://loopmind/research-agent-01/memories
```

---

## Files (Planned)

```
adapters/mcp-server/
├── src/
│   ├── MemoryResource.ts     # MCP resource definition
│   ├── MCPProvider.ts        # MCP provider implementation
│   └── index.ts
└── package.json
```

---

## License

MIT — see [LICENSE](../../LICENSE)
