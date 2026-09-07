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
  driverJsRef?: string;
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
    driverJsRef: "https://driverjs.com/docs/animated-tour",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: true, // Enables smooth SVG cutout transitions
  showProgress: true,
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: true,
  showProgress: true,
  steps: [
    { element: "#playground-primary-btn", title: "Action Button", description: "Smooth animation.", position: "bottom" },
    { element: "#playground-analytics-card", title: "Analytics Widget", description: "Cutout morphs size.", position: "left" },
    { element: "#playground-search-input", title: "Search Bar", description: "Zero layout shift.", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/static-tour",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: false, // Disables all transitions for instant snapping
  showProgress: true,
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: false,
  showProgress: true,
  steps: [
    { element: "#playground-search-input", title: "Instant Snap", description: "Zero animation latency.", position: "bottom" },
    { element: "#playground-primary-btn", title: "Direct Focus", description: "High-performance snapping.", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/simple-highlight",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Spotlight a single element with no popover dialog
const tour = new WebDrive({
  allowClose: true,
  showButtons: false,
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  allowClose: true,
  showButtons: false,
  steps: [
    {
      element: "#playground-primary-btn",
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
    driverJsRef: "https://driverjs.com/docs/simple-highlight",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  steps: [
    {
      element: "#playground-primary-btn",
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
    driverJsRef: "https://driverjs.com/docs/popover-position",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  animate: true,
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  animate: true,
  steps: [
    { element: "#playground-positioning-target", title: "Top", position: "top", align: "center" },
    { element: "#playground-positioning-target", title: "Right", position: "right", align: "center" },
    { element: "#playground-positioning-target", title: "Bottom", position: "bottom", align: "center" },
    { element: "#playground-positioning-target", title: "Left", position: "left", align: "center" },
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
    driverJsRef: "https://driverjs.com/docs/styling-popover",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  nextButtonText: "Continue →",
  previousButtonText: "← Go Back",
  doneButtonText: "Complete Setup 🚀",
  closeButtonText: "Dismiss",
  steps: [
    {
      element: "#playground-custom-card",
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
      element: "#playground-custom-card",
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
    driverJsRef: "https://driverjs.com/docs/styling-overlay",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  overlayColor: "rgba(30, 27, 75, 0.85)", // Deep indigo brand overlay
  overlayOpacity: 0.85,
  steps: [
    {
      element: "#playground-analytics-card",
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
    { element: "#playground-analytics-card", title: "Indigo Backdrop", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/hints",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Attach a beacon hint to any element
function openFeatureHint() {
  const tour = new WebDrive({
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
  tour.start();
}`,
    codeJs: `function openFeatureHint() {
  const tour = new WebDrive({
    steps: [
      {
        element: "#playground-beacon-target",
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
    driverJsRef: "https://driverjs.com/docs/async-tour",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  missingElementBehavior: "wait", // Observes DOM mutations until element appears
  missingElementWaitTimeout: 5000,
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
    { element: "#playground-async-container", title: "Step 1", position: "bottom" },
    { element: "#playground-dynamic-async-widget", title: "Step 2: Mounted Async", position: "top" },
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
    driverJsRef: "https://driverjs.com/docs/modal",
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  steps: [
    {
      element: "#centered-modal-anchor",
      title: "👋 Welcome",
      description: "Centered welcome dialog without target cutout.",
      position: "bottom",
      nextButtonText: "Start →",
    },
    { element: "#playground-primary-btn", title: "Step 2", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/prevent-destroy",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  allowClose: false, // Disables backdrop click and close button
  closeOnEscape: false, // Disables ESC key closing
  keyboardNavigation: true,
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

tour.start();`,
    codeJs: `const tour = new WebDrive({
  allowClose: false,
  closeOnEscape: false,
  steps: [
    { element: "#playground-primary-btn", title: "Step 1: Required", position: "bottom" },
    { element: "#playground-search-input", title: "Step 2: Required", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/confirm-on-exit",
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
      element: "#playground-analytics-card",
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
    { element: "#playground-analytics-card", title: "Confirm on Exit", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/interactive-tour",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  steps: [
    {
      element: "#playground-interactive-input",
      title: "Interactive Requirement",
      description: "Please type 'hello' into this input field to unlock the Next step.",
      position: "bottom",
      showNextButton: false, // Hidden until input is valid
      onEnter: () => {
        const input = document.querySelector("#playground-interactive-input") as HTMLInputElement;
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
      element: "#playground-primary-btn",
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
      element: "#playground-interactive-input",
      title: "Type Something",
      description: "Type in the box to advance.",
      showNextButton: false,
      onEnter: () => {
        const input = document.querySelector("#playground-interactive-input");
        input?.addEventListener("input", () => tour.next(), { once: true });
      },
    },
    { element: "#playground-primary-btn", title: "Unlocked!", position: "bottom" },
  ],
});
tour.start();`,
  },
  {
    id: "tour-progress",
    title: "Tour Progress (Custom Formatter)",
    category: "lifecycle",
    badge: "Ergonomics",
    description:
      "Display step progression numbers with custom formatting, such as 'Step 2 of 4 • 50% completed'.",
    driverJsRef: "https://driverjs.com/docs/tour-progress",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  showProgress: true,
  // Custom progress string formatter
  renderProgress: (current, total) => {
    const percent = Math.round((current / total) * 100);
    return \`Step \${current} of \${total} (\${percent}%)\`;
  },
  steps: [
    { element: "#playground-primary-btn", title: "Custom Progress 1/3", position: "bottom" },
    { element: "#playground-analytics-card", title: "Custom Progress 2/3", position: "left" },
    { element: "#playground-search-input", title: "Custom Progress 3/3", position: "bottom" },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  showProgress: true,
  renderProgress: (current, total) => \`Step \${current} of \${total} (\${Math.round(current / total * 100)}%)\`,
  steps: [
    { element: "#playground-primary-btn", title: "Step 1", position: "bottom" },
    { element: "#playground-analytics-card", title: "Step 2", position: "left" },
    { element: "#playground-search-input", title: "Step 3", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/hooks",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  onStart: () => console.log("Tour started"),
  onStepChange: (step, index) => console.log(\`Moved to step \${index + 1}\`),
  onComplete: () => console.log("Tour completed"),
  onClose: () => console.log("Tour closed"),
  steps: [
    {
      element: "#playground-primary-btn",
      title: "Step 1 Lifecycle",
      description: "Inspect the live event log console below to see events firing in real time.",
      position: "bottom",
      onEnter: () => console.log("Entering step 1"),
      onLeave: () => console.log("Leaving step 1"),
    },
    {
      element: "#playground-search-input",
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
  onStart: () => logEvent("onStart"),
  onStepChange: (step, i) => logEvent("onStepChange: " + i),
  onComplete: () => logEvent("onComplete"),
  steps: [
    { element: "#playground-primary-btn", title: "Step 1", position: "bottom" },
    { element: "#playground-search-input", title: "Step 2", position: "bottom" },
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
    driverJsRef: "https://driverjs.com/docs/multi-page-tour",
    codeTs: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

// Multi-page tour with automatic completion tracking
const tour = new WebDrive({
  id: "saas-multipage-onboarding",
  remember: true, // Persists completion in localStorage
  steps: [
    {
      element: "#playground-analytics-card",
      title: "Multi-Page Step 1",
      description: "This tour tracks completion in localStorage. Once finished, it won't repeat automatically on reload.",
      position: "bottom",
      nextButtonText: "Go to Dashboard →",
      onLeave: () => {
        // You can programmatically navigate using router.push("/dashboard")
      },
    },
  ],
});

tour.start();`,
    codeJs: `const tour = new WebDrive({
  id: "multipage-flow",
  remember: true,
  steps: [
    {
      element: "#playground-analytics-card",
      title: "Multi-Page Tour",
      description: "Maintains completion in localStorage.",
      position: "bottom",
    },
  ],
});
tour.start();`,
  },
];
