export interface MemoryRecord {
  memoryId: string;        // "mem_" + random
  agentId: string;         // e.g. "research-agent"
  agentName: string;       // e.g. "Research Agent"
  title: string;
  content: string;
  tags: string[];          // e.g. ["grant", "preference"]
  timestamp: string;       // ISO date
  hash: string;            // "0x" + 8chars + "..." + 4chars
  autonomysStorageRef: string; // "auto://loopmind/memory/{agentId}/{memoryId}"
  verificationStatus: "verified" | "pending" | "unverified";
}
