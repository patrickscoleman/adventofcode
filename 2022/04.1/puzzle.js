const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	const file_data = await getFileContent(path);
	const formatted_data = formatData(file_data);
	const result = solveProblem(formatted_data);
	console.log(result);
}

function evaluate(elf1, elf2) {
	let isContained = 0;

	if (elf1[0] <= elf2[1] && elf1[1] >= elf2[0]) {
		isContained = 1;
	}

	return isContained;
}

function solveProblem(data) {
	let result = 0;

	for (const datum of data) {
		result += evaluate(datum[0],datum[1]);
	}

	return result;
}

function formatData(data) {
	const data_array = data.split('\n');
	let items = [[[],[]]];

	for (const item of data_array) {
		let pair = item.split(',');
		try {
			items.push([pair[0].split('-').map((x)=>parseInt(x)),
									pair[1].split('-').map((x)=>parseInt(x))]);
		} catch {
			break;
		}
	}

	// console.log(items.slice(0,10));
	// console.log(items.slice(-10));
	// console.log(items.length);

	return items.slice(1);
}

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}
