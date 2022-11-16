<script>
    import { afterUpdate } from "svelte";
    export let moveHistory;

    // Create a more convenient array for rendering
    let turns = [];
    afterUpdate(() => {
        let tempArray = [];
        for (let i = 0; i < moveHistory.length; i += 2) {
            let turnNumber = Math.floor(i / 2 + 1);
            let whiteMove = `${moveHistory[i][0]} to ${moveHistory[i][1]}`;
            let blackMove = (moveHistory[i + 1]) 
                ? `${moveHistory[i + 1][0]} to ${moveHistory[i + 1][1]}`
                : ''

            tempArray.push([
                turnNumber, 
                whiteMove,
                blackMove
            ]);
        }
        turns = tempArray;
    });
</script>

<div class="card">
    {#each turns as turn, i}
        <p>{turn[0]}. {turn[1]}   |   {turn[2]}</p>
    {/each}
</div>

<style>
    .card {
        padding: 1rem;
        width: 16rem;
        margin-left: 1rem;
        border: 1px solid #000;
        background-color: #C9D6DF;
    }
</style>