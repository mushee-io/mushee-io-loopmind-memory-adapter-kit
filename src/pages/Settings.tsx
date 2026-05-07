import React, { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "../components/AppLayout";
import { exportMemories, clearMemories } from "../lib/storage";
import { Key, Database, LogOut, Download, Trash2, ChevronRight, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Row({ label, sub, right, onClick, danger }: {
  label: string;
  sub?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-4 text-left"
      style={{ background: "transparent" }}
    >
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 14, fontWeight: 600, color: danger ? "#ef4444" : "#e0e0e0" }}>{label}</p>
        {sub && <p style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{sub}</p>}
      </div>
      {right ?? <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#2a2a2a" }} />}
    </button>
  );
}

export default function Settings() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [autonomysMode, setAutonomysMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("lm_demo_key_a9f4b2c1d3e5");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => { exportMemories(); showToast("Exported as JSON"); };
  const handleClear = () => { if (confirm("Reset to demo seed data?")) { clearMemories(); showToast("Reset complete"); } };
  const handleSignOut = () => { localStorage.removeItem("loopmind_session"); setLocation("/auth"); };

  const sectionCard = (children: React.ReactNode) => (
    <div className="rounded-[18px] overflow-hidden" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
      {children}
    </div>
  );

  const divider = <div style={{ height: 1, background: "#1A1A1A", marginLeft: 16 }} />;

  return (
    <AppLayout>
      <div className="px-5 pt-5 pb-8 space-y-6">

        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Settings</h1>
          <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Account & configuration</p>
        </div>

        {/* Profile */}
        <div>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 10 }}>Account</p>
          {sectionCard(
            <>
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#1A1A1A", color: "#888" }}>D</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0" }}>Demo User</p>
                  <p style={{ fontSize: 11, color: "#555" }}>demo@loopmind.ai</p>
                </div>
                <ChevronRight className="w-4 h-4 ml-auto" style={{ color: "#2a2a2a" }} />
              </div>
              {divider}
              <div className="px-4 py-3 flex items-center justify-between">
                <p style={{ fontSize: 13, color: "#888" }}>Project</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>LoopMind Demo</p>
              </div>
            </>
          )}
        </div>

        {/* Developer */}
        <div>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 10 }}>Developer</p>
          {sectionCard(
            <>
              <div className="px-4 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-4 h-4" style={{ color: "#555" }} strokeWidth={1.5} />
                  <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>API Key</span>
                </div>
                <div className="flex items-center justify-between rounded-xl px-3.5 py-3" style={{ background: "#0f0f0f", border: "1px solid #1A1A1A" }}>
                  <code style={{ fontSize: 12, color: "#555", fontFamily: "monospace" }}>lm_demo_key_••••••••••••</code>
                  <button onClick={handleCopyApiKey} className="flex items-center gap-1.5 ml-3 flex-shrink-0" style={{ fontSize: 11, color: "#555" }}>
                    {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              {divider}
              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" style={{ color: "#555" }} strokeWidth={1.5} />
                    <div>
                      <p style={{ fontSize: 13, color: "#e0e0e0", fontWeight: 600 }}>Storage Mode</p>
                      <p style={{ fontSize: 11, color: "#555" }}>localStorage · demo mode</p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Autonomys storage: grant deliverable")}
                    className="w-12 h-6 rounded-full relative"
                    style={{ background: "#1A1A1A" }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full"
                      style={{ background: "#333", left: 2 }}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Data */}
        <div>
          <p style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 10 }}>Data</p>
          {sectionCard(
            <>
              <Row label="Export Memories" sub="Download all memories as JSON" onClick={handleExport}
                right={<Download className="w-4 h-4" style={{ color: "#555" }} />} />
              {divider}
              <Row label="Reset Demo Data" sub="Restore seed memories" onClick={handleClear} danger />
            </>
          )}
        </div>

        {/* Sign out */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignOut}
          className="w-full h-12 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: "#111", border: "1px solid #1A1A1A", color: "#ef4444" }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>

        <p style={{ textAlign: "center", fontSize: 10, color: "#333", fontWeight: 500 }}>LoopMind v0.1.0 · Demo Mode</p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-sm font-medium px-5 py-2.5 rounded-full z-50 whitespace-nowrap"
            style={{ background: "#fff", color: "#0B0B0C" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
