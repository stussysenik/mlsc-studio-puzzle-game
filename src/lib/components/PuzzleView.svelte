<script lang="ts">
	import { game } from '$lib/stores/game.svelte';
	import PuzzleGrid from './PuzzleGrid.svelte';
	import Celebration from './Celebration.svelte';

	let showKeyboardHint = $state(true);

	$effect(() => {
		if (game.hasInteracted) {
			showKeyboardHint = false;
		}
	});
</script>

<div class="puzzle-view">
	<!-- Blurred background -->
	<div
		class="bg-painting"
		style="background-image: url({game.backgroundImageUrl});"
	></div>

	<!-- Top bar -->
	<header class="top-bar">
		<button class="nav-btn" onclick={() => game.backToGallery()} aria-label="Back to gallery">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M19 12H5m0 0l7-7m-7 7l7 7" />
			</svg>
			<span>Gallery</span>
		</button>

		<div class="top-right">
			<span class="move-counter">{game.moveCount} moves</span>
			<div class="grid-toggle">
				<button
					class="size-btn"
					class:active={game.gridSize === 3}
					onclick={() => game.setGridSize(3)}
				>3&times;3</button>
				<button
					class="size-btn"
					class:active={game.gridSize === 4}
					onclick={() => game.setGridSize(4)}
				>4&times;4</button>
			</div>
		</div>
	</header>

	<!-- Hint overlay -->
	{#if game.showHint}
		<div class="hint-overlay" role="button" tabindex="0" onclick={() => game.toggleHint()} onkeydown={(e) => e.key === 'Escape' && game.toggleHint()}>
			<img
				src={game.puzzleImageUrl}
				alt="Solution reference"
				class="hint-image"
				crossorigin="anonymous"
			/>
			<p class="hint-dismiss">Click anywhere or press H to dismiss</p>
		</div>
	{/if}

	<!-- Main puzzle area -->
	<main class="puzzle-area">
		{#if game.imageLoaded}
			<PuzzleGrid imageUrl={game.puzzleImageUrl} />
		{:else}
			<div class="loading-puzzle">
				<svg width="40" height="40" viewBox="0 0 100 100">
					<circle
						cx="50" cy="50" r="45"
						fill="none"
						stroke="var(--color-accent)"
						stroke-width="2"
						class="loading-circle"
					/>
				</svg>
			</div>
		{/if}

		<Celebration />
	</main>

	<!-- Keyboard hint -->
	{#if showKeyboardHint && !game.showCelebration}
		<div class="keyboard-hint">
			<div class="hint-keys">
				<span class="key">&uarr;</span>
				<div class="hint-row">
					<span class="key">&larr;</span>
					<span class="key">&darr;</span>
					<span class="key">&rarr;</span>
				</div>
			</div>
			<p>Use arrow keys to move tiles</p>
		</div>
	{/if}

	<!-- Bottom bar -->
	<footer class="bottom-bar">
		<button class="nav-arrow" onclick={() => game.prevPainting()} aria-label="Previous painting">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M15 18l-6-6 6-6" />
			</svg>
		</button>

		<div class="painting-info">
			<span class="painting-label">{game.currentPainting.label}</span>
			<span class="painting-number">{game.currentIndex + 1} / 30</span>
		</div>

		<button class="nav-arrow" onclick={() => game.nextPainting()} aria-label="Next painting">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 18l6-6-6-6" />
			</svg>
		</button>
	</footer>

	<!-- Action buttons -->
	<div class="action-row">
		<button class="action-btn" onclick={() => game.toggleHint()}>
			{game.showHint ? 'Hide Hint' : 'Hint (H)'}
		</button>
		<button class="action-btn" onclick={() => game.reset()}>
			Reset (R)
		</button>
	</div>
</div>

<style>
	.puzzle-view {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.bg-painting {
		position: absolute;
		inset: -40px;
		background-size: cover;
		background-position: center;
		filter: blur(30px) brightness(0.3);
		opacity: 0.6;
		z-index: 0;
	}

	.top-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		z-index: 15;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		color: var(--color-text-secondary);
		cursor: pointer;
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.875rem;
		letter-spacing: 0.1em;
		transition: color 0.2s ease;
	}

	.nav-btn:hover {
		color: var(--color-text);
	}

	.top-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.move-counter {
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	.grid-toggle {
		display: flex;
		gap: 2px;
		background: var(--color-border);
		border-radius: 3px;
		overflow: hidden;
	}

	.size-btn {
		background: transparent;
		border: none;
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: var(--font-sans);
	}

	.size-btn.active {
		background: var(--color-accent);
		color: var(--color-bg);
	}

	.hint-overlay {
		position: absolute;
		inset: 0;
		z-index: 25;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(4px);
		cursor: pointer;
	}

	.hint-image {
		max-width: min(80vw, 500px);
		max-height: 75vh;
		object-fit: contain;
		border-radius: 4px;
		box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
	}

	.hint-dismiss {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
	}

	.puzzle-area {
		position: relative;
		z-index: 5;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90vw;
		max-width: 560px;
	}

	.loading-puzzle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 1;
	}

	.keyboard-hint {
		position: absolute;
		bottom: 7rem;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		opacity: 0.5;
		animation: fade-in 0.6s ease;
	}

	.hint-keys {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
	}

	.hint-row {
		display: flex;
		gap: 3px;
	}

	.key {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-border);
		border-radius: 4px;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.keyboard-hint p {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
	}

	@keyframes fade-in {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 0.5; transform: translateY(0); }
	}

	.bottom-bar {
		position: absolute;
		bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		z-index: 15;
	}

	.nav-arrow {
		background: none;
		border: 1px solid var(--color-border);
		color: var(--color-text-secondary);
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.nav-arrow:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.painting-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.125rem;
	}

	.painting-label {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.875rem;
		color: var(--color-text);
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}

	.painting-number {
		font-size: 0.6875rem;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
	}

	.action-row {
		position: absolute;
		bottom: 0.75rem;
		display: flex;
		gap: 1rem;
		z-index: 15;
	}

	.action-btn {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: 0.6875rem;
		cursor: pointer;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.25rem 0.5rem;
		transition: color 0.2s ease;
		font-family: var(--font-sans);
	}

	.action-btn:hover {
		color: var(--color-accent);
	}
</style>
