"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Square,
  RotateCcw,
  Sliders,
  Code2,
  Sparkles,
  Check,
  Copy,
  Palette,
  Zap,
  Share2,
  Keyboard,
  Undo2,
  Redo2,
  X,
  Clock,
  Radio,
  RadioTower,
} from "lucide-react";
import { SandboxApp } from "./SandboxApp";
import { TemplateGallery } from "./TemplateGallery";
import { StepBuilder } from "./StepBuilder";
import {
  DEFAULT_CONFIG,
  type PlaygroundConfig,
  type Framework,
} from "./types";
import { usePlaygroundHistory } from "@/hooks/usePlaygroundHistory";
import { usePlaygroundShare } from "@/hooks/usePlaygroundShare";

// ─── Extended color palette ──────────────────────────────────────────────────
const COLOR_PRESETS = [
  { label: "Slate", value: "#0f172a" },
  { label: "Midnight", value: "#020617" },
  { label: "Indigo", value: "#1e1b4b" },
  { label: "Emerald", value: "#064e3b" },
  { label: "Ruby", value: "#450a0a" },
  { label: "Pure Black", value: "#000000" },
  { label: "Ocean", value: "#0c4a6e" },
  { label: "Violet", value: "#2e1065" },
  { label: "Forest", value: "#14532d" },
  { label: "Maroon", value: "#4c0519" },
  { label: "Warm Gray", value: "#1c1917" },
  { label: "Navy", value: "#0f1b35" },
];

// ─── Code generator ──────────────────────────────────────────────────────────
function generateCode(config: PlaygroundConfig, framework: Framework): string {
  const stepsJson = JSON.stringify(
    config.steps.map(({ element, title, description, position, align }) => ({
      element,
      title,
      description,
      position,
      align,
    })),
    null,
    6
  )
    .replace(/"element":/g, "element:")
    .replace(/"title":/g, "title:")
    .replace(/"description":/g, "description:")
    .replace(/"position":/g, "position:")
    .replace(/"align":/g, "align:");

  const opts = `      animate: ${config.animate},
      showProgress: ${config.showProgress},
      allowClose: ${config.allowClose},
      closeOnEscape: ${config.closeOnEscape},
      overlayColor: "${config.overlayColor}",
      overlayOpacity: ${config.overlayOpacity},
      stagePadding: ${config.stagePadding},
      stageRadius: ${config.stageRadius},
      nextButtonText: "${config.nextButtonText}",
      previousButtonText: "${config.previousButtonText}",
      doneButtonText: "${config.doneButtonText}",`;

  switch (framework) {
    case "nextjs":
      return `"use client";

import { useRef } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export function ProductTour() {
  const tourRef = useRef<WebDrive | null>(null);

  const startTour = () => {
    tourRef.current = new WebDrive({
      id: "my-tour",
${opts}
      steps: ${stepsJson},
    });
    tourRef.current.start();
  };

  return (
    <button onClick={startTour} className="px-4 py-2 bg-primary text-white rounded-lg">
      Start Tour
    </button>
  );
}`;

    case "react":
      return `import { useRef } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export function ProductTour() {
  const tourRef = useRef<WebDrive | null>(null);

  return (
    <button
      onClick={() => {
        tourRef.current = new WebDrive({
          id: "my-tour",
${opts}
          steps: ${stepsJson},
        });
        tourRef.current.start();
      }}
    >
      Start Tour
    </button>
  );
}`;

    case "vue":
      return `<script setup lang="ts">
import { onUnmounted } from "vue";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

let tour: WebDrive | null = null;

function launchTour() {
  tour = new WebDrive({
    id: "my-tour",
${opts}
    steps: ${stepsJson},
  });
  tour.start();
}

onUnmounted(() => { tour?.destroy(); });
</script>

<template>
  <button @click="launchTour" class="btn-primary">
    Launch Tour
  </button>
</template>`;

    case "vanilla":
    default:
      return `<!-- Include WebDrive stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/webdrive/dist/style.css" />

<button id="start-tour">Launch Tour</button>

<script type="module">
  import { WebDrive } from "https://unpkg.com/webdrive/dist/index.mjs";

  const tour = new WebDrive({
    id: "my-tour",
${opts}
    steps: ${stepsJson},
  });

  document.getElementById("start-tour")
    .addEventListener("click", () => tour.start());
</script>`;
  }
}

// ─── Non-default diff badges ─────────────────────────────────────────────────
function ConfigDiffBadges({ config }: { config: PlaygroundConfig }) {
  const diffs: string[] = [];
  if (!config.animate) diffs.push("animate: OFF");
  if (!config.showProgress) diffs.push("progress: OFF");
  if (!config.allowClose) diffs.push("close: locked");
  if (config.overlayOpacity !== 0.65)
    diffs.push(`opacity: ${Math.round(config.overlayOpacity * 100)}%`);
  if (config.stagePadding !== 8) diffs.push(`padding: ${config.stagePadding}px`);
  if (config.stageRadius !== 10) diffs.push(`radius: ${config.stageRadius}px`);
  diffs.push(`${config.steps.length} step${config.steps.length !== 1 ? "s" : ""}`);

  return (
    <div className="flex flex-wrap gap-1.5 pt-2">
      {diffs.map((d) => (
        <span
          key={d}
          className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
        >
          {d}
        </span>
      ))}
    </div>
  );
}

// ─── Keyboard shortcuts modal ────────────────────────────────────────────────
function KeyboardShortcutsModal({ onClose }: { onClose: () => void }) {
  const shortcuts = [
    { key: "R", action: "Run tour" },
    { key: "S", action: "Stop tour" },
    { key: "L", action: "Toggle live preview" },
    { key: "T", action: "Toggle template gallery" },
    { key: "⌘Z / Ctrl+Z", action: "Undo config change" },
    { key: "⌘⇧Z / Ctrl+⇧Z", action: "Redo config change" },
    { key: "Esc", action: "Close this panel" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">Keyboard Shortcuts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">{action}</span>
              <kbd className="inline-flex items-center rounded border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-foreground font-semibold whitespace-nowrap shrink-0">
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Run history item ────────────────────────────────────────────────────────
interface RunRecord {
  timestamp: string;
  steps: number;
  completed: boolean;
}

// ─── Main playground ─────────────────────────────────────────────────────────
export function CustomPlaygroundClient() {
  const { config, push, undo, redo, canUndo, canRedo } =
    usePlaygroundHistory<PlaygroundConfig>(DEFAULT_CONFIG);

  const [activeFramework, setActiveFramework] = useState<Framework>("nextjs");
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [livePreview, setLivePreview] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [runHistory, setRunHistory] = useState<RunRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showConfettiToast, setShowConfettiToast] = useState(false);

  const tourInstanceRef = useRef<WebDrive | null>(null);
  const liveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { getShareUrl, loadFromHash } = usePlaygroundShare();

  // Load config from URL hash on mount
  useEffect(() => {
    const loaded = loadFromHash();
    if (loaded) {
      push(loaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tourInstanceRef.current) tourInstanceRef.current.destroy();
      if (liveDebounceRef.current) clearTimeout(liveDebounceRef.current);
    };
  }, []);

  // Live preview debounce
  useEffect(() => {
    if (!livePreview) return;
    if (liveDebounceRef.current) clearTimeout(liveDebounceRef.current);
    liveDebounceRef.current = setTimeout(() => {
      launchTour(false);
    }, 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, livePreview]);

  const launchTour = useCallback(
    (isManual = true) => {
      if (tourInstanceRef.current) {
        tourInstanceRef.current.destroy();
      }

      const tour = new WebDrive({
        id: "playground-v2-tour",
        steps: config.steps.map(({ element, title, description, position, align }) => ({
          element,
          title,
          description,
          position,
          align,
        })),
        animate: config.animate,
        showProgress: config.showProgress,
        overlay: true,
        overlayOpacity: config.overlayOpacity,
        overlayColor: config.overlayColor,
        stagePadding: config.stagePadding,
        stageRadius: config.stageRadius,
        allowClose: config.allowClose,
        closeOnEscape: config.closeOnEscape,
        nextButtonText: config.nextButtonText,
        previousButtonText: config.previousButtonText,
        doneButtonText: config.doneButtonText,
        onStart: () => setIsActive(true),
        onClose: () => {
          setIsActive(false);
          if (isManual) {
            const record: RunRecord = {
              timestamp: new Date().toLocaleTimeString(),
              steps: config.steps.length,
              completed: false,
            };
            setRunHistory((h) => [record, ...h].slice(0, 5));
          }
        },
        onComplete: () => {
          setIsActive(false);
          // Confetti!
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.55 },
            colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
          });
          setShowConfettiToast(true);
          setTimeout(() => setShowConfettiToast(false), 3500);
          if (isManual) {
            const record: RunRecord = {
              timestamp: new Date().toLocaleTimeString(),
              steps: config.steps.length,
              completed: true,
            };
            setRunHistory((h) => [record, ...h].slice(0, 5));
          }
        },
        onDestroy: () => setIsActive(false),
      });

      tourInstanceRef.current = tour;
      tour.start();
    },
    [config]
  );

  const stopTour = useCallback(() => {
    if (tourInstanceRef.current) {
      tourInstanceRef.current.destroy();
      setIsActive(false);
    }
  }, []);

  const resetDefaults = useCallback(() => {
    stopTour();
    push(DEFAULT_CONFIG);
  }, [push, stopTour]);

  const updateConfig = useCallback(
    (patch: Partial<PlaygroundConfig>) => {
      push({ ...config, ...patch });
    },
    [config, push]
  );

  const shareConfig = useCallback(async () => {
    const url = getShareUrl(config);
    await navigator.clipboard.writeText(url);
    window.history.replaceState(null, "", `/playground#share=${btoa(encodeURIComponent(JSON.stringify(config)))}`);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2500);
  }, [config, getShareUrl]);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(generateCode(config, activeFramework));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config, activeFramework]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "?" || e.key === "/") {
        setShowKeyboard((v) => !v);
        return;
      }
      if (showKeyboard && e.key === "Escape") {
        setShowKeyboard(false);
        return;
      }
      if (e.key === "r" || e.key === "R") {
        launchTour(true);
        return;
      }
      if (e.key === "s" || e.key === "S") {
        stopTour();
        return;
      }
      if (e.key === "l" || e.key === "L") {
        setLivePreview((v) => !v);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redo();
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [launchTour, stopTour, undo, redo, showKeyboard]);

  const generatedCode = useMemo(
    () => generateCode(config, activeFramework),
    [config, activeFramework]
  );

  return (
    <div className="space-y-6 relative">
      {/* Confetti Toast */}
      {showConfettiToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl border border-primary/30 bg-card/95 shadow-2xl shadow-primary/10 backdrop-blur-sm px-5 py-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-xl">🎉</span>
          <div>
            <div className="text-sm font-bold text-foreground">Tour Complete!</div>
            <div className="text-xs text-muted-foreground">
              {config.steps.length} steps finished
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts modal */}
      {showKeyboard && (
        <KeyboardShortcutsModal onClose={() => setShowKeyboard(false)} />
      )}

      {/* Top header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {livePreview && (
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                LIVE
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live toggle */}
          <Button
            type="button"
            variant={livePreview ? "default" : "outline"}
            size="sm"
            onClick={() => setLivePreview((v) => !v)}
            className="h-8 px-3 text-xs gap-1.5"
            title="Toggle live preview (L)"
          >
            {livePreview ? (
              <Radio className="h-3.5 w-3.5" />
            ) : (
              <RadioTower className="h-3.5 w-3.5" />
            )}
            {livePreview ? "Live ON" : "Live OFF"}
          </Button>

          {/* Undo / Redo */}
          <div className="flex items-center rounded-md border border-border overflow-hidden">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 transition-colors border-r border-border"
              title="Undo (⌘Z)"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 transition-colors"
              title="Redo (⌘⇧Z)"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Share */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={shareConfig}
            className="h-8 px-3 text-xs gap-1.5"
            title="Share config URL"
          >
            {urlCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">URL Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                Share
              </>
            )}
          </Button>

          {/* Run history */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowHistory((v) => !v)}
            className="h-8 px-2.5 text-xs gap-1.5"
            title="Run history"
          >
            <Clock className="h-3.5 w-3.5" />
            {runHistory.length > 0 && (
              <span className="text-[10px] font-mono">{runHistory.length}</span>
            )}
          </Button>

          {/* Reset */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetDefaults}
            className="h-8 px-2.5 text-xs gap-1.5 text-muted-foreground"
            title="Reset all settings"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {/* Keyboard help */}
          <button
            type="button"
            onClick={() => setShowKeyboard(true)}
            className="flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-xs font-bold"
            title="Keyboard shortcuts (?)"
          >
            ?
          </button>
        </div>
      </div>

      {/* Run History Panel */}
      {showHistory && runHistory.length > 0 && (
        <div className="rounded-xl border border-border bg-card/90 shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-bold text-sm text-foreground">Run History</span>
              <Badge variant="outline" className="text-[10px]">
                Last {runHistory.length} runs
              </Badge>
            </div>
          </div>
          <div className="space-y-1.5">
            {runHistory.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-xs"
              >
                <span className="font-mono text-muted-foreground">{r.timestamp}</span>
                <span className="text-foreground">{r.steps} steps</span>
                <span
                  className={`font-semibold ${r.completed ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
                >
                  {r.completed ? "✓ Completed" : "◼ Closed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Gallery */}
      <TemplateGallery
        currentConfig={config}
        onApply={(tConfig) => push(tConfig)}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Controls */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="border-border/80 bg-card/90 shadow-lg">
            <div className="border-b px-5 py-4 flex items-center gap-2 bg-muted/30">
              <Sliders className="h-4 w-4 text-primary" />
              <h3 className="font-bold text-sm tracking-tight text-foreground flex-1">
                Tour Customizer
              </h3>
            </div>

            <CardContent className="p-5 space-y-5 text-xs">
              {/* Step Builder */}
              <StepBuilder
                steps={config.steps}
                onChange={(steps) => updateConfig({ steps })}
              />

              {/* Motion */}
              <div className="space-y-2 pt-3 border-t border-border/60">
                <label className="font-semibold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    Motion Transitions
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {config.animate ? "Smooth Morphing" : "Instant Cut"}
                  </Badge>
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={config.animate ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => updateConfig({ animate: true })}
                  >
                    Animated
                  </Button>
                  <Button
                    type="button"
                    variant={!config.animate ? "default" : "outline"}
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={() => updateConfig({ animate: false })}
                  >
                    Static
                  </Button>
                </div>
              </div>

              {/* Overlay Color */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-foreground flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-primary" />
                    Overlay Color
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {config.overlayColor}
                    </span>
                    <input
                      type="color"
                      value={config.overlayColor}
                      onChange={(e) => updateConfig({ overlayColor: e.target.value })}
                      className="h-6 w-8 rounded border border-border bg-transparent cursor-pointer p-0.5"
                      title="Pick custom color"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => updateConfig({ overlayColor: preset.value })}
                      className={`h-6 px-2 rounded-full text-[10px] font-medium transition-all flex items-center gap-1.5 border ${
                        config.overlayColor === preset.value
                          ? "border-primary ring-2 ring-primary/30 text-foreground"
                          : "border-border/80 text-muted-foreground hover:text-foreground"
                      }`}
                      style={{
                        backgroundColor:
                          preset.value === "#000000" ? "#18181b" : preset.value,
                      }}
                      title={preset.label}
                    >
                      <span
                        className="h-2 w-2 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: preset.value }}
                      />
                      <span className="text-white">{preset.label}</span>
                    </button>
                  ))}
                </div>

                {/* Opacity slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Overlay Opacity</span>
                    <span className="font-mono font-semibold text-foreground">
                      {Math.round(config.overlayOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={config.overlayOpacity}
                    onChange={(e) =>
                      updateConfig({ overlayOpacity: parseFloat(e.target.value) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Stage Padding & Radius */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Cutout Padding</span>
                    <span className="font-mono font-semibold text-foreground">
                      {config.stagePadding}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={config.stagePadding}
                    onChange={(e) =>
                      updateConfig({ stagePadding: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Cutout Radius</span>
                    <span className="font-mono font-semibold text-foreground">
                      {config.stageRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    step="2"
                    value={config.stageRadius}
                    onChange={(e) =>
                      updateConfig({ stageRadius: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2.5 pt-3 border-t border-border/60">
                {[
                  { label: "Show Step Progress", key: "showProgress" as const },
                  { label: "Allow Backdrop Close", key: "allowClose" as const },
                  { label: "Close on Escape Key", key: "closeOnEscape" as const },
                ].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={config[key]}
                      onClick={() => updateConfig({ [key]: !config[key] })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        config[key] ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                          config[key] ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Button labels */}
              <div className="space-y-2 pt-3 border-t border-border/60">
                <label className="font-semibold text-foreground">Button Labels</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: "Next", key: "nextButtonText" as const },
                    { label: "Previous", key: "previousButtonText" as const },
                    { label: "Done", key: "doneButtonText" as const },
                  ].map(({ label, key }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-16 shrink-0">
                        {label}
                      </span>
                      <input
                        type="text"
                        value={config[key]}
                        onChange={(e) => updateConfig({ [key]: e.target.value })}
                        className="flex-1 rounded border border-border bg-background px-2.5 py-1 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sandbox + Runner */}
        <div className="lg:col-span-7 space-y-5">
          {/* Run / Stop header */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="font-bold text-sm text-foreground">
                  Interactive Sandbox
                </h4>
                {livePreview && (
                  <Badge className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                    Auto-Running
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {livePreview
                  ? "Tour re-runs automatically as you tweak settings"
                  : "Click Run to test your customized tour against live targets"}
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
                  Stop Tour
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => launchTour(true)}
                  className="h-9 px-5 gap-2 text-xs font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Run Tour (R)
                </Button>
              )}
            </div>
          </div>

          {/* Rich Sandbox App */}
          <SandboxApp />

          {/* Config diff badges */}
          <ConfigDiffBadges config={config} />
        </div>
      </div>

      {/* Code Generator */}
      <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
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
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
        <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-foreground bg-card max-h-96">
          <code>{generatedCode}</code>
        </pre>
      </div>

      {/* Keyboard hint */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <Keyboard className="h-3 w-3" />
        <span>
          Press{" "}
          <kbd className="mx-0.5 inline-flex items-center rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px]">
            ?
          </kbd>{" "}
          for keyboard shortcuts ·{" "}
          <kbd className="mx-0.5 inline-flex items-center rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px]">
            L
          </kbd>{" "}
          for live preview ·{" "}
          <kbd className="mx-0.5 inline-flex items-center rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px]">
            R
          </kbd>{" "}
          to run
        </span>
      </div>
    </div>
  );
}
