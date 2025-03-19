import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useOpenNavStore } from './openNavStore';
import { LocalArticle } from '@/types/newsApi';

interface ArticleStore {
   articles: LocalArticle[];
   addArticle: (article: LocalArticle) => void;
   removeArticle: (id: string) => void;
   updateArticle: (id: string, article: Partial<LocalArticle>) => void;
   getArticle: (id: string) => LocalArticle | undefined;
}

export const useArticleStore = create<ArticleStore>()(
   persist(
      (set, get) => ({
         articles: [],
         addArticle: (article) => {
            // console.log('Adding article:', article);
            set((state) => ({
               articles: [...state.articles, article],
            }));
            useOpenNavStore.getState().closeNav();
         },
         removeArticle: (id) => {
            // console.log('Removing article:', id);
            set((state) => ({
               articles: state.articles.filter((a) => a.id !== id),
            }));
            useOpenNavStore.getState().closeNav();
         },
         updateArticle: (id, updatedArticle) => {
            // console.log('Updating article:', { id, updatedArticle });
            set((state) => ({
               articles: state.articles.map((article) =>
                  article.id === id ? { ...article, ...updatedArticle } : article
               ),
            }));
            useOpenNavStore.getState().closeNav();
         },
         getArticle: (id) => get().articles.find((article) => article.id === id),
      }),
      {
         name: 'article-storage',
         storage: {
            getItem: (name) => {
               const value = localStorage.getItem(name);
               return value ? JSON.parse(value) : null;
            },
            setItem: (name, value) => {
               localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
               localStorage.removeItem(name);
            },
         },
      }
   )
);
