import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4" />
        <path d="M16 14a4 4 0 0 1 4 4v1H4v-1a4 4 0 0 1 4-4" />
        <path d="M12 10v4" strokeDasharray="2 2" />
      </svg>
    ),
    title: "AI agents forget context",
    desc: "Every session starts from zero. Agents can't learn your preferences or build long-term understanding.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    title: "Persistent decentralized memory",
    desc: "LoopMind stores agent context in a cryptographically verifiable vault across every session.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Verifiable on Autonomys",
    desc: "Every memory object is hashed, stored, and verifiable on the Autonomys distributed storage layer.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="m9 8 3 3 3-3" />
      </svg>
    ),
    title: "Open SDK for AI3.0",
    desc: "One npm install to give any AI agent persistent, cross-session memory. Built for the Autonomys ecosystem.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();

  const slide = slides[step];

  const handleNext = () => {
    if (step === slides.length - 1) setLocation("/auth");
    else setStep(s => s + 1);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0B0B0C" }}>
      {/* Progress */}
      <div className="flex gap-1.5 px-6 pt-10 pb-6 flex-shrink-0">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full transition-all duration-500"
            style={{ background: i <= step ? "#FF6A00" : "#1E1E1E" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full"
          >
            <div
              className="w-24 h-24 rounded-[28px] flex items-center justify-center mb-10"
              style={{ background: "#111111", border: "1px solid #1E1E1E", color: "#FF6A00" }}
            >
              {slide.icon}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 16 }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 280 }}>
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="px-6 pb-10 flex flex-col gap-3 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full h-[52px] rounded-2xl font-semibold text-base"
          style={{ background: "#fff", color: "#0B0B0C" }}
        >
          {step === slides.length - 1 ? "Get Started" : "Continue"}
        </motion.button>
        {step < slides.length - 1 && (
          <button
            onClick={() => setLocation("/auth")}
            style={{ fontSize: 14, color: "#444", fontWeight: 500 }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
