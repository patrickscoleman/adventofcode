const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	const file_data = await getFileContent(path);
	const formatted_data = formatData(file_data);
	const result = solveProblem(formatted_data);
	console.log(result);
}

function solveProblem(data) {
	let result = 0;
	for (const game of data) {
		result += scoreGame(game);
	}
	return result;
}

function scoreGame(game) {
	let score = 0;
	const shape_scores = {A: 1, B: 2, C: 3};
	const outcome_scores = {X: 0, Y: 3, Z: 6};

	// Score your shape
	score += shape_scores[playGame(game[0],game[1])];

	// Score the outcome of the game
	score += outcome_scores[game[1]];

	return score;
}

function playGame(player1, outcome) {
	let player2_shape = 'error';

	if (player1==='A') { // Rock
		if (outcome==='X') {player2_shape = 'C';} // Loss
		else if (outcome==='Y') {player2_shape = 'A';} // Draw
		else if (outcome==='Z') {player2_shape = 'B';} // Win
	} else if (player1==='B') { // Paper
		if (outcome==='X') {player2_shape = 'A';} // Loss
		else if (outcome==='Y') {player2_shape = 'B';} // Draw
		else if (outcome==='Z') {player2_shape = 'C';} // Win
	} else if (player1==='C') { // Scissors
		if (outcome==='X') {player2_shape = 'B';} // Loss
		else if (outcome==='Y') {player2_shape = 'C';} // Draw
		else if (outcome==='Z') {player2_shape = 'A';} // Win
	}

	return player2_shape;
}

function formatData(data) {
	const array = data.split('\n');
	let games = [];

	for (const game of array) {
		games.push(game.split(' '));
	}

	games.pop();

	return games;
}

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}
