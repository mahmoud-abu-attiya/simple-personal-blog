import { create } from 'zustand';

interface OpenNavStore {
   isNavOpen: boolean;
   openNav: () => void;
   closeNav: () => void;
   toggleNav: () => void;
}

export const useOpenNavStore = create<OpenNavStore>((set) => ({
   isNavOpen: false,
   openNav: () => set({ isNavOpen: true }),
   closeNav: () => set({ isNavOpen: false }),
   toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));