# 🎮 Playground 2.0 — "More Playable" Plan

> **Goal**: Turn `/playground` from a static config form into a genuinely fun, interactive, game-like experience that also teaches WebDrive and produces copy-paste-ready code.

---

## 🔍 Current State (What Exists)

| Feature | Status |
|---|---|
| Customizer controls (animate, overlay color, padding, radius, placement) | ✅ Done |
| 3-step sandbox with real DOM targets | ✅ Done |
| Code generator (Next.js / React / Vue / Vanilla) | ✅ Done |
| Run / Stop buttons | ✅ Done |
| Reset to defaults | ✅ Done |
| Color presets (6 colors) | ✅ Done |

**Problems with current UX:**
- Feels like a settings form, not a playground
- You change a slider → nothing visually changes until you click "Run" again
- Steps are fixed (can't add, remove, or edit them)
- No templates / presets to start from
- No shareable link — can't share your config with others
- No "undo" history
- The sandbox mock app is too simple (just 3 elements, no visual richness)
- No celebration / feedback when you complete a tour
- No keyboard shortcuts

---

## 🎯 Vision: What "More Playable" Means

The playground should feel like a **game dev tool** or a **Figma-style editor**:
- Changes feel **instant** — you tweak, you see
- There are **templates** to start from (like Figma templates)
- You can **build your own steps** (step builder)
- You get **rewarded** when you run a complete tour (confetti, score)
- You can **share your creation** via URL
- The sandbox is a **richer mock app** (sidebar, tabs, nav bar, data table)

---

## 📦 Feature Breakdown

### 1. 🏆 Template Gallery (Start From a Recipe)

A row of clickable preset cards above the customizer. Clicking a template instantly loads its full config into the customizer and updates the live code.

| Template | Description |
|---|---|
| **Onboarding Wizard** | 5-step first-run tour, dark overlay, emerald accent |
| **Feature Spotlight** | 1-step highlight, subtle amber overlay, top placement |
| **Dashboard Walkthrough** | 4-step tour, sidebar → metric → table → action |
| **Minimal Ghost** | No overlay, ghost popover, no progress |
| **Hardcore Modal** | High-opacity black, no close, keyboard only |

---

### 2. 🧱 Visual Step Builder

Replace the static 4-button "Target Mode" with a drag-and-drop-capable step list editor:
- Add Step button → creates a new step card
- Each step card has: element selector, title, description, position override, delete button
- Drag to reorder steps (or up/down arrow buttons)
- Live preview updates as you edit
- Max 6 steps

---

### 3. 🖥️ Richer Sandbox Mock App

Upgrade the sandbox to a mini mock SaaS dashboard with:
- Left sidebar nav (Home, Dashboard, Users, Docs)
- Omni-search bar (`#pg-search`)
- 2 metric cards: ARR (`#pg-metric-arr`) and MAU (`#pg-metric-mau`)
- Recent events data table (`#pg-table`)
- Production deploy CTA (`#pg-action`)

6 targetable elements total — all referenceable in the step builder.

---

### 4. ⚡ Live Preview — Instant Visual Feedback

**Current**: Change slider → click Run → see result.
**Goal**: Changes auto-relaunch the tour instantly.

- Add a "Live" toggle (default ON)
- When ON: `useEffect([options])` → destroy prev instance → `tour.start()` with tiny debounce
- Show a pulsing "LIVE" badge next to the sandbox title when enabled
- Slider-type controls (opacity, padding, radius) debounce 400ms to avoid jank

---

### 5. 🎨 Extended Color Palette + Custom Hex Input

- 12-color grid (including pastels + neons)
- `<input type="color">` native color picker + hex text field
- Named theme presets: "Corporate Dark", "Startup Neon", "Ghost Light", "Ocean Blue"

---

### 6. 🔗 Shareable Config URL

- "Share" button serializes `options` + `steps[]` as base64-encoded JSON in URL hash
- Copies URL to clipboard on click
- On page load, reads hash and restores full state
- Enables "hey check out this tour config I built" sharing

---

### 7. 🎉 Tour Completion Celebration

- Confetti burst on full tour completion (`canvas-confetti` or pure CSS)
- Floating "Tour Complete! 🎉" toast with step count
- Local "History" mini panel — last 5 runs with timestamps

---

### 8. ⌨️ Keyboard Shortcuts

Floating `?` button opens a shortcuts cheatsheet:

| Key | Action |
|---|---|
| `R` | Run tour |
| `S` | Stop tour |
| `L` | Toggle Live Preview |
| `Ctrl+Z` | Undo last config change |
| `T` | Open templates gallery |

---

### 9. ↩️ Undo / Redo History

- `Ctrl+Z` / `Cmd+Z` → undo last config change (max 20 steps)
- `Ctrl+Shift+Z` / `Cmd+Shift+Z` → redo
- Undo / Redo buttons in panel header

---

### 10. 📊 Live Config Diff Badges

A compact badge row under the sandbox showing non-default settings at a glance:
```
[animate: ON] [overlay: Indigo 65%] [padding: 12px] [3 steps]
```
Each badge is clickable and scrolls to that control.

---

## 🏗️ Implementation Phases

### Phase 1 — Foundation (High Impact, Low Effort) ⭐ RECOMMENDED START
- [ ] Richer sandbox mock app (sidebar + 2 metric cards + table + action)
- [ ] Live preview mode (auto-relaunch on option change with debounce)
- [ ] Extended color picker (12 colors + custom hex input + type="color")
- [ ] Shareable URL via base64 hash

### Phase 2 — Engagement (Medium Effort, High Fun)
- [ ] Template gallery (5 preset cards at the top)
- [ ] Tour completion confetti + toast
- [ ] Keyboard shortcuts panel (`?` floating button)
- [ ] Config diff summary badges

### Phase 3 — Power Features (High Effort, Power Users)
- [ ] Visual step builder (add/remove/edit/reorder steps)
- [ ] Undo/Redo history stack
- [ ] Run history log (last 5 runs)

---

## 🗂️ Files That Will Change

| File | Change |
|---|---|
| `src/components/playground/CustomPlaygroundClient.tsx` | Major overhaul |
| `src/app/playground/page.tsx` | Minor updates |
| `src/components/playground/TemplateGallery.tsx` | NEW |
| `src/components/playground/StepBuilder.tsx` | NEW |
| `src/components/playground/SandboxApp.tsx` | NEW — richer mock dashboard |
| `src/components/playground/ShareButton.tsx` | NEW |
| `src/components/playground/ConfettiBlast.tsx` | NEW |
| `src/hooks/usePlaygroundHistory.ts` | NEW — undo/redo |
| `src/hooks/usePlaygroundShare.ts` | NEW — URL hash encode/decode |
| `package.json` | Add `canvas-confetti` (tiny, no tree-shaking needed) |

---

## ❓ Open Questions

1. **Phase order** — do all 3 phases at once, or start with Phase 1 and ship?
2. **Live preview** — auto-run on every change, or only on discrete controls (not sliders)?
3. **Step builder** — free-text step title/description or pick from example suggestions?
4. **Drag-and-drop** — use `@dnd-kit/core` or keyboard-only up/down arrows per step?
5. **Confetti** — add `canvas-confetti` npm dep, or use pure CSS keyframe explosion?

---

> **Recommendation**: Start with **Phase 1** (richer sandbox + live preview + shareable URL). It has the highest visual impact for the least risk and makes the playground feel alive immediately.
