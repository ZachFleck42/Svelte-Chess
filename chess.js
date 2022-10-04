let gamePieces = []

function createNewGamePiece(name, color, notation, startPos) {
    piece = {
        name: name,
        color: color,
        notation: notation,
        startPos: startPos,
        captured: false,
    }

    gamePieces.push(piece);
    return piece;
}

const BKR = createNewGamePiece('Black\'s Kingside Rook', 'Black', 'R', 'a8');
const BKK = createNewGamePiece('Black\'s Kingside Knight', 'Black', 'N', 'b8');
const BKB = createNewGamePiece('Black\'s Kingside Bishop', 'Black', 'B', 'c8');
const BQ = createNewGamePiece('Black\'s Queen', 'Black', 'Q', 'd8');
const BK = createNewGamePiece('Black\'s King', 'Black', 'K', 'e8');
const BQB = createNewGamePiece('Black\'s Queenside Bishop', 'Black', 'B', 'f8');
const BQK = createNewGamePiece('Black\'s Queenside Knight', 'Black', 'N', 'g8');
const BQR = createNewGamePiece('Black\'s Queenside Rook', 'Black', 'R', 'h8');
const BPA = createNewGamePiece('Black\'s A Pawn', 'Black', 'P', 'a7');
const BPB = createNewGamePiece('Black\'s B Pawn', 'Black', 'P', 'b7');
const BPC = createNewGamePiece('Black\'s C Pawn', 'Black', 'P', 'c7');
const BPD = createNewGamePiece('Black\'s D Pawn', 'Black', 'P', 'd7');
const BPE = createNewGamePiece('Black\'s E Pawn', 'Black', 'P', 'e7');
const BPF = createNewGamePiece('Black\'s F Pawn', 'Black', 'P', 'f7');
const BPG = createNewGamePiece('Black\'s G Pawn', 'Black', 'P', 'g7');
const BPH = createNewGamePiece('Black\'s H Pawn', 'Black', 'P', 'h7');

const WKR = createNewGamePiece('White\'s Kingside Rook', 'White', 'R', 'a1');
const WKK = createNewGamePiece('White\'s Kingside Knight', 'White', 'N', 'b1');
const WKB = createNewGamePiece('White\'s Kingside Bishop', 'White', 'B', 'c1');
const WQ = createNewGamePiece('White\'s Queen', 'White', 'Q', 'd1');
const WK = createNewGamePiece('White\'s King', 'White', 'K', 'e1');
const WQB = createNewGamePiece('White\'s Queenside Bishop', 'White', 'B', 'f1');
const WQK = createNewGamePiece('White\'s Queenside Knight', 'White', 'N', 'g1');
const WQR = createNewGamePiece('White\'s Queenside Rook', 'White', 'R', 'h1');
const WPA = createNewGamePiece('White\'s A Pawn', 'White', 'P', 'a2');
const WPB = createNewGamePiece('White\'s B Pawn', 'White', 'P', 'b2');
const WPC = createNewGamePiece('White\'s C Pawn', 'White', 'P', 'c2');
const WPD = createNewGamePiece('White\'s D Pawn', 'White', 'P', 'd2');
const WPE = createNewGamePiece('White\'s E Pawn', 'White', 'P', 'e2');
const WPF = createNewGamePiece('White\'s F Pawn', 'White', 'P', 'f2');
const WPG = createNewGamePiece('White\'s G Pawn', 'White', 'P', 'g2');
const WPH = createNewGamePiece('White\'s H Pawn', 'White', 'P', 'h2');

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

function getCoordinates(square) {
    for (let i = 0; i < boardSquares.length; i++) {
        for (let j = 0; j < boardSquares[i].length; j++) {
            if (boardSquares[i][j] === square) {
                return [i, j];
            }
        }
    }
}

function getSquare(coordinate) {
    return boardSquares[coordinate[0]][coordinate[1]];
}

BKR.captured = true;
console.log(getCoordinates(BKR.startPos));