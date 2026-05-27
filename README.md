# Engineering Portfolio — Ir. Ts. Sam Sham

Single-page Blueprint Dashboard portfolio built with **Vite + React + TypeScript**.
Layout follows `Presentation1.pdf`; visual system follows `Requirement.docx`.

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build       # outputs to dist/
npm run preview     # serve the production build
```

## Visual modes

The portfolio ships with two interchangeable visual systems controlled by the
`PIXEL_MODE` button in the top-right of the header:

- **Blueprint Dashboard (default)** — white canvas, slate-blue `#2D5A88` accents,
  `JetBrains Mono` + `Inter`, line-grid overlay, twinkling slate-gray starfield
  with occasional charcoal meteors.
- **Pixel Mode** — `Press Start 2P`, 2px black borders, dot-grid overlay,
  high-contrast B/W terminal palette (entire CFD SVG flips to B/W too).

Preference is persisted in `localStorage` under `sam-portfolio-pixel-mode`.

## Editing content

All copy lives in **one** file: [`src/config/site.ts`](./src/config/site.ts).

| Field | What it controls |
|-------|------------------|
| `identity` | Name, Chinese characters, sub-titles, status badge |
| `contact.email` / `subject` | Footer **INITIATE_CONTACT** mailto link |
| `hero.headline` / `body` | Hero positioning statement |
| `portraits` | List of hero portrait paths (auto-cycles every 5 s) |
| `credentials.blocks` | 5-block "Consolidated Credentials" panel |
| `expertiseVectors.items` | Numbered list of engineering capabilities |
| `liveSim.title` / `subtitle` | Cooling tower simulation labels |
| `roles.items` | The 4 z-pattern role cards (ID, title, desc, tags, image, side) |
| `footer.headline` / `body` | Dark contact section copy |

## Live simulation

[`src/components/LiveSimulation.tsx`](./src/components/LiveSimulation.tsx) renders
a counter-flow mechanical-fan cooling tower as an animated SVG:

- Drag **FAN_SPEED** (0–100 %) — controls fan RPM, induced-draft mass-flow,
  cool-air-stream velocity, and exit plume buoyancy.
- Drag **WIND_VEL** (0–15 m/s) — drives plume deflection and triggers the
  hot-air re-circulation curve once exit-velocity falls below ~1.5× ambient
  wind speed.
- Readouts (`RANGE`, `APPROACH`, `L/G`, `η`, `RECIRC %`) update in real time.

The physics model is a deliberately simplified ASHRAE/CTI-flavoured visual
trend model — accurate qualitatively, not a research-grade CFD.

## Assets

| Folder | Purpose |
|--------|---------|
| `public/assets/portraits/portrait-1..5.png` | Hero photos — auto-cycled |
| `public/assets/roles/mechanical.png` | Role card 01 illustration |
| `public/assets/roles/commissioning.png` | Role card 02 illustration |
| `public/assets/roles/ai-data.png` | Role card 03 illustration |
| `public/assets/roles/astronomy.png` | Role card 04 illustration |
| `public/assets/roles/vectors.png` | Expertise vectors side illustration |

Replace any image by overwriting the file (paths in `site.ts` stay the same)
or by editing the path in `site.ts` and dropping a new file under `public/`.

## File map

```
src/
  config/
    site.ts                 ← all editable copy
  hooks/
    usePixelMode.ts         ← blueprint ↔ pixel toggle, persisted
    usePortraitCycle.ts     ← 5-portrait auto-cycle with fade
  components/
    StarfieldBackground.tsx ← canvas twinkling stars + meteors
    BlueprintGrid.tsx       ← CSS line / dot grid overlay
    SysBar.tsx              ← top SYS.LOC/BUILD/STAMP strip
    Header.tsx              ← name, titles, status, pixel toggle
    HeroPortrait.tsx        ← framed auto-cycling portrait
    Hero.tsx                ← hero + Professional Mandate card
    Credentials.tsx         ← 5-block consolidated credentials
    ExpertiseVectors.tsx    ← numbered list + side character
    LiveSimulation.tsx      ← interactive cooling tower CFD
    RoleCards.tsx           ← 4 z-pattern domain cards
    Footer.tsx              ← INITIATE_CONTACT dark band
  App.tsx                   ← composition root
  index.css                 ← entire design system (both modes)
```
