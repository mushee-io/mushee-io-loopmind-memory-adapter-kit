import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSession = localStorage.getItem("loopmind_session");
      setLocation(hasSession ? "/home" : "/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center" style={{ background: "#0B0B0C" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <img
          src="/logo.jpeg"
          alt="LoopMind"
          className="w-[72px] h-[72px] rounded-[22px] object-cover"
          style={{ border: "1px solid #222" }}
        />
        <div className="text-center">
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1 }}>LoopMind</h1>
          <p style={{ fontSize: 11, color: "#555", marginTop: 6, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
            Memory Infrastructure
          </p>
        </div>
      </motion.div>
    </div>
  );
}
