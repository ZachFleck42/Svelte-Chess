<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let content;
	export let position;

	let squareColor = 'darkgrey';
	if (position[0] % 2 === 0) {
		if (position[1] % 2 === 0) {
			squareColor = 'white';
		}
	}
	else {
		if (position[1] % 2 !== 0) {
			squareColor = 'white';
		}
	}
</script>

<div>
	<button 
		on:click={() => dispatch('click', [position, content])}
		style="background: {squareColor}">
		{#if content === 'x'}
			<p />
		{:else}
			<img src="src/assets/{content[0] + content[2]}.svg" alt="{content[0] + content[2]}" />
		{/if}
	</button>
</div>

<style>
	button {
		height: 72px;
		width: 72px;

		margin-right: -1px;
		margin-top: -1px;
		padding: 0;

		/* background: #fff; */
		border: 1px solid #999;
	}

	img {
		height: 50px;
		width: 50px;
	}
</style>
