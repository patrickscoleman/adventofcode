const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	const file_data = await getFileContent(path);
	const formatted_data = formatData(file_data);
	const result = solveProblem(formatted_data);
	console.log(result);
}

function evaluate(rucksack) {
	const shared_item = findShared(rucksack);
	return calculatePriority(shared_item);
}

function findShared(rucksack) {
	let shared_item = '';
	const compartment1 = rucksack.slice(0,rucksack.length/2);
	const compartment2 = rucksack.slice(-rucksack.length/2);

	for (item of compartment1) {
		if (compartment2.includes(item)) {
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
	for (const datum of data) {
		result += evaluate(datum);
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
