<script>
	import Board from './Board.svelte';
	import * as Chess from '../utils/ChessFunctions.js';

	let boardHistory = [Chess.INITIALBOARD];
	let newBoard = [];

	let playerColor = 'White';
	let enemyColor = 'Black';

	let selectedPiece = '';
	let selectedSquare = '';
	let moveResult = 0;

	let invalidSelection = false;
	let invalidMove = false;

	let turnPart = 0;
	let gameWinner = '';

	function updateGame(userInput) {
		let squareCoords = userInput.detail[0];
		let squareContent = userInput.detail[1];
		let square = Chess.BOARDSQUARES[squareCoords[0]][squareCoords[1]];

		let currentBoard = boardHistory[boardHistory.length - 1];

		// Piece selection
		if (turnPart === 0)
			do {
				if (invalidSelection) invalidSelection = false;
				if (invalidMove) invalidMove = false;

				selectedPiece = squareContent;
				if (selectedPiece[0] !== playerColor[0]) {
					invalidSelection = true;
					break;
				}

				turnPart += 1;
			} while (false);
		// Destination square selection
		else if (turnPart === 1)
			do {
				selectedSquare = square;

				// Allow user to selecte a different piece (of their own color)
				if (squareContent[0] === playerColor[0]) {
					selectedPiece = squareContent;
					break;
				}

				moveResult = Chess.verifyValidMovement(boardHistory, playerColor, selectedPiece, selectedSquare);
				// Check for invalid piece movement
				if (!moveResult || moveResult === 4) {
					invalidMove = true;
					turnPart = 0;
					break;
				}

				// If valid movement, get an updated board
				switch (moveResult) {
					case 1:
					case 2:
						newBoard = Chess.getNewBoard(currentBoard, selectedPiece, selectedSquare);
						break;
					case 3:
						newBoard = Chess.getNewBoardEnPassant(currentBoard, selectedPiece, selectedSquare);
						break;
					case 5:
						newBoard = Chess.getNewBoardCastle(currentBoard, selectedPiece, selectedSquare);
						break;
				}

				// Check if the move would leave player's king in check.
				let kingSquare = Chess.getPieceSquare(newBoard, playerColor[0] + 'KK');
				if (Chess.isSquareInCheck([...boardHistory, newBoard], kingSquare, playerColor[0])) {
					invalidMove = true;
					turnPart = 0;
					break;
				}

				// Move is valid; push to board history
				boardHistory = [...boardHistory, newBoard];

				// Check for checkmate
				if (Chess.isKingInCheckmate(boardHistory, enemyColor)) {
					gameWinner = playerColor;
					break;
				}

				[playerColor, enemyColor] = [enemyColor, playerColor];
				turnPart = 0;
			} while (false);
	}
</script>

<div>
	<div class="game-board">
		<Board board={boardHistory[boardHistory.length - 1]} on:click={updateGame} />
	</div>
	<div class="game-info">
		{#if gameWinner}
			<p style="color: green">{gameWinner} wins!</p>
		{/if}

		<!-- Error readouts -->
		{#if invalidMove}
			<p style="color: red">Invalid move</p>
		{:else if invalidSelection}
			<p style="color: red">Invalid selection</p>
		{/if}

		<p>It's {playerColor}'s turn.</p>

		{#if turnPart === 0}
			<p>{playerColor}, please select a piece.</p>
		{:else if turnPart === 1}
			<p>{playerColor} selected {selectedPiece}. Now pick a square to move it to.</p>
		{/if}
	</div>
</div>

<style>
	.game-board {
		display: flex;
		justify-content: center;
		margin: 40px auto;
	}
</style>
