'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FaBars } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import PostModal from "./PostModal";
import { useModalStore } from "@/store/modalStore"

const Navbar = () => {
   const [open, setOpen] = useState(false);
   const { openPostModal, isPostModalOpen } = useModalStore();
   useEffect(() => {
      if (open || isPostModalOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "auto";
      }
   }, [open, isPostModalOpen]);
   return (
      <>
      {isPostModalOpen && (<PostModal />)}
      <header className={`fixed top-0 left-0 w-full shadow bg-gray-100/50 py-2 overflow-hidden transition-all md:max-h-fit max-h-15 z-10 backdrop-blur-md ${open ? "max-h-96" : ""}`}>
         <div className="container md:flex justify-between items-center">
            <div className="flex justify-between items-center ">
               <h1 className="text-2xl font-bold">LOGO</h1>
               <button className="p-2 border block md:hidden rounded" onClick={() => setOpen(!open)}>
                  <FaBars />
               </button>
            </div>
            <nav className="hidden md:block">
               <ul className="flex space-x-8 items-center">
                  <li>
                     <Link href={"/"} className="text-gray-700 hover:text-blue-700">For you</Link>
                  </li>
                  <li>
                     <Link href={"/blog"} className="text-gray-700 hover:text-blue-700">View Blog</Link>
                  </li>
                  <li>
                     <button onClick={() => openPostModal()} className="flex items-center gap-2 px-2 py-1 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 transition cursor-pointer text-sm">
                        New <FaPlus />
                     </button>
                  </li>
               </ul>
            </nav>
            <div className="relative rounded-full overflow-hidden w-fit cursor-pointer hidden md:block">
               <Image src="https://placehold.co/50/png" alt="avatar" width={50} height={50} />
            </div>
            <div className="flex items-center justify-between mt-6 md:hidden">
               <nav>
                  <ul className="flex space-x-8 items-center">
                     <li>
                        <Link href={"/"} className="text-gray-700 hover:text-blue-700">For you</Link>
                     </li>
                     <li>
                        <Link href={"/blog"} className="text-gray-700 hover:text-blue-700">View Blog</Link>
                     </li>
                     <li>
                        <button onClick={() => openPostModal()} className="flex items-center gap-2 px-2 py-1 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 transition cursor-pointer text-sm">
                           New <FaPlus />
                        </button>
                     </li>
                  </ul>
               </nav>
               <div className="relative rounded-full overflow-hidden w-fit cursor-pointer">
                  <Image src="https://placehold.co/50/png" alt="avatar" width={50} height={50} />
               </div>
            </div>
         </div>
      </header>
      </>
   )
}

export default Navbar