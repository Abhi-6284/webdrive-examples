"use client";

import React from "react";
import { Terminal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LogEntry {
  id: string;
  time: string;
  event: string;
  detail: string;
}

interface EventConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
}

export function EventConsole({ logs, onClear }: EventConsoleProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden mt-6">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 bg-muted/40">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Live Lifecycle Event Stream</span>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-sans">
            {logs.length} events
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={logs.length === 0}
          className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="h-3 w-3" />
          <span>Clear</span>
        </Button>
      </div>

      <div className="p-4 font-mono text-xs h-36 overflow-y-auto bg-card space-y-1.5 leading-relaxed selection:bg-primary/20">
        {logs.length === 0 ? (
          <p className="text-muted-foreground italic text-[11px]">
            No events logged yet. Click &quot;Run Demo&quot; on &quot;Hooks for Everything&quot; above to stream live lifecycle events.
          </p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2.5">
              <span className="text-muted-foreground select-none text-[11px]">{log.time}</span>
              <span className="font-semibold text-primary select-none">[{log.event}]</span>
              <span className="text-foreground flex-1 break-all">{log.detail}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
