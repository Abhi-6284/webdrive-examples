"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState<boolean>(false);

  // Apply theme class to <html> and update localStorage
  const applyTheme = useCallback((targetTheme: Theme) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark =
      targetTheme === "dark" ||
      (targetTheme === "system" && systemPrefersDark);

    if (isDark) {
      root.classList.add("dark");
      setResolvedTheme("dark");
    } else {
      root.classList.remove("dark");
      setResolvedTheme("light");
    }

    if (targetTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", targetTheme);
    }
    setThemeState(targetTheme);
  }, []);

  useEffect(() => {
    setMounted(true);

    // 1. Read existing theme from localStorage
    let storedTheme: Theme = "system";
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        storedTheme = stored;
      }
    } catch {
      // ignore
    }
    setThemeState(storedTheme);

    // 2. Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark =
      storedTheme === "dark" ||
      (storedTheme === "system" && mediaQuery.matches);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      setResolvedTheme("dark");
    } else {
      root.classList.remove("dark");
      setResolvedTheme("light");
    }

    // 3. Listen for real-time OS system theme changes
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const currentStored = localStorage.getItem("theme");
        if (!currentStored) {
          // In system mode: dynamically follow OS theme
          if (e.matches) {
            root.classList.add("dark");
            setResolvedTheme("dark");
          } else {
            root.classList.remove("dark");
            setResolvedTheme("light");
          }
        }
      } catch {
        // ignore
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    // 4. Listen for storage changes across different tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const next = (e.newValue as Theme) || "system";
        applyTheme(next);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [applyTheme]);

  // Toggle between light and dark (persists in localStorage)
  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = resolvedTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  }, [resolvedTheme, applyTheme]);

  // Reset to system preference (removes localStorage override)
  const setSystem = useCallback(() => {
    applyTheme("system");
  }, [applyTheme]);

  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    isSystem: theme === "system",
    mounted,
    toggleTheme,
    setTheme: applyTheme,
    setSystem,
  };
}
