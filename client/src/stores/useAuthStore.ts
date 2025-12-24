import { create } from 'zustand';
import { persist } from "zustand/middleware"


interface AuthState {
	user: User | null;
	token: string | null;
	setAuth: (user: User, token: string) => void;
	logOut: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			setAuth: (user, token) => set({ user, token }),
			logOut: () => set({ token: null, user: null })

		}),
		{
			name: "auth",
			partialize: (state): Pick<AuthState, 'user' | 'token'> => ({
				user: state.user,
				token: state.token
			})
		}
	));

export default useAuthStore;
