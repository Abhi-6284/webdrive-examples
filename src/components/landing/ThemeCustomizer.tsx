"use client";

import React, { useState } from "react";

export interface ThemeOption {
  name: string;
  primary: string;
  hsl: string;
  darkHsl?: string;
  darkPrimary?: string;
}

export const THEME_PALETTES: ThemeOption[] = [
  { name: "Default Blue", primary: "#2563eb", hsl: "221.2 83.2% 53.3%" },
  { name: "Violet", primary: "#7c3aed", hsl: "262.1 83.3% 57.8%" },
  { name: "Emerald", primary: "#059669", hsl: "160 84% 39%" },
  { name: "Rose", primary: "#e11d48", hsl: "346.8 77.2% 49.8%" },
  { name: "Amber", primary: "#d97706", hsl: "37.7 92.1% 50.2%" },
  {
    name: "Shadcn Slate",
    primary: "#0f172a",
    hsl: "222.2 47.4% 11.2%",
    darkHsl: "210 40% 98%",
    darkPrimary: "#f8fafc",
  },
];

export function applyGlobalTheme(theme: ThemeOption) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isDark =
    root.classList.contains("dark") ||
    root.getAttribute("data-theme") === "dark";

  const hsl = isDark && theme.darkHsl ? theme.darkHsl : theme.hsl;
  const fg = isDark && theme.darkHsl ? "222.2 47.4% 11.2%" : "210 40% 98%";

  // Dynamically update the website's Tailwind / shadcn primary tokens
  root.style.setProperty("--primary", hsl);
  root.style.setProperty("--ring", hsl);
  root.style.setProperty("--primary-foreground", fg);

  // Dynamically update WebDrive's tour engine primary tokens
  root.style.setProperty("--webdrive-primary", `hsl(${hsl})`);
  root.style.setProperty("--webdrive-primary-foreground", `hsl(${fg})`);

  // Remove any legacy inline --webdrive-border so CSS hsl(var(--border)) handles it automatically
  root.style.removeProperty("--webdrive-border");

  try {
    localStorage.setItem("webdrive_palette", theme.name);
    window.dispatchEvent(
      new CustomEvent("webdrive_palette_changed", { detail: theme.name })
    );
  } catch {
    // ignore
  }
}

export function ThemeCustomizer() {
  const [selected, setSelected] = useState<ThemeOption>(THEME_PALETTES[0]);

  // Restore stored palette preference if present
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("webdrive_palette");
      if (stored) {
        const found = THEME_PALETTES.find((p) => p.name === stored);
        if (found) {
          setSelected(found);
          applyGlobalTheme(found);
        }
      }
    } catch {
      // ignore
    }

    const handlePaletteChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const found = THEME_PALETTES.find((p) => p.name === customEvent.detail);
        if (found) setSelected(found);
      }
    };

    window.addEventListener("webdrive_palette_changed", handlePaletteChange);
    return () => {
      window.removeEventListener("webdrive_palette_changed", handlePaletteChange);
    };
  }, []);

  const handleSelect = (theme: ThemeOption) => {
    setSelected(theme);
    applyGlobalTheme(theme);
  };

  return (
    <div
      id="theme-customizer-box"
      className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/90 px-4 py-2 shadow-sm backdrop-blur transition-colors"
    >
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Live Palette:
      </span>
      <div className="flex items-center gap-2">
        {THEME_PALETTES.map((th) => (
          <button
            key={th.name}
            onClick={() => handleSelect(th)}
            style={{ backgroundColor: th.primary }}
            className={`h-5 w-5 rounded-full transition-all ${
              selected.name === th.name
                ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "opacity-80 hover:opacity-100 hover:scale-110"
            }`}
            title={th.name}
            type="button"
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground">{selected.name}</span>
    </div>
  );
}
