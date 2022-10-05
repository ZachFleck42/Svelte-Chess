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
const BKK = createNewGamePiece('BKK', 'Black\'s Kingside Knight', 'Black', 'N', 'b8');
const BKB = createNewGamePiece('BKB', 'Black\'s Kingside Bishop', 'Black', 'B', 'c8');
const BQz = createNewGamePiece('BQz', 'Black\'s Queen', 'Black', 'Q', 'd8');
const BKz = createNewGamePiece('BKz', 'Black\'s King', 'Black', 'K', 'e8');
const BQB = createNewGamePiece('BQB', 'Black\'s Queenside Bishop', 'Black', 'B', 'f8');
const BQK = createNewGamePiece('BQK', 'Black\'s Queenside Knight', 'Black', 'N', 'g8');
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
const WKK = createNewGamePiece('WKK', 'White\'s Kingside Knight', 'White', 'N', 'b1');
const WKB = createNewGamePiece('WKB', 'White\'s Kingside Bishop', 'White', 'B', 'c1');
const WQz = createNewGamePiece('WQz', 'White\'s Queen', 'White', 'Q', 'd1');
const WKz = createNewGamePiece('WKz', 'White\'s King', 'White', 'K', 'e1');
const WQB = createNewGamePiece('WQB', 'White\'s Queenside Bishop', 'White', 'B', 'f1');
const WQK = createNewGamePiece('WQK', 'White\'s Queenside Knight', 'White', 'N', 'g1');
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

class GameBoard {
    constructor(turn) {
        this.turn = turn;
    }
}

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

function getCoordinate(square) {
    for (let i = 0; i < boardSquares.length; i++) {
        for (let j = 0; j < boardSquares[i].length; j++) {
            if (boardSquares[i][j] === square) {
                return `${i},${j}`;
            }
        }
    }
    return [-1, -1];
}

function getSquare(coordinate) {
    return boardSquares[coordinate[0]][coordinate[1]];
}

function getNewBoard(oldBoardArray, pieceMoved, destinationSquare) {
    let newBoardArray = oldBoardArray.map(
        (row, indexOfRowInBoard) => {
            return row.map(
                (square, indexOfSquareInRow) => {
                    for (let i = 0; i < row.length; i++) {
                        if (square === pieceMoved) {
                            return 'x';
                        }
                        else if (getCoordinate(destinationSquare) === `${indexOfRowInBoard},${indexOfSquareInRow}`) {
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
    return newBoardArray;
}


// Main game loop; runs until checkmate

    // Player picks a piece to move
        // Check if piece has valid moves?
    
    // Player picks a square to move selected piece to
    
    // Check if move is valid

    // If valid move, check for check(mate)
        // If check, note for next move
        // If checkmate, end game

let testBoard = getNewBoard(initialBoard, 'WPA', 'a3');
let testBoard2 = getNewBoard(testBoard, 'WPC', 'c4');
console.log(testBoard2);