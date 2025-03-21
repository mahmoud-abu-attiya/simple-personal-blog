'use client'
import { useEffect, useState, use } from "react";
import { LocalArticle } from "@/types/newsApi";
import Image from "next/image";
import { FaPaperPlane, FaRegCommentDots, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useModalStore } from '@/store/modalStore';
import { useArticleStore } from '@/store/articleStore';
import { NewArticle } from '@/types/newsApi';
import Link from "next/link";
import useDeleteArticle from "@/Hooks/useDeleteArticle";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
   const { getArticle } = useArticleStore()
   const { id } = use(params);
   const [article, setArticle] = useState<LocalArticle>();
   const [articles, setArticles] = useState<NewArticle[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { openPostModal } = useModalStore();
   const { handleDelete } = useDeleteArticle();
   const fetchArticles = async () => {
      const url = `https://api.mediastack.com/v1/news?access_key=d60c7ad405d30ac25f8add86f274b63b&limit=5`;

      try {
         const response = await fetch(url);
         if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch articles');
         }
         const data = await response.json();

         const newArticles: NewArticle[] = data.data || [];
         setArticles((prev) => [...prev, ...newArticles]);
      } catch (error) {
         console.error('Error fetching articles:', error);
      }
   };

   const Loading = () => (
      <div role="status" className='w-fit mx-auto my-4 flex items-center gap-2'>
         <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
         </svg>
         <span className="">Loading...</span>
      </div>
   )

   useEffect(() => {
      setArticle(getArticle(id))
      setIsLoading(false);
   }, [id]);
   useEffect(() => {
      if (window.innerWidth > 768) {
         fetchArticles()
      }
   }, []);
   if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loading /></div>
   if (!article) return <div className="flex items-center text-gray-600 justify-center min-h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold">Sorry!</h1>
      <p className="text-xl font-bold">There is no article with id : {id}</p>
      <p className="font-bold">
         Visit <Link href={"/blog"} className="text-sky-600 underline">blog page</Link> to see you articles.
      </p>
      </div>
   return (
      <section className="container mt-24 mb-8 min-h-screen grid grid-cols-3 gap-12">
         <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
            <div className="flex lg:hidden gap-2 mt-auto">
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={handleDelete(article.id, '/blog')}>Delete <FaTrashCan /></button>
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={() => openPostModal(article.id)}>Edit <FaRegPenToSquare /></button>
            </div>
            <h1 className="text-2xl md:text-4xl text-gradient">{article.title}</h1>
            <span className="text-gray-600 text-sm">Created at : {article.createdAt}</span>
            <Image src={article.image} alt={article.title} width={400} height={300} className="w-full h-72 object-cover" />
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

            <div>
               <label htmlFor="comment" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
               <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                     <FaRegCommentDots className="text-gray-400" />
                  </div>
                  <input type="text" id="comment" className="block outline-0 w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Add Comment..." required />
                  <button className="text-white absolute end-2.5 bottom-1/2 translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"><FaPaperPlane /></button>
               </div>
            </div>

         </div>
         <div className="hidden lg:block col-span-1">
            <div className="flex gap-2 mt-auto">
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={handleDelete(article.id, 'blog')}>Delete <FaTrashCan /></button>
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={() => openPostModal(article.id)}>Edit <FaRegPenToSquare /></button>
            </div>
            <div className="mt-10">
               <h3 className="mb-8 text-3xl font-bold text-blue-900 line-after">Featured</h3>
               <div className="">
                  {articles && articles.map((article, i) => (
                     <Link target="_blank" rel="noopener noreferrer" href={article.url} className="flex gap-2 hover:bg-gray-200/50 p-2 hover:shadow transition rounded" key={i}>
                        {article.image && article.image.startsWith("http") ? (
                           <Image src={article.image} alt={article.title} className="object-cover rounded" width={100} height={80} />
                        ) : (
                           <Image src={"https://placehold.co/100x80/png"} alt={article.title} className="rounded" width={100} height={80} />
                        )}
                        <div className="info">
                           <h4>{article.title.slice(0, 30) + "..."}</h4>
                           <div className="text-gray-600 text-xs">{article.published_at}</div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
