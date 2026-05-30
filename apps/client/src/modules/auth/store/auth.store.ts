import { User } from '@/modules/auth/types/auth.types';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuth: (user: User | null) => void;
    clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(set => ({
    user: null,
    isAuthenticated: false,
    isAuthLoading: true,
    setAuth: (user) => set({ user, isAuthenticated: !!user, isAuthLoading: false }),
    clearAuth: () => set({ user: null, isAuthenticated: false, isAuthLoading: false }),

}));

export default useAuthStore;
