"use client";

import React from "react";
import { useNpmDownloads } from "@/hooks/useNpmDownloads";
import { Download, TrendingUp, Package, ShieldCheck, Sparkles } from "lucide-react";

interface NpmDownloadsBadgeProps {
  variant?: "pill" | "navbar" | "hero-proof" | "footer" | "text";
  showLink?: boolean;
  className?: string;
}

export function NpmDownloadsBadge({
  variant = "pill",
  showLink = true,
  className = "",
}: NpmDownloadsBadgeProps) {
  const { formatted, downloads } = useNpmDownloads();

  const content = (() => {
    switch (variant) {
      case "text":
        return <span>{formatted} monthly downloads</span>;

      case "footer":
        return (
          <span className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ${className}`}>
            <span className="font-bold text-red-500 text-[11px]">npm</span>
            <Download className="h-3 w-3 text-primary" />
            <span className="font-semibold text-foreground">{formatted}</span>
            <span>downloads/mo</span>
          </span>
        );

      case "navbar":
        return (
          <div
            className={`inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/60 hover:bg-accent/60 px-2.5 py-1 text-xs font-medium transition-all hover:border-primary/50 shadow-xs cursor-pointer ${className}`}
            title={`${downloads.toLocaleString()} downloads in the last 30 days on npm`}
          >
            <span className="rounded bg-red-500/10 px-1 py-0.2 text-[10px] font-extrabold text-red-600 dark:text-red-400 select-none">
              npm
            </span>
            <Download className="h-3 w-3 text-primary" />
            <span className="font-semibold text-foreground">{formatted}</span>
            <span className="hidden xl:inline text-muted-foreground">downloads</span>
          </div>
        );

      case "hero-proof":
        return (
          <div
            className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs text-muted-foreground font-medium ${className}`}
          >
            <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-foreground shadow-xs">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="font-bold text-primary">{formatted}+</span>
              <span>npm downloads / month</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 shadow-xs">
              <Package className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">&lt; 10 kB</span>
              <span>min+gzip footprint</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-semibold text-foreground">0</span>
              <span>external dependencies</span>
            </div>
          </div>
        );

      case "pill":
      default:
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary transition-all hover:bg-primary/15 ${className}`}
            title={`${downloads.toLocaleString()} downloads in the last 30 days on npm`}
          >
            <Download className="h-3 w-3 animate-pulse" />
            <span>{formatted}+</span>
            <span className="font-normal text-muted-foreground">npm downloads</span>
          </span>
        );
    }
  })();

  if (showLink && (variant === "navbar" || variant === "pill" || variant === "footer")) {
    return (
      <a
        href="https://www.npmjs.com/package/webdrive"
        target="_blank"
        rel="noreferrer"
        className="inline-flex transition-transform active:scale-95"
      >
        {content}
      </a>
    );
  }

  return content;
}
