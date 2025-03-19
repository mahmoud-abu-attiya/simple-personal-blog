// types/newsApi.ts
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface LocalArticle {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    image: string;
    content: string;
}