<script lang="ts">
	import { onMount } from 'svelte';
	import { game } from '$lib/stores/game.svelte';
	import { getDirectionFromKey } from '$lib/engine/puzzle';
	import Gallery from '$lib/components/Gallery.svelte';
	import PuzzleView from '$lib/components/PuzzleView.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let appReady = $state(false);

	onMount(() => {
		// Brief loading screen, then reveal
		setTimeout(() => {
			appReady = true;
		}, 800);
	});

	function handleKeydown(e: KeyboardEvent) {
		// Gallery view - no special keys needed
		if (game.view === 'gallery') return;

		// Puzzle view
		const direction = getDirectionFromKey(e.key);
		if (direction) {
			e.preventDefault();
			game.move(direction);
			return;
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				if (game.showHint) {
					game.toggleHint();
				} else {
					game.backToGallery();
				}
				break;
			case '[':
				e.preventDefault();
				game.prevPainting();
				break;
			case ']':
				e.preventDefault();
				game.nextPainting();
				break;
			case 'r':
			case 'R':
				if (!e.ctrlKey && !e.metaKey) {
					e.preventDefault();
					game.reset();
				}
				break;
			case 'h':
			case 'H':
				if (!e.ctrlKey && !e.metaKey) {
					e.preventDefault();
					game.toggleHint();
				}
				break;
		}
	}

	// Touch swipe handling for mobile
	let touchStartX = 0;
	let touchStartY = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		if (game.view !== 'puzzle') return;

		const dx = e.changedTouches[0].clientX - touchStartX;
		const dy = e.changedTouches[0].clientY - touchStartY;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);
		const threshold = 50;

		if (absDx < threshold && absDy < threshold) return;

		// Only handle swipes for puzzle navigation (3-finger or edge swipes)
		// Single-finger swipes in puzzle area handled by tile clicks
		if (absDx > absDy) {
			if (dx > threshold * 2) game.prevPainting();
			else if (dx < -threshold * 2) game.nextPainting();
		}
	}
</script>

<svelte:window
	onkeydown={handleKeydown}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
/>

<svelte:head>
	<title>{game.view === 'puzzle' && game.currentPainting
		? `${game.currentPainting.label} — MLSC Puzzle`
		: 'MLSC Studio — Painting Puzzle'}</title>
</svelte:head>

<LoadingScreen visible={!appReady} />

<div class="app" class:ready={appReady}>
	{#if game.view === 'gallery'}
		<div class="view-enter">
			<Gallery />
		</div>
	{:else}
		<div class="view-enter">
			<PuzzleView />
		</div>
	{/if}
</div>

<style>
	.app {
		opacity: 0;
		transition: opacity 0.6s ease;
	}

	.app.ready {
		opacity: 1;
	}

	.view-enter {
		animation: view-fade 0.4s ease;
	}

	@keyframes view-fade {
		from {
			opacity: 0;
			transform: scale(0.98);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
