/**
 * @loopmind/sdk
 * Memory Adapter Kit for AI Agents — built on Autonomys
 *
 * This is the core SDK. Framework adapters (LangChain, LangGraph, etc.)
 * extend BaseMemoryAdapter and add framework-specific lifecycle hooks.
 *
 * Status: prototype / design spec
 * The implementation below shows the intended API surface.
 * Full implementation is the grant-funded deliverable.
 */

export type {
  MemoryRecord,
  MemoryInput,
  MemoryFilter,
  SearchMemoryInput,
  SaveMemoryResult,
  SearchMemoryResult,
  ProofResult,
  LoopMindConfig,
  StorageBackend,
  NetworkTarget,
} from "./types";

export { ConsentError, StorageError, ValidationError } from "./types";

export type { MemoryAdapter, AutoSDKBridge } from "./adapter";
export { BaseMemoryAdapter } from "./adapter";

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

import type { LoopMindConfig, MemoryInput, MemoryFilter, SearchMemoryInput, SaveMemoryResult, MemoryRecord, SearchMemoryResult, ProofResult } from "./types";
import { ConsentError } from "./types";

/**
 * LoopMind — the primary client class.
 *
 * Usage:
 *   const lm = new LoopMind({ storage: "autonomys", agentId: "my-agent" })
 *   const { hash } = await lm.saveMemory({ content: "...", consent: true })
 *   const results = await lm.searchMemory({ agentId: "my-agent", query: "..." })
 *   const proof = await lm.verifyMemory(hash)
 */
export class LoopMind {
  private readonly config: LoopMindConfig;

  constructor(config: LoopMindConfig) {
    this.config = config;
  }

  /**
   * Save a memory object.
   * In production: hashes content and uploads to Autonomys DSN via Auto SDK.
   * Requires consent: true — throws ConsentError otherwise.
   */
  async saveMemory(input: MemoryInput): Promise<SaveMemoryResult> {
    if (input.consent !== true) {
      throw new ConsentError();
    }
    // Production: construct MemoryRecord, hash, upload via AutoSDKBridge
    // Demo: store in localStorage and return a simulated CID
    throw new Error(
      "LoopMind.saveMemory() is not yet implemented. " +
        "This is the grant-funded deliverable. " +
        "See packages/loopmind-sdk/src/adapter.ts for the interface."
    );
  }

  /**
   * Retrieve memory objects from the local index.
   * Does not call the network — local read only.
   */
  async getMemory(_filter?: MemoryFilter): Promise<MemoryRecord[]> {
    throw new Error("LoopMind.getMemory() is not yet implemented.");
  }

  /**
   * Semantic search across agent memories.
   * Demo: keyword matching. Production: vector embeddings.
   */
  async searchMemory(_input: SearchMemoryInput): Promise<SearchMemoryResult[]> {
    throw new Error("LoopMind.searchMemory() is not yet implemented.");
  }

  /**
   * Verify a memory hash against Autonomys DSN.
   * Read-only. No API key required.
   */
  async verifyMemory(_hash: string): Promise<ProofResult> {
    throw new Error("LoopMind.verifyMemory() is not yet implemented.");
  }
}
