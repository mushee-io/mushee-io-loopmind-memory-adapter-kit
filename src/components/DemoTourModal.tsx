import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface DemoTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoTourModal({ open, onOpenChange }: DemoTourModalProps) {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();

  const steps = [
    { title: "Select an AI agent", desc: "Choose from specialized AI agents.", target: "/chat", btnText: "Go to Chat" },
    { title: "Send a message", desc: "Interact with the agent and get a response.", target: "/chat", btnText: "Next" },
    { title: "Save response as Memory", desc: "Click the Save as Memory button on any response.", target: "/chat", btnText: "Next" },
    { title: "View your Memory in the Vault", desc: "See all saved agent memories.", target: "/vault", btnText: "Go to Vault" },
    { title: "Verify Memory in Autonomys Proofs", desc: "Verify memory integrity on Autonomys.", target: "/proofs", btnText: "Go to Proofs" },
    { title: "Test an SDK call", desc: "Use the SDK playground to simulate dev integration.", target: "/sdk", btnText: "Go to SDK" },
  ];

  const current = steps[step];

  const handleNext = () => {
    if (current.btnText.startsWith("Go to")) {
      setLocation(current.target);
      onOpenChange(false);
      setTimeout(() => setStep(0), 300);
    } else {
      if (step < steps.length - 1) setStep(step + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 mb-1 tracking-wider uppercase">
            <span>Step {step + 1} of {steps.length}</span>
          </div>
          <DialogTitle className="text-xl">{current.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-slate-600 text-sm leading-relaxed">{current.desc}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button variant="ghost" size="sm" onClick={() => { onOpenChange(false); setStep(0); }}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {current.btnText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
