import React from "react";
import { DemoBanner } from "./DemoBanner";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  mainClassName?: string;
}

export function AppLayout({ children, showBottomNav = true, mainClassName }: AppLayoutProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: "#0B0B0C" }}>
      <DemoBanner />
      <main className={mainClassName ?? "flex-1 overflow-y-auto"} style={{ background: "#0B0B0C" }}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
