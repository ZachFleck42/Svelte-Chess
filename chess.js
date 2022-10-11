const boardSquares = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
];

const initialBoard = [
    ['BQR', 'BQN', 'BQB', 'BQQ', 'BKK', 'BKB', 'BKN', 'BKR'],
    ['BAP', 'BBP', 'BCP', 'BDP', 'BEP', 'BFP', 'BGP', 'BHP'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['WAP', 'WBP', 'WCP', 'WDP', 'WEP', 'WFP', 'WGP', 'WHP'],
    ['WQR', 'WQN', 'WQB', 'WQQ', 'WKK', 'WKB', 'WKN', 'WKR']
];

let gameHistory = [initialBoard];


function getSquare(arrayPos) {
    return boardSquares[arrayPos[0]][arrayPos[2]];
}


function getSquareArrayPos(square) {
    for (let i = 0; i < boardSquares.length; i++) {
        for (let j = 0; j < boardSquares[i].length; j++) {
            if (boardSquares[i][j] === square) {
                return `${i},${j}`;
            }
        }
    }
    return [-1, -1];
}


function getPieceArrayPos(gameBoard, gamePiece) {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === gamePiece) {
                return `${i},${j}`;
            }
        }
    }
}


function checkIfPieceMovedProperly(boardHistory, pieceMoved, destinationSquare) {
    let currentBoard = boardHistory.at(-1);
    let pieceMovedArrayPos = getPieceArrayPos(currentBoard, pieceMoved);
    let destinationSquareArrayPos = getSquareArrayPos(destinationSquare);
    let destinationSquareContent = currentBoard[destinationSquareArrayPos[0]][destinationSquareArrayPos[2]];

    // Verify destinationSquare is on the board
    if (!('abcdefgh'.includes(destinationSquare[0])) || destinationSquare[1] < 1 || destinationSquare[1] > 8) {
        return 'That\'s not even on the board.';
    }

    // Verify piece is not moving to the square it's already on
    if (pieceMovedArrayPos === destinationSquareArrayPos) {
        return 'That\'s the same spot.';
    }

    // Verify piece is not attempting to capture a piece of its own color
    if (pieceMoved[0] === destinationSquareContent[0]) {
        if (pieceMoved[1] !== 'K' && destinationSquareContent[1] !== 'R') {
            return 'Space is already occupied by one of your pieces.';
        }
    }

    // Pawn logic
    if (pieceMoved[2] === 'P') {
        // White pawns
        if (pieceMoved[0] === 'W') {
            if (pieceMovedArrayPos[0] - destinationSquareArrayPos[0] === 1) {
                if (pieceMovedArrayPos[2] === destinationSquareArrayPos[2]) {
                    if (destinationSquareContent === 'x') {
                        return 0;
                    }
                    else {
                        return 'There\'s a piece in your way.';
                    }
                }
                else if (Math.abs(pieceMovedArrayPos[2] - destinationSquareArrayPos[2]) === 1) {
                    if (destinationSquareContent[0] === 'B') {
                        return 0;
                    }
                    else if (boardHistory.at(-2)[destinationSquareArrayPos[0] - 1][destinationSquareArrayPos[2]] === ('B' + destinationSquare[0].toUpperCase() + 'P') && currentBoard[Number(destinationSquareArrayPos[0]) + 1][destinationSquareArrayPos[2]] === ('B' + destinationSquare[0].toUpperCase() + 'P')) {
                        return 'HOLYHELL';
                    }
                    else {
                        return 'There\'s no piece to capture there.';
                    }
                }
            }
            else if (pieceMovedArrayPos[0] - destinationSquareArrayPos[0] === 2 && pieceMovedArrayPos[2] === destinationSquareArrayPos[2]) {
                if (pieceMovedArrayPos[0] === '6') {
                    if (destinationSquareContent === 'x' && currentBoard[destinationSquareArrayPos[0] - 1][destinationSquareArrayPos[2]] === 'x') {
                        return 0;
                    }
                    else {
                        return 'There\'s a piece in your way.';
                    }
                }
                else {
                    return 'You can only move a pawn two spaces forward from its starting position.';
                }
            }
        }
        // Black pawns
        else if (pieceMoved[0] === 'B') {
            if (pieceMovedArrayPos[0] - destinationSquareArrayPos[0] === -1) {
                if (pieceMovedArrayPos[2] === destinationSquareArrayPos[2]) {
                    if (destinationSquareContent === 'x') {
                        return 0;
                    }
                    else {
                        return 'There\'s a piece in your way.';
                    }
                }
                else if (Math.abs(pieceMovedArrayPos[2] - destinationSquareArrayPos[2]) === 1) {
                    if (destinationSquareContent[0] === 'W') {
                        return 0;
                    }
                    else if (boardHistory.at(-2)[Number(destinationSquareArrayPos[0]) + 1][destinationSquareArrayPos[2]] === ('B' + destinationSquare[0].toUpperCase() + 'P') && currentBoard[destinationSquareArrayPos[0] - 1][destinationSquareArrayPos[2]] === ('B' + destinationSquare[0].toUpperCase() + 'P')) {
                        return 'HOLYHELL';
                    }
                    else {
                        return 'There\'s no piece to capture there.';
                    }
                }
            }
            else if (pieceMovedArrayPos[0] - destinationSquareArrayPos[0] === -2 && pieceMovedArrayPos[2] === destinationSquareArrayPos[2]) {
                if (pieceMovedArrayPos[0] === '1') {
                    if (destinationSquareContent === 'x' && currentBoard[Number(destinationSquareArrayPos[0]) + 1][destinationSquareArrayPos[2]] === 'x') {
                        return 0;
                    }
                    else {
                        return 'There\'s a piece in your way.';
                    }
                }
                else {
                    return 'You can only move a pawn two spaces forward from its starting position.';
                }
            }
        }
        return 'Invalid pawn movement.';
    }
    
    let verticalDisplacement = pieceMovedArrayPos[0] - destinationSquareArrayPos[0];
    let horizontalDisplacement = pieceMovedArrayPos[2] - destinationSquareArrayPos[2];

    // Knight logic
    if (pieceMoved[2] === 'N') {
        if ((Math.abs(horizontalDisplacement) === 1 && Math.abs(verticalDisplacement) === 2) || (Math.abs(horizontalDisplacement) === 2 && Math.abs(verticalDisplacement) === 1)) {
            return 0;
        }
        return 'Invalid knight movement.';
    }
    
    // Bishop logic
    if (pieceMoved[2] === 'B') {
        if (Math.abs(verticalDisplacement) !== Math.abs(horizontalDisplacement)) {
            return 'Invalid bishop movement.';
        }

        if (verticalDisplacement > 0) {
            if (horizontalDisplacement > 0) {       // Up-left
                for (let i = 0; i < Math.abs(horizontalDisplacement) - 1; i++) {
                    if (currentBoard[pieceMovedArrayPos[0] - i][pieceMovedArrayPos[2] - i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
            else if (horizontalDisplacement < 0) {  // Up-right
                for (let i = 0; i < Math.abs(horizontalDisplacement) - 1; i++) {
                    if (currentBoard[pieceMovedArrayPos[0] - i][Number(pieceMovedArrayPos[2]) + i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
        }
        else if (verticalDisplacement < 0) {
            if (horizontalDisplacement > 0) {       // Down-left
                for (let i = 0; i < Math.abs(horizontalDisplacement) - 1; i++) {
                    if (currentBoard[pieceMovedArrayPos[0] - i][Number(pieceMovedArrayPos[2]) + i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
            else if (horizontalDisplacement < 0 ) { // Down-right
                for (let i = 0; i < Math.abs(horizontalDisplacement) - 1; i++) {
                    if (currentBoard[pieceMovedArrayPos[0] - i][pieceMovedArrayPos[2] - i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
        }

        return 0;
    }
    
    // Rook logic
    if (pieceMoved[2] === 'R') {

    }
    

    // Queen logic
    if (pieceMoved[2] === 'Q') {

    }

    // King logic
    if (pieceMoved[2] === 'K') {

    }
}


function updateBoardStandard(oldBoard, pieceMoved, destinationSquare) {
    let newBoard = oldBoard.map(
        (row, indexOfRowInBoard) => {
            return row.map(
                (square, indexOfSquareInRow) => {
                    for (let i = 0; i < row.length; i++) {
                        if (square === pieceMoved) {
                            return 'x';
                        }
                        else if (getSquareArrayPos(destinationSquare) === `${indexOfRowInBoard},${indexOfSquareInRow}`) {
                            return pieceMoved;
                        }
                        else {
                            return square;
                        }
                    }
                }
            )
        }
    )
    gameHistory.push(newBoard)
    return newBoard;
}


function updateBoardCastling() {

}


function updateBoardEnPassant() {

}


// Main game loop; runs until checkmate

    // Player picks a piece to move
        // Check if piece has valid moves?
    
    // Player picks a square to move selected piece to
    
    // Check if move is valid

    // If valid move, check for check(mate)
        // If check, note for next move
        // If checkmate, end game


let testBoard1 = updateBoardStandard(gameHistory.at(-1), 'WKB', 'c3');
console.log(gameHistory.at(-1));
console.log(checkIfPieceMovedProperly(gameHistory, 'WKB', 'e5'))