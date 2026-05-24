import { IStats } from "../modules/user/user-stats.model.js";

const BASE = 100;
const RATE = 1.5;

function xpForLevel(level: number): number {
    if (level <= 1) return 0;
    return Math.floor(BASE * ((Math.pow(RATE, level - 1) - 1)));
}

export function calculateLevel(totalXp: number): number {
    return Math.floor(Math.log(totalXp / BASE + 1) / Math.log(RATE)) + 1;
}

export function getNextXp(totalXp: number) {
    const currentLevel  = calculateLevel(totalXp);
    const levelStartXp  = xpForLevel(currentLevel);    
    const levelEndXp    = xpForLevel(currentLevel + 1);

    return {
        currentLevel,
        totalXp,                               
        levelStartXp,                         
        levelEndXp,                            
        progress : totalXp - levelStartXp,     
        needed   : levelEndXp - totalXp,       
        total    : levelEndXp - levelStartXp,  
    };
}

export function calculateXp(
    baseXp: number,
    correctCount: number,
    totalQuestions: number,
    streak: number,
) {
    const accuracy = correctCount / totalQuestions;

    // Perfect score bonus
    const perfectBonus = accuracy === 1 ? Math.floor(baseXp * 0.5) : 0;

    // Accuracy bonus — only if above 50%
    const accuracyBonus = accuracy >= 0.5
        ? Math.floor(baseXp * accuracy * 0.3)
        : 0;

    // Streak bonus — caps at 10 days so it doesn't get out of hand
    const streakBonus = Math.min(streak, 10) * 5;

    const total = baseXp + perfectBonus + accuracyBonus + streakBonus;

    return {
        baseXp,
        perfectBonus,
        accuracyBonus,
        streakBonus,
        total,
    };
}

export const updateStreak = (stats: IStats): number  => {
	const today = new Date()
	const lastAttempt = stats?.lastQuizDate

	const diffDays = lastAttempt ? Math.floor(today.getTime() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24) : null

	let newStreak: number;

	if (!lastAttempt || diffDays! > 1) {
		newStreak = 1
	} else if (diffDays === 1) {
		newStreak = (stats?.currentStreak ?? 0) + 1
	} else {
		newStreak = stats.currentStreak ?? 1
	}

	return newStreak
}

type Rank = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export const calculateRank = (totalXp: number): Rank => {
	if (totalXp >= 5000) return 'Diamond';
	if (totalXp >= 2500) return 'Platinum';
	if (totalXp >= 1000) return 'Gold';
	if (totalXp >= 300) return 'Silver';
	return 'Bronze'
}
