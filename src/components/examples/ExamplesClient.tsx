"use client";

import React, { useState, useRef, useEffect } from "react";
import { WebDrive } from "webdrive";
import { EXAMPLES_DATA, ExampleItem, ExampleCategory } from "@/lib/examples-data";
import { ExampleSection } from "./ExampleSection";
import { LogEntry } from "./EventConsole";
import { Search, Compass, Sparkles, Filter, ChevronDown, Hash } from "lucide-react";

export function ExamplesClient() {
  const [activeCategory, setActiveCategory] = useState<ExampleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runningExampleId, setRunningExampleId] = useState<string | null>(null);
  const [eventLogs, setEventLogs] = useState<LogEntry[]>([]);
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);

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
      ...prev.slice(0, 49),
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

  const handleStopTour = () => {
    if (activeTourRef.current) {
      activeTourRef.current.destroy();
      activeTourRef.current = null;
    }
    setIsRunning(false);
    setRunningExampleId(null);
    addLog("STOP", "Tour manually stopped");
  };

  const handleRunExample = (example: ExampleItem) => {
    if (activeTourRef.current) {
      activeTourRef.current.destroy();
      activeTourRef.current = null;
    }

    setIsRunning(true);
    setRunningExampleId(example.id);
    addLog("INIT", `Starting example: "${example.title}"`);

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
              element: "#animated-step-1",
              title: "Action Button",
              description: "Smooth animated transition into this primary button.",
              position: "bottom",
            },
            {
              element: "#animated-step-2",
              title: "Analytics Widget",
              description: "The cutout mask smoothly morphs its dimensions to fit this card.",
              position: "left",
            },
            {
              element: "#animated-step-3",
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
              element: "#static-step-1",
              title: "Instant Snap",
              description: "Switches steps with zero animation latency.",
              position: "bottom",
            },
            {
              element: "#static-step-2",
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
          showProgress: false,
          onClose: () => handleEnd("closed"),
          onComplete: () => handleEnd("completed"),
          steps: [
            {
              element: "#simple-highlight-target",
              padding: 14,
              showCloseButton: false,
              showNextButton: false,
              showPreviousButton: false,
              onEnter: () => {
                const popover = document.querySelector(".webdrive-popover") as HTMLElement | null;
                if (popover) {
                  popover.style.setProperty("display", "none", "important");
                }
              },
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
              element: "#highlight-popover-target",
              title: "Feature Export Hub",
              description: "A clean single-element highlight with title, description, and action button.",
              position: "bottom",
              doneButtonText: "Understood",
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
              element: "#pos-target-top",
              title: "Top Placement",
              description: "Positioned above with a downward pointing arrow.",
              position: "top",
              align: "center",
            },
            {
              element: "#pos-target-right",
              title: "Right Placement",
              description: "Positioned to the right of the target element.",
              position: "right",
              align: "center",
            },
            {
              element: "#pos-target-bottom",
              title: "Bottom Placement",
              description: "Positioned beneath the element.",
              position: "bottom",
              align: "center",
            },
            {
              element: "#pos-target-left",
              title: "Left Placement",
              description: "Positioned to the left with auto-flipping.",
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
              element: "#custom-popover-target",
              title: "✨ Branded Popover",
              content: `<div style="font-size: 13px; line-height: 1.6;">
                <p>You can render <strong>bold text</strong>, <code>code tags</code>, and custom HTML inside step content.</p>
                <span style="display:inline-block; margin-top:8px; padding:2px 8px; border-radius:4px; background:rgba(37,99,235,0.1); color:#2563eb; font-weight:600; font-size:11px;">HTML Supported</span>
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
              element: "#styling-overlay-target",
              title: "Indigo Ambient Backdrop",
              description: "Custom overlay color (rgba(30, 27, 75, 0.85)) and opacity set dynamically.",
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
              element: "#feature-hint-target",
              title: "💡 Interactive Feature Hint",
              description: "Beacon dots invite users to discover features at their own pace.",
              position: "top",
              doneButtonText: "Got It",
            },
          ],
        });
        break;

      case "async-tour": {
        // Automatically trigger async button in section if dynamic element is not yet mounted
        const asyncBtn = document.querySelector("#async-tour-container button") as HTMLButtonElement | null;
        if (asyncBtn && !document.querySelector("#async-tour-dynamic-element")) {
          asyncBtn.click();
        }

        tour = new WebDrive({
          missingElementBehavior: "wait",
          missingElementWaitTimeout: 6000,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#async-tour-container",
              title: "Step 1: Container",
              description: "Click Next to advance. If the second element is loading asynchronously, WebDrive will wait for it.",
              position: "bottom",
            },
            {
              element: "#async-tour-dynamic-element",
              title: "Step 2: Dynamic Element Loaded!",
              description: "WebDrive automatically detected and attached to this element when mounted into the DOM.",
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
              title: "👋 Viewport Centered Modal",
              description: "This initial step has no target element cutout — it serves as a welcome modal dialog before starting the walkthrough.",
              position: "bottom",
              nextButtonText: "Got It →",
              padding: 0,
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
              element: "#prevent-closing-target",
              title: "Mandatory Guided Workflow",
              description: "Backdrop clicks and the Escape key are disabled. You must click Complete to finish this step.",
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
            const confirmExit = window.confirm("Are you sure you want to abandon this onboarding tour?");
            if (!confirmExit) {
              setTimeout(() => tour.start(0), 100);
            } else {
              handleEnd("closed");
            }
          },
          onComplete: () => handleEnd("completed"),
          steps: [
            {
              element: "#confirm-exit-target",
              title: "Exit Confirmation Demo",
              description: "Try clicking the 'X' button or outside backdrop — you will be prompted with a browser confirmation before exiting.",
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
              element: "#interactive-tour-input",
              title: "Interactive Requirement",
              description: "Please type in the input box to advance the tour automatically.",
              position: "bottom",
              showNextButton: false,
              onEnter: () => {
                const input = document.querySelector("#interactive-tour-input") as HTMLInputElement | null;
                if (input) {
                  const onInput = () => {
                    if (input.value.trim().length > 0) {
                      tour.next();
                      input.removeEventListener("input", onInput);
                    }
                  };
                  input.addEventListener("input", onInput);
                }
              },
            },
            {
              element: "#interactive-tour-input",
              title: "Step Completed!",
              description: "WebDrive automatically detected user input and advanced to the next step!",
              position: "bottom",
            },
          ],
        });
        break;

      case "tour-progress":
        tour = new WebDrive({
          showProgress: true,
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: "#progress-step-1",
              title: "Progress Step 1",
              description: "Step 1 of 3: Notice the step counter indicator in the popover header.",
              position: "bottom",
            },
            {
              element: "#progress-step-2",
              title: "Progress Step 2",
              description: "Step 2 of 3: Moving through the tour updates the count automatically.",
              position: "bottom",
            },
            {
              element: "#progress-step-3",
              title: "Progress Step 3",
              description: "Step 3 of 3: Final step ready for completion.",
              position: "bottom",
            },
          ],
        });
        break;

      case "hooks-for-everything":
        tour = new WebDrive({
          onStart: () => addLog("onStart", "Tour began execution"),
          onStepChange: (step, index) =>
            addLog("onStepChange", `Moved to index ${index} (${step.element})`),
          onComplete: () => {
            addLog("onComplete", "Tour completed all steps");
            handleEnd("completed");
          },
          onClose: () => {
            addLog("onClose", "Tour dialog was closed");
            handleEnd("closed");
          },
          steps: [
            {
              element: "#hooks-step-1",
              title: "Step 1 Lifecycle",
              description: "Watch the live event stream below as onEnter, onLeave, and stepChange fire.",
              position: "bottom",
              onEnter: () => addLog("onEnter:step1", "Entered hooks step 1"),
              onLeave: () => addLog("onLeave:step1", "Leaving hooks step 1"),
            },
            {
              element: "#hooks-step-2",
              title: "Step 2 Lifecycle",
              description: "Triggering final step hooks.",
              position: "bottom",
              onEnter: () => addLog("onEnter:step2", "Entered hooks step 2"),
              onLeave: () => addLog("onLeave:step2", "Leaving hooks step 2"),
            },
          ],
        });

        tour.on("stepChange", ({ index }) => {
          addLog("emitter.stepChange", `EventEmitter broadcast: step ${index}`);
        });
        break;

      case "multi-page-tour": {
        if (typeof window !== "undefined") {
          localStorage.removeItem("webdrive:tour:saas-multipage-onboarding");
        }

        tour = new WebDrive({
          id: "saas-multipage-onboarding",
          remember: false,
          showProgress: true,
          animate: true,
          onClose: () => handleEnd("closed"),
          onComplete: () => {
            handleEnd("completed");
            if (typeof window !== "undefined") {
              localStorage.setItem("webdrive_multipage_active", "true");
              window.location.href = "/dashboard?tour=multipage";
            }
          },
          steps: [
            {
              element: "#multipage-step-1",
              title: "🚀 Multi-Page Tour (Page 1 of 2)",
              description:
                "WebDrive preserves walkthrough state across page transitions! Click 'Continue to Dashboard →' to navigate across routes and automatically resume Step 2.",
              position: "bottom",
              doneButtonText: "Continue to Dashboard →",
            },
          ],
        });
        break;
      }

      default:
        tour = new WebDrive({
          onComplete: () => handleEnd("completed"),
          onClose: () => handleEnd("closed"),
          steps: [
            {
              element: `#${example.id}`,
              title: example.title,
              description: example.description,
              position: "bottom",
            },
          ],
        });
        break;
    }

    activeTourRef.current = tour;
    tour.start().catch((err) => {
      console.error("[WebDrive] Error starting tour:", err);
      handleEnd("closed");
    });
  };

  const filteredExamples = EXAMPLES_DATA.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.badge.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const categories: { id: ExampleCategory; label: string; count: number }[] = [
    { id: "all", label: "All Recipes", count: EXAMPLES_DATA.length },
    { id: "core", label: "Core Walkthrough", count: EXAMPLES_DATA.filter((e) => e.category === "core").length },
    { id: "positioning", label: "Popover Positioning", count: EXAMPLES_DATA.filter((e) => e.category === "positioning").length },
    { id: "flow", label: "Behavior & Flow", count: EXAMPLES_DATA.filter((e) => e.category === "flow").length },
    { id: "lifecycle", label: "Lifecycle & Hooks", count: EXAMPLES_DATA.filter((e) => e.category === "lifecycle").length },
  ];

  const scrollToSection = (id: string) => {
    // 1. If the target example is filtered out by category or search query, reset them so it's in the DOM
    const targetExample = EXAMPLES_DATA.find((e) => e.id === id);
    if (targetExample) {
      if (activeCategory !== "all" && targetExample.category !== activeCategory) {
        setActiveCategory("all");
      }
      if (searchQuery.trim() !== "") {
        setSearchQuery("");
      }
    }

    // 2. Wait for React to render the element into the DOM if filters were reset
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        // Offset for dual sticky headers: Navbar (64px) + Filter bar (72px) + breathing padding
        const yOffset = -145;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

        // Highlight jumped section with visual feedback
        setHighlightedSectionId(id);
        setTimeout(() => {
          setHighlightedSectionId(null);
        }, 2200);
      }
    }, 70);
  };

  return (
    <div className="space-y-10">
      {/* Sticky Top Navigation & Filter Bar */}
      <div className="sticky top-16 z-40 -mx-4 px-4 py-4 backdrop-blur-md bg-background/90 border-b border-border/70">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                type="button"
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Jump & Search Row */}
          <div className="flex items-center gap-2.5">
            {/* Quick Jump Dropdown (controlled so it can jump repeatedly) */}
            <div className="relative">
              <select
                value=""
                onChange={(e) => {
                  const targetId = e.target.value;
                  if (targetId) {
                    scrollToSection(targetId);
                  }
                }}
                className="h-9 rounded-lg border border-input bg-card px-3 pr-8 text-xs font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer appearance-none transition-all hover:border-primary/50 shadow-xs"
              >
                <option value="" disabled>
                  Jump to Section...
                </option>
                {EXAMPLES_DATA.map((ex, i) => (
                  <option key={ex.id} value={ex.id}>
                    #{String(i + 1).padStart(2, "0")} {ex.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 16 recipes..."
                className="h-9 w-full rounded-lg border border-input bg-card pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Live Active Running Status Notification */}
        {isRunning && (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs text-primary font-medium animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>
                Tour is active on: <strong>{runningExampleId}</strong>
              </span>
            </span>
            <button
              onClick={handleStopTour}
              className="text-xs font-bold underline hover:opacity-80 cursor-pointer"
            >
              Stop Tour
            </button>
          </div>
        )}
      </div>

      {/* Examples List: Each Example is a Distinct Full Section */}
      <div className="space-y-12">
        {filteredExamples.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No examples match your filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-semibold text-primary underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredExamples.map((example) => {
            const originalIndex = EXAMPLES_DATA.findIndex((e) => e.id === example.id);
            return (
              <ExampleSection
                key={example.id}
                index={originalIndex}
                example={example}
                onRun={handleRunExample}
                onStop={handleStopTour}
                isRunning={runningExampleId === example.id}
                eventLogs={eventLogs}
                onClearLogs={clearLogs}
                isHighlighted={highlightedSectionId === example.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
