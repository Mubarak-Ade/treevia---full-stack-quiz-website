const COLORS = [
    {
        bg: "bg-gradient-to-br via-teal-900/20 from-slate-800/20 to-slate-900/15",
        text: "text-teal-500 border-teal-500",
    },
    {
        bg: "bg-gradient-to-br via-purple-900/20 from-slate-800/20 to-purple-900/15",
        text: "text-purple-500 border-purple-500",
    },
    {
        bg: "bg-gradient-to-br via-blue-900/20 from-slate-800/20 to-slate-900/15",
        text: "text-blue-500 border-blue-500",
    },
    {
        bg: "bg-gradient-to-br via-green-900/20 from-slate-800/20 to-slate-900/15",
        text: "text-green-500 border-green-500",
    },
    {
        bg: "bg-gradient-to-br via-pink-900/20 from-slate-800/20 to-slate-900/15",
        text: "text-pink-500 border-pink-500",
    },
];

export const getColorFromString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
};