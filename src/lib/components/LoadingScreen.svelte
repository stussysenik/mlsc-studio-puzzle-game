<script lang="ts">
	let { visible = true }: { visible?: boolean } = $props();
</script>

{#if visible}
	<div class="loading-overlay">
		<div class="loading-content">
			<svg width="60" height="60" viewBox="0 0 100 100">
				<circle
					cx="50"
					cy="50"
					r="45"
					fill="none"
					stroke="var(--color-accent)"
					stroke-width="2"
					class="loading-circle"
				/>
			</svg>
			<p class="loading-text">Loading artworks</p>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
		transition: opacity 0.6s ease;
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.loading-text {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--color-text-secondary);
		letter-spacing: 0.15em;
		text-transform: lowercase;
	}
</style>
