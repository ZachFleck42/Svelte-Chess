<script>
    export let content;
    export let position;

    let src = content[0] + content[2];
    let row = position[0];
    let column = position[1];

    function handleClick () {
        console.log(`${row}, ${column}`);
    }
</script>

<div>
    <button class="square" on:click={handleClick}>
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
    .square {
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
