<script>
  export let moveHistory;
</script>

<div class="card">
  {#each moveHistory as move, i}
    {#if i % 2 === 0}
      <span class="turn-no">{Math.floor(i / 2 + 1)}.</span>
      <span class="white-move">{move[0]} to {move[1]}&nbsp; &nbsp; &nbsp;</span>
    {:else}
      <span class="black-move">{move[0]} to {move[1]}</span>
      <br />
    {/if}
  {/each}
</div>

<style>
  .card {
    padding: 1rem;
    width: 16rem;
    margin-left: 1rem;
    border: 1px solid #000;
    background-color: #c9d6df;
  }
</style>
