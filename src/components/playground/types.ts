export type Framework = "nextjs" | "react" | "vue" | "vanilla";
export type Position = "bottom" | "top" | "left" | "right";
export type Alignment = "center" | "start" | "end";

export interface StepConfig {
  id: string;
  element: string;
  title: string;
  description: string;
  position: Position;
  align: Alignment;
}

export interface PlaygroundConfig {
  steps: StepConfig[];
  animate: boolean;
  showProgress: boolean;
  allowClose: boolean;
  closeOnEscape: boolean;
  overlayColor: string;
  overlayOpacity: number;
  stagePadding: number;
  stageRadius: number;
  nextButtonText: string;
  previousButtonText: string;
  doneButtonText: string;
}

export const SANDBOX_TARGETS = [
  { id: "#pg-nav", label: "Sidebar Nav" },
  { id: "#pg-search", label: "Search Bar" },
  { id: "#pg-metric-arr", label: "ARR Metric Card" },
  { id: "#pg-metric-mau", label: "MAU Metric Card" },
  { id: "#pg-table", label: "Events Table" },
  { id: "#pg-action", label: "Deploy Button" },
];

export const DEFAULT_CONFIG: PlaygroundConfig = {
  steps: [
    {
      id: "s1",
      element: "#pg-search",
      title: "🔍 Omni-Search Bar",
      description: "Instant spotlight on input fields with responsive SVG cutout masking.",
      position: "bottom",
      align: "center",
    },
    {
      id: "s2",
      element: "#pg-metric-arr",
      title: "📊 Analytics Card",
      description: "Spotlight cards with custom stage padding and smooth rounded corners.",
      position: "bottom",
      align: "center",
    },
    {
      id: "s3",
      element: "#pg-action",
      title: "🚀 Production CTA",
      description: "Guide users directly to your primary conversion or deployment action.",
      position: "top",
      align: "center",
    },
  ],
  animate: true,
  showProgress: true,
  allowClose: true,
  closeOnEscape: true,
  overlayColor: "#0f172a",
  overlayOpacity: 0.65,
  stagePadding: 8,
  stageRadius: 10,
  nextButtonText: "Next →",
  previousButtonText: "← Back",
  doneButtonText: "Finish 🎉",
};

export interface Template {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tag: string;
  config: PlaygroundConfig;
}

export const TEMPLATES: Template[] = [
  {
    id: "onboarding",
    name: "Onboarding Wizard",
    emoji: "🚀",
    description: "5-step first-run tour",
    tag: "Popular",
    config: {
      steps: [
        { id: "t1s1", element: "#pg-nav", title: "👋 Welcome to Acme!", description: "Navigate your workspace from this sidebar.", position: "right", align: "center" },
        { id: "t1s2", element: "#pg-search", title: "🔍 Quick Search", description: "Press ⌘K to find anything instantly.", position: "bottom", align: "center" },
        { id: "t1s3", element: "#pg-metric-arr", title: "📈 Revenue Overview", description: "Track your ARR growth in real-time.", position: "bottom", align: "start" },
        { id: "t1s4", element: "#pg-table", title: "📋 Recent Events", description: "Monitor live user activity as it happens.", position: "top", align: "center" },
        { id: "t1s5", element: "#pg-action", title: "🚀 Ready to Deploy?", description: "One click to push to all edge regions.", position: "top", align: "center" },
      ],
      animate: true, showProgress: true, allowClose: true, closeOnEscape: true,
      overlayColor: "#064e3b", overlayOpacity: 0.7, stagePadding: 10, stageRadius: 12,
      nextButtonText: "Next →", previousButtonText: "← Back", doneButtonText: "Get Started! 🎉",
    },
  },
  {
    id: "spotlight",
    name: "Feature Spotlight",
    emoji: "✨",
    description: "Single element highlight",
    tag: "Minimal",
    config: {
      steps: [
        { id: "t2s1", element: "#pg-metric-arr", title: "✨ New: Revenue Intelligence", description: "AI-powered ARR forecasting is now live. Click to explore.", position: "top", align: "center" },
      ],
      animate: true, showProgress: false, allowClose: true, closeOnEscape: true,
      overlayColor: "#451a03", overlayOpacity: 0.5, stagePadding: 18, stageRadius: 18,
      nextButtonText: "Explore →", previousButtonText: "← Back", doneButtonText: "Got it! 👍",
    },
  },
  {
    id: "dashboard",
    name: "Dashboard Tour",
    emoji: "📊",
    description: "Full dashboard walkthrough",
    tag: "4 Steps",
    config: {
      steps: [
        { id: "t3s1", element: "#pg-nav", title: "🗺️ Navigation Hub", description: "Access all sections from this sidebar.", position: "right", align: "start" },
        { id: "t3s2", element: "#pg-metric-arr", title: "💰 ARR Tracker", description: "Your primary revenue KPI at a glance.", position: "bottom", align: "center" },
        { id: "t3s3", element: "#pg-metric-mau", title: "👥 Monthly Active Users", description: "Engagement growth tracked monthly.", position: "bottom", align: "center" },
        { id: "t3s4", element: "#pg-action", title: "⚡ Deploy Action", description: "Ship updates instantly to production.", position: "top", align: "end" },
      ],
      animate: true, showProgress: true, allowClose: false, closeOnEscape: false,
      overlayColor: "#1e1b4b", overlayOpacity: 0.75, stagePadding: 12, stageRadius: 10,
      nextButtonText: "Continue →", previousButtonText: "← Previous", doneButtonText: "Done ✓",
    },
  },
  {
    id: "ghost",
    name: "Ghost Mode",
    emoji: "👻",
    description: "No overlay, light touch",
    tag: "Subtle",
    config: {
      steps: [
        { id: "t4s1", element: "#pg-search", title: "Try searching…", description: "Type anything to filter your workspace.", position: "bottom", align: "start" },
        { id: "t4s2", element: "#pg-metric-mau", title: "Growth is good 📈", description: "MAU up 7% this month. Keep going!", position: "bottom", align: "end" },
      ],
      animate: true, showProgress: false, allowClose: true, closeOnEscape: true,
      overlayColor: "#000000", overlayOpacity: 0.1, stagePadding: 6, stageRadius: 8,
      nextButtonText: "Next", previousButtonText: "Back", doneButtonText: "Close",
    },
  },
  {
    id: "hardcore",
    name: "Mandatory Tour",
    emoji: "🔒",
    description: "No escape, must complete",
    tag: "Locked",
    config: {
      steps: [
        { id: "t5s1", element: "#pg-nav", title: "Step 1/4 — Read this", description: "You must complete this tour before proceeding. No skipping!", position: "right", align: "center" },
        { id: "t5s2", element: "#pg-search", title: "Step 2/4 — Search first", description: "Always search before creating duplicate entries.", position: "bottom", align: "center" },
        { id: "t5s3", element: "#pg-table", title: "Step 3/4 — Review logs", description: "Check the activity log for any pending actions.", position: "top", align: "center" },
        { id: "t5s4", element: "#pg-action", title: "Step 4/4 — Deploy safely", description: "Verify all checks before hitting deploy. You got this!", position: "top", align: "center" },
      ],
      animate: true, showProgress: true, allowClose: false, closeOnEscape: false,
      overlayColor: "#020617", overlayOpacity: 0.88, stagePadding: 8, stageRadius: 6,
      nextButtonText: "I understand →", previousButtonText: "← Go back", doneButtonText: "Complete Onboarding ✓",
    },
  },
];
