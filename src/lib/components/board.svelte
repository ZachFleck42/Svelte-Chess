<script>
	import Square from './Square.svelte';

	export let board;
</script>

<div class="board">
	{#each board as row, i}
		{#each row as content, j}
			<Square {content} position={[i, j]} on:click />
		{/each}
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 71px 71px 71px 71px 71px 71px 71px 71px;
		grid-template-rows: 71px 71px 71px 71px 71px 71px 71px 71px;
	}
</style>
