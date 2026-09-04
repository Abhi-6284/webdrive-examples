import React from "react";
import { Check, X, Minus } from "lucide-react";

export function ComparisonTable() {
  const rows = [
    {
      feature: "Zero Runtime Dependencies",
      webdrive: true,
      driver: true,
      shepherd: false, // requires floating-ui / popper
      intro: true,
    },
    {
      feature: "100% Next.js SSR Safe",
      webdrive: true,
      driver: false, // can fail with window is not defined in RSC
      shepherd: false,
      intro: false,
    },
    {
      feature: "Non-Destructive SVG Cutout",
      webdrive: true,
      driver: true,
      shepherd: false,
      intro: false, // alters z-index of target
    },
    {
      feature: "Native shadcn/ui & Tailwind Tokens",
      webdrive: true,
      driver: false,
      shepherd: false,
      intro: false,
    },
    {
      feature: "Built-in AI Agent Skill",
      webdrive: true,
      driver: false,
      shepherd: false,
      intro: false,
    },
    {
      feature: "Smart Boundary Auto-Flip & Clamping",
      webdrive: true,
      driver: true,
      shepherd: true,
      intro: false,
    },
    {
      feature: "Strict TypeScript First (.d.ts bundle)",
      webdrive: true,
      driver: true,
      shepherd: true,
      intro: false,
    },
  ];

  return (
    <section id="comparison" className="py-20 border-t bg-muted/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose WebDrive?
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-lg mx-auto">
            Engineered for modern frontend stacks, zero hydration bugs, and modern design systems.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-4 px-6">Feature</th>
                  <th className="py-4 px-6 text-primary font-bold">WebDrive</th>
                  <th className="py-4 px-6 text-muted-foreground">Driver.js</th>
                  <th className="py-4 px-6 text-muted-foreground">Shepherd.js</th>
                  <th className="py-4 px-6 text-muted-foreground">Intro.js</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-foreground">{row.feature}</td>
                    <td className="py-3.5 px-6 font-semibold text-primary">
                      <Check className="h-5 w-5 text-emerald-500" />
                    </td>
                    <td className="py-3.5 px-6 text-muted-foreground">
                      {row.driver ? (
                        <Check className="h-4 w-4 text-emerald-600/70" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-muted-foreground">
                      {row.shepherd ? (
                        <Check className="h-4 w-4 text-emerald-600/70" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-muted-foreground">
                      {row.intro ? (
                        <Check className="h-4 w-4 text-emerald-600/70" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
