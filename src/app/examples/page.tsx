import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ExamplesClient } from "@/components/examples/ExamplesClient";
import { Badge } from "@/components/ui/badge";
import { NpmDownloadsBadge } from "@/components/common/NpmDownloadsBadge";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Tour Examples & Recipes — WebDrive",
  description:
    "Explore 16+ interactive examples and code recipes for WebDrive: animated tours, static cutouts, async steps, custom popovers, feature hints, and lifecycle hooks.",
};

export default function ExamplesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Page Hero Header */}
        <div className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-12 md:py-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 mb-4">
              <Badge
                variant="outline"
                className="px-3 py-1 text-xs font-medium gap-1.5 border-primary/30 bg-primary/5 text-primary backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>16 Interactive Tour Recipes</span>
              </Badge>

              <NpmDownloadsBadge variant="pill" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              WebDrive Interactive Examples
            </h1>

            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore 16 self-contained walkthrough recipes. Each example features its own dedicated interactive target sandbox, live demo runner, and copyable TypeScript & JavaScript implementation.
            </p>
          </div>
        </div>

        {/* Client Interactive Explorer */}
        <div className="container mx-auto px-4 max-w-6xl pt-8">
          <ExamplesClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
