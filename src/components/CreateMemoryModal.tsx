import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AGENTS } from "../lib/mockData";
import { MemoryRecord } from "../types/memory";
import { createMemoryRecord } from "../lib/storage";
import { X } from "lucide-react";

interface CreateMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (m: MemoryRecord) => void;
}

export function CreateMemoryModal({ open, onOpenChange, onSave }: CreateMemoryModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [agentId, setAgentId] = useState(AGENTS[0].id);
  const [tags, setTags] = useState("");

  const handleSave = () => {
    if (!title || !content || !agentId) return;
    const agent = AGENTS.find(a => a.id === agentId)!;
    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
    const newMemory = createMemoryRecord(agentId, agent.name, title, content, tagsArray);
    onSave(newMemory);
    onOpenChange(false);
    setTitle("");
    setContent("");
    setTags("");
  };

  const inputStyle = {
    background: "#0f0f0f",
    border: "1px solid #1A1A1A",
    borderRadius: 12,
    color: "#fff",
    fontSize: 14,
    padding: "10px 14px",
    outline: "none",
    width: "100%",
  } as React.CSSProperties;

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    color: "#555",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: 6,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] p-0 border-0 rounded-2xl overflow-hidden hide-close">
        <div style={{ background: "#111111", borderRadius: "1rem" }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: "1px solid #1A1A1A" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Save Memory
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#1A1A1A" }}
            >
              <X className="w-3.5 h-3.5" style={{ color: "#888" }} />
            </button>
          </div>

          <div className="px-5 py-4 space-y-4">
            <div>
              <label style={labelStyle}>Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="E.g., User Preferences"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Agent Source</label>
              <select
                value={agentId}
                onChange={e => setAgentId(e.target.value)}
                style={{ ...inputStyle, appearance: "none" }}
              >
                {AGENTS.map(a => (
                  <option key={a.id} value={a.id} style={{ background: "#111" }}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Memory content..."
                rows={3}
                style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="research, preference, sdk"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex gap-3 px-5 pb-5">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 rounded-xl text-sm font-semibold"
              style={{ background: "#1A1A1A", color: "#888" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title || !content}
              className="flex-1 h-11 rounded-xl text-sm font-bold"
              style={{
                background: !title || !content ? "#1A1A1A" : "#fff",
                color: !title || !content ? "#333" : "#0B0B0C",
                cursor: !title || !content ? "not-allowed" : "pointer",
              }}
            >
              Save Memory
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
