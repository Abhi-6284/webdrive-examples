"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";

interface ThemeToggleProps {
  showLabel?: boolean;
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "icon" | "default";
  className?: string;
}

export function ThemeToggle({
  showLabel = false,
  variant = "ghost",
  size = "icon",
  className = "",
}: ThemeToggleProps) {
  const { isDark, isSystem, toggleTheme, setSystem, mounted } = useTheme();

  // Prevent hydration mismatch during initial mount
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`text-muted-foreground ${className}`}
        disabled
        aria-label="Toggle theme"
      >
        <Moon className="h-4 w-4 opacity-50" />
        {showLabel && <span className="ml-1.5 text-xs">Theme</span>}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      onContextMenu={(e) => {
        e.preventDefault();
        setSystem();
      }}
      className={`text-muted-foreground hover:text-foreground transition-colors ${className}`}
      aria-label={`Toggle theme (Current: ${isDark ? "Dark" : "Light"}${isSystem ? " - System" : ""})`}
      title={`Current: ${isDark ? "Dark" : "Light"}${isSystem ? " (System)" : ""} • Right-click to follow OS`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 rotate-0" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 transition-transform duration-200 rotate-0" />
      )}
      {showLabel && (
        <span className="ml-1.5 text-xs font-medium">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </Button>
  );
}
