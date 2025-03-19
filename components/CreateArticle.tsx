"use client";

import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from 'next/image'
import Swal from 'sweetalert2';
import { useModalStore } from "@/store/modalStore";
import { useArticleStore } from '@/store/articleStore';

export default function CreateArticle() {
   const [image, setImage] = useState<string>('');
   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');

   const { selectedArticleId, closePostModal } = useModalStore();
   const { addArticle, updateArticle, getArticle } = useArticleStore();


   const editor = useEditor({
      immediatelyRender: false, // to avoid hydration mismatches
      extensions: [
         Placeholder.configure({
            placeholder: "Start writing your article here...",
         }),
         StarterKit.configure({
            heading: {
               levels: [1, 2, 3], // Enable H1, H2, H3
            },
         }),
      ],
      editorProps: {
         attributes: {
            class: "prose lg:prose-lg focus:outline-none min-h-[300px] max-h-[400px] bg-gray-50",
         },
      },
   });

   const resetData = () => {
      setTitle("")
      setDescription("")
      setImage("")
      editor?.commands.clearContent();
   }

   useEffect(() => {
      if (selectedArticleId) {
         const article = getArticle(selectedArticleId);
         if (article) {
            setTitle(article.title)
            setDescription(article.description)
            setImage(article.image)
            if (editor) {
               editor.commands.setContent(article.content); // Update the editor's content dynamically
            }
         }
      } else {
         resetData();
      }
   }, [selectedArticleId, getArticle, editor]);

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImage(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const saveArticle = () => {
      if (!editor) return;

      const newArticle = {
         id: crypto.randomUUID().toString(), // Random ID
         title,
         description,
         content: editor.getHTML().toString(),
         image,
         createdAt: new Date().toISOString(),
      };
      // Edit existing article
      if (selectedArticleId) {
         updateArticle(selectedArticleId, {
            ...newArticle,
            createdAt: getArticle(selectedArticleId)?.createdAt,
         });
         closePostModal();
         Swal.fire({
            title: 'Done!',
            text: 'Article edit successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
         })
      } else {
         addArticle(newArticle);
         closePostModal();
         Swal.fire({
            title: 'Done!',
            text: 'Article saved successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
         })
      }

      resetData();
      closePostModal();
   };

   const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!editor) return;

      const value = e.target.value as "paragraph" | "1" | "2" | "3"; // Explicitly define types

      if (value === "paragraph") {
         editor.chain().focus().setParagraph().run();
      } else {
         editor.chain().focus().toggleHeading({ level: parseInt(value) as 1 | 2 | 3 }).run();
      }
   };

   return (
      <div className="max-w-2xl mx-auto py-4">
         <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" />
         <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

         <div className="flex items-center justify-center w-full bg-gray-50 rounded-lg my-4">
            {image ? (
               <div className="flex flex-col">
                  <Image src={image} width={400} height={350} alt="Preview" className="w-full mb-2 rounded-lg max-h-80" />
                  <input
                     className="block w-full p-4 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                     id="dropzone-file"
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                  />
               </div>
            ) : (
               <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                     <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                     </svg>
                     <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                     <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/*"
                     onChange={handleImageUpload} />
               </label>
            )}
         </div>

         <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar for Tiptap */}
            {editor && (
               <div className="flex rounded bg-gray-100 p-2 gap-2 text-sm">
                  <select
                     onChange={handleHeadingChange}
                     className="px-1 py-0.5 rounded bg-white"
                  >
                     <option value="paragraph">Paragraph</option>
                     <option value="1">Heading 1</option>
                     <option value="2">Heading 2</option>
                     <option value="3">Heading 3</option>
                  </select>

                  <button
                     onClick={() => editor.chain().focus().toggleBold().run()}
                     className={`px-2 py-1 w-8 rounded hover:bg-slate-200 transition font-bold ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
                  >
                     B
                  </button>
                  <button
                     onClick={() => editor.chain().focus().toggleItalic().run()}
                     className={`px-2 py-1 w-8 rounded hover:bg-slate-200 transition italic ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
                  >
                     I
                  </button>
                  <button
                     onClick={() => editor.chain().focus().toggleStrike().run()}
                     className={`px-2 py-1 w-8 rounded hover:bg-slate-200 transition line-through ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
                  >
                     S
                  </button>
               </div>
            )}

            {/* Tiptap Editor */}
            <div className="rounded p-2 bg-gray-50 editor-container  min-h-[300px] max-h-[600px] overflow-auto">
               <EditorContent editor={editor} />
            </div>
         </div>

         <div className="flex">
         <button
            onClick={saveArticle}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
            {selectedArticleId ? 'Update' : 'Create'} Post
         </button>
         <button
            onClick={() => closePostModal()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
            Cansel
         </button>
         </div>
      </div>
   );
}
