import { create } from "zustand";
import { Category, Quiz } from "./types";

type modalType = "category" | "quiz" | null

interface QuizState {
	category: string,
	type: modalType,
	edit: null | Quiz | Category,
	setEdit: (data: Category | Quiz) => void
	isOpen: boolean,
	showCategoryModal: () => void,
	showQuizModal: () => void,
	hideModal: () => void,
	setFilter: (value: string) => void

}

export const useQuizStore = create<QuizState>((set) => ({
	category: "",
	type: null,
	edit: null,
	isOpen: false,
	setEdit: (data) => {
		set({edit: data})
	},
	showCategoryModal: () => {
		set({isOpen: true, type: "category", })
	},
	showQuizModal: () => {
		set({isOpen: true, type: "quiz"})
	},
	hideModal: () => {
		set({type: null, isOpen: false, edit: null})
	},
	setFilter: (value) => {
		set({category: value})
	}
}))