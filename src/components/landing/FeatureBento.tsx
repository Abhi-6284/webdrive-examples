import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shield, Compass, Server, Bot, Accessibility, Database } from "lucide-react";

export function FeatureBento() {
  const features = [
    {
      icon: Shield,
      title: "Non-Destructive SVG Mask",
      description:
        "Never alters your target element's z-index, transform, or stacking context. Uses a fullscreen SVG cutout mask with rounded corners.",
    },
    {
      icon: Compass,
      title: "Dedicated Positioning Engine",
      description:
        "Automatically detects viewport boundaries, smartly flips to opposite or orthogonal sides, and clamps coordinates inside margins.",
    },
    {
      icon: Server,
      title: "100% SSR-Safe for Next.js",
      description:
        "Zero access to window, document, or localStorage during module evaluation. Completely safe in Next.js Server Components and Node.js.",
    },
    {
      icon: Bot,
      title: "Built-in AI Agent Skill",
      description:
        "Includes an official Agent Skill for Antigravity, Claude Code, Cursor, and Copilot. Run npx webdrive install-skill to enable it instantly.",
    },
    {
      icon: Accessibility,
      title: "Accessible by Design",
      description:
        "Full ARIA dialog semantics (role='dialog', aria-modal), keyboard trapping, visible focus rings, and automatic focus restoration.",
    },
    {
      icon: Database,
      title: "Persistent State & Adapters",
      description:
        "Namespaced localStorage tracking remembers completed tours so users aren't repeated. Supports custom async storage adapters.",
    },
  ];

  return (
    <section id="features" className="py-20 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineered for Production Web Apps
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto">
            Everything you need for guided product tours without the technical debt of legacy libraries.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="transition-all hover:shadow-md hover:border-primary/40">
                <CardHeader>
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary w-fit mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
