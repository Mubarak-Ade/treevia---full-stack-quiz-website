const COLORS = [
	{
		gradient:
			"bg-gradient-to-br via-teal-900/20 from-slate-800/20 to-slate-900/15",
		bg: "bg-teal-500",
		text: "text-teal-500 border-teal-500",
		border: "border-teal-500",
	},
	{
		gradient:
			"bg-gradient-to-br via-purple-900/20 from-slate-800/20 to-purple-900/15",
		bg: "bg-purple-500",
		text: "text-purple-500 border-purple-500",
		border: "border-purple-500",
	},
	{
		gradient:
			"bg-gradient-to-br via-blue-900/20 from-slate-800/20 to-slate-900/15",
		bg: "bg-blue-500",
		text: "text-blue-500 border-blue-500",
		border: "border-blue-500",
	},
	{
		gradient:
			"bg-gradient-to-br via-green-900/20 from-slate-800/20 to-slate-900/15",
		bg: "bg-green-500",
		text: "text-green-500 border-green-500",
		border: "border-green-500",
	},
	{
		gradient:
			"bg-gradient-to-br via-pink-900/20 from-slate-800/20 to-slate-900/15",
		bg: "bg-pink-500",
		text: "text-pink-500 border-pink-500",
		border: "border-orange-500",
	},
];

export const getColorFromString = (value: string | any) => {
	let hash = 0;
	for (let i = 0; i < value?.length; i++) {
		hash = value?.charCodeAt(i) + ((hash << 5) - hash);
	}
	return COLORS[Math.abs(hash) % COLORS.length];
};

export const getScoreColor = (score: number) => {
	let color;
	if (score >= 8) {
		color = "text-green-500 bg-green-500/20";
	} else if (score >= 5) {
		color = "text-yellow-500 bg-yellow-500/20";
	} else {
		color = "text-red-500 bg-red-500/20";
	}
	return color;
};
