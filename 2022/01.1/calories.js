const { readFile } = require('fs/promises');

async function getFileContent(path) {
	return await readFile(path, 'utf8');
}

async function findMostCalories() {
	const all_calories = await getFileContent('./calories.txt');

	let calorie_array = all_calories.split('\n');
	calorie_array.push('');
	let current_calories = 0;
	let most_calories = 0;

	for (const calorie of calorie_array) {
		if (calorie) {
			current_calories += parseInt(calorie);
		} else {
			most_calories = current_calories > most_calories ? current_calories : most_calories;
			current_calories = 0;
		}
	}

	console.log(most_calories);
}

findMostCalories();
