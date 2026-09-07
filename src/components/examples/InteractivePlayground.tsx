"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Sparkles, Activity, Layers, Bell, CheckCircle2, ArrowRight } from "lucide-react";

interface InteractivePlaygroundProps {
  onBeaconClick?: () => void;
}

export function InteractivePlayground({ onBeaconClick }: InteractivePlaygroundProps) {
  const [asyncElementMounted, setAsyncElementMounted] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [interactiveInputValue, setInteractiveInputValue] = useState("");

  const triggerAsyncMount = () => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncElementMounted(true);
      setAsyncLoading(false);
    }, 900);
  };

  return (
    <div className="relative rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur shadow-sm transition-all mb-12">
      {/* Invisible anchor for No-Element centered modal steps */}
      <div
        id="centered-modal-anchor"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-lg text-foreground">Interactive Tour Target Sandbox</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            The live tours below dynamically target and spotlight these interactive components.
          </p>
        </div>

        <Badge variant="outline" className="gap-1.5 text-xs font-mono border-primary/30 text-primary">
          <Layers className="h-3.5 w-3.5" />
          <span>Live DOM Nodes</span>
        </Badge>
      </div>

      {/* Grid of playground target elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Target 1: Primary Action Button */}
        <div className="flex flex-col justify-between gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-primary-btn
            </span>
            <p className="text-xs text-muted-foreground">Used by Animated, Static, & Simple Highlight demos</p>
          </div>
          <div>
            <Button
              id="playground-primary-btn"
              size="sm"
              className="gap-2 shadow-sm font-semibold"
              onClick={() => alert("Primary button clicked!")}
            >
              <Plus className="h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </div>
        </div>

        {/* Target 2: Search Input */}
        <div className="flex flex-col justify-between gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-search-input
            </span>
            <p className="text-xs text-muted-foreground">Used for cross-step layout transition testing</p>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              id="playground-search-input"
              type="text"
              placeholder="Search components or docs..."
              className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Target 3: Analytics Card */}
        <Card id="playground-analytics-card" className="border border-border shadow-xs hover:border-primary/40 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-mono text-muted-foreground uppercase">
                #playground-analytics-card
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">$148,250</span>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              +12.4% vs last month
            </span>
          </CardContent>
        </Card>

        {/* Target 4: Central Positioning Target */}
        <div className="flex flex-col justify-between gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-positioning-target
            </span>
            <p className="text-xs text-muted-foreground">Tests Top, Bottom, Left, & Right placement</p>
          </div>
          <div className="flex justify-center py-2">
            <div
              id="playground-positioning-target"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 text-primary text-xs font-semibold shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Positioning Compass</span>
            </div>
          </div>
        </div>

        {/* Target 5: Custom Branded Card */}
        <div
          id="playground-custom-card"
          className="flex flex-col justify-between gap-3 p-4 rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-card shadow-xs"
        >
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-custom-card
            </span>
            <h4 className="font-semibold text-xs text-foreground">Custom Popover Target</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Tests custom button labels and rich HTML popovers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
              Rich HTML
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Custom Copy
            </Badge>
          </div>
        </div>

        {/* Target 6: Feature Hint with Pulsing Beacon */}
        <div
          id="playground-beacon-target"
          className="relative flex flex-col justify-between gap-3 p-4 rounded-xl border border-border bg-card shadow-xs cursor-pointer hover:border-primary/50 transition-all group"
          onClick={onBeaconClick}
          title="Click to trigger feature spotlight hint"
        >
          {/* Radar Beacon Pulse Dot */}
          <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-white items-center justify-center text-[9px] font-bold shadow">
              !
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-beacon-target
            </span>
            <h4 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Bell className="h-3.5 w-3.5 text-primary" />
              <span>Feature Beacon Hint</span>
            </h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Click this card or beacon to trigger a spotlight hint on demand.
            </p>
          </div>
          <span className="text-[11px] text-primary font-medium group-hover:underline flex items-center gap-1">
            <span>Explore Feature</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>

        {/* Target 7: Async DOM Container */}
        <div
          id="playground-async-container"
          className="col-span-1 md:col-span-2 flex flex-col justify-between gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                ID: #playground-async-container
              </span>
              <p className="text-xs text-muted-foreground">
                Tests missingElementBehavior: &quot;wait&quot; by dynamically mounting an element
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={triggerAsyncMount}
              disabled={asyncLoading || asyncElementMounted}
              className="h-7 text-xs"
            >
              {asyncLoading ? "Simulating API Delay..." : asyncElementMounted ? "Element Mounted ✔" : "Simulate Async Mount"}
            </Button>
          </div>

          {asyncElementMounted && (
            <div
              id="playground-dynamic-async-widget"
              className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-xs text-foreground animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold">Asynchronous Widget Loaded!</span>
                <code className="text-[10px] bg-background/80 px-1 py-0.5 rounded border">
                  #playground-dynamic-async-widget
                </code>
              </div>
              <span className="text-[11px] text-muted-foreground">WebDrive auto-attaches here</span>
            </div>
          )}
        </div>

        {/* Target 8: Interactive Input Field */}
        <div className="col-span-1 flex flex-col justify-between gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50">
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
              ID: #playground-interactive-input
            </span>
            <p className="text-xs text-muted-foreground">Type text below to automatically unlock the tour step</p>
          </div>
          <input
            id="playground-interactive-input"
            type="text"
            value={interactiveInputValue}
            onChange={(e) => setInteractiveInputValue(e.target.value)}
            placeholder="Type anything here to advance..."
            className="h-9 w-full rounded-md border border-input bg-card px-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
