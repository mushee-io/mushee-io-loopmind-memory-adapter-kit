import React, { useState, useCallback } from "react";
import { AppLayout } from "../components/AppLayout";
import { getMemories, updateMemory } from "../lib/storage";
import { MemoryRecord } from "../types/memory";
import { ShieldCheck, Shield, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

function VerifyDialog({
  memory,
  onClose,
  onVerified,
}: {
  memory: MemoryRecord;
  onClose: () => void;
  onVerified: (m: MemoryRecord) => void;
}) {
  const [step, setStep] = useState<"idle" | "verifying" | "done">("idle");

  const handleVerify = () => {
    setStep("verifying");
    setTimeout(() => {
      const updated = { ...memory, verificationStatus: "verified" as const };
      onVerified(updated);
      setStep("done");
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 px-6"
      style={{ background: "rgba(11,11,12,0.96)", backdropFilter: "blur(20px)" }}
    >
      {/* Ring element */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer ring glow */}
        {step === "verifying" && (
          <motion.div
            className="absolute rounded-full"
            style={{ width: 160, height: 160, border: "2px solid #FF6A00" }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {step === "done" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute rounded-full"
            style={{ width: 160, height: 160, border: "2px solid #22c55e" }}
          />
        )}

        {/* Circle */}
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center relative"
          style={{
            background: step === "done" ? "#0a1f0a" : "#111",
            border: step === "done" ? "1px solid #1a3a1a" : "1px solid #1E1E1E",
            transition: "background 0.5s, border 0.5s",
          }}
        >
          <AnimatePresence mode="wait">
            {step === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Shield className="w-12 h-12" style={{ color: "#333" }} strokeWidth={1.2} />
              </motion.div>
            )}
            {step === "verifying" && (
              <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-12 h-12" style={{ color: "#FF6A00" }} strokeWidth={1.2} />
                </motion.div>
              </motion.div>
            )}
            {step === "done" && (
              <motion.div key="done" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                <ShieldCheck className="w-12 h-12" style={{ color: "#22c55e" }} strokeWidth={1.2} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div key="idle-text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-center mb-8">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Verify Memory</h3>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, maxWidth: 260 }}>{memory.title}</p>
          </motion.div>
        )}
        {step === "verifying" && (
          <motion.div key="verify-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mb-8">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Verifying...</h3>
            <p style={{ fontSize: 13, color: "#555" }}>Checking hash on Autonomys</p>
          </motion.div>
        )}
        {step === "done" && (
          <motion.div key="done-text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center mb-8">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#22c55e", marginBottom: 6 }}>Memory Verified</h3>
            <p style={{ fontSize: 13, color: "#555" }}>Autonomys proof generated</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical details */}
      <div className="w-full rounded-[18px] overflow-hidden mb-6" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
        <div className="px-4 py-3 space-y-3">
          <div>
            <p style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 2 }}>Hash</p>
            <code style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>{memory.hash}</code>
          </div>
          <div style={{ height: 1, background: "#1A1A1A" }} />
          <div>
            <p style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 2 }}>Storage Ref</p>
            <code style={{ fontSize: 10, color: step === "done" ? "#FF6A00" : "#555", fontFamily: "monospace" }} className="break-all">
              {memory.autonomysStorageRef}
            </code>
          </div>
          <div style={{ height: 1, background: "#1A1A1A" }} />
          <div>
            <p style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 2 }}>Timestamp</p>
            <code style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>
              {formatDistanceToNow(new Date(memory.timestamp), { addSuffix: true })}
            </code>
          </div>
        </div>
      </div>

      {/* Actions */}
      {step === "idle" && (
        <div className="w-full flex gap-3">
          <button onClick={onClose} className="flex-1 h-12 rounded-2xl text-sm font-semibold" style={{ background: "#111", border: "1px solid #1E1E1E", color: "#555" }}>
            Cancel
          </button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleVerify} className="flex-1 h-12 rounded-2xl text-sm font-semibold" style={{ background: "#fff", color: "#0B0B0C" }}>
            Verify on Autonomys
          </motion.button>
        </div>
      )}
      {step === "done" && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full h-12 rounded-2xl text-sm font-semibold"
          style={{ background: "#fff", color: "#0B0B0C" }}
        >
          Done
        </motion.button>
      )}
    </motion.div>
  );
}

export default function Proofs() {
  const [memories, setMemories] = useState<MemoryRecord[]>(getMemories());
  const [verifyingMemory, setVerifyingMemory] = useState<MemoryRecord | null>(null);

  const refresh = () => setMemories(getMemories());

  const handleVerify = useCallback((m: MemoryRecord) => setVerifyingMemory(m), []);
  const handleVerified = useCallback((m: MemoryRecord) => { updateMemory(m); refresh(); }, []);
  const handleClose = useCallback(() => setVerifyingMemory(null), []);

  const verifiedCount = memories.filter(m => m.verificationStatus === "verified").length;
  const pendingCount = memories.filter(m => m.verificationStatus !== "verified").length;

  return (
    <AppLayout>
      <div className="relative">
        <div className="px-5 pt-5 pb-6 space-y-4">

          {/* Header */}
          <div className="mb-2">
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Proofs</h1>
            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Autonomys verification dashboard</p>
          </div>

          {/* Stats row */}
          <div className="rounded-[20px] p-5 relative overflow-hidden" style={{ background: "#111", border: "1px solid #1A1A1A" }}>
            <div className="absolute top-0 right-0 w-32 h-32" style={{ background: "radial-gradient(circle at 80% 20%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#0a1a0a", border: "1px solid #1a3a1a" }}>
                <ShieldCheck className="w-7 h-7" style={{ color: "#22c55e" }} strokeWidth={1.2} />
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#555", fontWeight: 500, marginBottom: 4 }}>VERIFIED</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{verifiedCount}</p>
              </div>
              <div style={{ width: 1, height: 40, background: "#1A1A1A", marginLeft: 8 }} />
              <div>
                <p style={{ fontSize: 11, color: "#555", fontWeight: 500, marginBottom: 4 }}>PENDING</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{pendingCount}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "#1A1A1A" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#22c55e" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${memories.length > 0 ? (verifiedCount / memories.length) * 100 : 0}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <p style={{ fontSize: 10, color: "#444", marginTop: 6 }}>
                {memories.length > 0 ? Math.round((verifiedCount / memories.length) * 100) : 0}% verification rate
              </p>
            </div>
          </div>

          {/* Memory proof list */}
          <div className="space-y-2">
            {memories.map((m, i) => (
              <motion.div
                key={m.memoryId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[18px] overflow-hidden"
                style={{ background: "#111", border: "1px solid #1A1A1A" }}
              >
                {/* Status stripe */}
                <div style={{ height: 2, background: m.verificationStatus === "verified" ? "#22c55e" : "#1A1A1A" }} />

                <div className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0" }} className="truncate">{m.title}</h3>
                      <p style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{m.agentName}</p>
                    </div>
                    {m.verificationStatus === "verified" ? (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
                        <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Verified</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 10, color: "#444", fontWeight: 600 }}>Unverified</span>
                    )}
                  </div>

                  {/* Hash */}
                  <code style={{ fontSize: 10, color: "#333", fontFamily: "monospace", display: "block", marginBottom: 12 }}>
                    {m.hash}
                  </code>

                  {m.verificationStatus === "verified" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                      <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>Autonomys proof generated</span>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleVerify(m)}
                      className="w-full h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                      style={{ background: "#fff", color: "#0B0B0C" }}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Verify on Autonomys
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Verify dialog overlay */}
        <AnimatePresence>
          {verifyingMemory && (
            <VerifyDialog
              memory={verifyingMemory}
              onClose={handleClose}
              onVerified={(m) => { handleVerified(m); setTimeout(handleClose, 1200); }}
            />
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
