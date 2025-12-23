export function validateQuiz (
	title: string,
	category: string,
	timeLimit: number,
	description: string
): string | null {
	if (!title || typeof title !== 'string') {
		return 'Title is required and must be a string.';
	}
	if (!category || typeof category !== 'string') {
		return 'Category is required and must be a string.';
	}
	// if (!description || typeof description !== 'string') {
	// 	return 'Description is required.';
	// }
	if (timeLimit && (typeof timeLimit !== 'number' || timeLimit <= 0)) {
		return 'timeLimit must be a positive number if provided.';
	}
	return null;
}

export function validateQuestion (
	questionText: string,
	options: string[],
	correctAnswer: string
): string | null {
	if (!questionText || typeof questionText !== 'string') {
		return 'Question text is required and must be a string.';
	}
	if (!Array.isArray(options) || options.length !== 4) {
		return 'Options must be an array with exactly 4 items.';
	}
	if (!options.every((opt) => typeof opt === 'string')) {
		return 'All options must be strings.';
	}
	if (!correctAnswer || !options.includes(correctAnswer)) {
		return 'Correct answer must be one of the provided options.';
	}
	return null;
}
