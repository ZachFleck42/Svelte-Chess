<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let content;
    export let position;

    const src = content[0] + content[2];
</script>

<div>
    <button on:click={() => dispatch('click', [position, content])}>
        {#if content !== 'x'}
            <img src="src/assets/{src}.svg" alt="{src}">
        {:else if content === 'x'}
            <p></p>
        {:else}
            <p>?</p>
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

        background: #fff;
        border: 1px solid #999;
    }

    img {
        height: 50px;
        width: 50px;
    }
</style>
