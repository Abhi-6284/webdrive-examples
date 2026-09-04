import type { WebDriveStep } from "webdrive";

export const DASHBOARD_TOUR_ID = "saas-dashboard-onboarding-v1";

export const dashboardTourSteps: WebDriveStep[] = [
  {
    element: "#dashboard-sidebar",
    title: "🧭 Sidebar Navigation",
    description: "Switch seamlessly between your Analytics overview, billing statements, team permissions, and API tokens.",
    position: "right",
    align: "start",
  },
  {
    element: "#metrics-grid",
    title: "📊 Real-Time Metrics",
    description: "Track Monthly Recurring Revenue (MRR), active user velocity, customer retention, and subscription churn.",
    position: "bottom",
    align: "center",
  },
  {
    element: "#recent-activity-card",
    title: "⚡ Live Activity Stream",
    description: "Inspect inbound webhooks, user signups, and transaction logs in real time.",
    position: "top",
    align: "center",
  },
  {
    element: "#profile-menu-trigger",
    title: "👤 Account & Preferences",
    description: "Access your profile settings, switch color schemes, manage organizations, and log out.",
    position: "bottom",
    align: "end",
  },
];
