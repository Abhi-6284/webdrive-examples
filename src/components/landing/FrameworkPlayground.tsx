"use client";

import React from "react";
import Link from "next/link";
import { CustomPlaygroundClient } from "@/components/playground/CustomPlaygroundClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sliders, Maximize2 } from "lucide-react";

export function FrameworkPlayground() {
  return (
    <section id="playground" className="py-20 border-t bg-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Sliders className="h-3.5 w-3.5" />
              <span>Interactive Tour Studio</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Live Custom Tour Playground
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Customize motion, overlay styling, cutout radius, button labels, and placement in real-time. Test live on the sandbox and export code.
            </p>
          </div>

          <Link href="/playground">
            <Button variant="outline" size="sm" className="gap-2 h-9 px-4 text-xs font-semibold shadow-xs">
              <Maximize2 className="h-3.5 w-3.5 text-primary" />
              <span>Dedicated Playground Route</span>
            </Button>
          </Link>
        </div>

        {/* Live Interactive Customizer Studio Client */}
        <CustomPlaygroundClient />
      </div>
    </section>
  );
}
