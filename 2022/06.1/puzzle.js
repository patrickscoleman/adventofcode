const { readFile } = require('fs/promises');

exec('./input.txt');

async function exec(path) {
	// Get formatted data from file
	const file_data = await getFileContent(path);
	const data = formatData(file_data);
	// console.log(data);

	// Solve problem
	const result = solveProblem(data);
	console.log(result);
}

function solveProblem(data) {
	// Start at 14th character
	let i = 13;
	loop:
	for (i; i<data.length; i++) {
		const chars = data.slice(i-13,i+1);
		for (let j=0; j<chars.length; j++) {
			console.log(chars[j]);
			console.log(chars.slice(j+1));
			if (chars.slice(j+1).includes(chars[j])) {
				continue loop;
			}
		}
		break;
	}

	// Change to 1-index
	return i+1;
}

function formatData(data) {
	const lines = data.split('\n');
	return lines[0].split('');
}

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}
