<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	:global(body) {
		font-family: 'Cormorant Garamond', Georgia, serif;
	}
</style>
