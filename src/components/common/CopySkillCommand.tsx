"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopySkillCommand() {
  const [copied, setCopied] = useState(false);

  const copySkillCmd = () => {
    navigator.clipboard.writeText("npx webdrive install-skill");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={copySkillCmd}
      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs shadow-sm cursor-pointer hover:border-primary/50 transition-all w-full sm:w-auto select-none group"
      role="button"
      tabIndex={0}
      title="Click to copy command"
    >
      <span className="text-primary font-bold">$</span>
      <span className="text-foreground">npx webdrive install-skill</span>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      )}
    </div>
  );
}
