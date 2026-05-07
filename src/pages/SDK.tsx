import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import { saveMemory, createMemoryRecord } from "../lib/storage";
import { AGENTS } from "../lib/mockData";
import { Copy, Check, Play, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CODE_LINES = [
  { text: `import { LoopMind } from "@loopmind/sdk"`, type: "import" },
  { text: ``, type: "blank" },
  { text: `const client = new LoopMind({`, type: "keyword" },
  { text: `  apiKey: process.env.LOOPMIND_API_KEY`, type: "string" },
  { text: `})`, type: "keyword" },
  { text: ``, type: "blank" },
  { text: `// Store a memory`, type: "comment" },
  { text: `const result = await client.saveMemory({`, type: "keyword" },
  { text: `  agentId: "research-agent",`, type: "string" },
  { text: `  content: "User prefers grant milestones.",`, type: "string" },
  { text: `  tags: ["grant", "preference"]`, type: "string" },
  { text: `})`, type: "keyword" },
  { text: ``, type: "blank" },
  { text: `// Search memories by query`, type: "comment" },
  { text: `const memories = await client.searchMemory({`, type: "keyword" },
  { text: `  query: "grant milestones", limit: 10`, type: "string" },
  { text: `})`, type: "keyword" },
];

const API_ENDPOINTS = [
  { method: "POST", path: "/v1/memory/save", desc: "Store a new memory object" },
  { method: "GET", path: "/v1/memory/:agentId", desc: "Retrieve agent memories" },
  { method: "POST", path: "/v1/memory/search", desc: "Semantic search" },
  { method: "POST", path: "/v1/memory/verify", desc: "Verify on Autonomys" },
];

function lineColor(type: string): string {
  if (type === "comment") return "#555";
  if (type === "import") return "#7dd3fc";
  if (type === "keyword") return "#e2e8f0";
  if (type === "string") return "#fdba74";
  return "#94a3b8";
}

export default function SDK() {
  const [copied, setCopied] = useState(false);
  const [agentId, setAgentId] = useState("research-agent");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const codeString = CODE_LINES.map(l => l.text).join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTest = () => {
    if (!content.trim()) return;
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      const agent = AGENTS.find(a => a.id === agentId) ?? AGENTS[0];
      const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
      const record = createMemoryRecord(agentId, agent.name, content.slice(0, 60), content, tagsArray);
      saveMemory(record);
      setResult(JSON.stringify({
        success: true,
        memoryId: record.memoryId,
        agentId: record.agentId,
        hash: record.hash,
        autonomysStorageRef: record.autonomysStorageRef,
        verificationStatus: "pending",
        timestamp: record.timestamp,
        tags: record.tags,
      }, null, 2));
      setRunning(false);
    }, 1100);
  };

  return (
    <AppLayout>
      <div className="px-5 pt-5 pb-6 space-y-5">

        {/* Header */}
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>SDK</h1>
          <p style={{ fontSize: 13, color: "#555", marginTop: 2 }}>Add persistent memory to any AI agent.</p>
        </div>

        {/* Install */}
        <div className="rounded-[14px] px-4 py-3 flex items-center justify-between" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
          <code style={{ fontSize: 13, color: "#e0e0e0", fontFamily: "monospace" }}>npm install @loopmind/sdk</code>
          <span style={{ fontSize: 10, color: "#FF6A00", fontWeight: 700, background: "rgba(255,106,0,0.08)", padding: "3px 8px", borderRadius: 6 }}>v0.1.0</span>
        </div>

        {/* Code block */}
        <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid #1A1A1A" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "#111", borderBottom: "1px solid #1A1A1A" }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <span style={{ fontSize: 11, color: "#555", marginLeft: 8 }}>quickstart.ts</span>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#555" }}>
              {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-4 overflow-x-auto" style={{ background: "#0a0a0b" }}>
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, lineHeight: "1.7", color: lineColor(line.type), whiteSpace: "pre" }}>
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
        </div>

        {/* API endpoints */}
        <div>
          <p style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 12 }}>REST API · Planned</p>
          <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid #1A1A1A" }}>
            {API_ENDPOINTS.map((ep, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: i < API_ENDPOINTS.length - 1 ? "1px solid #111" : "none", background: "#0f0f0f" }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: ep.method === "GET" ? "#7dd3fc" : "#fdba74",
                    background: ep.method === "GET" ? "rgba(125,211,252,0.08)" : "rgba(253,186,116,0.08)",
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}
                >
                  {ep.method}
                </span>
                <div className="flex-1 min-w-0">
                  <code style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{ep.path}</code>
                  <p style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{ep.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#2a2a2a" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Interactive test */}
        <div className="rounded-[20px] p-5" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Run saveMemory()</p>
          <div className="space-y-3">
            <div>
              <label style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, display: "block", marginBottom: 8 }}>Agent</label>
              <select
                value={agentId}
                onChange={e => setAgentId(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none"
                style={{ background: "#0f0f0f", border: "1px solid #1A1A1A", color: "#e0e0e0" }}
              >
                {AGENTS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, display: "block", marginBottom: 8 }}>Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Memory content..."
                rows={3}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none resize-none"
                style={{ background: "#0f0f0f", border: "1px solid #1A1A1A", color: "#e0e0e0" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, display: "block", marginBottom: 8 }}>Tags</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="grant, sdk, test"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none"
                style={{ background: "#0f0f0f", border: "1px solid #1A1A1A", color: "#e0e0e0" }}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleRunTest}
              disabled={running || !content.trim()}
              className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: content.trim() && !running ? "#fff" : "#1A1A1A", color: content.trim() && !running ? "#0B0B0C" : "#444" }}
            >
              <Play className="w-4 h-4" />
              {running ? "Running..." : "Execute"}
            </motion.button>
          </div>
        </div>

        {/* Response */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[18px] overflow-hidden"
              style={{ border: "1px solid #1A1A1A" }}
            >
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#111", borderBottom: "1px solid #1A1A1A" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                <span style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>200 OK</span>
              </div>
              <pre className="p-4 overflow-x-auto" style={{ background: "#0a0a0b", fontSize: 11, fontFamily: "monospace", color: "#888", lineHeight: 1.7 }}>
                {result}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
