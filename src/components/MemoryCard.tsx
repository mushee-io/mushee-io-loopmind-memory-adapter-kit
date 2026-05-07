import React from "react";
import { MemoryRecord } from "../types/memory";
import { ShieldCheck, Clock, Hash, Database, Trash2, ShieldAlert, ShieldX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MemoryCardProps {
  memory: MemoryRecord;
  onView: (m: MemoryRecord) => void;
  onVerify: (m: MemoryRecord) => void;
  onDelete: (id: string) => void;
}

export function MemoryCard({ memory, onView, onVerify, onDelete }: MemoryCardProps) {
  const getAgentColor = (agentId: string) => {
    switch (agentId) {
      case "research-agent": return "bg-blue-100 text-blue-800 border-blue-200";
      case "defi-agent": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "governance-agent": return "bg-purple-100 text-purple-800 border-purple-200";
      case "depin-agent": return "bg-orange-100 text-orange-800 border-orange-200";
      case "grant-agent": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "verified") return <ShieldCheck className="w-3 h-3 text-green-600" />;
    if (status === "pending") return <ShieldAlert className="w-3 h-3 text-yellow-600" />;
    return <ShieldX className="w-3 h-3 text-slate-400" />;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 flex-1">{memory.title}</h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${getAgentColor(memory.agentId)}`}>
          {memory.agentName}
        </span>
      </div>
      
      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
        {memory.content}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {memory.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
            #{tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <Clock className="w-3 h-3" />
          {formatDistanceToNow(new Date(memory.timestamp), { addSuffix: true })}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate">
          <Hash className="w-3 h-3" />
          <span className="truncate">{memory.hash}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate col-span-2">
          <Database className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{memory.autonomysStorageRef}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
          {getStatusIcon(memory.verificationStatus)}
          <span className="text-[10px] font-medium capitalize text-slate-700">
            {memory.verificationStatus}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => onView(memory)} className="text-[11px] font-medium text-primary hover:text-orange-700">
            View
          </button>
          {memory.verificationStatus !== "verified" && (
            <button onClick={() => onVerify(memory)} className="text-[11px] font-medium text-slate-600 hover:text-slate-900">
              Verify
            </button>
          )}
          <button onClick={() => onDelete(memory.memoryId)} className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
