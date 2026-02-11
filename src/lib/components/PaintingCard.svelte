<script lang="ts">
	import type { Painting } from '$lib/data/paintings';
	import { getThumbUrl } from '$lib/data/paintings';

	let {
		painting,
		onclick
	}: {
		painting: Painting;
		onclick: () => void;
	} = $props();

	let loaded = $state(false);
	let hovered = $state(false);
</script>

<button
	class="card"
	class:hovered
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	{onclick}
>
	<div class="image-wrapper">
		<img
			src={getThumbUrl(painting)}
			alt={painting.label}
			loading="lazy"
			onload={() => (loaded = true)}
			class:loaded
			crossorigin="anonymous"
		/>
		<div class="label-overlay" class:visible={hovered}>
			<span class="label">{painting.label}</span>
		</div>
	</div>
</button>

<style>
	.card {
		position: relative;
		display: block;
		width: 100%;
		border: none;
		background: var(--color-surface);
		cursor: pointer;
		overflow: hidden;
		border-radius: 2px;
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			box-shadow 0.4s ease;
	}

	.card:hover {
		transform: scale(1.02);
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	img.loaded {
		opacity: 1;
	}

	.card:hover img {
		transform: scale(1.05);
	}

	.label-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 1rem;
		background: linear-gradient(to top, rgba(10, 10, 10, 0.7) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.label-overlay.visible {
		opacity: 1;
	}

	.label {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.875rem;
		font-weight: 300;
		color: var(--color-text);
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}
</style>
