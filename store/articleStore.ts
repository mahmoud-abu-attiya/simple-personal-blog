// store/articleStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

export interface Article {
   id: string;
   title: string;
   description: string;
   createdAt: Date | string; // Modified to handle string from storage
   image: string | null;
   content: string;
}

interface ArticleStore {
   articles: Article[];
   addArticle: (article: Article) => void;
   removeArticle: (id: string) => void;
   updateArticle: (id: string, article: Partial<Article>) => void;
   getArticle: (id: string) => Article | undefined;
}

// Custom cookie storage
const cookieStorage = {
   getItem: (name: string) => {
      const str = Cookies.get(name);
      if (!str) return null;
      const data = JSON.parse(str);
      return {
         ...data,
         state: {
            ...data.state,
            articles: data.state.articles.map((article: Article) => ({
               ...article,
               createdAt: new Date(article.createdAt),
            })),
         },
      };
   },
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   setItem: (name: string, value: any) => {
      // Stringify the value and set it in cookies
      Cookies.set(name, JSON.stringify(value), {
         expires: 7, // Cookie expires in 7 days
         path: '/', // Available throughout the app
      });
   },
   removeItem: (name: string) => {
      Cookies.remove(name);
   },
};

export const useArticleStore = create<ArticleStore>()(
   persist(
      (set, get) => ({
         articles: [],
         token: Cookies.get('token'),
         addArticle: (article) =>
            set((state) => ({
               articles: [...state.articles, article],
            })),
         removeArticle: (id) =>
            set((state) => ({
               articles: state.articles.filter((a) => a.id !== id),
            })),
         updateArticle: (id: string, updatedArticle: Partial<Article>) =>
            set((state) => ({
               articles: state.articles.map((article) =>
                  article.id === id ? { ...article, ...updatedArticle } : article
               ),
            })),
         getArticle: (id) => get().articles.find((article) => article.id === id),
      }),
      {
         name: 'article-storage', // key in localStorage
         storage: createJSONStorage(() => cookieStorage), // custom storage with Date handling
      }
   )
);