/**
 * LoopMind SDK — Core Adapter Interface
 *
 * All framework-specific adapters (LangChain, LangGraph, MCP, Autonomys Agents)
 * implement this interface. This ensures a single API surface regardless of
 * which framework the agent is running in.
 */

import type {
  MemoryRecord,
  MemoryInput,
  MemoryFilter,
  SearchMemoryInput,
  SaveMemoryResult,
  SearchMemoryResult,
  ProofResult,
  LoopMindConfig,
} from "./types";

/**
 * The core adapter interface.
 * Implement this to add LoopMind support to any agent framework.
 */
export interface MemoryAdapter {
  /**
   * Save a memory object to storage.
   * Validates consent, constructs a MemoryRecord, hashes content,
   * and submits to Autonomys DSN via Auto SDK.
   *
   * @throws {ConsentError} if consent is not literal true
   * @throws {ValidationError} if required fields are missing
   * @throws {StorageError} if the Auto SDK upload fails
   */
  saveMemory(input: MemoryInput): Promise<SaveMemoryResult>;

  /**
   * Retrieve memory objects from the local index.
   * Applies tag, date, and pagination filters.
   * Does not call the network — reads from local store only.
   */
  getMemory(filter?: MemoryFilter): Promise<MemoryRecord[]>;

  /**
   * Search memories using a natural language query.
   * Returns results sorted by relevance score (0–1).
   *
   * Demo implementation: keyword matching.
   * Production implementation: vector embeddings.
   */
  searchMemory(
    input: SearchMemoryInput
  ): Promise<SearchMemoryResult[]>;

  /**
   * Verify a memory hash against Autonomys DSN.
   * Resolves the CID and confirms the stored content matches.
   *
   * This is a read-only operation. No API key required.
   * Works for any hash, not just memories saved by this adapter.
   */
  verifyMemory(hash: string): Promise<ProofResult>;
}

/**
 * Base class for LoopMind adapters.
 * Framework-specific adapters extend this and add framework lifecycle hooks.
 */
export abstract class BaseMemoryAdapter implements MemoryAdapter {
  protected readonly config: LoopMindConfig;

  constructor(config: LoopMindConfig) {
    this.config = config;
  }

  abstract saveMemory(input: MemoryInput): Promise<SaveMemoryResult>;
  abstract getMemory(filter?: MemoryFilter): Promise<MemoryRecord[]>;
  abstract searchMemory(input: SearchMemoryInput): Promise<SearchMemoryResult[]>;
  abstract verifyMemory(hash: string): Promise<ProofResult>;

  /**
   * Validate consent before any storage write.
   * Called by all saveMemory() implementations.
   */
  protected validateConsent(input: MemoryInput): void {
    if (input.consent !== true) {
      const { ConsentError } = require("./types");
      throw new ConsentError();
    }
  }

  /**
   * Compute a SHA-256 hash of the memory content.
   * Used as the local hash before Auto SDK upload returns the CID.
   */
  protected async hashContent(content: string): Promise<string> {
    if (typeof globalThis.crypto?.subtle !== "undefined") {
      const encoded = new TextEncoder().encode(content);
      const buffer = await globalThis.crypto.subtle.digest("SHA-256", encoded);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    // Node.js fallback
    const { createHash } = await import("crypto");
    return createHash("sha256").update(content).digest("hex");
  }
}

/**
 * Autonomys Auto SDK integration contract.
 * In production, this wraps the real Auto SDK.
 * In demo mode, this is replaced with a localStorage simulation.
 */
export interface AutoSDKBridge {
  /**
   * Upload a memory object to Autonomys DSN.
   * Returns the CID (Content Identifier) of the stored object.
   */
  upload(data: MemoryRecord): Promise<{ cid: string; url: string }>;

  /**
   * Download a memory object from Autonomys DSN by CID.
   */
  download(cid: string): Promise<MemoryRecord | null>;

  /**
   * Verify a CID exists on Autonomys DSN.
   * Returns null if the CID is not found.
   */
  verify(cid: string): Promise<{ exists: boolean; createdAt: string } | null>;
}
