import { create } from "zustand";

interface QuizState {
	category: string,
	setFilter: (value: string) => void
}

export const useQuizStore = create<QuizState>((set) => ({
	category: "",
	setFilter: (value) => {
		set({category: value})
	}
}))