<script lang="ts">
	import { game } from '$lib/stores/game.svelte';

	let particles = $state(generateParticles());

	function generateParticles() {
		return Array.from({ length: 30 }, (_, i) => ({
			id: i,
			tx: `${(Math.random() - 0.5) * 400}px`,
			ty: `${(Math.random() - 0.5) * 400}px`,
			delay: `${Math.random() * 0.3}s`,
			size: `${4 + Math.random() * 8}px`,
			color: ['#c4a87a', '#e8e4df', '#8a8580', '#d4b88a', '#f0e8d8'][Math.floor(Math.random() * 5)]
		}));
	}

	function handleNext() {
		game.nextPainting();
	}

	function handleGallery() {
		game.backToGallery();
	}
</script>

{#if game.showCelebration}
	<div class="celebration">
		<div class="particles">
			{#each particles as p (p.id)}
				<div
					class="particle"
					style="
						--tx: {p.tx};
						--ty: {p.ty};
						animation-delay: {p.delay};
						width: {p.size};
						height: {p.size};
						background: {p.color};
					"
				></div>
			{/each}
		</div>

		<div class="message">
			<h2 class="solved-text">Solved</h2>
			<p class="move-count">{game.moveCount} moves</p>
			<p class="painting-label">{game.currentPainting.label}</p>

			<div class="actions">
				<button class="action-btn" onclick={handleNext}>
					Next Painting
				</button>
				<button class="action-btn secondary" onclick={handleGallery}>
					Gallery
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.celebration {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(10, 10, 10, 0.6);
		backdrop-filter: blur(8px);
		z-index: 20;
		animation: fade-in 0.4s ease;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.particles {
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
	}

	.message {
		text-align: center;
		z-index: 1;
		animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes scale-in {
		from { transform: scale(0.8); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.solved-text {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 3rem;
		font-weight: 300;
		color: var(--color-accent);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.move-count {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		font-weight: 300;
		margin-bottom: 0.25rem;
	}

	.painting-label {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		margin-bottom: 2rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.action-btn {
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 1rem;
		padding: 0.625rem 1.5rem;
		border: 1px solid var(--color-accent);
		background: transparent;
		color: var(--color-accent);
		cursor: pointer;
		letter-spacing: 0.1em;
		transition: all 0.2s ease;
		border-radius: 2px;
	}

	.action-btn:hover {
		background: var(--color-accent);
		color: var(--color-bg);
	}

	.action-btn.secondary {
		border-color: var(--color-border);
		color: var(--color-text-secondary);
	}

	.action-btn.secondary:hover {
		border-color: var(--color-text-secondary);
		color: var(--color-text);
		background: transparent;
	}
</style>
