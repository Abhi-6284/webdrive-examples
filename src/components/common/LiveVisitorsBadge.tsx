"use client";

import React from "react";
import { useLiveVisitors } from "@/hooks/useLiveVisitors";
import { Users } from "lucide-react";

interface LiveVisitorsBadgeProps {
  variant?: "pill" | "compact" | "card" | "inline";
  className?: string;
  showLabel?: boolean;
}

export function LiveVisitorsBadge({
  variant = "pill",
  className = "",
  showLabel = true,
}: LiveVisitorsBadgeProps) {
  const { active, loading } = useLiveVisitors();

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ${className}`}
        title="Live visitors active on WebDrive right now"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span>{active}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">
                {active}
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                Live
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Active developers exploring tours right now
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center gap-2 text-xs text-muted-foreground ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-medium text-foreground">
          {active} developers
        </span>
        <span>exploring tours right now</span>
      </div>
    );
  }

  // Default "pill"
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition-colors ${className}`}
      title="Real-time active visitors on WebDrive"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-semibold">{active}</span>
      {showLabel && <span className="text-muted-foreground">online</span>}
    </div>
  );
}

export function LiveVisitorsCount() {
  const { active } = useLiveVisitors();
  return <span className="tabular-nums">{active}</span>;
}

