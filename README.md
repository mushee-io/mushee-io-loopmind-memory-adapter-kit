# LoopMind

**Memory Adapter Kit for AI Agents**

LoopMind is an open-source discovery MVP for adding structured, verifiable memory flows to AI agents. The current deployable app is a premium mobile reference client that demonstrates agent chat, memory capture, Memory Vault, proof verification, SDK examples, and grant-scope positioning.

## What this repo contains

- `src/` — Vite + React mobile reference client
- `public/` — static assets
- `docs/` — architecture, API, privacy, verification, and open-source scope notes
- `adapters/` — planned adapter docs for LangChain, LangGraph, MCP, and Autonomys Agents
- `examples/` — planned demo agent descriptions
- `packages/loopmind-sdk/` — SDK interface/design-spec package

## Product positioning

LoopMind is intended as an open-source Memory Adapter Kit for AI agents. The mobile app is a reference client that demonstrates memory flows. The grant-funded product scope is the SDK, adapters, memory schema, verification helpers, documentation, and demo agents.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
```

The production build is generated in `dist/`.

## Deploy to Vercel

Recommended Vercel settings:

- Framework Preset: **Vite**
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: repo root

No environment variables are required for the demo deployment.

## Status

Discovery MVP / reference implementation. Current storage and verification flows are simulated in demo mode. The grant-funded implementation would connect the SDK and adapters to Autonomys tooling through open and auditable integration points.

## License

MIT
