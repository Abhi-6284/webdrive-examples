"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWebDrive } from "@/hooks/useWebDrive";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WebDriveVersionBadge } from "@/components/common/WebDriveVersionBadge";
import { Play, Copy, Check, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const { start, isActive } = useWebDrive({
    id: "landing-page-hero-tour",
    remember: false,
    showProgress: true,
    animate: true,
    steps: [
      {
        element: "#npm-install-command-box",
        title: "📦 Zero-Friction Installation",
        description: "Zero dependencies (< 10kB). Installs into any framework with npm, pnpm, yarn, or bun.",
        position: "bottom",
      },
      {
        element: "#framework-badges-list",
        title: "⚡ 100% Framework Agnostic",
        description: "Direct native DOM APIs ensure compatibility with Next.js, React, Vue, Nuxt, Svelte, and Vanilla JS.",
        position: "bottom",
      },
      {
        element: "#theme-customizer-box",
        title: "🎨 Real-Time CSS Theming",
        description: "Inherits shadcn/ui and Tailwind CSS variables automatically without CSS overrides.",
        position: "top",
      },
      {
        element: "#live-app-demo-cta",
        title: "🚀 Production Dashboard Demo",
        description: "Ready to see it inside a full Next.js App Router dashboard? Click here anytime!",
        position: "left",
      },
    ],
  });

  const copyCommand = () => {
    navigator.clipboard.writeText("npm install webdrive");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
        {/* Version Badge */}
        <Badge
          variant="outline"
          className="mb-6 px-3.5 py-1 text-xs font-medium gap-1.5 border-primary/30 bg-primary/5 backdrop-blur shadow-sm inline-flex items-center"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <WebDriveVersionBadge variant="pill" />
          <span className="text-muted-foreground">•</span>
          <span className="text-primary font-semibold">AI Agent Skill Included</span>
        </Badge>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
          The Framework-Agnostic UI Tour Engine for Modern Web Apps
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Build fluid, guided product walkthroughs and feature spotlights in Next.js, React, Vue, or Vanilla JS. Zero runtime dependencies. 100% SSR-safe.
        </p>

        {/* Primary Action Buttons */}
        <div id="hero-cta-buttons" className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            size="lg"
            onClick={() => start(0)}
            disabled={isActive}
            className="h-12 px-6 gap-2 text-base shadow-xl shadow-primary/25 font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{isActive ? "Tour is Running..." : "Take the 10-Second Tour"}</span>
          </Button>

          <Link href="/dashboard">
            <Button
              id="live-app-demo-cta"
              size="lg"
              variant="outline"
              className="h-12 px-6 gap-2 text-base hover:bg-accent"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Copyable NPM Terminal Command Box */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div
            id="npm-install-command-box"
            onClick={copyCommand}
            className="inline-flex items-center gap-3 rounded-xl border border-border bg-card/90 px-5 py-3 font-mono text-sm shadow-sm backdrop-blur transition-all hover:border-primary/50 cursor-pointer group"
          >
            <span className="text-primary font-bold select-none">$</span>
            <span className="text-foreground">npm install webdrive</span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-500 font-sans text-xs">
                  <Check className="h-4 w-4" /> Copied!
                </span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </div>

          {/* Theme customizer widget */}
          <div className="mt-2">
            <ThemeCustomizer />
          </div>
        </div>

        {/* Framework badges */}
        <div
          id="framework-badges-list"
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <span className="font-semibold text-foreground mr-1">Works seamlessly with:</span>
          {["Next.js App Router", "React 18+", "Vue 3", "Nuxt", "Svelte", "Angular", "Vanilla JS"].map(
            (fw) => (
              <span
                key={fw}
                className="rounded-md border border-border/70 bg-card/60 px-2.5 py-1 text-foreground font-medium shadow-xs"
              >
                {fw}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
