import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiveVisitorsCount } from "@/components/common/LiveVisitorsBadge";
import { DollarSign, Users, ArrowUpRight, TrendingUp, Activity } from "lucide-react";

export function MetricsGrid() {
  const metrics = [
    {
      title: "Monthly Recurring Revenue",
      value: "$148,250",
      change: "+12.4%",
      changeType: "positive",
      icon: DollarSign,
      caption: "vs. last month ($131,800)",
      isLive: false,
    },
    {
      title: "Live Tour Visitors",
      value: <LiveVisitorsCount />,
      change: "Live",
      changeType: "positive",
      icon: Users,
      caption: "Active across WebDrive tours",
      isLive: true,
    },
    {
      title: "Conversion Velocity",
      value: "4.86%",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      caption: "From signup to activated tour",
      isLive: false,
    },
    {
      title: "User Retention Rate",
      value: "94.2%",
      change: "+0.8%",
      changeType: "positive",
      icon: Activity,
      caption: "90-day cohort retention",
      isLive: false,
    },
  ];

  return (
    <section id="metrics-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {metric.title}
              </CardTitle>
              <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                {metric.value}
                {metric.isLive && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                <Badge variant="secondary" className="gap-0.5 px-1.5 py-0 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 font-medium">
                  {metric.isLive ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-0.5" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3" />
                  )}
                  {metric.change}
                </Badge>
                <span className="text-muted-foreground">{metric.caption}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
