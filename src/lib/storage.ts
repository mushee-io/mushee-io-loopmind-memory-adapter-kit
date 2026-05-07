import { MemoryRecord } from "../types/memory";
import { seedMemories } from "./mockData";

const STORAGE_KEY = "loopmind_memories";

export function getMemories(): MemoryRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedMemories));
    return seedMemories;
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveMemory(m: MemoryRecord) {
  const memories = getMemories();
  memories.unshift(m);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function updateMemory(m: MemoryRecord) {
  const memories = getMemories();
  const index = memories.findIndex(x => x.memoryId === m.memoryId);
  if (index !== -1) {
    memories[index] = m;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  }
}

export function deleteMemory(id: string) {
  const memories = getMemories();
  const newMemories = memories.filter((m) => m.memoryId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemories));
}

export function clearMemories() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedMemories));
}

export function exportMemories() {
  const memories = getMemories();
  const blob = new Blob([JSON.stringify(memories, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "loopmind_memories.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function generateHash() {
  return "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
}

export function createMemoryRecord(agentId: string, agentName: string, title: string, content: string, tags: string[]): MemoryRecord {
  const memoryId = "mem_" + Math.random().toString(36).slice(2, 11);
  return {
    memoryId,
    agentId,
    agentName,
    title,
    content,
    tags,
    timestamp: new Date().toISOString(),
    hash: generateHash(),
    autonomysStorageRef: `auto://loopmind/memory/${agentId}/${memoryId}`,
    verificationStatus: "pending"
  };
}
