class GamePiece {
    constructor(shortName, fullName, color, notation, startPos) {
        this._shortName = shortName;
        this._fullName = fullName;
        this._color = color;
        this._abbreviation = notation;
        this._startPos = startPos;

        this.captured = false;
        this.currentPos = null;
    }

    get shortName() {
        return this._shortName;
    }

    get fullName() {
        return this._fullName;
    }

    get color() {
        return this._color;
    }

    get abbreviation() {
        return this._abbreviation;
    }

    get startPos() {
        return this._startPos;
    }
}

let gamePieces = [];

function newPiece(shortName, fullName, color, notation, startPos) {
    p = new GamePiece(shortName, fullName, color, notation, startPos);
    gamePieces.push(p);
    return p;
}

newPiece('BKR', 'Black\'s Kingside Rook', 'Black', 'R', 'a8');
newPiece('BKK', 'Black\'s Kingside Knight', 'Black', 'N', 'b8');
newPiece('BKB', 'Black\'s Kingside Bishop', 'Black', 'B', 'c8');
newPiece('BQ ', 'Black\'s Queen', 'Black', 'Q', 'd8');
newPiece('BK ', 'Black\'s King', 'Black', 'K', 'e8');
newPiece('BQB', 'Black\'s Queenside Bishop', 'Black', 'B', 'f8');
newPiece('BQK', 'Black\'s Queenside Knight', 'Black', 'N', 'g8');
newPiece('BQR', 'Black\'s Queenside Rook', 'Black', 'R', 'h8');
newPiece('BPA', 'Black\'s A Pawn', 'Black', 'P', 'a7');
newPiece('BPB', 'Black\'s B Pawn', 'Black', 'P', 'b7');
newPiece('BPC', 'Black\'s C Pawn', 'Black', 'P', 'c7');
newPiece('BPD', 'Black\'s D Pawn', 'Black', 'P', 'd7');
newPiece('BPE', 'Black\'s E Pawn', 'Black', 'P', 'e7');
newPiece('BPF', 'Black\'s F Pawn', 'Black', 'P', 'f7');
newPiece('BPG', 'Black\'s G Pawn', 'Black', 'P', 'g7');
newPiece('BPH', 'Black\'s H Pawn', 'Black', 'P', 'h7');

newPiece('WKR', 'White\'s Kingside Rook', 'White', 'R', 'a1');
newPiece('WKK', 'White\'s Kingside Knight', 'White', 'N', 'b1');
newPiece('WKB', 'White\'s Kingside Bishop', 'White', 'B', 'c1');
newPiece('WQ ', 'White\'s Queen', 'White', 'Q', 'd1');
newPiece('WK ', 'White\'s King', 'White', 'K', 'e1');
newPiece('WQB', 'White\'s Queenside Bishop', 'White', 'B', 'f1');
newPiece('WQK', 'White\'s Queenside Knight', 'White', 'N', 'g1');
newPiece('WQR', 'White\'s Queenside Rook', 'White', 'R', 'h1');
newPiece('WPA', 'White\'s A Pawn', 'White', 'P', 'a2');
newPiece('WPB', 'White\'s B Pawn', 'White', 'P', 'b2');
newPiece('WPC', 'White\'s C Pawn', 'White', 'P', 'c2');
newPiece('WPD', 'White\'s D Pawn', 'White', 'P', 'd2');
newPiece('WPE', 'White\'s E Pawn', 'White', 'P', 'e2');
newPiece('WPF', 'White\'s F Pawn', 'White', 'P', 'f2');
newPiece('WPG', 'White\'s G Pawn', 'White', 'P', 'g2');
newPiece('WPH', 'White\'s H Pawn', 'White', 'P', 'h2');

console.log(gamePieces);

const boardSquares = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

function getCoordinate(square) {
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