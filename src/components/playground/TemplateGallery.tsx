"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TEMPLATES, type Template, type PlaygroundConfig } from "./types";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateGalleryProps {
  currentConfig: PlaygroundConfig;
  onApply: (config: PlaygroundConfig) => void;
}

export function TemplateGallery({ currentConfig, onApply }: TemplateGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const apply = (t: Template) => {
    setActiveId(t.id);
    onApply(t.config);
  };

  // Detect which template matches current config (by step length + overlayColor)
  const matchedId = TEMPLATES.find(
    (t) =>
      t.config.overlayColor === currentConfig.overlayColor &&
      t.config.steps.length === currentConfig.steps.length
  )?.id ?? null;

  return (
    <div className="rounded-xl border border-border/80 bg-card/90 shadow-md overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-muted/30 border-b border-border/60 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <span className="font-bold text-sm text-foreground tracking-tight">Template Gallery</span>
          <Badge variant="secondary" className="text-[10px]">
            {TEMPLATES.length} presets
          </Badge>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEMPLATES.map((t) => {
              const isActive = (activeId ?? matchedId) === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => apply(t)}
                  className={`relative group flex flex-col items-center text-center gap-2 rounded-xl border p-3 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border/70 bg-background/60 hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary" />
                  )}
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <div className="text-[11px] font-bold text-foreground leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                      {t.description}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-1.5 py-0 mt-auto ${
                      isActive ? "border-primary/50 text-primary" : ""
                    }`}
                  >
                    {t.tag}
                  </Badge>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 text-center">
            Click a template to instantly load its config — all controls will update
          </p>
        </div>
      )}
    </div>
  );
}
