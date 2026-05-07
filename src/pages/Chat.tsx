import React, { useState, useRef, useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import { AGENTS, MOCK_AI_RESPONSES } from "../lib/mockData";
import { saveMemory, createMemoryRecord } from "../lib/storage";
import { MemoryRecord } from "../types/memory";
import { Send, BookmarkPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  saved?: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: "#111" }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#FF6A00" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function Chat() {
  const [selectedAgentId, setSelectedAgentId] = useState(AGENTS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseCounterRef = useRef<Record<string, number>>({});

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId)!;

  useEffect(() => {
    const welcome = MOCK_AI_RESPONSES[selectedAgentId]?.[0] ?? "Hello! How can I help you?";
    setMessages([{ id: "welcome", role: "agent", text: `Hi, I'm your ${selectedAgent.name}. ${welcome}` }]);
    responseCounterRef.current[selectedAgentId] = 1;
  }, [selectedAgentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const responses = MOCK_AI_RESPONSES[selectedAgentId] || [];
      const counter = responseCounterRef.current[selectedAgentId] ?? 0;
      const reply = responses[counter % responses.length];
      responseCounterRef.current[selectedAgentId] = counter + 1;
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "agent", text: reply }]);
    }, 1000 + Math.random() * 600);
  };

  const handleSaveMemory = (msg: ChatMessage) => {
    const agent = AGENTS.find(a => a.id === selectedAgentId)!;
    const tags = selectedAgentId.replace("-agent", "").split("-");
    const title = `${agent.name} — ${msg.text.slice(0, 40)}${msg.text.length > 40 ? "..." : ""}`;
    const record = createMemoryRecord(selectedAgentId, agent.name, title, msg.text, tags);
    saveMemory(record);
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, saved: true } : m));
    showToast("Saved to vault");
  };

  return (
    <AppLayout mainClassName="flex-1 overflow-hidden flex flex-col">
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <div style={{ background: "#0B0B0C", borderBottom: "1px solid #111", flexShrink: 0 }} className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center text-xs font-bold" style={{ background: "#111", color: "#888", border: "1px solid #1E1E1E" }}>
              AI
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{selectedAgent.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1 h-1 rounded-full" style={{ background: "#22c55e" }} />
                <p style={{ fontSize: 10, color: "#555" }}>Active</p>
              </div>
            </div>
          </div>

          {/* Agent chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {AGENTS.map(agent => (
              <motion.button
                key={agent.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedAgentId(agent.id)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: selectedAgentId === agent.id ? "#fff" : "#111",
                  color: selectedAgentId === agent.id ? "#0B0B0C" : "#555",
                  border: selectedAgentId === agent.id ? "none" : "1px solid #1A1A1A",
                }}
              >
                {agent.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" style={{ background: "#0B0B0C" }}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "agent" && (
                <div className="w-7 h-7 rounded-[9px] flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5" style={{ background: "#111", color: "#555" }}>
                  AI
                </div>
              )}
              <div className="max-w-[76%]">
                <div
                  className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === "user" ? "#1A1A1A" : "#111111",
                    color: msg.role === "user" ? "#e0e0e0" : "#bbb",
                    borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "4px 20px 20px 20px",
                    border: "1px solid #1E1E1E",
                  }}
                >
                  {msg.text}
                </div>
                {msg.role === "agent" && msg.id !== "welcome" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => !msg.saved && handleSaveMemory(msg)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: "transparent",
                      color: msg.saved ? "#22c55e" : "#FF6A00",
                      border: `1px solid ${msg.saved ? "#1a3a1a" : "#2a1a0a"}`,
                    }}
                  >
                    <BookmarkPlus className="w-3 h-3" />
                    {msg.saved ? "Saved" : "Save memory"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2"
              >
                <div className="w-7 h-7 rounded-[9px] flex items-center justify-center text-[9px] font-bold" style={{ background: "#111", color: "#555" }}>AI</div>
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 flex-shrink-0" style={{ background: "rgba(11,11,12,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid #111" }}>
          <div className="flex gap-2 items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Message ${selectedAgent.name}...`}
              className="flex-1 rounded-2xl px-4 py-3 text-sm outline-none"
              style={{ background: "#111", border: "1px solid #1A1A1A", color: "#fff" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: input.trim() ? "#fff" : "#111", border: "1px solid #1E1E1E" }}
            >
              <Send className="w-4 h-4" style={{ color: input.trim() ? "#0B0B0C" : "#333" }} />
            </motion.button>
          </div>
        </div>
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
