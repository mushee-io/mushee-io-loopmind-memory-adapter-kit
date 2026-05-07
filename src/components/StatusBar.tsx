import React, { useState, useEffect } from "react";

function Signal() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
      <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.9" />
      <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" opacity="0.9" />
      <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.9" />
      <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
      <circle cx="8" cy="11" r="1.5" opacity="0.9" />
      <path d="M4 7.5C5.3 6.2 6.6 5.5 8 5.5S10.7 6.2 12 7.5" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M1 4.5C3 2.5 5.4 1.5 8 1.5S13 2.5 15 4.5" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function Battery() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.4" />
      <rect x="2" y="2" width="15" height="8" rx="2" fill="white" opacity="0.85" />
      <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="white" fillOpacity="0.35" />
    </svg>
  );
}

export function StatusBar() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0 relative z-50">
      <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {time}
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[118px] h-[34px] bg-black rounded-full" style={{ boxShadow: "0 0 0 1px #1a1a1a" }} />
      <div className="flex items-center gap-1.5">
        <Signal />
        <Wifi />
        <Battery />
      </div>
    </div>
  );
}
