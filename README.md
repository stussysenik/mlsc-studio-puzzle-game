# MLSC Studio — Painting Puzzle

An interactive web experience that transforms Millerscottie's painting archive into a sliding puzzle game. Select any of 30 paintings, reconstruct the scrambled artwork piece by piece, and engage with each painting through play.

Built as a new way to experience visual art — not just viewing, but actively rebuilding and discovering.

## The Experience

**Gallery** — Browse all 30 paintings in a dark, minimal gallery. Each painting is a portal into a puzzle.

**Puzzle** — A classic sliding puzzle (15-puzzle) where tiles of the painting are scrambled. Use arrow keys or click tiles to slide them into place. Arrow indicators pulse around the blank space, guiding your next move.

**Navigation** — Flow between paintings with `[` and `]` keys. Press `H` to peek at the solution. Press `R` to reshuffle. Press `Escape` to return to the gallery.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Controls

| Key | Action |
|-----|--------|
| Arrow keys | Move puzzle tiles |
| `[` / `]` | Previous / next painting |
| `Escape` | Return to gallery |
| `H` | Toggle hint (show solved image) |
| `R` | Reset / reshuffle puzzle |
| Click tile | Move tile (if adjacent to blank) |

## Tech Stack

- **SvelteKit** — Svelte 5 with runes
- **Tailwind CSS v4** — Utility-first styling with custom theme
- **TypeScript** — Strict typing throughout
- **Bun** — Runtime and package manager
- **Playwright** — E2E testing (14 tests)

## Architecture

```
src/
├── lib/
│   ├── components/      # Svelte components (Gallery, PuzzleGrid, etc.)
│   ├── data/            # Painting records and CDN URL helpers
│   ├── engine/          # Pure puzzle logic (shuffle, move, solve)
│   └── stores/          # Reactive game state (Svelte 5 runes)
├── routes/
│   ├── +layout.svelte   # Root layout with fonts
│   ├── +layout.ts       # Static prerender config
│   └── +page.svelte     # Main orchestrator
├── app.css              # Tailwind + custom theme
└── app.html             # HTML shell
```

## Design Principles

- **Art is the hero** — Dark background, zero chrome, generous whitespace
- **Minimal interaction** — The puzzle is the only interface
- **Respect the artist** — Paintings are displayed faithfully with proper attribution
- **Gentle motion** — Smooth transitions, organic easing, subtle parallax

## Artist

Paintings by **Millerscottie** / [MLSC Studio](https://mlscstudio.com/painting-archive)

## Deployment

Static site — deploy anywhere. Pre-configured for Vercel:

```bash
bun run build    # Outputs to build/
vercel deploy    # Deploy to Vercel
```

## Testing

```bash
bunx playwright test
```

14 E2E tests covering gallery loading, puzzle interaction, keyboard navigation, grid size switching, and painting navigation.

## License

MIT
