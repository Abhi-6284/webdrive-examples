# WebDrive Examples & Framework Showcases

> **Production-ready reference implementations, guides, and integration patterns for [`webdrive`](https://www.npmjs.com/package/webdrive) — the framework-agnostic TypeScript UI tour library.**

[![npm version](https://img.shields.io/npm/v/webdrive.svg?style=flat-square)](https://www.npmjs.com/package/webdrive)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js LTS](https://img.shields.io/badge/Next.js-LTS_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-black?style=flat-square)](https://ui.shadcn.com/)

This repository demonstrates how to integrate **[`webdrive`](https://www.npmjs.com/package/webdrive)** in real-world web applications. It features a flagship **Next.js LTS App Router** SaaS dashboard with **shadcn/ui**, along with companion showcases for Vanilla JS, React, and Vue.

---

## 📚 Master Documentation

Before diving into code, check out our in-depth design and architecture specifications:

- 📋 **[`Plan.md`](./Plan.md)** — Project vision, milestone roadmap, use cases, and testing strategy.
- 🎨 **[`Design.md`](./Design.md)** — UI/UX design tokens, shadcn/ui color mapping, mobile ergonomics, and accessibility.
- 🏗️ **[`Architecture.md`](./Architecture.md)** — Next.js Server Components, client boundaries, `useWebDrive` hook architecture, and SSR safety.

---

## 🌟 What's Included

### 1. Flagship: Next.js LTS App Router (`src/`)
A modern SaaS Analytics Dashboard built with:
- **Next.js 14/15 LTS** (App Router with `src/` directory layout)
- **shadcn/ui** components (Button, Card, Badge, Avatar)
- **Tailwind CSS** with complete light & dark mode support
- Custom **`useWebDrive`** React hook
- Interactive multi-step tour highlighting navigation, key metrics, dynamic activity feed, and user profile

### 2. Companion Framework Showcases (`examples/`)
- **`examples/01-vanilla-saas/`**: Standalone HTML/CSS/JS dashboard requiring zero build tools.
- **`examples/02-react-vite/`**: Minimalist React 18+ TypeScript project using Vite.
- **`examples/03-vue-composition/`**: Vue 3 application using the Composition API and `useTour()` composable.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

*(Note: installs [`webdrive`](https://www.npmjs.com/package/webdrive) directly from NPM).*

### 2. Run the Flagship Next.js Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Click **"Start Product Tour"** in the header to trigger the guided onboarding tour.
- Toggle **Dark Mode** to see the tour theme update instantly via CSS variables.
- Press **Escape** or use the **Arrow Keys** (`ArrowRight`, `ArrowLeft`) to navigate.
- Click **"Reset Tour"** to clear stored `localStorage` completion and replay.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 💻 Code Example: Next.js Client Component

Here is how simple it is to use `webdrive` in a Next.js App Router project:

```tsx
"use client";

import { useWebDrive } from "@/hooks/useWebDrive";
import { Button } from "@/components/ui/button";
import "webdrive/styles.css";

export function OnboardingTour() {
  const { start, reset, isActive } = useWebDrive({
    id: "nextjs-dashboard-tour",
    remember: true,
    steps: [
      {
        element: "#sidebar",
        title: "Navigation",
        description: "Switch between dashboard views, invoices, and analytics.",
        position: "right",
      },
      {
        element: "#metrics-grid",
        title: "Key Metrics",
        description: "Monitor revenue velocity and customer retention in real time.",
        position: "bottom",
      },
      {
        element: "#profile-menu",
        title: "Account Settings",
        description: "Manage security keys, billing, and team members.",
        position: "left",
      },
    ],
  });

  return (
    <div className="flex gap-2">
      <Button onClick={() => start()} disabled={isActive}>
        Start Tour
      </Button>
      <Button variant="outline" onClick={() => reset()}>
        Reset
      </Button>
    </div>
  );
}
```

---

## 🎨 Theming with shadcn/ui

In `src/app/globals.css`, WebDrive CSS variables map directly to shadcn/ui HSL design tokens:

```css
:root {
  --webdrive-background: hsl(var(--card));
  --webdrive-foreground: hsl(var(--card-foreground));
  --webdrive-border: hsl(var(--border));
  --webdrive-primary: hsl(var(--primary));
  --webdrive-primary-foreground: hsl(var(--primary-foreground));
  --webdrive-muted: hsl(var(--muted-foreground));
  --webdrive-radius: var(--radius);
}
```

When you toggle dark mode (`.dark`), WebDrive's popover, buttons, and borders adapt instantly with zero manual style overrides!

---

## 📄 License

MIT © [webdrive](https://github.com/Abhi-6284/webdrive-examples)
