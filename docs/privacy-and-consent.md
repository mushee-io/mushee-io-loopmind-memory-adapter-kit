# Privacy and Consent

## Encryption, consent metadata, sensitive memory handling, and self-hosting

---

## Overview

LoopMind is designed with privacy and consent as first-class concerns — not afterthoughts. Every memory object requires explicit consent at the schema level. Encryption is available for sensitive content. Users control TTL and can delete memories from their agent's index at any time.

---

## Consent Model

### Required field

Every memory saved through LoopMind requires `consentGiven: true` in the input:

```typescript
await loopmind.saveMemory({
  content: "User prefers concise summaries.",
  consent: true,  // Required — literal true
})
```

If `consent` is `false`, `undefined`, or missing, LoopMind throws a `ConsentError` before any data is written to storage. This is enforced at the schema level — there is no way to bypass it through the adapter API.

### What consent means

`consentGiven: true` means the agent or application has obtained explicit approval from the memory owner before saving this memory. LoopMind does not verify the nature or source of that consent — it requires the developer to assert it.

### Owner attribution

Every memory record includes an `owner` field — the wallet address of the person who owns the memory. This enables:

- Auditing all memories belonging to a specific owner
- Associating memories with a verifiable identity (wallet)
- Selective deletion by owner

---

## TTL (Time to Live)

Every memory has a `ttlDays` field that controls when it expires from the agent's local index:

```typescript
await loopmind.saveMemory({
  content: "Temporary context for this session.",
  consent: true,
  ttlDays: 1,   // Expires in 1 day
})

await loopmind.saveMemory({
  content: "Permanent preference.",
  consent: true,
  ttlDays: 0,   // 0 = permanent (never expires)
})
```

**Important**: TTL applies to the agent's local index, not the on-chain storage. On-chain storage on Autonomys is permanent by design. A memory with `ttlDays: 1` will be removed from the agent's retrieval index after one day, but its hash will remain on Autonomys permanently as an audit record.

---

## Encryption

When `encryption: true` is set in the `LoopMind` config, content is encrypted before being sent to Autonomys storage:

```typescript
const loopmind = new LoopMind({
  storage: "autonomys",
  encryption: true,
  apiKey: process.env.AUTONOMYS_KEY,
  agentId: "my-agent",
})
```

**Current implementation (demo)**: Encryption is simulated in the demo implementation. The content is not actually encrypted before storage.

**Production implementation**: The grant-funded production implementation will use AES-256-GCM encryption with the owner's wallet-derived key before upload to Autonomys. The key is never transmitted to any third party.

### What encryption protects

- Content is unreadable to Autonomys farmers and network participants
- Only the key holder (owner) can decrypt and read the content
- The CID hash is still public and verifiable — proof of existence does not require decryption

### What encryption does not protect

- Metadata: `agentId`, `owner`, `createdAt`, `tags` are stored unencrypted for searchability
- The fact that a memory exists — the CID is public
- TTL and consent status

---

## Deletion

Users can remove memories from their agent's index:

```typescript
await loopmind.deleteMemory("0x3f8a1cd2e4b9...")
```

**What deletion does**:
- Removes the memory from the agent's local retrieval index
- The agent will no longer surface this memory in `getMemory()` or `searchMemory()`

**What deletion does not do**:
- On-chain storage on Autonomys is immutable — the CID and content remain on the network permanently
- Deletion is from the agent's index only, not from the global storage layer

This is by design. Permanent on-chain records provide auditability. The agent-level deletion respects user preferences for what the agent actively uses, while preserving the historical record.

---

## Sensitive Memory

For memory objects containing sensitive information:

1. Enable `encryption: true` at initialization
2. Use short `ttlDays` values to limit the window the memory is accessible
3. Avoid putting highly sensitive content (passwords, private keys, medical data) in agent memory — agent memory is designed for context and preferences, not secret storage
4. Consider using the `local` storage backend during development to avoid any network transmission

---

## Self-Hosting

LoopMind can be configured to use local storage instead of Autonomys:

```typescript
const loopmind = new LoopMind({
  storage: "local",  // All data stays on device/server
  agentId: "my-agent",
})
```

In `local` mode:
- No data is sent to Autonomys or any external service
- Memories are stored in the agent's local database (localStorage in browser, filesystem in Node.js)
- `verifyMemory()` returns a local verification result (not an on-chain proof)
- TTL and consent are still enforced identically

Self-hosting is suitable for:
- Development and testing
- Privacy-sensitive deployments
- Air-gapped environments

---

## What Is Not Collected

LoopMind does not:

- Collect telemetry or usage analytics
- Send memory content to any service other than Autonomys (when `storage: "autonomys"`)
- Store API keys on any external server
- Build user profiles or behavioral data
- Share memory content with any third party

---

## Privacy Roadmap

The following privacy features are planned for the grant-funded implementation:

- [ ] AES-256-GCM encryption with wallet-derived keys
- [ ] Selective disclosure — share proof of a memory without revealing content
- [ ] Memory access logs — see which agent accessed which memory
- [ ] Owner-signed deletion proofs — cryptographic evidence that an owner requested deletion
- [ ] Privacy-preserving search — search across encrypted memories without decryption
