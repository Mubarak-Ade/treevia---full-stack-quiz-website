import { create } from "zustand";

export type ThemeMode = "light" | "dark";

interface ThemeState {
	theme: ThemeMode;
	initTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
}

const STORAGE_KEY = "treevia-theme";

const applyTheme = (theme: ThemeMode) => {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.dataset.theme = theme;
	localStorage.setItem(STORAGE_KEY, theme);
};

const useThemeStore = create<ThemeState>((set, get) => ({
	theme: "light",
	initTheme: () => {
		const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
		const preferredTheme =
			storedTheme ??
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");

		applyTheme(preferredTheme);
		set({ theme: preferredTheme });
	},
	setTheme: (theme) => {
		applyTheme(theme);
		set({ theme });
	},
	toggleTheme: () => {
		const nextTheme = get().theme === "dark" ? "light" : "dark";
		applyTheme(nextTheme);
		set({ theme: nextTheme });
	},
}));

export default useThemeStore;
