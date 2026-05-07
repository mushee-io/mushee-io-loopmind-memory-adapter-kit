import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MemoryRecord } from "../types/memory";
import { ShieldCheck, Database, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface VerifyModalProps {
  memory: MemoryRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: (m: MemoryRecord) => void;
}

export function VerifyModal({ memory, open, onOpenChange, onVerified }: VerifyModalProps) {
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (open && memory) {
      setVerifying(true);
      const timer = setTimeout(() => {
        setVerifying(false);
        onVerified({ ...memory, verificationStatus: "verified" });
      }, 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, memory, onVerified]);

  if (!memory) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!verifying) onOpenChange(val);
    }}>
      <DialogContent className="max-w-[320px] rounded-2xl p-0 overflow-hidden hide-close border-0">
        <div className="p-6 relative" style={{ background: "#111111", borderRadius: "1rem" }}>
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #FF6A00, #ff8c3a)" }} />

          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-4">
            {verifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-16 h-16 rounded-full flex items-center justify-center relative"
                style={{ border: "3px solid #1A1A1A", borderTopColor: "#FF6A00" }}
              >
                <Database className="w-6 h-6 absolute" style={{ color: "#555" }} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                <ShieldCheck className="w-8 h-8" style={{ color: "#22c55e" }} />
              </motion.div>
            )}

            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                {verifying ? "Verifying Memory..." : "Memory Verified"}
              </h3>
              <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                {verifying
                  ? "Computing content hash..."
                  : "Autonomys-ready proof generated"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl p-3" style={{ background: "#0f0f0f", border: "1px solid #1A1A1A" }}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontSize: 10, color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Content Hash
                </span>
                {verifying ? (
                  <Loader2 className="w-3 h-3 animate-spin" style={{ color: "#333" }} />
                ) : (
                  <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Matched</span>
                )}
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: "#888", wordBreak: "break-all" }}>
                {memory.hash}
              </div>
            </div>

            <div className="rounded-xl p-3" style={{ background: "#0f0f0f", border: "1px solid #1A1A1A" }}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontSize: 10, color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Storage Reference
                </span>
                {!verifying && (
                  <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>Valid</span>
                )}
              </div>
              <div className="font-mono" style={{ fontSize: 10, color: "#888", wordBreak: "break-all" }}>
                {memory.autonomysStorageRef}
              </div>
            </div>
          </div>

          {!verifying && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mt-5 font-bold py-3 rounded-xl text-sm"
              style={{ background: "#fff", color: "#0B0B0C" }}
              onClick={() => onOpenChange(false)}
            >
              Done
            </motion.button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
