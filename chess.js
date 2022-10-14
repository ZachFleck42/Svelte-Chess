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

let GAMEHISTORY = [INITIALBOARD];


function getSquareFromCoordinates(coordinates) {
    return BOARDSQUARES[coordinates[0]][coordinates[1]];
}


function getCoordinatesFromSquare(square) {
    for (let i = 0; i < BOARDSQUARES.length; i++) {
        for (let j = 0; j < BOARDSQUARES[i].length; j++) {
            if (BOARDSQUARES[i][j] === square) {
                return [i, j];
            }
        }
    }
}


function getPieceCoordinates(gameBoard, gamePiece) {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === gamePiece) {
                return [i, j];
            }
        }
    }
}

function hasPieceMoved(boardHistory, piece) {
    let pieceInitialCoords = getPieceCoordinates(INITIALBOARD, piece);
    for (let i = 1; i < boardHistory.length; i++) {
        if (boardHistory[i][pieceInitialCoords[0]][pieceInitialCoords[1]] !== piece) {
            return 0;
        }
    }
    return 1;
}


function verifyValidPawnMove(boardHistory, pieceMoved, destinationSquare) {
    let currentBoard = boardHistory.at(-1);

    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
    let destSquareContent = currentBoard[destSquareCoords[0]][destSquareCoords[1]];

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];
    
    // Verify pawn is moving in the right direction based on its color
    if (pieceMoved[2] === 'W' && verticalDisplacement < 1) return 0;
    if (pieceMoved[2] === 'B' && verticalDisplacement > 1) return 0;

    if (Math.abs(verticalDisplacement) === 1) {
        //  Check for valid one-space move
        if (horizontalDisplacement === 0 && destSquareContent === 'x') {
            return 1;
        }
        // Check for valid capturing move
        else if (Math.abs(horizontalDisplacement) === 1) {
            // Check for en passant
            if (destSquareContent === 'x') {
                let enPasCheck1 = currentBoard[destSquareCoords[0] + verticalDisplacement][destSquareCoords[1]]
                let enPasCheck2 = boardHistory.at(-2)[destSquareCoords[0] - verticalDisplacement][destSquareCoords[1]]
                if (enPasCheck1 === enPasCheck2 && enPasCheck1[2] === 'P') {
                    return 'HOLYHELL'
                }
            }
            else return 1;
        }
    }
    // Check for valid two-space move
    else if (Math.abs(verticalDisplacement) === 2) {
        if (destSquareContent !== 'x') return 0;
        if (horizontalDisplacement !== 0) return 0;
        if (hasPieceMoved(boardHistory, pieceMoved)) return 0;

        let vertDirection = (verticalDisplacement < 0) ? 1 : -1;
        if (currentBoard[pieceCoords[0] + vertDirection][pieceCoords[1]] === 'x') {
            return 1;
        }
    }
}

function verifyValidKnightMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    if ((Math.abs(horizontalDisplacement) === 1 && Math.abs(verticalDisplacement) === 2)) {
        return 1;
    }
    else if ((Math.abs(horizontalDisplacement) === 2 && Math.abs(verticalDisplacement) === 1)) {
        return 1;
    }
}

function verifyValidBishopMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    // Verify bishop is moving diagnoally
    if (Math.abs(verticalDisplacement) !== Math.abs(horizontalDisplacement)) {
        return 0;
    }

    let vertDirection = (verticalDisplacement < 0) ? 1 : -1;
    let horizDirection = (horizontalDisplacement < 0) ? 1: -1;

    // Look for any pieces in the bishop's path
    for (let i = 1; i < Math.abs(verticalDisplacement); i++) {
        if (currentBoard[pieceCoords[0] + (i  * vertDirection)][pieceCoords[1] + (i * horizDirection)] !== 'x') {
            return 0;
        }
    }

    return 1;
}

function verifyValidRookMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    // Verify rook is moving straight up/down/left/right
    if (verticalDisplacement !== 0 && horizontalDisplacement !== 0) return 0;

    let vertDirection = 0;
    if (verticalDisplacement < 0) vertDirection = 1;
    else if (verticalDisplacement > 0) vertDirection = -1;
    
    let horizDirection = 0;
    if (horizontalDisplacement < 0) horizDirection = 1;
    else if (horizontalDisplacement > 0) horizDirection = -1;

    // Look for any pieces in the rook's path
    for (let i = 1; i < Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement)); i++) {
        if (currentBoard[pieceCoords[0] + (i  * vertDirection)][pieceCoords[1] + (i * horizDirection)] !== 'x') {
            return 0;
        }
    }

    return 1;
}

function verifyValidQueenMove(currentBoard, pieceMoved, destinationSquare) {
    let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
    let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

    let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
    let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

    // Verify queen is moving diagonally or straight up/down/left/right
    if (Math.abs(verticalDisplacement) !== Math.abs(horizontalDisplacement)) {
        if (verticalDisplacement !== 0 && horizontalDisplacement !== 0) {
            return 0;
        }
    }

    let vertDirection = 0;
    if (verticalDisplacement < 0) vertDirection = 1;
    else if (verticalDisplacement > 0) vertDirection = -1;
    
    let horizDirection = 0;
    if (horizontalDisplacement < 0) horizDirection = 1;
    else if (horizontalDisplacement > 0) horizDirection = -1;

    // Look for any pieces in the queen's path
    for (let i = 1; i < Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement)); i++) {
        if (currentBoard[pieceCoords[0] + (i  * vertDirection)][pieceCoords[1] + (i * horizDirection)] !== 'x') {
            return 0;
        }
    }

    return 1;
}

function verifyValidKingMove(gameHistory, pieceMoved, destinationSquare) {
    if (Math.abs(horizontalDisplacement) <= 1 && Math.abs(verticalDisplacement) <=1) {
        return 1;
    }

}


function verifyProperMovement(boardHistory, pieceMoved, destinationSquare) {
    let currentBoard = boardHistory.at(-1);
    let pieceMovedArrayPos = getPieceCoordinates(currentBoard, pieceMoved);
    let destinationSquareArrayPos = getCoordinatesFromSquare(destinationSquare);
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

    // Check piece-specific movement
    switch (pieceMoved[2]) {
        case 'P':
            return verifyValidPawnMove;
        case 'N':
            return verifyValidKnightMove;
        case 'B':
            return verifyValidBishopMove;
        case 'R':
            return verifyValidRookMove;
        case 'Q':
            return verifyValidQueenMove;
        case 'K':
            return verifyValidKingMove;
    }
}


function updateBoardStandard(oldBoard, pieceMoved, destinationSquare) {
    let newBoard = oldBoard.map(
        (row, indexOfRowInBoard) => {
            return row.map(
                (square, indexOfSquareInRow) => {
                    for (let i = 0; i < row.length; i++) {
                        let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
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
    GAMEHISTORY.push(newBoard)
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


let testBoard1 = updateBoardStandard(GAMEHISTORY.at(-1), 'WCP', 'c5');
let testBoard2 = updateBoardStandard(GAMEHISTORY.at(-1), 'BBP', 'b5');

let currentBoard = GAMEHISTORY.at(-1); console.log(currentBoard);

if(verifyValidPawnMove(GAMEHISTORY, 'WCP', 'b6')) {
    console.log("VALID");
}
else {
    console.log("INVALID");
}