"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock, Sparkles } from "lucide-react";

export function RecentActivity() {
  const [showAsyncElement, setShowAsyncElement] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateAsyncLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setShowAsyncElement(true);
      setLoading(false);
    }, 800);
  };

  const activities = [
    {
      id: "ACT-1",
      title: "Enterprise tier subscription upgraded",
      user: "Stripe Webhook #90842",
      time: "2 minutes ago",
      status: "success",
      badge: "+$2,400/yr",
    },
    {
      id: "ACT-2",
      title: "New team members invited (5 seats)",
      user: "sarah.connor@acme.corp",
      time: "14 minutes ago",
      status: "info",
      badge: "Team",
    },
    {
      id: "ACT-3",
      title: "SSL Certificate auto-renewed successfully",
      user: "Cloudflare Edge #US-East",
      time: "48 minutes ago",
      status: "success",
      badge: "Security",
    },
    {
      id: "ACT-4",
      title: "Production database backup snapshot verified",
      user: "AWS RDS Automated Backup",
      time: "2 hours ago",
      status: "success",
      badge: "System",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Activity Feed */}
      <Card id="recent-activity-card" className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Live System Events</CardTitle>
            <CardDescription className="text-xs">Real-time webhook and audit transactions</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Stream
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            {activities.map((act) => (
              <div key={act.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{act.title}</p>
                    <p className="text-xs text-muted-foreground">{act.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-[11px] font-medium">
                    {act.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Element Showcase */}
      <Card id="dynamic-element-card" className="flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-1.5 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-semibold">Async Elements</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Test how WebDrive handles elements that load asynchronously.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Clicking below simulates an API response that renders a new DOM element after a delay. WebDrive's <code>missingElementBehavior: &quot;wait&quot;</code> automatically observes and attaches to it!
          </p>

          {showAsyncElement && (
            <div
              id="dynamic-async-banner"
              className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-foreground animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex items-center gap-2 font-semibold text-primary">
                <AlertCircle className="h-4 w-4" />
                <span>Asynchronous Widget Loaded</span>
              </div>
              <p className="mt-1 text-muted-foreground text-[11px]">
                ID: <code>#dynamic-async-banner</code>. Successfully detected and ready for tour highlighting.
              </p>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={simulateAsyncLoad}
            disabled={loading || showAsyncElement}
            className="w-full"
          >
            {loading ? "Fetching Async Data..." : showAsyncElement ? "Widget Mounted ✔" : "Simulate Async Load"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
