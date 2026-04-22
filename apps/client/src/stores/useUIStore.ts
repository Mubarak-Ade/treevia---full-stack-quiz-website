import { create } from 'zustand';

interface UIState {
    modal: boolean | null;
    show: () => void;
    hide: () => void;
}

const useUIStore = create<UIState>((set) => ({
    modal: null,
    show: () => set({ modal: true }),
    hide: () => set({ modal: null }),
}));

export default useUIStore;
