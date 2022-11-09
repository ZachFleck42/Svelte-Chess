<script>
    import Square from './Square.svelte';
    let content = 'BKK';
</script>

<div class="board">
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
    <div class="row">
        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />

        <Square {content} />
        <Square {content} />
        <Square {content} />
        <Square {content} />
    </div>
</div>

<style>
    .row:after {
        clear: both;
        content: "";
        display: table;
    }
</style>
