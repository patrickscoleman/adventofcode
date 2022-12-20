const { readFile } = require('fs/promises');

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}

async function sumCaloriesByElf() {
	const all_calories = await getFileContent('./calories.txt');

	let calorie_array = all_calories.split('\n');
	calorie_array.push('');

	let elf_sums = [];
	let current_elf = 0;

	for (const calorie of calorie_array) {
		if (calorie) {
			current_elf += parseInt(calorie);
		} else {
			elf_sums.push(current_elf);
			current_elf = 0;
		}
	}

	return elf_sums;
}

function findTop3(arr) {
	arr.sort((a,b) => b-a);
	console.log(arr);
	return arr.slice(0,3);
}

async function sumTop3Elves() {
	const elves = await sumCaloriesByElf();
	const top3Elves = findTop3(elves);
	sum = top3Elves.reduce((prev, curr) => prev + curr, 0);
	console.log(sum);
}

sumTop3Elves();
