// store/modalStore.ts
import { create } from 'zustand';

interface ModalStore {
   isPostModalOpen: boolean;
   selectedArticleId: string | null;
   openPostModal: (articleId?: string) => void;
   closePostModal: () => void;
   togglePostModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
   isPostModalOpen: false,
   selectedArticleId: null,
   openPostModal: (articleId) =>
      set({ isPostModalOpen: true, selectedArticleId: articleId || null }),
   closePostModal: () => set({ isPostModalOpen: false, selectedArticleId: null }),
   togglePostModal: () =>
      set((state) => ({
         isPostModalOpen: !state.isPostModalOpen,
         selectedArticleId: null,
      })),
}));