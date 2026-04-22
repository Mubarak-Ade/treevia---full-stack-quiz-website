import { User } from '@/modules/auth/types/auth.types';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    setAuth: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()(set => ({
    user: null,
    setAuth: (user) => set({ user }),

}));

export default useAuthStore;
