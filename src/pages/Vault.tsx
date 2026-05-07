import React, { useState, useCallback } from "react";
import { AppLayout } from "../components/AppLayout";
import { MemoryModal } from "../components/MemoryModal";
import { VerifyModal } from "../components/VerifyModal";
import { CreateMemoryModal } from "../components/CreateMemoryModal";
import { getMemories, deleteMemory, saveMemory, updateMemory } from "../lib/storage";
import { MemoryRecord } from "../types/memory";
import { Search, Plus, Shield, ShieldCheck, Trash2, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const AGENT_FILTERS = [
  { label: "All", value: "" },
  { label: "Research", value: "research-agent" },
  { label: "Gov", value: "governance-agent" },
  { label: "DePIN", value: "depin-agent" },
  { label: "Grant", value: "grant-agent" },
];

function VaultCard({
  memory,
  onView,
  onVerify,
  onDelete,
}: {
  memory: MemoryRecord;
  onView: (m: MemoryRecord) => void;
  onVerify: (m: MemoryRecord) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-[20px] overflow-hidden"
      style={{ background: "#111111", border: "1px solid #1A1A1A" }}
    >
      <div className="px-5 pt-5 pb-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3, letterSpacing: "-0.01em" }} className="flex-1 min-w-0">
            {memory.title}
          </h3>
          {memory.verificationStatus === "verified" ? (
            <div className="flex items-center gap-1 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
              <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Verified</span>
            </div>
          ) : (
            <span style={{ fontSize: 10, color: "#444", fontWeight: 600, textTransform: "capitalize" }}>
              {memory.verificationStatus}
            </span>
          )}
        </div>

        {/* Preview */}
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }} className="line-clamp-2 mb-4">
          {memory.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {memory.tags.map(tag => (
            <span key={tag} style={{ fontSize: 10, color: "#555", background: "#1A1A1A", border: "1px solid #222", borderRadius: 100, padding: "3px 10px", fontWeight: 600 }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mb-4">
          <code style={{ fontSize: 10, color: "#333", background: "#0f0f0f", border: "1px solid #1A1A1A", borderRadius: 8, padding: "3px 8px", fontFamily: "monospace" }}>
            {memory.hash}
          </code>
          <span style={{ fontSize: 11, color: "#444" }}>
            {formatDistanceToNow(new Date(memory.timestamp), { addSuffix: true })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(memory)}
            className="flex-1 h-9 rounded-xl text-xs font-semibold"
            style={{ background: "#1A1A1A", color: "#888" }}
          >
            View
          </button>
          {memory.verificationStatus !== "verified" && (
            <button
              onClick={() => onVerify(memory)}
              className="flex-1 h-9 rounded-xl text-xs font-semibold"
              style={{ background: "#fff", color: "#0B0B0C" }}
            >
              Verify
            </button>
          )}
          <button
            onClick={() => onDelete(memory.memoryId)}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#1A1A1A" }}
          >
            <Trash2 className="w-3.5 h-3.5" style={{ color: "#555" }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Vault() {
  const [memories, setMemories] = useState<MemoryRecord[]>(getMemories());
  const [search, setSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [viewMemory, setViewMemory] = useState<MemoryRecord | null>(null);
  const [verifyMemory, setVerifyMemory] = useState<MemoryRecord | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const refresh = () => setMemories(getMemories());

  const filtered = memories.filter(m => {
    const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase());
    const matchAgent = !agentFilter || m.agentId === agentFilter;
    return matchSearch && matchAgent;
  });

  const handleDelete = useCallback((id: string) => { deleteMemory(id); refresh(); }, []);
  const handleView = useCallback((m: MemoryRecord) => { setViewMemory(m); setViewOpen(true); }, []);
  const handleVerify = useCallback((m: MemoryRecord) => { setVerifyMemory(m); setVerifyOpen(true); }, []);
  const handleVerified = useCallback((m: MemoryRecord) => { updateMemory(m); refresh(); }, []);
  const handleCreate = (m: MemoryRecord) => { saveMemory(m); refresh(); };

  return (
    <AppLayout>
      <div className="px-5 pt-5 pb-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Vault</h1>
            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{memories.length} memories</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCreateOpen(true)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "#fff" }}
          >
            <Plus className="w-5 h-5" style={{ color: "#0B0B0C" }} />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#444" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: "#111", border: "1px solid #1A1A1A", color: "#fff" }}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {AGENT_FILTERS.map(f => (
            <motion.button
              key={f.value}
              whileTap={{ scale: 0.93 }}
              onClick={() => setAgentFilter(f.value)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: agentFilter === f.value ? "#fff" : "#111",
                color: agentFilter === f.value ? "#0B0B0C" : "#555",
                border: agentFilter === f.value ? "none" : "1px solid #1A1A1A",
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20 text-center gap-4">
                <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
                  <Database className="w-6 h-6" style={{ color: "#333" }} />
                </div>
                <p style={{ fontSize: 14, color: "#444", fontWeight: 600 }}>No memories found</p>
              </motion.div>
            ) : (
              filtered.map((m, i) => (
                <motion.div
                  key={m.memoryId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <VaultCard memory={m} onView={handleView} onVerify={handleVerify} onDelete={handleDelete} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <MemoryModal memory={viewMemory} open={viewOpen} onOpenChange={setViewOpen} onVerify={handleVerify} />
      <VerifyModal memory={verifyMemory} open={verifyOpen} onOpenChange={setVerifyOpen} onVerified={handleVerified} />
      <CreateMemoryModal open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
    </AppLayout>
  );
}
