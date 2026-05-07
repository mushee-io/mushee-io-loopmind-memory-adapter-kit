import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "../components/AppLayout";
import { getMemories } from "../lib/storage";
import { DemoTourModal } from "../components/DemoTourModal";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { MessageSquare, Database, Shield, Code, ChevronRight, Settings } from "lucide-react";

const ROW_ACTIONS = [
  { icon: MessageSquare, label: "Chat with agent", sub: "Talk to your AI agents", href: "/chat" },
  { icon: Database, label: "Save memory", sub: "Store a new memory object", href: "/vault" },
  { icon: Shield, label: "Verify memory", sub: "Generate Autonomys proof", href: "/proofs" },
  { icon: Code, label: "SDK playground", sub: "Run saveMemory() live", href: "/sdk" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [memories, setMemories] = useState(getMemories());
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => { setMemories(getMemories()); }, []);

  const verifiedCount = memories.filter(m => m.verificationStatus === "verified").length;

  return (
    <AppLayout>
      <div className="pb-6">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="LoopMind"
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              style={{ border: "1px solid #222" }}
            />
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>LoopMind</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1 h-1 rounded-full" style={{ background: "#22c55e" }} />
                <span style={{ fontSize: 10, color: "#555", fontWeight: 500, letterSpacing: "0.05em" }}>Autonomys-ready</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setLocation("/settings")}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "#111", border: "1px solid #1E1E1E" }}
          >
            <Settings className="w-4 h-4" style={{ color: "#555" }} />
          </button>
        </div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-5 mb-5 rounded-[24px] p-5 relative overflow-hidden"
          style={{ background: "#111111", border: "1px solid #1E1E1E" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 10 }}>
            Memory Layer
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 4 }}>
            Memory Layer Active
          </h2>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>
            {memories.length} record{memories.length !== 1 ? "s" : ""} · demo mode
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p style={{ fontSize: 11, color: "#555", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Memories</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{memories.length}</p>
            </div>
            <div style={{ width: 1, height: 36, background: "#1E1E1E" }} />
            <div>
              <p style={{ fontSize: 11, color: "#555", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Verified</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{verifiedCount}</p>
            </div>
            <div style={{ width: 1, height: 36, background: "#1E1E1E" }} />
            <div>
              <p style={{ fontSize: 11, color: "#555", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Demo</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>MVP</p>
            </div>
          </div>
        </motion.div>

        {/* Action list */}
        <div className="mx-5 mb-5 rounded-[20px] overflow-hidden" style={{ border: "1px solid #1A1A1A" }}>
          {ROW_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setLocation(action.href)}
                className="w-full flex items-center gap-4 px-4 py-4 text-left"
                style={{
                  background: "#0f0f0f",
                  borderBottom: i < ROW_ACTIONS.length - 1 ? "1px solid #1A1A1A" : "none",
                }}
              >
                <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: "#1A1A1A" }}>
                  <Icon className="w-4 h-4" style={{ color: "#888" }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{action.label}</p>
                  <p style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{action.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#333" }} />
              </motion.button>
            );
          })}
        </div>

        {/* Recent activity */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Recent</p>
            <button onClick={() => setLocation("/vault")} style={{ fontSize: 12, color: "#FF6A00", fontWeight: 600 }}>See all</button>
          </div>
          <div className="space-y-2">
            {memories.slice(0, 3).map((m, i) => (
              <motion.div
                key={m.memoryId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: i < 2 ? "1px solid #111" : "none" }}
              >
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: "#111", color: "#666" }}>
                  {m.agentName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }} className="truncate">{m.title}</p>
                  <p style={{ fontSize: 11, color: "#555" }}>{formatDistanceToNow(new Date(m.timestamp), { addSuffix: true })}</p>
                </div>
                {m.verificationStatus === "verified" && (
                  <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#22c55e" }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="px-5 mt-5 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setTourOpen(true)}
            className="flex-1 h-11 rounded-2xl text-sm font-semibold"
            style={{ background: "#111", border: "1px solid #1E1E1E", color: "#888" }}
          >
            Demo Tour
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/grant-mvp")}
            className="flex-1 h-11 rounded-2xl text-sm font-semibold"
            style={{ background: "#111", border: "1px solid #1E1E1E", color: "#888" }}
          >
            Grant MVP
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/qr")}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#111", border: "1px solid #1E1E1E" }}
            title="Scan QR to open on phone"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h1M14 18h1M18 14h1M18 18h1M14 21h3M21 14v1M21 18v3" />
            </svg>
          </motion.button>
        </div>

      </div>
      <DemoTourModal open={tourOpen} onOpenChange={setTourOpen} />
    </AppLayout>
  );
}
