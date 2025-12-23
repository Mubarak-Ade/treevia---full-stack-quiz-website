import { create } from 'zustand';
import { persist } from "zustand/middleware"


interface AuthState {
	user: User | null;
	token: string | null;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	logOut: () => void;
}

const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			user: null,
			token: null,
			setUser: (user) => set({ user }),
			setToken: (token) => set({ token }),
			logOut: () => set({ token: null, user: null })

		}),
		{
			name: "auth",
			partialize: (state) => ({
				user: state.user,
				token: state.token
			})
		}
	));

export default useAuthStore;
