"use client";

import React, { useState, useRef, useEffect } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";
import { EXAMPLES_DATA, ExampleItem, ExampleCategory } from "@/lib/examples-data";
import { InteractivePlayground } from "./InteractivePlayground";
import { ExampleCard } from "./ExampleCard";
import { EventConsole, LogEntry } from "./EventConsole";
import { Button } from "@/components/ui/button";
import { Search, Compass, Sparkles, Filter, Code, RotateCcw } from "lucide-react";

export function ExamplesClient() {
  const [activeCategory, setActiveCategory] = useState<ExampleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runningExampleId, setRunningExampleId] = useState<string | null>(null);
  const [eventLogs, setEventLogs] = useState<LogEntry[]>([]);

  const activeTourRef = useRef<WebDrive | null>(null);

  const addLog = (event: string, detail: string) => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setEventLogs((prev) => [
      { id: Math.random().toString(36).substring(2, 9), time, event, detail },
      ...prev.slice(0, 50),
    ]);
  };

  const clearLogs = () => {
    setEventLogs([]);
  };

  // Clean up tour on unmount
  useEffect(() => {
    return () => {
      if (activeTourRef.current) {
        activeTourRef.current.destroy();
      }
    };
  }, []);

  const handleRunExample = (example: ExampleItem) => {
    if (activeTourRef.current) {
      activeTourRef.current.destroy();
      activeTourRef.current = null;
    }

    setIsRunning(true);
    setRunningExampleId(example.id);
    addLog("INIT", `Starting example: "${example.title}"`);

    // Helper to wrap callbacks
    const handleEnd = (status: "completed" | "closed") => {
      setIsRunning(false);
      setRunningExampleId(null);
      addLog("END", `Tour ${status}`);
    };

    let tour: WebDrive;

    switch (example.id) {
      case "animated-tour":
        tour = new WebDrive({
          animate: true,
          showProgress: true,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-primary-btn",
              title: "Action Button",
              description: "Notice the smooth animated transition into this primary button.",
              position: "bottom",
            },
            {
              element: "#playground-analytics-card",
              title: "Analytics Widget",
              description: "The cutout mask smoothly morphs its dimensions to fit this card.",
              position: "left",
            },
            {
              element: "#playground-search-input",
              title: "Search Bar",
              description: "Transitions seamlessly across the viewport with zero layout shift.",
              position: "bottom",
            },
          ],
        });
        break;

      case "static-tour":
        tour = new WebDrive({
          animate: false,
          showProgress: true,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-search-input",
              title: "Instant Snap",
              description: "Switches steps with zero animation latency.",
              position: "bottom",
            },
            {
              element: "#playground-primary-btn",
              title: "Direct Focus",
              description: "Ideal for automated testing and users with motion sensitivity.",
              position: "bottom",
            },
          ],
        });
        break;

      case "simple-highlight":
        tour = new WebDrive({
          allowClose: true,
          showButtons: false,
          onClose: () => handleEnd("closed"),
          onComplete: () => handleEnd("completed"),
          steps: [
            {
              element: "#playground-primary-btn",
              padding: 12,
              showCloseButton: false,
              showNextButton: false,
              showPreviousButton: false,
            },
          ],
        });
        break;

      case "highlight-with-popover":
        tour = new WebDrive({
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-primary-btn",
              title: "Quick Feature Spotlight",
              description: "Focus on this critical action button before exploring the rest of the app.",
              position: "bottom",
              doneButtonText: "Got it!",
            },
          ],
        });
        break;

      case "popover-positioning":
        tour = new WebDrive({
          animate: true,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-positioning-target",
              title: "Top Placement",
              description: "Positioned above with a directional arrow pointing down.",
              position: "top",
              align: "center",
            },
            {
              element: "#playground-positioning-target",
              title: "Right Placement",
              description: "Positioned to the right of the target element.",
              position: "right",
              align: "center",
            },
            {
              element: "#playground-positioning-target",
              title: "Bottom Placement",
              description: "Positioned beneath the element.",
              position: "bottom",
              align: "center",
            },
            {
              element: "#playground-positioning-target",
              title: "Left Placement",
              description: "Positioned to the left with auto-flipping if space is constrained.",
              position: "left",
              align: "center",
            },
          ],
        });
        break;

      case "customizing-popover":
        tour = new WebDrive({
          nextButtonText: "Continue →",
          previousButtonText: "← Go Back",
          doneButtonText: "Complete Setup 🚀",
          closeButtonText: "Dismiss",
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-custom-card",
              title: "✨ Branded Popover",
              content: `<div style="font-size: 12px; line-height: 1.6;">
                <p>You can render <strong>bold text</strong>, <code>code tags</code>, and custom HTML inside step content.</p>
                <span style="display:inline-block; margin-top:8px; padding:2px 8px; border-radius:4px; background:rgba(37,99,235,0.1); color:#2563eb; font-weight:600; font-size:10px;">HTML Supported</span>
              </div>`,
              position: "bottom",
            },
          ],
        });
        break;

      case "styling-overlay":
        tour = new WebDrive({
          overlayColor: "rgba(30, 27, 75, 0.85)",
          overlayOpacity: 0.85,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-analytics-card",
              title: "Indigo Ambient Backdrop",
              description: "The overlay color and opacity can be customized via options or CSS custom properties.",
              position: "bottom",
            },
          ],
        });
        break;

      case "feature-hints":
        tour = new WebDrive({
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-beacon-target",
              title: "💡 Interactive Feature Hint",
              description: "Beacon dots allow users to discover features at their own pace without interrupting their flow.",
              position: "top",
              doneButtonText: "Understood",
            },
          ],
        });
        break;

      case "async-tour": {
        // Automatically ensure dynamic element will mount
        const btn = document.querySelector("#playground-async-container button") as HTMLButtonElement | null;
        if (btn && !btn.disabled) {
          btn.click();
        }

        tour = new WebDrive({
          missingElementBehavior: "wait",
          missingElementWaitTimeout: 5000,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-async-container",
              title: "Step 1: Container",
              description: "Click Next to simulate an asynchronous API call that renders a new element.",
              position: "bottom",
            },
            {
              element: "#playground-dynamic-async-widget",
              title: "Step 2: Async Widget Loaded!",
              description: "WebDrive automatically observed the DOM mutations, detected the new element, and attached smoothly.",
              position: "top",
            },
          ],
        });
        break;
      }

      case "no-element":
        tour = new WebDrive({
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#centered-modal-anchor",
              title: "👋 Welcome to WebDrive Showcase",
              description: "This initial step has no target element cutout — it serves as a centered welcome modal dialog before starting the walkthrough.",
              position: "bottom",
              nextButtonText: "Start Walkthrough →",
              padding: 0,
            },
            {
              element: "#playground-primary-btn",
              title: "Target Highlighting",
              description: "Now we transition smoothly to highlighting specific UI components.",
              position: "bottom",
            },
          ],
        });
        break;

      case "prevent-closing":
        tour = new WebDrive({
          allowClose: false,
          closeOnEscape: false,
          keyboardNavigation: true,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-primary-btn",
              title: "Mandatory Step 1 of 2",
              description: "You cannot click outside or press Escape to dismiss this tour. Click Next to proceed.",
              position: "bottom",
            },
            {
              element: "#playground-search-input",
              title: "Mandatory Step 2 of 2",
              description: "Clicking Done finishes the mandatory workflow.",
              position: "bottom",
              doneButtonText: "Complete & Close",
            },
          ],
        });
        break;

      case "confirm-on-exit":
        tour = new WebDrive({
          allowClose: true,
          onClose: () => {
            const confirmExit = window.confirm("Are you sure you want to abandon the onboarding tour?");
            if (!confirmExit) {
              setTimeout(() => tour.start(tour.getCurrentStepIndex() || 0), 100);
            } else {
              handleEnd("closed");
            }
          },
          onComplete: () => handleEnd("completed"),
          steps: [
            {
              element: "#playground-analytics-card",
              title: "Exit Confirmation Demo",
              description: "Try clicking the 'X' close button or outside backdrop — you will be prompted to confirm exit.",
              position: "bottom",
            },
          ],
        });
        break;

      case "interactive-tour":
        tour = new WebDrive({
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-interactive-input",
              title: "Interactive Requirement",
              description: "Please type something into this input field to unlock the Next step.",
              position: "bottom",
              showNextButton: false,
              onEnter: () => {
                const input = document.querySelector("#playground-interactive-input") as HTMLInputElement | null;
                if (input) {
                  input.focus();
                  const handler = () => {
                    if (input.value.trim().length > 0) {
                      tour.next();
                      input.removeEventListener("input", handler);
                    }
                  };
                  input.addEventListener("input", handler);
                }
              },
            },
            {
              element: "#playground-primary-btn",
              title: "Action Completed!",
              description: "Great job! WebDrive seamlessly listens to DOM input events to drive the tour forward.",
              position: "bottom",
            },
          ],
        });
        break;

      case "tour-progress":
        tour = new WebDrive({
          showProgress: true,
          renderProgress: (current, total) => {
            const percent = Math.round((current / total) * 100);
            return `Step ${current} of ${total} (${percent}%)`;
          },
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            { element: "#playground-primary-btn", title: "Custom Progress 1/3", position: "bottom" },
            { element: "#playground-analytics-card", title: "Custom Progress 2/3", position: "left" },
            { element: "#playground-search-input", title: "Custom Progress 3/3", position: "bottom" },
          ],
        });
        break;

      case "hooks-for-everything":
        tour = new WebDrive({
          onStart: () => addLog("onStart", "Tour initiated"),
          onStepChange: (step, index) => addLog("onStepChange", `Moved to step ${index + 1}: ${step.title}`),
          onComplete: () => {
            addLog("onComplete", "All tour steps successfully completed");
            handleEnd("completed");
          },
          onClose: () => {
            addLog("onClose", "Tour closed");
            handleEnd("closed");
          },
          steps: [
            {
              element: "#playground-primary-btn",
              title: "Step 1: Lifecycle",
              description: "Inspect the live event log console below to see events firing in real time.",
              position: "bottom",
              onEnter: () => addLog("onEnter", "Entering Step 1 (#playground-primary-btn)"),
              onLeave: () => addLog("onLeave", "Leaving Step 1"),
            },
            {
              element: "#playground-search-input",
              title: "Step 2: Lifecycle",
              description: "Triggering onEnter and stepChange events.",
              position: "bottom",
              onEnter: () => addLog("onEnter", "Entering Step 2 (#playground-search-input)"),
              onLeave: () => addLog("onLeave", "Leaving Step 2"),
            },
          ],
        });
        break;

      case "multi-page-tour":
        tour = new WebDrive({
          id: "saas-multipage-onboarding",
          remember: false,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#playground-analytics-card",
              title: "Multi-Page Step 1",
              description: "This tour tracks completion state. Click 'Go to Dashboard' to transition across pages.",
              position: "bottom",
              nextButtonText: "Go to Dashboard →",
              onLeave: () => {
                window.location.href = "/dashboard";
              },
            },
          ],
        });
        break;

      default:
        tour = new WebDrive({
          steps: [
            {
              element: "#playground-primary-btn",
              title: example.title,
              description: example.description,
              position: "bottom",
            },
          ],
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
        });
        break;
    }

    activeTourRef.current = tour;
    tour.start();
  };

  const filteredExamples = EXAMPLES_DATA.filter((ex) => {
    const matchesCategory = activeCategory === "all" || ex.category === activeCategory;
    const matchesQuery =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories: { id: ExampleCategory; label: string }[] = [
    { id: "all", label: "All Examples (16)" },
    { id: "core", label: "Core Walkthroughs" },
    { id: "positioning", label: "UI & Positioning" },
    { id: "flow", label: "Behavior & Flow" },
    { id: "lifecycle", label: "Hooks & Lifecycle" },
  ];

  return (
    <div>
      {/* Interactive Target Sandbox */}
      <InteractivePlayground
        onBeaconClick={() => {
          const beaconEx = EXAMPLES_DATA.find((e) => e.id === "feature-hints");
          if (beaconEx) handleRunExample(beaconEx);
        }}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search examples..."
            className="h-9 w-full rounded-full border border-input bg-card pl-9 pr-4 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map((example) => (
          <ExampleCard
            key={example.id}
            example={example}
            onRun={handleRunExample}
            isRunning={runningExampleId === example.id}
          />
        ))}
      </div>

      {/* Event Console for Hooks Demo */}
      <EventConsole logs={eventLogs} onClear={clearLogs} />
    </div>
  );
}
