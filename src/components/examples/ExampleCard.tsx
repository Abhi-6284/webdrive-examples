"use client";

import React, { useState } from "react";
import { ExampleItem } from "@/lib/examples-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, Check, ExternalLink, Code2 } from "lucide-react";

interface ExampleCardProps {
  example: ExampleItem;
  onRun: (example: ExampleItem) => void;
  isRunning: boolean;
}

export function ExampleCard({ example, onRun, isRunning }: ExampleCardProps) {
  const [tab, setTab] = useState<"ts" | "js">("ts");
  const [copied, setCopied] = useState(false);

  const code = tab === "ts" ? example.codeTs : example.codeJs;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`example-${example.id}`}
      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div>
        {/* Header: Badge + DriverJS link */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="outline" className="text-[11px] font-medium border-primary/30 bg-primary/5 text-primary">
            {example.badge}
          </Badge>

          {example.driverJsRef && (
            <a
              href={example.driverJsRef}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 font-mono"
              title="Compare with Driver.js docs"
            >
              <span>driver.js ref</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1.5">{example.title}</h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-5">{example.description}</p>

        {/* Code Snippet Box */}
        <div className="rounded-xl border border-border/70 bg-muted/40 overflow-hidden mb-5">
          <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5 bg-muted/60">
            {/* TS / JS Switcher */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTab("ts")}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                  tab === "ts"
                    ? "bg-card text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                type="button"
              >
                TypeScript
              </button>
              <button
                onClick={() => setTab("js")}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                  tab === "js"
                    ? "bg-card text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                type="button"
              >
                JavaScript
              </button>
            </div>

            {/* Copy button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-6 px-1.5 text-[10px] gap-1 text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>

          <pre className="p-3.5 text-[11px] font-mono text-foreground leading-relaxed overflow-x-auto max-h-48 overflow-y-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action: Run Demo */}
      <div className="pt-2">
        <Button
          onClick={() => onRun(example)}
          disabled={isRunning}
          size="sm"
          className="w-full gap-2 shadow-xs font-semibold"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>{isRunning ? "Tour in Progress..." : "Run Live Demo"}</span>
        </Button>
      </div>
    </div>
  );
}
