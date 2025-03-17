// types/post.ts
export interface Post {
   id: number;
   title: string;
   content: string;
   status: 'Draft' | 'Publish';
}