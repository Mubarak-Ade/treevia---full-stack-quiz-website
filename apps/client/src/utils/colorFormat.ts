const COLORS = [
	{
		gradient:
			"bg-gradient-to-br dark:via-teal-900/20 dark:from-slate-800/20 dark:to-slate-900/15 via-teal-900/50 from-slate-900/20 to-slate-900/15 ",
		bgt: "bg-teal-500/10 dark:bg-teal-900/10",
		bg: "bg-teal-500 dark:bg-teal-900",
		text: "text-teal-500 border-teal-500",
		border: "border-teal-500",
		hover: "hover:bg-teal-500"
	},
	{
		gradient:
			"bg-gradient-to-br dark:via-purple-900/20 dark:from-slate-800/20 dark:to-purple-900 via-purple-900/50 from-slate-900/20 to-purple-900/50",
		bgt: "bg-purple-500/10 dark:bg-purple-900/10",
		bg: "bg-purple-500 dark:bg-purple-900",
		text: "text-purple-500 border-purple-500",
		border: "border-purple-500",
		hover: "hover:bg-purple-500"
	},
	{
		gradient:
			"bg-gradient-to-br dark:via-blue-900/20 dark:from-slate-800/20 dark:to-slate-900/15 via-blue-900/50 from-slate-900/20 to-slate-900/50",
		bgt: "bg-blue-500/10 dark:bg-blue-900/10",
		bg: "bg-blue-500 dark:bg-blue-900",
		text: "text-blue-500 border-blue-500",
		border: "border-blue-500",
		hover: "hover:bg-blue-500"
	},
	{
		gradient:
			"bg-gradient-to-br dark:via-green-900/20 dark:from-slate-800/20 dark:to-slate-900/1 via-green-900/50 from-slate-900/20 to-slate-900/80",
		bgt: "bg-green-500/10 dark:bg-green-900/10",
		bg:"bg-green-500 dark:bg-green-900",
		text: "text-green-500 border-green-500",
		border: "border-green-500",
		hover: "hover:bg-green-500"
	},
	{
		gradient:
			"bg-gradient-to-br dark:via-pink-900/20 dark:from-slate-800/20 dark:to-slate-900/15 via-pink-900/80 from-slate-800/80 to-slate-900/80",
		bgt: "bg-pink-500/10 dark:bg-pink-900/10",
		bg: "bg-pink-500 dark:bg-pink-900",
		text: "text-pink-500 border-pink-500",
		border: "border-pink-500",
		hover: "hover:bg-pink-500"
	},
];

export const getColorFromString = (value: string | any) => {
	let hash = 0;
	for (let i = 0; i < value?.length; i++) {
		hash = value?.charCodeAt(i) + ((hash << 5) - hash);
	}
	return COLORS[Math.abs(hash) % COLORS.length];
};

export const getScoreColor = (score: number, total: number) => {
	let color;

	if (score > Math.round(total / 2)) {
		color = "text-green-500 bg-green-500/20";
	} else if (score > Math.round(total / 4)) {
		color = "text-yellow-500 bg-yellow-500/20";
	} else {
		color = "text-red-500 bg-red-500/20";
	}
	return color;
};
