let gamePieces = []

function createNewGamePiece(abbreviation, name, color, notation, startPos) {
    piece = {
        abbreviation: abbreviation,
        name: name,
        color: color,
        notation: notation,
        startPos: startPos,
    }

    gamePieces.push(piece);
    return piece;
}

const BKR = createNewGamePiece('BKR', 'Black\'s Kingside Rook', 'Black', 'R', 'a8');
const BKN = createNewGamePiece('BKN', 'Black\'s Kingside Knight', 'Black', 'N', 'b8');
const BKB = createNewGamePiece('BKB', 'Black\'s Kingside Bishop', 'Black', 'B', 'c8');
const BQQ = createNewGamePiece('BQQ', 'Black\'s Queen', 'Black', 'Q', 'd8');
const BKK = createNewGamePiece('BKK', 'Black\'s King', 'Black', 'K', 'e8');
const BQB = createNewGamePiece('BQB', 'Black\'s Queenside Bishop', 'Black', 'B', 'f8');
const BQN = createNewGamePiece('BQN', 'Black\'s Queenside Knight', 'Black', 'N', 'g8');
const BQR = createNewGamePiece('BQR', 'Black\'s Queenside Rook', 'Black', 'R', 'h8');
const BPA = createNewGamePiece('BPA', 'Black\'s A Pawn', 'Black', 'P', 'a7');
const BPB = createNewGamePiece('BPB', 'Black\'s B Pawn', 'Black', 'P', 'b7');
const BPC = createNewGamePiece('BPC', 'Black\'s C Pawn', 'Black', 'P', 'c7');
const BPD = createNewGamePiece('BPD', 'Black\'s D Pawn', 'Black', 'P', 'd7');
const BPE = createNewGamePiece('BPE', 'Black\'s E Pawn', 'Black', 'P', 'e7');
const BPF = createNewGamePiece('BPF', 'Black\'s F Pawn', 'Black', 'P', 'f7');
const BPG = createNewGamePiece('BPG', 'Black\'s G Pawn', 'Black', 'P', 'g7');
const BPH = createNewGamePiece('BPH', 'Black\'s H Pawn', 'Black', 'P', 'h7');

const WKR = createNewGamePiece('WKR', 'White\'s Kingside Rook', 'White', 'R', 'a1');
const WKN = createNewGamePiece('WKN', 'White\'s Kingside Knight', 'White', 'N', 'b1');
const WKB = createNewGamePiece('WKB', 'White\'s Kingside Bishop', 'White', 'B', 'c1');
const WQQ = createNewGamePiece('WQQ', 'White\'s Queen', 'White', 'Q', 'd1');
const WKK = createNewGamePiece('WKK', 'White\'s King', 'White', 'K', 'e1');
const WQB = createNewGamePiece('WQB', 'White\'s Queenside Bishop', 'White', 'B', 'f1');
const WQN = createNewGamePiece('WQN', 'White\'s Queenside Knight', 'White', 'N', 'g1');
const WQR = createNewGamePiece('WQR', 'White\'s Queenside Rook', 'White', 'R', 'h1');
const WPA = createNewGamePiece('WPA', 'White\'s A Pawn', 'White', 'P', 'a2');
const WPB = createNewGamePiece('WPB', 'White\'s B Pawn', 'White', 'P', 'b2');
const WPC = createNewGamePiece('WPC', 'White\'s C Pawn', 'White', 'P', 'c2');
const WPD = createNewGamePiece('WPD', 'White\'s D Pawn', 'White', 'P', 'd2');
const WPE = createNewGamePiece('WPE', 'White\'s E Pawn', 'White', 'P', 'e2');
const WPF = createNewGamePiece('WPF', 'White\'s F Pawn', 'White', 'P', 'f2');
const WPG = createNewGamePiece('WPG', 'White\'s G Pawn', 'White', 'P', 'g2');
const WPH = createNewGamePiece('WPH', 'White\'s H Pawn', 'White', 'P', 'h2');           

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

let initialBoard = boardSquares.map(
    (row) => {
        return row.map(
            (square) => {
                for (let i = 0; i < gamePieces.length; i++) {
                    if (gamePieces[i].startPos === square) {
                        return gamePieces[i].abbreviation
                    }
                }
                return 'x';
            }
        )
    }
)

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

function checkMoveValidity(gameBoard, pieceMoved, destinationSquare) {
    // Verify destinationSquare is on the board
    if (!('abcdefgh'.includes(destinationSquare[0])) || destinationSquare[1] < 1 || destinationSquare[1] > 8) {
        return 'That\'s not even on the board.';
    }

    let piecePos = getPieceArrayPos(gameBoard, pieceMoved)
    let squarePos = getSquareArrayPos(destinationSquare)
    let destinationSquareContent = gameBoard[squarePos[0]][squarePos[2]]

    // Verify piece is not moving to square it's already on
    if (piecePos === squarePos) {
        return 'That\'s the same spot.';
    }

    // Pawn logic
    if (pieceMoved[1] === 'P') {
        // White pawn logic
        if (pieceMoved[0] === 'W') {
            // Verify pawn is only moving forward one or two spaces
            if (piecePos[0] - squarePos[0] !== 1) {
                // Allow pawn to move two spaces forward if it's in its starting position and no other pieces are in its path
                if ((piecePos[0] - squarePos[0] === 2) && (piecePos[0] === '6') && (squarePos[2] === piecePos[2])) {
                    if ((destinationSquareContent === 'x') && (gameBoard[Number(piecePos[0]) - 1][piecePos[2]] === 'x')) {
                        return 0;
                    }
                    return 'There\'s a piece in your way.';
                }
                return 'Pawns can only move one space forward (or two, but only from its starting position).';
            }

            // Verify pawn is not moving left/right unless capturing an enemy piece
            if (piecePos[2] !== squarePos[2]) {
                if (piecePos[2] - squarePos[2] > 1 || piecePos[2] - squarePos[2] < -1) {
                    return 'Pawns can\'t move that far sideways.';
                }

                // Verify the capturing move is valid
                if (destinationSquareContent[0] === 'B') {
                    return 0;
                }
                else if (destinationSquareContent[0] === 'W') {
                    return 'You can\'t capture your own pieces.';
                }
                else if (destinationSquareContent[0] === 'x') {
                    if (gameBoard[Number(squarePos[0]) + 1][squarePos[2]].slice(0, 2) === 'BP') {
                        return 'HOLYHELL'
                    }
                    return 'There\'s no piece to capture there.';
                }
                return 'How did we get here? PAWNS!'
            }

            // Passed all filters; it's a valid move
            return 0;
        }
        else if (pieceMoved[0] === 'B') {
            // Verify pawn is only moving forward one or two spaces
            if (squarePos[0] - piecePos[0] !== 1) {
                // Allow pawn to move two spaces forward if it's in its starting position and no other pieces are in its path
                if ((squarePos[0] - piecePos[0] === 2) && (piecePos[0] === '1') && (squarePos[2] === piecePos[2])) {
                    if ((destinationSquareContent === 'x') && (gameBoard[Number(piecePos[0]) + 1][piecePos[2]] === 'x')) {
                        return 0;
                    }
                    return 'There\'s a piece in your way.';
                }
                return 'Pawns can only move one space forward (or two, but only from its starting position).';
            }

            // Verify pawn is not moving left/right unless capturing an enemy piece
            if (piecePos[2] !== squarePos[2]) {
                if (squarePos[2] - piecePos[2] > 1 || squarePos[2] - piecePos[2] < -1) {
                    return 'Pawns can\'t move that far sideways.';
                }

                // Verify the capturing move is valid
                if (destinationSquareContent[0] === 'W') {
                    return 0;
                }
                else if (destinationSquareContent[0] === 'B') {
                    return 'You can\'t capture your own pieces.';
                }
                else if (destinationSquareContent[0] === 'x') {
                    if (gameBoard[Number(squarePos[0]) - 1][squarePos[2]].slice(0, 2) === 'BP') {
                        return 'HOLYHELL'
                    }
                    return 'There\'s no piece to capture there.';
                }
                return 'How did we get here? PAWNS!'
            }

            // Passed all filters; it's a valid move
            return 0;
        }
    }
    // Bishop logic
    else if (pieceMoved[1] === 'B') {

    }
    else if (pieceMoved[1] === 'R') {

    }
    else if (pieceMoved[1] === 'N') {

    }
    else if (pieceMoved[1] === 'Q') {

    }
    else if (pieceMoved[1] === 'K') {

    }
}

function getNewBoardStandard(oldBoard, pieceMoved, destinationSquare) {
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

function getNewBoardCastling() {

}

function getNewBoardEnPassant() {

}

let gameHistory = [initialBoard];

// Main game loop; runs until checkmate

    // Player picks a piece to move
        // Check if piece has valid moves?
    
    // Player picks a square to move selected piece to
    
    // Check if move is valid

    // If valid move, check for check(mate)
        // If check, note for next move
        // If checkmate, end game

let testBoard1 = getNewBoardStandard(initialBoard, 'WPB', 'b3');
let testBoard2 = getNewBoardStandard(testBoard1, 'BPC', 'c4');

console.log(testBoard2);
console.log(checkMoveValidity(testBoard2, 'WPD', 'd5'));