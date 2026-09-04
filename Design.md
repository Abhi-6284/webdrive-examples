# UI/UX Design System Specification: WebDrive & shadcn/ui

> **Comprehensive design specifications, theme token mapping, responsive ergonomics, and accessibility standards for integrating [`webdrive`](https://www.npmjs.com/package/webdrive) with shadcn/ui and Tailwind CSS.**

---

## 1. UI/UX Principles for Onboarding Tours

Guided tours can significantly boost user activation and feature adoption when designed thoughtfully. However, intrusive or rigid tours lead to immediate user frustration ("tour fatigue"). `webdrive` and this showcase adhere to four core UX guidelines:

1. **User Autonomy**: Users must always have the freedom to dismiss or exit the tour instantly via the Close button, Escape key, or overlay backdrop click.
2. **Contextual Relevance**: Each step must highlight a distinct, actionable piece of UI with concise micro-copy (1–2 sentences maximum).
3. **Non-Destructive Stacking**: The underlying application must remain visually pristine. Elements must never be forced into awkward `z-index` battles or broken transformed contexts.
4. **Orientation & Progress**: The user should always know where they are in the sequence (e.g. `2 / 4`) and what step is coming next.

---

## 2. Design Token Synchronization: WebDrive + shadcn/ui

`webdrive` is styled entirely through standard CSS Custom Properties. By binding these variables to shadcn/ui's HSL color system in `globals.css`, WebDrive automatically inherits your brand palette, borders, shadows, and dark mode states without extra CSS.

### Theme Token Mapping Matrix

| WebDrive Variable | shadcn/ui Token | Light Mode Value | Dark Mode Value |
| :--- | :--- | :--- | :--- |
| `--webdrive-background` | `hsl(var(--card))` | `#ffffff` | `#090d16` (slate-950) |
| `--webdrive-foreground` | `hsl(var(--card-foreground))` | `#0f172a` (slate-900) | `#f8fafc` (slate-50) |
| `--webdrive-border` | `hsl(var(--border))` | `#e2e8f0` (slate-200) | `#1e293b` (slate-800) |
| `--webdrive-primary` | `hsl(var(--primary))` | `#2563eb` (blue-600) | `#3b82f6` (blue-500) |
| `--webdrive-primary-foreground`| `hsl(var(--primary-foreground))` | `#ffffff` | `#ffffff` |
| `--webdrive-muted` | `hsl(var(--muted-foreground))` | `#64748b` (slate-500) | `#94a3b8` (slate-400) |
| `--webdrive-overlay` | Custom RGBA / HSL | `rgba(15, 23, 42, 0.6)` | `rgba(0, 0, 0, 0.75)` |
| `--webdrive-radius` | `var(--radius)` | `0.75rem` (12px) | `0.75rem` (12px) |
| `--webdrive-shadow` | Custom Elevation | `0 20px 25px -5px rgba(0,0,0,0.1)` | `0 20px 25px -5px rgba(0,0,0,0.5)` |

### CSS Integration in `src/app/globals.css`

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.75rem;

  /* Seamless WebDrive inheritance */
  --webdrive-background: hsl(var(--card));
  --webdrive-foreground: hsl(var(--card-foreground));
  --webdrive-border: hsl(var(--border));
  --webdrive-primary: hsl(var(--primary));
  --webdrive-primary-foreground: hsl(var(--primary-foreground));
  --webdrive-muted: hsl(var(--muted-foreground));
  --webdrive-radius: var(--radius);
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --border: 217.2 32.6% 17.5%;
  --webdrive-overlay: rgba(0, 0, 0, 0.75);
}
```

---

## 3. Popover Anatomy & Visual Hierarchy

The WebDrive Popover card is organized into clear functional zones:

```
┌────────────────────────────────────────────────────────┐
│  [Header] Navigation Overview               [× Close]  │
│  ────────────────────────────────────────────────────  │
│  [Content]                                             │
│  Use the collapsible sidebar to jump between your      │
│  analytics dashboard, invoices, and team settings.     │
│                                                        │
│  ────────────────────────────────────────────────────  │
│  [Footer]  [ Back ]         Step 2 of 4       [ Next ] │
└────────────────────────────────────────────────────────┘
```

1. **Header**: Contains the step title (`font-semibold text-base`) and an accessible close button (`aria-label="Close tour"`).
2. **Content Area**: Renders typography with comfortable reading line-height (`1.5`) and word wrapping.
3. **Footer Toolbar**:
   - **Back Button**: Secondary outline button (`variant="outline"`), disabled or hidden on the first step.
   - **Progress Counter**: Tabular numbers showing `Current / Total` step progress.
   - **Next / Finish Button**: Primary high-contrast button (`variant="default"`), transitioning to "Done" on the final step.
4. **Directional Arrow**: A rotated indicator aligned dynamically to point at the target element's center.

---

## 4. Cutout Geometry & Motion Curves

WebDrive avoids harsh instant cuts by interpolating transitions between steps:

- **Duration**: `280ms`
- **Timing Function**: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like deceleration curve)
- **Cutout Corner Radius**: Configured via `stageRadius` (default: `8px`) matching shadcn/ui `--radius`.
- **Stage Padding**: `8px` padding around target bounding box ensures elements never feel cramped against the dark backdrop.

---

## 5. Responsive Design & Mobile Adaptations

On small screens (viewports `< 640px`):

- **Auto Clamping**: Popover coordinates are clamped within `12px` of viewport edges to guarantee zero horizontal or vertical overflow.
- **Smart Flipping**: If a step requested `position: "right"` but the user is on mobile where horizontal space is insufficient, the positioning engine automatically flips to `"bottom"` or `"top"`.
- **Fluid Sizing**:
  ```css
  max-width: min(calc(100vw - 24px), 360px);
  width: max-content;
  ```
- **Touch-Friendly Buttons**: Button hit targets remain at least `36px` height with generous tap targets.

---

## 6. Accessibility & ARIA Matrix

| Component | ARIA Attribute | Purpose |
| :--- | :--- | :--- |
| **Popover Container** | `role="dialog"` | Declares an interactive dialog overlay to assistive tools. |
| | `aria-modal="true"` | Informs screen readers that content outside the popover is inert. |
| | `aria-labelledby="webdrive-title"` | Associates popover with the step title heading. |
| | `aria-describedby="webdrive-description"` | Associates popover with the description body. |
| **Close Button** | `aria-label="Close tour"` | Provides descriptive label for screen readers. |
| **Previous Button** | `aria-disabled="true"` | Signals disabled state on step 1 without breaking focus flow. |
| **Keyboard Trapping** | `Tab` / `Shift+Tab` | Cycles focus exclusively within active popover controls. |
| **Focus Restoration** | `document.activeElement` | Automatically returns focus to the initiating trigger upon close. |
