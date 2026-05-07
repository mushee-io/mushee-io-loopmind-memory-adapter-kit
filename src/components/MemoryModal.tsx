import React from "react";
import { MemoryRecord } from "../types/memory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShieldCheck, ShieldAlert, ShieldX, Database, Hash, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface MemoryModalProps {
  memory: MemoryRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify?: (m: MemoryRecord) => void;
}

export function MemoryModal({ memory, open, onOpenChange, onVerify }: MemoryModalProps) {
  if (!memory) return null;

  const getStatusConfig = (status: string) => {
    if (status === "verified") return { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (status === "pending") return { icon: ShieldAlert, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { icon: ShieldX, color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200" };
  };

  const statusConfig = getStatusConfig(memory.verificationStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] rounded-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
              {memory.agentName}
            </span>
          </div>
          <DialogTitle className="text-xl leading-tight">{memory.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content</h4>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed">
              {memory.content}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags
              </h4>
              <div className="flex flex-wrap gap-1">
                {memory.tags.map(tag => (
                  <span key={tag} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-md border border-orange-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Created
              </h4>
              <p className="text-xs text-slate-700 font-medium">
                {format(new Date(memory.timestamp), "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 shadow-inner">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Database className="w-3 h-3" /> Autonomys Proof Data
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 mb-1 block">Storage Reference</label>
                <div className="bg-slate-800 text-slate-300 font-mono text-[10px] p-2 rounded border border-slate-700 break-all">
                  {memory.autonomysStorageRef}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] text-slate-500 mb-1 block">Content Hash</label>
                <div className="bg-slate-800 text-slate-300 font-mono text-[10px] p-2 rounded border border-slate-700">
                  {memory.hash}
                </div>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg border ${statusConfig.bg} ${statusConfig.border}`}>
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
              <div>
                <p className={`text-sm font-semibold capitalize ${statusConfig.color}`}>
                  {memory.verificationStatus}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {memory.verificationStatus === "verified" ? "Verified via Autonomys" : "Pending network verification"}
                </p>
              </div>
            </div>
            
            {memory.verificationStatus !== "verified" && onVerify && (
              <Button size="sm" variant="outline" className="bg-white h-8 text-xs" onClick={() => onVerify(memory)}>
                Verify Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
