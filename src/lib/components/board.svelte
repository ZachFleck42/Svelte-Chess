<script>
    import Square from './Square.svelte';

    export let board;
</script>

<div class="board">
    {#each board as row, i}
        <div class="row">
            {#each row as content, j}
                <Square {content} position={[i, j]} on:click />
            {/each}
        </div>
    {/each}
</div>

<style>
    .row:after {
        clear: both;
        content: "";
        display: table;
    }
</style>
