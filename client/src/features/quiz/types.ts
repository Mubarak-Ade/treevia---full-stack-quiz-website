// import { Quiz } from "@/types"
import { Leaderboard } from '@/pages/Leaderboard';

interface Tag
{
	_id?: string;
	name: string;
}

export interface Category
{
	_id?: string
	name: string;
	slug?: string;
	description: string;
	quizCount?: number;
	tags: Tag[] | string[];
	updatedAt?: string
}

export interface CategoryWithQuizzes
{
	category: Category[ "name" ];
	description: Category[ "description" ];
	tags: Category[ "tags" ];
	quizzes: Quiz[];
}

export interface Quiz
{
	_id: string;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	category?: {
		_id: string
		name: string
	}
	timeLimit: number;
	updatedAt: string,
	// description: string;
	questionCount?: number;
	questions?: Question[]
}

export interface FilterQuiz
{
	quizzes: Quiz[]
	page?: number,
	pages?: number,
	total?: number
}

export interface Question
{
	_id?: string;
	quizId?: string;
	questionText: string;
	options: string[];
	correctAnswer: number;
}

export interface QuizWithCategory
{
	category: Category[ "name" ];
	tags: Category[ "tags" ];
	categoryDescription: Category[ "description" ];
	quizzes: Quiz[];
}

interface Attempts
{
	question: string;
	selected: string;
	correct: string;
	isCorrect: boolean;
}

export interface Result
{
	totalQuestions: number;
	// correctAnswers: number,
	userAnswers: number;
	score: number;
	attempts: Attempts[];
	accuracy: number;
}

export interface GetResult
{
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

export interface Stats
{
	_id: string,
	user: string,
	accuracy: number,
	createdAt: string,
	currentStreak: number,
	highestScore: number,
	lastQuizDate: string,
	level: number,
	longestStreak: number,
	quizzesTaken: number,
	totalCorrect: number,
	totalFailed: number,
	totalXp: number,
	updatedAt: number,
	totalQuestion: number,
	xpIntoLevel: number,
	xpForNextLevel: number
}



export interface Leaderboard
{
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
