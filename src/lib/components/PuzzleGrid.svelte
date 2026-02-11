<script lang="ts">
	import { game } from '$lib/stores/game.svelte';
	import ArrowIndicators from './ArrowIndicators.svelte';

	let { imageUrl }: { imageUrl: string } = $props();

	const size = $derived(game.gridSize);
	const total = $derived(size * size);
	const blankValue = $derived(total - 1);

	function getTileStyle(tileValue: number): string {
		if (tileValue === blankValue) return '';

		const targetRow = Math.floor(tileValue / size);
		const targetCol = tileValue % size;

		const bgSize = size * 100;
		const bgX = size > 1 ? targetCol * (100 / (size - 1)) : 0;
		const bgY = size > 1 ? targetRow * (100 / (size - 1)) : 0;

		return `background-image: url(${imageUrl}); background-size: ${bgSize}% ${bgSize}%; background-position: ${bgX}% ${bgY}%;`;
	}

	function getCurrentPosition(index: number): string {
		const row = Math.floor(index / size);
		const col = index % size;
		return `grid-row: ${row + 1}; grid-column: ${col + 1};`;
	}
</script>

<div class="puzzle-container">
	<div
		class="puzzle-grid"
		style="grid-template-columns: repeat({size}, 1fr); grid-template-rows: repeat({size}, 1fr);"
	>
		{#each game.tiles as tileValue, index (tileValue)}
			{#if tileValue === blankValue}
				<div
					class="tile blank"
					style={getCurrentPosition(index)}
				></div>
			{:else}
				<button
					class="tile tile-move"
					style="{getCurrentPosition(index)} {getTileStyle(tileValue)}"
					onclick={() => game.clickTile(index)}
					aria-label="Tile {tileValue + 1}"
				></button>
			{/if}
		{/each}
	</div>

	<ArrowIndicators gridSize={size} />
</div>

<style>
	.puzzle-container {
		position: relative;
		width: 100%;
		max-width: min(70vh, 500px);
		aspect-ratio: 1;
		margin: 0 auto;
	}

	.puzzle-grid {
		display: grid;
		gap: 3px;
		width: 100%;
		height: 100%;
		background: var(--color-border);
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
	}

	.tile {
		border: none;
		cursor: pointer;
		transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			box-shadow 0.18s ease;
		background-color: var(--color-surface);
		border-radius: 1px;
		position: relative;
	}

	.tile:not(.blank):hover {
		z-index: 2;
		box-shadow: 0 0 20px rgba(196, 168, 122, 0.2);
	}

	.tile:not(.blank):active {
		transform: scale(0.97);
	}

	.blank {
		background: transparent !important;
		cursor: default;
	}

	@media (min-width: 640px) {
		.puzzle-container {
			max-width: min(70vh, 560px);
		}

		.puzzle-grid {
			gap: 4px;
		}
	}
</style>
