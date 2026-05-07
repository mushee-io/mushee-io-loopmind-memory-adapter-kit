# Contributing to LoopMind

Thank you for your interest in contributing to LoopMind. This guide will help you get the project running locally and explain how to submit changes.

---

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [pnpm](https://pnpm.io) 9+ — the workspace uses pnpm and will reject `npm install`

```bash
# Install pnpm
npm install -g pnpm

# Verify
pnpm --version  # should be 9+
```

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/your-org/loopmind.git
cd loopmind

# Install all dependencies across the workspace
pnpm install
```

---

## Running the Apps

Each application runs independently. Open separate terminals for each:

```bash
# Mobile reference client (iPhone PWA)
pnpm run dev:mobile

# Developer Console (9-page web app)
pnpm run dev:console

# API server (Express 5)
pnpm run dev:api
```

---

## Project Structure

```
loopmind/
├── apps/          # Deployable apps
│   ├── loopmind/       # Mobile PWA
│   ├── web-console/    # Developer Console
│   └── api-server/     # Express API
├── lib/
│   ├── api-spec/       # OpenAPI spec (source of truth)
│   ├── api-client-react/ # Generated hooks (do not edit)
│   ├── api-zod/        # Generated Zod schemas (do not edit)
│   └── db/             # Drizzle schema + DB client
├── docs/               # Documentation
└── scripts/            # Utility scripts
```

---

## TypeScript

Run a full typecheck across the entire workspace:

```bash
pnpm run typecheck
```

TypeScript errors will fail the build, so fix any errors before submitting a PR.

---

## API Changes

This project follows an **OpenAPI-first** workflow:

1. Edit `lib/api-spec/openapi.yaml` — the single source of truth for all API contracts
2. Run codegen to regenerate hooks and schemas:
   ```bash
   pnpm run codegen
   ```
3. **Do not manually edit** files in `lib/api-client-react/src/generated/` or `lib/api-zod/src/generated/` — they are always overwritten by codegen

---

## Database Changes

To add or modify database tables:

1. Edit the schema files in `lib/db/src/schema/`
2. Push changes to the dev database:
   ```bash
   pnpm run db:push
   ```

---

## Building

```bash
# Typecheck + build all packages
pnpm run build
```

The build must pass before merging. CI runs this command on every pull request.

---

## Code Style

- **TypeScript** everywhere — no `.js` files in `src/` directories
- **No `console.log`** in server code — use `req.log` in route handlers and `logger` elsewhere
- **Prettier** for formatting — run `pnpm exec prettier --write .` before committing
- Follow existing file naming conventions in each package

---

## Pull Request Guidelines

1. Fork the repository and create a branch from `main`
2. Make your changes — keep PRs focused (one concern per PR)
3. Run `pnpm run typecheck` and `pnpm run build` — both must pass
4. Write a clear PR description explaining what changed and why
5. Link any related issues

---

## Adding a New Adapter

Adapters live in their own workspace packages following the naming convention `@loopmind/adapter-<framework>`.

Each adapter must implement the `ILoopMindAdapter` interface from `@loopmind/core`:

```typescript
interface ILoopMindAdapter {
  saveMemory(input: MemoryInput): Promise<{ hash: string; storageRef: string }>;
  getMemory(filter?: MemoryFilter): Promise<MemoryRecord[]>;
  deleteMemory(hash: string): Promise<void>;
  verifyProof(hash: string): Promise<ProofResult>;
}
```

See `src/lib/storage.ts` for the reference implementation and `docs/ARCHITECTURE.md` for the full interface spec.

---

## Questions

Open a [GitHub Issue](https://github.com/your-org/loopmind/issues) for bugs, feature requests, or questions.
