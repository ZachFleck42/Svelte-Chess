<script>
	import Board from './Board.svelte';
	import * as Chess from '../utils/ChessFunctions.js';

	let boardHistory = [Chess.INITIALBOARD];

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

		// Piece selection
		if (turnPart === 0) do {
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
		else if (turnPart === 1) do {
			selectedSquare = square;

			// Allow user to selecte a different piece (of their own color)
			if (squareContent[0] === playerColor[0]) {
				selectedPiece = squareContent;
				break;
			}

			// Check for invalid piece movement
			moveResult = Chess.movePiece(boardHistory, selectedPiece, selectedSquare);
			if (!moveResult) {
				invalidMove = true;
				turnPart = 0;
				break;
			}

			// Move is valid; push to board history
			boardHistory = [...boardHistory, moveResult];

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
