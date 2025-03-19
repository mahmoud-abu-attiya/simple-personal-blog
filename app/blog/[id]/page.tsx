'use client'
import { useEffect, useState, use } from "react";
import { LocalArticle } from "@/types/newsApi";
import Image from "next/image";
import { FaPaperPlane, FaRegCommentDots, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useModalStore } from '@/store/modalStore';
import { useArticleStore } from '@/store/articleStore';
import { Article } from '@/types/newsApi';
import Link from "next/link"


export default function Page({ params }: { params: Promise<{ id: string }> }) {
   const { getArticle } = useArticleStore()
   const { id } = use(params);
   const [article, setArticle] = useState<LocalArticle>();
   const [articles, setArticles] = useState<Article[]>([]);
   const { removeArticle } = useArticleStore();
   const { openPostModal } = useModalStore();
   const handleDelete = (id: string) => () => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
            removeArticle(id);
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
         }
      })
   };
   const fetchArticles = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
      const url = `https://newsapi.org/v2/everything?q=featured&apiKey=${apiKey}&page=1&pageSize=5`;

      try {
         const response = await fetch(url);
         if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch articles');
         }
         const data = await response.json();

         const newArticles: Article[] = data.articles || [];
         setArticles((prev) => [...prev, ...newArticles]);
      } catch (error) {
         console.error('Error fetching articles:', error);
      }
   };

   useEffect(() => {
      setArticle(getArticle(id))
      fetchArticles()
   }, [id]);
   if (!article) return <div>loading...</div>
   return (
      <section className="container mt-24 mb-8 min-h-screen grid grid-cols-3 gap-12">
         <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
            <div className="flex lg:hidden gap-2 mt-auto">
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={handleDelete(article.id)}>Delete <FaTrashCan /></button>
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
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={handleDelete(article.id)}>Delete <FaTrashCan /></button>
               <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={() => openPostModal(article.id)}>Edit <FaRegPenToSquare /></button>
            </div>
            <div className="mt-10">
               <h3 className="mb-8 text-3xl font-bold text-blue-900 line-after">Featured</h3>
               <div className="">
               {articles && articles.map((article) => (
                  <Link target="_blank" rel="noopener noreferrer" href={article.url} className="flex gap-2 hover:bg-gray-200/50 p-2 hover:shadow transition rounded" key={article.author}>
                     {article.urlToImage && article.urlToImage.startsWith("http") ? (
                        <Image src={article.urlToImage} alt={article.title} className="object-cover rounded" width={100} height={100} />
                     ) : (
                        <Image src={"https://placehold.co/100x100/png"} alt={article.title} className="article-image rounded" width={300} height={150} />
                     )}
                     <div className="info">
                        <h4>{article.title.slice(0, 30) + "..."}</h4>
                        <div className="text-gray-600 text-sm">{article.author?.slice(0, 20) + "..."}</div>
                     </div>
                  </Link>
               ))}
               </div>
            </div>
         </div>
      </section>
   );
}
