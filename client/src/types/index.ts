/**
 * Shared TypeScript Type Definitions
 * Place this file in src/types/index.ts
 */

// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher' | 'admin';
  isOnline: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  token: string;
}

// Quiz Types
export interface Quiz {
  _id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  description: string;
  createdBy?: string;
  questions?: string[] | Question[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Question {
  _id: string;
  quizId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface QuizWithQuestions extends Quiz {
  questions: Question[];
}

// Result Types
export interface QuizResult {
  _id: string;
  user: string | User;
  quiz: string | Quiz;
  score: number;
  correctAnswers: number;
  percentage: number;
  answers: Answer[];
  submittedAt: Date;
}

export interface Answer {
  questionId: string;
  selectedAnswer: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface CreateQuizFormData {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  description: string;
  tags?: string[];
}

export interface CreateQuestionFormData {
  questionText: string;
  options: [string, string, string, string];
  correctAnswer: number;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  data?: any;
} selectedQuiz: Quiz | null;
  openFor: string | null;
  error: string | null;
}

export interface CreateQuizState {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  description: string;
  tags: string[];
  questions: CreateQuestionFormData[];
  loading: boolean;
  error: string | null;
}

export interface ResultState {
  results: QuizResult[];
  currentResult: QuizResult | null;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  modal: boolean | null;
}

// Notification Types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: NotificationType;
  message: string;
}

export interface NotificationContextValue {
  showNotification: (type: NotificationType, message: string) => void;
}

// Component Props Types (Examples)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Utility Types
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}
