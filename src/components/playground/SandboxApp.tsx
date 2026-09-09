"use client";

import React from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Rocket,
  ArrowRight,
  LayoutDashboard,
  FileText,
  Settings,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SandboxApp() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b px-4 py-2.5 bg-muted/30">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-muted-foreground ml-2">
            acme-dashboard.app
          </span>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono">
          sandbox v2
        </Badge>
      </div>

      {/* App body */}
      <div className="flex" style={{ minHeight: 340 }}>
        {/* Sidebar */}
        <div
          id="pg-nav"
          className="w-36 shrink-0 border-r border-border bg-muted/20 p-3 flex flex-col gap-1"
        >
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Workspace
          </div>
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: TrendingUp, label: "Analytics", active: false },
            { icon: Users, label: "Users", active: false },
            { icon: FileText, label: "Reports", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium w-full text-left transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}

          <div className="mt-auto pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 px-1">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                A
              </div>
              <div>
                <div className="text-[10px] font-semibold text-foreground leading-none">Admin</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">Pro plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 space-y-4 overflow-hidden">
          {/* Search */}
          <div
            id="pg-search"
            className="rounded-lg border border-border bg-background/80 px-3 py-2 flex items-center justify-between gap-3 shadow-xs hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-muted-foreground flex-1">
              <Search className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-xs text-foreground font-medium">
                Quick search projects, teams, metrics…
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shrink-0">
              ⌘K
            </kbd>
          </div>

          {/* Metric cards row */}
          <div className="grid grid-cols-2 gap-3">
            {/* ARR Card */}
            <div
              id="pg-metric-arr"
              className="rounded-lg border border-border bg-background/90 p-3 shadow-xs hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Monthly ARR
                </span>
                <div className="rounded-md bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                </div>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-foreground">$48,290</span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">+18.4%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Updated 2m ago · Stripe Sync</p>
            </div>

            {/* MAU Card */}
            <div
              id="pg-metric-mau"
              className="rounded-lg border border-border bg-background/90 p-3 shadow-xs hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Monthly Active
                </span>
                <div className="rounded-md bg-blue-500/10 p-1 text-blue-600 dark:text-blue-400">
                  <Users className="h-3 w-3" />
                </div>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-foreground">1,240</span>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">+7.2%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Last 30 days · Segment</p>
            </div>
          </div>

          {/* Events table */}
          <div
            id="pg-table"
            className="rounded-lg border border-border bg-background/90 shadow-xs overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 bg-muted/20">
              <span className="text-[11px] font-semibold text-foreground">Recent Events</span>
              <span className="text-[10px] text-muted-foreground font-mono">Live · 3 new</span>
            </div>
            <div className="divide-y divide-border/40">
              {[
                { user: "alex@acme.com", event: "Signup", time: "2m ago", status: "Active", color: "emerald" },
                { user: "sam@corp.io", event: "Upgrade → Pro", time: "5m ago", status: "Pro", color: "blue" },
                { user: "riley@startup.co", event: "API Key Created", time: "12m ago", status: "Active", color: "emerald" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-1.5 text-[10px]">
                  <span className="text-muted-foreground font-mono truncate max-w-[100px]">{row.user}</span>
                  <span className="text-foreground font-medium">{row.event}</span>
                  <span className="text-muted-foreground">{row.time}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full font-semibold text-${row.color}-600 dark:text-${row.color}-400 bg-${row.color}-500/10`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deploy CTA */}
          <div
            id="pg-action"
            className="rounded-lg border border-border bg-background/90 p-3 shadow-xs hover:border-primary/40 transition-colors flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                Production Deployment
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Triggers blue/green release to all edge regions.
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <Shield className="h-3 w-3" />
                All checks passed
              </div>
              <Button size="sm" className="h-7 px-3 text-xs gap-1 font-semibold">
                Deploy
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
