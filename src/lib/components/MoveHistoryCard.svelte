<script>
    export let moveHistory;
</script>

<div class="card">
    {#each moveHistory as move}
        <p>{move}</p>
    {/each}
</div>

<style>
    .card {
        width: 120px;
        margin-left: 10px;
        border: 1px solid #000;
        background-color: #C9D6DF;
    }
</style>