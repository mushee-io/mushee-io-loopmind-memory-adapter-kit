import React from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Smartphone } from "lucide-react";

const PREVIEW_URL = `https://${window.location.host}/`;

export default function QRShare() {
  const [, setLocation] = useLocation();

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&bgcolor=0B0B0C&color=FFFFFF&qzone=2&data=${encodeURIComponent(PREVIEW_URL)}`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0B0B0C" }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid #111", background: "rgba(11,11,12,0.95)", backdropFilter: "blur(20px)" }}
      >
        <button
          onClick={() => setLocation("/home")}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "#111", border: "1px solid #1A1A1A" }}
        >
          <ArrowLeft className="w-4 h-4" style={{ color: "#888" }} />
        </button>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Scan to Preview</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* QR card */}
          <div
            className="p-5 rounded-[28px]"
            style={{ background: "#0B0B0C", border: "1px solid #1E1E1E", boxShadow: "0 0 0 1px #111, 0 20px 60px rgba(0,0,0,0.6)" }}
          >
            <img
              src={qrUrl}
              alt="QR Code"
              width={200}
              height={200}
              style={{ borderRadius: 12, display: "block" }}
            />
          </div>

          {/* Label */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="w-4 h-4" style={{ color: "#555" }} strokeWidth={1.5} />
              <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>Point your camera here</p>
            </div>
            <p style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>
              Opens the live app on your phone
            </p>
          </div>

          {/* URL pill */}
          <div
            className="px-4 py-2 rounded-full"
            style={{ background: "#111", border: "1px solid #1A1A1A" }}
          >
            <p
              style={{ fontSize: 10, color: "#444", fontFamily: "monospace", wordBreak: "break-all" }}
            >
              {PREVIEW_URL}
            </p>
          </div>

          <p style={{ fontSize: 10, color: "#333", fontWeight: 500 }}>
            Live while workspace is open
          </p>
        </motion.div>
      </div>
    </div>
  );
}
