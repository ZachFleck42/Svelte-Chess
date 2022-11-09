<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let content;
    export let position;

    const src = content[0] + content[2];
</script>

<div>
    <button on:click={() => dispatch('click', position)}>
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
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 72px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 72px;
    }

    img {
        height: 50px;
        width: 50px;
    }
</style>
