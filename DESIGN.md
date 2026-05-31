# Design System — Executive Engineering Blueprint

Reference for building new webpages, tools, and dashboards that stay visually and tonally aligned with this portfolio.

**Source of truth:** `src/index.css` (tokens + components), `content/site-content.txt` (copy patterns), `index.html` (fonts).

---

## 1. Design identity

### What this look is

A **technical dossier / engineering blueprint dashboard** — not a generic SaaS landing page.

| Principle | Meaning |
|-----------|---------|
| **Instrument panel** | UI reads like calibrated equipment: coords, stamps, status LEDs, section labels. |
| **Flat & sharp** | No drop shadows, no rounded corners (`--radius: 0`), hard 1px borders. |
| **Dual typography** | Human prose in **Inter**; system labels in **JetBrains Mono**. |
| **Engineering credibility** | Credentials, vectors, role domains, live readouts — not marketing fluff. |
| **Restrained colour** | Mostly monochrome + one accent; green only for live/online status. |

### What to avoid

- Rounded cards, glassmorphism, gradient buttons, emoji-heavy UI
- Soft pastel “startup” palettes unrelated to the token set
- Centered hero-only layouts with no grid structure
- Casual sentence-case nav labels (`Home`, `About`) — use **UPPERCASE MONO LABELS**

---

## 2. Visual modes (2 axes)

New tools should respect both toggles if they live inside this app shell.

### Axis A — Visual mode (`data-visual-mode`)

Cycles: **Blueprint → Pixel → CLI** (header `mode-toggle`).

| Mode | Attribute | Character |
|------|-----------|-----------|
| **Blueprint** (default) | `data-pixel-mode="false"` `data-cli-mode="false"` | Line grid, Inter body, slate-blue accent |
| **Pixel** | `data-pixel-mode="true"` | Press Start 2P everywhere, 2px borders, dot grid, B/W |
| **CLI** | `data-cli-mode="true"` | Terminal prompts (`$`, `>`), pane labels, scanline backdrop |

### Axis B — Theme (`data-theme`)

Cycles: **Light → Dark → Claude** (header `theme-toggle`).

| Theme | Background feel | Accent |
|-------|-----------------|--------|
| **light** | White canvas + subtle starfield | `#2D5A88` slate blue |
| **dark** | Night sky `#050810` + starfield | `#60A5FA` sky blue |
| **claude** | Warm cream `#FAF9F5` | `#C15F3C` terracotta |

CLI mode overrides palette per theme (Tokyo Night–style dark terminal, etc.).

---

## 3. Design tokens

Copy these CSS custom properties into any sibling project, or import `index.css` primitives.

### Core (Blueprint / Light)

```css
:root {
  --bg: #ffffff;
  --bg-soft: #fafafa;
  --bg-cell: #f6f8fb;
  --ink: #0a0a0a;
  --ink-soft: #1f2937;
  --muted: #64748b;
  --muted-dim: #94a3b8;
  --accent: #2d5a88;
  --accent-strong: #1e3f63;
  --accent-soft: rgba(45, 90, 136, 0.12);
  --accent-line: rgba(45, 90, 136, 0.32);
  --border: #0a0a0a;
  --border-w: 1px;
  --border-soft: rgba(10, 10, 10, 0.18);
  --radius: 0;
  --status-green: #166534;
  --warn: #b45309;
  --hot: #dc2626;
  --grid-size: 24px;
  --max-w: 1180px;
}
```

### Semantic usage

| Token | Use for |
|-------|---------|
| `--bg` | Cards, panels, inputs |
| `--bg-soft` / `--bg-cell` | Inset sub-panels, table stripes |
| `--ink` | Primary text, active nav fill |
| `--ink-soft` | Body copy, descriptions |
| `--muted` | Meta, timestamps, secondary labels |
| `--accent` | Section coords, links, primary buttons |
| `--status-green` | Online / live / OK badges only |
| `--warn` / `--hot` | Caution / alarm readouts (simulations, alerts) |

### Layout constants

| Token | Value | Use |
|-------|-------|-----|
| `--max-w` | `1180px` | Page content max width |
| `--grid-size` | `24px` (18px in pixel mode) | Background grid cell |
| App padding | `1.25rem 1.5rem` | `.app-content` horizontal inset |

---

## 4. Typography

### Font stack (load from Google Fonts — see `index.html`)

```html
Inter:wght@400;500;600
JetBrains Mono:wght@400;600;700
Press Start 2P
```

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Body prose | `var(--font-body)` → Inter | 400–600 | 15px, line-height 1.6 |
| Labels, nav, coords | `var(--font-mono)` → JetBrains Mono | 700 for headings | UPPERCASE, wide letter-spacing |
| Pixel / CLI body | `var(--font-pixel)` → Press Start 2P | — | 11px body in pixel mode |

### Type scale (Blueprint mode)

| Element | Size | Tracking |
|---------|------|----------|
| Site name | `clamp(1.25rem, 2.4vw, 1.65rem)` | tight |
| Hero headline | `clamp(1.35rem, 2.8vw, 1.85rem)` | normal |
| Section coord label | `0.78rem` | `0.16em` |
| Sys bar | `0.58rem` | `0.16em` |
| Nav links | `0.58rem` | `0.14em` |
| Tags | `0.6rem` | `0.06em` |
| Footer meta | `0.62rem` | `0.12em` |

### Copy voice (labels)

Follow patterns from `content/site-content.txt`:

```
SECTION // DESCRIPTOR          ← coord labels (double slash)
STATUS — ONLINE // OPEN TO COLLABORATION
SYS.LOC // I.AM.SAM
ROLE_01 · CLASS // TECHN_DOM
Pipe-separated lists:  MECHANICAL | CFD | COMMISSIONING
Tag chips:             Cooling Tower Sizing | Hydronics | CFD
```

- **Labels:** ALL CAPS, monospace, `//` or `|` as dividers
- **Body:** Sentence case, justified or left-aligned prose in Inter
- **IDs:** `ROLE_01`, `SYS.LOC`, `CRED`, `SECURE COMMUNICATION GATEWAY`

---

## 5. Layout architecture

### Page shell (required layers, bottom → top)

```
1. .starfield-canvas     fixed, z-index 1, pointer-events none
2. .blueprint-grid       fixed, z-index 0, line or dot grid
3. .cli-backdrop         fixed, visible only in CLI mode
4. .app-content          relative, z-index 2, max-width 1180px
   ├── SysBar            full-bleed top telemetry strip
   ├── Header            name + controls + nav
   ├── <main>            page sections
   └── Footer            dark contact band (#contact anchor)
```

### Section pattern

Every major block follows the same skeleton:

```html
<section>
  <span class="coord-label">EXPERTISE VECTORS [SHEET 2]</span>
  <article class="card card-pad">
    <!-- content -->
  </article>
</section>
```

### Grids used in portfolio

| Pattern | CSS | Use |
|---------|-----|-----|
| Hero | `grid: minmax(220px, 300px) 1fr` | Portrait + mandate |
| Credentials | `repeat(2, 1fr)` | Two-column cred blocks |
| Role cards | Stacked, z-pattern | Illustration left/right alternating |
| Footer | `minmax(0, 1fr) auto` | Copy + glyph strip |

### Breakpoints

| Width | Behaviour |
|-------|-----------|
| `≤ 860px` | Hero single column |
| `≤ 768px` | Header controls stack; role visuals move above copy |
| `≤ 820px` | Footer single column |

---

## 6. Component recipes

### Card

```css
.card {
  background: var(--bg);
  border: var(--border-w) solid var(--border);
  border-radius: 0;
  box-shadow: none;
}
.card-pad { padding: 1.1rem 1.35rem; }
.card-inset {
  border: var(--border-w) solid var(--border);
  background: var(--bg-soft);
  padding: 0.85rem 1.05rem;
}
```

### Coord label (section header)

Diamond marker (rotated square) + accent colour + uppercase mono.

```html
<span class="coord-label">AGENT // PROFESSIONAL MANDATE</span>
```

In CLI mode, `::before` becomes `▸` in prompt green.

### Sys bar (telemetry strip)

Full-bleed bar above header:

```
[● SYS.LOC // I.AM.SAM]     [BUILD // PORTFOLIO.v1] [STAMP // HH:MM:SS UTC] [STATUS — ONLINE // …]
```

- Left: accent dot + system ID  
- Right: build stamp, live UTC, status badge (links to `#contact`)

### Status badge

Green filled pill with blinking square “LED” (`::before`, 1.6s blink).

- Use **only** for live / online / operational state  
- Clickable → scroll to contact footer

### Navigation link

```css
/* Default: outlined mono chip */
.nav-link { border: 1px solid var(--ink); padding: 0.35rem 0.6rem; }
.nav-link.is-active { background: var(--ink); color: var(--bg); }
```

### Primary button (contact / CTA)

```css
.contact-btn {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0.85rem 1.4rem;
  border: var(--border-w) solid var(--accent);
  background: var(--accent);
  color: #fff;
  border-radius: 0;
}
.contact-btn:hover { filter: brightness(1.15); }
```

### Tag chip

```css
.tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  padding: 0.28rem 0.55rem;
  border: var(--border-w) solid var(--border);
  text-transform: uppercase;
}
```

### Toggle buttons (theme / mode)

Same family as nav: mono, uppercase, 0.6rem, 1px border, `--accent-soft` on hover.

### Footer band

- Default: `#0b1322` background, light text, blue coord diamond  
- Claude theme: warm `#EDE8DF` band  
- Contains `#contact` anchor for status-badge scroll target

---

## 7. Background & atmosphere

### Blueprint grid

- Light: blue line grid at 7% opacity, 24px cells  
- Dark: fainter blue lines, 55% opacity  
- Claude: terracotta-tinted lines  
- Pixel: black dot grid, no fade mask

### Starfield

Canvas twinkling stars + occasional meteors. Visible in light/dark/claude; dimmed or hidden in CLI depending on theme.

**Rule for new tools:** decorative layers stay `pointer-events: none` and `position: fixed` so they never block interaction.

---

## 8. Imagery & assets

### Style

- **Portraits / characters:** studio white background, formal or thoughtful poses, optional line-art overlays (pyramid, atom, telescope, lightbulb) in thin black strokes  
- **Role illustrations:** character + domain metaphor, bottom-aligned in cards, `object-fit: contain`  
- **Footer glyphs:** transparent PNG, ~160–176px height, bottom-aligned row

### Portrait frame spec (for consistent carousel)

| Property | Recommended |
|----------|-------------|
| Canvas | **1200 × 1600 px** (3∶4) |
| Background | Uniform white `#FFFFFF` |
| Subject placement | Feet ~5% from bottom; head at consistent height across set |
| CSS frame | `aspect-ratio: 3 / 4` on container |
| Display | `object-fit: cover` after normalizing all assets to same canvas |

### File naming

```
public/assets/portraits/portrait-N.png
public/assets/roles/{domain-slug}.png
public/assets/footer-{name}.png
```

---

## 9. Interaction & motion

| Pattern | Spec |
|---------|------|
| Scroll | `scroll-behavior: smooth` on `html` |
| Hover (buttons) | `0.15s ease`, brightness or `--accent-soft` background |
| Focus | `outline: 2px solid var(--accent); outline-offset: 2px` |
| Portrait cycle | 5s interval, 400ms opacity fade |
| Status LED | `blink` keyframes, 1.6s ease-in-out |
| CLI cursor | `█` with step-end blink animation |
| Mode/theme change | Persist in `localStorage` |

Keep motion functional, not decorative — no bouncy easing on engineering readouts.

---

## 10. CLI mode conventions

When `data-cli-mode="true"`, add terminal semantics:

| UI element | CLI treatment |
|------------|---------------|
| Name | `$ who.am.i → Ir. Ts. Sam Sham` |
| Roles line | `> roles: MECHANICAL \| CFD \| …` |
| Section open | `$ cat professional_mandate.md` |
| Credentials | `credentials.yml` suffix on label |
| Contact button | `$ MAIL_TO : email█` with blinking cursor |
| Portrait frame | `pane:0 · portrait.img` pseudo-label |

Use `--cli-prompt`, `--cli-cyan`, `--cli-amber`, `--cli-magenta` for syntax colouring.

---

## 11. Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `aria-label` on nav/sections  
- Status link: `aria-label="Jump to contact details"`  
- Decorative images: `alt=""` + `aria-hidden="true"` on glyphs  
- Interactive elements: visible `:focus-visible` ring  
- Don't rely on colour alone — pair status green with text (`ONLINE // …`)

---

## 12. New tool checklist

Before shipping a new page or embedded tool, verify:

- [ ] Uses `--max-w: 1180px` content column (or full-bleed footer/sys-bar pattern)
- [ ] Sections open with a `.coord-label` in mono uppercase
- [ ] Content lives in `.card` / `.card-pad` with 1px borders, zero radius
- [ ] Body text uses Inter; controls and readouts use JetBrains Mono
- [ ] Colours come from CSS variables (works in light / dark / claude)
- [ ] Tested in Blueprint, Pixel, and CLI visual modes
- [ ] Background layers don’t intercept clicks
- [ ] Primary actions use `.contact-btn` or matching accent fill pattern
- [ ] Labels use `//`, `|`, or `—` separators — not casual title case
- [ ] Footer or `#contact` anchor available if tool needs “get in touch”
- [ ] No box-shadows, no border-radius, no off-brand gradients

---

## 13. Quick start for a standalone tool

Minimal HTML skeleton that matches the portfolio shell:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light" data-pixel-mode="false" data-cli-mode="false">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #ffffff; --ink: #0a0a0a; --ink-soft: #1f2937;
      --muted: #64748b; --accent: #2d5a88; --accent-soft: rgba(45, 90, 136, 0.12);
      --border: #0a0a0a; --border-w: 1px; --max-w: 1180px;
      --font-body: 'Inter', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: var(--font-body); font-size: 15px; line-height: 1.6; color: var(--ink); background: var(--bg); }
    .app { max-width: var(--max-w); margin: 0 auto; padding: 1.25rem 1.5rem; }
    .coord-label { font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
    .card { background: var(--bg); border: var(--border-w) solid var(--border); padding: 1.1rem 1.35rem; }
  </style>
</head>
<body>
  <div class="app">
    <span class="coord-label">TOOL // YOUR MODULE NAME</span>
    <article class="card">
      <!-- tool UI -->
    </article>
  </div>
</body>
</html>
```

For tools **inside this repo**, reuse `AppShell`, import shared classes from `index.css`, and add routes under `src/pages/`.

---

## 14. File reference

| File | Purpose |
|------|---------|
| `src/index.css` | Full design system (~2300 lines) |
| `src/layouts/AppShell.tsx` | Shell composition |
| `src/hooks/useVisualMode.ts` | Blueprint / Pixel / CLI |
| `src/hooks/useThemeMode.ts` | Light / Dark / Claude |
| `content/site-content.txt` | Copy & label patterns |
| `index.html` | Font loading |

---

## 15. Prompt example

Copy the block below when briefing an AI (or a collaborator) to build a new page or tool that must match this portfolio.

```text
Build a [TOOL NAME / PAGE PURPOSE] as a web page that strictly follows the
"Executive Engineering Blueprint" design system documented in DESIGN.md
(Ir. Ts. Sam Sham portfolio).

DESIGN RULES (non-negotiable):
- Visual identity: technical dossier / engineering blueprint dashboard — NOT a generic SaaS landing page
- Layout: max-width 1180px content column; sections use .coord-label headers + .card panels
- Shape: zero border-radius, no box-shadows, 1px hard borders only
- Typography: Inter for body prose; JetBrains Mono for all labels, nav, readouts, buttons
- Labels: ALL CAPS, wide letter-spacing, use // or | separators (e.g. "MODULE // DESCRIPTOR")
- Colours: use CSS tokens — accent #2D5A88 (light), status green #166534 for live/online only
- Background: optional subtle line grid + starfield; decorative layers must be pointer-events: none
- Footer pattern: dark contact band with mono headline + accent CTA button if contact is needed
- Motion: subtle only — 0.15s hovers, no bouncy animations

MODES TO SUPPORT (if inside portfolio AppShell):
- Visual: Blueprint (default) → Pixel → CLI
- Theme: Light → Dark → Claude
- All colours must come from CSS variables so themes work without hard-coded hex in components

COMPONENTS TO REUSE:
- .coord-label, .card, .card-pad, .card-inset
- .sys-bar telemetry strip, .status-badge (green LED blink)
- .nav-link, .contact-btn, .tag chips
- CLI mode: prefix prompts ($, >, #), blinking cursor █ on actions

CONTENT TONE:
- Engineering credibility: credentials, readouts, vectors — not marketing fluff
- Body copy: sentence case, justified or left-aligned Inter
- Section IDs: ROLE_01 style or SYS.LOC // I.AM.SAM style identifiers

AVOID:
- Rounded corners, glassmorphism, gradient buttons, emoji-heavy UI
- Casual nav labels ("Home", "About")
- Off-brand pastel palettes unrelated to the token set

DELIVERABLE:
- [Describe: standalone HTML / React page in src/pages/ / embedded widget / etc.]
- [Describe: key features, inputs, outputs, any live readouts or charts]
- Match existing file conventions in src/index.css and AppShell.tsx

Before finishing, verify against DESIGN.md section 12 (New tool checklist).
```

### Shorter variant (quick tasks)

```text
Create [X] matching DESIGN.md (Executive Engineering Blueprint portfolio).
Use: Inter + JetBrains Mono, 1px borders, zero radius, .coord-label + .card layout,
#2D5A88 accent, uppercase mono labels with // separators, max-width 1180px.
No shadows, no rounded corners, no generic SaaS styling. Support light/dark/claude themes via CSS variables.
```

---

*Last aligned with portfolio source — May 2026.*
