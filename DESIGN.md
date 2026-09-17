# Daksh Design System (DESIGN.md)

> Standardized machine-readable design specification for Daksh — CBSE Class 10 AI Teaching Sanctuary.
> Inspired by [awesome-design-md](https://github.com/voltagent/awesome-design-md) and [designmd.co](https://www.designmd.co).

---

## 1. Brand Essence & Philosophy

- **Concept**: *Scholastic Sanctuary meets Cyberpunk Vibe Coding*
- **Tone**: Focused, tactile, encouraging, futuristic yet grounded in academic rigor.
- **Rule of Thumb**: Never look like an empty corporate SaaS. Every screen must feel like a dedicated night-study session with glowing ambient atmosphere, frosted glass containers, tactile physics, and high contrast for CBSE board preparation.

---

## 2. Themes & Color Tokens

Daksh supports **5 distinct visual moods** switched via `html[data-theme="..."]` with smooth Three.js particle color lerping:

### 1. Obsidian Amber (`obsidian`) — Default
- **Mood**: High-focus cyberpunk terminal, warm charcoal & golden flame.
- **Background (`--paper`)**: `#090B0E`
- **Surface (`--surface`)**: `rgba(18, 20, 26, 0.78)` (Frosted Glass)
- **Accent (`--accent`)**: `#F59E0B` (Amber Gold)
- **Secondary Accent**: `#FB923C` (Warm Flame)
- **Text (`--ink`)**: `#F4F4F5`
- **Muted (`--muted`)**: `#9496A1`
- **Border**: `rgba(255, 255, 255, 0.09)`

### 2. ThreeUI Kage Sanctuary (`kage`)
- **Mood**: Japanese nocturnal shrine, sacred vermilion & imperial gold.
- **Background (`--paper`)**: `#080A0D`
- **Surface (`--surface`)**: `rgba(16, 20, 26, 0.78)`
- **Accent (`--accent`)**: `#E0231C` (Torii Vermilion)
- **Secondary Accent**: `#C9A24A` (Imperial Gold)
- **Text (`--ink`)**: `#DFE7E0`
- **Muted (`--muted`)**: `#78837C`
- **Border**: `rgba(224, 35, 28, 0.18)`

### 3. Field Manuals (`field-manuals`)
- **Mood**: Earth-toned antique library parchment & antique brass foil.
- **Background (`--paper`)**: `#16130E`
- **Surface (`--surface`)**: `rgba(33, 28, 22, 0.80)`
- **Accent (`--accent`)**: `#C3A47B` (Vintage Brass)
- **Secondary Accent**: `#EADFC7` (Parchment Starlight)
- **Text (`--ink`)**: `#EEE2CA`
- **Muted (`--muted`)**: `#C5B79E`
- **Border**: `rgba(195, 164, 123, 0.22)`

### 4. Neon Cyberpunk (`cyberpunk`)
- **Mood**: Midnight obsidian with electric violet & cyber cyan.
- **Background (`--paper`)**: `#0B0813`
- **Surface (`--surface`)**: `rgba(22, 17, 34, 0.78)`
- **Accent (`--accent`)**: `#8B5CF6` (Electric Violet)
- **Secondary Accent**: `#06B6D4` (Cyber Cyan)
- **Text (`--ink`)**: `#F3EEFF`
- **Muted (`--muted`)**: `#A39BB8`
- **Border**: `rgba(139, 92, 246, 0.24)`

### 5. Matrix Emerald (`matrix`)
- **Mood**: Pure terminal hacker green for deep coding and focus flow.
- **Background (`--paper`)**: `#050A07`
- **Surface (`--surface`)**: `rgba(10, 20, 14, 0.80)`
- **Accent (`--accent`)**: `#10B981` (Terminal Emerald)
- **Secondary Accent**: `#34D399` (Spring Green)
- **Text (`--ink`)**: `#E0F2E9`
- **Muted (`--muted`)**: `#729683`
- **Border**: `rgba(16, 185, 129, 0.22)`

---

## 3. Typography System

- **Primary UI Sans**: `Rubik` (`var(--font-rubik)`, `system-ui, sans-serif`)
  - Warm, humanistic geometric sans with soft rounded corners.
  - Used for buttons, nav, body text, badges, and user inputs.
- **Editorial Scholastic Serif**: `Newsreader` (`var(--font-serif)`, `Georgia, serif`)
  - Scholarly, academic, elegant serif with optical sizing and italics.
  - Used for section headers (`h2`, `h3`), textbook quotes, and conceptual takeaways.
- **Technical Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
  - Used for CBSE board countdowns, marks percentages, formulas, and chemistry equations.

---

## 4. Glassmorphism & Elevation Tokens

- **Card Glass Base**:
  ```css
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 1rem; /* 16px */
  ```
- **Hairline Border**:
  - Always translucent (`0.08 - 0.22` opacity) so background motion bleeds through the edges.
- **Shadows**:
  - Subdued, deep spread: `0 10px 25px -5px rgba(0,0,0,0.6)`.
  - Avoid stark white shadows; always use dark ambient occlusion.

---

## 5. ThreeUI 3D Background Engine (`ThreeCanvas.tsx`)

- **Layering**: Fixed at `inset-0 z-0 pointer-events-none`.
- **Performance**: Cap pixel ratio at `Math.min(window.devicePixelRatio, 2)`, use `DynamicDrawUsage` and low-draw-call line segments.
- **Physics**:
  - **Neural Constellation**: 160 glowing nodes in 3D perspective space.
  - **Dynamic Laser Filaments**: Line segments generated in real-time when node distance `< 5.2` or cursor distance `< 7.0`.
  - **3D Cyber Horizon Grid**: Perspective wireframe plane undulating with dual sine waves at `30fps` throttle.
  - **Interactive Pointer Click Shockwave**: Expanding 3D impulse sphere that displaces particles outward with physical recoil on click.
- **Accessibility**: Always check `window.matchMedia("(prefers-reduced-motion: reduce)")`.

---

## 6. Components Anatomy

- **`<Card />`**: Translucent frosted glass container with optional left accent border.
- **`<Button variant="plasma" />`**: 360° rotating conic gradient glow with high-speed hover scale.
- **`<MasteryBadge />`**: Color-coded progress pills:
  - `NOT_STARTED`: Neutral stone
  - `LEARNING`: Purple focus
  - `PRACTICING`: Amber caution
  - `REVIEW_NEEDED`: Orange alert
  - `MASTERED`: Emerald triumph
- **`<SubjectBookShowcase />`**: 3D interactive book covers with 3D perspective page flips.
- **`<FormulaVault />`**: Instant drawer for high-frequency CBSE formulas & reactions.

---

## 7. Guidelines for AI Coding Agents

1. **Never use solid opaque backgrounds** for cards or modals in dark mode; always use `bg-surface` with `backdrop-blur-xl`.
2. **Never destroy the 3D canvas** or replace it with an isolated preview box. The canvas must span the entire screen background.
3. **Respect CBSE Board Context**: Terminology should resonate with Indian Class 10 students (NCERT syllabus, PYQ board exam trends, Hindi/English medium friendliness).
