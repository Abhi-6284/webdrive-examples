"use client";

import React, { useState } from "react";

const themes = [
  { name: "Default Blue", primary: "#2563eb", border: "#e2e8f0" },
  { name: "Shadcn Slate", primary: "#0f172a", border: "#e2e8f0" },
  { name: "Emerald", primary: "#059669", border: "#e2e8f0" },
  { name: "Violet", primary: "#7c3aed", border: "#e2e8f0" },
  { name: "Rose", primary: "#e11d48", border: "#e2e8f0" },
];

export function ThemeCustomizer() {
  const [selected, setSelected] = useState(themes[0]);

  const applyTheme = (theme: typeof themes[0]) => {
    setSelected(theme);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--webdrive-primary", theme.primary);
      document.documentElement.style.setProperty("--webdrive-border", theme.border);
    }
  };

  return (
    <div id="theme-customizer-box" className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/90 px-4 py-2 shadow-sm backdrop-blur">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Live Palette:
      </span>
      <div className="flex items-center gap-2">
        {themes.map((th) => (
          <button
            key={th.name}
            onClick={() => applyTheme(th)}
            style={{ backgroundColor: th.primary }}
            className={`h-5 w-5 rounded-full transition-all ${
              selected.name === th.name
                ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "opacity-80 hover:opacity-100"
            }`}
            title={th.name}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground">{selected.name}</span>
    </div>
  );
}
