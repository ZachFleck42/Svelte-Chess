<script>
    export let content;
    let src = content[0] + content[2];
</script>

<div>
    <button class="square"><img src="src/assets/{src}.svg" alt="{src}"></button>
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
