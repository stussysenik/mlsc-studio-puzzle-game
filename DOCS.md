# Documentation

## Concept

MLSC Studio Painting Puzzle reimagines how people engage with visual art. Instead of passively scrolling through a gallery, visitors actively reconstruct each painting — piece by piece — through a classic sliding puzzle mechanic.

The experience is designed for:
- **Art enthusiasts** who want a deeper, more intimate way to study paintings
- **Gallery visitors** seeking an interactive complement to physical exhibitions
- **The artist** as a digital showcase that encourages prolonged engagement with each work
- **Casual audiences** who discover the paintings through play

### Why a Puzzle?

A sliding puzzle forces you to examine every section of a painting closely. You notice brushstrokes, color relationships, and compositional details that you'd miss in a quick scroll. The puzzle becomes a form of slow looking — a meditative practice that art educators have championed for years.

When you finally solve it, the painting "assembles" before your eyes — a small moment of satisfaction that creates an emotional connection to the work.

---

## Architecture

### Single-Page Application

The entire experience lives on a single page with two view states:

```
Gallery View  <-->  Puzzle View
     |                   |
  Browse 30          Solve one
  paintings          painting
```

No routing is needed. The `game` store's `view` property (`'gallery' | 'puzzle'`) controls which view is rendered. Transitions between views use CSS animations.

### Image Strategy

Paintings are hosted on Cargo's freight CDN. We use width-based resizing to load appropriate sizes:

| Context | URL Pattern | Size | Purpose |
|---------|-------------|------|---------|
| Gallery thumbnails | `w/400/i/{hash}/{file}` | ~50-100KB each | Grid browsing |
| Puzzle background | `w/600/i/{hash}/{file}` | ~100-200KB | Blurred reference behind puzzle |
| Puzzle tiles | `w/800/i/{hash}/{file}` | ~150-300KB | Sharp tile rendering |

**Single image, multiple tiles**: Each puzzle loads one image. Individual tiles use CSS `background-image` + `background-position` + `background-size` to display their section. This means 1 HTTP request per puzzle, not 16.

**Preloading**: When viewing painting N, we silently preload images for paintings N-1 and N+1 so navigation between paintings feels instant.

### Puzzle Engine

The puzzle engine (`src/lib/engine/puzzle.ts`) is a set of pure functions with zero framework dependencies:

**Solvability guarantee**: Instead of randomly shuffling tiles (which has a 50% chance of being unsolvable), we start from the solved state and apply N random valid moves backward. This mathematically guarantees every puzzle is solvable.

**State representation**: A flat array where `tiles[i] = j` means "position i contains tile j". The blank tile is always the highest-valued tile (`gridSize * gridSize - 1`).

**Move mechanics**: Arrow key direction maps to which tile slides into the blank. "ArrowUp" means the tile above the blank moves down into it.

### State Management

Uses Svelte 5's class-based runes pattern:

```typescript
class GameState {
  view = $state('gallery');                    // Current view
  tiles = $state([]);                          // Puzzle tile positions
  solved = $derived(isSolved(this.tiles));     // Auto-computed
  validDirections = $derived(...);             // Which arrows to show
}

export const game = new GameState();           // Singleton
```

Every component imports `game` and reads/writes directly. No prop drilling, no context API, no event buses.

---

## Component Guide

### Gallery.svelte
The painting browser. Renders a responsive CSS grid of `PaintingCard` components. Header shows studio name and instructions. Footer shows painting count and artist credit.

### PaintingCard.svelte
A single gallery thumbnail. Lazy-loads its image via `loading="lazy"`. Shows a Roman numeral label on hover with a gradient overlay. Clicking calls `game.selectPainting(index)`.

### PuzzleView.svelte
The puzzle screen wrapper. Contains:
- Blurred background (CSS `filter: blur(30px) brightness(0.3)`)
- Top bar: back button, move counter, grid size toggle
- Center: `PuzzleGrid` component
- Bottom bar: prev/next arrows, painting label, painting counter
- Action row: hint and reset buttons
- Keyboard hint overlay (fades after first interaction)

### PuzzleGrid.svelte
The core game board. Uses CSS Grid with `gap: 3px`. Each tile is a `<button>` with a computed `background-position` to show the correct painting slice. The blank tile is an invisible `<div>`. Hosts `ArrowIndicators` as an overlay.

### ArrowIndicators.svelte
Four arrow SVGs positioned absolutely around the blank tile. Only renders arrows for valid move directions. Each arrow pulses with a CSS animation and is clickable to make a move.

### Celebration.svelte
Triggered when `game.solved` becomes true. Shows:
- 30 particles with random trajectories (CSS-only animation)
- "Solved" title with move count
- "Next Painting" and "Gallery" action buttons

### LoadingScreen.svelte
Initial loading animation. SVG circle with a drawing animation. Fades out after 800ms.

---

## Styling

### Theme

Dark gallery aesthetic with warm tones:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#141414` | Cards, tile background |
| `--color-text` | `#e8e4df` | Primary text |
| `--color-text-secondary` | `#8a8580` | Muted text |
| `--color-accent` | `#c4a87a` | Gold highlights, indicators |
| `--color-border` | `#2a2725` | Dividers, grid gaps |

### Typography

**Cormorant Garamond** (Google Fonts) — A refined serif that feels gallery-appropriate without being pretentious. Used for headings, labels, and buttons. Weight 300 (light) for elegance.

System sans-serif stack for utility UI (move counter, grid toggle).

---

## Testing

14 Playwright E2E tests organized in 3 suites:

**Gallery View** (3 tests)
- All 30 painting cards render
- Thumbnails are visible
- Artist credit in footer

**Puzzle View** (9 tests)
- Entering puzzle from gallery
- Grid size toggle display
- Arrow key moves update counter
- Arrow indicators are present
- Escape returns to gallery
- Bracket navigation between paintings
- Reset with R key
- Grid size switching (3x3 / 4x4)
- Tile click interaction

**Navigation** (2 tests)
- Prev/next buttons cycle paintings
- Gallery back button

Run with: `bunx playwright test`

---

## Deployment

### Static Build

The app compiles to a fully static site via `@sveltejs/adapter-static`:

```bash
bun run build
# Output: build/
```

The `build/` directory contains:
- `index.html` — SPA fallback
- `_app/` — Hashed JS/CSS chunks
- Total bundle: ~50KB gzipped (excluding images, which load from CDN)

### Vercel

Configured as a static site. No serverless functions needed. Images are served directly from Cargo's CDN — no proxy, no download, no storage costs.

### Other Platforms

Works on any static hosting (Netlify, Cloudflare Pages, GitHub Pages, S3+CloudFront). Just upload the `build/` directory.
