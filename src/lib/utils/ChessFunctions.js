// Serves as a reference for chess notation and various helper functions.
export const BOARDSQUARES = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];

// Serves as the starting board for a new game of chess.
export const INITIALBOARD = [
  ["BQR", "BQN", "BQB", "BQQ", "BKK", "BKB", "BKN", "BKR"],
  ["BAP", "BBP", "BCP", "BDP", "BEP", "BFP", "BGP", "BHP"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x", "x", "x"],
  ["WAP", "WBP", "WCP", "WDP", "WEP", "WFP", "WGP", "WHP"],
  ["WQR", "WQN", "WQB", "WQQ", "WKK", "WKB", "WKN", "WKR"],
];

// Returns the sqaure that is located at the coordinates of a 2D board array.
export function getSquareFromCoordinates(coordinates) {
  return BOARDSQUARES[coordinates[0]][coordinates[1]];
}

// Returns the coordinates of a square in a 2D board array.
export function getCoordinatesFromSquare(square) {
  for (let i = 0; i < BOARDSQUARES.length; i++) {
    for (let j = 0; j < BOARDSQUARES[i].length; j++) {
      if (BOARDSQUARES[i][j] === square) {
        return [i, j];
      }
    }
  }
}

// Returns the coordinates of a piece in a 2D board array.
export function getPieceCoordinates(gameBoard, gamePiece) {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === gamePiece) {
        return [i, j];
      }
    }
  }
}

// Returns the square that a piece is located on.
export function getPieceSquare(gameBoard, gamePiece) {
  return getSquareFromCoordinates(getPieceCoordinates(gameBoard, gamePiece));
}

// Returns the content (either a piece or 'x') of a square on a board.
export function getSquareContent(currentBoard, square) {
  let squareCoords = getCoordinatesFromSquare(square);
  return currentBoard[squareCoords[0]][squareCoords[1]];
}

// Returns 1 if a piece has moved at any point during the game, 0 if not.
export function hasPieceMoved(boardHistory, piece) {
  let pieceInitialCoords = getPieceCoordinates(boardHistory[0], piece);
  for (let i = 1; i < boardHistory.length; i++) {
    if (
      boardHistory[i][pieceInitialCoords[0]][pieceInitialCoords[1]] !== piece
    ) {
      return 1;
    }
  }

  return 0;
}

/* Returns 0 if invalid move, 1 if valid capturing move, 2 if valid forward
movement (non-capturing), 3 if valid en passant, and 4 if pawn COULD capture
if there were a piece there (used to determine if a space is in check). */
export function verifyValidPawnMove(
  boardHistory,
  pieceMoved,
  destinationSquare
) {
  let currentBoard = boardHistory[boardHistory.length - 1];

  let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
  let destSquareContent = getSquareContent(currentBoard, destinationSquare);

  let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
  let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

  // Verify pawn is moving in the right direction
  if (pieceMoved[0] === "W" && verticalDisplacement < 1) return 0;
  if (pieceMoved[0] === "B" && verticalDisplacement > -1) return 0;

  if (Math.abs(verticalDisplacement) === 1) {
    //  Check for valid one-space move
    if (horizontalDisplacement === 0 && destSquareContent === "x") {
      return 2;
    }
    // Check for valid capturing move
    else if (Math.abs(horizontalDisplacement) === 1) {
      // Check for en passant
      if (destSquareContent === "x") {
        // This is checking to see if a pawn double-moved across the destinationSquare last turn.
        let enPasCheck1 =
          currentBoard[destSquareCoords[0] + verticalDisplacement][
            destSquareCoords[1]
          ];
        let enPasCheck2 = "";
        if (boardHistory.length > 2) {
          enPasCheck2 =
            boardHistory[boardHistory.length - 2][
              destSquareCoords[0] - verticalDisplacement
            ][destSquareCoords[1]];
        }
        if (enPasCheck1 === enPasCheck2 && enPasCheck1[2] === "P") {
          return 3;
        } else return 4;
      } else return 1;
    }
  }
  // Check for valid two-space move
  else if (Math.abs(verticalDisplacement) === 2) {
    if (destSquareContent !== "x") return 0;
    if (horizontalDisplacement !== 0) return 0;
    if (hasPieceMoved(boardHistory, pieceMoved)) return 0;

    let vertDirection = verticalDisplacement < 0 ? 1 : -1;
    if (currentBoard[pieceCoords[0] + vertDirection][pieceCoords[1]] === "x") {
      return 2;
    }
  }

  return 0;
}

// Returns 0 if invalid move and 1 if valid normal/capturing move.
export function verifyValidKnightMove(
  currentBoard,
  pieceMoved,
  destinationSquare
) {
  let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

  let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
  let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

  if (
    Math.abs(horizontalDisplacement) === 1 &&
    Math.abs(verticalDisplacement) === 2
  ) {
    return 1;
  } else if (
    Math.abs(horizontalDisplacement) === 2 &&
    Math.abs(verticalDisplacement) === 1
  ) {
    return 1;
  }
}

// Returns 0 if invalid move and 1 if valid normal/capturing move.
export function verifyValidBishopMove(
  currentBoard,
  pieceMoved,
  destinationSquare
) {
  let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

  let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
  let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

  // Verify bishop is moving diagonally
  if (Math.abs(verticalDisplacement) !== Math.abs(horizontalDisplacement)) {
    return 0;
  }

  let vertDirection = verticalDisplacement < 0 ? 1 : -1;
  let horizDirection = horizontalDisplacement < 0 ? 1 : -1;

  // Look for any pieces in the bishop's path
  for (let i = 1; i < Math.abs(verticalDisplacement); i++) {
    if (
      currentBoard[pieceCoords[0] + i * vertDirection][
        pieceCoords[1] + i * horizDirection
      ] !== "x"
    ) {
      return 0;
    }
  }

  return 1;
}

// Returns 0 if invalid move and 1 if valid normal/capturing move.
export function verifyValidRookMove(
  currentBoard,
  pieceMoved,
  destinationSquare
) {
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
  for (
    let i = 1;
    i <
    Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement));
    i++
  ) {
    if (
      currentBoard[pieceCoords[0] + i * vertDirection][
        pieceCoords[1] + i * horizDirection
      ] !== "x"
    ) {
      return 0;
    }
  }

  return 1;
}

// Returns 0 if invalid move and 1 if valid normal/capturing move.
export function verifyValidQueenMove(
  currentBoard,
  pieceMoved,
  destinationSquare
) {
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
  for (
    let i = 1;
    i <
    Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement));
    i++
  ) {
    let squareContent =
      currentBoard[pieceCoords[0] + i * vertDirection][
        pieceCoords[1] + i * horizDirection
      ];
    if (squareContent !== "x") return 0;
  }

  return 1;
}

// Returns 0 if invalid move, 1 if valid normal/capturing move, and 5 if valid castling move.
export function verifyValidKingMove(
  boardHistory,
  pieceMoved,
  destinationSquare
) {
  let currentBoard = boardHistory[boardHistory.length - 1];

  let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
  let destSquareContent = getSquareContent(currentBoard, destinationSquare);

  let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
  let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

  // Verify king is moving only one space in any direction
  if (
    Math.abs(horizontalDisplacement) <= 1 &&
    Math.abs(verticalDisplacement) <= 1
  ) {
    return 1;
  }

  // Check for castling
  if (Math.abs(horizontalDisplacement) > 1 && verticalDisplacement === 0) {
    if (
      Math.abs(horizontalDisplacement) === 2 ||
      destSquareContent[2] === "R"
    ) {
      // King cannot have moved in order to castle
      if (!hasPieceMoved(boardHistory, pieceMoved)) {
        let horizDirection = horizontalDisplacement < 0 ? 1 : -1;
        let squaresToCheck = horizDirection === 1 ? 3 : 4;

        // Check every square between the king and rook for various nonsense
        for (let i = 1; i <= squaresToCheck; i++) {
          let square = getSquareFromCoordinates([
            pieceCoords[0],
            pieceCoords[1] + i * horizDirection,
          ]);
          let squareContent =
            currentBoard[pieceCoords[0]][pieceCoords[1] + i * horizDirection];

          // All spaces between king and rook must be empty
          if (i < squaresToCheck && squareContent !== "x") {
            return 0;
          }
          // Castling is not possible if the king will move through or into check
          if (i <= 2 && isSquareInCheck(boardHistory, square, pieceMoved[0])) {
            return 0;
          }
          // If the rook is present and has not moved, castling is possible
          if (i === squaresToCheck) {
            if (
              squareContent[2] === "R" &&
              !hasPieceMoved(boardHistory, squareContent)
            ) {
              return 5;
            }
          }
        }
      }
    }
  }

  return 0;
}

// Verifies a piece is moving appropriately according to the rules of movement.
export function verifyValidMovement(
  boardHistory,
  pieceMoved,
  destinationSquare
) {
  let currentBoard = boardHistory[boardHistory.length - 1];

  switch (pieceMoved[2]) {
    case "P":
      return verifyValidPawnMove(boardHistory, pieceMoved, destinationSquare);
    case "N":
      return verifyValidKnightMove(currentBoard, pieceMoved, destinationSquare);
    case "B":
      return verifyValidBishopMove(currentBoard, pieceMoved, destinationSquare);
    case "R":
      return verifyValidRookMove(currentBoard, pieceMoved, destinationSquare);
    case "Q":
      return verifyValidQueenMove(currentBoard, pieceMoved, destinationSquare);
    case "K":
      return verifyValidKingMove(boardHistory, pieceMoved, destinationSquare);
  }
}

// Checks if a square is being threatened by at least 1 enemy piece.
// Returns 1 if true, 0 if false.
export function isSquareInCheck(boardHistory, squareToCheck, playerColor) {
  let currentBoard = boardHistory[boardHistory.length - 1];
  let enemyPiece = playerColor[0] === "W" ? "B" : "W";

  // Check every square on the board. If it contains an enemy piece, check if
  // it can move to the squareToCheck. If it can, square is in check. Return 1.
  for (let i = 0; i < currentBoard.length; i++) {
    for (let j = 0; j < currentBoard[i].length; j++) {
      let currentSquareContent = currentBoard[i][j];

      if (currentSquareContent[0] === enemyPiece) {
        let validMove = verifyValidMovement(
          boardHistory,
          currentSquareContent,
          squareToCheck
        );
        if (validMove === 1 || validMove === 4) {
          return 1;
        }
      }
    }
  }

  // If no enemy pieces can validly move to the square, then return 0.
  return 0;
}

// Returns an updated board with a valid standard move.
export function getNewBoard(oldBoard, pieceMoved, destinationSquare) {
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

  let newBoard = oldBoard.map((row, rowIndex) => {
    return row.map((square, squareIndex) => {
      for (let i = 0; i < row.length; i++) {
        // Square pieceMoved is currently on should now empty
        if (square === pieceMoved) {
          return "x";
          // Relocate the pieceMoved to the destinationSquare
        } else if (
          destSquareCoords[0] === rowIndex &&
          destSquareCoords[1] === squareIndex
        ) {
          return pieceMoved;
          // All other squares are unchanged
        } else return square;
      }
    });
  });

  return newBoard;
}

// Returns an updated board with a valid castling move.
export function getNewBoardCastle(oldBoard, pieceMoved, destinationSquare) {
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
  let kingStartCoords = getPieceCoordinates(oldBoard, pieceMoved);
  let horizontalDisplacement = kingStartCoords[1] - destSquareCoords[1];

  let direction = horizontalDisplacement < 0 ? "K" : "Q";
  let rook = pieceMoved[0] + direction + "R";
  let rookNewPos = direction === "K" ? -1 : 1;

  let newBoard = oldBoard.map((row, rowIndex) => {
    return row.map((square, squareIndex) => {
      for (let i = 0; i < row.length; i++) {
        // The rook square should be empty in all cases of castling
        if (square === pieceMoved || oldBoard[rowIndex][squareIndex] === rook) {
          return "x";
          // Relocate the pieceMoved to the destinationSquare
        } else if (
          destSquareCoords[0] === rowIndex &&
          destSquareCoords[1] === squareIndex
        ) {
          return pieceMoved;
          // Relocate the rook to the appropriate square depending on color and direction
        } else if (
          destSquareCoords[0] === rowIndex &&
          destSquareCoords[1] + rookNewPos === squareIndex
        ) {
          return rook;
          // All other squares are unchanged
        } else return square;
      }
    });
  });

  return newBoard;
}

// Returns an updated board with a valid en passant move.
export function getNewBoardEnPassant(oldBoard, pieceMoved, destinationSquare) {
  let pieceCoords = getPieceCoordinates(oldBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
  let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];

  let newBoard = oldBoard.map((row, rowIndex) => {
    return row.map((square, squareIndex) => {
      for (let i = 0; i < row.length; i++) {
        // Square pieceMoved is currently on should now empty
        if (square === pieceMoved) {
          return "x";
          // The captured pawn should be removed from the board
        } else if (
          rowIndex === destSquareCoords[0] + verticalDisplacement &&
          squareIndex === destSquareCoords[1]
        ) {
          return "x";
          // Relocate the pieceMoved to the destinationSquare
        } else if (
          destSquareCoords[0] === rowIndex &&
          destSquareCoords[1] === squareIndex
        ) {
          return pieceMoved;
          // All other squares are unchanged
        } else return square;
      }
    });
  });

  return newBoard;
}

// Returns 0 if invalid move, otherwise returns a new board with move performed.
export function movePiece(boardHistory, pieceMoved, destinationSquare) {
  let currentBoard = boardHistory[boardHistory.length - 1];
  let playerColor = pieceMoved[0];

  let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
  let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

  let destSquareContent = getSquareContent(currentBoard, destinationSquare);

  // Verify piece is not moving to the square it's already on
  if (pieceCoords === destSquareCoords) return 0;

  // Verify piece is not attempting to capture a piece of its own color
  if (playerColor === destSquareContent[0]) return 0;

  // Verify piece is moving properly
  let movementType = verifyValidMovement(
    boardHistory,
    pieceMoved,
    destinationSquare
  );
  if (!movementType || movementType === 4) return 0;

  // Get a new board with the attempted move
  let newBoard = [];
  if (movementType === 3) {
    newBoard = getNewBoardEnPassant(
      currentBoard,
      pieceMoved,
      destinationSquare
    );
  } else if (movementType === 5) {
    newBoard = getNewBoardCastle(currentBoard, pieceMoved, destinationSquare);
  } else newBoard = getNewBoard(currentBoard, pieceMoved, destinationSquare);

  // Check if the move would leave player's king in check
  let kingSquare = getPieceSquare(newBoard, playerColor + "KK");
  if (isSquareInCheck([...boardHistory, newBoard], kingSquare, playerColor)) {
    return 0;
  }

  return newBoard;
}

// Returns an array of all the squares a piece can validly move to given the current board.
export function getAllPieceMoves(boardHistory, piece) {
  let currentBoard = boardHistory[boardHistory.length - 1];
  let validMoves = [];

  for (let i = 0; i < currentBoard.length; i++) {
    for (let j = 0; j < currentBoard[i].length; j++) {
      let square = getSquareFromCoordinates([i, j]);
      let validMove = movePiece(boardHistory, piece, square);

      if (validMove) {
        validMoves.push(square);
      }
    }
  }

  return validMoves;
}

// Returns an array of all the valid moves a player can make given the current board.
export function getAllPlayerMoves(boardHistory, playerColor) {
  let currentBoard = boardHistory[boardHistory.length - 1];
  let validMoves = [];

  for (let i = 0; i < currentBoard.length; i++) {
    for (let j = 0; j < currentBoard[i].length; j++) {
      let squareContent = currentBoard[i][j];
      let pieceMoves = [];

      if (squareContent[0] === playerColor[0]) {
        pieceMoves = getAllPieceMoves(boardHistory, squareContent);
      }

      pieceMoves.forEach((move) => validMoves.push([squareContent, move]));
    }
  }

  return validMoves;
}

// Returns 1 if the king is in checkmate, 0 otherwise.
export function isKingInCheckmate(boardHistory, kingColor) {
  let playerMoves = getAllPlayerMoves(boardHistory, kingColor);
  if (playerMoves.length >= 1) return 0;
  else return 1;
}

export function getChessNotation(boardHistory, pieceMoved, destinationSquare) {
  let currentBoard = boardHistory[boardHistory.length - 1];
  let previousBoard = boardHistory[boardHistory.length - 2];
  let previousSquare = getPieceSquare(previousBoard, pieceMoved);

  let playerColor = pieceMoved[0];
  let enemyColor = playerColor === "W" ? "B" : "W";

  let notation = "";

  // Notate castling (if applicable)
  if (pieceMoved[2] === "K") {
    let previousCoords = getCoordinatesFromSquare(previousSquare);
    let currentCoords = getCoordinatesFromSquare(destinationSquare);

    let horizontalDisplacement = previousCoords[1] - currentCoords[1];
    if (horizontalDisplacement === -2) return "0-0";
    else if (horizontalDisplacement === 2) return "0-0-0";
  }

  // Notate piece (if applicable)
  if (pieceMoved[2] !== "P") notation += pieceMoved[2];

  // Check for capturing and/or disambiguation
  let previousEnemyPieceCount = 0;
  let currentEnemyPieceCount = 0;
  let disambiguationSquares = [];
  for (let i = 0; i < BOARDSQUARES.length; i++) {
    for (let j = 0; j < BOARDSQUARES[i].length; j++) {
      let sqr = BOARDSQUARES[i][j];
      let prvSqr = previousBoard[i][j];
      let curSqr = currentBoard[i][j];

      /* Counting the number of enemy pieces before/after move is more complicated
      compared to just checking destination square content, but is necessary because
      en passant is a thing */
      if (prvSqr[0] === enemyColor) previousEnemyPieceCount += 1;
      if (curSqr[0] === enemyColor) currentEnemyPieceCount += 1;

      // Checking if disambiguation is necessary
      if (
        sqr !== previousSquare &&
        pieceMoved[2] !== "P" &&
        prvSqr[0] === playerColor &&
        prvSqr[2] === pieceMoved[2]
      ) {
        if (
          verifyValidMovement(
            boardHistory.slice(0, -1),
            prvSqr,
            destinationSquare
          )
        ) {
          disambiguationSquares.push(sqr);
        }
      }
    }
  }

  // Notate disambiguation (if applicable)
  if (disambiguationSquares.length > 0) {
    /* This may look more complicated than it needs to be, but in the extremely rare case that there 
    is both a duplicate rank AND file, we must ensure we notate the file before the rank. */
    let notateFile = false;
    let notateRank = false;

    disambiguationSquares.forEach((square) => {
      if (square[0] === previousSquare[0]) notateRank = true;
      if (square[1] === previousSquare[1]) notateFile = true;
    });

    if (notateFile) notation += previousSquare[0];
    if (notateRank) notation += previousSquare[1];
  }

  // Notate capture (if applicable)
  if (previousEnemyPieceCount > currentEnemyPieceCount) {
    if (pieceMoved[2] === "P") notation += previousSquare[0];
    notation += "x";
  }

  // Notate destination square
  notation += destinationSquare;

  // Notate pawn promotion (if applicable)
  if (
    pieceMoved[2] === "P" &&
    (destinationSquare[1] === "1" || destinationSquare[1] === "8")
  ) {
    notation += getSquareContent(currentBoard, destinationSquare)[2];
  }

  // Notate check/checkmate (if applicable)
  let enemyKingSquare = getPieceSquare(currentBoard, enemyColor + "KK");
  if (isKingInCheckmate(boardHistory, enemyColor)) {
    notation += "#";
  } else if (isSquareInCheck(boardHistory, enemyKingSquare, enemyColor)) {
    notation += "+";
  }

  return notation;
}
