# Open Source Scope

## What is open source and what is outside the grant scope

---

## License

All LoopMind deliverables are published under the **MIT License**. See [LICENSE](../LICENSE).

---

## What Is Open Source

Every component of LoopMind is fully open source:

### Packages

| Package | Status | Description |
|---------|--------|-------------|
| `@loopmind/sdk` | In progress | Core SDK with `saveMemory`, `getMemory`, `searchMemory`, `verifyMemory` |
| `@loopmind/adapter-langchain` | Done | LangChain BaseMemory adapter |
| `@loopmind/adapter-langgraph` | In progress | LangGraph state checkpoint adapter |
| `@loopmind/adapter-mcp` | Roadmap | MCP resource provider |
| `@loopmind/adapter-autonomys` | Done | Native Autonomys Agents SDK adapter |

### Applications

| App | Status | Description |
|-----|--------|-------------|
| Mobile Reference Client | Done | iPhone-framed PWA demo of full memory lifecycle |
| Developer Console | Done | 9-page web app with SDK playground, docs, and architecture |

### Examples

| Example | Framework | Description |
|---------|-----------|-------------|
| `examples/research-agent` | LangChain | Persistent user preferences and topic knowledge |
| `examples/governance-agent` | LangGraph | Immutable voting records and proposal history |
| `examples/depin-mission-agent` | Autonomys Agents SDK | Tamper-proof sensor anomaly logs |

### Documentation

| File | Description |
|------|-------------|
| `docs/architecture.md` | Full system architecture |
| `docs/differentiation.md` | Comparison with Auto SDK, Auto Memory, Autonomys Agents |
| `docs/api.md` | saveMemory, getMemory, searchMemory, verifyMemory |
| `docs/privacy-and-consent.md` | Consent model and privacy design |
| `docs/verification-model.md` | What verification means and what it does not mean |
| `GRANT.md` | Autonomys Foundation grant scope and milestones |
| `CONTRIBUTING.md` | Contribution guide |

---

## What Is Outside the Grant Scope

The following are explicitly outside the funded open-source scope:

- **KYC or identity verification** — LoopMind does not verify user identity
- **Token incentives or rewards** — no points, tokens, or reward mechanisms
- **Commercial SaaS dashboard** — the Developer Console is open source, not a paid product
- **Wallet transaction features** — wallet signing is used only for memory attribution
- **Surveys or data collection** — no user surveys or analytics collection
- **Closed source modules** — no proprietary components of any kind

---

## Grant Deliverables Checklist

- [x] Memory schema with consent model (`consentGiven`, `ttlDays`, `owner`)
- [x] Auto SDK integration (`saveMemory`, `getMemory`, `verifyMemory`)
- [x] LangChain memory adapter (`@loopmind/adapter-langchain`)
- [x] Autonomys Agents adapter (`@loopmind/adapter-autonomys`)
- [x] Verification proof flow (hash + on-chain CID reference)
- [x] Mobile reference client (PWA inside iPhone 15 Pro frame)
- [x] Developer Console (9-page web app with SDK playground and docs)
- [x] Research Agent example
- [x] Governance Agent example
- [x] DePIN Mission Agent example
- [ ] LangGraph adapter (`@loopmind/adapter-langgraph`) — in progress
- [ ] MCP adapter (`@loopmind/adapter-mcp`) — roadmap

---

## Repository Structure

```
loopmind/
├── packages/
│   └── loopmind-sdk/          # Core SDK (@loopmind/sdk)
├── adapters/
│   ├── langchain/             # @loopmind/adapter-langchain
│   ├── langgraph/             # @loopmind/adapter-langgraph
│   ├── mcp-server/            # @loopmind/adapter-mcp
│   └── autonomys-agents/      # @loopmind/adapter-autonomys
├── examples/
│   ├── research-agent/        # LangChain example
│   ├── governance-agent/      # LangGraph example
│   └── depin-mission-agent/   # Autonomys Agents example
├── apps/
│   ├── loopmind/              # Mobile reference client (PWA)
│   └── web-console/           # Developer Console
└── docs/                      # All documentation
```
