<script>
    import Square from './Square.svelte';

    const INITIALBOARD = [
        ['BQR', 'BQN', 'BQB', 'BQQ', 'BKK', 'BKB', 'BKN', 'BKR'],
        ['BAP', 'BBP', 'BCP', 'BDP', 'BEP', 'BFP', 'BGP', 'BHP'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['WAP', 'WBP', 'WCP', 'WDP', 'WEP', 'WFP', 'WGP', 'WHP'],
        ['WQR', 'WQN', 'WQB', 'WQQ', 'WKK', 'WKB', 'WKN', 'WKR']
    ];
</script>

<div class="board-container">
    <div class="board">
        {#each INITIALBOARD as row}
            <div class="row">
                {#each row as content}
                    <Square {content} />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .row:after {
        clear: both;
        content: "";
        display: table;
    }
</style>
