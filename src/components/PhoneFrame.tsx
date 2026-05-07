import React from "react";
import { StatusBar } from "./StatusBar";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)" }}
    >
      <div
        style={{
          width: 393,
          height: "min(852px, 100dvh)",
          position: "relative",
          borderRadius: 50,
          background: "#0f0f0f",
          boxShadow:
            "0 0 0 1px #222, 0 0 0 2.5px #111, inset 0 0 0 1px #2a2a2a, 0 50px 130px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5)",
          flexShrink: 0,
        }}
      >
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -2.5, top: 110, width: 2.5, height: 30, background: "#1c1c1c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2.5, top: 152, width: 2.5, height: 58, background: "#1c1c1c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2.5, top: 220, width: 2.5, height: 58, background: "#1c1c1c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -2.5, top: 175, width: 2.5, height: 76, background: "#1c1c1c", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: 42,
            overflow: "hidden",
            background: "#0B0B0C",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StatusBar />
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {children}
          </div>
          {/* Home indicator */}
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 6, paddingTop: 4, flexShrink: 0 }}>
            <div style={{ width: 134, height: 5, background: "#fff", borderRadius: 100, opacity: 0.15 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
