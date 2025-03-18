"use client";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useModalStore } from '@/store/modalStore';
import { useArticleStore } from '@/store/articleStore';

export default function Blog() {
   const { articles, removeArticle } = useArticleStore();
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

   return (
      <div className="max-w-4xl mx-auto p-4 mt-18">
         <h1 className="text-2xl font-bold mb-4">Blog</h1>
         {articles.length === 0 ? (
            <p>No articles found.</p>
         ) : (
            articles.reverse().map((article, index) => (
               <div key={index} className="border p-4 rounded mb-4">
                  {article.image && <img src={article.image} alt="Article" className="w-full rounded mb-2" />}
                  <span className="text-gray-500 text-sm">Created at : {article.createdAt || ''}</span>
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p className="text-gray-600">{article.description}</p>
                  <div className="mt-2" dangerouslySetInnerHTML={{ __html: article.content }} />
                  <div className="flex gap-2 mt-4">
                     <button className="px-4 py-2 flex gap-2 items-center rounded-lg shadow text-white bg-red-700" onClick={handleDelete(article.id)}>Delete <FaTrashCan /></button>
                     <button className="px-4 py-2 flex gap-2 items-center rounded-lg shadow text-white bg-yellow-600" onClick={() => openPostModal(article.id)}>Edit <FaRegPenToSquare /></button>
                  </div>
               </div>
            ))
         )}
      </div>
   );
}
