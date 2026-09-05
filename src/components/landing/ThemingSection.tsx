"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { THEME_PALETTES, ThemeOption, applyGlobalTheme } from "./ThemeCustomizer";
import { Palette, Check, Copy, Sparkles, X, ChevronRight, Sliders } from "lucide-react";

const RADIUS_OPTIONS = [
  { label: "Sharp", value: "0px" },
  { label: "Subtle", value: "6px" },
  { label: "Modern", value: "12px" },
  { label: "Pill", value: "24px" },
];

export function ThemingSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEME_PALETTES[0]);
  const [selectedRadius, setSelectedRadius] = useState<string>("12px");
  const [copied, setCopied] = useState(false);

  const handleThemeChange = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    applyGlobalTheme(theme);
  };

  const handleRadiusChange = (radius: string) => {
    setSelectedRadius(radius);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--radius", radius);
      document.documentElement.style.setProperty("--webdrive-radius", radius);
    }
  };

  const copyCssCode = () => {
    const code = `/* WebDrive + Brand Design Tokens */
:root {
  --primary: ${selectedTheme.hsl};
  --radius: ${selectedRadius};

  /* WebDrive Theme Mapping */
  --webdrive-primary: hsl(var(--primary));
  --webdrive-background: hsl(var(--card));
  --webdrive-foreground: hsl(var(--foreground));
  --webdrive-border: hsl(var(--border));
  --webdrive-radius: var(--radius);
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="theming" className="py-20 md:py-28 border-t border-border/60 bg-muted/20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3.5 py-1 text-xs font-semibold gap-1.5 border-primary/30 bg-primary/5 text-primary"
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Interactive Theming Studio</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Zero-Bloat CSS Custom Properties
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            WebDrive natively adopts your brand design system. Click any palette or radius below to see your website buttons and the WebDrive tour popover adapt in real time.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Color Palette Selector */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" />
                  Primary Brand Palette
                </span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {selectedTheme.name}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {THEME_PALETTES.map((theme) => {
                  const isSelected = selectedTheme.name === theme.name;
                  return (
                    <button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xs"
                          : "border-border/70 bg-background/60 hover:border-border hover:bg-accent/40"
                      }`}
                      type="button"
                    >
                      <span
                        className="h-6 w-6 rounded-full shadow-xs flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </span>
                      <span className="text-[11px] font-medium text-foreground truncate max-w-full">
                        {theme.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Radius Selector */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="text-sm font-semibold text-foreground block mb-4">
                Border Radius Ergonomics
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {RADIUS_OPTIONS.map((rad) => {
                  const isSelected = selectedRadius === rad.value;
                  return (
                    <button
                      key={rad.label}
                      onClick={() => handleRadiusChange(rad.value)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                      type="button"
                    >
                      {rad.label} ({rad.value})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Copyable CSS Tokens snippet */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                  CSS Variables Snippet
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCssCode}
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </Button>
              </div>
              <pre className="text-xs font-mono bg-muted/40 p-4 rounded-xl border border-border/50 overflow-x-auto text-foreground">
                <code>{`:root {
  --primary: ${selectedTheme.hsl};
  --radius: ${selectedRadius};

  /* WebDrive Theme Mapping */
  --webdrive-primary: hsl(var(--primary));
  --webdrive-radius: var(--radius);
}`}</code>
              </pre>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-md">
              <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Live Component Preview</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real-time synchronization between website UI and WebDrive card
                  </p>
                </div>
                <Badge variant="outline" className="gap-1 text-[11px] font-mono border-primary/30 text-primary">
                  <Sparkles className="h-3 w-3" />
                  Synced
                </Badge>
              </div>

              {/* Host Website UI Demonstration */}
              <div className="space-y-4 mb-8">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Your Web Application UI:
                </span>
                <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-dashed border-border bg-background/50">
                  <Button size="sm">Primary Action</Button>
                  <Button size="sm" variant="outline">
                    Secondary Outline
                  </Button>
                  <Badge className="bg-primary text-primary-foreground">Live Status</Badge>
                </div>
              </div>

              {/* WebDrive Tour Popover Simulation */}
              <div className="space-y-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  WebDrive Tour Popover (Matches Exactly):
                </span>
                <div
                  className="relative border border-border bg-card p-5 shadow-xl transition-all"
                  style={{
                    borderRadius: selectedRadius,
                  }}
                >
                  {/* Top Arrow Indicator Simulation */}
                  <div
                    className="absolute -top-2 left-8 w-4 h-4 bg-card border-t border-l border-border transform rotate-45"
                    style={{
                      borderTopLeftRadius: "2px",
                    }}
                  />

                  {/* Popover Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      <span>🧭</span>
                      <span>Feature Highlight Tour</span>
                    </h4>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground rounded p-1"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Popover Content */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                    This popover dynamically inherits <code className="text-primary font-semibold">--webdrive-primary</code> and <code className="text-primary font-semibold">--webdrive-radius</code> from your global CSS.
                  </p>

                  {/* Popover Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">
                      Step 2 of 4
                    </span>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                        Back
                      </Button>
                      <Button size="sm" className="h-7 text-xs px-3 gap-1">
                        <span>Next Step</span>
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
