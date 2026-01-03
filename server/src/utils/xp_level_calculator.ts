const xpRequiredLevel = (level: number): number => {
	const step = Math.floor((level - 1) / 2);
	return 150 + step * 50;
};

export const calculateLevelFromXp = (totalXp: number) => {
	let level = 1;
	let xpRemaining = totalXp;
	let xpSpent = 0;

	while (true) {
		const xpForNext = xpRequiredLevel(level);

		if (xpRemaining < xpForNext) {
			return {
				level,
				xpIntoLevel: xpRemaining,
				xpForNextLevel: xpForNext,
				totalXpForNextLevel: xpSpent + xpForNext,
			};
		}

		xpRemaining -= xpForNext;
		xpSpent += xpForNext;
		level++;
	}
};
