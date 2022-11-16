<script>
	import Board from './Board.svelte';
	import * as Chess from '../utils/ChessFunctions.js';
  import MoveHistoryCard from './MoveHistoryCard.svelte';

	let boardHistory = [Chess.INITIALBOARD];
	let moveHistory = [];

	let playerColor = 'White';
	let enemyColor = 'Black';

	let selectedPiece = '';
	let selectedSquare = '';

	let invalidSelection = false;
	let invalidMove = false;

	let turnPart = 0;
	let gameWinner = '';

	// Handles clicks on the game board.
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
			let newBoard = Chess.movePiece(boardHistory, selectedPiece, selectedSquare);
			if (!newBoard) {
				invalidMove = true;
				turnPart = 0;
				break;
			}

			// Move is valid; push to board and move histories
			boardHistory = [...boardHistory, newBoard];
			moveHistory = [...moveHistory, [selectedPiece, selectedSquare]]

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
	<div class="game-container">
		<Board board={boardHistory[boardHistory.length - 1]} on:click={updateGame} />
		<MoveHistoryCard {moveHistory} />
	</div>

	<div class="game-info">
		{#if gameWinner}
			<p style="color: green">{gameWinner} wins!</p>
		{/if}

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
	.game-container {
		display: flex;
		justify-content: center;
		margin: 40px auto;
	}
</style>
