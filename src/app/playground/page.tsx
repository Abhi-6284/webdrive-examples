import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CustomPlaygroundClient } from "@/components/playground/CustomPlaygroundClient";
import { Badge } from "@/components/ui/badge";
import { NpmDownloadsBadge } from "@/components/common/NpmDownloadsBadge";
import { Sliders, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tour Studio & Live Custom Playground — WebDrive",
  description:
    "Visually customize WebDrive tours with real-time controls for motion, overlay color, opacity, cutout stage radius, button copy, and placement. Test on live sandbox targets and export copyable code.",
};

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Playground Hero Header */}
        <div className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-12 md:py-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] bg-primary/10 blur-[130px] rounded-full pointer-events-none animate-glow-breathe" />

          <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 mb-4">
              <Badge
                variant="outline"
                className="px-3 py-1 text-xs font-medium gap-1.5 border-primary/30 bg-primary/5 text-primary backdrop-blur"
              >
                <Sliders className="h-3.5 w-3.5 text-primary" />
                <span>Live Tour Customizer & Studio</span>
              </Badge>

              <NpmDownloadsBadge variant="pill" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              WebDrive Interactive Playground
            </h1>

            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Design, customize, test, and export your guided tours visually. Adjust transitions, backdrop overlays, padding, corner radius, and button copy with instant sandbox execution.
            </p>
          </div>
        </div>

        {/* Playground Interactive Workspace */}
        <div className="container mx-auto px-4 max-w-6xl pt-10">
          <CustomPlaygroundClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
