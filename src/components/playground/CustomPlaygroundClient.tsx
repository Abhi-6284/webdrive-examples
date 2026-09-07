"use client";

import React, { useState, useRef, useEffect } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Square,
  RotateCcw,
  Sliders,
  Eye,
  Code2,
  Sparkles,
  Check,
  Copy,
  Layers,
  Palette,
  Search,
  TrendingUp,
  Rocket,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

type Framework = "nextjs" | "react" | "vue" | "vanilla";
type TargetScope = "flow" | "search" | "metric" | "action";
type Position = "bottom" | "top" | "left" | "right";
type Alignment = "center" | "start" | "end";

interface TourCustomOptions {
  animate: boolean;
  showProgress: boolean;
  allowClose: boolean;
  closeOnEscape: boolean;
  overlayColor: string;
  overlayOpacity: number;
  stagePadding: number;
  stageRadius: number;
  position: Position;
  align: Alignment;
  nextButtonText: string;
  previousButtonText: string;
  doneButtonText: string;
  targetScope: TargetScope;
}

const DEFAULT_OPTIONS: TourCustomOptions = {
  animate: true,
  showProgress: true,
  allowClose: true,
  closeOnEscape: true,
  overlayColor: "#0f172a",
  overlayOpacity: 0.65,
  stagePadding: 8,
  stageRadius: 10,
  position: "bottom",
  align: "center",
  nextButtonText: "Next →",
  previousButtonText: "← Back",
  doneButtonText: "Finish 🎉",
  targetScope: "flow",
};

const COLOR_PRESETS = [
  { label: "Slate", value: "#0f172a" },
  { label: "Midnight", value: "#020617" },
  { label: "Indigo", value: "#1e1b4b" },
  { label: "Emerald", value: "#064e3b" },
  { label: "Ruby", value: "#450a0a" },
  { label: "Pure Black", value: "#000000" },
];

export function CustomPlaygroundClient() {
  const [options, setOptions] = useState<TourCustomOptions>(DEFAULT_OPTIONS);
  const [activeFramework, setActiveFramework] = useState<Framework>("nextjs");
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const tourInstanceRef = useRef<WebDrive | null>(null);

  // Clean up tour on unmount
  useEffect(() => {
    return () => {
      if (tourInstanceRef.current) {
        tourInstanceRef.current.destroy();
      }
    };
  }, []);

  const getSteps = () => {
    const allSteps = [
      {
        element: "#playground-target-search",
        title: "🔍 Omni-Search Bar",
        description: "Instant spotlight on input fields with responsive SVG cutout masking.",
        position: options.position,
        align: options.align,
      },
      {
        element: "#playground-target-metric",
        title: "📊 Analytics Card",
        description: "Spotlight cards with custom stage padding and smooth rounded corner radius.",
        position: options.position,
        align: options.align,
      },
      {
        element: "#playground-target-action",
        title: "🚀 Production Action CTA",
        description: "Guide users directly to your primary conversion or deployment buttons.",
        position: options.position,
        align: options.align,
      },
    ];

    switch (options.targetScope) {
      case "search":
        return [allSteps[0]];
      case "metric":
        return [allSteps[1]];
      case "action":
        return [allSteps[2]];
      case "flow":
      default:
        return allSteps;
    }
  };

  const runTour = () => {
    if (tourInstanceRef.current) {
      tourInstanceRef.current.destroy();
    }

    const steps = getSteps();

    const tour = new WebDrive({
      id: "live-custom-playground-tour",
      steps,
      animate: options.animate,
      showProgress: options.showProgress,
      overlay: true,
      overlayOpacity: options.overlayOpacity,
      overlayColor: options.overlayColor,
      stagePadding: options.stagePadding,
      stageRadius: options.stageRadius,
      allowClose: options.allowClose,
      closeOnEscape: options.closeOnEscape,
      nextButtonText: options.nextButtonText,
      previousButtonText: options.previousButtonText,
      doneButtonText: options.doneButtonText,
      onStart: () => setIsActive(true),
      onClose: () => setIsActive(false),
      onComplete: () => setIsActive(false),
      onDestroy: () => setIsActive(false),
    });

    tourInstanceRef.current = tour;
    tour.start();
  };

  const stopTour = () => {
    if (tourInstanceRef.current) {
      tourInstanceRef.current.destroy();
      setIsActive(false);
    }
  };

  const resetDefaults = () => {
    if (tourInstanceRef.current) {
      tourInstanceRef.current.destroy();
      setIsActive(false);
    }
    setOptions(DEFAULT_OPTIONS);
  };

  // Generate dynamic code snippets based on user options
  const generateCode = (): string => {
    const stepsJson = JSON.stringify(getSteps(), null, 6)
      .replace(/"element":/g, "element:")
      .replace(/"title":/g, "title:")
      .replace(/"description":/g, "description:")
      .replace(/"position":/g, "position:")
      .replace(/"align":/g, "align:");

    switch (activeFramework) {
      case "nextjs":
        return `"use client";

import { useEffect, useRef } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export function CustomProductTour() {
  const tourRef = useRef<WebDrive | null>(null);

  const startTour = () => {
    tourRef.current = new WebDrive({
      id: "my-custom-tour",
      animate: ${options.animate},
      showProgress: ${options.showProgress},
      allowClose: ${options.allowClose},
      closeOnEscape: ${options.closeOnEscape},
      overlayColor: "${options.overlayColor}",
      overlayOpacity: ${options.overlayOpacity},
      stagePadding: ${options.stagePadding},
      stageRadius: ${options.stageRadius},
      nextButtonText: "${options.nextButtonText}",
      previousButtonText: "${options.previousButtonText}",
      doneButtonText: "${options.doneButtonText}",
      steps: ${stepsJson},
    });

    tourRef.current.start();
  };

  return (
    <button
      onClick={startTour}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow"
    >
      Start Custom Tour
    </button>
  );
}`;

      case "react":
        return `import React, { useRef } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export function ReactTourDemo() {
  const tour = useRef(
    new WebDrive({
      id: "react-custom-tour",
      animate: ${options.animate},
      showProgress: ${options.showProgress},
      overlayColor: "${options.overlayColor}",
      overlayOpacity: ${options.overlayOpacity},
      stagePadding: ${options.stagePadding},
      stageRadius: ${options.stageRadius},
      nextButtonText: "${options.nextButtonText}",
      doneButtonText: "${options.doneButtonText}",
      steps: ${stepsJson},
    })
  );

  return (
    <button onClick={() => tour.current.start()}>
      Launch Tour
    </button>
  );
}`;

      case "vue":
        return `<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

let tour: WebDrive | null = null;

function launchTour() {
  tour = new WebDrive({
    id: "vue-custom-tour",
    animate: ${options.animate},
    showProgress: ${options.showProgress},
    overlayColor: "${options.overlayColor}",
    overlayOpacity: ${options.overlayOpacity},
    stagePadding: ${options.stagePadding},
    stageRadius: ${options.stageRadius},
    nextButtonText: "${options.nextButtonText}",
    doneButtonText: "${options.doneButtonText}",
    steps: ${stepsJson},
  });

  tour.start();
}

onUnmounted(() => {
  tour?.destroy();
});
<\/script>

<template>
  <button @click="launchTour" class="btn-primary">
    Launch Custom Tour
  </button>
</template>`;

      case "vanilla":
      default:
        return `<!-- Include WebDrive stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/webdrive/dist/style.css" />

<button id="start-tour-btn">Launch Tour</button>

<script type="module">
  import { WebDrive } from "https://unpkg.com/webdrive/dist/index.mjs";

  const tour = new WebDrive({
    id: "vanilla-custom-tour",
    animate: ${options.animate},
    showProgress: ${options.showProgress},
    overlayColor: "${options.overlayColor}",
    overlayOpacity: ${options.overlayOpacity},
    stagePadding: ${options.stagePadding},
    stageRadius: ${options.stageRadius},
    nextButtonText: "${options.nextButtonText}",
    doneButtonText: "${options.doneButtonText}",
    steps: ${stepsJson},
  });

  document.getElementById("start-tour-btn").addEventListener("click", () => {
    tour.start();
  });
<\/script>`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Controls & Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Customizer Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border/80 bg-card/90 shadow-lg">
            <div className="border-b px-5 py-4 flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm tracking-tight text-foreground">
                  Tour Customizer Engine
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetDefaults}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
                title="Reset all settings to default"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </Button>
            </div>

            <CardContent className="p-5 space-y-5 text-xs">
              {/* Tour Scope Selector */}
              <div className="space-y-2">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  Target Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={options.targetScope === "flow" ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium justify-center"
                    onClick={() => setOptions({ ...options, targetScope: "flow" })}
                  >
                    3-Step Full Tour
                  </Button>
                  <Button
                    type="button"
                    variant={options.targetScope === "search" ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium justify-center"
                    onClick={() => setOptions({ ...options, targetScope: "search" })}
                  >
                    Spotlight: Search
                  </Button>
                  <Button
                    type="button"
                    variant={options.targetScope === "metric" ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium justify-center"
                    onClick={() => setOptions({ ...options, targetScope: "metric" })}
                  >
                    Spotlight: Metric
                  </Button>
                  <Button
                    type="button"
                    variant={options.targetScope === "action" ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs font-medium justify-center"
                    onClick={() => setOptions({ ...options, targetScope: "action" })}
                  >
                    Spotlight: Action
                  </Button>
                </div>
              </div>

              {/* Animation & Transitions */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <label className="font-semibold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    Motion Transitions
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {options.animate ? "Smooth Morphing" : "Instant Cut"}
                  </Badge>
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={options.animate ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => setOptions({ ...options, animate: true })}
                  >
                    Animated (Morphing)
                  </Button>
                  <Button
                    type="button"
                    variant={!options.animate ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => setOptions({ ...options, animate: false })}
                  >
                    Static (No Motion)
                  </Button>
                </div>
              </div>

              {/* Popover Preferred Placement */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <label className="font-semibold text-foreground">
                  Preferred Placement & Alignment
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["bottom", "top", "left", "right"] as Position[]).map((pos) => (
                    <Button
                      key={pos}
                      type="button"
                      variant={options.position === pos ? "default" : "outline"}
                      size="sm"
                      className="h-7 text-xs capitalize"
                      onClick={() => setOptions({ ...options, position: pos })}
                    >
                      {pos}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {(["start", "center", "end"] as Alignment[]).map((alg) => (
                    <Button
                      key={alg}
                      type="button"
                      variant={options.align === alg ? "default" : "outline"}
                      size="sm"
                      className="h-7 text-xs capitalize"
                      onClick={() => setOptions({ ...options, align: alg })}
                    >
                      Align {alg}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Overlay Color & Opacity */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-foreground flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-primary" />
                    Backdrop Overlay Color
                  </label>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {options.overlayColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setOptions({ ...options, overlayColor: preset.value })}
                      className={`h-6 px-2.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 border ${
                        options.overlayColor === preset.value
                          ? "border-primary ring-2 ring-primary/30 text-foreground"
                          : "border-border/80 text-muted-foreground hover:text-foreground"
                      }`}
                      style={{ backgroundColor: preset.value === "#000000" ? "#18181b" : preset.value }}
                    >
                      <span
                        className="h-2 w-2 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.value }}
                      />
                      <span className="text-white text-[10px]">{preset.label}</span>
                    </button>
                  ))}
                </div>

                {/* Opacity Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Overlay Opacity</span>
                    <span className="font-mono font-semibold text-foreground">
                      {Math.round(options.overlayOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={options.overlayOpacity}
                    onChange={(e) =>
                      setOptions({ ...options, overlayOpacity: parseFloat(e.target.value) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Stage Cutout Padding & Radius */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Cutout Stage Padding</span>
                    <span className="font-mono font-semibold text-foreground">
                      {options.stagePadding}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="2"
                    value={options.stagePadding}
                    onChange={(e) =>
                      setOptions({ ...options, stagePadding: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Cutout Stage Radius</span>
                    <span className="font-mono font-semibold text-foreground">
                      {options.stageRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={options.stageRadius}
                    onChange={(e) =>
                      setOptions({ ...options, stageRadius: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Toggles & Custom Button Labels */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Step Progress Counter</span>
                  <input
                    type="checkbox"
                    checked={options.showProgress}
                    onChange={(e) => setOptions({ ...options, showProgress: e.target.checked })}
                    className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Backdrop Click to Close</span>
                  <input
                    type="checkbox"
                    checked={options.allowClose}
                    onChange={(e) => setOptions({ ...options, allowClose: e.target.checked })}
                    className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                  />
                </div>

                {/* Custom Button Labels */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">
                      Next Button Label
                    </label>
                    <input
                      type="text"
                      value={options.nextButtonText}
                      onChange={(e) => setOptions({ ...options, nextButtonText: e.target.value })}
                      className="w-full rounded border border-border bg-background px-2.5 py-1 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">
                      Done Button Label
                    </label>
                    <input
                      type="text"
                      value={options.doneButtonText}
                      onChange={(e) => setOptions({ ...options, doneButtonText: e.target.value })}
                      className="w-full rounded border border-border bg-background px-2.5 py-1 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Target Sandbox & Runner (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Action Header Card */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="font-bold text-sm text-foreground">Interactive Target Sandbox</h4>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click run to test your customized WebDrive options directly against these live UI targets!
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isActive ? (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={stopTour}
                  className="h-9 px-4 gap-1.5 text-xs font-semibold shadow-sm w-full sm:w-auto"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                  <span>Stop Tour</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={runTour}
                  className="h-9 px-5 gap-2 text-xs font-bold shadow-md shadow-primary/20 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Custom Tour</span>
                </Button>
              )}
            </div>
          </div>

          {/* Interactive Mock SaaS Sandbox Container */}
          <div className="rounded-xl border border-border bg-card shadow-md p-6 relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-muted-foreground ml-2">
                  Sandbox Target Workspace
                </span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                webdrive-sandbox-v1
              </Badge>
            </div>

            {/* Target 1: Omni-Search Bar */}
            <div
              id="playground-target-search"
              className="rounded-lg border border-border bg-background/80 p-3 flex items-center justify-between gap-3 shadow-xs transition-colors hover:border-primary/40 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-muted-foreground flex-1">
                <Search className="h-4 w-4 text-primary" />
                <span className="text-xs text-foreground font-medium">Quick search projects, teams, metrics...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            {/* Target 2 & 3: Metric Card and Action Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Target 2: KPI Metric Card */}
              <div
                id="playground-target-metric"
                className="rounded-lg border border-border bg-background/90 p-4 shadow-xs hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Active Monthly ARR</span>
                  <div className="rounded-md bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight text-foreground">$48,290</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+18.4%</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Updated 2 mins ago via Stripe Sync</p>
              </div>

              {/* Target 3: Action Button Box */}
              <div
                id="playground-target-action"
                className="rounded-lg border border-border bg-background/90 p-4 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Rocket className="h-3.5 w-3.5 text-primary" />
                    Production Deployment
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Triggers instant blue/green release to all edge regions.
                  </p>
                </div>
                <Button size="sm" className="mt-3 w-full h-8 text-xs gap-1.5 font-semibold">
                  <span>Deploy Release</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Sandbox Bottom Bar */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span>Sandbox Elements Ready</span>
              </span>
              <span className="text-[11px] font-mono">
                {options.targetScope === "flow" ? "3 Step Sequence" : "1 Spotlight Target"}
              </span>
            </div>
          </div>

          {/* Dynamic Code Generator Card */}
          <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            {/* Framework Switcher Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b px-4 py-3 bg-muted/40 gap-2">
              <div className="flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="font-bold text-xs text-foreground">Generated Code</span>
                <Badge variant="outline" className="text-[10px] ml-1 bg-background">
                  Auto-Synchronized
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-md border border-border bg-background p-0.5">
                  {(
                    [
                      { id: "nextjs", label: "Next.js" },
                      { id: "react", label: "React" },
                      { id: "vue", label: "Vue 3" },
                      { id: "vanilla", label: "Vanilla JS" },
                    ] as { id: Framework; label: string }[]
                  ).map((fw) => (
                    <button
                      key={fw.id}
                      type="button"
                      onClick={() => setActiveFramework(fw.id)}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                        activeFramework === fw.id
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {fw.label}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="h-7 px-2.5 text-xs gap-1.5 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Syntax Code View */}
            <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-foreground bg-card max-h-96">
              <code>{generateCode()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
