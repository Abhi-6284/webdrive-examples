"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal } from "lucide-react";

type Framework = "nextjs" | "react" | "vue" | "vanilla";

export function FrameworkPlayground() {
  const [activeTab, setActiveTab] = useState<Framework>("nextjs");
  const [copied, setCopied] = useState(false);

  const snippets: Record<Framework, { filename: string; code: string }> = {
    nextjs: {
      filename: "app/components/OnboardingTour.tsx",
      code: `"use client";

import { useEffect } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export function OnboardingTour() {
  useEffect(() => {
    const tour = new WebDrive({
      id: "nextjs-onboarding",
      remember: true,
      steps: [
        {
          element: "#sidebar",
          title: "Navigation",
          description: "Explore dashboard views and analytics.",
          position: "right",
        },
        {
          element: "#metrics",
          title: "Key Metrics",
          description: "Real-time revenue velocity and active user counts.",
          position: "bottom",
        },
      ],
      showProgress: true,
      animate: true,
    });

    tour.start();

    return () => {
      tour.destroy();
    };
  }, []);

  return null;
}`,
    },
    react: {
      filename: "src/App.tsx",
      code: `import { useWebDrive } from "@/hooks/useWebDrive";
import "webdrive/styles.css";

export function ProductTour() {
  const { start, reset, isActive } = useWebDrive({
    id: "react-app-tour",
    steps: [
      {
        element: "#dashboard-card",
        title: "Workspace Card",
        description: "Direct native DOM highlighting in React 18+.",
        position: "bottom",
      },
    ],
  });

  return (
    <button onClick={() => start(0)} disabled={isActive}>
      {isActive ? "Tour Active..." : "Start Tour"}
    </button>
  );
}`,
    },
    vue: {
      filename: "src/App.vue",
      code: `<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

let tour: WebDrive | null = null;

onMounted(() => {
  tour = new WebDrive({
    id: "vue-tour",
    steps: [
      {
        element: "#vue-header",
        title: "Vue 3 Integration",
        description: "Works with Composition API and Options API.",
        position: "bottom",
      },
    ],
  });
  tour.start();
});

onUnmounted(() => {
  tour?.destroy();
});
<\/script>`,
    },
    vanilla: {
      filename: "index.html",
      code: `import { WebDrive } from "webdrive";
import "webdrive/styles.css";

const tour = new WebDrive({
  steps: [
    {
      element: "#welcome-banner",
      title: "Welcome!",
      description: "Zero bundler required. Works with pure browser DOM.",
      position: "bottom",
    },
  ],
  showProgress: true,
  animate: true,
});

document.getElementById("start-btn").addEventListener("click", () => {
  tour.start();
});`,
    },
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 border-t bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One Library. Any Web Framework.
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto">
            Zero framework coupling. Direct browser DOM speed. Drop it into React, Next.js, Vue, or Vanilla JS.
          </p>

          {/* Framework Tab Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { id: "nextjs", label: "Next.js App Router" },
              { id: "react", label: "React 18+" },
              { id: "vue", label: "Vue 3" },
              { id: "vanilla", label: "Vanilla JS" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id as Framework)}
                className="h-9 px-4 rounded-lg text-xs font-semibold"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Code Card */}
        <div className="rounded-xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/40">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Terminal className="h-4 w-4 text-primary" />
              <span>{snippets[activeTab].filename}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>

          {/* Code block */}
          <pre className="p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-foreground bg-card">
            <code>{snippets[activeTab].code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
