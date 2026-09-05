import React from "react";
import { WebDriveVersionBadge } from "@/components/common/WebDriveVersionBadge";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function Sidebar() {
  const navItems = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Analytics", icon: BarChart3 },
    { label: "Customers", icon: Users },
    { label: "Billing & Plans", icon: CreditCard },
    { label: "API Integrations", icon: Zap },
    { label: "Security & Tokens", icon: ShieldCheck },
    { label: "Settings", icon: Settings },
  ];

  return (
    <aside
      id="dashboard-sidebar"
      className="flex h-screen w-64 flex-col border-r bg-card px-4 py-6 transition-colors flex-shrink-0"
    >
      {/* Brand Logo */}
      <div className="mb-8 flex items-center gap-2.5 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow">
          W
        </div>
        <div>
          <span className="font-bold text-base tracking-tight text-foreground">
            WebDrive
          </span>
          <WebDriveVersionBadge variant="tag" className="ml-1.5" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5">
        <div className="px-3 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                item.active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="rounded-lg border border-border/60 bg-background/50 p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">WebDrive Showcase</p>
        <p className="text-[11px]">Framework-Agnostic UI Tours</p>
      </div>
    </aside>
  );
}
