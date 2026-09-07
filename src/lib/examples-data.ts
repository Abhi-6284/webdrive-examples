export type ExampleCategory =
  | "all"
  | "core"
  | "positioning"
  | "flow"
  | "lifecycle";

export interface ExampleItem {
  id: string;
  title: string;
  category: "core" | "positioning" | "flow" | "lifecycle";
  badge: string;
  description: string;
  targetSelector: string;
  codeTs: string;
  codeJs: string;
}

export const EXAMPLES_DATA: ExampleItem[] = [
  {
    id: "animated-tour",
    title: "Animated Tour",
    category: "core",
    badge: "Most Popular",
    description:
      "Smooth SVG cutout morphing and gliding popover animations as the tour moves from one element to the next.",
    targetSelector: "#animated-step-1, #animated-step-2, #animated-step-3",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: true, // Enables smooth SVG cutout transitions
  showProgress: true,
  steps: [
    {
      element: "#animated-step-1",
      title: "Action Button",
      description: "Notice the smooth animated transition into this primary button.",
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: true,
  showProgress: true,
  steps: [
    { element: "#animated-step-1", title: "Action Button", description: "Smooth animation.", position: "bottom" },
    { element: "#animated-step-2", title: "Analytics Widget", description: "Cutout morphs size.", position: "left" },
    { element: "#animated-step-3", title: "Search Bar", description: "Zero layout shift.", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "static-tour",
    title: "Non-Animated Tour (Static)",
    category: "core",
    badge: "Accessibility",
    description:
      "Instantaneous step transitions with zero animation delay. Perfect for users with prefers-reduced-motion or high-performance requirements.",
    targetSelector: "#static-step-1, #static-step-2",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: false, // Disables all transitions for instant snapping
  showProgress: true,
  steps: [
    {
      element: "#static-step-1",
      title: "Instant Snap Button",
      description: "Switches steps with zero animation latency.",
      position: "bottom",
    },
    {
      element: "#static-step-2",
      title: "Direct Focus Badge",
      description: "Ideal for automated testing and users with motion sensitivity.",
      position: "bottom",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: false,
  showProgress: true,
  steps: [
    { element: "#static-step-1", title: "Instant Snap", description: "Zero animation latency.", position: "bottom" },
    { element: "#static-step-2", title: "Direct Focus", description: "High-performance snapping.", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "simple-highlight",
    title: "Simple Highlight",
    category: "core",
    badge: "Focus Spotlight",
    description:
      "Spotlights an element with the darkened SVG cutout overlay without rendering any popover card. Clicking the backdrop dismisses it.",
    targetSelector: "#simple-highlight-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Spotlight a single element with no popover dialog
const tour = new WebDrive({
  allowClose: true,
  showButtons: false,
  steps: [
    {
      element: "#simple-highlight-target",
      padding: 12,
      showCloseButton: false,
      showNextButton: false,
      showPreviousButton: false,
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  allowClose: true,
  showButtons: false,
  steps: [
    {
      element: "#simple-highlight-target",
      padding: 12,
      showCloseButton: false,
      showNextButton: false,
    },
  ],
});
tour.start();`,
  },
  {
    id: "highlight-with-popover",
    title: "Highlight with Popover",
    category: "core",
    badge: "Essential",
    description:
      "A classic single-element highlight with title, description, and an action button to dismiss.",
    targetSelector: "#highlight-popover-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  steps: [
    {
      element: "#highlight-popover-target",
      title: "Quick Feature Spotlight",
      description: "Focus on this critical action button before exploring the rest of the app.",
      position: "bottom",
      doneButtonText: "Got it!",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  steps: [
    {
      element: "#highlight-popover-target",
      title: "Quick Feature Spotlight",
      description: "Focus on this critical action button.",
      position: "bottom",
      doneButtonText: "Got it!",
    },
  ],
});
tour.start();`,
  },
  {
    id: "popover-positioning",
    title: "Popover Positioning & Alignment",
    category: "positioning",
    badge: "Smart Engine",
    description:
      "Position popovers on top, bottom, left, or right, aligned to start, center, or end. WebDrive automatically flips sides when near viewport boundaries.",
    targetSelector: "#pos-target-top, #pos-target-right, #pos-target-bottom, #pos-target-left",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: true,
  steps: [
    {
      element: "#pos-target-top",
      title: "Top Placement",
      description: "Positioned above with a directional arrow pointing down.",
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
      description: "Positioned to the left with auto-flipping if space is constrained.",
      position: "left",
      align: "center",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: true,
  steps: [
    { element: "#pos-target-top", title: "Top", position: "top", align: "center" },
    { element: "#pos-target-right", title: "Right", position: "right", align: "center" },
    { element: "#pos-target-bottom", title: "Bottom", position: "bottom", align: "center" },
    { element: "#pos-target-left", title: "Left", position: "left", align: "center" },
  ],
});
tour.start();`,
  },
  {
    id: "customizing-popover",
    title: "Customizing Popover & Buttons",
    category: "positioning",
    badge: "Branding",
    description:
      "Customize button copy (nextButtonText, previousButtonText, doneButtonText) and inject rich HTML content into popovers.",
    targetSelector: "#custom-popover-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  nextButtonText: "Continue →",
  previousButtonText: "← Go Back",
  doneButtonText: "Complete Setup 🚀",
  closeButtonText: "Dismiss",
  steps: [
    {
      element: "#custom-popover-target",
      title: "✨ Branded Popover",
      content: \`<div style="font-size: 13px; line-height: 1.6;">
        <p>You can render <strong>bold text</strong>, <code>code tags</code>, and custom HTML inside step content.</p>
        <span style="display:inline-block; margin-top:8px; padding:2px 8px; border-radius:4px; background:rgba(37,99,235,0.1); color:#2563eb; font-weight:600; font-size:11px;">HTML Supported</span>
      </div>\`,
      position: "bottom",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  nextButtonText: "Continue →",
  previousButtonText: "← Go Back",
  doneButtonText: "Complete Setup 🚀",
  steps: [
    {
      element: "#custom-popover-target",
      title: "✨ Branded Popover",
      content: "<div>HTML content with <strong>bold</strong> tags.</div>",
      position: "bottom",
    },
  ],
});
tour.start();`,
  },
  {
    id: "styling-overlay",
    title: "Styling Overlay (Color & Opacity)",
    category: "positioning",
    badge: "Theming",
    description:
      "Override the backdrop overlay color and opacity to match brand aesthetics or create high-contrast dark rooms.",
    targetSelector: "#styling-overlay-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  overlayColor: "rgba(30, 27, 75, 0.85)", // Deep indigo brand overlay
  overlayOpacity: 0.85,
  steps: [
    {
      element: "#styling-overlay-target",
      title: "Indigo Ambient Backdrop",
      description: "The overlay color and opacity can be set via options or CSS custom properties (--webdrive-overlay).",
      position: "bottom",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  overlayColor: "rgba(30, 27, 75, 0.85)",
  overlayOpacity: 0.85,
  steps: [
    { element: "#styling-overlay-target", title: "Indigo Backdrop", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "feature-hints",
    title: "Feature Hints (Beacon Pulse)",
    category: "positioning",
    badge: "Self-Serve",
    description:
      "Non-intrusive pulsating beacon radar dots attached to UI elements that invite users to trigger feature spotlights on demand.",
    targetSelector: "#feature-hint-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Attach a beacon hint to any element
function openFeatureHint() {
  const tour = new WebDrive({
    steps: [
      {
        element: "#feature-hint-target",
        title: "💡 Interactive Feature Hint",
        description: "Beacon dots allow users to discover features at their own pace without interrupting their flow.",
        position: "top",
        doneButtonText: "Understood",
      },
    ],
  });
  tour.start();
}`,
    codeJs: `function openFeatureHint() {
  const tour = new WebDrive({
    steps: [
      {
        element: "#feature-hint-target",
        title: "💡 Feature Hint",
        description: "Discovered on user demand.",
        position: "top",
      },
    ],
  });
  tour.start();
}`,
  },
  {
    id: "async-tour",
    title: "Async Tour (Dynamic Elements)",
    category: "flow",
    badge: "SSR Safe",
    description:
      "Automatically waits for elements that load asynchronously via fetch or client-side rendering with missingElementBehavior: 'wait'.",
    targetSelector: "#async-tour-container, #async-tour-dynamic-element",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  missingElementBehavior: "wait", // Observes DOM mutations until element appears
  missingElementWaitTimeout: 5000,
  steps: [
    {
      element: "#async-tour-container",
      title: "Step 1: Container",
      description: "Click Next to simulate an asynchronous API call that renders a new element.",
      position: "bottom",
    },
    {
      element: "#async-tour-dynamic-element",
      title: "Step 2: Async Widget Loaded!",
      description: "WebDrive automatically detected and attached to this element when it mounted into the DOM.",
      position: "top",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  missingElementBehavior: "wait",
  missingElementWaitTimeout: 5000,
  steps: [
    { element: "#async-tour-container", title: "Step 1", position: "bottom" },
    { element: "#async-tour-dynamic-element", title: "Step 2: Mounted Async", position: "top" },
  ],
});
tour.start();`,
  },
  {
    id: "no-element",
    title: "No Element (Centered Welcome Modal)",
    category: "flow",
    badge: "Intro Dialog",
    description:
      "Renders a centered dialog modal in the viewport before highlighting specific elements — ideal for welcome introductions and completion messages.",
    targetSelector: "#centered-modal-anchor",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  steps: [
    {
      // Targeting a center anchor creates a centered modal experience
      element: "#centered-modal-anchor",
      title: "👋 Welcome to WebDrive Showcase",
      description: "This initial step has no target element cutout — it serves as a welcome modal dialog before starting the walkthrough.",
      position: "bottom",
      nextButtonText: "Got It →",
      padding: 0,
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  steps: [
    {
      element: "#centered-modal-anchor",
      title: "👋 Welcome",
      description: "Centered welcome dialog without target cutout.",
      position: "bottom",
      nextButtonText: "Got It →",
    },
  ],
});
tour.start();`,
  },
  {
    id: "prevent-closing",
    title: "Prevent Closing (Strict Guided Flow)",
    category: "flow",
    badge: "Required Tour",
    description:
      "Disables close buttons, backdrop clicks, and the Escape key. Users are required to progress through the steps to complete mandatory onboarding.",
    targetSelector: "#prevent-closing-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  allowClose: false, // Disables backdrop click and close button
  closeOnEscape: false, // Disables ESC key closing
  keyboardNavigation: true,
  steps: [
    {
      element: "#prevent-closing-target",
      title: "Mandatory Step Flow",
      description: "You cannot click outside or press Escape to dismiss this tour. Click Done to proceed.",
      position: "bottom",
      doneButtonText: "Complete & Close",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  allowClose: false,
  closeOnEscape: false,
  steps: [
    { element: "#prevent-closing-target", title: "Mandatory Step", position: "bottom", doneButtonText: "Complete" },
  ],
});
tour.start();`,
  },
  {
    id: "confirm-on-exit",
    title: "Confirm on Exit",
    category: "flow",
    badge: "User Protection",
    description:
      "Intercepts tour exit attempts (via close button or backdrop click) to prompt the user with a confirmation dialog before terminating.",
    targetSelector: "#confirm-exit-target",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  allowClose: true,
  onClose: () => {
    const confirmExit = window.confirm("Are you sure you want to abandon the onboarding tour?");
    if (!confirmExit) {
      // Re-open tour if user cancelled exit
      setTimeout(() => tour.start(tour.getCurrentStepIndex() || 0), 100);
    }
  },
  steps: [
    {
      element: "#confirm-exit-target",
      title: "Exit Confirmation Demo",
      description: "Try clicking the 'X' close button or outside backdrop — you will be prompted to confirm exit.",
      position: "bottom",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  onClose: () => {
    if (!window.confirm("Exit tour?")) {
      setTimeout(() => tour.start(), 100);
    }
  },
  steps: [
    { element: "#confirm-exit-target", title: "Confirm on Exit", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "interactive-tour",
    title: "Interactive Tour (Action-Driven)",
    category: "flow",
    badge: "Hands-On",
    description:
      "Requires the user to interact with the target element (typing into an input or toggling an option) before allowing advancement to the next step.",
    targetSelector: "#interactive-tour-input",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  steps: [
    {
      element: "#interactive-tour-input",
      title: "Interactive Requirement",
      description: "Please type in this input field to unlock the Next step.",
      position: "bottom",
      showNextButton: false, // Hidden until input is valid
      onEnter: () => {
        const input = document.querySelector("#interactive-tour-input") as HTMLInputElement;
        const handler = () => {
          if (input?.value.trim().length > 0) {
            tour.next();
            input.removeEventListener("input", handler);
          }
        };
        input?.addEventListener("input", handler);
      },
    },
    {
      element: "#interactive-tour-input",
      title: "Action Completed!",
      description: "Great job! WebDrive seamlessly listens to DOM input events to drive the tour forward.",
      position: "bottom",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  steps: [
    {
      element: "#interactive-tour-input",
      title: "Type Something",
      description: "Type in the box to advance.",
      showNextButton: false,
      onEnter: () => {
        const input = document.querySelector("#interactive-tour-input");
        input?.addEventListener("input", () => tour.next(), { once: true });
      },
    },
    { element: "#interactive-tour-input", title: "Unlocked!", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "tour-progress",
    title: "Tour Progress (Step Counter)",
    category: "lifecycle",
    badge: "Ergonomics",
    description:
      "Display step progression numbers with custom formatting, such as 'Step 2 of 3'.",
    targetSelector: "#progress-step-1, #progress-step-2, #progress-step-3",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  showProgress: true,
  steps: [
    { element: "#progress-step-1", title: "Progress Step 1", description: "First step in the sequence.", position: "bottom" },
    { element: "#progress-step-2", title: "Progress Step 2", description: "Notice '2 of 3' indicator in header.", position: "bottom" },
    { element: "#progress-step-3", title: "Progress Step 3", description: "Final step with finish action.", position: "bottom" },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  showProgress: true,
  steps: [
    { element: "#progress-step-1", title: "Step 1", position: "bottom" },
    { element: "#progress-step-2", title: "Step 2", position: "bottom" },
    { element: "#progress-step-3", title: "Step 3", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "hooks-for-everything",
    title: "Hooks for Everything (Lifecycle & Events)",
    category: "lifecycle",
    badge: "State Machine",
    description:
      "Full suite of lifecycle callbacks (onStart, onStepChange, onEnter, onLeave, onComplete, onClose) and strongly-typed event emitter (.on).",
    targetSelector: "#hooks-step-1, #hooks-step-2",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  onStart: () => console.log("Tour started"),
  onStepChange: (step, index) => console.log(\`Moved to step \${index + 1}\`),
  onComplete: () => console.log("Tour completed"),
  onClose: () => console.log("Tour closed"),
  steps: [
    {
      element: "#hooks-step-1",
      title: "Step 1 Lifecycle",
      description: "Inspect the live event log console below to see events firing in real time.",
      position: "bottom",
      onEnter: () => console.log("Entering step 1"),
      onLeave: () => console.log("Leaving step 1"),
    },
    {
      element: "#hooks-step-2",
      title: "Step 2 Lifecycle",
      description: "Triggering onEnter and stepChange events.",
      position: "bottom",
    },
  ],
});

// Event emitter listener
tour.on("stepChange", ({ step, index }) => {
  // Sync with your analytics or backend telemetry
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  onStart: () => console.log("onStart"),
  onStepChange: (step, i) => console.log("onStepChange: " + i),
  onComplete: () => console.log("onComplete"),
  steps: [
    { element: "#hooks-step-1", title: "Step 1", position: "bottom" },
    { element: "#hooks-step-2", title: "Step 2", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "multi-page-tour",
    title: "Multi-Page Tour (Cross-Route Flow)",
    category: "lifecycle",
    badge: "Cross-Route",
    description:
      "Guide users across multiple pages or routes while maintaining tour completion status via persistent storage adapters.",
    targetSelector: "#multipage-step-1",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Multi-page tour with automatic completion tracking
const tour = new WebDrive({
  id: "saas-multipage-onboarding",
  remember: true, // Persists completion in localStorage
  steps: [
    {
      element: "#multipage-step-1",
      title: "Cross-Route Walkthrough",
      description: "This tour tracks completion in localStorage. Once finished, it won't repeat automatically on reload.",
      position: "bottom",
      doneButtonText: "Got It",
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  id: "multipage-flow",
  remember: true,
  steps: [
    {
      element: "#multipage-step-1",
      title: "Multi-Page Tour",
      description: "Maintains completion in localStorage.",
      position: "bottom",
    },
  ],
});
tour.start();`,
  },
];
