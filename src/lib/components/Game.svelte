<script>
    import Board from './Board.svelte';

    const BOARDSQUARES = [
        ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
        ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
        ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
        ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
        ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
        ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
        ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
        ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
    ];

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

    let boardHistory = [INITIALBOARD];


    function getCoordinatesFromSquare(square) {
        for (let i = 0; i < BOARDSQUARES.length; i++) {
            for (let j = 0; j < BOARDSQUARES[i].length; j++) {
                if (BOARDSQUARES[i][j] === square) {
                    return [i, j];
			    }
		    }
	    }
    }


    function getNewBoard(oldBoard, pieceMoved, destinationSquare) {
        let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

        let newBoard = oldBoard.map((row, rowIndex) => {
            return row.map((square, squareIndex) => {
                for (let i = 0; i < row.length; i++) {
                    if (square === pieceMoved) {
                        return 'x';
                    } else if (destSquareCoords[0] === rowIndex && destSquareCoords[1] === squareIndex) {
                        return pieceMoved;
                    } else return square;
                }
            });
        });

        return newBoard;
    }

    function addBoardToHistory(newBoard) {
        boardHistory = [...boardHistory, newBoard];
    }

    const handleClick = (event) => {
        let squareCoords = event.detail[0];
        let square = BOARDSQUARES[squareCoords[0]][squareCoords[1]];
        let squareContent = event.detail[1];
        
        console.log(square, squareContent);
    }

</script>

<div class="game">
    <Board board={boardHistory[boardHistory.length - 1]} on:click={handleClick}/>
</div>

<style>
    .game {
        display: flex;
        justify-content: center;
        margin: 40px auto;
    }
</style>