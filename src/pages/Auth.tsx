import React from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine } from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem("loopmind_session", "true");
    setLocation("/home");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0B0B0C" }}>
      {/* Header */}
      <div className="flex-none pt-14 pb-10 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src="/logo.jpeg"
            alt="LoopMind"
            className="w-14 h-14 rounded-[18px] object-cover mx-auto mb-6"
            style={{ border: "1px solid #1E1E1E", display: "block" }}
          />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "#555" }}>LoopMind · Memory Infrastructure</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex-1 px-6 space-y-3"
      >
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
              Email
            </label>
            <input
              type="email"
              defaultValue="demo@loopmind.xyz"
              style={{ width: "100%", background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: "14px 16px", fontSize: 14, color: "#fff", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              defaultValue="demo1234"
              style={{ width: "100%", background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: "14px 16px", fontSize: 14, color: "#fff", outline: "none" }}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full h-[52px] rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: "#fff", color: "#0B0B0C", marginTop: 8 }}
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px" style={{ background: "#1A1A1A" }} />
          <span style={{ fontSize: 12, color: "#333", fontWeight: 600 }}>or</span>
          <div className="flex-1 h-px" style={{ background: "#1A1A1A" }} />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="w-full h-[50px] rounded-2xl font-semibold text-sm"
          style={{ background: "#111", border: "1px solid #1E1E1E", color: "#888" }}
        >
          Continue as Demo User
        </motion.button>
      </motion.div>

      <div className="flex-none pb-6 pt-4 px-6 flex flex-col items-center gap-3">
        <p style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
          Demo Mode · No Account Needed
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/qr")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: "#111", border: "1px solid #1A1A1A" }}
        >
          <ScanLine className="w-4 h-4" style={{ color: "#555" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>Open on phone · Scan QR</span>
        </motion.button>
      </div>
    </div>
  );
}
