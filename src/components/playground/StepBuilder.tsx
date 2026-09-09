"use client";

import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  type StepConfig,
  type Position,
  type Alignment,
  SANDBOX_TARGETS,
} from "./types";

interface StepBuilderProps {
  steps: StepConfig[];
  onChange: (steps: StepConfig[]) => void;
}

let idCounter = 100;
function newId() {
  return `step-${++idCounter}`;
}

export function StepBuilder({ steps, onChange }: StepBuilderProps) {
  const addStep = () => {
    const newStep: StepConfig = {
      id: newId(),
      element: "#pg-search",
      title: "New Step",
      description: "Describe what the user should notice here.",
      position: "bottom",
      align: "center",
    };
    onChange([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) return;
    onChange(steps.filter((s) => s.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...steps];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const next = [...steps];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  const update = (id: string, patch: Partial<StepConfig>) => {
    onChange(steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">Tour Steps</span>
          <Badge variant="outline" className="text-[10px] font-mono">
            {steps.length} / 6
          </Badge>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addStep}
          disabled={steps.length >= 6}
          className="h-7 px-2.5 text-xs gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Step
        </Button>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="rounded-lg border border-border/70 bg-background/70 overflow-hidden"
          >
            {/* Step header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border-b border-border/40">
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
              <div className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <span className="text-[11px] font-semibold text-foreground flex-1 truncate">
                {step.title || "Untitled step"}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                  title="Move up"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === steps.length - 1}
                  className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                  title="Move down"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  disabled={steps.length <= 1}
                  className="p-0.5 rounded text-muted-foreground hover:text-red-500 disabled:opacity-30 transition-colors ml-1"
                  title="Remove step"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Step fields */}
            <div className="p-3 space-y-2">
              {/* Target element */}
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1 font-medium">
                  Target Element
                </label>
                <select
                  value={step.element}
                  onChange={(e) => update(step.id, { element: e.target.value })}
                  className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary text-foreground"
                >
                  {SANDBOX_TARGETS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} ({t.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => update(step.id, { title: e.target.value })}
                  placeholder="e.g. 🔍 Quick Search"
                  className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) => update(step.id, { description: e.target.value })}
                  rows={2}
                  placeholder="Describe what the user should do or notice…"
                  className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60 resize-none"
                />
              </div>

              {/* Position + Align */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1 font-medium">
                    Position
                  </label>
                  <select
                    value={step.position}
                    onChange={(e) =>
                      update(step.id, { position: e.target.value as Position })
                    }
                    className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary text-foreground"
                  >
                    {(["bottom", "top", "left", "right"] as Position[]).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1 font-medium">
                    Align
                  </label>
                  <select
                    value={step.align}
                    onChange={(e) =>
                      update(step.id, { align: e.target.value as Alignment })
                    }
                    className="w-full rounded border border-border bg-background px-2 py-1 text-xs outline-none focus:border-primary text-foreground"
                  >
                    {(["center", "start", "end"] as Alignment[]).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {steps.length >= 6 && (
        <p className="text-[10px] text-muted-foreground text-center">
          Maximum 6 steps reached
        </p>
      )}
    </div>
  );
}
