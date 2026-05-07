import React from "react";
import { useLocation } from "wouter";
import { CheckCircle, ArrowLeft, Database, Network, Code, Shield, FileText } from "lucide-react";
import { motion } from "framer-motion";

const CHECKLIST = [
  "Single coherent project narrative",
  "Autonomys-native memory architecture",
  "Open-source SDK deliverables",
  "Measurable milestones",
  "Ecosystem value for AI3.0 developers",
];

const ARCHITECTURE_FLOW = [
  { label: "User / Developer", desc: "Agent owner or builder" },
  { label: "AI Agent", desc: "Research, DeFi, DAO, DePIN..." },
  { label: "LoopMind SDK", desc: "@loopmind/sdk · npm install" },
  { label: "Memory Vault", desc: "Encrypted memory objects" },
  { label: "Autonomys Storage", desc: "Permanent distributed layer" },
];

const USE_CASES = [
  { icon: Database, label: "Research Agents", desc: "Persistent context across sessions" },
  { icon: Shield, label: "DeFi Copilots", desc: "Risk memory & user preferences" },
  { icon: FileText, label: "Governance Assistants", desc: "Long-term DAO voting history" },
  { icon: Network, label: "DePIN Agents", desc: "Mission & field operator memory" },
  { icon: Code, label: "Grant Writing Agents", desc: "Feedback loops & iteration" },
];

const MILESTONES = [
  { month: "M1", title: "SDK Core", items: ["Memory CRUD", "TypeScript types", "Autonomys schema"] },
  { month: "M2", title: "Demo App", items: ["Agent Chat", "Memory Vault", "Proof flow"] },
  { month: "M3", title: "Docs", items: ["Open-source SDK docs", "API reference", "Integration guide"] },
];

export default function GrantMVP() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0B0B0C" }}>
      {/* Sticky header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #111", background: "rgba(11,11,12,0.95)", backdropFilter: "blur(20px)" }}>
        <button onClick={() => setLocation("/home")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
          <ArrowLeft className="w-4 h-4" style={{ color: "#888" }} />
        </button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Grant MVP</span>
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,106,0,0.1)", color: "#FF6A00", border: "1px solid rgba(255,106,0,0.2)" }}>
          Autonomys AI3.0
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 10 }}>Focused MVP</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>
            Decentralized AI Memory Infrastructure
          </h1>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>
            LoopMind delivers one clear thing: persistent, verifiable memory for AI agents on Autonomys. The MVP includes a mobile demo app, Memory Vault, verification proof flow, and open-source SDK.
          </p>
        </motion.div>

        {/* Checklist */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12 }}>Grant Criteria</p>
          <div className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                style={{ background: "#111", border: "1px solid #1A1A1A" }}
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#22c55e" }} strokeWidth={2} />
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12 }}>Architecture</p>
          <div className="rounded-[20px] p-5" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
            {ARCHITECTURE_FLOW.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i === ARCHITECTURE_FLOW.length - 1 ? "#FF6A00" : "#333" }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#e0e0e0" }}>{step.label}</p>
                    <p style={{ fontSize: 11, color: "#555" }}>{step.desc}</p>
                  </div>
                </div>
                {i < ARCHITECTURE_FLOW.length - 1 && (
                  <div className="ml-[3px] my-2 border-l border-dashed" style={{ height: 20, borderColor: "#1A1A1A" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12 }}>Milestones</p>
          <div className="space-y-2">
            {MILESTONES.map((ms, i) => (
              <div key={i} className="rounded-[18px] p-4" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#FF6A00", background: "rgba(255,106,0,0.08)", padding: "3px 8px", borderRadius: 100 }}>{ms.month}</span>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#e0e0e0" }}>{ms.title}</h3>
                </div>
                <div className="space-y-1.5">
                  {ms.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#444" }} />
                      <p style={{ fontSize: 12, color: "#666" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Use cases */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12 }}>Use Cases</p>
          <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid #1A1A1A" }}>
            {USE_CASES.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ background: "#0f0f0f", borderBottom: i < USE_CASES.length - 1 ? "1px solid #111" : "none" }}
                >
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: "#1A1A1A" }}>
                    <Icon className="w-4 h-4" style={{ color: "#666" }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{uc.label}</p>
                    <p style={{ fontSize: 11, color: "#555" }}>{uc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/chat")}
          className="w-full h-12 rounded-2xl font-semibold text-sm"
          style={{ background: "#fff", color: "#0B0B0C" }}
        >
          Start Demo
        </motion.button>
      </div>
    </div>
  );
}
