// import { Quiz } from "@/types"
import { Leaderboard } from '@/pages/Leaderboard';

interface Tag {
	_id?: string;
	name: string;
}

export interface Category {
	name: string;
	slug: string;
	description: string;
	quizCount?: number;
	tags: Tag[];
}

export interface CategoryWithQuizzes {
	category: Category["name"];
	description: Category["description"];
	tags: Category["tags"];
	quizzes: Quiz[];
}

export interface Quiz {
	_id: string;
	title: string;
	difficulty: "easy" | "medium" | "hard";
	timeLimit: number;
	// description: string;
	questionCount?: number;
}

export interface Question {
	_id: string;
	quizId: string;
	questionText: string;
	options: string[];
	correctOption: number;
}

export interface QuizWithCategory {
	category: Category["name"];
	tags: Category["tags"];
	categoryDescription: Category["description"];
	quizzes: Quiz[];
}

interface Attempts {
	question: string;
	selected: string;
	correct: string;
	isCorrect: boolean;
}

export interface Result {
	totalQuestions: number;
	// correctAnswers: number,
	userAnswers: number;
	score: number;
	attempts: Attempts[];
	accuracy: number;
}

export interface GetResult {
	_id?: string;
	quiz?: string;
	user: string;
	correctAnswers: number[];
	// quiz: string;
	xpEarned: number;
	score: number;
	createdAt: string;
	updatedAt: string;
}

export interface Stats {
	stats: {
		_id: string;
		user: string;
		createdAt: string;
		currentStreak: number;
		lastQuizDate: string;
		longestStreak: number;
		quizzesTaken: number;
		totalCorrect: number;
		totalFailed: number;
		totalXp: number;
		updatedAt: string;
	};
	progress: {
		level: number;
		xpIntoLevel: number;
		nextTotalXp: number;
		nextXp: number;
	};
}



export interface Leaderboard {
	leaderboard: {
		_id: string;
		profile: string;
		user: string;
		totalXp: number;
	}[];
	userRank: {
		rank: number;
		name: string;
		profile: string;
		totalXp: number;
	};
}
