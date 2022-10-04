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

function newPiece(shortName, fullName, color, notation, startPos) {
    
}

gamePieces.newPiece('BKR', 'Black\'s Kingside Rook', 'Black', 'R', 'a8');
gamePieces.newPiece('BKK', 'Black\'s Kingside Knight', 'Black', 'N', 'b8');
gamePieces.newPiece('BKB', 'Black\'s Kingside Bishop', 'Black', 'B', 'c8');
gamePieces.newPiece('BQ ', 'Black\'s Queen', 'Black', 'Q', 'd8');
gamePieces.newPiece('BK ', 'Black\'s King', 'Black', 'K', 'e8');
gamePieces.newPiece('BQB', 'Black\'s Queenside Bishop', 'Black', 'B', 'f8');
gamePieces.newPiece('BQK', 'Black\'s Queenside Knight', 'Black', 'N', 'g8');
gamePieces.newPiece('BQR', 'Black\'s Queenside Rook', 'Black', 'R', 'h8');
gamePieces.newPiece('BPA', 'Black\'s A Pawn', 'Black', 'P', 'a7');
gamePieces.newPiece('BPB', 'Black\'s B Pawn', 'Black', 'P', 'b7');
gamePieces.newPiece('BPC', 'Black\'s C Pawn', 'Black', 'P', 'c7');
gamePieces.newPiece('BPD', 'Black\'s D Pawn', 'Black', 'P', 'd7');
gamePieces.newPiece('BPE', 'Black\'s E Pawn', 'Black', 'P', 'e7');
gamePieces.newPiece('BPF', 'Black\'s F Pawn', 'Black', 'P', 'f7');
gamePieces.newPiece('BPG', 'Black\'s G Pawn', 'Black', 'P', 'g7');
gamePieces.newPiece('BPH', 'Black\'s H Pawn', 'Black', 'P', 'h7');

gamePieces.newPiece('WKR', 'White\'s Kingside Rook', 'White', 'R', 'a1');
gamePieces.newPiece('WKK', 'White\'s Kingside Knight', 'White', 'N', 'b1');
gamePieces.newPiece('WKB', 'White\'s Kingside Bishop', 'White', 'B', 'c1');
gamePieces.newPiece('WQ ', 'White\'s Queen', 'White', 'Q', 'd1');
gamePieces.newPiece('WK ', 'White\'s King', 'White', 'K', 'e1');
gamePieces.newPiece('WQB', 'White\'s Queenside Bishop', 'White', 'B', 'f1');
gamePieces.newPiece('WQK', 'White\'s Queenside Knight', 'White', 'N', 'g1');
gamePieces.newPiece('WQR', 'White\'s Queenside Rook', 'White', 'R', 'h1');
gamePieces.newPiece('WPA', 'White\'s A Pawn', 'White', 'P', 'a2');
gamePieces.newPiece('WPB', 'White\'s B Pawn', 'White', 'P', 'b2');
gamePieces.newPiece('WPC', 'White\'s C Pawn', 'White', 'P', 'c2');
gamePieces.newPiece('WPD', 'White\'s D Pawn', 'White', 'P', 'd2');
gamePieces.newPiece('WPE', 'White\'s E Pawn', 'White', 'P', 'e2');
gamePieces.newPiece('WPF', 'White\'s F Pawn', 'White', 'P', 'f2');
gamePieces.newPiece('WPG', 'White\'s G Pawn', 'White', 'P', 'g2');
gamePieces.newPiece('WPH', 'White\'s H Pawn', 'White', 'P', 'h2');



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

console.log(gamePieces.allPieces[0]);