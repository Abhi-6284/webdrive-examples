"use client";

import React from "react";
import { useWebDrive } from "@/hooks/useWebDrive";
import { dashboardTourSteps, DASHBOARD_TOUR_ID } from "@/lib/tour-steps";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export function OnboardingTour() {
  const { start, reset, isActive } = useWebDrive({
    id: DASHBOARD_TOUR_ID,
    steps: dashboardTourSteps,
    remember: false, // set false in demo so users can easily test it repeatedly
    showProgress: true,
    animate: true,
    smoothScroll: true,
    keyboardNavigation: true,
    allowClose: true,
    stagePadding: 10,
    stageRadius: 10,
    onStart: () => {
      console.log("[WebDrive] Dashboard tour started");
    },
    onStepChange: (step, index) => {
      console.log(`[WebDrive] Active Step ${index + 1}: ${step.title}`);
    },
    onComplete: () => {
      console.log("[WebDrive] Tour completed successfully!");
    },
  });

  return (
    <div className="flex items-center gap-2">
      <Button
        id="start-tour-button"
        size="sm"
        onClick={() => start(0)}
        disabled={isActive}
        className="gap-1.5 shadow-sm"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        <span>{isActive ? "Tour Active..." : "Start Tour"}</span>
      </Button>

      <Button
        id="reset-tour-button"
        size="sm"
        variant="outline"
        onClick={async () => {
          await reset();
          alert("Tour saved state has been reset! Click Start Tour to run it again.");
        }}
        title="Reset completed state in storage"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
