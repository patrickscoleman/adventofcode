const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	const file_data = await getFileContent(path);
	const formatted_data = formatData(file_data);
	const result = solveProblem(formatted_data);
	console.log(result);
}

function evaluate(group) {
	const shared_item = findShared(group);
	return calculatePriority(shared_item);
}

function findShared(group) {
	let shared_item = '';

	for (item of group[0]) {
		if (group[1].includes(item) && group[2].includes(item)) {
			shared_item = item;
			break;
		}
	}

	return shared_item;
}

function calculatePriority(char) {
	if (char === char.toUpperCase()) {
		// A to Z have priorities of 27 to 52
		return char.charCodeAt() - 38;
	} else {
		// a to z have priorities of 1 to 26
		return char.charCodeAt() - 96;
	}
}

function solveProblem(data) {
	let result = 0;
	let group = [[],[],[]];
	for (const datum of data) {
		if (group[0].length === 0) {
			group[0] = datum;
		} else if (group[1].length === 0) {
			group[1] = datum;
		} else {
			group[2] = datum;
			result += evaluate(group);
			group = [[],[],[]];
		}
	}
	return result;
}

function formatData(data) {
	const data_array = data.split('\n');
	let items = [];

	for (const item of data_array) {
		items.push(item.split(''));
	}

	items.pop();

	return items;
}

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}
