import React from "react";
import { Link, useLocation } from "wouter";
import { Home, MessageSquare, Database, Shield, Code } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/vault", icon: Database, label: "Vault" },
    { href: "/proofs", icon: Shield, label: "Proofs" },
    { href: "/sdk", icon: Code, label: "SDK" },
  ];

  return (
    <div
      style={{
        background: "rgba(11,11,12,0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid #1a1a1a",
      }}
      className="z-50 flex-shrink-0"
    >
      <div className="flex items-center justify-around h-[58px] px-2">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative">
              <div className="relative flex flex-col items-center gap-1">
                <Icon
                  style={{ color: isActive ? "#fff" : "#444", transition: "color 0.2s" }}
                  className="w-[22px] h-[22px]"
                  strokeWidth={isActive ? 2 : 1.6}
                />
                {isActive && (
                  <motion.div
                    layoutId="navDot"
                    className="w-1 h-1 rounded-full"
                    style={{ background: "#FF6A00" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {!isActive && <div className="w-1 h-1" />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
