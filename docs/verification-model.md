# Verification Model

## What verification means and what it does not mean

---

## Overview

LoopMind's `verifyMemory()` function checks whether a memory object exists on the Autonomys network and whether its content matches the stored hash. This is a specific, narrow claim — not a general statement about truthfulness or trustworthiness.

---

## What verifyMemory() Does

When you call `verifyMemory(hash)`, LoopMind performs the following checks:

1. **CID existence** — confirms the content-addressed ID (CID) exists on the Autonomys Distributed Storage Network (DSN)
2. **Hash match** — confirms the content of the stored object produces the same hash as the one being verified
3. **Metadata integrity** — confirms the stored object's metadata (agentId, createdAt, owner) matches what was originally saved
4. **Timestamp verification** — confirms when the object was first stored on-chain

If all four checks pass, `verifyMemory()` returns `verified: true`.

```typescript
const proof = await loopmind.verifyMemory("0x3f8a1cd2e4b9...")

// proof.exists       — CID found on Autonomys DSN
// proof.matchesHash  — content hash matches stored hash
// proof.agentId      — which agent saved this memory
// proof.createdAt    — when it was stored on-chain
// proof.verified     — all checks passed
```

---

## What verifyMemory() Does Not Do

### It does not verify truthfulness

`verifyMemory()` confirms that a memory object *exists and has not been tampered with*. It does not verify that the content of the memory is factually correct, accurate, or trustworthy.

If an agent saved `"The user voted YES on Proposal #12"` and that statement was false, `verifyMemory()` will return `verified: true` — because the object exists, has not been modified, and the hash matches. The verification is of the *record*, not the *claim*.

### It does not verify consent validity

`verifyMemory()` confirms the consent flag was set to `true` when the memory was saved. It does not verify that genuine consent was obtained from a real person. That responsibility belongs to the application layer.

### It does not verify identity

The `owner` field contains a wallet address. `verifyMemory()` confirms the wallet address matches what was stored, but it does not verify who controls that wallet or whether it belongs to the person the agent was interacting with.

### It does not guarantee availability

Autonomys DSN provides strong availability guarantees through redundancy and decentralization. However, `verifyMemory()` cannot guarantee 100% uptime. A network partition or node failure could cause a temporary verification failure that is not indicative of data loss.

### It does not prove deletion

If a memory is deleted from an agent's local index, `verifyMemory()` will still return `exists: true` — the on-chain record is permanent. Deletion from the agent's index does not delete the on-chain record.

---

## Verification in Demo Mode

In the current demo implementation, `verifyMemory()` returns simulated data without making real network calls:

```typescript
// Demo mode response (simulated)
{
  exists: true,
  matchesHash: true,
  agentId: "research-agent-01",
  owner: "0xYourWalletAddress",
  createdAt: "2025-05-07T10:23:11Z",
  networkUrl: "auto://drive/QmXYZ...",
  verified: true
}
```

The demo banner throughout the application states this clearly: *"Demo mode — this prototype simulates Autonomys storage references and verification-ready metadata."*

---

## Verification in Production

The grant-funded production implementation will:

1. Call the Autonomys Auto SDK to resolve the CID against the DSN
2. Download the stored object and compute its SHA-256 hash
3. Compare against the provided hash
4. Return a cryptographically valid proof of existence

This is a real network operation. The CID is content-addressed, meaning any node on the Autonomys network can independently verify it — no trusted third party required.

---

## Sharing Verification Proofs

A verification proof can be shared with anyone:

```typescript
const proof = await loopmind.verifyMemory(hash)

// Share proof.networkUrl — anyone can verify independently
// "auto://drive/QmXYZ..." resolves to the object on Autonomys
```

Recipients can:
- Independently call `verifyMemory()` with the same hash
- Access the Autonomys block explorer to confirm CID existence
- Download the object themselves and verify the hash matches

No LoopMind account or API key is required to verify a proof. Verification is fully public.

---

## Verification Use Cases

### Appropriate use cases

- **Auditing governance decisions** — confirm a vote was recorded at a specific time with specific content
- **Session continuity** — confirm a memory exists before relying on it for agent behavior
- **Dispute resolution** — provide proof that an agent made a specific decision based on a specific memory
- **Compliance records** — demonstrate that consent was captured and stored immutably

### Inappropriate use cases

- **Verifying factual accuracy** — `verifyMemory()` cannot tell you if the memory content is true
- **Identity verification** — wallet addresses are not verified identities
- **Real-time trust decisions** — verification confirms historical state, not current intent
- **Legal proof** — LoopMind verification is a technical proof, not a legal attestation

---

## Summary

| What it is | What it is not |
|------------|----------------|
| Proof that a memory record exists on-chain | Proof that the content is factually true |
| Proof that the record has not been tampered with | Proof of identity or genuine consent |
| Proof of when the record was first stored | Proof of deletion |
| Publicly verifiable without any API key | A legal attestation |
