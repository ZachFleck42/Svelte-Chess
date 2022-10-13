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


function getSquareFromCoordinates(coordinatesArray) {
    return boardSquares[coordinatesArray[0]][coordinatesArray[1]];
}


function getSquareCoordinates(square) {
    for (let i = 0; i < boardSquares.length; i++) {
        for (let j = 0; j < boardSquares[i].length; j++) {
            if (boardSquares[i][j] === square) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}


function getPieceCoordinates(gameBoard, gamePiece) {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === gamePiece) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}


function verifyValidPawnMove(boardHistory, pieceMoved, destinationSquare) {
    let currentBoard = boardHistory.at(-1);

    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getSquareCoordinates(destinationSquare);
    let destSquareContent = currentBoard[destSquareCoords[0]][destSquareCoords[1]];

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if (pieceMoved[0] === 'W') {
        if (verticalDisplacement === 1) {
            if (horizontalDisplacement === 0) {
                if (destSquareContent === 'x') {
                    return 1;
                }
            }
            else if (Math.abs(horizontalDisplacement) === 1) {
                if (destSquareContent[0] === 'B') {
                    return 1;
                }
                else if (currentBoard[destSquareCoords[0] + 1][destSquareCoords[1]] === ('B' + destinationSquare[0].toUpperCase() + 'P')) {
                    if (boardHistory.at(-2)[destSquareCoords[0] - 1][destSquareCoords[1]] === ('B' + destinationSquare[0].toUpperCase() + 'P')) {
                        return 'HOLYHELL';
                    }
                }
            }
        }
        else if (verticalDisplacement === 2 && horizontalDisplacement === 0) {
            if (pieceCoords[0] === 6) {
                if (destSquareContent === 'x' && currentBoard[destSquareCoords[0] + 1][destSquareCoords[1]] === 'x') {
                    return 1;
                }
            }
        }
    }
    else if (pieceMoved[0] === 'B') {
        if (verticalDisplacement === -1) {
            if (horizontalDisplacement === 0) {
                if (destSquareContent === 'x') {
                    return 1;
                }
            }
            else if (Math.abs(horizontalDisplacement) === 1) {
                if (destSquareContent[0] === 'W') {
                    return 1;
                }
                else if (boardHistory.at(-2)[destSquareCoords[0] + 1][destSquareCoords[1]] === ('W' + destinationSquare[0].toUpperCase() + 'P') && currentBoard[destSquareCoords[0] - 1][destSquareCoords[1]] === ('W' + destinationSquare[0].toUpperCase() + 'P')) {
                    return 'HOLYHELL';
                }
            }
        }
        else if (verticalDisplacement === -2 && horizontalDisplacement === 0) {
            if (pieceCoords[0] === 1) {
                if (destSquareContent === 'x' && currentBoard[destSquareCoords[0] - 1][destSquareCoords[1]] === 'x') {
                    return 1;
                }
            }
        }
    }

    return 0;
}

function verifyValidKnightMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getSquareCoordinates(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if ((Math.abs(horizontalDisplacement) === 1 && Math.abs(verticalDisplacement) === 2)) {
        return 1;
    }
    else if ((Math.abs(horizontalDisplacement) === 2 && Math.abs(verticalDisplacement) === 1)) {
        return 1;
    }

    return 0;
}

function verifyValidBishopMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getSquareCoordinates(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if (Math.abs(verticalDisplacement) !== Math.abs(horizontalDisplacement)) {
        return 0;
    }

    let verticalModifier = (verticalDisplacement < 0) ? 1 : -1;
    let horizontalModifier = (horizontalDisplacement < 0) ? 1: -1;

    for (let i = 1; i < Math.abs(verticalDisplacement); i++) {
        if (currentBoard[pieceCoords[0] + (i  * verticalModifier)][pieceCoords[1] + (i * horizontalModifier)] !== 'x') {
            return 0;
        }
    }

    return 1;
}

function verifyValidRookMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getSquareCoordinates(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if (verticalDisplacement !== 0 && horizontalDisplacement !== 0) {
        return 0;
    }

    let verticalModifier = 0
    if (verticalDisplacement < 0) {
        verticalModifier = 1
    }
    else if (verticalDisplacement > 0) {
        verticalModifier = -1
    }
    
    let horizontalModifier = 0
    if (horizontalDisplacement < 0) {
        horizontalModifier = 1
    }
    else if (horizontalDisplacement > 0) {
        horizontalModifier = -1
    }

    for (let i = 1; i < Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement)); i++) {
        if (currentBoard[pieceCoords[0] + (i  * verticalModifier)][pieceCoords[1] + (i * horizontalModifier)] !== 'x') {
            return 0;
        }
    }

    return 1;
}

function verifyValidQueenMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getSquareCoordinates(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if (verticalDisplacement !== horizontalDisplacement) {
        if (verticalDisplacement !== 0 && horizontalDisplacement !== 0) {
            return 0;
        }
    }

    let verticalModifier = 0
    if (verticalDisplacement < 0) {
        verticalModifier = 1
    }
    else if (verticalDisplacement > 0) {
        verticalModifier = -1
    }
    
    let horizontalModifier = 0
    if (horizontalDisplacement < 0) {
        horizontalModifier = 1
    }
    else if (horizontalDisplacement > 0) {
        horizontalModifier = -1
    }

    for (let i = 1; i < Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement)); i++) {
        console.log("hi")
        if (currentBoard[pieceCoords[0] + (i  * verticalModifier)][pieceCoords[1] + (i * horizontalModifier)] !== 'x') {
            return 0;
        }
    }
    return 1;
}

function verifyValidKingMove(gameHistory, pieceMoved, destinationSquare) {
    
}



function checkIfPieceMovedProperly(boardHistory, pieceMoved, destinationSquare) {
    let currentBoard = boardHistory.at(-1);
    let pieceMovedArrayPos = getPieceCoordinates(currentBoard, pieceMoved);
    let destinationSquareArrayPos = getSquareCoordinates(destinationSquare);
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
        if (!(pieceMoved[2] === 'K' && destinationSquareContent[2] === 'R')) {
            return 'Space is already occupied by one of your pieces.';
        }
    }

    // Pawn logic
    if (pieceMoved[2] === 'P') {
      
    }
    
    // Knight logic
    if (pieceMoved[2] === 'N') {

    }
    
    // Bishop logic
    if (pieceMoved[2] === 'B') {

    }
    
    // Rook logic
    if (pieceMoved[2] === 'R') {

    }
    
    // Queen logic
    if (pieceMoved[2] === 'Q') {
        if (verticalDisplacement > 0) {
            if (Math.abs(verticalDisplacement) === Math.abs(horizontalDisplacement)) {
                if (horizontalDisplacement > 0) {           // Up-left
                    for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                        if (currentBoard[pieceMovedArrayPos[0] - i][pieceMovedArrayPos[2] - i] !== 'x') {
                            return 'There\'s a piece in your way.';
                        }
                    }
                }
                else if (horizontalDisplacement < 0) {      // Up-right
                    for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                        if (currentBoard[pieceMovedArrayPos[0] - i][Number(pieceMovedArrayPos[2]) + i] !== 'x') {
                            return 'There\'s a piece in your way.';
                        }
                    }
                }
            }
            else if (horizontalDisplacement === 0) {        // Straight up
                for (let i = 1; i < Math.abs(verticalDisplacement); i++) {
                    if (currentBoard[pieceMovedArrayPos[0] - i][pieceMovedArrayPos[2]] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
            else {
                return 'Invalid queen movement.';
            }
        }
        else if (verticalDisplacement < 0) {
            if (Math.abs(verticalDisplacement) === Math.abs(horizontalDisplacement)) {
                if (horizontalDisplacement > 0) {           // Down-left
                    for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                        if (currentBoard[Number(pieceMovedArrayPos[0]) + i][pieceMovedArrayPos[2] - i] !== 'x') {
                            return 'There\'s a piece in your way.';
                        }
                    }
                }
                else if (horizontalDisplacement < 0 ) {     // Down-right
                    for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                        if (currentBoard[Number(pieceMovedArrayPos[0]) + i][Number(pieceMovedArrayPos[2]) + i] !== 'x') {
                            return 'There\'s a piece in your way.';
                        }
                    }
                }
            }
            else if (horizontalDisplacement === 0) {        // Straight down
                for (let i = 1; i < Math.abs(verticalDisplacement); i++) {
                    if (currentBoard[Number(pieceMovedArrayPos[0]) + i][pieceMovedArrayPos[2]] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
            else {
                return 'Invalid queen movement.';
            }
        }
        else if (verticalDisplacement === 0) {
            if (horizontalDisplacement > 0) {               // Straight left
                for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                    if (currentBoard[pieceMovedArrayPos[0]][pieceMovedArrayPos[2] - i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
            else if (horizontalDisplacement < 0) {          // Straight right
                for (let i = 1; i < Math.abs(horizontalDisplacement); i++) {
                    if (currentBoard[pieceMovedArrayPos[0]][Number(pieceMovedArrayPos[2]) + i] !== 'x') {
                        return 'There\'s a piece in your way.';
                    }
                }
            }
        }
        return 0;
    }

    // King logic
    if (pieceMoved[2] === 'K') {
        if (Math.abs(horizontalDisplacement) <= 1 && Math.abs(verticalDisplacement) <=1) {
            return 0;
        }
        else if (pieceMoved[0] === 'W' && getSquareFromCoordinates(pieceMovedArrayPos) === 'e1') {
            if (destinationSquare === 'a1' || destinationSquare === 'c1') {
                if (currentBoard[7][0] === 'WQR' && currentBoard[7][1] === 'x' && currentBoard[7][2] === 'x' && currentBoard[7][3] === 'x') {
                    for (let i = 0; i < boardHistory.length; i++) {
                        if (boardHistory[i][7][0] !== 'WQR' || boardHistory[i][7][4] !== 'WKK') {
                            return 'Invalid castle attempt.';
                        }
                    }
                    return 'CASTLE';
                }
            }
            else if (destinationSquare === 'g1' || 'h1') {
                if (currentBoard[7][7] === 'WKR' && currentBoard[7][6] === 'x' && currentBoard[7][5] === 'x') {
                    for (let i = 0; i < boardHistory.length; i++) {
                        if (boardHistory[i][7][7] !== 'WKR' || boardHistory[i][7][4] !== 'WKK') {
                            return 'Invalid castle attempt.';
                        }
                    }
                    return 'CASTLE';
                }
            }
        }
        else if (pieceMoved[0] === 'B' && getSquareFromCoordinates(pieceMovedArrayPos) === 'e8') {
            if (destinationSquare === 'a8' || destinationSquare === 'c8') {
                if (currentBoard[0][0] === 'BQR' && currentBoard[0][1] === 'x' && currentBoard[0][2] === 'x' && currentBoard[0][3] === 'x') {
                    for (let i = 0; i < boardHistory.length; i++) {
                        if (boardHistory[i][0][0] !== 'BQR' || boardHistory[i][0][4] !== 'BKK') {
                            return 'Invalid castle attempt.';
                        }
                    }
                    return 'CASTLE';
                }
            }
            else if (destinationSquare === 'g8' || destinationSquare === 'h8') {
                if (currentBoard[0][7] === 'BKR' && currentBoard[0][6] === 'x' && currentBoard[0][5] === 'x') {
                    for (let i = 0; i < boardHistory.length; i++) {
                        if (boardHistory[i][0][7] !== 'BKR' || boardHistory[i][0][4] !== 'BKK') {
                            return 'Invalid castle attempt.';
                        }
                    }
                    return 'CASTLE';
                }
            }
        }
        return 'Invalid king movement.';
    }
}


function updateBoardStandard(oldBoard, pieceMoved, destinationSquare) {
    let newBoard = oldBoard.map(
        (row, indexOfRowInBoard) => {
            return row.map(
                (square, indexOfSquareInRow) => {
                    for (let i = 0; i < row.length; i++) {
                        let destSquareCoords = getSquareCoordinates(destinationSquare);
                        if (square === pieceMoved) {
                            return 'x';
                        }
                        else if (destSquareCoords[0] === indexOfRowInBoard && destSquareCoords[1] === indexOfSquareInRow) {
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


let testBoard1 = updateBoardStandard(gameHistory.at(-1), 'WQB', 'c3');
let currentBoard = gameHistory.at(-1);
console.log(currentBoard)
console.log(verifyValidBishopMove(currentBoard, 'WQB', 'b4'))