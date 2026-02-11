<script lang="ts">
	import { paintings } from '$lib/data/paintings';
	import { game } from '$lib/stores/game.svelte';
	import PaintingCard from './PaintingCard.svelte';
</script>

<div class="gallery">
	<header class="gallery-header">
		<h1 class="title">MLSC Studio</h1>
		<p class="subtitle">Painting Archive</p>
		<p class="instruction">Select a painting to begin the puzzle</p>
	</header>

	<div class="grid">
		{#each paintings as painting (painting.id)}
			<PaintingCard
				{painting}
				onclick={() => game.selectPainting(painting.id - 1)}
			/>
		{/each}
	</div>

	<footer class="gallery-footer">
		<p>{paintings.length} paintings by <span class="artist">Millerscottie</span></p>
		<p class="controls-hint">
			Use arrow keys to solve puzzles &middot; [ ] to navigate &middot; Esc to return
		</p>
	</footer>
</div>

<style>
	.gallery {
		min-height: 100vh;
		padding: 3rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.gallery-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.title {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 300;
		color: var(--color-text);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.subtitle {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: clamp(0.875rem, 2vw, 1.125rem);
		font-weight: 300;
		color: var(--color-text-secondary);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
	}

	.instruction {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.25rem;
		}
	}

	.gallery-footer {
		text-align: center;
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.gallery-footer p {
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	.artist {
		color: var(--color-accent);
	}

	.controls-hint {
		margin-top: 0.5rem;
		font-size: 0.75rem !important;
		opacity: 0.6;
	}
</style>
