"use client";

import React, { useState } from "react";
import { ExampleItem } from "@/lib/examples-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EventConsole, LogEntry } from "./EventConsole";
import {
  Play,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Bell,
  Activity,
  Layers,
  StopCircle,
} from "lucide-react";

interface ExampleSectionProps {
  index: number;
  example: ExampleItem;
  onRun: (example: ExampleItem) => void;
  onStop: () => void;
  isRunning: boolean;
  eventLogs?: LogEntry[];
  onClearLogs?: () => void;
}

export function ExampleSection({
  index,
  example,
  onRun,
  onStop,
  isRunning,
  eventLogs = [],
  onClearLogs = () => {},
}: ExampleSectionProps) {
  const [tab, setTab] = useState<"ts" | "js">("ts");
  const [copied, setCopied] = useState(false);

  // States for interactive sandbox previews
  const [asyncElementMounted, setAsyncElementMounted] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [interactiveVal, setInteractiveVal] = useState("");

  const code = tab === "ts" ? example.codeTs : example.codeJs;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerAsyncLoad = () => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncElementMounted(true);
      setAsyncLoading(false);
    }, 800);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "core":
        return "Core Walkthrough";
      case "positioning":
        return "Popover Positioning";
      case "flow":
        return "Behavior & Flow";
      case "lifecycle":
        return "Lifecycle & Storage";
      default:
        return cat;
    }
  };

  const renderSandboxPreview = () => {
    switch (example.id) {
      case "animated-tour":
        return (
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <Button
                id="animated-step-1"
                size="sm"
                className="gap-1.5 text-xs shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Action Button</span>
              </Button>
              <Badge variant="outline" className="text-[11px] font-mono">
                Step 1 Target
              </Badge>
            </div>

            <div
              id="animated-step-2"
              className="rounded-lg border border-border bg-card p-3 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-foreground">
                  Analytics Widget
                </span>
                <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" /> +28.4%
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Cutout smoothly expands and transitions here.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                id="animated-step-3"
                type="text"
                readOnly
                placeholder="Search resources (Step 3 Target)..."
                className="h-8 w-full rounded-md border border-input bg-card pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        );

      case "static-tour":
        return (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              id="static-step-1"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs"
            >
              <span>Instant Snap Button</span>
            </Button>
            <div
              id="static-step-2"
              className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
            >
              Reduced Motion Step
            </div>
          </div>
        );

      case "simple-highlight":
        return (
          <div
            id="simple-highlight-target"
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Bell className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                Spotlight Target Card
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When clicked, the SVG cutout darkens everything else, focusing
              purely on this card with no popover dialog. Click anywhere to
              exit.
            </p>
          </div>
        );

      case "highlight-with-popover":
        return (
          <div
            id="highlight-popover-target"
            className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs font-bold text-foreground block">
                Feature Export Hub
              </span>
              <span className="text-[11px] text-muted-foreground">
                Highlights with customized popover and action button.
              </span>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs shrink-0">
              Export CSV
            </Button>
          </div>
        );

      case "popover-positioning":
        return (
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex justify-center">
              <Button
                id="pos-target-top"
                variant="outline"
                size="sm"
                className="text-xs w-full"
              >
                Top Anchor
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                id="pos-target-right"
                variant="outline"
                size="sm"
                className="text-xs w-full"
              >
                Right Anchor
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                id="pos-target-bottom"
                variant="outline"
                size="sm"
                className="text-xs w-full"
              >
                Bottom Anchor
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                id="pos-target-left"
                variant="outline"
                size="sm"
                className="text-xs w-full"
              >
                Left Anchor
              </Button>
            </div>
          </div>
        );

      case "customizing-popover":
        return (
          <div
            id="custom-popover-target"
            className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center"
          >
            <span className="text-xs font-bold text-primary block mb-1">
              ✨ Custom Styled Target
            </span>
            <p className="text-[11px] text-muted-foreground">
              Renders with custom button labels ("Continue →", "Complete Setup 🚀")
              and embedded HTML formatting tags.
            </p>
          </div>
        );

      case "styling-overlay":
        return (
          <div
            id="styling-overlay-target"
            className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-bold text-indigo-400">
                Custom Backdrop Overlay Target
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Runs with a deep indigo tinted overlay (rgba(30, 27, 75, 0.85))
              instead of standard dark grey.
            </p>
          </div>
        );

      case "feature-hints":
        return (
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <span className="text-xs font-semibold text-foreground">
              Contextual Discovery
            </span>
            <div className="relative inline-flex">
              <Button
                id="feature-hint-target"
                size="sm"
                variant="outline"
                className="h-8 gap-2 text-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span>Feature Beacon</span>
              </Button>
            </div>
          </div>
        );

      case "async-tour":
        return (
          <div
            id="async-tour-container"
            className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">
                Dynamic Async Container
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={triggerAsyncLoad}
                disabled={asyncLoading || asyncElementMounted}
                className="h-7 text-xs"
              >
                {asyncLoading
                  ? "Loading..."
                  : asyncElementMounted
                  ? "Mounted"
                  : "Simulate Fetch"}
              </Button>
            </div>
            {asyncElementMounted && (
              <div
                id="async-tour-dynamic-element"
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Async Widget Ready (Step 2 Target)</span>
              </div>
            )}
          </div>
        );

      case "no-element":
        return (
          <div className="relative h-28 rounded-xl border border-border bg-muted/30 flex items-center justify-center">
            {/* Invisible anchor precisely in the center */}
            <div
              id="centered-modal-anchor"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none"
            />
            <div className="text-center px-4">
              <span className="text-xs font-bold text-foreground block">
                Viewport Centered Modal
              </span>
              <span className="text-[11px] text-muted-foreground">
                Dialog appears centered on the screen without highlighting a specific button.
              </span>
            </div>
          </div>
        );

      case "prevent-closing":
        return (
          <div
            id="prevent-closing-target"
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="outline" className="text-[10px] text-destructive border-destructive/30">
                Strict Flow
              </Badge>
              <span className="text-xs font-bold text-foreground">
                Mandatory Workflow Step
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Clicking the backdrop or pressing the Escape key will not close
              the tour. You must click the tour action button to complete.
            </p>
          </div>
        );

      case "confirm-on-exit":
        return (
          <div
            id="confirm-exit-target"
            className="rounded-xl border border-border bg-card p-4"
          >
            <span className="text-xs font-bold text-foreground block mb-1">
              Guarded Exit Target
            </span>
            <p className="text-xs text-muted-foreground">
              Try closing the tour via the 'X' button or backdrop click. A
              browser confirmation prompt will intercept and ask to confirm.
            </p>
          </div>
        );

      case "interactive-tour":
        return (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="interactive-tour-input"
              className="text-xs font-semibold text-foreground"
            >
              Interactive Action Requirement
            </label>
            <input
              id="interactive-tour-input"
              type="text"
              value={interactiveVal}
              onChange={(e) => setInteractiveVal(e.target.value)}
              placeholder="Type anything here to advance the tour..."
              className="h-9 w-full rounded-md border border-input bg-card px-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
            />
            <span className="text-[11px] text-muted-foreground">
              Listening for DOM <code className="font-mono">input</code> events to unlock Step 2.
            </span>
          </div>
        );

      case "tour-progress":
        return (
          <div className="flex items-center gap-2">
            <div
              id="progress-step-1"
              className="flex-1 rounded-lg border border-border bg-card p-2.5 text-center text-xs font-semibold"
            >
              Step 1 of 3
            </div>
            <div
              id="progress-step-2"
              className="flex-1 rounded-lg border border-border bg-card p-2.5 text-center text-xs font-semibold"
            >
              Step 2 of 3
            </div>
            <div
              id="progress-step-3"
              className="flex-1 rounded-lg border border-border bg-card p-2.5 text-center text-xs font-semibold"
            >
              Step 3 of 3
            </div>
          </div>
        );

      case "hooks-for-everything":
        return (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Button
                id="hooks-step-1"
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
              >
                Hooks Target 1
              </Button>
              <Button
                id="hooks-step-2"
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
              >
                Hooks Target 2
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Lifecycle events stream live to the terminal console below in real time.
            </p>
          </div>
        );

      case "multi-page-tour":
        return (
          <div
            id="multipage-step-1"
            className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">
                Page 1: Multi-Page Source Target
              </span>
              <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                Route: /examples
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click <strong>&quot;Run Live Demo&quot;</strong> above. WebDrive will spotlight this card, then transition you automatically to <code>/dashboard</code> to resume Step 2!
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="/dashboard">
                <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                  <span>Visit Dashboard Directly</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-xs text-muted-foreground">
            Target selector: <code>{example.targetSelector}</code>
          </div>
        );
    }
  };

  return (
    <section
      id={example.id}
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all hover:border-primary/40 space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <Badge
              variant="outline"
              className="text-xs font-semibold border-primary/30 bg-primary/5 text-primary"
            >
              {example.badge}
            </Badge>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              {getCategoryLabel(example.category)}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {example.title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground max-w-3xl leading-relaxed">
            {example.description}
          </p>
        </div>

        {/* Action Button: Run Demo / Stop */}
        <div className="flex items-center gap-2 shrink-0">
          {isRunning ? (
            <Button
              onClick={onStop}
              variant="destructive"
              size="sm"
              className="gap-1.5 h-10 px-5 text-xs font-semibold shadow-sm"
            >
              <StopCircle className="h-4 w-4" />
              <span>Stop Tour</span>
            </Button>
          ) : (
            <Button
              onClick={() => onRun(example)}
              size="sm"
              className="gap-2 h-10 px-6 text-xs font-semibold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run Live Demo</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Section Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (5 cols): Interactive Target Sandbox */}
        <div className="lg:col-span-5 rounded-xl border border-border/80 bg-muted/20 p-5 flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 pb-2 border-b border-border/40">
              <span>Interactive Target Sandbox</span>
              <span className="text-[11px] font-normal lowercase text-muted-foreground">
                {isRunning ? "Running..." : "Ready to highlight"}
              </span>
            </div>

            <div className="py-2">{renderSandboxPreview()}</div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span>Selector: <span className="text-primary font-semibold">{example.targetSelector.split(",")[0]}</span></span>
            <span className="flex items-center gap-1 font-sans">
              <span className={`h-2 w-2 rounded-full ${isRunning ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"}`} />
              <span>{isRunning ? "Active" : "Idle"}</span>
            </span>
          </div>
        </div>

        {/* Right Column (7 cols): Tabbed Code Viewer */}
        <div className="lg:col-span-7 rounded-xl border border-border/80 bg-muted/40 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-2 bg-muted/60">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTab("ts")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  tab === "ts"
                    ? "bg-background text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                TypeScript
              </button>
              <button
                type="button"
                onClick={() => setTab("js")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  tab === "js"
                    ? "bg-background text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                JavaScript
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-7 px-2.5 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>

          <div className="p-4 max-h-[340px] overflow-y-auto bg-card/70 font-mono text-xs leading-relaxed text-foreground">
            <pre className="whitespace-pre overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Inline Event Console for Hooks example */}
      {example.id === "hooks-for-everything" && (
        <div className="pt-2">
          <EventConsole logs={eventLogs} onClear={onClearLogs} />
        </div>
      )}
    </section>
  );
}
