import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    return !sessionStorage.getItem("loopmind_demo_banner_dismissed");
  });

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("loopmind_demo_banner_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ background: "#111111", borderBottom: "1px solid #1a1a1a", overflow: "hidden", flexShrink: 0 }}
        >
          <div className="px-4 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: "#FF6A00" }} />
              <p style={{ fontSize: 11, color: "#666", fontWeight: 500 }}>
                Demo mode — storage references are simulated
              </p>
            </div>
            <button onClick={dismiss} style={{ color: "#444" }}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
