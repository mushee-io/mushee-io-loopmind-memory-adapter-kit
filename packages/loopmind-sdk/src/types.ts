/**
 * LoopMind SDK — Core Type Definitions
 * Memory Adapter Kit for AI Agents
 * https://github.com/loopmind/loopmind
 */

// ---------------------------------------------------------------------------
// Memory Record
// ---------------------------------------------------------------------------

/**
 * The canonical data structure for all memory objects in LoopMind.
 * Every field is stored with the memory object on Autonomys Auto Drive.
 */
export interface MemoryRecord {
  /** UUID v4, auto-generated on saveMemory() */
  id: string;
  /** Agent identifier — must match the adapter's configured agentId */
  agentId: string;
  /** Wallet address of the memory owner. Used for attribution and audit. */
  owner?: string;
  /** Memory content (plain text). Encrypted at rest when encryption: true. */
  content: string;
  /** Searchable tags for getMemory() and searchMemory() filtering */
  tags: string[];
  /** Consent flag — must be true; enforced at schema level */
  consentGiven: true;
  /** Days until the memory expires from the agent index. 0 = permanent. */
  ttlDays: number;
  /** ISO8601 creation timestamp */
  createdAt: string;
  /** Auto SDK CID — set after successful upload to Autonomys DSN */
  hash?: string;
  /** Auto Drive URL — set after successful upload */
  storageRef?: string;
}

// ---------------------------------------------------------------------------
// Input / Filter types
// ---------------------------------------------------------------------------

/**
 * Input to saveMemory(). The consent field must be literal true.
 * Omitting it or passing false throws a ConsentError.
 */
export interface MemoryInput {
  agentId: string;
  content: string;
  tags?: string[];
  /** Required — must be literal `true`. ConsentError thrown otherwise. */
  consent: true;
  /** Days until expiry. 0 = permanent. Default: 0 */
  ttlDays?: number;
}

/**
 * Optional filter for getMemory().
 */
export interface MemoryFilter {
  agentId: string;
  /** Return only memories that include ALL specified tags */
  tags?: string[];
  /** ISO8601 — only memories created after this timestamp */
  since?: string;
  /** Maximum number of records to return. Default: 100 */
  limit?: number;
  /** Pagination offset */
  offset?: number;
}

/**
 * Input to searchMemory() — natural language query against agent memories.
 */
export interface SearchMemoryInput {
  agentId: string;
  /** Natural language search query */
  query: string;
  /** Maximum results. Default: 10 */
  limit?: number;
  /** Minimum relevance score 0–1. Default: 0.5 */
  minScore?: number;
}

// ---------------------------------------------------------------------------
// Result types
// ---------------------------------------------------------------------------

export interface SaveMemoryResult {
  id: string;
  /** Auto SDK CID — the on-chain reference for this memory */
  hash: string;
  /** Auto Drive URL */
  storageRef: string;
  createdAt: string;
  status: "verified" | "pending";
}

export interface SearchMemoryResult extends MemoryRecord {
  /** Relevance score 0–1. Higher = more relevant to the query. */
  score: number;
}

/**
 * Result of verifyMemory(hash).
 * Does NOT verify factual accuracy — only cryptographic existence.
 */
export interface ProofResult {
  /** CID exists on Autonomys DSN */
  exists: boolean;
  /** Content hash matches the stored object */
  matchesHash: boolean;
  agentId: string;
  owner?: string;
  /** ISO8601 timestamp from on-chain record */
  createdAt: string;
  /** Auto Drive URL */
  networkUrl: string;
  /** True if all checks passed */
  verified: boolean;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export type StorageBackend = "autonomys" | "local";
export type NetworkTarget = "mainnet" | "testnet";

export interface LoopMindConfig {
  /** Storage backend. "autonomys" uses Auto Drive; "local" uses filesystem/localStorage */
  storage: StorageBackend;
  /** Encrypt content before storage. Key is derived from owner wallet. Default: false */
  encryption?: boolean;
  /** Autonomys API key. Required for "autonomys" storage writes. */
  apiKey?: string;
  /** Default agentId for all operations when not specified per-call */
  agentId: string;
  /** Wallet address for memory attribution */
  owner?: string;
  /** Network target. Default: "testnet" */
  network?: NetworkTarget;
  /** Enable verbose logging. Default: false */
  debug?: boolean;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class ConsentError extends Error {
  constructor() {
    super(
      "LoopMind: saveMemory() requires consent: true. " +
        "Memory cannot be saved without explicit consent."
    );
    this.name = "ConsentError";
  }
}

export class StorageError extends Error {
  constructor(message: string) {
    super(`LoopMind: Storage operation failed — ${message}`);
    this.name = "StorageError";
  }
}

export class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`LoopMind: Validation failed on '${field}' — ${message}`);
    this.name = "ValidationError";
  }
}
