"use client";

import { FaTrashCan, FaRegPenToSquare, FaPlus, FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useModalStore } from '@/store/modalStore';
import { useArticleStore } from '@/store/articleStore';
import useDeleteArticle from "@/Hooks/useDeleteArticle";

export default function Blog() {
   const { articles } = useArticleStore();
   const { openPostModal } = useModalStore();
   const { handleDelete } = useDeleteArticle();

   return (
      <div className="container mt-20 min-h-screen">
         <div className="flex justify-between items-center my-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">Blog</h1>
            <button onClick={() => openPostModal()} className='flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
               New Article <FaPlus />
            </button>
         </div>
         {articles.length === 0 ? (
            <div className="flex items-center text-gray-600 justify-center w-full flex-col gap-4">
            <h1 className="text-4xl font-bold">Sorry!</h1>
            <p className="text-xl font-bold">There is no any articles here.</p>
            <p className="font-bold">
               Click on New Article button to to add an article.
            </p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {articles.map((article, index) => (
                  <div key={index} className="flex flex-col gap-4 rounded-xl overflow-hidden shadow-lg border border-blue-300 p-4 bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300">
                     {article.image ? (
                        <Image src={article.image} alt={article.title} className="article-image rounded-xl shadow" width={300} height={150} />
                     ) : (
                        <Image src={"https://placehold.co/300x150/png"} alt={article.title} className="article-image rounded-xl shadow" width={300} height={150} />
                     )}
                     <span className="text-gray-500 text-sm">Created at : {article.createdAt || ''}</span>
                     <h2 className="text-xl font-bold">{article.title}</h2>
                     <p className="text-gray-600">{article.description}</p>
                     <div className="flex gap-2 mt-auto">
                        <Link href={`/blog/${article.id}`} className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow">View <FaRegEye /></Link>
                        <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={handleDelete(article.id)}>Delete <FaTrashCan /></button>
                        <button className="flex gap-2 items-center justify-center text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center grow" onClick={() => openPostModal(article.id)}>Edit <FaRegPenToSquare /></button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
