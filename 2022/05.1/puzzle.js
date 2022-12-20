const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	const file_data = await getFileContent(path);
	const [crates,moves] = formatData(file_data);
	const result = solveProblem(crates, moves);
	console.log(result);
}

function evaluate(crates, move) {
	for (let i = 0; i < move[0]; i++) {
		const crate = crates[move[1]-1].shift();
		if (crate) {
			crates[move[2]-1].unshift(crate);
		}
	}
	return crates;
}

function getTopCrates(crates) {
	let top_crates = '';
	for (column of crates) { top_crates += column[0]; }
	return top_crates;
}

function solveProblem(crates, moves) {
	for (const move of moves) {
		crates = evaluate(crates, move);
	}

	return getTopCrates(crates);
}

function processMoves(move) {
	let words = move.split(' ');
	return [parseInt(words[1]),
					parseInt(words[3]),
					parseInt(words[5])];
}

function processCrates(crates, crate_row) {
	for (let i = 0; i < crates.length; i++) {
		const char = crate_row.charAt(i*4+1);
		if (char === ' ' || char === '') {
			continue;
		} else {
			crates[i].push(char);
		}
	}
	return crates;
}


function formatData(data) {
	const data_array = data.split('\n');
	let items = [[[],[],[],[],[],[],[],[],[]],[]];

	for (const item of data_array) {
		if (item.includes('[')) {
			items[0] = processCrates(items[0], item);
		} else if (item.includes('move')) {
			items[1].push(processMoves(item));
		}
	}

	return [items[0], items[1]];
}

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}
