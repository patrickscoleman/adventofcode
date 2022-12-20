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
	const shape_scores = {X: 1, Y: 2, Z: 3};
	const outcome_scores = {loss: 0, draw: 3, win: 6};

	console.log(game);

	// Score your shape
	score += shape_scores[game[1]];

	// Score the outcome of the game
	console.log(playGame(game[0], game[1]));
	score += outcome_scores[playGame(game[0], game[1])];

	console.log(score);

	return score;
}

function playGame(player1, player2) {
	let outcome = 'error';

	if (player1==='A') { // Rock
		if (player2==='X') {outcome = 'draw';} // Rock
		else if (player2==='Y') {outcome = 'win';} // Paper
		else if (player2==='Z') {outcome = 'loss';} // Scissors
	} else if (player1==='B') { // Paper
		if (player2==='X') {outcome = 'loss';} // Rock
		else if (player2==='Y') {outcome = 'draw';} // Paper
		else if (player2==='Z') {outcome = 'win';} // Scissors
	} else if (player1==='C') { // Scissors
		if (player2==='X') {outcome = 'win';} // Rock
		else if (player2==='Y') {outcome = 'loss';} // Paper
		else if (player2==='Z') {outcome = 'draw';} // Scissors
	}

	return outcome;
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
