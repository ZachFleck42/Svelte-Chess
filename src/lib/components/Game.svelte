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

	function getPieceSquare(gameBoard, gamePiece) {
		return getSquareFromCoordinates(getPieceCoordinates(gameBoard, gamePiece));
	}

	function hasPieceMoved(boardHistory, piece) {
		let pieceInitialCoords = getPieceCoordinates(INITIALBOARD, piece);
		for (let i = 1; i < boardHistory.length; i++) {
			if (boardHistory[i][pieceInitialCoords[0]][pieceInitialCoords[1]] !== piece) {
				return 1;
			}
		}

		return 0;
	}

	/* Returns 0 if invalid move, 1 if valid capturing move, 2 if valid forward
    movement (non-capturing), 3 if valid en passant, and 4 if pawn COULD capture
    if there were a piece there (used to determine if a space is in check) */
	function verifyValidPawnMove(boardHistory, pieceMoved, destinationSquare) {
		let currentBoard = boardHistory[boardHistory.length - 1];

		let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
		let destSquareContent = currentBoard[destSquareCoords[0]][destSquareCoords[1]];

		let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
		let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

		// Verify pawn is moving in the right direction
		if (pieceMoved[2] === 'W' && verticalDisplacement < 1) return 0;
		if (pieceMoved[2] === 'B' && verticalDisplacement > 1) return 0;

		if (Math.abs(verticalDisplacement) === 1) {
			//  Check for valid one-space move
			if (horizontalDisplacement === 0 && destSquareContent === 'x') {
				return 2;
			}
			// Check for valid capturing move
			else if (Math.abs(horizontalDisplacement) === 1) {
				// Check for en passant
				if (destSquareContent === 'x') {
					// This is checking to see if a pawn double-moved across the destinationSquare last turn.
					let enPasCheck1 = currentBoard[destSquareCoords[0] + verticalDisplacement][destSquareCoords[1]];
					let enPasCheck2 = boardHistory.at(-2)[destSquareCoords[0] - verticalDisplacement][destSquareCoords[1]];
					if (enPasCheck1 === enPasCheck2 && enPasCheck1[2] === 'P') {
						return 3;
					} else return 4;
				} else return 1;
			}
		}
		// Check for valid two-space move
		else if (Math.abs(verticalDisplacement) === 2) {
			if (destSquareContent !== 'x') return 0;
			if (horizontalDisplacement !== 0) return 0;
			if (hasPieceMoved(boardHistory, pieceMoved)) return 0;

			let vertDirection = verticalDisplacement < 0 ? 1 : -1;
			if (currentBoard[pieceCoords[0] + vertDirection][pieceCoords[1]] === 'x') {
				return 2;
			}
		}

		return 0;
	}

	// Returns 0 if invalid move and 1 if valid normal/capturing move
	function verifyValidKnightMove(currentBoard, pieceMoved, destinationSquare) {
		let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);

		let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
		let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

		if (Math.abs(horizontalDisplacement) === 1 && Math.abs(verticalDisplacement) === 2) {
			return 1;
		} else if (Math.abs(horizontalDisplacement) === 2 && Math.abs(verticalDisplacement) === 1) {
			return 1;
		}
	}

	// Returns 0 if invalid move and 1 if valid normal/capturing move
	function verifyValidBishopMove(currentBoard, pieceMoved, destinationSquare) {
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
			if (currentBoard[pieceCoords[0] + i * vertDirection][pieceCoords[1] + i * horizDirection] !== 'x') {
				return 0;
			}
		}

		return 1;
	}

	// Returns 0 if invalid move and 1 if valid normal/capturing move
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
			if (currentBoard[pieceCoords[0] + i * vertDirection][pieceCoords[1] + i * horizDirection] !== 'x') {
				return 0;
			}
		}

		return 1;
	}

	// Returns 0 if invalid move and 1 if valid normal/capturing move
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
		let squareContent = '';
		for (let i = 1; i < Math.max(Math.abs(horizontalDisplacement), Math.abs(verticalDisplacement)); i++) {
			squareContent = currentBoard[pieceCoords[0] + i * vertDirection][pieceCoords[1] + i * horizDirection];
			if (squareContent !== 'x') return 0;
		}

		return 1;
	}

	// Returns 0 if invalid move, 1 if valid normal/capturing move, and 5 if valid castling move
	function verifyValidKingMove(boardHistory, pieceMoved, destinationSquare) {
		let currentBoard = boardHistory[boardHistory.length - 1];

		let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
		let destSquareContent = currentBoard[destSquareCoords[0]][destSquareCoords[1]];

		let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];
		let horizontalDisplacement = pieceCoords[1] - destSquareCoords[1];

		// Verify king is moving only one space in any direction
		if (Math.abs(horizontalDisplacement) <= 1 && Math.abs(verticalDisplacement) <= 1) {
			return 1;
		}

		// Check for castling
		if (Math.abs(horizontalDisplacement) > 1 && verticalDisplacement === 0) {
			if (Math.abs(horizontalDisplacement) === 2 || destSquareContent[2] === 'R') {
				// King cannot have moved in order to castle
				if (!hasPieceMoved(boardHistory, pieceMoved)) {
					let horizDirection = horizontalDisplacement < 0 ? 1 : -1;
					let squaresToCheck = horizDirection === 1 ? 3 : 4;
					let square = '';
					let squareContent = '';

					// Check every square between the king and rook for various nonsense
					for (let i = 1; i <= squaresToCheck; i++) {
						square = getSquareFromCoordinates([pieceCoords[0], pieceCoords[1] + i * horizDirection]);
						squareContent = currentBoard[pieceCoords[0]][pieceCoords[1] + i * horizDirection];

						// All spaces between king and rook must be empty
						if (i < squaresToCheck && squareContent !== 'x') {
							return 0;
						}
						// Castling is not possible if the king will move through or into check
						if (i <= 2 && (boardHistory, square, pieceMoved[0])) {
							return 0;
						}
						// If the rook is present and has not moved, castling is possible
						if (i === squaresToCheck) {
							if (squareContent[2] === 'R' && !hasPieceMoved(boardHistory, squareContent)) {
								return 5;
							}
						}
					}
				}
			}
		}

		return 0;
	}

	function isSquareInCheck(boardHistory, square, playerColor) {
		let currentBoard = boardHistory[boardHistory.length - 1];
		let enemyPiece = playerColor === 'W' ? 'B' : 'W';
		let squareCoords = getCoordinatesFromSquare(square);
		let squareContent = currentBoard[squareCoords[0]][squareCoords[1]];
		let currentSquareContent = '';

		for (let i = 0; i < currentBoard.length; i++) {
			for (let j = 0; j < currentBoard[i].length; j++) {
				currentSquareContent = currentBoard[i][j];

				if (currentSquareContent !== 'x' && currentSquareContent[0] === enemyPiece) {
					switch (currentSquareContent[2]) {
						case 'P': {
							let p = verifyValidPawnMove(boardHistory, currentSquareContent, square);
							if (p === 4) {
								return 1;
							} else if (p === 1 && squareContent[0] === enemyPiece && squareContent[2] === 'K') {
								return 1;
							} else continue;
						}
						case 'N':
							if (verifyValidKnightMove(currentBoard, currentSquareContent, square)) {
								return 1;
							} else continue;
						case 'B':
							if (verifyValidBishopMove(currentBoard, currentSquareContent, square)) {
								return 1;
							} else continue;
						case 'R':
							if (verifyValidRookMove(currentBoard, currentSquareContent, square)) {
								return 1;
							} else continue;
						case 'Q':
							if (verifyValidQueenMove(currentBoard, currentSquareContent, square)) {
								return 1;
							} else continue;
						case 'K':
							if (verifyValidKingMove(boardHistory, currentSquareContent, square) === 1) {
								return 1;
							} else continue;
						default:
							continue;
					}
				}
			}
		}

		return 0;
	}

	function isKingInCheckmate(boardHistory, playerColor) {
		let king = playerColor[0] + 'KK';
		let currentBoard = boardHistory[boardHistory.length - 1];
		let currentSquare = '';
		let currentSquareContent = '';

		for (let i = 0; i < currentBoard.length; i++) {
			for (let j = 0; j < currentBoard[i].length; j++) {
				currentSquare = getSquareFromCoordinates([i, j]);
				currentSquareContent = currentBoard[i][j];

				if (currentSquareContent === king || verifyValidKingMove(boardHistory, king, currentSquare)) {
					if (isSquareInCheck(boardHistory, currentSquare, playerColor)) {
						continue;
					} else return 0;
				}
			}
		}

		return 1;
	}

	function verifyValidMovement(boardHistory, playerColor, pieceMoved, destinationSquare) {
		let currentBoard = boardHistory[boardHistory.length - 1];
		let pieceCoords = getPieceCoordinates(currentBoard, pieceMoved);
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
		let destinationSquareContent = currentBoard[destSquareCoords[0]][destSquareCoords[1]];

		// Verify destinationSquare is on the board
		if (!'abcdefgh'.includes(destinationSquare[0]) || destinationSquare[1] < 1 || destinationSquare[1] > 8) {
			return 0;
		}

		// Verify piece being moved matches player's color
		if (playerColor[0] !== pieceMoved[0]) return 0;

		// Verify piece is not moving to the square it's already on
		if (pieceCoords === destSquareCoords) return 0;

		// Verify piece is not attempting to capture a piece of its own color
		// Exception made for castling moves; will be checked in verifyValidKingMove
		if (pieceMoved[0] === destinationSquareContent[0]) {
			if (!(pieceMoved[2] === 'K' && destinationSquareContent[2] === 'R')) {
				return 0;
			}
		}

		// Check piece-specific movement
		switch (pieceMoved[2]) {
			case 'P':
				return verifyValidPawnMove(boardHistory, pieceMoved, destinationSquare);
			case 'N':
				return verifyValidKnightMove(currentBoard, pieceMoved, destinationSquare);
			case 'B':
				return verifyValidBishopMove(currentBoard, pieceMoved, destinationSquare);
			case 'R':
				return verifyValidRookMove(currentBoard, pieceMoved, destinationSquare);
			case 'Q':
				return verifyValidQueenMove(currentBoard, pieceMoved, destinationSquare);
			case 'K':
				return verifyValidKingMove(boardHistory, pieceMoved, destinationSquare);
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

	function getNewBoardCastle(oldBoard, pieceMoved, destinationSquare) {
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
		let kingStartCoords = getPieceCoordinates(oldBoard, pieceMoved);
		let horizontalDisplacement = kingStartCoords[1] - destSquareCoords[1];

		let direction = horizontalDisplacement < 0 ? 'K' : 'Q';
		let rook = pieceMoved[0] + direction + 'R';
		let rookNewPos = direction === 'K' ? -1 : 1;

		let newBoard = oldBoard.map((row, rowIndex) => {
			return row.map((square, squareIndex) => {
				for (let i = 0; i < row.length; i++) {
					if (square === pieceMoved || oldBoard[rowIndex][squareIndex] === rook) {
						return 'x';
					} else if (destSquareCoords[0] === rowIndex && destSquareCoords[1] === squareIndex) {
						return pieceMoved;
					} else if (destSquareCoords[0] === rowIndex && destSquareCoords[1] + rookNewPos === squareIndex) {
						return rook;
					} else return square;
				}
			});
		});

		return newBoard;
	}

	function getNewBoardEnPassant(oldBoard, pieceMoved, destinationSquare) {
		let pieceCoords = getPieceCoordinates(oldBoard, pieceMoved);
		let destSquareCoords = getCoordinatesFromSquare(destinationSquare);
		let verticalDisplacement = pieceCoords[0] - destSquareCoords[0];

		let newBoard = oldBoard.map((row, rowIndex) => {
			return row.map((square, squareIndex) => {
				for (let i = 0; i < row.length; i++) {
					if (square === pieceMoved) {
						return 'x';
					} else if (rowIndex === destSquareCoords[0] - verticalDisplacement && squareIndex === destSquareCoords[1]) {
						return 'x';
					} else if (destSquareCoords[0] === rowIndex && destSquareCoords[1] === squareIndex) {
						return pieceMoved;
					} else return square;
				}
			});
		});

		return newBoard;
	}

	let boardHistory = [INITIALBOARD];
    let currentBoard = [];
    let newBoard = [];

    let playerColor = 'White';
    let enemyColor = 'Black';

    let selectedPiece = '';
    let selectedSquare = '';
    let moveResult = 0;
    let invalidMove = false;

    let temp = 0;
    
	function updateGame (userInput) {
		let squareCoords = userInput.detail[0];
		let squareContent = userInput.detail[1];
		let square = BOARDSQUARES[squareCoords[0]][squareCoords[1]];

        currentBoard = boardHistory[boardHistory.length - 1];

        if (temp === 0) {
            selectedPiece = squareContent;
            temp += 1;
        }
        else if (temp === 1) do {
            selectedSquare = square;
            moveResult = verifyValidMovement(boardHistory, playerColor, selectedPiece, selectedSquare);

            if (!moveResult || moveResult === 4) {
			    invalidMove = true;
                temp = 0;
			    break;
		    }
            switch (moveResult) {
                case 1:
                case 2:
                    newBoard = getNewBoard(currentBoard, selectedPiece, selectedSquare);
                    break;
                case 3:
                    newBoard = getNewBoardEnPassant(currentBoard, selectedPiece, selectedSquare);
                    break;
                case 5:
                    newBoard = getNewBoardCastle(currentBoard, selectedPiece, selectedSquare);
                    break;
            }

            if (isSquareInCheck(boardHistory, getPieceSquare(currentBoard, playerColor[0] + 'KK'), playerColor)) {
                console.log("????");
		    }

            boardHistory = [...boardHistory, newBoard];
            [playerColor, enemyColor] = [enemyColor, playerColor];
            if (invalidMove) !invalidMove;
            temp = 0;

        } while (false);

    }

</script>

<div>
	<div class="game-board">
		<Board board={boardHistory[boardHistory.length - 1]} on:click={updateGame} />
	</div>
    {#if invalidMove}
        <p style="color: red">Invalid move</p>
    {/if}

    <p>It's {playerColor}'s turn.</p>

    {#if temp === 0}
        <p>{playerColor}, please select a piece.</p>
    {:else if temp === 1}
        <p>{playerColor} selected {selectedPiece}. Now pick a square to move it too.</p>
    {/if}
</div>

<style>
	.game-board {
		display: flex;
		justify-content: center;
		margin: 40px auto;
	}
</style>
