"use client";

import React, { useState, useEffect } from "react";
import { OnboardingTour } from "@/components/tour/OnboardingTour";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search, Sparkles } from "lucide-react";

export function Header() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check initial dark mode preference
    if (typeof window !== "undefined") {
      const darkPref = document.documentElement.classList.contains("dark");
      setIsDark(darkPref);
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header
      id="dashboard-header"
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card/80 px-6 backdrop-blur transition-colors"
    >
      {/* Search Input */}
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects, customers..."
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* WebDrive Tour Trigger */}
        <OnboardingTour />

        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          title="Toggle Light / Dark Mode"
          className="h-9 w-9 rounded-md"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
        </Button>

        {/* Profile Menu Trigger */}
        <div
          id="profile-menu-trigger"
          className="flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background p-1 pr-3 transition-colors hover:bg-accent"
        >
          <Avatar fallback="AS" className="h-7 w-7 bg-primary text-primary-foreground text-xs" />
          <span className="text-xs font-medium text-foreground">Alex Smith</span>
        </div>
      </div>
    </header>
  );
}
