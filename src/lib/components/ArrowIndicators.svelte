<script lang="ts">
	import { game } from '$lib/stores/game.svelte';
	import type { Direction } from '$lib/engine/puzzle';

	let { gridSize }: { gridSize: number } = $props();

	const directionConfig: Record<Direction, { label: string; path: string }> = {
		up: {
			label: 'Move up',
			path: 'M12 19V5m0 0l-7 7m7-7l7 7'
		},
		down: {
			label: 'Move down',
			path: 'M12 5v14m0 0l7-7m-7 7l-7-7'
		},
		left: {
			label: 'Move left',
			path: 'M19 12H5m0 0l7-7m-7 7l7 7'
		},
		right: {
			label: 'Move right',
			path: 'M5 12h14m0 0l-7-7m7 7l-7 7'
		}
	};

	function getArrowStyle(dir: Direction): string {
		const { row, col } = game.blankPosition;
		const cellPercent = 100 / gridSize;

		const centerX = col * cellPercent + cellPercent / 2;
		const centerY = row * cellPercent + cellPercent / 2;

		const offset = cellPercent * 0.42;

		switch (dir) {
			case 'up':
				return `left: ${centerX}%; top: ${centerY - offset}%; transform: translate(-50%, -50%)`;
			case 'down':
				return `left: ${centerX}%; top: ${centerY + offset}%; transform: translate(-50%, -50%)`;
			case 'left':
				return `left: ${centerX - offset}%; top: ${centerY}%; transform: translate(-50%, -50%)`;
			case 'right':
				return `left: ${centerX + offset}%; top: ${centerY}%; transform: translate(-50%, -50%)`;
		}
	}
</script>

<div class="arrows-container">
	{#each game.validDirections as dir (dir)}
		<button
			class="arrow-btn arrow-pulse"
			style={getArrowStyle(dir)}
			onclick={() => game.move(dir)}
			aria-label={directionConfig[dir].label}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d={directionConfig[dir].path} />
			</svg>
		</button>
	{/each}
</div>

<style>
	.arrows-container {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 10;
	}

	.arrow-btn {
		position: absolute;
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: rgba(196, 168, 122, 0.15);
		color: var(--color-accent);
		border-radius: 50%;
		cursor: pointer;
		backdrop-filter: blur(4px);
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.arrow-btn:hover {
		background: rgba(196, 168, 122, 0.35);
		animation: none;
		transform: translate(-50%, -50%) scale(1.2) !important;
	}

	.arrow-btn:active {
		transform: translate(-50%, -50%) scale(0.95) !important;
	}

	@media (min-width: 640px) {
		.arrow-btn {
			width: 36px;
			height: 36px;
		}

		.arrow-btn svg {
			width: 28px;
			height: 28px;
		}
	}
</style>
